require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const DATA_DIR = path.join(__dirname, ".rsvp-data");
const STATE_FILE = path.join(DATA_DIR, "state.json");
const CALC_FILE = path.join(DATA_DIR, "calculations.json");
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const STATE_TABLE = process.env.SUPABASE_STATE_TABLE || "rsvp_app_state";
const CALC_TABLE = process.env.SUPABASE_CALC_TABLE || "rsvp_calculations";
const CALC_BUCKET = process.env.SUPABASE_CALC_BUCKET || "calculation-pdfs";
const PROJECT_DOC_BUCKET = process.env.SUPABASE_PROJECT_DOC_BUCKET || "project-documents";
const COMMON_BUCKET = process.env.SUPABASE_COMMON_BUCKET || "commonData";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL;
const DOCUMENT_BUCKETS = {
  pid: process.env.SUPABASE_PID_BUCKET || "PID",
  gad: process.env.SUPABASE_GAD_BUCKET || "GAD",
  tds: process.env.SUPABASE_TDS_BUCKET || "technicalDataSheet",
};

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function send(res, status, content, contentType, extraHeaders) {
  res.writeHead(status, { "Content-Type": contentType || "application/json", ...(extraHeaders || {}) });
  res.end(content);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), "application/json");
}

function safeParseJson(text, fallback) {
  try {
    return JSON.parse(text || "{}");
  } catch (_) {
    return fallback !== undefined ? fallback : {};
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100 * 1024 * 1024) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function readJsonFile(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function writeJsonFile(filePath, payload) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
}

function hasSupabase() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && global.fetch);
}

async function supabaseRequest(table, query, options) {
  if (!hasSupabase()) return null;
  const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${table}${query || ""}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation,resolution=merge-duplicates",
      ...(options && options.headers ? options.headers : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Supabase ${response.status}: ${await response.text()}`);
  }
  return response;
}

async function supabaseStorageRequest(pathName, options) {
  if (!hasSupabase()) return null;
  const url = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/${pathName.replace(/^\/+/, "")}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      ...(options && options.headers ? options.headers : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Supabase storage ${response.status}: ${await response.text()}`);
  }
  return response;
}

async function ensureBucket(bucketName) {
  if (!hasSupabase()) return false;
  try {
    await supabaseStorageRequest(`bucket/${encodeURIComponent(bucketName)}`, {
      method: "GET",
    });
    return true;
  } catch (error) {
    try {
      await supabaseStorageRequest("bucket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bucketName, name: bucketName, public: false }),
      });
      return true;
    } catch (createError) {
      if (/already exists|Duplicate/i.test(createError.message)) return true;
      throw createError;
    }
  }
}

function decodeDataUri(dataUri) {
  const match = String(dataUri || "").match(/^data:([^;,]+)?(;base64)?,(.*)$/);
  if (!match) return null;
  const contentType = match[1] || "application/octet-stream";
  const body = match[2]
    ? Buffer.from(match[3], "base64")
    : Buffer.from(decodeURIComponent(match[3]));
  return { contentType, body };
}

function cleanStorageName(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-z0-9._-]+/gi, "_")
    .replace(/^_+|_+$/g, "") || "file";
}

function normalizeItemName(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

async function uploadStorageObject(bucketName, objectPath, body, contentType) {
  await ensureBucket(bucketName);
  await supabaseStorageRequest(
    `object/${encodeURIComponent(bucketName)}/${objectPath
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": contentType || "application/octet-stream",
        "x-upsert": "true",
      },
      body,
    },
  );
  return `${bucketName}/${objectPath}`;
}

async function listStorageObjects(bucketName, prefix) {
  const normalizedPrefix = String(prefix || "").replace(/^\/+|\/+$/g, "");
  const folder = normalizedPrefix.includes("/")
    ? normalizedPrefix.slice(0, normalizedPrefix.lastIndexOf("/"))
    : normalizedPrefix;
  const response = await supabaseStorageRequest(
    `object/list/${encodeURIComponent(bucketName)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefix: folder, limit: 1000, offset: 0 }),
    },
  );
  const rows = await response.json();
  return Array.isArray(rows)
    ? rows.map((item) => ({
      ...item,
      fullPath: folder ? `${folder}/${item.name}` : item.name,
    }))
    : [];
}

async function downloadStorageObject(bucketName, objectPath) {
  const response = await supabaseStorageRequest(
    `object/${encodeURIComponent(bucketName)}/${objectPath
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
    { method: "GET" },
  );
  return {
    body: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type") || "application/octet-stream",
  };
}

async function findStorageObject(bucketName, folder, baseName) {
  const target = String(baseName || "").toLowerCase();
  const rows = await listStorageObjects(bucketName, folder);
  const match = rows.find((item) => {
    const parsed = path.parse(item.name || "");
    return (
      (item.name || "").toLowerCase() === target ||
      parsed.name.toLowerCase() === target
    );
  });
  return match ? match.fullPath : "";
}

async function copyStorageObject(sourceBucket, sourcePath, targetBucket, targetPath) {
  const file = await downloadStorageObject(sourceBucket, sourcePath);
  return uploadStorageObject(targetBucket, targetPath, file.body, file.contentType);
}

async function loadAppState() {
  if (hasSupabase()) {
    try {
      const response = await supabaseRequest(
        STATE_TABLE,
        "?id=eq.default&select=data&limit=1",
        { method: "GET" },
      );
      const rows = await response.json();
      if (rows[0] && rows[0].data) return rows[0].data;
    } catch (error) {
      console.warn("[supabase] state load failed, using local file:", error.message);
    }
  }
  return readJsonFile(STATE_FILE, {});
}

async function saveAppState(payload) {
  writeJsonFile(STATE_FILE, payload);
  if (hasSupabase()) {
    try {
      await supabaseRequest(STATE_TABLE, "?on_conflict=id", {
        method: "POST",
        body: JSON.stringify({
          id: "default",
          data: payload,
          updated_at: new Date().toISOString(),
        }),
      });
      await syncRelationalTables(payload);
    } catch (error) {
      console.warn("[supabase] state save failed:", error.message);
    }
  }
}

async function upsertRows(table, rows) {
  if (!rows.length) return;
  await supabaseRequest(table, "?on_conflict=id", {
    method: "POST",
    body: JSON.stringify(rows),
  });
}

function collectRelationalRows(payload) {
  const enquiries = Array.isArray(payload.enquiries) ? payload.enquiries : [];
  const employees = Array.isArray(payload.employees) ? payload.employees : [];
  const projects = Array.isArray(payload.projects) ? payload.projects : [];
  const clientsById = new Map();
  const enquiryRows = enquiries.map((enquiry) => {
    const clientName =
      enquiry.existingClient === "yes"
        ? enquiry.existingClientName
        : enquiry.companyName;
    const clientId = clientName ? `client-${cleanStorageName(clientName).toLowerCase()}` : null;
    if (clientId && !clientsById.has(clientId)) {
      clientsById.set(clientId, {
        id: clientId,
        name: clientName,
        contact_person: enquiry.contactPersonName || null,
        email: enquiry.email || null,
        phone: enquiry.contactNumber || null,
        data: enquiry,
        updated_at: new Date().toISOString(),
      });
    }
    return {
      id: enquiry.id,
      client_id: clientId,
      company_name: enquiry.companyName || enquiry.existingClientName || null,
      contact_person: enquiry.contactPersonName || null,
      status: enquiry.status || null,
      lead_priority: enquiry.leadPriority || null,
      data: enquiry,
      created_at: enquiry.createdAt || enquiry.savedAt || new Date().toISOString(),
      updated_at: enquiry.savedAt || new Date().toISOString(),
    };
  }).filter((row) => row.id);

  const employeeRows = employees.map((employee) => ({
    id: employee.id,
    employee_id: employee.employeeId || null,
    name: employee.name || null,
    login_pass: employee.loginPass || null,
    designation: employee.designation || null,
    email: employee.email || null,
    documents: employee.documents || [],
    data: employee,
    updated_at: new Date().toISOString(),
  })).filter((row) => row.id);

  const projectRows = [];
  const boqRows = [];
  projects.forEach((project) => {
    const enquiry = project.enquiry || {};
    const clientName =
      enquiry.existingClient === "yes"
        ? enquiry.existingClientName
        : enquiry.companyName;
    const clientId = clientName ? `client-${cleanStorageName(clientName).toLowerCase()}` : null;
    if (clientId && !clientsById.has(clientId)) {
      clientsById.set(clientId, {
        id: clientId,
        name: clientName,
        contact_person: enquiry.contactPersonName || null,
        email: enquiry.email || null,
        phone: enquiry.contactNumber || null,
        data: enquiry,
        updated_at: new Date().toISOString(),
      });
    }
    projectRows.push({
      id: project.id,
      client_id: clientId,
      enquiry_id: enquiry.id || null,
      name: project.name,
      status: project.status || null,
      deadline_date: project.deadlineDate || null,
      data: project,
      updated_at: new Date().toISOString(),
    });
    (project.stages || []).forEach((stage) => {
      (stage.subtasks || [])
        .filter((task) => String(task.id || "").startsWith("design-calculation"))
        .forEach((task) => {
          (task.data.calculationOutputs || []).forEach((output, outputIndex) => {
            const itemNames = output.structured && output.structured.boqItems
              ? output.structured.boqItems
              : [];
            itemNames.forEach((itemName, itemIndex) => {
              const itemKey = normalizeItemName(itemName);
              boqRows.push({
                id: `${project.id}-${task.id}-${outputIndex}-${itemKey}-${itemIndex}`,
                project_id: project.id,
                system_value: output.systemValue || null,
                system_label: output.systemLabel || null,
                item_name: itemName,
                item_key: itemKey,
                data: { outputSavedAt: output.savedAt || null },
                updated_at: new Date().toISOString(),
              });
            });
          });
        });
    });
  });

  return {
    clients: Array.from(clientsById.values()),
    enquiries: enquiryRows,
    employees: employeeRows,
    projects: projectRows.filter((row) => row.id),
    boqItems: boqRows,
  };
}

async function syncRelationalTables(payload) {
  const rows = collectRelationalRows(payload || {});
  await upsertRows("clients", rows.clients);
  await upsertRows("enquiries", rows.enquiries);
  await upsertRows("employees", rows.employees);
  await upsertRows("projects", rows.projects);
  await upsertRows("boq_items", rows.boqItems);
}

async function saveCalculation(payload) {
  const calculations = readJsonFile(CALC_FILE, []);
  const record = {
    id: `calc-${Date.now()}`,
    saved_at: new Date().toISOString(),
    payload,
  };
  calculations.push(record);
  writeJsonFile(CALC_FILE, calculations);
  let supabaseSaved = false;
  let supabaseError = hasSupabase()
    ? ""
    : "Supabase is not configured on this server.";
  if (hasSupabase()) {
    try {
      const basePath = [
        cleanStorageName(payload.project_id || "unknown-project"),
        cleanStorageName(payload.subtask_id || "calculation"),
        cleanStorageName(record.id),
      ].join("/");
      if (payload.output && payload.output.pdfDataUri) {
        const pdf = decodeDataUri(payload.output.pdfDataUri);
        if (pdf) {
          await uploadStorageObject(
            CALC_BUCKET,
            `${basePath}/calculation.pdf`,
            pdf.body,
            pdf.contentType,
          );
        }
      }
      if (payload.output && payload.output.boqPdfDataUri) {
        const boqPdf = decodeDataUri(payload.output.boqPdfDataUri);
        if (boqPdf) {
          await uploadStorageObject(
            CALC_BUCKET,
            `${basePath}/boq.pdf`,
            boqPdf.body,
            boqPdf.contentType,
          );
        }
      }
      if (payload.output && payload.output.boqWithPricePdfDataUri) {
        const boqWithPricePdf = decodeDataUri(payload.output.boqWithPricePdfDataUri);
        if (boqWithPricePdf) {
          await uploadStorageObject(
            CALC_BUCKET,
            `${basePath}/boqwithprice.pdf`,
            boqWithPricePdf.body,
            boqWithPricePdf.contentType,
          );
        }
      }
      await supabaseRequest(CALC_TABLE, "", {
        method: "POST",
        body: JSON.stringify({
          id: record.id,
          project_id: payload.project_id || null,
          project_name: payload.project_name || null,
          subtask_id: payload.subtask_id || null,
          subtask_name: payload.subtask_name || null,
          data: payload,
          saved_at: record.saved_at,
        }),
      });
      supabaseSaved = true;
      supabaseError = "";
    } catch (error) {
      supabaseError = error.message;
      console.warn("[supabase] calculation save failed:", error.message);
    }
  }
  return { ...record, supabaseSaved, supabaseError };
}

async function saveProjectDocument(payload) {
  let supabaseSaved = false;
  let supabaseError = hasSupabase()
    ? ""
    : "Supabase is not configured on this server.";
  let storagePath = "";

  if (hasSupabase()) {
    try {
      const file = decodeDataUri(payload.dataUri);
      if (!file) {
        throw new Error("Document payload is not a valid data URI.");
      }
      const basePath = [
        cleanStorageName(payload.project_id || "unknown-project"),
        cleanStorageName(payload.subtask_id || "documents"),
        cleanStorageName(payload.kind || "document"),
      ].join("/");
      const fileName = cleanStorageName(payload.file_name || `${Date.now()}.pdf`);
      storagePath = await uploadStorageObject(
        PROJECT_DOC_BUCKET,
        `${basePath}/${fileName}`,
        file.body,
        file.contentType,
      );
      supabaseSaved = true;
      supabaseError = "";
    } catch (error) {
      supabaseError = error.message;
      console.warn("[supabase] project document save failed:", error.message);
    }
  }

  return {
    savedAt: new Date().toISOString(),
    storagePath,
    supabaseSaved,
    supabaseError,
  };
}

async function getProjectDocument(payload) {
  if (!hasSupabase()) {
    return { saved: [], missing: [], error: "Supabase is not configured on this server." };
  }
  const projectId = cleanStorageName(payload.project_id || "project");
  const systemValue = payload.system_value || "";
  const type = payload.type || "";
  const saved = [];
  const missing = [];

  if (type === "pid") {
    if (systemValue !== "gas-chlorinator") {
      return {
        saved,
        missing: ["P&ID source path is configured only for Gas Chlorinator."],
      };
    }
    const capacity = Math.round(Number(payload.system_capacity || 0));
    if (!capacity) {
      return { saved, missing: ["System Capacity is required for Gas Chlorinator P&ID."] };
    }
    const sourceName = `GC${capacity}PID`;
    const sourcePath = await findStorageObject(
      COMMON_BUCKET,
      "fPID/gasChlorination",
      sourceName,
    );
    if (!sourcePath) {
      return { saved, missing: [`commonData/fPID/gasChlorination/${sourceName}`] };
    }
    saved.push(
      await copyStorageObject(
        COMMON_BUCKET,
        sourcePath,
        DOCUMENT_BUCKETS.pid,
        `${projectId}_PID.pdf`,
      ),
    );
    return { saved, missing };
  }

  const itemNames = Array.from(
    new Set((payload.boq_items || []).map(normalizeItemName).filter(Boolean)),
  );
  if (!itemNames.length) {
    return { saved, missing: ["No BOQ item names were found for this system."] };
  }

  if (type === "gad") {
    for (const itemName of itemNames) {
      const sourcePath = await findStorageObject(COMMON_BUCKET, "fGAD", itemName);
      if (!sourcePath) {
        missing.push(`commonData/fGAD/${itemName}`);
        continue;
      }
      saved.push(
        await copyStorageObject(
          COMMON_BUCKET,
          sourcePath,
          DOCUMENT_BUCKETS.gad,
          `${projectId}_GAD_${itemName}.pdf`,
        ),
      );
    }
    return { saved, missing };
  }

  if (type === "tds") {
    await ensureBucket(DOCUMENT_BUCKETS.tds);
    for (const itemName of itemNames) {
      const rows = await listStorageObjects(COMMON_BUCKET, `fTDS/${itemName}`);
      const pdfs = rows.filter((item) => /\.pdf$/i.test(item.name || ""));
      if (!pdfs.length) {
        missing.push(`commonData/fTDS/${itemName}`);
        continue;
      }
      for (const pdf of pdfs) {
        saved.push(
          await copyStorageObject(
            COMMON_BUCKET,
            pdf.fullPath,
            DOCUMENT_BUCKETS.tds,
            `${projectId}/${itemName}/${pdf.name}`,
          ),
        );
      }
    }
    return { saved, missing };
  }

  return { saved, missing: [`Unknown document type: ${type}`] };
}

function buildTree(rootPath, name) {
  if (!fs.existsSync(rootPath)) {
    return { name, type: "folder", children: [] };
  }
  const stat = fs.statSync(rootPath);
  if (!stat.isDirectory()) return { name, type: "file" };
  return {
    name,
    type: "folder",
    children: fs
      .readdirSync(rootPath)
      .sort((a, b) => a.localeCompare(b))
      .map((child) => buildTree(path.join(rootPath, child), child)),
  };
}

function buildLocalAiFallback(payload) {
  const label = payload.label || "Design Document";
  const projectName = payload.projectName || "Project";
  return [
    `${label}`,
    "",
    `Project: ${projectName}`,
    "",
    "This draft is prepared from the saved design calculation outputs. Review the calculation values, operating assumptions, duty point, equipment selection, and safety requirements before issuing it to the client.",
    "",
    "The selected system has been evaluated based on the recorded process requirement and the design calculation output saved in the project. The design basis should be read together with the project requirement, selected system capacity, utility availability, installation constraints, and any assumptions recorded during requirement engineering.",
    "",
    "The proposed arrangement is intended to provide stable operation within the selected design range. Major equipment and instruments should be installed, commissioned, and maintained according to the relevant datasheets, approved drawings, and project-specific operating procedures. Operators should verify process readiness, utilities, chemical availability, ventilation, leak prevention, and all safety interlocks before start-up.",
    "",
    "",
  ].join("\n");
}

async function generateAiText(payload) {
  if (!GROQ_API_KEY || !global.fetch) {
    return { text: buildLocalAiFallback(payload), fallback: true };
  }
  const prompt = [
    `Write ${payload.label || "a design document"} for project ${payload.projectName || ""}.`,
    "Use the client info and design calculation outputs as the source.",
    "Keep it professional, technical, and around 500 words for Design Explanation. For manuals/philosophy/cost, use the same practical engineering tone.",
    "Return editable plain text only. Do not use markdown tables.",
    "",
    "Client Info:",
    payload.clientInfo || "",
    "",
    "Design Calculation Outputs:",
    payload.calculationText || "",
  ].join("\n");
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an engineering proposal assistant for water/chlorination system projects.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.35,
      max_tokens: 1100,
    }),
  });
  if (!response.ok) {
    throw new Error(`Groq ${response.status}: ${await response.text()}`);
  }
  const data = await response.json();
  return {
    text:
      data &&
        data.choices &&
        data.choices[0] &&
        data.choices[0].message
        ? data.choices[0].message.content || ""
        : "",
    fallback: false,
  };
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return "application/octet-stream";
}

// Extensions to compress with gzip
const GZIP_EXTS = new Set([".html", ".js", ".css", ".json"]);
// Extensions that browsers can cache aggressively (not HTML)
const CACHE_EXTS = new Set([".js", ".css"]);

async function handleApi(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsed = new URL(req.url, `http://${req.headers.host}`);

  if (parsed.pathname === "/api/state" && req.method === "GET") {
    sendJson(res, 200, await loadAppState());
    return;
  }

  if (parsed.pathname === "/api/state" && req.method === "POST") {
    const payload = safeParseJson(await readBody(req));
    await saveAppState(payload);
    sendJson(res, 200, { ok: true, savedAt: new Date().toISOString() });
    return;
  }

  if (parsed.pathname === "/api/calculations" && req.method === "POST") {
    const payload = safeParseJson(await readBody(req));
    const record = await saveCalculation(payload);
    sendJson(res, 200, {
      ok: true,
      id: record.id,
      savedAt: record.saved_at,
      supabaseSaved: record.supabaseSaved,
      supabaseError: record.supabaseError,
    });
    return;
  }

  if (parsed.pathname === "/api/documents/get" && req.method === "POST") {
    const payload = safeParseJson(await readBody(req));
    const result = await getProjectDocument(payload);
    sendJson(res, 200, {
      ok: !result.error,
      ...result,
      savedAt: new Date().toISOString(),
    });
    return;
  }

  if (parsed.pathname === "/api/project-documents" && req.method === "POST") {
    const payload = safeParseJson(await readBody(req));
    const record = await saveProjectDocument(payload);
    sendJson(res, 200, {
      ok: true,
      ...record,
    });
    return;
  }

  if (parsed.pathname === "/api/ai/generate" && req.method === "POST") {
    const payload = safeParseJson(await readBody(req));
    const result = await generateAiText(payload);
    sendJson(res, 200, {
      ok: true,
      ...result,
      generatedAt: new Date().toISOString(),
    });
    return;
  }

  if (parsed.pathname === "/api/status") {
    sendJson(res, 200, {
      ok: true,
      supabaseConfigured: hasSupabase(),
      groqConfigured: Boolean(GROQ_API_KEY),
      stateTable: STATE_TABLE,
      calculationTable: CALC_TABLE,
    });
    return;
  }

  if (parsed.pathname === "/api/database/tree") {
    sendJson(res, 200, buildTree(path.join(__dirname, "Database"), "Database"));
    return;
  }

  if (parsed.pathname === "/api/proposal-document") {
    const folder = parsed.searchParams.get("folder") || "";
    const file = parsed.searchParams.get("file") || "";
    const docPath = path.join(__dirname, "Database", "Proposal Document", folder, file);
    if (fs.existsSync(docPath)) {
      sendJson(res, 200, { content: "Document is available in Database storage.", path: docPath });
    } else {
      sendJson(res, 200, { content: "Content to be added later" });
    }
    return;
  }

  if (parsed.pathname === "/api/projects/save-proposal-docs" && req.method === "POST") {
    const payload = safeParseJson(await readBody(req));
    const projectName = payload.project_name || "Unknown Project";
    const savedAt = new Date().toISOString();
    const pathInfo = `/database/Projects/${projectName}/Proposal Docs`;
    sendJson(res, 200, { savedAt, path: pathInfo });
    return;
  }

  send(res, 404, "API not found", "text/plain");
}

const server = http.createServer(async (req, res) => {
  console.log(`[request] ${req.method} ${req.url}`);
  try {
    if (req.url === "/health" || req.url.startsWith("/health?")) {
      sendJson(res, 200, { ok: true, ts: new Date().toISOString() });
      return;
    }

    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }

    const parsed = new URL(req.url, `http://${req.headers.host}`);
    const safePath = decodeURIComponent(parsed.pathname).replace(/^[/\\]+/, "");
    const requested = safePath || "dashboard.html";
    const filePath = path.resolve(__dirname, requested);
    if (!filePath.startsWith(__dirname)) {
      send(res, 403, "Forbidden", "text/plain");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const acceptsGzip = /gzip/i.test(req.headers["accept-encoding"] || "");
    const shouldGzip = acceptsGzip && GZIP_EXTS.has(ext);
    const cacheHeader = CACHE_EXTS.has(ext)
      ? { "Cache-Control": "public, max-age=86400" }
      : { "Cache-Control": "no-cache" };

    fs.readFile(filePath, (err, data) => {
      if (err) {
        send(res, 404, "File not found", "text/plain");
        return;
      }
      if (shouldGzip) {
        zlib.gzip(data, (gzErr, compressed) => {
          if (gzErr) {
            send(res, 200, data, getContentType(filePath), cacheHeader);
          } else {
            send(res, 200, compressed, getContentType(filePath), {
              ...cacheHeader,
              "Content-Encoding": "gzip",
            });
          }
        });
      } else {
        send(res, 200, data, getContentType(filePath), cacheHeader);
      }
    });
  } catch (error) {
    console.error(error);
    send(res, 500, error.message || "Server error", "text/plain");
  }
});

const DEFAULT_PORT = process.env.PORT ? Number(process.env.PORT) : 8001;
// On Render (or any managed host) PORT is always available and uncontested,
// so retries are disabled.  Locally we still retry to avoid conflicts.
const PORT_RETRIES = process.env.PORT ? 0 : 3;

function listenOnPort(port, retries) {
  if (retries === undefined) retries = PORT_RETRIES;
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    if (hasSupabase()) {
      console.log("Supabase persistence enabled.");
    } else {
      console.log("Supabase env vars not found; using local .rsvp-data persistence.");
    }
  });

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && retries > 0) {
      console.warn(`Port ${port} already in use, trying ${port + 1}...`);
      setTimeout(() => listenOnPort(port + 1, retries - 1), 200);
    } else {
      console.error("Server startup error:", err);
      process.exit(1);
    }
  });
}

listenOnPort(DEFAULT_PORT);

// ── Graceful shutdown ──────────────────────────────────────────────────────
// Render sends SIGTERM before terminating the container during redeploys.
// Closing the HTTP server lets in-flight requests finish before exit.
process.on("SIGTERM", () => {
  console.log("[shutdown] SIGTERM received — closing server gracefully");
  server.close((err) => {
    if (err) {
      console.error("[shutdown] Error closing server:", err);
      process.exit(1);
    } else {
      console.log("[shutdown] Server closed cleanly");
      process.exit(0);
    }
  });
  // Force-kill after maxShutdownDelaySeconds if still open
  setTimeout(() => {
    console.error("[shutdown] Forced exit after timeout");
    process.exit(1);
  }, 28000).unref();
});
