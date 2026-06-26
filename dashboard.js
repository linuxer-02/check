      const EXISTING_CLIENTS = [
        "AquaPure Industries",
        "GreenFlow Pharma",
        "Metro Utilities",
        "Sterile Bio Systems",
      ];
      const INDUSTRY_TYPES = [
        "Municipal",
        "Drinking Water",
        "TWAD",
        "Panchayat",
        "Power Plants",
        "Thermal",
        "NTPC",
        "Captive Power",
        "Pharma",
        "Chemical",
        "Process Industry",
        "WTP",
        "ETP",
        "STP",
        "Infrastructure",
        "Builders",
        "Hotels",
        "Hospitals",
        "Export Customers",
        "Other",
      ];
      const SYSTEM_REQUIREMENTS = [
        {
          value: "gas-chlorinator",
          label: "Gas Chlorinator",
          suffix: "GasChlorinator",
        },
        {
          value: "evaporator-steam",
          label: "Evaporator (steam)",
          suffix: "EvaporatorSteam",
        },
        {
          value: "evaporator-electrical",
          label: "Evaporator (electrical)",
          suffix: "EvaporatorElectrical",
        },
        {
          value: "evaporator-heater",
          label: "Evaporator (heater)",
          suffix: "EvaporatorHeater",
        },
        { value: "clo2-1-chem", label: "Clo2 (1 chem)", suffix: "Clo2_1" },
        { value: "clo2-2-chem", label: "Clo2 (2 chem)", suffix: "Clo2_2" },
        { value: "clo2-3-chem", label: "Clo2 (3 chem)", suffix: "Clo2_3" },
        { value: "sodium-hypo", label: "Sodium Hypo", suffix: "SodiumHypo" },
        {
          value: "absorption-system",
          label: "Absorption System",
          suffix: "AbsorptionSystem",
        },
        {
          value: "neutralization-system",
          label: "Neutralization System",
          suffix: "NeutralizationSystem",
        },
        {
          value: "e-chloro-batch",
          label: "E-Chloro (Batch)",
          suffix: "EChloroBatch",
        },
        {
          value: "e-chloro-contin",
          label: "E-Chloro (Contin.)",
          suffix: "EChloroContin",
        },
      ];
      const CALCULATION_PAGE_BY_SYSTEM = {
        "gas-chlorinator": "chlorination_calculator.html",
        "evaporator-steam": "calc.html",
        "evaporator-electrical": "calc.html",
        "evaporator-heater": "calc.html",
        "clo2-1-chem": "calc.html",
        "clo2-2-chem": "calc.html",
        "clo2-3-chem": "calc.html",
        "sodium-hypo": "calc.html",
        "absorption-system": "calc.html",
        "neutralization-system": "calc.html",
        "e-chloro-batch": "calc.html",
        "e-chloro-contin": "calc.html",
      };
      const PROPOSAL_DOCUMENT_TASKS = [
        {
          id: "company-profile",
          name: "Company Profile",
          folder: "CompanyProfile",
          viewOnly: true,
        },
        {
          id: "control-philosophy",
          name: "Control philosophy",
          folder: "ControlPhilosophy",
          prefix: "ControlPhilosophy",
        },
        {
          id: "performance-guarantee",
          name: "Performance Guarantee",
          folder: "PerformanceGuarantee",
          prefix: "PerformanceGuarantee",
        },
        {
          id: "maintenance-plan",
          name: "Maintenance Plan",
          folder: "MaintenancePlan",
          prefix: "MaintenancePlan",
        },
        {
          id: "warranty",
          name: "Warranty",
          folder: "Warranty",
          prefix: "Warranty",
        },
        {
          id: "operating-cost",
          name: "Operating Cost",
          folder: "OperatingCost",
          prefix: "OperatingCost",
        },
        {
          id: "om-manual",
          name: "O & M Manual",
          folder: "O&MManual",
          prefix: "O&MManual",
        },
        {
          id: "product-brochure",
          name: "Product Brochure",
          folder: "ProductBrouchure",
          prefix: "ProductBrochure",
        },
      ];
      const AI_PROPOSAL_DOCUMENT_IDS = [
        "control-philosophy",
        "operating-cost",
        "om-manual",
      ];

      const MOM_TEMPLATE =
        "Minutes of Meeting\nDate:\nPlatform:\nAttendees:\nAgenda:\nDiscussion Summary:\nAction Items:\nNext Steps:\nOwner and Deadline:";

      const MOM_DATA_TEMPLATE = {
        momNo: "",
        meetingDate: "",
        submissionDate: "",
        projectRef: "",
        meetingType: "",
        conductedBy: "",
        clientTeam: "",
        venue: "",
        duration: "",
        startTime: "",
        endTime: "",
        attendees: [{ name: "", organization: "", role: "" }],
        discussions: [{ point: "", summary: "" }],
        actions: [
          { point: "", action: "", responsibility: "", targetDate: "" },
        ],
        remarks: [{ text: "" }],
        nextMeetingDate: "",
        nextMeetingTime: "",
        nextMeetingVenue: "",
        preparedByName: "",
        preparedByDesignation: "",
        preparedByCompany: "",
      };

      // Full HTML template for MOM PDF (filled by generateMomHtmlUri)
      const MOM_HTML_TEMPLATE = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; background: #fff; font-family: Arial, sans-serif; color: #1a1a1a; -webkit-font-smoothing: antialiased; }
      .page { padding: 10px 12px; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; }
      .logo img { width: 120px; }
      .title-section { text-align: right; }
      .main-title { margin: 0 0 10px; color: #0a2f8f; font-size: 28px; font-weight: 800; letter-spacing: 0.3px; line-height: 1; }
      .top-info { font-size: 11px; line-height: 1.8; }
      .top-info span { display: inline-block; width: 112px; }
      .blue-line { height: 3px; background: #0a2f8f; margin: 10px 0 16px; }
      .top-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 14px; }
      .top-card { background: #f5f7fb; border: 1px solid #dfe6f2; border-radius: 6px; padding: 14px 16px; }
      .small-title { color: #7184bb; font-size: 10px; font-weight: 700; margin-bottom: 8px; }
      .small-value { color: #0a2f8f; font-size: 11px; font-weight: 700; }
      .grid { display: grid; grid-template-columns: 1fr 1.25fr; gap: 12px; margin-bottom: 10px; }
      .box { border: 1px solid #dfe6f2; border-radius: 6px; padding: 9px; margin-bottom: 10px; }
      .box-title { color: #0a2f8f; font-size: 11px; font-weight: 800; margin-bottom: 8px; }
      .info-table { width: 100%; border-collapse: collapse; }
      .info-table td { border-bottom: 1px solid #e4eaf4; padding: 7px 6px; font-size: 10px; }
      .info-table tr:last-child td { border-bottom: none; }
      .info-table td:nth-child(1) { width: 42%; }
      .info-table td:nth-child(2) { width: 4%; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #0a2f8f; color: #fff; border: 1px solid #5d75b1; padding: 6px 7px; font-size: 9.8px; font-weight: 700; }
      td { border: 1px solid #e4eaf4; padding: 6px 8px; font-size: 10px; line-height: 1.35; vertical-align: top; }
      .center { text-align: center; }
      .remarks ul { margin: 0; padding-left: 18px; }
      .remarks li { font-size: 10px; margin-bottom: 5px; line-height: 1.4; }
      .next { display: grid; grid-template-columns: auto auto auto auto auto auto auto; align-items: center; gap: 14px; border: 1px solid #dfe6f2; border-radius: 6px; padding: 9px 12px; margin-bottom: 16px; font-size: 10px; }
      .next strong { color: #0a2f8f; font-size: 11px; }
      .prepared-title { color: #0a2f8f; font-size: 11px; font-weight: 800; margin-bottom: 10px; }
      .sign { width: 165px; border-top: 2px solid #7484bc; margin-bottom: 8px; }
      .name { font-size: 10.5px; font-weight: 700; }
      .sub { font-size: 9.8px; line-height: 1.45; }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="header">
        <div class="logo"><img src="{{logoUrl}}" /></div>
        <div class="title-section">
          <div class="main-title">MINUTES OF MEETING</div>
          <div class="top-info">
            <div><span>MOM No.</span> : <strong>{{momNo}}</strong></div>
            <div><span>Meeting Date</span> : <strong>{{meetingDate}}</strong></div>
            <div><span>Submission Date</span> : <strong>{{submissionDate}}</strong></div>
            <div><span>Project Ref.</span> : <strong>{{projectRef}}</strong></div>
          </div>
        </div>
      </div>
      <div class="blue-line"></div>
      <div class="top-cards">
        <div class="top-card"><div class="small-title">PROJECT</div><div class="small-value">{{projectName}}</div></div>
        <div class="top-card"><div class="small-title">CLIENT</div><div class="small-value">{{clientName}}</div></div>
        <div class="top-card"><div class="small-title">LOCATION</div><div class="small-value">{{location}}</div></div>
      </div>
      <div class="grid">
        <div class="box">
          <div class="box-title">MEETING INFORMATION</div>
          <table class="info-table">
            <tr><td>Meeting Type</td><td>:</td><td>{{meetingType}}</td></tr>
            <tr><td>Conducted By</td><td>:</td><td>{{conductedBy}}</td></tr>
            <tr><td>Client Team</td><td>:</td><td>{{clientTeam}}</td></tr>
            <tr><td>Venue</td><td>:</td><td>{{venue}}</td></tr>
            <tr><td>Duration</td><td>:</td><td>{{duration}}</td></tr>
            <tr><td>Meeting Start Time</td><td>:</td><td>{{startTime}}</td></tr>
            <tr><td>Meeting End Time</td><td>:</td><td>{{endTime}}</td></tr>
          </table>
        </div>
        <div class="box">
          <div class="box-title">ATTENDEES</div>
          <table>
            <thead><tr><th>Name</th><th>Organization</th><th>Role</th></tr></thead>
            <tbody>{{attendeesRows}}</tbody>
          </table>
        </div>
      </div>
      <div class="box">
        <div class="box-title">DISCUSSION SUMMARY (What was Discussed)</div>
        <table>
          <thead><tr><th style="width:6%">S.No</th><th style="width:25%">Discussion Point</th><th>Discussion Summary (What was Discussed)</th></tr></thead>
          <tbody>{{discussionRows}}</tbody>
        </table>
      </div>
      <div class="box">
        <div class="box-title">DECISIONS / NEXT ACTIONS (Who will do What &amp; by When)</div>
        <table>
          <thead><tr><th style="width:6%">S.No</th><th style="width:24%">Discussion Point</th><th>Next Action / Decision</th><th style="width:17%">Responsibility</th><th style="width:17%">Target Date</th></tr></thead>
          <tbody>{{actionRows}}</tbody>
        </table>
      </div>
      <div class="box remarks">
        <div class="box-title">REMARKS</div>
        <ul>{{remarksRows}}</ul>
      </div>
      <div class="next">
        <strong>NEXT MEETING</strong>
        <div>Date : {{nextMeetingDate}}</div><div>|</div>
        <div>Time : {{nextMeetingTime}}</div><div>|</div>
        <div>Venue : {{nextMeetingVenue}}</div>
      </div>
      <div>
        <div class="prepared-title">PREPARED BY</div>
        <div class="sign"></div>
        <div class="name">{{preparedByName}}</div>
        <div class="sub">{{preparedByDesignation}}</div>
        <div class="sub">{{preparedByCompany}}</div>
      </div>
    </div>
  </body>
</html>`;
      // Full HTML template for Design Report (filled by generateDesignReportHtmlUri)
      const DESIGN_REPORT_HTML_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; background: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; -webkit-font-smoothing: antialiased; }
      .page { padding: 20px 25px; max-width: 1200px; margin: 0 auto; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
      .logo { width: 120px; }
      .logo img { width: 100%; height: auto; }
      .title-section { flex: 1; text-align: center; padding: 0 30px; }
      .main-title { margin: 0 0 15px; color: #0a2f8f; font-size: 32px; font-weight: 900; letter-spacing: 1px; line-height: 1.2; }
      .report-info { text-align: right; }
      .report-info-row { display: flex; justify-content: flex-end; margin-bottom: 5px; font-size: 12px; color: #0a2f8f; }
      .report-info-label { font-weight: 700; min-width: 100px; }
      .report-info-value { margin-left: 15px; font-weight: 700; }
      .blue-line { height: 4px; background: #0a2f8f; margin: 15px 0 20px; }
      .info-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
      .info-card { background: #f5f7fb; border: 2px solid #0a2f8f; border-radius: 6px; padding: 16px 12px; }
      .info-card-content { flex: 1; }
      .info-card-label { color: #7184bb; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
      .info-card-value { color: #0a2f8f; font-size: 12px; font-weight: 700; line-height: 1.3; }
      .section { margin-bottom: 20px; page-break-inside: avoid; }
      .section-header { display: flex; align-items: center; margin-bottom: 15px; }
      .section-number { background: #0a2f8f; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; margin-right: 12px; flex-shrink: 0; }
      .section-title { color: #0a2f8f; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
      .section-subtitle { color: #666; font-size: 11px; font-weight: 600; margin-left: 0; margin-top: 2px; }
      .two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
      .box { border: 2px solid #0a2f8f; border-radius: 6px; padding: 12px; background: #f9fbff; }
      .box-title { color: #0a2f8f; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #dfe6f2; }
      table { width: 100%; border-collapse: collapse; font-size: 10px; }
      th { background: #0a2f8f; color: #fff; border: 1px solid #0a2f8f; padding: 8px 6px; font-weight: 700; text-align: left; font-size: 9px; text-transform: uppercase; }
      td { border: 1px solid #dfe6f2; padding: 7px 6px; background: #fff; }
      tr:nth-child(even) td { background: #f9fbff; }
      .center { text-align: center; }
      .diffuser-card { border: 2px solid #0a2f8f; border-radius: 6px; padding: 12px; background: #f9fbff; }
      .diffuser-title { color: #0a2f8f; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #dfe6f2; }
      .fittings-section { border: 2px solid #0a2f8f; border-radius: 6px; padding: 12px; background: #f9fbff; }
      .remarks ul { margin: 0; padding-left: 20px; }
      .remarks li { margin-bottom: 6px; line-height: 1.4; font-size: 10px; }
      .no-data { padding: 20px; text-align: center; color: #666; font-style: italic; font-size: 11px; }
      @media print { .page { padding: 15px 20px; } body { margin: 0; padding: 0; } }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="header">
        <div class="logo"><img src="{{logoUrl}}" alt="Logo" /></div>
        <div class="title-section"><div class="main-title">{{reportTitle}}</div></div>
        <div class="report-info">
          <div class="report-info-row"><span class="report-info-label">Report No.</span><span class="report-info-value">: {{reportNo}}</span></div>
          <div class="report-info-row"><span class="report-info-label">Revision No.</span><span class="report-info-value">: {{revisionNo}}</span></div>
          <div class="report-info-row"><span class="report-info-label">Date</span><span class="report-info-value">: {{date}}</span></div>
          <div class="report-info-row"><span class="report-info-label">Project Ref.</span><span class="report-info-value">: {{projectRef}}</span></div>
        </div>
      </div>
      <div class="blue-line"></div>
      <div class="info-cards">
        <div class="info-card"><div class="info-card-content"><div class="info-card-label">PROJECT</div><div class="info-card-value">{{project}}</div></div></div>
        <div class="info-card"><div class="info-card-content"><div class="info-card-label">CLIENT</div><div class="info-card-value">{{client}}</div></div></div>
        <div class="info-card"><div class="info-card-content"><div class="info-card-label">LOCATION</div><div class="info-card-value">{{location}}</div></div></div>
        <div class="info-card"><div class="info-card-content"><div class="info-card-label">SYSTEM TYPE</div><div class="info-card-value">{{systemType}}</div></div></div>
      </div>
      {{reportSections}}
    </div>
  </body>
</html>`;

      const SITE_VISIT_TEMPLATE =
        "Site Visit Report\nVisit Date:\nAttendees:\nObjective:\nObservations:\nUtility Availability:\nSpace and Safety Notes:\nRecommended Next Steps:";
      const ASSUMPTIONS_TEMPLATE =
        "Mention assumptions made in calculation / anywhere where the client has not given the info. This is done so that it does not lead to misunderstanding in the future. Also mention the same in final design document submission.";

      const SCOPE_MATRIX_ITEMS = [
        {
          section: "1. TONNER AREA",
          items: [
            {
              id: 1,
              name: "Tonner Roller Support",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 2,
              name: "Chlorine Tonner",
              rsvpScope: true,
              clientScope: false,
            },
            { id: 3, name: "Half Hood", rsvpScope: true, clientScope: false },
            {
              id: 4,
              name: "Additional Ton Valve with Yoke",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 5,
              name: "Flexible Copper Coil Tube",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 6,
              name: "Manifold Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 7,
              name: "Tonner Manifold System",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 8,
              name: "Isolation Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 9,
              name: "Auto Shut-off/Change-over Valve",
              rsvpScope: true,
              clientScope: false,
            },
          ],
        },
        {
          section: "2. CHLORINATOR AREA",
          items: [
            { id: 10, name: "Gas Filter", rsvpScope: true, clientScope: null },
            { id: 11, name: "Ball Valve", rsvpScope: true, clientScope: null },
            {
              id: 12,
              name: "Pressure Reducing Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 13,
              name: "Isolation Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 14,
              name: "Automatic Vacuum Regulator (AVR)",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 15,
              name: "Pressure Relief Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 16,
              name: "Chlorinator - (Rotameter, Flow Control Valve, Pressure Regulator)",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 17,
              name: "Vacuum Relief Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 18,
              name: "Drain Relief Valve",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 19,
              name: "Non Return Valve",
              rsvpScope: true,
              clientScope: null,
            },
            { id: 20, name: "Ball Valve", rsvpScope: true, clientScope: false },
            {
              id: 21,
              name: "Pressure Gauge",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 22,
              name: "Vacuum Gauge",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 23,
              name: "Interconnecting Pipe (Gas line)",
              rsvpScope: true,
              clientScope: null,
            },
          ],
        },
        {
          section: "3. BOOSTER PUMP AREA",
          items: [
            {
              id: 24,
              name: "Basket Type Strainer",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 25,
              name: "Butterfly Valve (Inlet)",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 26,
              name: "Butterfly Valve (Outlet)",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 27,
              name: "Booster Pump",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 28,
              name: "Local Push Button Station",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 29,
              name: "Isolation Valve",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 30,
              name: "Check Valve",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 31,
              name: "Pressure Gauge",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 32,
              name: "Pump Suction Pipe",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 33,
              name: "Pump Discharge Pipe",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 34,
              name: "Flexible Coupling",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 35,
              name: "Anti-vibration Pads",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 36,
              name: "Pump Foundation Bolts",
              rsvpScope: true,
              clientScope: null,
            },
          ],
        },
        {
          section: "4. INJECTOR / DOSING AREA",
          items: [
            { id: 37, name: "Injector", rsvpScope: true, clientScope: null },
            { id: 38, name: "Check Valve", rsvpScope: true, clientScope: null },
            {
              id: 39,
              name: "Diaphragm Valve",
              rsvpScope: true,
              clientScope: null,
            },
            { id: 40, name: "Diffuser", rsvpScope: true, clientScope: null },
            {
              id: 41,
              name: "Solution Pipe (Injector to Diffuser) 10 meters",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 42,
              name: "Solution Pipe (Injector to Diffuser) 90 meters",
              rsvpScope: false,
              clientScope: true,
            },
            {
              id: 43,
              name: "Elbows / Tees / Reducers",
              rsvpScope: true,
              clientScope: null,
            },
            { id: 44, name: "Unions", rsvpScope: true, clientScope: null },
            {
              id: 45,
              name: "Pipe Clamps",
              rsvpScope: true,
              clientScope: false,
            },
            { id: 46, name: "U-Bolts", rsvpScope: true, clientScope: null },
            {
              id: 47,
              name: "Threaded Rods",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 48,
              name: "Anchor Fasteners",
              rsvpScope: true,
              clientScope: null,
            },
            { id: 49, name: "Gaskets", rsvpScope: true, clientScope: null },
            { id: 50, name: "PTFE Tape", rsvpScope: true, clientScope: false },
          ],
        },
        {
          section: "5. ELECTRICAL & INSTRUMENTATION",
          items: [
            {
              id: 51,
              name: "Control Panel",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 52,
              name: "Power Cable 40 Meters",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 53,
              name: "Control Cable 20 Meters",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 54,
              name: "Instrument Cable 40 Meters",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 55,
              name: "Cable Tray 60 Meters",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 56,
              name: "Cable Tray Supports",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 57,
              name: "Cable Glands",
              rsvpScope: true,
              clientScope: null,
            },
            { id: 58, name: "Cable Lugs", rsvpScope: true, clientScope: null },
            { id: 59, name: "Ferrules", rsvpScope: true, clientScope: null },
            {
              id: 60,
              name: "Junction Boxes",
              rsvpScope: true,
              clientScope: null,
            },
            {
              id: 61,
              name: "Earthing Cable",
              rsvpScope: false,
              clientScope: true,
            },
            {
              id: 62,
              name: "Earthing Electrode",
              rsvpScope: false,
              clientScope: true,
            },
            {
              id: 63,
              name: "Chlorine Leak Detector (2 Sensors)",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 64,
              name: "Hooter + Beacon",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 65,
              name: "FRC Analyzer",
              rsvpScope: false,
              clientScope: true,
            },
          ],
        },
        {
          section: "6. STRUCTURAL + CIVIL + GENERAL",
          items: [
            {
              id: 66,
              name: "Base Frame / Skid",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 67,
              name: "Equipment Supports",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 68,
              name: "Grouting Material",
              rsvpScope: false,
              clientScope: true,
            },
            { id: 69, name: "Painting", rsvpScope: false, clientScope: true },
            {
              id: 70,
              name: "Name Plates",
              rsvpScope: true,
              clientScope: false,
            },
            {
              id: 71,
              name: "Danger Boards",
              rsvpScope: true,
              clientScope: null,
            },
          ],
        },
      ];

      const REJECTION_TEMPLATE =
        "Enter the reason for not proceeding with the client and mention any key context that should be saved for future reference.";

      function clone(value) {
        return JSON.parse(JSON.stringify(value));
      }

      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      }

      function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, "&#96;");
      }

      function simpleSubtask(id, name, description, fields) {
        return {
          id,
          name,
          description,
          status: "pending",
          fields,
          data: {},
        };
      }

      function createStageTemplates() {
        return [
          {
            id: "requirement-engineering",
            name: "Requirement Engineering",
            icon: "RE",
            description:
              "Meetings, site review, calculations, revisions, assumptions, and design confirmation.",
            subtasks: [
              {
                id: "meetings",
                name: "Meetings (schedule)",
                description:
                  "Start with Meet - 1 and add more meetings whenever needed.",
                status: "pending",
                data: {
                  meets: [
                    {
                      platform: "",
                      attendees: [],
                      purpose: "",
                      scheduledDate: "",
                      scheduledTime: "",
                      meetLink: "",
                      additionalNotes: "",
                    },
                  ],
                },
              },
              {
                id: "mom-submission",
                name: "MOM Submission",
                description: "",
                status: "pending",
                data: {
                  moms: [clone(MOM_DATA_TEMPLATE)],
                },
              },
              {
                id: "system-requirement",
                name: "System Requirement",
                description:
                  "Select the system requirements for proposal document fetching.",
                status: "pending",
                data: {
                  notes: "Yet to decide",
                  selectedSystems: [],
                  prePostSystem: "no",
                },
              },
              {
                id: "site-visits",
                name: "Industry / Site Visits",
                description: "Capture visit date, attendees, and purpose.",
                status: "pending",
                data: {
                  visits: [
                    {
                      visitDate: "",
                      visitTime: "",
                      locationLink: "",
                      attendees: [],
                      purpose: "",
                    },
                  ],
                  calculationOutputs: [],
                },
              },
              {
                id: "visit-report",
                name: "Visit Report",
                description:
                  "Record utilities, constraints, and a detailed site visit report.",
                status: "pending",
                data: {
                  utilityRequirements: "",
                  siteConstraints: "",
                  reports: [{ visitReportText: SITE_VISIT_TEMPLATE }],
                },
              },
              {
                id: "design-calculation",
                name: "Design Calculation",
                description:
                  "Choose a selected system and open its calculation page. Revisions can be added below.",
                status: "pending",
                data: {
                  phase: "",
                  selectedCalculationSystem: "",
                  revisions: [{ revisionRequest: "" }],
                },
              },
              {
                id: "generate-documents",
                name: "Generate Documents",
                description: "Request project documents from employees.",
                status: "pending",
                data: {
                  requests: {
                    "P&ID": "",
                    GAD: "",
                    "Foundation Load": "",
                    "Technical Datasheet": "",
                  },
                },
              },
              {
                id: "compatability-check",
                name: "Compatability Check",
                description:
                  "Internal approval from production, confirming whether the design is practical.",
                status: "pending",
                data: {
                  notes: "Yet to decide",
                },
              },
              {
                id: "assumptions-made",
                name: "Scope Matrix",
                description:
                  "Define product scope between RSVP and Client. Items marked as TRUE/FALSE determine responsibility.",
                status: "pending",
                data: {
                  scopeMatrix: [],
                },
              },
              {
                id: "confirmation",
                name: "Confirmation: Process Design Summary, P&ID, GAD, Datasheets (if needed)",
                description: "Yet to decide.",
                status: "pending",
                data: {
                  notes: "Yet to decide",
                },
              },
            ],
          },
          {
            id: "proposal",
            name: "Proposal",
            icon: "PR",
            description:
              "Budgeting, scheduling, quotation drafting, uploads, and quotation revisions.",
            subtasks: [
              ...PROPOSAL_DOCUMENT_TASKS.map((task) => ({
                id: `proposal-doc-${task.id}`,
                name: task.name,
                description: task.viewOnly
                  ? "Get company profile documents from Database > Proposal Document. View only."
                  : "Get documents from Database > Proposal Document based on selected System Requirement.",
                status: "pending",
                data: {
                  documentTaskId: task.id,
                  documents: [],
                  savedAt: "",
                },
              })),
              {
                id: "budget-list",
                name: "Budget List",
                description: "Yet to decide.",
                status: "pending",
                data: {
                  notes: "Yet to decide",
                },
              },
              {
                id: "schedule",
                name: "Schedule",
                description:
                  "Start with Task 1 and add more tasks whenever needed.",
                status: "pending",
                data: {
                  tasks: [{ task: "", assignee: "", deadline: "" }],
                },
              },
              {
                id: "proposal-costing",
                name: "Costing",
                description: "Enter price for each selected system.",
                status: "pending",
                data: { systemPrices: [] },
              },
              {
                id: "proposal-payment-terms",
                name: "Payment Terms",
                description: "Enter payment terms.",
                status: "pending",
                data: { text: "" },
              },
              {
                id: "proposal-delivery-terms",
                name: "Delivery Terms",
                description: "Enter delivery terms.",
                status: "pending",
                data: { text: "" },
              },
              {
                id: "proposal-other-terms",
                name: "Other Terms and Condition",
                description: "Enter other terms and condition.",
                status: "pending",
                data: { text: "" },
              },
              {
                id: "quotation",
                name: "Quotation",
                description:
                  "Generate quotation PDF from client info, costing, and terms.",
                status: "pending",
                data: { quotationPdfDataUri: "", savedAt: "" },
              },
            ],
          },
          {
            id: "followups",
            name: "Follow Ups",
            icon: "FU",
            description:
              "Approvals, PO, invoice, and final procurement confirmation.",
            subtasks: [
              {
                id: "production-clearence",
                name: "Production Clearence / Project Approval",
                description: "Upload doc.",
                status: "pending",
                data: {
                  uploadDoc: [],
                },
              },
              {
                id: "purchase-order",
                name: "Purchase Order",
                description:
                  "Reminder: cross check purchase order with quotation.",
                status: "pending",
                data: {
                  uploadDoc: [],
                },
              },
              {
                id: "proforma-invoice",
                name: "Proforma Invoice",
                description: "Upload doc.",
                status: "pending",
                data: {
                  uploadDoc: [],
                },
              },
              {
                id: "confirmation-status",
                name: "Confirmation Status",
                description:
                  "Proceed for procurement or record why the client is not proceeding.",
                status: "pending",
                data: {
                  proceedForProcurement: "",
                  reason: "",
                  mention: REJECTION_TEMPLATE,
                },
              },
            ],
          },
          {
            id: "procurement",
            name: "Procurement",
            icon: "PC",
            description: "Material sourcing and vendor management.",
            subtasks: [
              simpleSubtask(
                "priority-list",
                "Get Priority List from Production Team",
                "",
                [
                  {
                    key: "priorities",
                    label: "Priority List",
                    type: "textarea",
                    rows: 4,
                  },
                ],
              ),
              simpleSubtask(
                "vendor-details",
                "Vendor Details (Existing/New/Risky, contact, type)",
                "",
                [
                  { key: "vendorName", label: "Vendor Name", type: "text" },
                  { key: "vendorType", label: "Type", type: "text" },
                  { key: "vendorContact", label: "Contact", type: "text" },
                ],
              ),
              simpleSubtask(
                "enquiry-track",
                "Enquiry Tracking (set Reminders)",
                "",
                [
                  {
                    key: "reminder",
                    label: "Reminder",
                    type: "textarea",
                    rows: 3,
                  },
                ],
              ),
              simpleSubtask(
                "vendor-docs",
                "Upload Quotes, Datasheet, images from vendor",
                "",
                [{ key: "uploads", label: "Upload Documents", type: "file" }],
              ),
              simpleSubtask(
                "comparison",
                "Comparison Sheet (AI Generated)",
                "",
                [
                  {
                    key: "comparison",
                    label: "Comparison Sheet",
                    type: "textarea",
                    rows: 4,
                  },
                ],
              ),
              simpleSubtask(
                "requirement-check",
                "Confirm requirement match with datasheets",
                "",
                [
                  {
                    key: "confirmed",
                    label: "Requirement Match",
                    type: "select",
                    options: ["Pending", "Confirmed", "Mismatch"],
                  },
                ],
              ),
              simpleSubtask("vendor-visit", "Vendor Visit Needed?", "", [
                {
                  key: "visitRequired",
                  label: "Vendor Visit Needed?",
                  type: "select",
                  options: ["Yes", "No"],
                },
              ]),
              simpleSubtask(
                "payment-review",
                "Review Payment Terms, Price, Advance Budgeting",
                "",
                [
                  {
                    key: "reviewed",
                    label: "Review Notes",
                    type: "textarea",
                    rows: 4,
                  },
                ],
              ),
              simpleSubtask("raise-po", "Raise PO", "", [
                { key: "poNumber", label: "PO Number", type: "text" },
              ]),
              simpleSubtask(
                "payment-request",
                "Raise Payment Requests to Accounts",
                "",
                [
                  {
                    key: "requestNumber",
                    label: "Request Number",
                    type: "text",
                  },
                ],
              ),
            ],
          },
          {
            id: "production",
            name: "Production",
            icon: "PD",
            description: "Manufacturing and fabrication phase.",
            subtasks: [
              simpleSubtask(
                "production-placeholder",
                "Production workflow to be defined",
                "",
                [{ key: "notes", label: "Notes", type: "textarea", rows: 4 }],
              ),
            ],
          },
          {
            id: "logistics",
            name: "Logistics/Dispatch",
            icon: "LG",
            description: "Shipment preparation and delivery coordination.",
            subtasks: [
              simpleSubtask("packing-list", "Packing List (BOQ)", "", [
                {
                  key: "packingList",
                  label: "Packing List",
                  type: "textarea",
                  rows: 4,
                },
              ]),
              simpleSubtask("delivery-challan", "Delivery Challan", "", [
                {
                  key: "challanNumber",
                  label: "Delivery Challan",
                  type: "text",
                },
              ]),
              simpleSubtask("eway-bill", "E-Way Bill", "", [
                { key: "ewayNumber", label: "E-Way Bill", type: "text" },
              ]),
              simpleSubtask("datasheet", "Datasheet", "", [
                { key: "attached", label: "Datasheet", type: "file" },
              ]),
              simpleSubtask("test-cert", "Test Certificate", "", [
                { key: "certNumber", label: "Certificate", type: "text" },
              ]),
              simpleSubtask("proforma", "Proforma Invoice", "", [
                { key: "invoiceNumber", label: "Invoice Number", type: "text" },
              ]),
              simpleSubtask(
                "transport-details",
                "Driver/Transport Details",
                "",
                [
                  { key: "driverName", label: "Driver Name", type: "text" },
                  { key: "vehicle", label: "Vehicle", type: "text" },
                ],
              ),
              simpleSubtask("einvoice", "E-Invoice", "", [
                { key: "invoiceNumber", label: "E-Invoice", type: "text" },
              ]),
              simpleSubtask("receiver-copy", "Receiver Copy", "", [
                {
                  key: "received",
                  label: "Receiver Copy",
                  type: "select",
                  options: ["Pending", "Received"],
                },
              ]),
              simpleSubtask("balance-payment", "Check Balance Payment", "", [
                { key: "balanceAmount", label: "Balance Amount", type: "text" },
              ]),
            ],
          },
          {
            id: "installation",
            name: "Installation",
            icon: "IN",
            description: "On-site installation and commissioning.",
            subtasks: [
              simpleSubtask(
                "installation-placeholder",
                "Installation workflow to be defined",
                "",
                [{ key: "notes", label: "Notes", type: "textarea", rows: 4 }],
              ),
            ],
          },
        ];
      }

      const ENQUIRY_TEMPLATE = {
        existingClient: "no",
        existingClientName: "",
        companyName: "",
        contactPersonName: "",
        contactNumber: "",
        email: "",
        contacts: [{ name: "", phone: "", email: "" }],
        industryType: "",
        clientType: "",
        enquiryFrom: "",
        screenshot: [],
        requirement: "",
        leadPriority: "",
        estimatedProjectValue: "",
        expectedTimeline: "",
      };

      const EMPLOYEE_TEMPLATE = {
        employeeId: "",
        name: "",
        loginPass: "",
        designation: "",
        email: "",
        documents: [],
      };

      const DESIGNATION_OPTIONS = [
        "Sales",
        "Project",
        "Draftsman",
        "Production",
        "Purchase",
        "Accounts",
        "Administrator",
      ];

      const ROLE_ACCESS = {
        Sales: {
          views: [
            "database",
            "enquiries",
            "clients",
            "projects",
            "meetings",
            "site-visits",
            "requests",
          ],
          stages: ["requirement-engineering", "proposal", "followups"],
        },
        Project: {
          views: [
            "database",
            "projects",
            "meetings",
            "site-visits",
            "requests",
          ],
          stages: [
            "requirement-engineering",
            "production",
            "logistics",
            "installation",
          ],
        },
        Draftsman: {
          views: ["projects", "meetings", "requests"],
          stages: [],
        },
        Production: {
          views: [
            "database",
            "projects",
            "meetings",
            "site-visits",
            "requests",
          ],
          stages: ["production", "logistics", "installation"],
        },
        Purchase: {
          views: [
            "database",
            "projects",
            "meetings",
            "site-visits",
            "requests",
          ],
          stages: ["procurement", "production"],
        },
        Accounts: {
          views: ["projects", "meetings", "requests"],
          stages: [],
        },
        Administrator: {
          views: [
            "database",
            "enquiries",
            "employees",
            "clients",
            "projects",
            "meetings",
            "site-visits",
            "requests",
          ],
          stages: [
            "requirement-engineering",
            "proposal",
            "followups",
            "procurement",
            "production",
            "logistics",
            "installation",
          ],
        },
      };

      const state = {
        enquiry: clone(ENQUIRY_TEMPLATE),
        employeeDraft: clone(EMPLOYEE_TEMPLATE),
        enquiries: [],
        employees: [],
        projects: [],
        currentProjectId: null,
        drawerOpen: false,
        employeeDrawerOpen: false,
        editingEmployeeId: null,
        currentUser: null,
        activeStageId: null,
        activeModal: null,
        activeUtilityModal: null,
        calendarDate: getLocalMonthKey(new Date()),
        activeCalculation: null,
        databaseDirectoryHandle: null,
      };
      let persistTimer = null;

      window.__rsvpAppVersion = "2026-05-05-click-fix-2";
      console.info("RSVP app loaded", window.__rsvpAppVersion);

      const INDIA_HOLIDAYS_2026 = [
        { date: "2026-01-26", name: "Republic Day" },
        { date: "2026-03-04", name: "Holi" },
      ];

      function getCurrentProject() {
        return (
          state.projects.find(
            (project) => project.id === state.currentProjectId,
          ) || null
        );
      }

      function normalizeRole(role) {
        return DESIGNATION_OPTIONS.includes(role) ? role : "";
      }

      function isAdmin() {
        return (
          state.currentUser && state.currentUser.designation === "Administrator"
        );
      }

      function getRoleAccess() {
        if (!state.currentUser) {
          // No user logged in, return empty access (will fail checks)
          return { views: [], stages: [] };
        }

        // Setup admin and Administrator get full access
        if (
          state.currentUser.id === "setup-admin" ||
          state.currentUser.designation === "Administrator"
        ) {
          return ROLE_ACCESS["Administrator"] || { views: [], stages: [] };
        }

        const role = state.currentUser.designation;
        return ROLE_ACCESS[role] || { views: [], stages: [] };
      }

      function canAccessView(viewName) {
        if (!state.currentUser) return false;

        // Setup admin and Administrator always have access
        if (
          state.currentUser.id === "setup-admin" ||
          state.currentUser.designation === "Administrator"
        ) {
          return true;
        }

        const access = getRoleAccess();
        return access.views && access.views.includes(viewName);
      }

      function canAccessStage(stageId) {
        if (!state.currentUser) return false;

        // Setup admin and Administrator always have access
        if (
          state.currentUser.id === "setup-admin" ||
          state.currentUser.designation === "Administrator"
        ) {
          return true;
        }

        const project = getCurrentProject();
        if (stageId === "requirement-engineering" && project) {
          if (isRequirementEngineeringUnlocked(project)) return true;
          return (
            project.projectHeadId &&
            project.projectHeadId === state.currentUser.id
          );
        }

        const access = getRoleAccess();
        return access.stages && access.stages.includes(stageId);
      }

      function getNavButtonView(button) {
        const match = String(button.getAttribute("onclick") || "").match(
          /switchView\('([^']+)'/,
        );
        return match ? match[1] : "";
      }

      function applyAccessUi() {
        document.querySelectorAll(".nav-btn").forEach((button) => {
          const viewName = getNavButtonView(button);
          button.style.display = canAccessView(viewName) ? "" : "none";
        });
        const label = document.getElementById("currentUserLabel");
        if (label) {
          label.textContent = state.currentUser
            ? `${state.currentUser.name || state.currentUser.employeeId} | ${state.currentUser.designation}`
            : "";
        }
      }

      function showLoginScreen(message) {
        const login = document.getElementById("loginScreen");
        const appHeader = document.querySelector("header");
        const appMain = document.querySelector(".main-container");
        if (login) login.style.display = "grid";
        if (appHeader) appHeader.style.display = "none";
        if (appMain) appMain.style.display = "none";
        const messageBox = document.getElementById("loginMessage");
        if (messageBox) messageBox.textContent = message || "";
      }

      function showAppScreen() {
        const login = document.getElementById("loginScreen");
        const appHeader = document.querySelector("header");
        const appMain = document.querySelector(".main-container");
        if (login) login.style.display = "none";
        if (appHeader) appHeader.style.display = "";
        if (appMain) appMain.style.display = "";
        applyAccessUi();
      }

      function getFirstAllowedView() {
        const access = getRoleAccess();
        return access.views && access.views.length > 0
          ? access.views[0]
          : "projects";
      }

      function loginUser(event) {
        if (event) event.preventDefault();
        const employeeId = document
          .getElementById("loginEmployeeId")
          .value.trim();
        const loginPass = document.getElementById("loginPass").value;
        const employee = state.employees.find(
          (item) =>
            String(item.employeeId || "").trim() === employeeId &&
            String(item.loginPass || "") === loginPass,
        );
        if (!employee || !normalizeRole(employee.designation)) {
          showLoginScreen("Invalid Employee ID or Login Pass.");
          return;
        }
        state.currentUser = {
          id: employee.id,
          employeeId: employee.employeeId,
          name: employee.name,
          designation: employee.designation,
        };
        localStorage.setItem(
          "rsvpCurrentUser",
          JSON.stringify(state.currentUser),
        );
        showAppScreen();
        renderDashboard();
        renderDatabase();
        renderMenuViews();
        const firstView = getFirstAllowedView();
        const firstButton = Array.from(
          document.querySelectorAll(".nav-btn"),
        ).find((button) => getNavButtonView(button) === firstView);
        switchView(firstView, firstButton);
      }

      function logoutUser() {
        state.currentUser = null;
        localStorage.removeItem("rsvpCurrentUser");
        closeSubtaskModal();
        closeUtilityModal();
        showLoginScreen("");
      }

      function restoreLoggedInUser() {
        try {
          const saved = JSON.parse(
            localStorage.getItem("rsvpCurrentUser") || "null",
          );
          if (!saved || !saved.employeeId) return false;
          const employee = state.employees.find(
            (item) =>
              String(item.employeeId || "") === String(saved.employeeId || ""),
          );
          if (!employee || !normalizeRole(employee.designation)) return false;
          state.currentUser = {
            id: employee.id,
            employeeId: employee.employeeId,
            name: employee.name,
            designation: employee.designation,
          };
          return true;
        } catch (error) {
          return false;
        }
      }

      function getTimelineDetails(expectedTimeline) {
        const dueDate = new Date();
        let deadlineMonths = "--";
        if (expectedTimeline === "urgent") {
          dueDate.setDate(dueDate.getDate() + 14);
          deadlineMonths = "0.5 months";
        } else if (expectedTimeline === "3 months") {
          dueDate.setMonth(dueDate.getMonth() + 3);
          deadlineMonths = "3 months";
        } else if (expectedTimeline === "6 months") {
          dueDate.setMonth(dueDate.getMonth() + 6);
          deadlineMonths = "6 months";
        }
        return {
          deadlineMonths,
          deadlineDate: dueDate.toISOString(),
        };
      }

      function formatDate(value) {
        if (!value) return "--";
        return new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      }

      function padDatePart(value) {
        return String(value).padStart(2, "0");
      }

      function getLocalDateKey(date) {
        return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;
      }

      function getLocalMonthKey(date) {
        return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}`;
      }

      function createProjectFromEnquiry(enquirySource, projectHeadId) {
        const enquiry = clone(enquirySource || state.enquiry);
        const timeline = getTimelineDetails(enquiry.expectedTimeline);
        const name =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName || "Existing Client Project"
            : enquiry.companyName || enquiry.contactPersonName || "New Project";
        const stages = createStageTemplates();
        const requirementStage = stages.find(
          (stage) => stage.id === "requirement-engineering",
        );
        if (requirementStage) {
          requirementStage.subtasks.forEach((subtask) => {
            subtask.assignedTo = "";
          });
        }

        const project = {
          id: `project-${Date.now()}`,
          name,
          enquiry,
          projectHeadId: projectHeadId || "",
          requirementEngineeringLocked: true,
          deadlineMonths: timeline.deadlineMonths,
          deadlineDate: timeline.deadlineDate,
          stages,
        };

        state.projects.push(project);
        return project;
      }

      function getProjectMetrics(project) {
        if (!project) {
          return { totalTasks: 0, finishedTasks: 0, completionRate: 0 };
        }
        const allSubtasks = project.stages.flatMap((stage) => stage.subtasks);
        const totalTasks = allSubtasks.length;
        const finishedTasks = allSubtasks.filter(
          (subtask) => subtask.status === "completed",
        ).length;
        const completionRate = totalTasks
          ? Math.round((finishedTasks / totalTasks) * 100)
          : 0;
        return { totalTasks, finishedTasks, completionRate };
      }

      function getProjectStatus(project) {
        const metrics = getProjectMetrics(project);
        if (!metrics.totalTasks || metrics.finishedTasks === 0) {
          return { label: "New", className: "new" };
        }
        if (metrics.completionRate === 100) {
          return { label: "Completed", className: "completed" };
        }
        const followupStage = project.stages.find(
          (stage) => stage.id === "followups",
        );
        const followupProgress = followupStage
          ? getStageProgress(followupStage).progress
          : 0;
        if (followupProgress === 100) {
          return { label: "In Progress", className: "in-progress" };
        }
        return { label: "Proposal", className: "proposal" };
      }

      function renderProjectList() {
        if (!state.projects.length) {
          return `<div class="empty-state"><h3>No projects yet</h3><p>Open a saved enquiry and use Create Project to add it here.</p></div>`;
        }

        return `
                <div class="table-wrap">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${state.projects
                        .map((project) => {
                          const status = getProjectStatus(project);
                          const priority = project.enquiry
                            ? project.enquiry.leadPriority
                            : "";
                          return `
                            <tr onclick="openProjectDashboard('${project.id}')">
                              <td>${escapeHtml(project.name)}</td>
                              <td>${escapeHtml(formatDate(project.deadlineDate))}</td>
                              <td>${escapeHtml(priority || "--")}</td>
                              <td><span class="status-badge ${status.className}">${escapeHtml(status.label)}</span></td>
                              <td>
                                <button class="btn btn-secondary" type="button" onclick="event.stopPropagation(); openProjectDashboard('${project.id}')">Open</button>
                              </td>
                            </tr>
                          `;
                        })
                        .join("")}
                    </tbody>
                  </table>
                </div>
              `;
      }

      function getStageProgress(stage) {
        const total = stage.subtasks.length;
        const completed = stage.subtasks.filter(
          (task) => task.status === "completed",
        ).length;
        const progress = total ? Math.round((completed / total) * 100) : 0;
        return { total, completed, progress };
      }

      function getStage(stageId) {
        const project = getCurrentProject();
        return project
          ? project.stages.find((stage) => stage.id === stageId)
          : null;
      }

      function getSubtask(stageId, subtaskId) {
        const stage = getStage(stageId);
        return stage
          ? stage.subtasks.find((subtask) => subtask.id === subtaskId)
          : null;
      }

      function getProjectEmployees() {
        return state.employees.filter(
          (employee) => employee.designation === "Project",
        );
      }

      function getRequirementEngineeringStage(project) {
        return project
          ? project.stages.find(
              (stage) => stage.id === "requirement-engineering",
            )
          : null;
      }

      function areRequirementEngineeringTasksAssigned(project) {
        const stage = getRequirementEngineeringStage(project);
        return Boolean(
          stage &&
          stage.subtasks.length &&
          stage.subtasks.every((subtask) => subtask.assignedTo),
        );
      }

      function isRequirementEngineeringUnlocked(project) {
        if (!project) return false;
        if (!project.projectHeadId && !project.requirementEngineeringLocked) {
          return true;
        }
        return areRequirementEngineeringTasksAssigned(project);
      }

      function isRequirementEngineeringLocked(project) {
        return Boolean(
          project &&
          (project.projectHeadId || project.requirementEngineeringLocked) &&
          !areRequirementEngineeringTasksAssigned(project),
        );
      }

      function canUseRequirementEngineeringTasks(stageId) {
        if (stageId !== "requirement-engineering") return true;
        return !isRequirementEngineeringLocked(getCurrentProject());
      }

      function getEmployeeLabel(employee) {
        return `${employee.name}${employee.employeeId ? " (" + employee.employeeId + ")" : ""}${employee.designation ? " - " + employee.designation : ""}`;
      }

      function getEmployeeOptions() {
        return state.employees.map((employee) => ({
          value: employee.id,
          label: getEmployeeLabel(employee),
        }));
      }

      function getEmployeeName(employeeId) {
        const employee = state.employees.find((item) => item.id === employeeId);
        return employee ? getEmployeeLabel(employee) : "";
      }

      function getMeetingSubtask(project) {
        const stage = project.stages.find(
          (item) => item.id === "requirement-engineering",
        );
        return stage
          ? stage.subtasks.find((item) => item.id === "meetings")
          : null;
      }

      function getVisitSubtask(project) {
        const stage = project.stages.find(
          (item) => item.id === "requirement-engineering",
        );
        return stage
          ? stage.subtasks.find((item) => item.id === "site-visits")
          : null;
      }

      function getVisitReportSubtask(project) {
        const stage = project.stages.find(
          (item) => item.id === "requirement-engineering",
        );
        return stage
          ? stage.subtasks.find((item) => item.id === "visit-report")
          : null;
      }

      function getSystemRequirementSubtask(project) {
        const stage = project.stages.find(
          (item) => item.id === "requirement-engineering",
        );
        return stage
          ? stage.subtasks.find((item) => item.id === "system-requirement")
          : null;
      }

      function getProposalDocumentTaskConfig(subtaskId) {
        const taskId = String(subtaskId || "").replace("proposal-doc-", "");
        return (
          PROPOSAL_DOCUMENT_TASKS.find((task) => task.id === taskId) || null
        );
      }

      function isAiProposalDocumentSubtask(subtaskId) {
        const taskId = String(subtaskId || "").replace("proposal-doc-", "");
        return AI_PROPOSAL_DOCUMENT_IDS.includes(taskId);
      }

      function getSelectedSystemRequirements() {
        const project = getCurrentProject();
        const subtask = project ? getSystemRequirementSubtask(project) : null;
        const selected =
          subtask && Array.isArray(subtask.data.selectedSystems)
            ? subtask.data.selectedSystems
            : [];
        return SYSTEM_REQUIREMENTS.filter((system) =>
          selected.includes(system.value),
        );
      }

      function summarizeSubtask(subtask) {
        if (subtask.id === "system-requirement") {
          const count = Array.isArray(subtask.data.selectedSystems)
            ? subtask.data.selectedSystems.length
            : 0;
          return count
            ? `${count} system selected`
            : "Select systems for proposal docs";
        }
        if (subtask.id && subtask.id.startsWith("proposal-doc-")) {
          const docs = subtask.data.documents || [];
          return docs.length
            ? `${docs.length} document loaded${subtask.data.savedAt ? " and saved" : ""}`
            : "Use Get to load from Database";
        }
        if (subtask.id === "meetings") {
          return `${subtask.data.meets.length} meet entry`;
        }
        if (subtask.id === "mom-submission") {
          const total = subtask.data.moms ? subtask.data.moms.length : 0;
          const done = (subtask.data.moms || []).filter((mom) =>
            (mom.momText || "").trim(),
          ).length;
          return `${done}/${total} MOM written`;
        }
        if (subtask.id === "site-visits") {
          const visits = subtask.data.visits || [];
          return `${visits.length} visit entry`;
        }
        if (subtask.id === "visit-report") {
          const total = subtask.data.reports ? subtask.data.reports.length : 0;
          const done = (subtask.data.reports || []).filter((report) =>
            (report.visitReportText || "").trim(),
          ).length;
          return `${done}/${total} visit report written`;
        }
        if (subtask.id === "schedule") {
          return `${subtask.data.tasks.length} scheduled task`;
        }
        if (subtask.data.revisions) {
          return `${subtask.data.revisions.length} revision block`;
        }
        if (
          subtask.id === "confirmation-status" &&
          subtask.data.proceedForProcurement
        ) {
          return `Proceed for Procurement: ${subtask.data.proceedForProcurement}`;
        }
        return subtask.description || "Open to update details";
      }

      function renderStandardField(key, label, type, value) {
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <input type="${type}" value="${escapeAttr(value || "")}" oninput="setEnquiryField('${key}', this.value)">
                </div>
              `;
      }

      function renderSelectField(key, label, value, options) {
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <select onchange="setEnquiryField('${key}', this.value)">
                    <option value="">Select</option>
                    ${options
                      .map(
                        (option) =>
                          `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
              `;
      }

      function renderTextAreaField(key, label, value, placeholder, rows) {
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <textarea rows="${rows}" placeholder="${escapeAttr(placeholder)}" oninput="setEnquiryField('${key}', this.value)">${escapeHtml(value || "")}</textarea>
                </div>
              `;
      }

      function renderFileField(key, label, files) {
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <input type="file" onchange="handleEnquiryFile(event, '${key}')">
                  ${files && files.length ? `<div class="helper-note">Selected: ${escapeHtml(files.join(", "))}</div>` : ""}
                </div>
              `;
      }

      function renderEnquiryContactRow(contact, index, total) {
        return `
                <div class="inline-grid" style="gap: 10px; margin-top: 12px; align-items: flex-end;">
                  <div class="form-group" style="flex:1; margin:0;">
                    <label>Contact Name</label>
                    <input type="text" value="${escapeAttr(contact.name)}" oninput="setEnquiryContactField(${index}, 'name', this.value)" />
                  </div>
                  <div class="form-group" style="flex:1; margin:0;">
                    <label>Phone</label>
                    <input type="text" value="${escapeAttr(contact.phone)}" oninput="setEnquiryContactField(${index}, 'phone', this.value)" />
                  </div>
                  <div class="form-group" style="flex:1; margin:0;">
                    <label>Email</label>
                    <input type="email" value="${escapeAttr(contact.email)}" oninput="setEnquiryContactField(${index}, 'email', this.value)" />
                  </div>
                  <div style="margin-top: 26px;">
                    ${total > 1 ? `<button class="btn btn-secondary" type="button" onclick="removeEnquiryContact(${index})">Remove</button>` : ""}
                  </div>
                </div>
              `;
      }

      function getScopeMatrixRows(subtask) {
        if (
          !subtask.data.scopeMatrix ||
          !Array.isArray(subtask.data.scopeMatrix)
        ) {
          subtask.data.scopeMatrix = [];
        }
        const rowMap = Object.fromEntries(
          subtask.data.scopeMatrix.map((row) => [row.id, row]),
        );
        const rows = SCOPE_MATRIX_ITEMS.flatMap((group) =>
          group.items.map((item) => ({
            id: item.id,
            section: group.section || "",
            category: group.category || "",
            name: item.name,
            rsvpScope: rowMap[item.id]?.rsvpScope ?? Boolean(item.rsvpScope),
            clientScope:
              rowMap[item.id]?.clientScope ?? Boolean(item.clientScope),
          })),
        );
        subtask.data.scopeMatrix = rows;
        return rows;
      }

      function setScopeMatrixField(stageId, subtaskId, itemId, key, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        const rows = getScopeMatrixRows(subtask);
        const row = rows.find((item) => item.id === itemId);
        if (!row) return;
        row[key] = value;
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function renderAssumptionsSubtask(stageId, subtask) {
        const rows = getScopeMatrixRows(subtask);
        const grouped = [];
        rows.forEach((row) => {
          let group = grouped.find(
            (g) => g.section === row.section && g.category === row.category,
          );
          if (!group) {
            group = { section: row.section, category: row.category, items: [] };
            grouped.push(group);
          }
          group.items.push(row);
        });

        let html = `
          <div class="assumption-actions">
            <button class="btn btn-secondary" type="button" onclick="saveAssumptionsPdf('${stageId}', '${subtask.id}')">Save as PDF</button>
          </div>
        `;
        grouped.forEach((group) => {
          if (group.section) {
            html += `<h4 style="margin-top: 20px; margin-bottom: 10px; color: var(--accent);">${escapeHtml(group.section)}</h4>`;
          }
          html += `
            <table class="assumption-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="checkbox-cell">RSVP Scope</th>
                  <th class="checkbox-cell">Client Scope</th>
                </tr>
              </thead>
              <tbody>
                ${group.items
                  .map(
                    (item) => `
                      <tr>
                        <td>${escapeHtml(item.name)}</td>
                        <td class="checkbox-cell">
                          <input type="checkbox" ${item.rsvpScope ? "checked" : ""} onchange="setScopeMatrixField('${stageId}', '${subtask.id}', ${item.id}, 'rsvpScope', this.checked)" />
                        </td>
                        <td class="checkbox-cell">
                          <input type="checkbox" ${item.clientScope ? "checked" : ""} onchange="setScopeMatrixField('${stageId}', '${subtask.id}', ${item.id}, 'clientScope', this.checked)" />
                        </td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          `;
        });
        return html;
      }

      function renderEnquiryDrawer() {
        const enquiry = state.enquiry;
        if (!["yes", "no"].includes(enquiry.existingClient)) {
          enquiry.existingClient = "no";
        }
        const existing = enquiry.existingClient === "yes";
        document.getElementById("enquiryDrawerBody").innerHTML = `
                <div class="form-section">
                  <h4>Lead Qualification</h4>
                  <div class="form-group">
                    <label>Existing Client? (Yes / No)</label>
                    <div class="choice-grid">
                      <label class="choice-chip ${enquiry.existingClient === "yes" ? "active" : ""}">
                        <input type="radio" name="existingClient" value="yes" ${enquiry.existingClient === "yes" ? "checked" : ""} onchange="setEnquiryField('existingClient', this.value)">
                        YES
                      </label>
                      <label class="choice-chip ${enquiry.existingClient !== "yes" ? "active" : ""}">
                        <input type="radio" name="existingClient" value="no" ${enquiry.existingClient !== "yes" ? "checked" : ""} onchange="setEnquiryField('existingClient', this.value)">
                        NO
                      </label>
                    </div>
                  </div>

                  ${
                    existing
                      ? `
                        <div class="form-group">
                          <label>Dropdown list of existing client</label>
                          <select onchange="setEnquiryField('existingClientName', this.value)">
                            <option value="">Select client</option>
                            ${
                              getExistingClientOptions().length
                                ? getExistingClientOptions()
                                    .map(
                                      (client) =>
                                        `<option value="${client}" ${enquiry.existingClientName === client ? "selected" : ""}>${client}</option>`,
                                    )
                                    .join("")
                                : `<option value="" disabled>No clients in Clients menu</option>`
                            }
                          </select>
                          ${
                            getExistingClientOptions().length
                              ? ""
                              : `<p class="helper-note">Create a project from an enquiry first. Its client will appear here.</p>`
                          }
                        </div>
                        <div class="form-group">
                          <div class="field-label-row">
                            <label>Additional Contacts</label>
                            <button class="icon-btn" type="button" onclick="addEnquiryContact()">+</button>
                          </div>
                          ${enquiry.contacts
                            .map(
                              (contact, index) => `
                                <div class="inline-grid" style="gap: 10px; margin-top: 12px; align-items: flex-end;">
                                  <div class="form-group" style="flex:1; margin:0;">
                                    <label>Contact Name</label>
                                    <input type="text" value="${escapeAttr(contact.name)}" oninput="setEnquiryContactField(${index}, 'name', this.value)" />
                                  </div>
                                  <div class="form-group" style="flex:1; margin:0;">
                                    <label>Phone</label>
                                    <input type="text" value="${escapeAttr(contact.phone)}" oninput="setEnquiryContactField(${index}, 'phone', this.value)" />
                                  </div>
                                  <div class="form-group" style="flex:1; margin:0;">
                                    <label>Email</label>
                                    <input type="email" value="${escapeAttr(contact.email)}" oninput="setEnquiryContactField(${index}, 'email', this.value)" />
                                  </div>
                                  <div style="margin-top: 26px;">
                                    ${enquiry.contacts.length > 1 ? `<button class="btn btn-secondary" type="button" onclick="removeEnquiryContact(${index})">Remove</button>` : ""}
                                  </div>
                                </div>
                              `,
                            )
                            .join("")}
                        </div>
                        <div class="inline-grid">
                          ${renderSelectField("industryType", "Industry Type", enquiry.industryType, INDUSTRY_TYPES)}
                          ${renderSelectField("clientType", "Reseller / Direct user / Other", enquiry.clientType, ["Reseller", "Direct user", "Other"])}
                        </div>
                      `
                      : `
                        <div class="inline-grid">
                          ${renderStandardField("companyName", "Company Name", "text", enquiry.companyName)}
                          ${renderStandardField("contactPersonName", "Contact Person Name", "text", enquiry.contactPersonName)}
                        </div>
                        <div class="inline-grid">
                          ${renderStandardField("contactNumber", "Contact Number", "text", enquiry.contactNumber)}
                          ${renderStandardField("email", "E-mail", "email", enquiry.email)}
                        </div>
                        <p class="helper-note">Either contact number or email must be filled.</p>
                        <div class="form-group">
                          <div class="field-label-row">
                            <label>Additional Contacts</label>
                            <button class="icon-btn" type="button" onclick="addEnquiryContact()">+</button>
                          </div>
                          ${enquiry.contacts
                            .map(
                              (contact, index) => `
                                <div class="inline-grid" style="gap: 10px; margin-top: 12px; align-items: flex-end;">
                                  <div class="form-group" style="flex:1; margin:0;">
                                    <label>Contact Name</label>
                                    <input type="text" value="${escapeAttr(contact.name)}" oninput="setEnquiryContactField(${index}, 'name', this.value)" />
                                  </div>
                                  <div class="form-group" style="flex:1; margin:0;">
                                    <label>Phone</label>
                                    <input type="text" value="${escapeAttr(contact.phone)}" oninput="setEnquiryContactField(${index}, 'phone', this.value)" />
                                  </div>
                                  <div class="form-group" style="flex:1; margin:0;">
                                    <label>Email</label>
                                    <input type="email" value="${escapeAttr(contact.email)}" oninput="setEnquiryContactField(${index}, 'email', this.value)" />
                                  </div>
                                  <div style="margin-top: 26px;">
                                    ${enquiry.contacts.length > 1 ? `<button class="btn btn-secondary" type="button" onclick="removeEnquiryContact(${index})">Remove</button>` : ""}
                                  </div>
                                </div>
                              `,
                            )
                            .join("")}
                        </div>
                        <div class="inline-grid">
                          ${renderSelectField("industryType", "Industry Type", enquiry.industryType, INDUSTRY_TYPES)}
                          ${renderSelectField("clientType", "Reseller / Direct user / Other", enquiry.clientType, ["Reseller", "Direct user", "Other"])}
                        </div>
                      `
                  }

                  <div class="divider"></div>

                  <div class="inline-grid">
                    ${renderSelectField("enquiryFrom", "Enquiry From", enquiry.enquiryFrom, ["IndiaMart", "Email", "Website", "WhatsApp", "Others"])}
                    ${renderFileField("screenshot", "Screenshot of Enquiry (optional)", enquiry.screenshot)}
                  </div>

                  ${renderTextAreaField("requirement", "Requirement (rough)", enquiry.requirement, "Enter rough requirement", 4)}

                  <div class="inline-grid">
                    ${renderSelectField("leadPriority", "Lead Priority", enquiry.leadPriority, ["High", "Medium", "Low"])}
                    ${renderStandardField("estimatedProjectValue", "Estimated Project Value (rough)", "text", enquiry.estimatedProjectValue)}
                  </div>

                  ${renderSelectField("expectedTimeline", "Expected Timeline", enquiry.expectedTimeline, ["urgent", "3 months", "6 months"])}
                </div>

                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" onclick="submitEnquiry()">Save Enquiry</button>
                  <button class="btn btn-secondary" type="button" onclick="resetEnquiry()">Reset</button>
                </div>
              `;
      }

      function renderDashboard() {
        const project = getCurrentProject();
        const container = document.getElementById("dashboardContent");

        if (!project) {
          container.innerHTML = `
                  <div class="empty-state">
                    <h3>No project created yet</h3>
                    <p>Create a project from an enquiry, then open it from the Projects menu to see the full Project Timeline & Stages dashboard.</p>
                  </div>
                `;
          document.getElementById("stageDetailViews").innerHTML = "";
          renderMenuViews();
          return;
        }

        const metrics = getProjectMetrics(project);
        const requirementLocked = isRequirementEngineeringLocked(project);

        container.innerHTML = `
                <div class="project-hero">
                  <div class="hero-topline">
                    <div>
                      <h2>${escapeHtml(project.name)}</h2>
                      <p>${escapeHtml(project.enquiry.requirement || "Requirement summary will appear here once entered in enquiry.")}</p>
                    </div>
                    <div class="hero-actions">
                      <button class="icon-btn" type="button" title="Calendar" onclick="openUtilityModal('calendar')">Cal</button>
                      <button class="icon-btn" type="button" title="Reminders" onclick="openUtilityModal('reminders')">Rem</button>
                    </div>
                  </div>
                </div>

                <div class="pill-row">
                  ${state.projects
                    .map(
                      (item) => `
                        <button class="project-pill ${item.id === project.id ? "active" : ""}" type="button" onclick="selectProject('${item.id}')">
                          ${escapeHtml(item.name)}
                        </button>
                      `,
                    )
                    .join("")}
                </div>

                <div class="stats-grid">
                  <div class="stat-card">
                    <div class="stat-label">Project Completion Rate</div>
                    <div class="stat-value">${metrics.completionRate}%</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-label">Total Task</div>
                    <div class="stat-value">${metrics.totalTasks}</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-label">Finished Task</div>
                    <div class="stat-value">${metrics.finishedTasks}</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-label">Deadline</div>
                    <div class="stat-value">${escapeHtml(project.deadlineMonths)}</div>
                    <div class="deadline-secondary">${escapeHtml(formatDate(project.deadlineDate))}</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-label">Project Head</div>
                    <div class="stat-value" style="font-size:1rem">${escapeHtml(getEmployeeName(project.projectHeadId) || "--")}</div>
                    <div class="deadline-secondary">${requirementLocked ? "Requirement Engineering locked" : "Requirement Engineering unlocked"}</div>
                  </div>
                </div>

                <h2 class="section-title">Project Timeline & Stages</h2>
                <div id="stageCards" class="timeline-grid"></div>
              `;

        renderStageCards(project);
        renderStageDetails(project);
        renderDatabase();
        renderMenuViews();
      }

      function getClientRows() {
        const clientNames = new Map();
        state.projects.forEach((project) => {
          const enquiry = project.enquiry || {};
          const name =
            enquiry.existingClient === "yes"
              ? enquiry.existingClientName
              : enquiry.companyName;
          if (!name) return;
          clientNames.set(name, {
            name,
            contact: enquiry.contactPersonName || "--",
            email: enquiry.email || "--",
            phone: enquiry.contactNumber || "--",
            projectName: project.name,
          });
        });
        return Array.from(clientNames.values());
      }

      function getExistingClientOptions() {
        const projectClientNames = getClientRows().map((client) => client.name);
        return Array.from(new Set(projectClientNames.filter(Boolean))).sort(
          (a, b) => a.localeCompare(b),
        );
      }

      function getAllMeetingRows() {
        const rows = state.projects.flatMap((project) => {
          const subtask = getMeetingSubtask(project);
          return (subtask && subtask.data.meets ? subtask.data.meets : []).map(
            (meet, index) => ({
              projectId: project.id,
              projectName: project.name,
              title: `Meet ${index + 1}`,
              index,
              date: meet.scheduledDate || "--",
              time: meet.scheduledTime || "--",
              platform: meet.platform || "--",
              link: meet.meetLink || "",
              notes: meet.additionalNotes || "--",
              attendeeIds: meet.attendees || [],
              attendees: (meet.attendees || [])
                .map(getEmployeeName)
                .filter(Boolean),
            }),
          );
        });
        if (isAdmin()) return rows;
        const currentId = state.currentUser ? state.currentUser.id : "";
        return rows.filter((row) => row.attendeeIds.includes(currentId));
      }

      function getAllSiteVisitRows() {
        const rows = state.projects.flatMap((project) => {
          const subtask = getVisitSubtask(project);
          return (
            subtask && subtask.data.visits ? subtask.data.visits : []
          ).map((visit, index) => ({
            projectId: project.id,
            projectName: project.name,
            title: `Visit ${index + 1}`,
            index,
            date: visit.visitDate || "--",
            time: visit.visitTime || "--",
            link: visit.locationLink || "",
            purpose: visit.purpose || "--",
            attendeeIds: visit.attendees || [],
            attendees: (visit.attendees || [])
              .map(getEmployeeName)
              .filter(Boolean),
          }));
        });
        if (isAdmin()) return rows;
        const currentId = state.currentUser ? state.currentUser.id : "";
        return rows.filter((row) => row.attendeeIds.includes(currentId));
      }

      function renderCompactRows(rows, emptyTitle, emptyText) {
        if (!rows.length) {
          return `<div class="empty-state"><h3>${emptyTitle}</h3><p>${emptyText}</p></div>`;
        }
        return `<div class="data-list">${rows.join("")}</div>`;
      }

      function renderSummaryCards(rows, emptyTitle, emptyText) {
        if (!rows.length) {
          return `<div class="empty-state"><h3>${emptyTitle}</h3><p>${emptyText}</p></div>`;
        }
        return `<div class="summary-card-grid">${rows.join("")}</div>`;
      }

      function getEnquiryCompanyName(enquiry) {
        return (
          enquiry.companyName ||
          enquiry.existingClientName ||
          enquiry.contactPersonName ||
          "Unnamed Enquiry"
        );
      }

      function getEnquiryContactDetails(enquiry) {
        return [enquiry.contactPersonName, enquiry.contactNumber, enquiry.email]
          .filter(Boolean)
          .join(" | ");
      }

      function renderEnquiriesTable() {
        if (!state.enquiries.length) {
          return `<div class="empty-state"><h3>No enquiries saved</h3><p>Use Add New Enquiry to capture lead details from the left menu.</p></div>`;
        }

        return `
                <div class="table-wrap">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Contact Details</th>
                        <th>Requirement Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${state.enquiries
                        .map(
                          (enquiry) => `
                            <tr onclick="openEnquiryDetails('${enquiry.id}')">
                              <td>${escapeHtml(getEnquiryCompanyName(enquiry))}</td>
                              <td>${escapeHtml(getEnquiryContactDetails(enquiry) || "--")}</td>
                              <td>${escapeHtml(enquiry.requirement || "--")}</td>
                              <td>${escapeHtml(enquiry.leadPriority || "--")}</td>
                              <td>
                                <select class="status-select" onclick="event.stopPropagation()" onchange="setEnquiryStatus('${enquiry.id}', this.value)">
                                  ${[
                                    "New",
                                    "Proposal sent",
                                    "Confirmed",
                                    "in progress",
                                  ]
                                    .map(
                                      (status) =>
                                        `<option value="${status}" ${enquiry.status === status ? "selected" : ""}>${status}</option>`,
                                    )
                                    .join("")}
                                </select>
                              </td>
                              <td>${escapeHtml(formatDate(enquiry.createdAt || enquiry.savedAt))}</td>
                            </tr>
                          `,
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              `;
      }

      function setEnquiryStatus(enquiryId, status) {
        const enquiry = state.enquiries.find((item) => item.id === enquiryId);
        if (!enquiry) return;
        enquiry.status = status;
        persistAppStateSoon();
        renderMenuViews();
      }

      function detailField(label, value, full) {
        return `
                <div class="detail-field ${full ? "full" : ""}">
                  <label>${escapeHtml(label)}</label>
                  <div>${escapeHtml(value || "--")}</div>
                </div>
              `;
      }

      function openEnquiryDetails(enquiryId) {
        const enquiry = state.enquiries.find((item) => item.id === enquiryId);
        if (!enquiry) return;
        const canCreateProject = !enquiry.projectId;
        document.getElementById("utilityModalTitle").textContent =
          getEnquiryCompanyName(enquiry);
        document.getElementById("utilityModalBody").innerHTML = `
                <div class="action-buttons">
                  ${
                    canCreateProject
                      ? `<button class="btn btn-primary" type="button" onclick="startProjectCreationFromEnquiry('${enquiry.id}')">Create Project</button>`
                      : `<button class="btn btn-secondary" type="button" onclick="openProjectDashboard('${enquiry.projectId}')">Open Project</button>`
                  }
                </div>
                <div class="detail-grid">
                  ${detailField("Company Name", getEnquiryCompanyName(enquiry))}
                  ${detailField("Status", enquiry.status)}
                  ${detailField("Contact Person", enquiry.contactPersonName)}
                  ${detailField("Contact Number", enquiry.contactNumber)}
                  ${detailField("Email", enquiry.email)}
                  ${detailField("Existing Client", enquiry.existingClient)}
                  ${detailField("Industry Type", enquiry.industryType)}
                  ${detailField("Client Type", enquiry.clientType)}
                  ${detailField("Enquiry From", enquiry.enquiryFrom)}
                  ${detailField("Lead Priority", enquiry.leadPriority)}
                  ${detailField("Estimated Project Value", enquiry.estimatedProjectValue)}
                  ${detailField("Expected Timeline", enquiry.expectedTimeline)}
                  ${detailField("Created Date", formatDate(enquiry.createdAt || enquiry.savedAt))}
                  ${detailField("Requirement Description", enquiry.requirement, true)}
                  ${detailField("Screenshot", enquiry.screenshot && enquiry.screenshot.length ? enquiry.screenshot.join(", ") : "", true)}
                </div>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function startProjectCreationFromEnquiry(enquiryId) {
        const enquiry = state.enquiries.find((item) => item.id === enquiryId);
        if (!enquiry || enquiry.projectId) return;
        const projectEmployees = getProjectEmployees();
        if (!projectEmployees.length) {
          alert(
            "Add at least one employee with Project designation before creating a project.",
          );
          return;
        }
        document.getElementById("utilityModalTitle").textContent =
          `Create Project - ${getEnquiryCompanyName(enquiry)}`;
        document.getElementById("utilityModalBody").innerHTML = `
                <div class="form-section">
                  <h4>Project Assignment</h4>
                  <div class="form-group">
                    <label>Assign Team Head:</label>
                    <select id="projectHeadSelect">
                      <option value="">Select project employee</option>
                      ${projectEmployees
                        .map(
                          (employee) =>
                            `<option value="${employee.id}">${escapeHtml(getEmployeeLabel(employee))}</option>`,
                        )
                        .join("")}
                    </select>
                  </div>
                  <p class="helper-note">Requirement Engineering tasks will stay locked until every task has an assigned project employee.</p>
                </div>
                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" onclick="confirmCreateProjectFromSavedEnquiry('${enquiry.id}')">Create Project</button>
                  <button class="btn btn-secondary" type="button" onclick="openEnquiryDetails('${enquiry.id}')">Cancel</button>
                </div>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function confirmCreateProjectFromSavedEnquiry(enquiryId) {
        const select = document.getElementById("projectHeadSelect");
        const projectHeadId = select ? select.value : "";
        if (!projectHeadId) {
          alert("Please select a project head.");
          return;
        }
        createProjectFromSavedEnquiry(enquiryId, projectHeadId);
      }

      function openExternalLink(url) {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
      }

      function openMeetingDetails(projectId, index) {
        const project = state.projects.find((item) => item.id === projectId);
        const subtask = project ? getMeetingSubtask(project) : null;
        const meet =
          subtask && subtask.data.meets ? subtask.data.meets[index] : null;
        if (!project || !meet) return;
        document.getElementById("utilityModalTitle").textContent =
          `${project.name} - Meet ${index + 1}`;
        document.getElementById("utilityModalBody").innerHTML = `
                <div class="detail-grid">
                  ${detailField("Meet Date", meet.scheduledDate)}
                  ${detailField("Time", meet.scheduledTime)}
                  ${detailField(
                    "Attendees",
                    (meet.attendees || [])
                      .map(getEmployeeName)
                      .filter(Boolean)
                      .join(", "),
                  )}
                  ${detailField("Platform", meet.platform)}
                  ${detailField("Additional Notes", meet.additionalNotes, true)}
                  ${detailField("Meet Link", meet.meetLink, true)}
                </div>
                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" ${meet.meetLink ? `onclick="openExternalLink('${escapeAttr(meet.meetLink)}')"` : "disabled"}>Join Meet</button>
                </div>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function openVisitDetails(projectId, index) {
        const project = state.projects.find((item) => item.id === projectId);
        const subtask = project ? getVisitSubtask(project) : null;
        const visit =
          subtask && subtask.data.visits ? subtask.data.visits[index] : null;
        if (!project || !visit) return;
        document.getElementById("utilityModalTitle").textContent =
          `${project.name} - Visit ${index + 1}`;
        document.getElementById("utilityModalBody").innerHTML = `
                <div class="detail-grid">
                  ${detailField("Visit Date", visit.visitDate)}
                  ${detailField("Time", visit.visitTime)}
                  ${detailField(
                    "Attendees",
                    (visit.attendees || [])
                      .map(getEmployeeName)
                      .filter(Boolean)
                      .join(", "),
                  )}
                  ${detailField("Purpose", visit.purpose, true)}
                  ${detailField("Location Link", visit.locationLink, true)}
                </div>
                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" ${visit.locationLink ? `onclick="openExternalLink('${escapeAttr(visit.locationLink)}')"` : "disabled"}>Open Location</button>
                </div>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function createProjectFromSavedEnquiry(enquiryId, projectHeadId) {
        const enquiry = state.enquiries.find((item) => item.id === enquiryId);
        if (!enquiry || enquiry.projectId) return;
        const projectHead = getProjectEmployees().find(
          (employee) => employee.id === projectHeadId,
        );
        if (!projectHead) {
          alert("Please assign a valid Project employee as team head.");
          return;
        }
        const project = createProjectFromEnquiry(enquiry, projectHeadId);
        enquiry.projectId = project.id;
        enquiry.status = "Confirmed";
        state.currentProjectId = null;
        state.activeStageId = null;
        renderDashboard();
        renderMenuViews();
        persistAppStateSoon();
        closeUtilityModal();
        const projectMenuButton = Array.from(
          document.querySelectorAll(".nav-btn"),
        ).find((button) => button.textContent.trim().includes("Projects"));
        switchView("projects", projectMenuButton);
        alert("Project created from enquiry.");
      }

      function openProjectDashboard(projectId) {
        if (!canAccessView("projects")) {
          alert("You do not have access to Projects.");
          return;
        }
        state.currentProjectId = projectId;
        state.activeStageId = null;
        closeSubtaskModal();
        document
          .querySelectorAll(".stage-detail")
          .forEach((view) => view.classList.remove("active"));
        renderDashboard();
        document
          .querySelectorAll(".nav-btn")
          .forEach((btn) => btn.classList.remove("active"));
        const projectMenuButton = Array.from(
          document.querySelectorAll(".nav-btn"),
        ).find((button) => button.textContent.trim().includes("Projects"));
        if (projectMenuButton) projectMenuButton.classList.add("active");
        document
          .querySelectorAll(".view")
          .forEach((view) => view.classList.remove("active"));
        document.getElementById("dashboard").classList.add("active");
      }

      function renderMenuViews() {
        applyAccessUi();
        const enquiriesContainer = document.getElementById("enquiriesContent");
        if (enquiriesContainer) {
          enquiriesContainer.innerHTML = `
                  <h2 class="section-title">Enquiries</h2>
                  <div class="action-buttons" style="margin-bottom:16px">
                    <button class="btn btn-primary" type="button" onclick="toggleEnquiryDrawer(true)">Add New Enquiry</button>
                  </div>
                  ${renderEnquiriesTable()}
                `;
        }

        const employeesContainer = document.getElementById("employeesContent");
        if (employeesContainer) {
          employeesContainer.innerHTML = `
                  <h2 class="section-title">Employees</h2>
                  <div class="action-buttons" style="margin-bottom:16px">
                    <button class="btn btn-primary" type="button" onclick="toggleEmployeeDrawer(true)">Add New Employee</button>
                  </div>
                  ${renderCompactRows(
                    state.employees.map(
                      (employee) => `
                        <div class="data-row">
                          <h4>${escapeHtml(employee.name)}</h4>
                          <p class="helper-note">ID: ${escapeHtml(employee.employeeId || "--")} | ${escapeHtml(employee.designation || "No designation")} | ${escapeHtml(employee.email || "No office email")}</p>
                          <div class="action-buttons" style="margin-top:10px">
                            <button class="btn btn-secondary" type="button" onclick="editEmployee('${employee.id}')">Edit</button>
                          </div>
                        </div>
                      `,
                    ),
                    "No employees added",
                    "Add employees here so project tasks can assign attendees and document requests.",
                  )}
                `;
        }

        const clientsContainer = document.getElementById("clientsContent");
        if (clientsContainer) {
          const rows = getClientRows();
          clientsContainer.innerHTML = `
                  <h2 class="section-title">Clients</h2>
                  ${renderCompactRows(
                    rows.map(
                      (client) => `
                        <div class="data-row">
                          <h4>${escapeHtml(client.name)}</h4>
                          <p class="helper-note">Contact: ${escapeHtml(client.contact)} | ${escapeHtml(client.email)} | ${escapeHtml(client.phone)}</p>
                          <p class="helper-note">Project: ${escapeHtml(client.projectName)}</p>
                        </div>
                      `,
                    ),
                    "No clients yet",
                    "Clients appear after enquiries are converted into projects.",
                  )}
                `;
        }

        const projectsContainer = document.getElementById("projectsContent");
        if (projectsContainer) {
          projectsContainer.innerHTML = `
                  <h2 class="section-title">Projects</h2>
                  ${renderProjectList()}
                `;
        }

        const meetingsContainer = document.getElementById("meetingsContent");
        if (meetingsContainer) {
          meetingsContainer.innerHTML = `
                  <h2 class="section-title">Meetings</h2>
                  ${renderSummaryCards(
                    getAllMeetingRows().map(
                      (meeting) => `
                        <div class="summary-card" onclick="openMeetingDetails('${meeting.projectId}', ${meeting.index})">
                          <h4>${escapeHtml(meeting.projectName)} - ${escapeHtml(meeting.title)}</h4>
                          <p class="helper-note">${escapeHtml(meeting.date)} ${escapeHtml(meeting.time)} | ${escapeHtml(meeting.platform)}</p>
                          <p class="helper-note">Attendees: ${escapeHtml(meeting.attendees.join(", ") || "None selected")}</p>
                          <div class="summary-card-actions">
                            ${
                              meeting.link
                                ? `<button class="btn btn-secondary" type="button" onclick="event.stopPropagation(); openExternalLink('${escapeAttr(meeting.link)}')">Join Meet</button>`
                                : ""
                            }
                          </div>
                        </div>
                      `,
                    ),
                    "No meetings scheduled",
                    "Meetings added inside Requirement Engineering appear here.",
                  )}
                `;
        }

        const visitsContainer = document.getElementById("siteVisitsContent");
        if (visitsContainer) {
          visitsContainer.innerHTML = `
                  <h2 class="section-title">Site Visits</h2>
                  ${renderSummaryCards(
                    getAllSiteVisitRows().map(
                      (visit) => `
                        <div class="summary-card" onclick="openVisitDetails('${visit.projectId}', ${visit.index})">
                          <h4>${escapeHtml(visit.projectName)} - ${escapeHtml(visit.title)}</h4>
                          <p class="helper-note">${escapeHtml(visit.date)} ${escapeHtml(visit.time)} | ${escapeHtml(visit.purpose)}</p>
                          <p class="helper-note">Attendees: ${escapeHtml(visit.attendees.join(", ") || "None selected")}</p>
                        </div>
                      `,
                    ),
                    "No site visits scheduled",
                    "Site visits added inside Requirement Engineering appear here.",
                  )}
                `;
        }

        const requestsContainer = document.getElementById("requestsContent");
        if (requestsContainer) {
          let requests = state.projects.flatMap((project) => {
            const stage = project.stages.find(
              (item) => item.id === "requirement-engineering",
            );
            if (!stage) return [];
            const subtasks = stage.subtasks.filter((item) =>
              item.id.startsWith("generate-documents"),
            );
            return subtasks.flatMap((subtask) => {
              const rows = [];
              // foundation load special field
              if (subtask.data && subtask.data.foundationLoadEmployee) {
                rows.push({
                  projectId: project.id,
                  projectName: project.name,
                  subtaskId: subtask.id,
                  docKey: "Foundation Load",
                  name: `${subtask.data.systemLabel || "System"} Foundation Load`,
                  employeeId: subtask.data.foundationLoadEmployee,
                });
              }
              // generic requests mapping
              if (subtask.data && subtask.data.requests) {
                Object.keys(subtask.data.requests).forEach((docKey) => {
                  const emp = subtask.data.requests[docKey];
                  if (emp) {
                    rows.push({
                      projectId: project.id,
                      projectName: project.name,
                      subtaskId: subtask.id,
                      docKey,
                      name: `${subtask.data.systemLabel || "System"} ${docKey}`,
                      employeeId: emp,
                    });
                  }
                });
              }
              return rows;
            });
          });
          // include explicit project-level requests (fund requests, visit-report approvals)
          const extra = state.projects.flatMap((project) =>
            (project.requests || []).map((r) => ({
              projectId: project.id,
              projectName: project.name,
              name:
                r.type === "fund-request"
                  ? `Fund Request - ${project.name}`
                  : r.type === "site-visit-report"
                    ? `Site Visit Report - ${project.name}`
                    : r.type || "Request",
              docKey: r.type,
              requestData: r,
            })),
          );
          requests = requests.concat(extra);

          if (!isAdmin()) {
            const currentId = state.currentUser ? state.currentUser.id : "";
            const currentRole = state.currentUser
              ? state.currentUser.designation
              : "";
            requests = requests.filter((request) => {
              if (request.employeeId) return request.employeeId === currentId;
              if (
                request.docKey === "fund-request" &&
                currentRole === "Accounts"
              )
                return true;
              if (
                request.docKey === "site-visit-report" &&
                currentRole === "Accounts"
              )
                return true;
              return false;
            });
          }
          requestsContainer.innerHTML = `
                  <h2 class="section-title">Requests</h2>
                  ${renderCompactRows(
                    requests.map((request) => {
                      // project-level requests (fund-request, site-visit-report)
                      if (request.requestData) {
                        const r = request.requestData;
                        const reqIndex = (
                          state.projects.find((p) => p.id === request.projectId)
                            .requests || []
                        ).findIndex((req) => req === r);
                        if (r.type === "fund-request") {
                          return `
                            <div class="data-row">
                              <h4>Fund Request</h4>
                              <p class="helper-note">Project: ${escapeHtml(request.projectName)} | Amount: ${escapeHtml(String(r.amount))}</p>
                              <p class="helper-note">Location: ${escapeHtml(r.location || "")} | Purpose: ${escapeHtml(r.purpose || "")}</p>
                              <p class="helper-note">Attendees: ${escapeHtml((r.attendees || []).join(", "))} | Visit date: ${escapeHtml(r.visitDate || "")}</p>
                              <p class="helper-note">Status: ${escapeHtml(r.status)}</p>
                              ${r.status === "pending" ? `<div style="margin-top:8px"><button class="btn btn-primary" type="button" onclick="markFundRequestPaid('${request.projectId}', ${reqIndex})">Paid</button></div>` : ""}
                            </div>
                          `;
                        }
                        if (r.type === "site-visit-report") {
                          const project = state.projects.find(
                            (p) => p.id === request.projectId,
                          );
                          const pdfs =
                            project && project.databaseItems && r.pdfIndices
                              ? r.pdfIndices
                                  .map((idx) => project.databaseItems[idx])
                                  .filter(Boolean)
                              : [];
                          return `
                            <div class="data-row">
                              <h4>Site Visit Report</h4>
                              <p class="helper-note">Project: ${escapeHtml(request.projectName)}</p>
                              ${
                                pdfs.length > 0
                                  ? `<div class="document-list">${pdfs
                                      .map((pdf) => {
                                        const recordIndex =
                                          project.databaseItems.indexOf(pdf);
                                        const label =
                                          pdf.pdfKind === "visit-expenses"
                                            ? "Expenses Made"
                                            : pdf.pdfKind === "visit-attachment"
                                              ? "Expense PDF"
                                              : "Attachment";
                                        return `<div class="doc-row"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(pdf.name)} - ${escapeHtml(formatDate(pdf.savedAt))} <button class="btn btn-secondary" type="button" onclick="openStoredDatabaseItem('${request.projectId}', ${recordIndex})">View</button></div>`;
                                      })
                                      .join("")}</div>`
                                  : '<p class="helper-note">Report pending</p>'
                              }
                              <div style="margin-top:8px">
                                <button class="btn btn-primary" type="button" onclick="acceptSiteVisitReport('${request.projectId}')">Accept</button>
                                <button class="btn btn-secondary" type="button" onclick="declineSiteVisitReport('${request.projectId}', ${JSON.stringify(r.pdfIndices || [])})">Decline</button>
                              </div>
                            </div>
                          `;
                        }
                      }
                      const project = state.projects.find(
                        (p) => p.id === request.projectId,
                      );
                      const calcItems = project
                        ? getProjectDatabaseItems(project).filter(
                            (it) =>
                              it.type === "calculation" ||
                              it.type === "calculation-boq",
                          )
                        : [];
                      const calcList = calcItems.length
                        ? `<div class="document-list">${calcItems.map((it, idx) => `<div class="doc-row"><a href="#" onclick="event.preventDefault();viewCalculationOutput('${request.projectId}','${it.subtaskId}',${it.index},'${it.type === "calculation" ? "calculation" : "boq"}')">${escapeHtml(it.name)}</a></div>`).join("")}</div>`
                        : `<p class="helper-note">No calculation outputs available yet for this project.</p>`;
                      return `
                        <div class="data-row">
                          <h4>${escapeHtml(request.name)}</h4>
                          <p class="helper-note">Project: ${escapeHtml(request.projectName)} | Assigned to: ${escapeHtml(getEmployeeName(request.employeeId) || "Unassigned")}</p>
                          ${calcList}
                          <div style="margin-top:8px">
                            <label>Attach response</label>
                            <input type="file" onchange="handleRequestAttach(event, '${request.projectId}', '${request.subtaskId}', '${request.docKey}')">
                          </div>
                        </div>
                      `;
                    }),
                    "No document requests",
                    "P&ID, GAD, Foundation Load, and Technical Datasheet requests appear here after assignment.",
                  )}
                `;
        }
      }

      function renderDatabase() {
        const container = document.getElementById("databaseContent");
        if (!container) return;
        const calculationItems = getVisibleDatabaseItems().filter((item) =>
          ["calculation", "calculation-boq", "calculation-boq-price"].includes(
            item.type,
          ),
        );
        const proposalItems = state.projects.flatMap((project) =>
          getVisibleProjectDatabaseItems(project).filter(
            (item) => item.type === "proposal-doc",
          ),
        );

        container.innerHTML = `
                <h2 class="section-title">Database</h2>
                <div class="database-dashboard">
                  <div class="database-summary-grid">
                    <div class="database-summary-card">
                      <div class="helper-note">Employees</div>
                      <strong>${state.employees.length}</strong>
                    </div>
                    <div class="database-summary-card">
                      <div class="helper-note">Projects</div>
                      <strong>${state.projects.length}</strong>
                    </div>
                    <div class="database-summary-card">
                      <div class="helper-note">Calculation PDFs</div>
                      <strong>${calculationItems.length}</strong>
                    </div>
                    <div class="database-summary-card">
                      <div class="helper-note">Proposal Records</div>
                      <strong>${proposalItems.length}</strong>
                    </div>
                  </div>
                </div>
                <div class="folder-grid">
                  ${
                    isAdmin()
                      ? `<div class="folder-card">
                    <h3>Employee Info</h3>
                    <p class="helper-note">Employee names, designations, office emails, and attached documents.</p>
                    <div class="action-buttons" style="margin-top:14px">
                      <button class="btn btn-primary" type="button" onclick="toggleEmployeeDrawer(true)">Add New Employee</button>
                    </div>
                  </div>`
                      : ""
                  }
                  <div class="folder-card">
                    <h3>Projects</h3>
                    <p class="helper-note">All existing projects and their stored PDF/document records.</p>
                  </div>
                  <div class="folder-card">
                    <h3>Proposal Document</h3>
                    <p class="helper-note">Linked to backend storage at <code>/database/Proposal Document</code>. Files are pre-seeded — replace placeholders later.</p>
                    <div class="action-buttons" style="margin-top:14px">
                      <button class="btn btn-secondary" type="button" onclick="refreshDatabaseTree()">Refresh Storage</button>
                    </div>
                    <div id="databaseTreeBox" class="helper-note" style="margin-top:10px; max-height:140px; overflow:auto; font-family:var(--mono); font-size:0.78rem; color:var(--muted);"></div>
                  </div>
                </div>

                ${
                  isAdmin()
                    ? `<div class="database-section">
                  <h2 class="section-title">Employee Info</h2>
                  <div class="data-list">
                    ${
                      state.employees.length
                        ? state.employees
                            .map(
                              (employee) => `
                                <div class="data-row">
                                  <h4>${escapeHtml(employee.name)}</h4>
                                  <p class="helper-note">ID: ${escapeHtml(employee.employeeId || "--")} | ${escapeHtml(employee.designation || "No designation")} | ${escapeHtml(employee.email || "No office email")}</p>
                                  <p class="helper-note">Documents: ${employee.documents && employee.documents.length ? escapeHtml(employee.documents.join(", ")) : "No document attached"}</p>
                                  <div class="action-buttons" style="margin-top:10px">
                                    <button class="btn btn-secondary" type="button" onclick="editEmployee('${employee.id}')">Edit</button>
                                  </div>
                                </div>
                              `,
                            )
                            .join("")
                        : `<div class="empty-state"><h3>No employees added</h3><p>Add employees here so meeting, visit, and document request tasks can use them.</p></div>`
                    }
                  </div>
                </div>`
                    : ""
                }

                <div class="database-section">
                  <h2 class="section-title">Projects</h2>
                  <div class="folder-grid">
                    ${
                      state.projects.length
                        ? state.projects
                            .map(
                              (project) => `
                                <div class="folder-card">
                                  <h3>${escapeHtml(project.name)}</h3>
                                  <p class="helper-note">Project folder</p>
                                  ${
                                    getVisibleProjectDatabaseItems(project)
                                      .length
                                      ? `<div class="document-list">${getVisibleProjectDatabaseItems(
                                          project,
                                        )
                                          .map(
                                            (item) => `
                                              <div class="document-row">
                                                <div class="document-left">
                                                  <div class="file-path">${escapeHtml(item.name)}</div>
                                                  <div class="date">${escapeHtml(item.savedAt)} | ${escapeHtml(item.storagePath || "Stored in project data")}</div>
                                                </div>
                                                <div class="subtask-actions">
                                                  ${
                                                    item.type ===
                                                      "calculation" ||
                                                    item.type ===
                                                      "calculation-boq" ||
                                                    item.type ===
                                                      "calculation-boq-price"
                                                      ? `<button class="btn btn-secondary" type="button" onclick="openStoredPdf('${project.id}', '${item.subtaskId}', ${item.index}, '${item.pdfKind || "calculation"}')">View PDF</button>`
                                                      : item.type ===
                                                            "proposal-quotation" ||
                                                          item.type ===
                                                            "proposal-ai-pdf"
                                                        ? `<button class="btn btn-secondary" type="button" onclick="openStoredProjectDocumentPdf('${project.id}', '${item.subtaskId}', '${item.pdfKind}')">View PDF</button>`
                                                        : item.dataUri ||
                                                            item.htmlContent ||
                                                            item.textContent
                                                          ? `<button class="btn btn-secondary" type="button" onclick="openStoredDatabaseItem('${project.id}', ${item.index})">View</button>`
                                                          : ""
                                                  }
                                                  <div class="saved-badge">Saved</div>
                                                </div>
                                              </div>
                                            `,
                                          )
                                          .join("")}</div>`
                                      : `<p class="helper-note">PDF/Data records: No stored PDFs yet</p>`
                                  }
                                </div>
                              `,
                            )
                            .join("")
                        : `<div class="empty-state"><h3>No project folders yet</h3><p>Projects will appear here after enquiries are converted.</p></div>`
                    }
                  </div>
                </div>
              `;
      }

      function getProjectDatabaseItems(project) {
        const items = [];
        const requirementStage = project.stages.find(
          (stage) => stage.id === "requirement-engineering",
        );
        if (!requirementStage) return items;
        const designTasks = requirementStage.subtasks.filter((task) =>
          task.id.startsWith("design-calculation"),
        );
        designTasks.forEach((designTask) => {
          if (!designTask.data.calculationStored) return;
          const outputs = designTask.data.calculationOutputs || [];
          if (outputs.length) {
            outputs.forEach((output, index) => {
              items.push({
                type: "calculation",
                subtaskId: designTask.id,
                index,
                pdfKind: "calculation",
                name: `${designTask.name} Calculation Output ${index + 1}.pdf`,
                storagePath: `Supabase Storage > calculation-pdfs > ${project.id} > ${designTask.id}`,
                savedAt: formatDate(output.savedAt),
              });
              if (output.boqPdfDataUri) {
                items.push({
                  type: "calculation-boq",
                  subtaskId: designTask.id,
                  index,
                  pdfKind: "boq",
                  name: `${designTask.name} BOQ ${index + 1}.pdf`,
                  storagePath: `Supabase Storage > calculation-pdfs > ${project.id} > ${designTask.id} > BOQ`,
                  savedAt: formatDate(output.savedAt),
                });
              }
              if (output.boqWithPricePdfDataUri || output.boqPdfDataUri) {
                items.push({
                  type: "calculation-boq-price",
                  subtaskId: designTask.id,
                  index,
                  pdfKind: "boqwithprice",
                  name: `${designTask.name} BOQwithprice ${index + 1}.pdf`,
                  storagePath: `Supabase Storage > calculation-pdfs > ${project.id} > ${designTask.id} > BOQwithprice`,
                  savedAt: formatDate(output.savedAt),
                });
              }
            });
          } else {
            items.push({
              type: "calculation",
              subtaskId: designTask.id,
              index: 0,
              pdfKind: "calculation",
              name: `${designTask.name} Output.pdf`,
              storagePath: `Supabase Storage > calculation-pdfs > ${project.id} > ${designTask.id}`,
              savedAt: "--",
            });
          }
        });
        const proposalStage = project.stages.find(
          (stage) => stage.id === "proposal",
        );
        if (proposalStage) {
          proposalStage.subtasks
            .filter((task) => task.id && task.id.startsWith("proposal-doc-"))
            .forEach((task) => {
              if (task.data.aiPdfDataUri) {
                items.push({
                  type: "proposal-ai-pdf",
                  subtaskId: task.id,
                  pdfKind: "ai",
                  name: `${task.name}.pdf`,
                  storagePath: `Browser State > Projects > ${project.name} > Proposal Docs`,
                  savedAt: formatDate(task.data.aiSavedAt),
                });
              }
              if (!task.data.savedAt) return;
              (task.data.documents || []).forEach((documentItem) => {
                items.push({
                  type: "proposal-doc",
                  name: `Proposal Docs / ${documentItem.name.replace(/\.docx$/i, ".html")}`,
                  storagePath: `Database > Projects > ${project.name} > Proposal Docs`,
                  savedAt: formatDate(task.data.savedAt),
                });
              });
            });
          const quotation = proposalStage.subtasks.find(
            (task) => task.id === "quotation",
          );
          if (quotation && quotation.data.quotationPdfDataUri) {
            items.push({
              type: "proposal-quotation",
              subtaskId: quotation.id,
              pdfKind: "quotation",
              name: "Quotation.pdf",
              storagePath: `Browser State > Projects > ${project.name} > Quotation`,
              savedAt: formatDate(quotation.data.savedAt),
            });
          }
        }
        // Include explicitly saved database items (Scope Matrix, attachments, etc.)
        if (project.databaseItems && Array.isArray(project.databaseItems)) {
          project.databaseItems.forEach((item, index) => {
            items.push({
              type: item.pdfKind || "document",
              subtaskId: item.subtaskId || "",
              index,
              pdfKind: item.pdfKind || "document",
              name: item.name,
              storagePath:
                item.storagePath ||
                "Browser State > Projects > " + project.name,
              savedAt: formatDate(item.savedAt),
              htmlContent: item.htmlContent,
              dataUri: item.dataUri,
              textContent: item.textContent,
            });
          });
        }
        return items;
      }

      function isProjectAtOrBeforeFollowup(project) {
        const stages = project.stages || [];
        const disallowed = [
          "procurement",
          "production",
          "logistics",
          "installation",
        ];
        return !stages.some((stage) => {
          if (!disallowed.includes(stage.id)) return false;
          return (stage.subtasks || []).some(
            (task) => task.status !== "pending",
          );
        });
      }

      function canViewDatabaseItem(project, item) {
        if (isAdmin()) return true;
        const role = state.currentUser ? state.currentUser.designation : "";
        if (item.type === "calculation-boq-price") return false;
        if (item.type === "mom-report") {
          return role === "Sales" || role === "Project";
        }
        if (role === "Sales") {
          return isProjectAtOrBeforeFollowup(project);
        }
        if (role === "Project") {
          return [
            "calculation",
            "calculation-boq",
            "proposal-doc",
            "proposal-ai-pdf",
            "proposal-quotation",
            "mom-report",
          ].includes(item.type);
        }
        if (role === "Production" || role === "Purchase") {
          return item.type === "calculation" || item.type === "calculation-boq";
        }
        return false;
      }

      function getVisibleProjectDatabaseItems(project) {
        return getProjectDatabaseItems(project).filter((item) =>
          canViewDatabaseItem(project, item),
        );
      }

      function getVisibleDatabaseItems() {
        return state.projects.flatMap((project) =>
          getVisibleProjectDatabaseItems(project).map((item) => ({
            ...item,
            projectId: project.id,
          })),
        );
      }

      function getAllCalculationDatabaseItems() {
        return state.projects.flatMap((project) =>
          getProjectDatabaseItems(project)
            .filter((item) => item.type === "calculation")
            .map((item) => ({ ...item, projectId: project.id })),
        );
      }

      function renderStageCards(project) {
        const container = document.getElementById("stageCards");
        if (!container) return;

        container.innerHTML = project.stages
          .map((stage) => {
            const info = getStageProgress(stage);
            const statusClass =
              info.progress === 100
                ? "completed"
                : info.progress > 0
                  ? "in-progress"
                  : "";
            const requirementLocked =
              stage.id === "requirement-engineering" &&
              isRequirementEngineeringLocked(project);

            return `
                    <div class="stage-card ${statusClass} ${canAccessStage(stage.id) ? "" : "locked-stage"}" onclick="showStageDetail('${stage.id}')">
                      <div class="stage-header">
                        <div class="stage-icon">${escapeHtml(stage.icon)}</div>
                        <div class="stage-info">
                          <h3>${escapeHtml(stage.name)}</h3>
                          <p>${info.completed}/${info.total} tasks</p>
                        </div>
                      </div>
                      <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width:${info.progress}%"></div>
                      </div>
                      <div class="progress-text">${info.progress}% Complete${requirementLocked ? " | Assign all tasks to unlock" : canAccessStage(stage.id) ? "" : " | View only"}</div>
                    </div>
                  `;
          })
          .join("");
      }

      function renderRequirementAssignmentSelect(stageId, subtask) {
        if (stageId !== "requirement-engineering") return "";
        const projectEmployees = getProjectEmployees();
        return `
                <label class="assignment-select" onclick="event.stopPropagation()">
                  <span>Assigned to:</span>
                  <select onchange="setRequirementTaskAssignee('${stageId}', '${subtask.id}', this.value)">
                    <option value="">Select employee</option>
                    ${projectEmployees
                      .map(
                        (employee) =>
                          `<option value="${employee.id}" ${subtask.assignedTo === employee.id ? "selected" : ""}>${escapeHtml(getEmployeeLabel(employee))}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
              `;
      }

      function renderStageDetails(project) {
        const container = document.getElementById("stageDetailViews");
        container.innerHTML = project.stages
          .map(
            (stage) => `
                    <div id="stage-${stage.id}" class="view stage-detail">
                      <button class="back-btn" type="button" onclick="backToDashboard()">← Back to Project Dashboard</button>
                      <div class="detail-header">
                        <div class="detail-title">
                          <div class="detail-badge">${escapeHtml(stage.icon)}</div>
                          <div>
                            <h2>${escapeHtml(stage.name)}</h2>
                            <p class="detail-description">${escapeHtml(stage.description)}</p>
                          </div>
                        </div>
                      </div>
                      <h2 class="section-title">Tasks & Checklist</h2>
                      <div class="subtask-list">
                        ${stage.subtasks
                          .map(
                            (subtask) => `
                              <div class="subtask-item" onclick="openSubtaskModal('${stage.id}', '${subtask.id}')">
                                <div class="subtask-checkbox ${subtask.status === "completed" ? "completed" : ""}" onclick="event.stopPropagation(); toggleSubtask('${stage.id}', '${subtask.id}')"></div>
                                <div class="subtask-content">
                                  <div class="subtask-name">${escapeHtml(subtask.name)}</div>
                                  <div class="subtask-meta">${escapeHtml(summarizeSubtask(subtask))}</div>
                                </div>
                                <div class="subtask-actions">
                                  ${renderRequirementAssignmentSelect(stage.id, subtask)}
                                  ${
                                    subtask.id === "meetings"
                                      ? `<button class="icon-btn" type="button" title="Add meet" onclick="event.stopPropagation(); addRepeaterItem('${stage.id}', '${subtask.id}', 'meets')">+</button>`
                                      : ""
                                  }
                                  ${
                                    subtask.id === "site-visits"
                                      ? `<button class="icon-btn" type="button" title="Add visit" onclick="event.stopPropagation(); addRepeaterItem('${stage.id}', '${subtask.id}', 'visits')">+</button>`
                                      : ""
                                  }
                                  ${
                                    subtask.id &&
                                    subtask.id.startsWith("proposal-doc-") &&
                                    !isAiProposalDocumentSubtask(subtask.id)
                                      ? `<button class="btn btn-secondary" type="button" onclick="event.stopPropagation(); getProposalDocuments('${stage.id}', '${subtask.id}')">Get</button>`
                                      : ""
                                  }
                                  <div class="subtask-status ${subtask.status}">${escapeHtml(subtask.status)}</div>
                                </div>
                              </div>
                            `,
                          )
                          .join("")}
                      </div>
                    </div>
                  `,
          )
          .join("");
      }

      function switchView(viewName, button) {
        const targetView = document.getElementById(viewName);
        if (!targetView) return;
        if (!canAccessView(viewName)) {
          alert("You do not have access to this section.");
          return;
        }
        renderMenuViews();
        document
          .querySelectorAll(".nav-btn")
          .forEach((btn) => btn.classList.remove("active"));
        if (button) button.classList.add("active");
        document
          .querySelectorAll(".view")
          .forEach((view) => view.classList.remove("active"));
        targetView.classList.add("active");
        if (viewName === "database") {
          renderDatabase();
        }
      }

      function closeDrawers() {
        toggleEnquiryDrawer(false);
        toggleEmployeeDrawer(false);
      }

      function toggleEnquiryDrawer(open) {
        state.drawerOpen = open;
        document
          .getElementById("drawerOverlay")
          .classList.toggle("active", open);
        document.getElementById("enquiryDrawer").classList.toggle("open", open);
        if (!open && !state.employeeDrawerOpen) {
          document.getElementById("drawerOverlay").classList.remove("active");
        }
      }

      function renderEmployeeDrawer() {
        const employee = state.employeeDraft;
        const isEditing = Boolean(state.editingEmployeeId);
        const drawerTitle = document.querySelector(
          "#employeeDrawer .drawer-header h2",
        );
        if (drawerTitle) {
          drawerTitle.textContent = isEditing
            ? "Edit Employee"
            : "Add New Employee";
        }
        document.getElementById("employeeDrawerBody").innerHTML = `
                <div class="form-section">
                  <h4>${isEditing ? "Edit Employee Info" : "Employee Info"}</h4>
                  <div class="form-group">
                    <label>Employee ID</label>
                    <input type="text" value="${escapeAttr(employee.employeeId)}" oninput="setEmployeeDraftField('employeeId', this.value)">
                  </div>
                  <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" value="${escapeAttr(employee.name)}" oninput="setEmployeeDraftField('name', this.value)">
                  </div>
                  <div class="form-group">
                    <label>Login Pass</label>
                    <input type="password" value="${escapeAttr(employee.loginPass)}" oninput="setEmployeeDraftField('loginPass', this.value)">
                  </div>
                  <div class="form-group">
                    <label>Designation</label>
                    <select onchange="setEmployeeDraftField('designation', this.value)">
                      <option value="">Select designation</option>
                      ${DESIGNATION_OPTIONS.map(
                        (option) =>
                          `<option value="${option}" ${employee.designation === option ? "selected" : ""}>${option}</option>`,
                      ).join("")}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>E-mail (office email)</label>
                    <input type="email" value="${escapeAttr(employee.email)}" oninput="setEmployeeDraftField('email', this.value)">
                  </div>
                  <div class="form-group">
                    <label>Attach document</label>
                    <input type="file" onchange="handleEmployeeFile(event)">
                    ${employee.documents && employee.documents.length ? `<div class="helper-note">Selected: ${escapeHtml(employee.documents.join(", "))}</div>` : ""}
                  </div>
                </div>
                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" onclick="saveEmployee()">${isEditing ? "Update Employee" : "Save Employee"}</button>
                  <button class="btn btn-secondary" type="button" onclick="resetEmployeeDraft()">${isEditing ? "Cancel Edit" : "Reset"}</button>
                </div>
              `;
      }

      function toggleEmployeeDrawer(open) {
        if (open && !state.editingEmployeeId) {
          state.employeeDraft = clone(EMPLOYEE_TEMPLATE);
          renderEmployeeDrawer();
        }
        if (!open && state.editingEmployeeId) {
          resetEmployeeDraft();
        }
        state.employeeDrawerOpen = open;
        document
          .getElementById("drawerOverlay")
          .classList.toggle("active", open || state.drawerOpen);
        document
          .getElementById("employeeDrawer")
          .classList.toggle("open", open);
      }

      function setEmployeeDraftField(key, value) {
        state.employeeDraft[key] = value;
      }

      function handleEmployeeFile(event) {
        state.employeeDraft.documents = Array.from(
          event.target.files || [],
        ).map((file) => file.name);
        renderEmployeeDrawer();
      }

      function resetEmployeeDraft() {
        state.employeeDraft = clone(EMPLOYEE_TEMPLATE);
        state.editingEmployeeId = null;
        renderEmployeeDrawer();
      }

      function editEmployee(employeeId) {
        if (!isAdmin()) {
          alert("Only Administrator can edit employees.");
          return;
        }
        const employee = state.employees.find((item) => item.id === employeeId);
        if (!employee) return;
        state.editingEmployeeId = employeeId;
        state.employeeDraft = {
          ...clone(EMPLOYEE_TEMPLATE),
          ...clone(employee),
        };
        renderEmployeeDrawer();
        toggleEmployeeDrawer(true);
      }

      function saveEmployee() {
        if (!isAdmin() && state.employees.length) {
          alert("Only Administrator can add or edit employees.");
          return;
        }
        if (!state.employeeDraft.employeeId.trim()) {
          alert("Please enter employee ID.");
          return;
        }
        if (!state.employeeDraft.name.trim()) {
          alert("Please enter employee name.");
          return;
        }
        if (!state.employeeDraft.loginPass) {
          alert("Please enter Login Pass.");
          return;
        }
        if (!normalizeRole(state.employeeDraft.designation)) {
          alert("Please select a valid designation.");
          return;
        }
        if (
          state.employees.some(
            (employee) =>
              employee.id !== state.editingEmployeeId &&
              String(employee.employeeId || "")
                .trim()
                .toLowerCase() ===
                String(state.employeeDraft.employeeId || "")
                  .trim()
                  .toLowerCase(),
          )
        ) {
          alert("Employee ID already exists.");
          return;
        }
        if (state.editingEmployeeId) {
          const employeeIndex = state.employees.findIndex(
            (employee) => employee.id === state.editingEmployeeId,
          );
          if (employeeIndex === -1) return;
          state.employees[employeeIndex] = {
            ...clone(state.employeeDraft),
            id: state.editingEmployeeId,
          };
          if (
            state.currentUser &&
            state.currentUser.id === state.editingEmployeeId
          ) {
            state.currentUser = {
              id: state.employees[employeeIndex].id,
              employeeId: state.employees[employeeIndex].employeeId,
              name: state.employees[employeeIndex].name,
              designation: state.employees[employeeIndex].designation,
            };
            localStorage.setItem(
              "rsvpCurrentUser",
              JSON.stringify(state.currentUser),
            );
          }
        } else {
          state.employees.push({
            ...clone(state.employeeDraft),
            id: `employee-${Date.now()}`,
          });
        }
        resetEmployeeDraft();
        toggleEmployeeDrawer(false);
        renderDatabase();
        renderMenuViews();
        persistAppStateSoon();
        if (state.activeModal) renderSubtaskModal();
      }

      function resetEnquiry() {
        state.enquiry = clone(ENQUIRY_TEMPLATE);
        renderEnquiryDrawer();
      }

      function setEnquiryField(key, value) {
        state.enquiry[key] = value;
        let shouldRender = false;
        if (key === "existingClient") {
          state.enquiry.existingClientName = "";
          state.enquiry.companyName = "";
          state.enquiry.contactPersonName = "";
          state.enquiry.contactNumber = "";
          state.enquiry.email = "";
          state.enquiry.industryType = "";
          state.enquiry.clientType = "";
          shouldRender = true;
        }
        if (shouldRender) {
          renderEnquiryDrawer();
        }
      }

      function handleEnquiryFile(event, key) {
        state.enquiry[key] = Array.from(event.target.files || []).map(
          (file) => file.name,
        );
        renderEnquiryDrawer();
      }

      function setEnquiryContactField(index, key, value) {
        if (!Array.isArray(state.enquiry.contacts)) {
          state.enquiry.contacts = [];
        }
        state.enquiry.contacts[index] = {
          ...state.enquiry.contacts[index],
          [key]: value,
        };
      }

      function addEnquiryContact() {
        if (!Array.isArray(state.enquiry.contacts)) {
          state.enquiry.contacts = [];
        }
        state.enquiry.contacts.push({ name: "", phone: "", email: "" });
        renderEnquiryDrawer();
      }

      function removeEnquiryContact(index) {
        if (!Array.isArray(state.enquiry.contacts)) return;
        state.enquiry.contacts.splice(index, 1);
        if (!state.enquiry.contacts.length) {
          state.enquiry.contacts.push({ name: "", phone: "", email: "" });
        }
        renderEnquiryDrawer();
      }

      function validateEnquiry() {
        const enquiry = state.enquiry;
        if (!enquiry.existingClient) {
          alert("Please choose whether this is an existing client.");
          return false;
        }
        if (enquiry.existingClient === "yes" && !enquiry.existingClientName) {
          alert("Please select an existing client.");
          return false;
        }
        if (enquiry.existingClient === "no") {
          const hasAdditionalContact = Array.isArray(enquiry.contacts)
            ? enquiry.contacts.some(
                (contact) =>
                  contact.name.trim() &&
                  (contact.phone.trim() || contact.email.trim()),
              )
            : false;
          if (!enquiry.companyName) {
            alert("Please enter company name.");
            return false;
          }
          if (!enquiry.contactPersonName && !hasAdditionalContact) {
            alert(
              "Please enter a primary contact person name or add another contact.",
            );
            return false;
          }
          if (
            !enquiry.contactNumber &&
            !enquiry.email &&
            !hasAdditionalContact
          ) {
            alert(
              "Either primary contact number or email must be filled, or add an additional contact.",
            );
            return false;
          }
        }
        return true;
      }

      function submitEnquiry() {
        if (!validateEnquiry()) return;
        const enquirySnapshot = clone(state.enquiry);
        const enquiryName =
          enquirySnapshot.existingClient === "yes"
            ? enquirySnapshot.existingClientName || "Existing Client Enquiry"
            : enquirySnapshot.companyName ||
              enquirySnapshot.contactPersonName ||
              "New Enquiry";

        state.enquiries.push({
          ...enquirySnapshot,
          id: `enquiry-${Date.now()}`,
          name: enquiryName,
          status: "New",
          projectId: null,
          createdAt: new Date().toISOString(),
          savedAt: new Date().toISOString(),
        });
        renderMenuViews();
        persistAppStateSoon();
        toggleEnquiryDrawer(false);
        const enquiriesButton = Array.from(
          document.querySelectorAll(".nav-btn"),
        ).find((button) => button.textContent.trim().includes("Enquiries"));
        switchView("enquiries", enquiriesButton);
        alert("Enquiry saved.");
      }

      function selectProject(projectId) {
        openProjectDashboard(projectId);
      }

      function showStageDetail(stageId) {
        if (!canAccessStage(stageId)) {
          alert(
            "You can view the project dashboard, but this stage is not available for your role.",
          );
          return;
        }
        state.activeStageId = stageId;
        document.getElementById("dashboard").classList.remove("active");
        document
          .querySelectorAll(".stage-detail")
          .forEach((view) => view.classList.remove("active"));
        const stageView = document.getElementById(`stage-${stageId}`);
        if (stageView) stageView.classList.add("active");
      }

      function backToDashboard() {
        state.activeStageId = null;
        document
          .querySelectorAll(".stage-detail")
          .forEach((view) => view.classList.remove("active"));
        document.getElementById("dashboard").classList.add("active");
        renderDashboard();
      }

      function renderTaskInput(
        stageId,
        subtaskId,
        key,
        label,
        type,
        value,
        listKey,
        index,
      ) {
        const handler =
          listKey !== undefined
            ? `setRepeaterField('${stageId}', '${subtaskId}', '${listKey}', ${index}, '${key}', this.value)`
            : `setTaskField('${stageId}', '${subtaskId}', '${key}', this.value)`;
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <input type="${type}" value="${escapeAttr(value || "")}" oninput="${handler}">
                </div>
              `;
      }

      function renderTaskTextarea(
        stageId,
        subtaskId,
        key,
        label,
        value,
        placeholder,
        rows,
        listKey,
        index,
      ) {
        const handler =
          listKey !== undefined
            ? `setRepeaterField('${stageId}', '${subtaskId}', '${listKey}', ${index}, '${key}', this.value)`
            : `setTaskField('${stageId}', '${subtaskId}', '${key}', this.value)`;
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <textarea rows="${rows || 5}" placeholder="${escapeAttr(placeholder || "")}" oninput="${handler}">${escapeHtml(value || "")}</textarea>
                </div>
              `;
      }

      function renderTaskSelect(
        stageId,
        subtaskId,
        key,
        label,
        value,
        options,
        listKey,
        index,
      ) {
        const handler =
          listKey !== undefined
            ? `setRepeaterField('${stageId}', '${subtaskId}', '${listKey}', ${index}, '${key}', this.value)`
            : `setTaskField('${stageId}', '${subtaskId}', '${key}', this.value)`;
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <select onchange="${handler}">
                    <option value="">Select</option>
                    ${options
                      .map(
                        (option) =>
                          `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
              `;
      }

      function renderEmployeeChipSelector(
        label,
        values,
        stageId,
        subtaskId,
        listKey,
        index,
        key,
      ) {
        const selectedValues = Array.isArray(values)
          ? values
          : values
            ? [values]
            : [];
        const options = getEmployeeOptions();
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <div class="selector-list">
                    <div class="employee-chip-grid">
                    ${
                      options.length
                        ? options
                            .map(
                              (option) => `
                                <button
                                  class="employee-chip ${selectedValues.includes(option.value) ? "active" : ""}"
                                  type="button"
                                  onclick="toggleRepeaterEmployeeSelection('${stageId}', '${subtaskId}', '${listKey}', ${index}, '${key}', '${option.value}')"
                                >${escapeHtml(option.label)}</button>
                              `,
                            )
                            .join("")
                        : `<p class="helper-note">Add employees in Database first.</p>`
                    }
                    </div>
                  </div>
                </div>
              `;
      }

      function renderSystemRequirementSelector(subtask) {
        const selectedValues = Array.isArray(subtask.data.selectedSystems)
          ? subtask.data.selectedSystems
          : [];
        return `
                <div class="form-group">
                  <label>Pre and Post System?</label>
                  <div class="choice-grid">
                    <button class="choice-chip ${subtask.data.prePostSystem === "yes" ? "active" : ""}" type="button" onclick="setPrePostSystem('yes')">YES</button>
                    <button class="choice-chip ${subtask.data.prePostSystem !== "yes" ? "active" : ""}" type="button" onclick="setPrePostSystem('no')">NO</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>System Requirement</label>
                  <div class="selector-list">
                    <div class="employee-chip-grid">
                      ${SYSTEM_REQUIREMENTS.map(
                        (system) => `
                          <button
                            class="employee-chip ${selectedValues.includes(system.value) ? "active" : ""}"
                            type="button"
                            onclick="toggleSystemRequirement('${system.value}')"
                          >${escapeHtml(system.label)}</button>
                        `,
                      ).join("")}
                    </div>
                  </div>
                </div>
              `;
      }

      function renderCalculationSystemSelector(stageId, subtask) {
        const systems = getSelectedSystemRequirements();
        return `
                <div class="form-group">
                  <label>Calculation System</label>
                  <select onchange="setCalculationSystem('${stageId}', '${subtask.id}', this.value)">
                    <option value="">Select system</option>
                    ${systems
                      .map(
                        (system) =>
                          `<option value="${escapeAttr(system.value)}" ${subtask.data.selectedCalculationSystem === system.value ? "selected" : ""}>${escapeHtml(system.label)}</option>`,
                      )
                      .join("")}
                  </select>
                  ${
                    systems.length
                      ? ""
                      : `<p class="helper-note">Select at least one System Requirement first.</p>`
                  }
                </div>
              `;
      }

      function getProposalSubtask(project, subtaskId) {
        const proposal = project
          ? project.stages.find((stage) => stage.id === "proposal")
          : null;
        return proposal
          ? proposal.subtasks.find((subtask) => subtask.id === subtaskId)
          : null;
      }

      function syncCostingSystems(subtask) {
        const systems = getSelectedSystemRequirements();
        const previous = new Map(
          (subtask.data.systemPrices || []).map((item) => [
            item.systemValue,
            item,
          ]),
        );
        subtask.data.systemPrices = systems.map((system) => ({
          systemValue: system.value,
          systemLabel: system.label,
          price:
            previous.get(system.value) && previous.get(system.value).price
              ? previous.get(system.value).price
              : "",
        }));
      }

      function renderProposalCostingTask(stageId, subtask) {
        syncCostingSystems(subtask);
        const rows = subtask.data.systemPrices || [];
        return `
                <p class="helper-note" style="margin-bottom:12px">Enter Price of Selected Systems.</p>
                ${
                  rows.length
                    ? rows
                        .map(
                          (item, index) => `
                            <div class="form-group">
                              <label>${escapeHtml(item.systemLabel)}</label>
                              <input type="number" min="0" step="0.01" value="${escapeAttr(item.price)}" oninput="setCostingSystemPrice('${stageId}', '${subtask.id}', ${index}, this.value)">
                            </div>
                          `,
                        )
                        .join("")
                    : `<p class="helper-note">Select System Requirement first.</p>`
                }
              `;
      }

      function renderAiGeneratedDocumentTask(stageId, subtask, kind, label) {
        return `
                <div class="doc-toolbar">
                  <button class="btn btn-primary" type="button" onclick="generateAiDocument('${stageId}', '${subtask.id}', '${kind}', '${escapeAttr(label)}')">Generate</button>
                  <button class="btn btn-secondary" type="button" onclick="saveAiDocumentPdf('${stageId}', '${subtask.id}', '${escapeAttr(label)}')">Save PDF</button>
                </div>
                <p class="helper-note" style="margin-bottom:12px">${escapeHtml(subtask.data.aiStatus || "Not generated yet.")}${subtask.data.aiSavedAt ? ` | Saved: ${escapeHtml(formatDate(subtask.data.aiSavedAt))}` : ""}</p>
                ${renderTaskTextarea(stageId, subtask.id, "aiText", label, subtask.data.aiText || "", "", 16)}
              `;
      }

      function renderProposalDocumentTask(stageId, subtask) {
        const config = getProposalDocumentTaskConfig(subtask.id);
        const documents = subtask.data.documents || [];
        if (!config) return renderGenericSubtask(stageId, subtask);
        if (isAiProposalDocumentSubtask(subtask.id)) {
          const kind = String(subtask.id).replace("proposal-doc-", "");
          return renderAiGeneratedDocumentTask(
            stageId,
            subtask,
            kind,
            config.name,
          );
        }
        return `
                <div class="task-header">
                  <h3>TASK INFORMATION</h3>
                  <p class="task-description">${escapeHtml(subtask.description)}</p>
                </div>
                <div class="doc-toolbar">
                  <button class="btn btn-primary" type="button" onclick="getProposalDocuments('${stageId}', '${subtask.id}')">Get</button>
                  ${
                    config.viewOnly
                      ? ""
                      : `<button class="btn btn-secondary" type="button" onclick="saveProposalDocuments('${stageId}', '${subtask.id}')">Save</button>`
                  }
                </div>
                <p class="helper-note" style="margin-bottom:12px">
                  Source: Database > Proposal Document > ${escapeHtml(config.folder)}
                  ${subtask.data.savedAt ? ` | Saved: ${escapeHtml(formatDate(subtask.data.savedAt))}` : ""}
                </p>
                ${
                  documents.length
                    ? `<div class="doc-editor-list">
                        ${documents
                          .map((documentItem, index) =>
                            config.viewOnly
                              ? `
                                <div class="doc-editor">
                                  <h4>${escapeHtml(documentItem.name)} <span class="helper-note" style="font-weight:400;">(view only)</span></h4>
                                  <textarea rows="14" readonly>${escapeHtml(documentItem.content || "")}</textarea>
                                </div>
                              `
                              : `
                                <div class="doc-editor">
                                  <h4>${escapeHtml(documentItem.name)}</h4>
                                  <p class="helper-note">${escapeHtml(documentItem.systemLabel || "")}</p>
                                  <textarea rows="14" oninput="setProposalDocumentContent('${stageId}', '${subtask.id}', ${index}, this.value)">${escapeHtml(documentItem.content || "")}</textarea>
                                </div>
                              `,
                          )
                          .join("")}
                      </div>`
                    : `<p class="helper-note">No document loaded yet. Select System Requirement first, then use Get.</p>`
                }
              `;
      }

      function renderEmployeeSingleSelect(label, value, onChangeExpression) {
        const selectedValue = Array.isArray(value)
          ? value[0] || ""
          : value || "";
        const options = getEmployeeOptions();
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <select onchange="${onChangeExpression}">
                    <option value="">Select employee</option>
                    ${options
                      .map(
                        (option) =>
                          `<option value="${escapeAttr(option.value)}" ${selectedValue === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
              `;
      }

      function renderGenerateDocumentsTask(stageId, subtask) {
        const system = SYSTEM_REQUIREMENTS.find(
          (item) => item.value === subtask.data.systemValue,
        );
        const systemLabel = system
          ? system.label
          : subtask.data.systemLabel || "Selected System";
        const documents = [
          { key: "pid", label: "P&ID" },
          { key: "gad", label: "GAD" },
          { key: "tds", label: "Technical Datasheets" },
        ];
        const status = subtask.data.documentStatus || {};
        return `
                <p class="helper-note" style="margin-bottom:12px">System: ${escapeHtml(systemLabel)}</p>
                <div class="doc-editor-list">
                  ${documents
                    .map((documentItem) => {
                      const itemStatus = status[documentItem.key] || {};
                      return `
                        <div class="repeat-block">
                          <div class="repeat-block-header">
                            <h5>${escapeHtml(documentItem.label)}</h5>
                            <button class="btn btn-primary" type="button" onclick="getGeneratedDocument('${stageId}', '${subtask.id}', '${documentItem.key}')">Get</button>
                          </div>
                          ${
                            itemStatus.saved && itemStatus.saved.length
                              ? `<p class="helper-note">Saved: ${escapeHtml(itemStatus.saved.join(", "))}</p>`
                              : `<p class="helper-note">No file fetched yet.</p>`
                          }
                          ${
                            itemStatus.missing && itemStatus.missing.length
                              ? `<p class="helper-note">Missing: ${escapeHtml(itemStatus.missing.join(", "))}</p>`
                              : ""
                          }
                          <div class="form-group">
                            <label>Attach file</label>
                            <input type="file" onchange="handleTaskFile(event, '${stageId}', '${subtask.id}', 'attach_${documentItem.key}')">
                            <div class="helper-note">${itemStatus && itemStatus.submitted ? "Submitted: " + (itemStatus.savedAt || "") : "Not submitted"}</div>
                            <div style="margin-top:6px"><button class="btn btn-primary" type="button" onclick="submitDocumentAttachment('${stageId}','${subtask.id}','${documentItem.key}')">Submit Attachment</button></div>
                          </div>
                        </div>
                      `;
                    })
                    .join("")}
                  <div class="repeat-block">
                    <div class="repeat-block-header">
                      <h5>P&ID</h5>
                    </div>
                    ${renderEmployeeSingleSelect("Request from", subtask.data.requests?.["P&ID"] || "", `setDocumentRequest('${stageId}', '${subtask.id}', 'P&ID', this.value)`)}
                  </div>
                  <div class="repeat-block">
                    <div class="repeat-block-header">
                      <h5>Foundation Load</h5>
                    </div>
                    ${renderEmployeeSingleSelect("Request from", subtask.data.foundationLoadEmployee || "", `setDocumentRequest('${stageId}', '${subtask.id}', 'Foundation Load', this.value)`)}
                  </div>
                  <div class="repeat-block">
                    <div class="repeat-block-header">
                      <h5>Design Explanation</h5>
                      <button class="btn btn-secondary" type="button" onclick="generateAiDocument('${stageId}', '${subtask.id}', 'design-explanation', 'Design Explanation')">Generate Explanation</button>
                      <button class="btn btn-secondary" type="button" onclick="saveAiDocumentPdf('${stageId}', '${subtask.id}', 'Design Explanation')">Save PDF</button>
                    </div>
                    <p class="helper-note">${escapeHtml(subtask.data.aiStatus || subtask.data.designExplanationStatus || "Not generated yet.")}${subtask.data.aiSavedAt ? ` | Saved: ${escapeHtml(formatDate(subtask.data.aiSavedAt))}` : ""}</p>
                    ${renderTaskTextarea(stageId, subtask.id, "aiText", "Design Explanation", subtask.data.aiText || "", "", 16)}
                  </div>
                </div>
              `;
      }

      function renderTaskFile(
        stageId,
        subtaskId,
        key,
        label,
        files,
        listKey,
        index,
      ) {
        const handler =
          listKey !== undefined
            ? `handleRepeaterFile(event, '${stageId}', '${subtaskId}', '${listKey}', ${index}, '${key}')`
            : `handleTaskFile(event, '${stageId}', '${subtaskId}', '${key}')`;
        return `
                <div class="form-group">
                  <label>${label}</label>
                  <input type="file" onchange="${handler}">
                  ${files && files.length ? `<div class="helper-note">Selected: ${escapeHtml(files.join(", "))}</div>` : ""}
                </div>
              `;
      }

      function renderGenericSubtask(stageId, subtask) {
        return (subtask.fields || [])
          .map((field) => {
            if (field.type === "textarea") {
              return renderTaskTextarea(
                stageId,
                subtask.id,
                field.key,
                field.label,
                subtask.data[field.key] || "",
                field.placeholder || "",
                field.rows || 4,
              );
            }
            if (field.type === "select") {
              return renderTaskSelect(
                stageId,
                subtask.id,
                field.key,
                field.label,
                subtask.data[field.key] || "",
                field.options || [],
              );
            }
            if (field.type === "file") {
              return renderTaskFile(
                stageId,
                subtask.id,
                field.key,
                field.label,
                subtask.data[field.key] || [],
              );
            }
            return renderTaskInput(
              stageId,
              subtask.id,
              field.key,
              field.label,
              field.type || "text",
              subtask.data[field.key] || "",
            );
          })
          .join("");
      }

      function renderSubtaskFields(stageId, subtask) {
        if (subtask.id.startsWith("generate-documents")) {
          return renderGenerateDocumentsTask(stageId, subtask);
        }
        switch (subtask.id) {
          case "meetings":
            return `
                    ${subtask.data.meets
                      .map(
                        (meet, index) => `
                          <div class="repeat-block">
                            <div class="repeat-block-header">
                              <h5>Meet - ${index + 1}</h5>
                              ${
                                subtask.data.meets.length > 1
                                  ? `<button class="ghost-btn" type="button" onclick="removeRepeaterItem('${stageId}', '${subtask.id}', 'meets', ${index})">Remove</button>`
                                  : ""
                              }
                            </div>
                            <div class="inline-grid">
                              ${renderTaskInput(stageId, subtask.id, "platform", "Platform", "text", meet.platform, "meets", index)}
                              ${renderTaskInput(stageId, subtask.id, "meetLink", "Meet Link", "url", meet.meetLink, "meets", index)}
                            </div>
                            ${renderEmployeeChipSelector("Attendees", meet.attendees, stageId, subtask.id, "meets", index, "attendees")}
                            <div class="inline-grid">
                              ${renderTaskInput(stageId, subtask.id, "purpose", "Purpose", "text", meet.purpose, "meets", index)}
                              ${renderTaskInput(stageId, subtask.id, "scheduledDate", "Scheduled date", "date", meet.scheduledDate, "meets", index)}
                            </div>
                            ${renderTaskInput(stageId, subtask.id, "scheduledTime", "Scheduled time", "time", meet.scheduledTime, "meets", index)}
                            ${renderTaskTextarea(stageId, subtask.id, "additionalNotes", "Additional Notes", meet.additionalNotes, "", 4, "meets", index)}
                          </div>
                        `,
                      )
                      .join("")}
                  `;
          case "mom-submission":
            syncMomAndVisitReports();
            return (subtask.data.moms || [])
              .map((mom, index) => {
                const si = stageId,
                  ti = subtask.id,
                  mi = index;
                const fld = (key, label, type, value) => `
                  <div class="form-group">
                    <label>${label}</label>
                    <input type="${type}" value="${escapeAttr(value || "")}"
                      oninput="setMomField('${si}','${ti}',${mi},'${key}',this.value)">
                  </div>`;
                const area = (key, label, value, rows) => `
                  <div class="form-group">
                    <label>${label}</label>
                    <textarea rows="${rows || 2}"
                      oninput="setMomField('${si}','${ti}',${mi},'${key}',this.value)">${escapeHtml(value || "")}</textarea>
                  </div>`;
                const nfld = (listKey, itemIdx, key, label, type, value) => `
                  <div class="form-group">
                    <label>${label}</label>
                    <input type="${type}" value="${escapeAttr(value || "")}"
                      oninput="setMomNestedField('${si}','${ti}',${mi},'${listKey}',${itemIdx},'${key}',this.value)">
                  </div>`;
                const narea = (listKey, itemIdx, key, label, value, rows) => `
                  <div class="form-group">
                    <label>${label}</label>
                    <textarea rows="${rows || 2}"
                      oninput="setMomNestedField('${si}','${ti}',${mi},'${listKey}',${itemIdx},'${key}',this.value)">${escapeHtml(value || "")}</textarea>
                  </div>`;

                // Ensure nested arrays exist (backward compat)
                const attendees = mom.attendees || [
                  { name: "", organization: "", role: "" },
                ];
                const discussions = mom.discussions || [
                  { point: "", summary: "" },
                ];
                const actions = mom.actions || [
                  { point: "", action: "", responsibility: "", targetDate: "" },
                ];
                const remarks = mom.remarks || [{ text: "" }];

                return `
                  <div class="repeat-block">
                    <div class="repeat-block-header">
                      <h5>MOM — Meet ${index + 1}</h5>
                      <div class="action-buttons">
                        <button class="btn btn-secondary" type="button"
                          onclick="openMomPdf('${si}','${ti}',${mi})">Preview MOM</button>
                        <button class="btn btn-primary" type="button"
                          onclick="saveMomPdf('${si}','${ti}',${mi})">Save PDF</button>
                      </div>
                    </div>

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:8px 0 4px;">Document Info</p>
                    <div class="inline-grid">
                      ${fld("momNo", "MOM No.", "text", mom.momNo)}
                      ${fld("projectRef", "Project Ref.", "text", mom.projectRef)}
                    </div>
                    <div class="inline-grid">
                      ${fld("meetingDate", "Meeting Date", "date", mom.meetingDate)}
                      ${fld("submissionDate", "Submission Date", "date", mom.submissionDate)}
                    </div>

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:8px 0 4px;">Meeting Information</p>
                    <div class="inline-grid">
                      ${fld("meetingType", "Meeting Type", "text", mom.meetingType)}
                      ${fld("venue", "Venue", "text", mom.venue)}
                    </div>
                    <div class="inline-grid">
                      ${fld("conductedBy", "Conducted By", "text", mom.conductedBy)}
                      ${fld("clientTeam", "Client Team", "text", mom.clientTeam)}
                    </div>
                    <div class="inline-grid">
                      ${fld("startTime", "Start Time", "time", mom.startTime)}
                      ${fld("endTime", "End Time", "time", mom.endTime)}
                    </div>
                    ${fld("duration", "Duration (e.g. 1 hr 30 min)", "text", mom.duration)}

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:8px 0 4px;">Attendees</p>
                    ${attendees
                      .map(
                        (a, ai) => `
                      <div class="repeat-block" style="padding:8px;margin-bottom:6px;">
                        <div class="repeat-block-header">
                          <span style="font-size:11px;font-weight:600;">Attendee ${ai + 1}</span>
                          ${
                            attendees.length > 1
                              ? `<button class="ghost-btn" type="button"
                                onclick="removeMomNestedItem('${si}','${ti}',${mi},'attendees',${ai})">Remove</button>`
                              : ""
                          }
                        </div>
                        <div class="inline-grid">
                          ${nfld("attendees", ai, "name", "Name", "text", a.name)}
                          ${nfld("attendees", ai, "organization", "Organization", "text", a.organization)}
                        </div>
                        ${nfld("attendees", ai, "role", "Role", "text", a.role)}
                      </div>
                    `,
                      )
                      .join("")}
                    <button class="ghost-btn" type="button"
                      onclick="addMomNestedItem('${si}','${ti}',${mi},'attendees')">+ Add Attendee</button>

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:10px 0 4px;">Discussion Summary</p>
                    ${discussions
                      .map(
                        (d, di) => `
                      <div class="repeat-block" style="padding:8px;margin-bottom:6px;">
                        <div class="repeat-block-header">
                          <span style="font-size:11px;font-weight:600;">Point ${di + 1}</span>
                          ${
                            discussions.length > 1
                              ? `<button class="ghost-btn" type="button"
                                onclick="removeMomNestedItem('${si}','${ti}',${mi},'discussions',${di})">Remove</button>`
                              : ""
                          }
                        </div>
                        ${nfld("discussions", di, "point", "Discussion Point", "text", d.point)}
                        ${narea("discussions", di, "summary", "Summary", d.summary, 3)}
                      </div>
                    `,
                      )
                      .join("")}
                    <button class="ghost-btn" type="button"
                      onclick="addMomNestedItem('${si}','${ti}',${mi},'discussions')">+ Add Discussion Point</button>

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:10px 0 4px;">Decisions / Next Actions</p>
                    ${actions
                      .map(
                        (a, ai) => `
                      <div class="repeat-block" style="padding:8px;margin-bottom:6px;">
                        <div class="repeat-block-header">
                          <span style="font-size:11px;font-weight:600;">Action ${ai + 1}</span>
                          ${
                            actions.length > 1
                              ? `<button class="ghost-btn" type="button"
                                onclick="removeMomNestedItem('${si}','${ti}',${mi},'actions',${ai})">Remove</button>`
                              : ""
                          }
                        </div>
                        ${nfld("actions", ai, "point", "Discussion Point", "text", a.point)}
                        ${narea("actions", ai, "action", "Next Action / Decision", a.action, 2)}
                        <div class="inline-grid">
                          ${nfld("actions", ai, "responsibility", "Responsibility", "text", a.responsibility)}
                          ${nfld("actions", ai, "targetDate", "Target Date", "date", a.targetDate)}
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                    <button class="ghost-btn" type="button"
                      onclick="addMomNestedItem('${si}','${ti}',${mi},'actions')">+ Add Action Item</button>

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:10px 0 4px;">Remarks</p>
                    ${remarks
                      .map(
                        (r, ri) => `
                      <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;">
                        <div class="form-group" style="flex:1;margin:0;">
                          <textarea rows="2" placeholder="Remark ${ri + 1}"
                            oninput="setMomNestedField('${si}','${ti}',${mi},'remarks',${ri},'text',this.value)">${escapeHtml(r.text || "")}</textarea>
                        </div>
                        ${
                          remarks.length > 1
                            ? `<button class="ghost-btn" type="button" style="margin-top:2px;"
                              onclick="removeMomNestedItem('${si}','${ti}',${mi},'remarks',${ri})">✕</button>`
                            : ""
                        }
                      </div>
                    `,
                      )
                      .join("")}
                    <button class="ghost-btn" type="button"
                      onclick="addMomNestedItem('${si}','${ti}',${mi},'remarks')">+ Add Remark</button>

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:10px 0 4px;">Next Meeting</p>
                    <div class="inline-grid">
                      ${fld("nextMeetingDate", "Date", "date", mom.nextMeetingDate)}
                      ${fld("nextMeetingTime", "Time", "time", mom.nextMeetingTime)}
                    </div>
                    ${fld("nextMeetingVenue", "Venue", "text", mom.nextMeetingVenue)}

                    <p style="font-size:11px;font-weight:700;color:#1f3b63;margin:10px 0 4px;">Prepared By</p>
                    <div class="inline-grid">
                      ${fld("preparedByName", "Name", "text", mom.preparedByName)}
                      ${fld("preparedByDesignation", "Designation", "text", mom.preparedByDesignation)}
                    </div>
                    ${fld("preparedByCompany", "Company", "text", mom.preparedByCompany)}
                  </div>
                `;
              })
              .join("");
          case "system-requirement":
            return `
                    ${renderSystemRequirementSelector(subtask)}
                    ${renderTaskTextarea(
                      stageId,
                      subtask.id,
                      "notes",
                      "System Requirement Notes",
                      subtask.data.notes,
                      "Yet to decide",
                      5,
                    )}
                  `;
          case "site-visits":
            return `
                    ${(subtask.data.visits || [])
                      .map(
                        (visit, index) => `
                          <div class="repeat-block">
                            <div class="repeat-block-header">
                              <h5>Visit - ${index + 1}</h5>
                              ${
                                subtask.data.visits.length > 1
                                  ? `<button class="ghost-btn" type="button" onclick="removeRepeaterItem('${stageId}', '${subtask.id}', 'visits', ${index})">Remove</button>`
                                  : ""
                              }
                            </div>
                            <div class="inline-grid">
                              ${renderTaskInput(stageId, subtask.id, "visitDate", "Visit Date", "date", visit.visitDate, "visits", index)}
                              ${renderTaskInput(stageId, subtask.id, "visitTime", "Visit Time", "time", visit.visitTime, "visits", index)}
                            </div>
                            ${renderTaskInput(stageId, subtask.id, "locationLink", "Location Link", "url", visit.locationLink, "visits", index)}
                            ${renderEmployeeChipSelector("Attendees", visit.attendees, stageId, subtask.id, "visits", index, "attendees")}
                            ${renderTaskInput(stageId, subtask.id, "purpose", "Purpose", "text", visit.purpose, "visits", index)}
                            ${renderTaskInput(stageId, subtask.id, "requestFundAmount", "Request Fund (amount)", "number", visit.requestFundAmount || "", "visits", index)}
                            ${
                              visit.requestCreated
                                ? `<p class="helper-note">Fund status: ${escapeHtml(visit.fundStatus === "paid" ? "Paid" : "Requested")}</p>`
                                : ""
                            }
                          </div>
                        `,
                      )
                      .join("")}
                  `;
          case "visit-report":
            syncMomAndVisitReports();
            return `
                    ${renderTaskTextarea(stageId, subtask.id, "utilityRequirements", "Utility Requirements (Power, Water, Space)", subtask.data.utilityRequirements, "", 4)}
                    ${renderTaskTextarea(stageId, subtask.id, "siteConstraints", "Site Constraints (height, layout, safety)", subtask.data.siteConstraints, "", 4)}
                    ${(subtask.data.reports || [])
                      .map(
                        (report, index) => `
                          <div class="repeat-block">
                            <div class="repeat-block-header">
                              <h5>Visit ${index + 1} Report</h5>
                            </div>
                            ${renderTaskTextarea(stageId, subtask.id, "visitReportText", `Visit ${index + 1} Report`, report.visitReportText, "", 10, "reports", index)}
                            ${renderTaskTextarea(stageId, subtask.id, "expensesMade", `Expenses Made`, report.expensesMade || "", "", 6, "reports", index)}
                            ${renderTaskFile(stageId, subtask.id, "attachments", "Attach Expense PDF", report.attachments || [], "reports", index)}
                          </div>
                        `,
                      )
                      .join("")}
                  `;
          case "design-calculation":
          case "design-calculation-pre":
          case "design-calculation-post":
            return `
                    <p class="helper-note" style="margin-bottom:12px">Choose a system from the selected System Requirement list. Calculation output records will be listed under Database > Projects.</p>
                    ${renderCalculationSystemSelector(stageId, subtask)}
                    <div class="action-buttons" style="margin-bottom:14px">
                      <button class="btn btn-primary" type="button" onclick="openCalculationPage('${stageId}', '${subtask.id}')">Open Calculation Page</button>
                      ${
                        subtask.data.calculationStored &&
                        subtask.data.calculationOutputs &&
                        subtask.data.calculationOutputs.some(
                          (o) =>
                            o.structured &&
                            o.structured.format === "gas-chlorination",
                        )
                          ? `<button class="btn btn-secondary" type="button" onclick="previewDesignReport()">View Design Report</button>`
                          : ""
                      }
                    </div>
                  `;
          case "generate-documents":
            return renderGenerateDocumentsTask(stageId, subtask);
          case "compatability-check":
            return renderTaskTextarea(
              stageId,
              subtask.id,
              "notes",
              "Compatability Check",
              subtask.data.notes,
              "Yet to decide",
              5,
            );
          case "assumptions-made":
            return renderAssumptionsSubtask(stageId, subtask);
          case "confirmation":
            return renderTaskTextarea(
              stageId,
              subtask.id,
              "notes",
              "Confirmation",
              subtask.data.notes,
              "Yet to decide",
              5,
            );
          case "budget-list":
            return renderTaskTextarea(
              stageId,
              subtask.id,
              "notes",
              "Budget List",
              subtask.data.notes,
              "Yet to decide",
              5,
            );
          case "schedule":
            return `
                    ${subtask.data.tasks
                      .map(
                        (task, index) => `
                          <div class="repeat-block">
                            <div class="repeat-block-header">
                              <h5>Task ${index + 1}</h5>
                              ${
                                subtask.data.tasks.length > 1
                                  ? `<button class="ghost-btn" type="button" onclick="removeRepeaterItem('${stageId}', '${subtask.id}', 'tasks', ${index})">Remove</button>`
                                  : ""
                              }
                            </div>
                            ${renderTaskTextarea(stageId, subtask.id, "task", "Task", task.task, "", 3, "tasks", index)}
                            <div class="inline-grid">
                              ${renderTaskInput(stageId, subtask.id, "assignee", "Assign to", "text", task.assignee, "tasks", index)}
                              ${renderTaskInput(stageId, subtask.id, "deadline", "Deadline", "date", task.deadline, "tasks", index)}
                            </div>
                          </div>
                        `,
                      )
                      .join("")}
                    <button class="ghost-btn" type="button" onclick="addRepeaterItem('${stageId}', '${subtask.id}', 'tasks')">+ Add New Task</button>
                  `;
          case "proposal-costing":
            return renderProposalCostingTask(stageId, subtask);
          case "proposal-payment-terms":
          case "proposal-delivery-terms":
          case "proposal-other-terms":
            return renderTaskTextarea(
              stageId,
              subtask.id,
              "text",
              subtask.name,
              subtask.data.text || "",
              "",
              8,
            );
          case "quotation":
            return `
                    <div class="repeat-block">
                      <p class="helper-note" style="margin-bottom:12px">Generate a quotation PDF from Client Info, Costing, Payment Terms, Delivery Terms, and Other Terms and Condition.</p>
                      <button class="btn btn-primary" type="button" onclick="generateQuotationPdf('${stageId}', '${subtask.id}')">Generate Quote</button>
                      ${
                        subtask.data.savedAt
                          ? `<button class="btn btn-secondary" type="button" onclick="openStoredProjectDocumentPdf('${getCurrentProject() ? getCurrentProject().id : ""}', '${subtask.id}', 'quotation')">View Saved Quote</button>`
                          : ""
                      }
                      <p class="helper-note" style="margin-top:12px">${subtask.data.savedAt ? `Saved: ${escapeHtml(formatDate(subtask.data.savedAt))}` : "No quote generated yet."}</p>
                    </div>
                  `;
          case "production-clearence":
          case "proforma-invoice":
            return renderTaskFile(
              stageId,
              subtask.id,
              "uploadDoc",
              "Upload Doc",
              subtask.data.uploadDoc,
            );
          case "purchase-order":
            return `
                    <p class="helper-note" style="margin-bottom:12px">Cross check purchase order with quotation.</p>
                    ${renderTaskFile(stageId, subtask.id, "uploadDoc", "Upload Doc", subtask.data.uploadDoc)}
                  `;
          case "confirmation-status":
            return `
                    ${renderTaskSelect(stageId, subtask.id, "proceedForProcurement", "Proceed for Procurement?", subtask.data.proceedForProcurement, ["yes", "no"])}
                    ${
                      subtask.data.proceedForProcurement === "no"
                        ? `
                          ${renderTaskSelect(stageId, subtask.id, "reason", "Reason?", subtask.data.reason, ["Client Rejected", "Others"])}
                          ${renderTaskTextarea(stageId, subtask.id, "mention", "Mention", subtask.data.mention, "", 6)}
                        `
                        : ""
                    }
                  `;
          default:
            if (subtask.id && subtask.id.startsWith("proposal-doc-")) {
              return renderProposalDocumentTask(stageId, subtask);
            }
            return renderGenericSubtask(stageId, subtask);
        }
      }

      function renderSubtaskModal() {
        if (!state.activeModal) return;
        const subtask = getSubtask(
          state.activeModal.stageId,
          state.activeModal.subtaskId,
        );
        if (!subtask) return;

        document.getElementById("modalTitle").textContent = subtask.name;
        document.getElementById("modalBody").innerHTML = `
                <div class="form-section">
                  <h4>Task Information</h4>
                  <p class="helper-note" style="margin-bottom:16px">${escapeHtml(subtask.description || "Update the task details below.")}</p>
                  ${renderSubtaskFields(state.activeModal.stageId, subtask)}
                  <div class="form-group">
                    <label>Status</label>
                    <select onchange="setSubtaskStatus('${state.activeModal.stageId}', '${state.activeModal.subtaskId}', this.value)">
                      <option value="pending" ${subtask.status === "pending" ? "selected" : ""}>Pending</option>
                      <option value="in-progress" ${subtask.status === "in-progress" ? "selected" : ""}>In Progress</option>
                      <option value="completed" ${subtask.status === "completed" ? "selected" : ""}>Completed</option>
                    </select>
                  </div>
                </div>
                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" onclick="saveSubtask('${state.activeModal.stageId}')">Save Changes</button>
                  <button class="btn btn-secondary" type="button" onclick="closeSubtaskModal()">Cancel</button>
                </div>
              `;
      }

      function openSubtaskModal(stageId, subtaskId) {
        if (!canAccessStage(stageId)) {
          alert("This task is not available for your role.");
          return;
        }
        if (!canUseRequirementEngineeringTasks(stageId)) {
          alert(
            "Assign every Requirement Engineering task before opening tasks.",
          );
          return;
        }
        state.activeModal = { stageId, subtaskId };
        renderSubtaskModal();
        document.getElementById("subtaskModal").classList.add("active");
      }

      function closeSubtaskModal() {
        state.activeModal = null;
        document.getElementById("subtaskModal").classList.remove("active");
      }

      function setTaskField(stageId, subtaskId, key, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data[key] = value;
        persistAppStateSoon();
      }

      function setRequirementTaskAssignee(stageId, subtaskId, employeeId) {
        const subtask = getSubtask(stageId, subtaskId);
        const project = getCurrentProject();
        if (!subtask || !project) return;
        subtask.assignedTo = employeeId;
        if (areRequirementEngineeringTasksAssigned(project)) {
          project.requirementEngineeringLocked = false;
        } else if (stageId === "requirement-engineering") {
          project.requirementEngineeringLocked = true;
        }
        persistAppStateSoon();
        renderDashboard();
        if (state.activeStageId) showStageDetail(state.activeStageId);
      }

      function setCostingSystemPrice(stageId, subtaskId, index, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        syncCostingSystems(subtask);
        if (!subtask.data.systemPrices[index]) return;
        subtask.data.systemPrices[index].price = value;
        persistAppStateSoon();
      }

      function setRepeaterField(
        stageId,
        subtaskId,
        listKey,
        index,
        key,
        value,
      ) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data[listKey][index][key] = value;
        if (subtaskId === "meetings" || subtaskId === "site-visits") {
          syncMomAndVisitReports();
        }
        if (subtaskId === "confirmation-status") {
          renderSubtaskModal();
        }
        persistAppStateSoon();
      }

      function setDocumentRequest(stageId, subtaskId, documentName, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        if (documentName === "Foundation Load") {
          subtask.data.foundationLoadEmployee = Array.isArray(value)
            ? value[0] || ""
            : value || "";
          persistAppStateSoon();
          return;
        }
        if (!subtask.data.requests) subtask.data.requests = {};
        subtask.data.requests[documentName] = Array.isArray(value)
          ? value[0] || ""
          : value || "";
        persistAppStateSoon();
      }

      function saveAssumptionsPdf(stageId, subtaskId) {
        const subtask = getSubtask(stageId, subtaskId);
        const project = getCurrentProject();
        if (!subtask || !project) return;

        const versionLabel = `Scope Matrix - ${new Date().toLocaleString()}`;
        const rows = getScopeMatrixRows(subtask);
        const groups = SCOPE_MATRIX_ITEMS.map((group) => ({
          section: group.section,
          items: group.items.map((item) => ({
            ...item,
            ...rows.find((row) => row.id === item.id),
          })),
        }));
        const html = `
          <html>
            <head>
              <title>Scope Matrix</title>
              <style>
                body { font-family: Arial, sans-serif; color: #111; padding: 24px; }
                h1 { font-size: 1.3rem; margin-bottom: 14px; }
                h3 { font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
                th, td { border: 1px solid #666; padding: 10px; text-align: left; }
                th { background: #f4f4f4; }
              </style>
            </head>
            <body>
              <h1>Scope Matrix</h1>
              <p>${escapeHtml(versionLabel)}</p>
              <p>Project: ${escapeHtml(project.name)}</p>
              ${groups
                .map(
                  (group) => `
                    ${group.section ? `<h3>${escapeHtml(group.section)}</h3>` : ""}
                    <table>
                      <thead>
                        <tr><th>Item</th><th style="width:15%; text-align:center;">RSVP Scope</th><th style="width:15%; text-align:center;">Client Scope</th></tr>
                      </thead>
                      <tbody>
                        ${group.items
                          .map(
                            (item) => `
                              <tr>
                                <td>${escapeHtml(item.name)}</td>
                                <td style="text-align:center;">${item.rsvpScope ? "✓" : ""}</td>
                                <td style="text-align:center;">${item.clientScope ? "✓" : ""}</td>
                              </tr>
                            `,
                          )
                          .join("")}
                      </tbody>
                    </table>
                  `,
                )
                .join("")}
            </body>
          </html>
        `;
        const pdfText = [
          "Scope Matrix",
          versionLabel,
          `Project: ${project.name}`,
          "",
          ...groups.flatMap((group) => [
            group.section || "Scope",
            ...group.items.map(
              (item) =>
                `${item.name} | RSVP Scope: ${item.rsvpScope ? "Yes" : "No"} | Client Scope: ${item.clientScope ? "Yes" : "No"}`,
            ),
            "",
          ]),
        ].join("\n");

        const pdfRecord = {
          name: `Scope Matrix ${new Date().toISOString().split("T")[0]}.pdf`,
          subtaskId: subtaskId,
          pdfKind: "scope-matrix",
          dataUri: createPdfDataUri(`${project.name} - Scope Matrix`, pdfText),
          htmlContent: html,
          savedAt: new Date().toISOString(),
          storagePath: `Projects > ${project.name} > Scope Matrix`,
        };

        if (!project.databaseItems) project.databaseItems = [];
        project.databaseItems.push(pdfRecord);
        persistAppStateSoon();
        alert(`Scope Matrix PDF saved to project database.`);
        renderSubtaskModal();
      }

      function setCalculationSystem(stageId, subtaskId, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data.selectedCalculationSystem = value;
        persistAppStateSoon();
      }

      function toggleSystemRequirement(systemValue) {
        const subtask = getSubtask(
          "requirement-engineering",
          "system-requirement",
        );
        if (!subtask) return;
        const values = Array.isArray(subtask.data.selectedSystems)
          ? subtask.data.selectedSystems
          : [];
        subtask.data.selectedSystems = values.includes(systemValue)
          ? values.filter((value) => value !== systemValue)
          : [...values, systemValue];
        const project = getCurrentProject();
        if (project) syncProposalStageTasks(project);
        syncGenerateDocumentTasks();
        persistAppStateSoon();
        renderSubtaskModal();
        renderDashboard();
        if (state.activeStageId) showStageDetail(state.activeStageId);
      }

      function setPrePostSystem(value) {
        const subtask = getSubtask(
          "requirement-engineering",
          "system-requirement",
        );
        if (!subtask) return;
        subtask.data.prePostSystem = value === "yes" ? "yes" : "no";
        syncDesignCalculationTasks();
        syncGenerateDocumentTasks();
        persistAppStateSoon();
        renderSubtaskModal();
        renderDashboard();
        if (state.activeStageId) showStageDetail(state.activeStageId);
      }

      function createDesignCalculationTask(phase) {
        const label = phase
          ? `${phase} Design Calculation`
          : "Design Calculation";
        return {
          id: phase
            ? `design-calculation-${phase.toLowerCase()}`
            : "design-calculation",
          name: label,
          description:
            "Choose a selected system and open its calculation page. Revisions can be added below.",
          status: "pending",
          assignedTo: "",
          data: {
            phase,
            selectedCalculationSystem: "",
            calculationOutputs: [],
            revisions: [{ revisionRequest: "" }],
          },
        };
      }

      function createGenerateDocumentTask(system) {
        return {
          id: `generate-documents-${system.value}`,
          name: `Generate Documents - ${system.label}`,
          description: "Fetch project documents from Supabase storage.",
          status: "pending",
          assignedTo: "",
          data: {
            systemValue: system.value,
            systemLabel: system.label,
            documentStatus: {},
            foundationLoadEmployee: "",
            designExplanationStatus: "",
          },
        };
      }

      function createProposalSubtask(id) {
        const config = {
          "proposal-costing": {
            name: "Costing",
            description: "Enter price for each selected system.",
            data: { systemPrices: [] },
          },
          "proposal-payment-terms": {
            name: "Payment Terms",
            description: "Enter payment terms.",
            data: { text: "" },
          },
          "proposal-delivery-terms": {
            name: "Delivery Terms",
            description: "Enter delivery terms.",
            data: { text: "" },
          },
          "proposal-other-terms": {
            name: "Other Terms and Condition",
            description: "Enter other terms and condition.",
            data: { text: "" },
          },
        }[id];
        return {
          id,
          name: config.name,
          description: config.description,
          status: "pending",
          data: clone(config.data),
        };
      }

      function syncProposalStageTasks(project) {
        const proposal = project
          ? project.stages.find((stage) => stage.id === "proposal")
          : null;
        if (!proposal) return;
        const oldById = new Map(
          proposal.subtasks.map((task) => [task.id, task]),
        );
        proposal.subtasks = proposal.subtasks.filter(
          (task) =>
            ![
              "proposal-doc-costing",
              "proposal-doc-payment-terms",
              "proposal-doc-delivery-terms",
            ].includes(task.id),
        );
        const wanted = [
          "proposal-costing",
          "proposal-payment-terms",
          "proposal-delivery-terms",
          "proposal-other-terms",
        ];
        const quoteIndex = proposal.subtasks.findIndex(
          (task) => task.id === "quotation",
        );
        let insertAt = quoteIndex >= 0 ? quoteIndex : proposal.subtasks.length;
        wanted.forEach((id) => {
          if (proposal.subtasks.some((task) => task.id === id)) return;
          const fresh = createProposalSubtask(id);
          const legacy =
            id === "proposal-costing"
              ? oldById.get("proposal-doc-costing")
              : id === "proposal-payment-terms"
                ? oldById.get("proposal-doc-payment-terms")
                : id === "proposal-delivery-terms"
                  ? oldById.get("proposal-doc-delivery-terms")
                  : null;
          if (legacy && id !== "proposal-costing") {
            fresh.data.text = (legacy.data.documents || [])
              .map((doc) => doc.content || "")
              .filter(Boolean)
              .join("\n\n");
          }
          proposal.subtasks.splice(insertAt, 0, fresh);
          insertAt += 1;
        });
        const quotation = proposal.subtasks.find(
          (task) => task.id === "quotation",
        );
        if (quotation) {
          const legacyQuote =
            quotation.data &&
            quotation.data.revisions &&
            quotation.data.revisions[0]
              ? quotation.data.revisions[0]
              : null;
          quotation.description =
            "Generate quotation PDF from client info, costing, and terms.";
          if (!quotation.data) quotation.data = {};
          if (!("quotationPdfDataUri" in quotation.data)) {
            quotation.data.quotationPdfDataUri = "";
          }
          if (!("savedAt" in quotation.data)) quotation.data.savedAt = "";
          if (legacyQuote) {
            const payment = proposal.subtasks.find(
              (task) => task.id === "proposal-payment-terms",
            );
            if (payment && !payment.data.text) {
              payment.data.text = legacyQuote.paymentTerms || "";
            }
          }
        }
      }

      function syncDesignCalculationTasks() {
        const stage = getStage("requirement-engineering");
        const systemTask = stage
          ? stage.subtasks.find((item) => item.id === "system-requirement")
          : null;
        if (!stage || !systemTask) return;

        const wantsPrePost = systemTask.data.prePostSystem === "yes";
        const existing = stage.subtasks.filter((item) =>
          item.id.startsWith("design-calculation"),
        );
        const existingDefault =
          existing.find((item) => item.id === "design-calculation") ||
          existing[0] ||
          createDesignCalculationTask("");
        const existingPre =
          existing.find((item) => item.id === "design-calculation-pre") ||
          existingDefault;
        const existingPost =
          existing.find((item) => item.id === "design-calculation-post") ||
          createDesignCalculationTask("POST");
        stage.subtasks = stage.subtasks.filter(
          (item) => !item.id.startsWith("design-calculation"),
        );

        const insertIndex = stage.subtasks.findIndex(
          (item) => item.id === "visit-report",
        );
        const targetIndex =
          insertIndex >= 0 ? insertIndex + 1 : stage.subtasks.length;
        const tasks = wantsPrePost
          ? [
              {
                ...clone(existingPre),
                id: "design-calculation-pre",
                name: "PRE Design Calculation",
                data: { ...clone(existingPre.data || {}), phase: "PRE" },
              },
              {
                ...clone(existingPost),
                id: "design-calculation-post",
                name: "POST Design Calculation",
                data: { ...clone(existingPost.data || {}), phase: "POST" },
              },
            ]
          : [
              {
                ...clone(existingDefault),
                id: "design-calculation",
                name: "Design Calculation",
                data: { ...clone(existingDefault.data || {}), phase: "" },
              },
            ];

        tasks.forEach((task) => {
          if (task.assignedTo === undefined) task.assignedTo = "";
          if (!Array.isArray(task.data.revisions)) {
            task.data.revisions = [{ revisionRequest: "" }];
          }
          if (!Array.isArray(task.data.calculationOutputs)) {
            task.data.calculationOutputs = [];
          }
        });
        stage.subtasks.splice(targetIndex, 0, ...tasks);
      }

      function syncGenerateDocumentTasks() {
        const stage = getStage("requirement-engineering");
        if (!stage) return;
        const selectedSystems = getSelectedSystemRequirements();
        const existing = stage.subtasks.filter((item) =>
          item.id.startsWith("generate-documents"),
        );
        const existingBySystem = new Map(
          existing
            .filter((item) => item.data && item.data.systemValue)
            .map((item) => [item.data.systemValue, item]),
        );
        const legacy = existing.find(
          (item) => item.id === "generate-documents",
        );
        stage.subtasks = stage.subtasks.filter(
          (item) => !item.id.startsWith("generate-documents"),
        );
        const insertIndex = stage.subtasks.findIndex(
          (item) => item.id === "compatability-check",
        );
        const targetIndex =
          insertIndex >= 0 ? insertIndex : stage.subtasks.length;
        const tasks = selectedSystems.map((system) => {
          const previous =
            existingBySystem.get(system.value) ||
            (selectedSystems.length === 1 ? legacy : null) ||
            createGenerateDocumentTask(system);
          return {
            ...clone(previous),
            id: `generate-documents-${system.value}`,
            name: `Generate Documents - ${system.label}`,
            description: "Fetch project documents from Supabase storage.",
            assignedTo: previous.assignedTo || "",
            data: {
              ...clone(previous.data || {}),
              systemValue: system.value,
              systemLabel: system.label,
              documentStatus:
                (previous.data && previous.data.documentStatus) || {},
              foundationLoadEmployee:
                (previous.data && previous.data.foundationLoadEmployee) || "",
              designExplanationStatus:
                (previous.data && previous.data.designExplanationStatus) || "",
              aiText: (previous.data && previous.data.aiText) || "",
              aiStatus: (previous.data && previous.data.aiStatus) || "",
              aiPdfDataUri: (previous.data && previous.data.aiPdfDataUri) || "",
              aiSavedAt: (previous.data && previous.data.aiSavedAt) || "",
            },
          };
        });
        if (!tasks.length) {
          tasks.push(
            createGenerateDocumentTask({
              value: "pending",
              label: "Select System Requirement",
            }),
          );
        }
        stage.subtasks.splice(targetIndex, 0, ...tasks);
      }

      async function connectDatabaseFolder() {
        if (!window.showDirectoryPicker) {
          alert(
            "This browser cannot connect to folders. Use Chrome or Edge for Database folder storage.",
          );
          return null;
        }
        state.databaseDirectoryHandle = await window.showDirectoryPicker({
          mode: "readwrite",
        });
        renderDatabase();
        return state.databaseDirectoryHandle;
      }

      async function getDatabaseDirectoryHandle() {
        if (state.databaseDirectoryHandle) return state.databaseDirectoryHandle;
        return connectDatabaseFolder();
      }

      async function getNestedDirectoryHandle(rootHandle, pathParts, options) {
        let handle = rootHandle;
        for (const part of pathParts) {
          handle = await handle.getDirectoryHandle(part, options || {});
        }
        return handle;
      }

      async function getProposalSourceDirectory(config) {
        const databaseHandle = await getDatabaseDirectoryHandle();
        if (!databaseHandle) return null;
        return getNestedDirectoryHandle(databaseHandle, [
          "Proposal Document",
          config.folder,
        ]);
      }

      function toDatabaseUrl(pathParts) {
        return pathParts
          .map((part) => encodeURIComponent(part).replace(/%26/g, "&"))
          .join("/");
      }

      function getProposalDocumentUrl(config, fileName) {
        return toDatabaseUrl([
          "Database",
          "Proposal Document",
          config.folder,
          fileName,
        ]);
      }

      function getProposalDocumentUrlCandidates(config, fileName) {
        const relativePath = getProposalDocumentUrl(config, fileName);
        const currentDirectory = new URL(".", window.location.href).pathname;
        const pathParts = currentDirectory.split("/").filter(Boolean);
        const projectFolder = pathParts[pathParts.length - 1] || "";
        return [
          relativePath,
          `./${relativePath}`,
          `/${relativePath}`,
          projectFolder
            ? `/${encodeURIComponent(projectFolder)}/${relativePath}`
            : "",
          `../${relativePath}`,
        ].filter(Boolean);
      }

      async function findReadableUrl(urls) {
        let lastError = null;
        for (const url of urls) {
          try {
            const response = await fetch(url, { cache: "no-store" });
            if (response.ok) return { url, response };
            lastError = new Error(`${url} returned ${response.status}`);
          } catch (error) {
            lastError = error;
          }
        }
        throw lastError || new Error("Document path was not found.");
      }

      function getZipEntryBytes(buffer, fileName) {
        const view = new DataView(buffer);
        const bytes = new Uint8Array(buffer);
        for (let index = bytes.length - 22; index >= 0; index -= 1) {
          if (view.getUint32(index, true) !== 0x06054b50) continue;
          const centralDirectoryOffset = view.getUint32(index + 16, true);
          const totalEntries = view.getUint16(index + 10, true);
          let cursor = centralDirectoryOffset;
          for (let entryIndex = 0; entryIndex < totalEntries; entryIndex += 1) {
            if (view.getUint32(cursor, true) !== 0x02014b50) break;
            const method = view.getUint16(cursor + 10, true);
            const compressedSize = view.getUint32(cursor + 20, true);
            const fileNameLength = view.getUint16(cursor + 28, true);
            const extraLength = view.getUint16(cursor + 30, true);
            const commentLength = view.getUint16(cursor + 32, true);
            const localOffset = view.getUint32(cursor + 42, true);
            const name = new TextDecoder().decode(
              bytes.slice(cursor + 46, cursor + 46 + fileNameLength),
            );
            if (name === fileName) {
              const localNameLength = view.getUint16(localOffset + 26, true);
              const localExtraLength = view.getUint16(localOffset + 28, true);
              const dataStart =
                localOffset + 30 + localNameLength + localExtraLength;
              return {
                method,
                bytes: bytes.slice(dataStart, dataStart + compressedSize),
              };
            }
            cursor += 46 + fileNameLength + extraLength + commentLength;
          }
          break;
        }
        return null;
      }

      async function inflateZipEntry(entry) {
        if (!entry) return "";
        if (entry.method === 0) return new TextDecoder().decode(entry.bytes);
        if (entry.method !== 8 || !window.DecompressionStream) {
          throw new Error("DOCX compression is not supported by this browser.");
        }
        const stream = new Blob([entry.bytes])
          .stream()
          .pipeThrough(new DecompressionStream("deflate-raw"));
        const decompressed = await new Response(stream).arrayBuffer();
        return new TextDecoder().decode(decompressed);
      }

      function docxXmlToText(xml) {
        const doc = new DOMParser().parseFromString(xml, "application/xml");
        return Array.from(doc.getElementsByTagName("w:p"))
          .map((paragraph) =>
            Array.from(paragraph.getElementsByTagName("w:t"))
              .map((node) => node.textContent || "")
              .join(""),
          )
          .filter((line) => line.trim())
          .join("\n\n");
      }

      async function readDocxText(file) {
        const buffer = await file.arrayBuffer();
        const documentXml = await inflateZipEntry(
          getZipEntryBytes(buffer, "word/document.xml"),
        );
        return docxXmlToText(documentXml);
      }

      async function readDocxTextFromUrl(url) {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Could not load ${url}`);
        }
        return readDocxText(await response.blob());
      }

      async function readLinkedDocxText(config, fileName) {
        const result = await findReadableUrl(
          getProposalDocumentUrlCandidates(config, fileName),
        );
        return {
          url: result.url,
          content: await readDocxText(await result.response.blob()),
        };
      }

      async function getProposalDocuments(stageId, subtaskId) {
        const subtask = getSubtask(stageId, subtaskId);
        const config = getProposalDocumentTaskConfig(subtaskId);
        if (!subtask || !config) return;
        try {
          if (config.viewOnly) {
            const profileFiles = [
              "CompanyProfile.docx",
              "Credentials.docx",
              "ExperienceApproval.docx",
            ];
            const documents = [];
            for (const fileName of profileFiles) {
              const url = `/api/proposal-document?folder=${encodeURIComponent(config.folder)}&file=${encodeURIComponent(fileName)}`;
              const response = await fetch(url, { cache: "no-store" });
              if (!response.ok) {
                throw new Error(
                  `Could not load ${fileName} (${response.status})`,
                );
              }
              const data = await response.json();
              documents.push({
                name: fileName,
                content: data.content || "",
                viewOnly: true,
                sourcePath: `Database > Proposal Document > ${config.folder} > ${fileName}`,
              });
            }
            subtask.data.documents = documents;
          } else {
            const systems = getSelectedSystemRequirements();
            if (!systems.length) {
              alert("Select at least one System Requirement first.");
              return;
            }
            const documents = [];
            for (const system of systems) {
              const fileName = `${config.prefix}${system.suffix}.docx`;
              const url = `/api/proposal-document?folder=${encodeURIComponent(config.folder)}&file=${encodeURIComponent(fileName)}`;
              const response = await fetch(url, { cache: "no-store" });
              if (!response.ok) {
                throw new Error(
                  `Could not load ${fileName} (${response.status})`,
                );
              }
              const data = await response.json();
              documents.push({
                name: fileName,
                systemValue: system.value,
                systemLabel: system.label,
                content: data.content || "",
                sourcePath: `Database > Proposal Document > ${config.folder} > ${fileName}`,
              });
            }
            subtask.data.documents = documents;
          }
          subtask.data.loadedAt = new Date().toISOString();
          state.activeModal = { stageId, subtaskId };
          renderSubtaskModal();
          document.getElementById("subtaskModal").classList.add("active");
          renderDashboard();
          if (state.activeStageId) showStageDetail(state.activeStageId);
        } catch (error) {
          alert(`Could not get linked proposal documents: ${error.message}`);
        }
      }

      function setProposalDocumentContent(stageId, subtaskId, index, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (
          !subtask ||
          !subtask.data.documents ||
          !subtask.data.documents[index]
        )
          return;
        subtask.data.documents[index].content = value;
      }

      function sanitizeFolderName(value) {
        return (
          String(value || "Project")
            .replace(/[<>:"/\\|?*]/g, "-")
            .replace(/\s+/g, " ")
            .trim() || "Project"
        );
      }

      function proposalDocumentToHtml(project, subtask, documentItem) {
        return `<!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(documentItem.name)}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.5; padding: 32px; color: #111827; }
          h1 { font-size: 22px; }
          pre { white-space: pre-wrap; font-family: inherit; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(documentItem.name)}</h1>
        <p><strong>Project:</strong> ${escapeHtml(project.name)}</p>
        <p><strong>Source:</strong> ${escapeHtml(documentItem.sourcePath || subtask.name)}</p>
        <pre>${escapeHtml(documentItem.content || "")}</pre>
      </body>
      </html>`;
      }

      async function saveProposalDocuments(stageId, subtaskId) {
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        const config = getProposalDocumentTaskConfig(subtaskId);
        if (!project || !subtask || !config) return;
        if (config.viewOnly) {
          alert("Company Profile is view only.");
          return;
        }
        const documents = subtask.data.documents || [];
        if (!documents.length) {
          alert("Use Get before saving proposal documents.");
          return;
        }
        try {
          const response = await fetch("/api/projects/save-proposal-docs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              project_name: project.name,
              subtask_name: subtask.name,
              source_folder: config.folder,
              documents: documents.map((d) => ({
                name: d.name,
                content: d.content || "",
                systemValue: d.systemValue || null,
                systemLabel: d.systemLabel || null,
              })),
            }),
          });
          if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || `HTTP ${response.status}`);
          }
          const result = await response.json();
          subtask.data.savedAt = result.savedAt || new Date().toISOString();
          subtask.data.savedPath = result.path || "";
          persistAppStateSoon();
          renderSubtaskModal();
          renderDatabase();
          renderDashboard();
          if (state.activeStageId) showStageDetail(state.activeStageId);
          alert(
            `Proposal documents saved in ${result.path || "Database > Projects > " + project.name + " > Proposal Docs"}.`,
          );
        } catch (error) {
          alert(`Could not save proposal documents: ${error.message}`);
        }
      }

      function toggleRepeaterEmployeeSelection(
        stageId,
        subtaskId,
        listKey,
        index,
        key,
        employeeId,
      ) {
        const subtask = getSubtask(stageId, subtaskId);
        if (
          !subtask ||
          !subtask.data[listKey] ||
          !subtask.data[listKey][index]
        ) {
          return;
        }
        const values = Array.isArray(subtask.data[listKey][index][key])
          ? subtask.data[listKey][index][key]
          : [];
        subtask.data[listKey][index][key] = values.includes(employeeId)
          ? values.filter((value) => value !== employeeId)
          : [...values, employeeId];
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function syncMomAndVisitReports() {
        const project = getCurrentProject();
        if (!project) return;
        const meetingSubtask = getMeetingSubtask(project);
        const visitSubtask = getVisitSubtask(project);
        const reportSubtask = getVisitReportSubtask(project);
        const stage = project.stages.find(
          (item) => item.id === "requirement-engineering",
        );
        const momSubtask = stage
          ? stage.subtasks.find((item) => item.id === "mom-submission")
          : null;

        if (meetingSubtask && momSubtask) {
          const meets = meetingSubtask.data.meets || [];
          const existingMoms = momSubtask.data.moms || [];
          momSubtask.data.moms = meets.map(
            (_, index) => existingMoms[index] || clone(MOM_DATA_TEMPLATE),
          );
        }

        if (visitSubtask && reportSubtask) {
          const visits = visitSubtask.data.visits || [];
          const existingReports = reportSubtask.data.reports || [];
          reportSubtask.data.reports = visits.map(
            (_, index) =>
              existingReports[index] || {
                visitReportText: SITE_VISIT_TEMPLATE,
              },
          );
        }
      }

      function hasMeaningfulText(value, template) {
        const text = (value || "").trim();
        return text && text !== template.trim();
      }

      function canCompleteSubtask(stageId, subtaskId, silent) {
        syncMomAndVisitReports();
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        if (!project || !subtask) return false;

        const meetingSubtask = getMeetingSubtask(project);
        const reportSubtask = getVisitReportSubtask(project);
        const stage = getStage(stageId);
        const momSubtask = stage
          ? stage.subtasks.find((item) => item.id === "mom-submission")
          : null;

        if (subtaskId === "meetings" || subtaskId === "mom-submission") {
          const moms = momSubtask ? momSubtask.data.moms || [] : [];
          const allMomsDone =
            moms.length &&
            moms.every((mom) => (mom.meetingDate || "").trim() !== "");
          if (!allMomsDone) {
            if (!silent) {
              alert("Write MOM for every meeting before completing this task.");
            }
            return false;
          }
        }

        if (subtaskId === "site-visits" || subtaskId === "visit-report") {
          const reports = reportSubtask ? reportSubtask.data.reports || [] : [];
          const allReportsDone =
            reports.length &&
            reports.every((report) =>
              hasMeaningfulText(report.visitReportText, SITE_VISIT_TEMPLATE),
            );
          if (!allReportsDone) {
            if (!silent) {
              alert(
                "Write visit reports for every visit before completing this task.",
              );
            }
            return false;
          }
        }

        return true;
      }

      function handleTaskFile(event, stageId, subtaskId, key) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        const files = Array.from(event.target.files || []);
        subtask.data[key] = files.map((file) => file.name);
        // read file data URIs for attachments (pdfs)
        const dataKey = `${key}_data`;
        subtask.data[dataKey] = [];
        files.forEach((file, idx) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            subtask.data[dataKey][idx] = e.target.result;
            persistAppStateSoon();
            renderSubtaskModal();
          };
          reader.readAsDataURL(file);
        });
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function handleRepeaterFile(
        event,
        stageId,
        subtaskId,
        listKey,
        index,
        key,
      ) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        const files = Array.from(event.target.files || []);
        subtask.data[listKey][index][key] = files.map((f) => f.name);
        const dataKey = `${key}_data`;
        subtask.data[listKey][index][dataKey] = [];
        files.forEach((file, i) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            subtask.data[listKey][index][dataKey][i] = e.target.result;
            persistAppStateSoon();
            renderSubtaskModal();
          };
          reader.readAsDataURL(file);
        });
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function submitDocumentAttachment(stageId, subtaskId, documentKey) {
        const subtask = getSubtask(stageId, subtaskId);
        const project = getCurrentProject();
        if (!subtask || !project) return;
        const attachKey = `attach_${documentKey}`;
        const dataKey = `${attachKey}_data`;
        const filesData = subtask.data[dataKey] || [];
        if (!filesData.length) {
          alert("Select a file to attach first.");
          return;
        }
        if (!project.databaseItems) project.databaseItems = [];
        const originalName =
          subtask.data[attachKey] && subtask.data[attachKey][0]
            ? subtask.data[attachKey][0]
            : "";
        const ext =
          originalName && originalName.includes(".")
            ? originalName.slice(originalName.lastIndexOf("."))
            : ".pdf";
        const pdfRecord = {
          name: `${documentKey} Attachment ${new Date().toISOString()}${ext}`,
          subtaskId: subtaskId,
          pdfKind: documentKey,
          dataUri: filesData[0],
          originalName,
          savedAt: new Date().toISOString(),
          storagePath: `Projects > ${project.name} > Attachments`,
        };
        project.databaseItems.push(pdfRecord);
        if (!subtask.data.documentStatus) subtask.data.documentStatus = {};
        subtask.data.documentStatus[documentKey] =
          subtask.data.documentStatus[documentKey] || {};
        subtask.data.documentStatus[documentKey].submitted = true;
        subtask.data.documentStatus[documentKey].savedAt = pdfRecord.savedAt;
        subtask.data.documentStatus[documentKey].databaseIndex =
          project.databaseItems.length - 1;
        persistAppStateSoon();
        alert(`${documentKey} attached and saved to project database.`);
        renderSubtaskModal();
        renderDashboard();
      }

      function handleRequestAttach(event, projectId, subtaskId, documentKey) {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          const project = state.projects.find((p) => p.id === projectId);
          if (!project) return alert("Project not found");
          if (!project.databaseItems) project.databaseItems = [];
          const file = files[0];
          const ext =
            file && file.name && file.name.includes(".")
              ? file.name.slice(file.name.lastIndexOf("."))
              : ".pdf";
          const pdfRecord = {
            name: `${documentKey} Attachment ${new Date().toISOString()}${ext}`,
            subtaskId,
            pdfKind: documentKey,
            dataUri: e.target.result,
            originalName: file ? file.name : "",
            savedAt: new Date().toISOString(),
            storagePath: `Projects > ${project.name} > Attachments`,
          };
          project.databaseItems.push(pdfRecord);
          // mark corresponding subtask as submitted if present
          const stage = project.stages.find(
            (s) => s.id === "requirement-engineering",
          );
          if (stage) {
            const subtask = stage.subtasks.find((t) => t.id === subtaskId);
            if (subtask) {
              if (!subtask.data.documentStatus)
                subtask.data.documentStatus = {};
              subtask.data.documentStatus[documentKey] =
                subtask.data.documentStatus[documentKey] || {};
              subtask.data.documentStatus[documentKey].submitted = true;
              subtask.data.documentStatus[documentKey].savedAt =
                pdfRecord.savedAt;
              subtask.data.documentStatus[documentKey].databaseIndex =
                project.databaseItems.length - 1;
            }
          }
          persistAppStateSoon();
          alert(`${documentKey} attached and saved to project database.`);
          renderDashboard();
        };
        reader.readAsDataURL(files[0]);
      }

      function viewCalculationOutput(projectId, subtaskId, index, kind) {
        const project = state.projects.find((p) => p.id === projectId);
        if (!project) return alert("Project not found");
        const stage = project.stages.find(
          (s) => s.id === "requirement-engineering",
        );
        if (!stage) return alert("Design stage not found");
        const subtask = stage.subtasks.find((t) => t.id === subtaskId);
        if (!subtask) return alert("Design task not found");
        const outputs = subtask.data.calculationOutputs || [];
        const output = outputs[index];
        if (!output) return alert("Calculation output not found");
        const uri =
          kind === "calculation" ? output.pdfDataUri : output.boqPdfDataUri;
        if (!uri) return alert("PDF not available for this output.");
        const w = window.open("about:blank");
        if (!w) return alert("Unable to open window");
        w.document.write(
          `<iframe src="${uri}" style="width:100%;height:100%;border:0"></iframe>`,
        );
      }

      function openStoredDatabaseItem(projectId, index) {
        const project = state.projects.find((p) => p.id === projectId);
        if (
          !project ||
          !project.databaseItems ||
          !project.databaseItems[index]
        ) {
          return alert("Database item not found.");
        }
        const item = project.databaseItems[index];
        const w = window.open("about:blank");
        if (!w) return alert("Unable to open window");
        if (item.dataUri) {
          w.document.write(
            `<iframe src="${escapeAttr(item.dataUri)}" style="width:100%;height:100%;border:0"></iframe>`,
          );
          return;
        }
        if (item.htmlContent) {
          w.document.write(item.htmlContent);
          return;
        }
        if (item.textContent) {
          w.document.write(
            `<!doctype html><html><head><title>${escapeHtml(item.name || "Database Item")}</title><style>body{font-family:Arial,sans-serif;line-height:1.5;padding:32px;color:#111827}pre{white-space:pre-wrap;font-family:inherit}</style></head><body><h1>${escapeHtml(item.name || "Database Item")}</h1><pre>${escapeHtml(item.textContent)}</pre></body></html>`,
          );
          return;
        }
        w.close();
        alert("No viewable content is stored for this item.");
      }

      function acceptSiteVisitReport(projectId) {
        const project = state.projects.find((p) => p.id === projectId);
        if (!project) return alert("Project not found");
        const req = (project.requests || []).find(
          (r) => r.type === "site-visit-report" && r.status === "pending",
        );
        if (!req) return alert("Request not found");
        req.status = "accepted";
        // update any linked report status in subtasks
        project.stages.forEach((stage) => {
          stage.subtasks &&
            stage.subtasks.forEach((t) => {
              if (t.id === "visit-report") {
                (t.data.reports || []).forEach((report) => {
                  if (report.reportSaved) report.reportStatus = "accepted";
                });
              }
            });
        });
        persistAppStateSoon();
        renderDashboard();
        alert("Site visit report accepted.");
      }

      function declineSiteVisitReport(projectId, pdfIndices) {
        const project = state.projects.find((p) => p.id === projectId);
        if (!project) return alert("Project not found");
        const reqIndex = (project.requests || []).findIndex(
          (r) => r.type === "site-visit-report" && r.status === "pending",
        );
        if (reqIndex === -1) return alert("Request not found");
        // delete saved pdfs/texts in reverse order to avoid index shifting
        if (project.databaseItems && pdfIndices && Array.isArray(pdfIndices)) {
          pdfIndices
            .sort((a, b) => b - a)
            .forEach((idx) => {
              if (project.databaseItems[idx]) {
                project.databaseItems.splice(idx, 1);
              }
            });
        }
        project.requests[reqIndex].status = "resubmit";
        // mark report as needing resubmit
        project.stages.forEach((stage) => {
          stage.subtasks &&
            stage.subtasks.forEach((t) => {
              if (t.id === "visit-report") {
                (t.data.reports || []).forEach((report) => {
                  report.reportSaved = false;
                  report.reportStatus = "resubmit";
                  delete report.expensesDatabaseIndex;
                  delete report.attachmentDatabaseIndex;
                });
              }
            });
        });
        persistAppStateSoon();
        renderDashboard();
        alert("Site visit report declined. Please re-upload.");
      }

      function markFundRequestPaid(projectId, requestIndex) {
        const project = state.projects.find((p) => p.id === projectId);
        if (!project) return alert("Project not found");
        const req = project.requests && project.requests[requestIndex];
        if (!req || req.type !== "fund-request")
          return alert("Request not found");
        req.status = "paid";
        // mark corresponding visit as fund paid
        const stage = project.stages.find(
          (s) => s.id === "requirement-engineering",
        );
        if (stage) {
          const visitTask = stage.subtasks.find((t) => t.id === "site-visits");
          if (visitTask) {
            (visitTask.data.visits || []).forEach((visit) => {
              if (
                visit.requestFundAmount &&
                visit.requestFundAmount === req.amount &&
                visit.visitDate === req.visitDate
              ) {
                visit.fundStatus = "paid";
              }
            });
          }
        }
        persistAppStateSoon();
        renderDashboard();
        alert("Fund request marked as paid.");
      }

      // ── MOM helpers ────────────────────────────────────────────────────

      function setMomField(stageId, subtaskId, momIndex, key, value) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data.moms[momIndex][key] = value;
        persistAppStateSoon();
      }

      function setMomNestedField(
        stageId,
        subtaskId,
        momIndex,
        listKey,
        itemIndex,
        key,
        value,
      ) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data.moms[momIndex][listKey][itemIndex][key] = value;
        persistAppStateSoon();
      }

      function addMomNestedItem(stageId, subtaskId, momIndex, listKey) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        const templates = {
          attendees: { name: "", organization: "", role: "" },
          discussions: { point: "", summary: "" },
          actions: {
            point: "",
            action: "",
            responsibility: "",
            targetDate: "",
          },
          remarks: { text: "" },
        };
        if (!subtask.data.moms[momIndex][listKey])
          subtask.data.moms[momIndex][listKey] = [];
        subtask.data.moms[momIndex][listKey].push(
          clone(templates[listKey] || {}),
        );
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function removeMomNestedItem(
        stageId,
        subtaskId,
        momIndex,
        listKey,
        itemIndex,
      ) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data.moms[momIndex][listKey].splice(itemIndex, 1);
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function generateMomHtmlUri(mom, project) {
        const esc = (v) =>
          String(v || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        const enquiry = (project && project.enquiry) || {};
        const clientName =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName || ""
            : enquiry.companyName || "";

        const attendeesRows = (mom.attendees || [])
          .map(
            (a) =>
              `<tr><td>${esc(a.name)}</td><td>${esc(a.organization)}</td><td>${esc(a.role)}</td></tr>`,
          )
          .join("");

        const discussionRows = (mom.discussions || [])
          .map(
            (d, i) =>
              `<tr><td>${i + 1}</td><td>${esc(d.point)}</td><td>${esc(d.summary)}</td></tr>`,
          )
          .join("");

        const actionRows = (mom.actions || [])
          .map(
            (a, i) =>
              `<tr><td>${i + 1}</td><td>${esc(a.point)}</td><td>${esc(a.action)}</td><td>${esc(a.responsibility)}</td><td>${esc(a.targetDate)}</td></tr>`,
          )
          .join("");

        const remarksRows = (mom.remarks || [])
          .map((r) => `<li>${esc(r.text)}</li>`)
          .join("");

        const html = MOM_HTML_TEMPLATE.replace("{{logoUrl}}", "")
          .replace("{{momNo}}", esc(mom.momNo))
          .replace("{{meetingDate}}", esc(mom.meetingDate))
          .replace("{{submissionDate}}", esc(mom.submissionDate))
          .replace("{{projectRef}}", esc(mom.projectRef))
          .replace("{{projectName}}", esc(project ? project.name : ""))
          .replace("{{clientName}}", esc(clientName))
          .replace("{{location}}", esc(enquiry.location || enquiry.city || ""))
          .replace("{{meetingType}}", esc(mom.meetingType))
          .replace("{{conductedBy}}", esc(mom.conductedBy))
          .replace("{{clientTeam}}", esc(mom.clientTeam))
          .replace("{{venue}}", esc(mom.venue))
          .replace("{{duration}}", esc(mom.duration))
          .replace("{{startTime}}", esc(mom.startTime))
          .replace("{{endTime}}", esc(mom.endTime))
          .replace("{{attendeesRows}}", attendeesRows)
          .replace("{{discussionRows}}", discussionRows)
          .replace("{{actionRows}}", actionRows)
          .replace("{{remarksRows}}", remarksRows)
          .replace("{{nextMeetingDate}}", esc(mom.nextMeetingDate))
          .replace("{{nextMeetingTime}}", esc(mom.nextMeetingTime))
          .replace("{{nextMeetingVenue}}", esc(mom.nextMeetingVenue))
          .replace("{{preparedByName}}", esc(mom.preparedByName))
          .replace("{{preparedByDesignation}}", esc(mom.preparedByDesignation))
          .replace("{{preparedByCompany}}", esc(mom.preparedByCompany));

        return "data:text/html;charset=utf-8," + encodeURIComponent(html);
      }

      function openMomPdf(stageId, subtaskId, momIndex) {
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        const mom = (subtask.data.moms || [])[momIndex];
        if (!mom) return;
        const uri = generateMomHtmlUri(mom, project);
        document.getElementById("utilityModalTitle").textContent =
          `MOM ${momIndex + 1}${mom.meetingDate ? " — " + mom.meetingDate : ""}`;
        document.getElementById("utilityModalBody").innerHTML = `
          <iframe class="pdf-viewer-frame" src="${escapeAttr(uri)}"></iframe>
        `;
        document.getElementById("utilityModal").classList.add("active");
      }

      // ── End MOM helpers ────────────────────────────────────────────────

      // ── Design Report helpers ──────────────────────────────────────────

      function makeRow3(p, u, v) {
        const esc = (s) =>
          String(s || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return `<tr><td>${esc(p)}</td><td>${esc(u)}</td><td>${esc(v)}</td></tr>`;
      }

      function parseLabelValue(text) {
        // "123.45 unit" or "123.45" or "some text"
        const m = String(text || "").match(/^([\d.,]+)\s*(.*)$/);
        if (m) return { value: m[1], unit: m[2].trim() };
        return { value: text, unit: "" };
      }

      function generateDesignReportHtmlUri(structured, project) {
        const esc = (v) =>
          String(v || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        const enquiry = (project && project.enquiry) || {};
        const clientName =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName || ""
            : enquiry.companyName || "";

        // --- Pull rows from structured.calculationSections ---
        const sections = (structured && structured.calculationSections) || [];
        const inputSections = sections.filter((s) => /input/i.test(s.title));
        const resultSections = sections.filter((s) => !/input/i.test(s.title));

        function splitNameUnit(label, value) {
          const labelText = String(label || "").trim();
          const valueText = String(value || "").trim();
          const labelMatch = labelText.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
          if (labelMatch) {
            return {
              name: labelMatch[1].trim(),
              unit: labelMatch[2].trim(),
              value: valueText,
            };
          }
          const parsed = parseLabelValue(valueText);
          return {
            name: labelText,
            unit: parsed.unit,
            value: parsed.value,
          };
        }

        function normalizeReportTitle(title, fallback) {
          return String(title || fallback || "")
            .replace(/\s+Inputs$/i, "")
            .trim();
        }

        function buildReportRows(section) {
          const rows = (section.rows || []).filter((row) =>
            String((row && row[0]) || "").trim(),
          );
          if (!rows.length)
            return `<tr><td colspan="3" class="no-data">No data available</td></tr>`;
          return rows
            .map(([label, value]) => {
              const item = splitNameUnit(label, value);
              return makeRow3(item.name, item.unit, item.value);
            })
            .join("");
        }

        function buildReportSection(section, sectionNumber, groupTitle) {
          const title = normalizeReportTitle(section.title, groupTitle);
          return `
            <div class="section">
              <div class="section-header">
                <div class="section-number">${sectionNumber}</div>
                <div>
                  <div class="section-title">${esc(title)}</div>
                  <div class="section-subtitle">${esc(groupTitle)}</div>
                </div>
              </div>
              <div class="box"><table><thead><tr><th>Parameter</th><th>Unit</th><th>Value</th></tr></thead><tbody>${buildReportRows(section)}</tbody></table></div>
            </div>`;
        }

        /*
        // --- Section 1: Basic Input Parameters ---
        const basicParams = [
          [
            "Working Time",
            "hr/day",
            allInputs["Working Time"] ||
              allInputs["Working Time (hours)"] ||
              "",
          ],
          [
            "Flow Rate",
            "m³/hr",
            allInputs["Flow Rate"] || allInputs["Flow Rate (Q)"] || "",
          ],
          [
            "System Capacity",
            "kg/hr",
            allInputs["System Capacity"] ||
              allInputs["System Capacity (Chlorine Dose)"] ||
              "",
          ],
          ["Chlorine Dose", "mg/L", allInputs["Chlorine Dose"] || ""],
          [
            "Tonner/Cylinder Requirement",
            "nos",
            allInputs["Tonner/Cylinder Requirement"] ||
              allInputs["Tonner/Cylinder"] ||
              "",
          ],
          [
            "No. of Dosing Points",
            "nos",
            allInputs["No. of Dosing Points"] ||
              allInputs["Number of Dosing Points"] ||
              "",
          ],
        ];
        const basicInputRows = basicParams
          .map(([p, u, v]) => makeRow3(p, u, v))
          .join("");

        // --- Section 2: Velocity Parameters ---
        const velParams = [
          [
            "Input Vacuum Velocity",
            "m/s",
            allInputs["Input Vacuum Velocity"] ||
              allInputs["Vacuum Velocity"] ||
              "",
          ],
          [
            "Input Gas Velocity",
            "m/s",
            allInputs["Input Gas Velocity"] || allInputs["Gas Velocity"] || "",
          ],
          [
            "Input Suction Velocity",
            "m/s",
            allInputs["Input Suction Velocity"] ||
              allInputs["Suction Velocity"] ||
              "",
          ],
          [
            "Input Discharge Velocity",
            "m/s",
            allInputs["Input Discharge Velocity"] ||
              allInputs["Discharge Velocity"] ||
              "",
          ],
          [
            "Input Solution Velocity",
            "m/s",
            allInputs["Input Solution Velocity"] ||
              allInputs["Solution Velocity"] ||
              "",
          ],
        ];
        const velocityRows = velParams
          .map(([p, u, v]) => makeRow3(p, u, v))
          .join("");

        // --- Section 3: Suction Line ---
        const suctionParams = [
          ["Absolute Roughness", "mm", allInputs["Absolute Roughness"] || ""],
          [
            "Pipe Line Length",
            "m",
            allInputs["Pipe Line Length"] || allInputs["Suction Length"] || "",
          ],
          ["P Suction", "bar", allInputs["P Suction"] || ""],
          ["Z Suction Surface", "m", allInputs["Z Suction Surface"] || ""],
          [
            "Z Suction Centerline",
            "m",
            allInputs["Z Suction Centerline"] || "",
          ],
        ];
        const suctionLineRows = suctionParams
          .map(([p, u, v]) => makeRow3(p, u, v))
          .join("");

        // --- Section 4: Discharge Line ---
        const dischargeParams = [
          ["Absolute Roughness", "mm", allInputs["Absolute Roughness"] || ""],
          [
            "Pipe Line Length",
            "m",
            allInputs["Pipe Line Length"] ||
              allInputs["Discharge Length"] ||
              "",
          ],
          ["P Discharge", "bar", allInputs["P Discharge"] || ""],
          ["Z Discharge Surface", "m", allInputs["Z Discharge Surface"] || ""],
          [
            "Z Discharge Centerline",
            "m",
            allInputs["Z Discharge Centerline"] || "",
          ],
        ];
        const dischargeLineRows = dischargeParams
          .map(([p, u, v]) => makeRow3(p, u, v))
          .join("");

        // --- Section 5: Injector Parameters ---
        const injectorParams = [
          ["P Injector Loss", "bar", allInputs["P Injector Loss"] || ""],
        ];
        const injectorRows = injectorParams
          .map(([p, u, v]) => makeRow3(p, u, v))
          .join("");

        // --- Sections 6 & 7: Fittings (from inputs) ---
        function buildFittingsRows(prefix) {
          const fittingKeys = Object.keys(allInputs).filter(
            (k) =>
              new RegExp(prefix, "i").test(k) &&
              /elbow|tee|gate|ball|manifold|globe|swing|butterfly|diaphragm|nrv|flow|union|connector|coupling|reducer/i.test(
                k,
              ),
          );
          if (!fittingKeys.length)
            return `<tr><td colspan="4" style="text-align:center;font-style:italic;color:#666">No fitting data available</td></tr>`;
          const rows = [];
          for (let i = 0; i < fittingKeys.length; i += 2) {
            const k1 = fittingKeys[i],
              k2 = fittingKeys[i + 1];
            rows.push(
              `<tr><td>${esc(k1)}</td><td>${esc(allInputs[k1])}</td><td>${esc(k2 || "")}</td><td>${esc(k2 ? allInputs[k2] : "")}</td></tr>`,
            );
          }
          return rows.join("");
        }
        const suctionFittingsRows = buildFittingsRows("suction");
        const dischargeFittingsRows = buildFittingsRows("discharge");

        // --- Section 8: BOQ Configuration (USER INPUTS) ---
        // These come from the BOQ section inputs in the calculator:
        // workingSystem, standbySystem, csGasLineLength, upvcGasLineLength, solutionLineClientScope
        const boqParams = [
          [
            "No of Working System",
            "nos",
            allInputs["No of Working System"] || "",
          ],
          [
            "No of Standby System",
            "nos",
            allInputs["No of Standby System"] || "",
          ],
          ["CS Gas Line Length", "m", allInputs["CS Gas Line Length"] || ""],
          [
            "UPVC Gas Line Length",
            "m",
            allInputs["UPVC Gas Line Length"] || "",
          ],
          [
            "Solution Line Length (Client Scope)",
            "m",
            allInputs["Solution Line Length (Client Scope)"] || "",
          ],
        ];
        let boqRows = boqParams.map(([p, u, v]) => makeRow3(p, u, v)).join("");
        if (!boqRows)
          boqRows = `<tr><td colspan="3" class="no-data">BOQ configuration not available</td></tr>`;

        // --- Section 9: Calculation Constants ---
        const constSection = inputSections.find((s) =>
          /constant/i.test(s.title),
        );
        let calculationConstantsRows = "";
        if (constSection) {
          const rows = constSection.rows || [];
          for (let i = 0; i < rows.length; i += 2) {
            const [p1, v1] = rows[i] || [];
            const [p2, v2] = rows[i + 1] || [];
            const pv1 = parseLabelValue(v1);
            const pv2 = parseLabelValue(v2);
            calculationConstantsRows += `<tr>
              <td>${esc(p1 || "")}</td><td>${esc(pv1.unit)}</td><td>${esc(pv1.value)}</td>
              <td>${esc(p2 || "")}</td><td>${esc(pv2.unit)}</td><td>${esc(pv2.value)}</td>
            </tr>`;
          }
        }
        if (!calculationConstantsRows) {
          const constantParams = [
            ["Molecular Weight", "g/mol", allInputs["Molecular Weight"] || ""],
            ["Ambient Temp", "°C", allInputs["Ambient Temp"] || ""],
            ["Pressure Gauge", "bar(g)", allInputs["Pressure Gauge"] || ""],
            ["PG Gas Line", "bar(g)", allInputs["PG Gas Line"] || ""],
            ["Temp Gas Line", "°C", allInputs["Temp Gas Line"] || ""],
          ];
          for (let i = 0; i < constantParams.length; i += 2) {
            const [p1, u1, v1] = constantParams[i] || [];
            const [p2, u2, v2] = constantParams[i + 1] || [];
            calculationConstantsRows += `<tr><td>${esc(p1 || "")}</td><td>${esc(u1)}</td><td>${esc(v1)}</td><td>${esc(p2 || "")}</td><td>${esc(u2)}</td><td>${esc(v2)}</td></tr>`;
          }
        }

        // --- Section 10: Dosing Configuration ---
        const dosingSection = inputSections.find((s) =>
          /dosing/i.test(s.title),
        );
        let dosingConfigRows = "";
        if (dosingSection) {
          dosingConfigRows = `<div class="box"><table><thead><tr><th>Parameter</th><th>Unit</th><th>Value</th></tr></thead><tbody>`;
          (dosingSection.rows || []).forEach(([p, v]) => {
            const pv = parseLabelValue(v);
            dosingConfigRows += makeRow3(p, pv.unit, pv.value);
          });
          dosingConfigRows += `</tbody></table></div>`;
        } else {
          const noOfPoints =
            parseInt(
              allInputs["No. of Dosing Points"] ||
                allInputs["Number of Dosing Points"] ||
                "1",
              10,
            ) || 1;
          dosingConfigRows = `<div class="box"><p style="padding:20px;text-align:center;color:#666;font-style:italic">Dosing configuration data from calculation inputs</p></div>`;
        }

        // --- Section 11: Hydraulic Calculation RESULTS ---
        const hydraulicResults = (results && results.rows) || [];
        let hydraulicResultsRows = "";
        for (let i = 0; i < hydraulicResults.length; i += 2) {
          const [p1, v1] = hydraulicResults[i] || [];
          const [p2, v2] = hydraulicResults[i + 1] || [];
          const pv1 = parseLabelValue(v1);
          const pv2 = parseLabelValue(v2);
          hydraulicResultsRows += `<tr>
            <td>${esc(p1 || "")}</td><td>${esc(pv1.unit)}</td><td>${esc(pv1.value)}</td>
            <td>${esc(p2 || "")}</td><td>${esc(pv2.unit)}</td><td>${esc(pv2.value)}</td>
          </tr>`;
        }
        if (!hydraulicResultsRows)
          hydraulicResultsRows = `<tr><td colspan="6" class="no-data">No calculation result data available</td></tr>`;

        // --- Section 12: Diffuser Design Summary (RESULTS) ---
        let diffuserDesignRows = "";
        if (diffuserSections.length) {
          diffuserDesignRows = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px">`;
          diffuserSections.forEach((sec) => {
            diffuserDesignRows += `<div class="diffuser-card"><div class="diffuser-title">${esc(sec.title)}</div><table><thead><tr><th>Parameter</th><th>Value</th></tr></thead><tbody>`;
            (sec.rows || []).forEach(([p, v]) => {
              diffuserDesignRows += `<tr><td>${esc(p)}</td><td>${esc(v)}</td></tr>`;
            });
            diffuserDesignRows += `</tbody></table></div>`;
          });
          diffuserDesignRows += `</div>`;
        } else {
          diffuserDesignRows = `<div class="box"><p class="no-data">Diffuser calculation data not available</p></div>`;
        }

        // --- Section 13: Remarks ---
        const remarks = [
          "All calculations are based on input data provided and standard design constants.",
          "All pipe sizes are calculated nominal sizes; final selection subject to available commercial sizes.",
          "Velocities are within recommended limits for chlorination systems.",
          "NPSH available should be verified against pump NPSH required during pump selection.",
        ];
        const remarksRows = remarks.map((r) => `<li>${esc(r)}</li>`).join("");
        */

        let sectionNumber = 1;
        let reportSections = "";
        inputSections.forEach((section) => {
          reportSections += buildReportSection(
            section,
            sectionNumber++,
            "Calculation Inputs - Entered by User",
          );
        });
        resultSections.forEach((section) => {
          reportSections += buildReportSection(
            section,
            sectionNumber++,
            "Calculated Results",
          );
        });
        if (!reportSections) {
          reportSections = `<div class="section"><div class="box"><p class="no-data">No calculation data available</p></div></div>`;
        }

        // Build report number and date
        const reportNo =
          "DC-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-4);
        const dateStr = new Date().toLocaleDateString("en-IN");

        const html = DESIGN_REPORT_HTML_TEMPLATE.replace("{{logoUrl}}", "")
          .replace(
            "{{reportTitle}}",
            "GAS CHLORINATION SYSTEM — DESIGN CALCULATION REPORT",
          )
          .replace("{{reportNo}}", reportNo)
          .replace("{{revisionNo}}", "Rev 00")
          .replace("{{date}}", dateStr)
          .replace(
            "{{projectRef}}",
            esc(enquiry.requirement || enquiry.companyName || "--"),
          )
          .replace("{{project}}", esc(project ? project.name : "--"))
          .replace("{{client}}", esc(clientName || "--"))
          .replace(
            "{{location}}",
            esc(enquiry.location || enquiry.city || "--"),
          )
          .replace("{{systemType}}", "Gas Chlorination System")
          .replace("{{reportSections}}", reportSections);

        return "data:text/html;charset=utf-8," + encodeURIComponent(html);
      }

      function openDesignReportPdf(structured, project) {
        const uri = generateDesignReportHtmlUri(structured, project);
        document.getElementById("utilityModalTitle").textContent =
          "Design Calculation Report";
        document.getElementById("utilityModalBody").innerHTML = `
          <div class="action-buttons" style="margin-bottom:10px">
            <button class="btn btn-primary" type="button" onclick="saveDesignReportPdf()">Save Report to Database</button>
            <button class="btn btn-secondary" type="button" onclick="closeUtilityModal()">Close</button>
          </div>
          <iframe class="pdf-viewer-frame" src="${uri}" id="designReportFrame"></iframe>
        `;
        document.getElementById("utilityModal").classList.add("active");
      }

      async function saveDesignReportPdf() {
        const project = getCurrentProject();
        if (!project) return alert("No active project.");
        // find the latest gas-chlorination structured output
        let structured = null;
        let subtaskRef = null;
        (project.stages || []).forEach((stage) => {
          (stage.subtasks || []).forEach((task) => {
            if (String(task.id || "").startsWith("design-calculation")) {
              (task.data.calculationOutputs || []).forEach((out) => {
                if (
                  out.structured &&
                  out.structured.format === "gas-chlorination"
                ) {
                  structured = out.structured;
                  subtaskRef = task;
                }
              });
            }
          });
        });
        if (!structured)
          return alert(
            "No Gas Chlorination calculation output found. Save calculation output first.",
          );
        const savedAt = new Date().toISOString();
        const fileName = `Design Report - ${project.name} - ${new Date().toLocaleDateString("en-IN")}.html`;
        const htmlUri = generateDesignReportHtmlUri(structured, project);
        const backendResult = await saveProjectDocumentToBackend({
          project_id: project.id,
          project_name: project.name,
          subtask_id: subtaskRef ? subtaskRef.id : "design-calculation",
          subtask_name: subtaskRef ? subtaskRef.name : "Design Calculation",
          kind: "design-report",
          file_name: fileName,
          dataUri: htmlUri,
        });
        if (!project.databaseItems) project.databaseItems = [];
        const storagePath =
          backendResult &&
          backendResult.supabaseSaved &&
          backendResult.storagePath
            ? `Supabase Storage > ${backendResult.storagePath}`
            : `Browser State > Projects > ${project.name} > Design Reports`;
        project.databaseItems.push({
          name: fileName,
          subtaskId: subtaskRef ? subtaskRef.id : "design-calculation",
          pdfKind: "design-report",
          dataUri: htmlUri,
          savedAt,
          storagePath,
        });
        await persistAppState();
        renderDatabase();
        alert("Design Report saved to Database.");
      }

      // ── End Design Report helpers ──────────────────────────────────────

      function buildMomPdfText(mom, project, momIndex) {
        const enquiry = (project && project.enquiry) || {};
        const clientName =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName || ""
            : enquiry.companyName || "";
        const lines = [
          `MOM No.: ${mom.momNo || `MOM-${momIndex + 1}`}`,
          `Project: ${project ? project.name : ""}`,
          `Project Ref.: ${mom.projectRef || ""}`,
          `Client: ${clientName}`,
          `Location: ${enquiry.location || enquiry.city || ""}`,
          `Meeting Date: ${mom.meetingDate || ""}`,
          `Submission Date: ${mom.submissionDate || ""}`,
          "",
          "Meeting Information",
          `Type: ${mom.meetingType || ""}`,
          `Conducted By: ${mom.conductedBy || ""}`,
          `Client Team: ${mom.clientTeam || ""}`,
          `Venue: ${mom.venue || ""}`,
          `Duration: ${mom.duration || ""}`,
          `Time: ${mom.startTime || ""} to ${mom.endTime || ""}`,
          "",
          "Attendees",
          ...(mom.attendees || []).map(
            (item, index) =>
              `${index + 1}. ${item.name || ""} | ${item.organization || ""} | ${item.role || ""}`,
          ),
          "",
          "Discussion Summary",
          ...(mom.discussions || []).map(
            (item, index) =>
              `${index + 1}. ${item.point || ""}\n   ${item.summary || ""}`,
          ),
          "",
          "Decisions / Next Actions",
          ...(mom.actions || []).map(
            (item, index) =>
              `${index + 1}. ${item.point || ""}\n   Action: ${item.action || ""}\n   Responsibility: ${item.responsibility || ""}\n   Target Date: ${item.targetDate || ""}`,
          ),
          "",
          "Remarks",
          ...(mom.remarks || []).map(
            (item, index) => `${index + 1}. ${item.text || ""}`,
          ),
          "",
          "Next Meeting",
          `Date: ${mom.nextMeetingDate || ""}`,
          `Time: ${mom.nextMeetingTime || ""}`,
          `Venue: ${mom.nextMeetingVenue || ""}`,
          "",
          "Prepared By",
          `${mom.preparedByName || ""}`,
          `${mom.preparedByDesignation || ""}`,
          `${mom.preparedByCompany || ""}`,
        ];
        return lines.join("\n");
      }

      function createMomPdfDataUri(mom, project, momIndex) {
        const enquiry = (project && project.enquiry) || {};
        const clientName =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName || ""
            : enquiry.companyName || "";

        const pageWidth = 612;
        const pageHeight = 792;
        const margin = 30;
        const usableW = pageWidth - margin * 2;
        const bottom = 34;
        const pages = [[]];
        let y = pageHeight - margin;

        const cur = () => pages[pages.length - 1];
        const newPage = () => {
          pages.push([]);
          y = pageHeight - margin;
        };
        const need = (height) => {
          if (y - height < bottom) newPage();
        };
        const san = (value) =>
          String(value || "")
            .replace(/\r/g, "")
            .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");
        const esc = (value) =>
          san(value)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)");
        const fillRect = (x, ry, w, h, r, g, b) =>
          cur().push(`${r} ${g} ${b} rg ${x} ${ry} ${w} ${h} re f`);
        const strokeRect = (x, ry, w, h, r, g, b, lw) =>
          cur().push(`${lw} w ${r} ${g} ${b} RG ${x} ${ry} ${w} ${h} re S`);
        const strokeLine = (x1, y1, x2, y2, r, g, b, lw) =>
          cur().push(`${lw} w ${r} ${g} ${b} RG ${x1} ${y1} m ${x2} ${y2} l S`);
        const txt = (text, x, ty, size, bold, r, g, b) =>
          cur().push(
            `BT ${r} ${g} ${b} rg /${bold ? "F2" : "F1"} ${size} Tf ${x} ${ty} Td (${esc(text)}) Tj ET`,
          );
        const twid = (text, size) => san(text).length * size * 0.52;
        const wrap = (text, maxW, size) => {
          const words = san(text).split(/\s+/);
          const lines = [];
          let line = "";
          words.forEach((word) => {
            if (!word) return;
            const next = `${line} ${word}`.trim();
            if (line && twid(next, size) > maxW) {
              lines.push(line);
              line = word;
            } else {
              line = next;
            }
          });
          if (line) lines.push(line);
          return lines.length ? lines : [""];
        };

        const DB = [0.039, 0.184, 0.561];
        const LB = [0.961, 0.969, 0.984];
        const BD = [0.874, 0.902, 0.949];
        const MU = [0.443, 0.518, 0.733];
        const BK = [0.102, 0.102, 0.102];
        const WH = [1, 1, 1];
        const ALT = [0.976, 0.984, 0.996];

        const sectionTitle = (label) => {
          need(24);
          txt(label, margin + 8, y - 14, 10, true, ...DB);
          y -= 24;
        };

        const drawPanel = (items) => {
          const h = 48;
          need(h + 10);
          fillRect(margin, y - h, usableW, h, ...LB);
          strokeRect(margin, y - h, usableW, h, ...BD, 0.6);
          const colW = usableW / items.length;
          items.forEach((item, index) => {
            const x = margin + index * colW + 10;
            txt(item.label, x, y - 16, 6.8, true, ...MU);
            wrap(item.value, colW - 20, 8.5)
              .slice(0, 2)
              .forEach((line, lineIndex) =>
                txt(line, x, y - 31 - lineIndex * 10, 8.5, true, ...DB),
              );
          });
          y -= h + 12;
        };

        const drawInfoTable = (rows, x, topY, w) => {
          const rowH = 18;
          strokeRect(
            x,
            topY - rows.length * rowH,
            w,
            rows.length * rowH,
            ...BD,
            0.6,
          );
          rows.forEach((row, index) => {
            const ry = topY - index * rowH;
            if (index > 0) strokeLine(x, ry, x + w, ry, ...BD, 0.4);
            txt(row[0], x + 8, ry - 12, 8, false, ...BK);
            txt(":", x + w * 0.42, ry - 12, 8, false, ...BK);
            txt(row[1], x + w * 0.47, ry - 12, 8, false, ...BK);
          });
        };

        const drawTable = (headers, rows, widths, options) => {
          const headerH = 20;
          const fontSize = (options && options.fontSize) || 7.5;
          need(headerH + 20);
          fillRect(margin, y - headerH, usableW, headerH, ...DB);
          let x = margin;
          headers.forEach((header, index) => {
            txt(header, x + 4, y - 13, 7, true, ...WH);
            x += widths[index];
            if (x < margin + usableW)
              strokeLine(x, y, x, y - headerH, ...WH, 0.25);
          });
          y -= headerH;

          (rows.length ? rows : [headers.map(() => "")]).forEach(
            (row, rowIndex) => {
              const cells = row.map((cell, index) =>
                wrap(cell, widths[index] - 8, fontSize),
              );
              const rowH =
                Math.max(...cells.map((cell) => cell.length)) * 10 + 8;
              need(rowH + headerH + 4);
              if (rowIndex % 2 === 1)
                fillRect(margin, y - rowH, usableW, rowH, ...ALT);
              let cx = margin;
              cells.forEach((lines, cellIndex) => {
                lines.forEach((line, lineIndex) =>
                  txt(
                    line,
                    cx + 4,
                    y - 12 - lineIndex * 10,
                    fontSize,
                    false,
                    ...BK,
                  ),
                );
                cx += widths[cellIndex];
                if (cx < margin + usableW)
                  strokeLine(cx, y, cx, y - rowH, ...BD, 0.25);
              });
              strokeLine(
                margin,
                y - rowH,
                margin + usableW,
                y - rowH,
                ...BD,
                0.4,
              );
              y -= rowH;
            },
          );
          y -= 12;
        };

        txt("MINUTES OF MEETING", margin, y - 10, 22, true, ...DB);
        const topRows = [
          ["MOM No.", mom.momNo || `MOM-${momIndex + 1}`],
          ["Meeting Date", mom.meetingDate || ""],
          ["Submission Date", mom.submissionDate || ""],
          ["Project Ref.", mom.projectRef || ""],
        ];
        topRows.forEach((row, index) => {
          const ty = y - 8 - index * 14;
          txt(row[0], pageWidth - 205, ty, 8.2, false, ...BK);
          txt(":", pageWidth - 115, ty, 8.2, false, ...BK);
          txt(row[1], pageWidth - 104, ty, 8.2, true, ...BK);
        });
        y -= 62;
        fillRect(margin, y, usableW, 3, ...DB);
        y -= 14;

        drawPanel([
          { label: "PROJECT", value: project ? project.name : "" },
          { label: "CLIENT", value: clientName },
          { label: "LOCATION", value: enquiry.location || enquiry.city || "" },
        ]);

        const infoRows = [
          ["Meeting Type", mom.meetingType || ""],
          ["Conducted By", mom.conductedBy || ""],
          ["Client Team", mom.clientTeam || ""],
          ["Venue", mom.venue || ""],
          ["Duration", mom.duration || ""],
          ["Meeting Start Time", mom.startTime || ""],
          ["Meeting End Time", mom.endTime || ""],
        ];
        const infoH = infoRows.length * 18 + 28;
        need(infoH);
        const leftW = 250;
        const infoTop = y;
        txt("MEETING INFORMATION", margin + 8, infoTop - 12, 9, true, ...DB);
        drawInfoTable(infoRows, margin, infoTop - 24, leftW);
        const attendeeRows = (mom.attendees || []).map((item) => [
          item.name || "",
          item.organization || "",
          item.role || "",
        ]);
        const tableX = margin + leftW + 12;
        const tableW = usableW - leftW - 12;
        const attendeeWidths = [tableW * 0.34, tableW * 0.36, tableW * 0.3];
        txt("ATTENDEES", tableX + 8, infoTop - 12, 9, true, ...DB);
        y = infoTop - 24;
        fillRect(tableX, y - 20, tableW, 20, ...DB);
        let ax = tableX;
        ["Name", "Organization", "Role"].forEach((header, index) => {
          txt(header, ax + 4, y - 13, 7, true, ...WH);
          ax += attendeeWidths[index];
        });
        y -= 20;
        (attendeeRows.length ? attendeeRows : [["", "", ""]]).forEach(
          (row, rowIndex) => {
            const cells = row.map((cell, index) =>
              wrap(cell, attendeeWidths[index] - 8, 7.5),
            );
            const rowH = Math.max(...cells.map((cell) => cell.length)) * 10 + 8;
            if (rowIndex % 2 === 1)
              fillRect(tableX, y - rowH, tableW, rowH, ...ALT);
            let cx = tableX;
            cells.forEach((lines, cellIndex) => {
              lines.forEach((line, lineIndex) =>
                txt(line, cx + 4, y - 12 - lineIndex * 10, 7.5, false, ...BK),
              );
              cx += attendeeWidths[cellIndex];
              if (cx < tableX + tableW)
                strokeLine(cx, y, cx, y - rowH, ...BD, 0.25);
            });
            strokeLine(tableX, y - rowH, tableX + tableW, y - rowH, ...BD, 0.4);
            y -= rowH;
          },
        );
        y = Math.min(infoTop - 24 - infoRows.length * 18 - 12, y - 12);

        sectionTitle("DISCUSSION SUMMARY (What was Discussed)");
        drawTable(
          ["S.No", "Discussion Point", "Discussion Summary"],
          (mom.discussions || []).map((item, index) => [
            String(index + 1),
            item.point || "",
            item.summary || "",
          ]),
          [34, 150, usableW - 184],
          { fontSize: 7.5 },
        );

        sectionTitle("DECISIONS / NEXT ACTIONS (Who will do What & by When)");
        drawTable(
          [
            "S.No",
            "Discussion Point",
            "Next Action / Decision",
            "Responsibility",
            "Target Date",
          ],
          (mom.actions || []).map((item, index) => [
            String(index + 1),
            item.point || "",
            item.action || "",
            item.responsibility || "",
            item.targetDate || "",
          ]),
          [32, 120, 190, 96, usableW - 438],
          { fontSize: 7.1 },
        );

        sectionTitle("REMARKS");
        (mom.remarks || [{ text: "" }]).forEach((item, index) => {
          const lines = wrap(
            `${index + 1}. ${item.text || ""}`,
            usableW - 16,
            8,
          );
          const h = lines.length * 11 + 6;
          need(h);
          lines.forEach((line, lineIndex) =>
            txt(line, margin + 8, y - 10 - lineIndex * 11, 8, false, ...BK),
          );
          y -= h;
        });
        y -= 6;

        need(44);
        strokeRect(margin, y - 32, usableW, 32, ...BD, 0.6);
        txt("NEXT MEETING", margin + 10, y - 20, 8.5, true, ...DB);
        txt(
          `Date : ${mom.nextMeetingDate || ""}`,
          margin + 145,
          y - 20,
          8,
          false,
          ...BK,
        );
        txt(
          `Time : ${mom.nextMeetingTime || ""}`,
          margin + 275,
          y - 20,
          8,
          false,
          ...BK,
        );
        txt(
          `Venue : ${mom.nextMeetingVenue || ""}`,
          margin + 390,
          y - 20,
          8,
          false,
          ...BK,
        );
        y -= 50;

        need(64);
        txt("PREPARED BY", margin, y, 9, true, ...DB);
        y -= 34;
        strokeLine(margin, y, margin + 165, y, ...MU, 1.2);
        y -= 13;
        txt(mom.preparedByName || "", margin, y, 8.5, true, ...BK);
        y -= 11;
        txt(mom.preparedByDesignation || "", margin, y, 8, false, ...BK);
        y -= 11;
        txt(mom.preparedByCompany || "", margin, y, 8, false, ...BK);

        return createPdfFromPages(pages);
      }

      async function saveProjectDocumentToBackend(payload) {
        try {
          const response = await fetch("/api/project-documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error(await response.text());
          return response.json();
        } catch (error) {
          console.warn(
            "Project document was saved in browser state only.",
            error,
          );
          return { supabaseSaved: false, supabaseError: error.message };
        }
      }

      async function saveMomPdf(stageId, subtaskId, momIndex) {
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        if (!project || !subtask) return;
        const mom = (subtask.data.moms || [])[momIndex];
        if (!mom) return;
        const hasContent =
          (mom.meetingDate || "").trim() ||
          (mom.momNo || "").trim() ||
          (mom.discussions || []).some(
            (item) => (item.point || "").trim() || (item.summary || "").trim(),
          );
        if (!hasContent) {
          alert("Enter MOM details before saving PDF.");
          return;
        }

        const savedAt = new Date().toISOString();
        const title = `${project.name} - MOM ${momIndex + 1}`;
        const fileName = `MOM ${momIndex + 1}${mom.meetingDate ? " " + mom.meetingDate : ""}.pdf`;
        const dataUri = createMomPdfDataUri(mom, project, momIndex);
        const backendResult = await saveProjectDocumentToBackend({
          project_id: project.id,
          project_name: project.name,
          subtask_id: subtask.id,
          subtask_name: subtask.name,
          kind: "mom-report",
          file_name: fileName,
          dataUri,
        });

        if (!project.databaseItems) project.databaseItems = [];
        const storagePath =
          backendResult &&
          backendResult.supabaseSaved &&
          backendResult.storagePath
            ? `Supabase Storage > ${backendResult.storagePath}`
            : `Browser State > Projects > ${project.name} > MOM Reports`;
        const record = {
          name: fileName,
          subtaskId: subtask.id,
          pdfKind: "mom-report",
          dataUri,
          savedAt,
          storagePath,
        };
        if (
          mom.databaseIndex !== undefined &&
          project.databaseItems[mom.databaseIndex]
        ) {
          project.databaseItems[mom.databaseIndex] = {
            ...project.databaseItems[mom.databaseIndex],
            ...record,
          };
        } else {
          project.databaseItems.push(record);
          mom.databaseIndex = project.databaseItems.length - 1;
        }
        mom.savedAt = savedAt;
        mom.supabaseSaved = Boolean(
          backendResult && backendResult.supabaseSaved,
        );
        mom.supabaseError = backendResult
          ? backendResult.supabaseError || ""
          : "";
        subtask.data.savedAt = savedAt;
        await persistAppState();
        renderSubtaskModal();
        renderDatabase();
        alert(
          mom.supabaseSaved
            ? "MOM PDF saved to Database and Supabase."
            : `MOM PDF saved to Database. Supabase upload failed: ${mom.supabaseError || "check server env vars and bucket setup."}`,
        );
      }

      function addRepeaterItem(stageId, subtaskId, listKey) {
        if (!canUseRequirementEngineeringTasks(stageId)) {
          alert(
            "Assign every Requirement Engineering task before editing tasks.",
          );
          return;
        }
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;

        const map = {
          meets: {
            platform: "",
            attendees: [],
            purpose: "",
            scheduledDate: "",
            scheduledTime: "",
            meetLink: "",
            additionalNotes: "",
          },
          visits: {
            visitDate: "",
            visitTime: "",
            locationLink: "",
            attendees: [],
            purpose: "",
          },
          tasks: {
            task: "",
            assignee: "",
            deadline: "",
          },
        };

        let template;
        if (
          listKey === "revisions" &&
          subtaskId.startsWith("design-calculation")
        ) {
          template = { revisionRequest: "" };
        } else if (listKey === "revisions" && subtaskId === "quotation") {
          template = {
            costing: "",
            paymentTerms: "",
            ourScope: "",
            exclusions: "",
            uploadQuote: [],
            revisionRequest: "",
          };
        } else {
          template = map[listKey] || {};
        }

        subtask.data[listKey].push(clone(template));
        syncMomAndVisitReports();
        persistAppStateSoon();
        renderSubtaskModal();
        renderDashboard();
        if (state.activeStageId) {
          showStageDetail(state.activeStageId);
        }
      }

      function removeRepeaterItem(stageId, subtaskId, listKey, index) {
        if (!canUseRequirementEngineeringTasks(stageId)) {
          alert(
            "Assign every Requirement Engineering task before editing tasks.",
          );
          return;
        }
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        subtask.data[listKey].splice(index, 1);
        syncMomAndVisitReports();
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function setSubtaskStatus(stageId, subtaskId, value) {
        if (!canUseRequirementEngineeringTasks(stageId)) {
          alert(
            "Assign every Requirement Engineering task before changing task status.",
          );
          renderSubtaskModal();
          return;
        }
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        if (value === "completed" && !canCompleteSubtask(stageId, subtaskId)) {
          renderSubtaskModal();
          return;
        }
        subtask.status = value;
        persistAppStateSoon();
      }

      function toggleSubtask(stageId, subtaskId) {
        if (!canAccessStage(stageId)) {
          alert("This stage is not available for your role.");
          return;
        }
        if (!canUseRequirementEngineeringTasks(stageId)) {
          alert(
            "Assign every Requirement Engineering task before completing tasks.",
          );
          return;
        }
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        if (
          subtask.status !== "completed" &&
          !canCompleteSubtask(stageId, subtaskId)
        ) {
          return;
        }
        subtask.status =
          subtask.status === "completed" ? "pending" : "completed";
        persistAppStateSoon();
        renderDashboard();
        if (state.activeStageId) {
          showStageDetail(state.activeStageId);
        }
      }

      function saveSubtask(stageId) {
        // process special-case data before closing modal
        if (state.activeModal) {
          const project = getCurrentProject();
          const subtask = getSubtask(
            state.activeModal.stageId,
            state.activeModal.subtaskId,
          );
          if (project && subtask) {
            // Site visits: create fund requests if requested
            if (subtask.id === "site-visits") {
              (subtask.data.visits || []).forEach((visit) => {
                if (visit.requestFundAmount && !visit.requestCreated) {
                  if (!project.requests) project.requests = [];
                  project.requests.push({
                    type: "fund-request",
                    projectId: project.id,
                    projectName: project.name,
                    location: visit.locationLink || "",
                    attendees: visit.attendees || [],
                    purpose: visit.purpose || "",
                    visitDate: visit.visitDate || "",
                    amount: visit.requestFundAmount,
                    createdAt: new Date().toISOString(),
                    createdBy: state.currentUser ? state.currentUser.id : "",
                    status: "pending",
                  });
                  visit.requestCreated = true;
                }
              });
            }
            // Visit reports: save expenses text and attachment separately to DB, create Accounts approval request
            if (subtask.id === "visit-report") {
              const project = getCurrentProject();
              (subtask.data.reports || []).forEach((report, idx) => {
                if (!project.databaseItems) project.databaseItems = [];
                const recordsToCreate = [];
                const savedAt = new Date().toISOString();

                if (
                  report.expensesMade &&
                  report.expensesDatabaseIndex === undefined
                ) {
                  const expensesRecord = {
                    name: `Visit ${idx + 1} Expenses ${savedAt.split("T")[0]}.txt`,
                    subtaskId: subtask.id,
                    pdfKind: "visit-expenses",
                    textContent: report.expensesMade,
                    savedAt,
                    storagePath: `Projects > ${project.name} > Site Visit Reports`,
                  };
                  project.databaseItems.push(expensesRecord);
                  report.expensesDatabaseIndex =
                    project.databaseItems.length - 1;
                  recordsToCreate.push(report.expensesDatabaseIndex);
                } else if (
                  report.expensesMade &&
                  project.databaseItems[report.expensesDatabaseIndex]
                ) {
                  project.databaseItems[
                    report.expensesDatabaseIndex
                  ].textContent = report.expensesMade;
                  project.databaseItems[report.expensesDatabaseIndex].savedAt =
                    savedAt;
                }

                if (
                  report.attachments_data &&
                  report.attachments_data.length &&
                  report.attachmentDatabaseIndex === undefined
                ) {
                  const attachmentName =
                    report.attachments && report.attachments[0]
                      ? report.attachments[0]
                      : `Visit ${idx + 1} Expense Attachment.pdf`;
                  const attachmentRecord = {
                    name: `Visit ${idx + 1} Expense Attachment - ${attachmentName}`,
                    subtaskId: subtask.id,
                    pdfKind: "visit-attachment",
                    dataUri: report.attachments_data[0],
                    originalName: attachmentName,
                    savedAt,
                    storagePath: `Projects > ${project.name} > Site Visit Reports`,
                  };
                  project.databaseItems.push(attachmentRecord);
                  report.attachmentDatabaseIndex =
                    project.databaseItems.length - 1;
                  recordsToCreate.push(report.attachmentDatabaseIndex);
                } else if (
                  report.attachments_data &&
                  report.attachments_data.length &&
                  project.databaseItems[report.attachmentDatabaseIndex]
                ) {
                  project.databaseItems[
                    report.attachmentDatabaseIndex
                  ].dataUri = report.attachments_data[0];
                  project.databaseItems[
                    report.attachmentDatabaseIndex
                  ].savedAt = savedAt;
                }

                if (recordsToCreate.length) {
                  report.reportSaved = true;
                  report.reportStatus = "pending";
                  if (!project.requests) project.requests = [];
                  const existingRequest = project.requests.find(
                    (request) =>
                      request.type === "site-visit-report" &&
                      request.reportIndex === idx &&
                      request.status === "pending",
                  );
                  if (existingRequest) {
                    existingRequest.pdfIndices = Array.from(
                      new Set([
                        ...(existingRequest.pdfIndices || []),
                        ...recordsToCreate,
                      ]),
                    );
                  } else {
                    project.requests.push({
                      type: "site-visit-report",
                      projectId: project.id,
                      projectName: project.name,
                      reportIndex: idx,
                      pdfIndices: recordsToCreate,
                      createdAt: savedAt,
                      status: "pending",
                    });
                  }
                }
              });
            }
          }
        }
        closeSubtaskModal();
        renderDashboard();
        if (stageId) {
          showStageDetail(stageId);
        }
      }

      function openCalculationPage(stageId, subtaskId) {
        const subtask = getSubtask(stageId, subtaskId);
        const systemValue = subtask
          ? subtask.data.selectedCalculationSystem
          : "";
        const system = SYSTEM_REQUIREMENTS.find(
          (item) => item.value === systemValue,
        );
        if (!system) {
          alert("Select which system calculation should open first.");
          return;
        }
        const calculationPage = CALCULATION_PAGE_BY_SYSTEM[system.value];
        if (!calculationPage) {
          alert(`Calculation page is not configured for ${system.label}.`);
          return;
        }
        state.activeCalculation = { stageId, subtaskId, systemValue };
        document.getElementById("utilityModalTitle").textContent =
          `${subtask.data.phase ? subtask.data.phase + " " : ""}${system.label} Calculation`;
        document.getElementById("utilityModalBody").innerHTML = `
                <div class="action-buttons">
                  <button class="btn btn-primary" type="button" onclick="saveCalculationOutput()">Save Output to Database</button>
                  ${system.value === "gas-chlorinator" ? `<button class="btn btn-secondary" type="button" onclick="previewDesignReport()">Generate Design Report</button>` : ""}
                  <button class="btn btn-secondary" type="button" onclick="closeUtilityModal()">Close</button>
                </div>
                <iframe id="calculationFrame" class="calc-frame" src="${escapeAttr(calculationPage)}"></iframe>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function previewDesignReport() {
        const project = getCurrentProject();
        const frame = document.getElementById("calculationFrame");
        // Try to read live structured output from the open iframe first
        let structured = null;
        if (
          frame &&
          state.activeCalculation &&
          state.activeCalculation.systemValue === "gas-chlorinator"
        ) {
          try {
            const doc = frame.contentDocument;
            if (doc) structured = collectGasChlorinationOutput(doc);
          } catch (e) {
            /* cross-origin — fall through */
          }
        }
        // Fall back to the last saved structured output for this project
        if (!structured) {
          (project ? project.stages || [] : []).forEach((stage) => {
            (stage.subtasks || []).forEach((task) => {
              if (String(task.id || "").startsWith("design-calculation")) {
                (task.data.calculationOutputs || []).forEach((out) => {
                  if (
                    out.structured &&
                    out.structured.format === "gas-chlorination"
                  ) {
                    structured = out.structured;
                  }
                });
              }
            });
          });
        }
        if (!structured) {
          alert(
            "Please calculate the Gas Chlorination system first, then click Generate Design Report.",
          );
          return;
        }
        // Store for saveDesignReportPdf to reference
        state._designReportStructured = structured;
        openDesignReportPdf(structured, project);
      }

      function saveCalculationOutput() {
        if (!state.activeCalculation) return;
        const subtask = getSubtask(
          state.activeCalculation.stageId,
          state.activeCalculation.subtaskId,
        );
        const frame = document.getElementById("calculationFrame");
        if (!subtask || !frame) {
          alert("Calculation output could not be read.");
          return;
        }
        try {
          const outputPanel =
            frame.contentDocument &&
            (frame.contentDocument.getElementById("outputPanel") ||
              frame.contentDocument.getElementById("results"));
          if (outputPanel) {
            const structured =
              state.activeCalculation.systemValue === "gas-chlorinator"
                ? collectGasChlorinationOutput(frame.contentDocument)
                : null;
            saveCalculationOutputPayload({
              html: outputPanel.innerHTML,
              text: outputPanel.innerText.trim(),
              structured,
            });
            return;
          }
        } catch (error) {
          // Fall through to postMessage for local-file iframe restrictions.
        }
        if (frame.contentWindow) {
          frame.contentWindow.postMessage(
            { type: "request-calculation-output" },
            "*",
          );
        }
      }

      function getElementText(element) {
        return element ? element.textContent.replace(/\s+/g, " ").trim() : "";
      }

      function collectResultCards(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll(".result-card")).map(
          (card) => ({
            label: getElementText(card.querySelector(".result-label")),
            value: getElementText(card.querySelector(".result-value")),
          }),
        );
      }

      function collectCalculationInputSections(doc) {
        return Array.from(doc.querySelectorAll(".calculator-form > .section"))
          .map((section) => {
            const title =
              getElementText(section.querySelector(".section-title")) ||
              "Inputs";
            const rows = Array.from(section.querySelectorAll(".input-group"))
              .map((group) => {
                const input = group.querySelector("input, select, textarea");
                return [
                  getElementText(group.querySelector("label")),
                  input ? input.value : "",
                ];
              })
              .filter((row) => row[0]);
            return {
              title: `${title} Inputs`,
              columns: ["Input", "Value"],
              rows,
            };
          })
          .filter((section) => section.rows.length);
      }

      function collectGasChlorinationOutput(doc) {
        const results = doc.getElementById("results");
        if (!results || !results.classList.contains("show")) return null;
        const calculationSections = [
          ...collectCalculationInputSections(doc),
          {
            title: "Calculation Results",
            columns: ["Parameter", "Value"],
            rows: collectResultCards(doc.getElementById("mainResults")).map(
              (item) => [item.label, item.value],
            ),
          },
        ];
        Array.from(doc.querySelectorAll(".diffuser-card")).forEach(
          (card, index) => {
            calculationSections.push({
              title:
                getElementText(card.querySelector(".diffuser-title")) ||
                `Diffuser Point ${index + 1}`,
              columns: ["Parameter", "Value"],
              rows: collectResultCards(card).map((item) => [
                item.label,
                item.value,
              ]),
            });
          },
        );

        const boqSections = Array.from(doc.querySelectorAll(".boq-table")).map(
          (table) => {
            const title =
              getElementText(table.previousElementSibling) || "BOQ Items";
            const rows = Array.from(table.querySelectorAll("tbody tr")).map(
              (row) =>
                Array.from(row.children).map((cell) => {
                  const input = cell.querySelector("input");
                  return input ? input.value : getElementText(cell);
                }),
            );
            return {
              title,
              columns: [
                "Sl.No",
                "Item Description",
                "Specification",
                "MOC",
                "Quantity",
                "Unit",
                "Price/Unit",
                "Total",
              ],
              rows,
            };
          },
        );
        const boqGrandTotal = getElementText(doc.querySelector(".grand-total"));
        if (boqGrandTotal) {
          boqSections.push({
            title: "BOQ Summary",
            columns: ["Description", "Amount"],
            rows: [
              [
                "Grand Total",
                boqGrandTotal.replace(/^GRAND TOTAL\s*:\s*/i, ""),
              ],
            ],
          });
        }
        return {
          format: "gas-chlorination",
          systemCapacity: parseSystemCapacity(
            calculationSections[0] && calculationSections[0].rows,
          ),
          boqItems: collectBoqItemNames(boqSections),
          calculationSections: calculationSections.filter(
            (section) => section.rows.length,
          ),
          boqSections: boqSections.filter((section) => section.rows.length),
        };
      }

      function parseSystemCapacity(rows) {
        const match = (rows || []).find(
          (row) => String(row[0] || "").toLowerCase() === "system capacity",
        );
        return match
          ? parseFloat(String(match[1] || "").replace(/,/g, "")) || 0
          : 0;
      }

      function collectBoqItemNames(boqSections) {
        const names = [];
        (boqSections || []).forEach((section) => {
          if (section.title === "BOQ Summary") return;
          (section.rows || []).forEach((row) => {
            const itemName = row[1] || "";
            if (itemName && !names.includes(itemName)) names.push(itemName);
          });
        });
        return names;
      }

      function formatMoney(value) {
        const amount = Number(value) || 0;
        return amount.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      function getClientInfoText(project) {
        const enquiry = project && project.enquiry ? project.enquiry : {};
        const clientName =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName
            : enquiry.companyName;
        return [
          `Client: ${clientName || "--"}`,
          `Contact Person: ${enquiry.contactPersonName || "--"}`,
          `Phone: ${enquiry.contactNumber || "--"}`,
          `Email: ${enquiry.email || "--"}`,
          `Requirement: ${enquiry.requirement || "--"}`,
        ].join("\n");
      }

      function getLatestCalculationOutputsText(project) {
        const rows = [];
        (project ? project.stages || [] : []).forEach((stage) => {
          (stage.subtasks || [])
            .filter((task) =>
              String(task.id || "").startsWith("design-calculation"),
            )
            .forEach((task) => {
              (task.data.calculationOutputs || []).forEach((output) => {
                rows.push(
                  [
                    `System: ${output.systemLabel || output.systemValue || "Calculation"}`,
                    `Saved: ${formatDate(output.savedAt)}`,
                    output.structured && output.structured.calculationSections
                      ? buildTablePdfText(output.structured.calculationSections)
                      : output.text || "",
                  ].join("\n"),
                );
              });
            });
        });
        return rows.join("\n\n");
      }

      function createBoqWithoutPriceSections(boqSections) {
        return (boqSections || [])
          .filter((section) => section.title !== "BOQ Summary")
          .map((section) => {
            const keepIndexes = (section.columns || [])
              .map((column, index) => ({ column, index }))
              .filter(
                (item) =>
                  !/unit price|price|total|amount/i.test(
                    String(item.column || ""),
                  ),
              );
            return {
              title: `${section.title} Without Price`,
              columns: keepIndexes.map((item) => item.column),
              rows: (section.rows || []).map((row) =>
                keepIndexes.map((item) => row[item.index] || ""),
              ),
            };
          })
          .filter((section) => section.rows.length);
      }

      function buildQuotationText(project) {
        const costing = getProposalSubtask(project, "proposal-costing");
        const payment = getProposalSubtask(project, "proposal-payment-terms");
        const delivery = getProposalSubtask(project, "proposal-delivery-terms");
        const other = getProposalSubtask(project, "proposal-other-terms");
        if (costing) syncCostingSystems(costing);
        const prices = costing ? costing.data.systemPrices || [] : [];
        const total = prices.reduce(
          (sum, item) => sum + (Number(item.price) || 0),
          0,
        );
        const gst = total * 0.18;
        const grandTotal = total + gst;
        return [
          "QUOTATION",
          "",
          "Client Info",
          getClientInfoText(project),
          "",
          "Costing",
          ...prices.map(
            (item) =>
              `${item.systemLabel || item.systemValue || "System"}: Rs. ${formatMoney(item.price)}`,
          ),
          `Total: Rs. ${formatMoney(total)}`,
          `GST @ 18%: Rs. ${formatMoney(gst)}`,
          `Grand Total: Rs. ${formatMoney(grandTotal)}`,
          "",
          "Payment Terms",
          payment && payment.data.text ? payment.data.text : "--",
          "",
          "Delivery Terms",
          delivery && delivery.data.text ? delivery.data.text : "--",
          "",
          "Other Terms and Condition",
          other && other.data.text ? other.data.text : "--",
        ].join("\n");
      }

      function generateQuotationPdf(stageId, subtaskId) {
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        if (!project || !subtask) return;
        const text = buildQuotationText(project);
        subtask.data.quotationText = text;
        subtask.data.quotationPdfDataUri = createPdfDataUri(
          `${project.name} - Quotation`,
          text,
        );
        subtask.data.savedAt = new Date().toISOString();
        subtask.status = "completed";
        persistAppStateSoon();
        renderSubtaskModal();
        renderDatabase();
        openStoredProjectDocumentPdf(project.id, subtask.id, "quotation");
      }

      async function generateAiDocument(stageId, subtaskId, kind, label) {
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        if (!project || !subtask) return;
        const calculationText = getLatestCalculationOutputsText(project);
        if (!calculationText.trim()) {
          alert("Save Design Calculation output first.");
          return;
        }
        subtask.data.aiStatus = "Generating...";
        renderSubtaskModal();
        try {
          const response = await fetch("/api/ai/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              kind,
              label,
              projectName: project.name,
              clientInfo: getClientInfoText(project),
              calculationText,
            }),
          });
          if (!response.ok) throw new Error(await response.text());
          const result = await response.json();
          subtask.data.aiText = result.text || "";
          subtask.data.aiStatus = result.fallback
            ? "Generated locally. Configure GROQ_API_KEY for Groq AI output."
            : "Generated by Groq AI. Review and edit before saving.";
        } catch (error) {
          subtask.data.aiStatus = `Could not generate: ${error.message}`;
        }
        persistAppStateSoon();
        renderSubtaskModal();
      }

      function saveAiDocumentPdf(stageId, subtaskId, label) {
        const project = getCurrentProject();
        const subtask = getSubtask(stageId, subtaskId);
        if (!project || !subtask) return;
        const text = (subtask.data.aiText || "").trim();
        if (!text) {
          alert("Generate or enter text before saving PDF.");
          return;
        }
        subtask.data.aiPdfDataUri = createPdfDataUri(
          `${project.name} - ${label}`,
          text,
        );
        subtask.data.aiSavedAt = new Date().toISOString();
        subtask.data.aiStatus = "Saved as PDF.";
        subtask.status = "completed";
        persistAppStateSoon();
        renderSubtaskModal();
        renderDatabase();
        openStoredProjectDocumentPdf(project.id, subtask.id, "ai");
      }

      function collectGasChlorinationOutputFromHtml(html) {
        if (!html || typeof DOMParser === "undefined") return null;
        const parsed = new DOMParser().parseFromString(
          `<div id="results" class="show">${html}</div>`,
          "text/html",
        );
        return collectGasChlorinationOutput(parsed);
      }

      function padTableCell(value, width) {
        const text = sanitizePdfText(value).replace(/\s+/g, " ").trim();
        return text.length > width
          ? `${text.slice(0, Math.max(0, width - 3))}...`
          : text.padEnd(width, " ");
      }

      function buildTextTable(section) {
        const isBoq = section.columns.length > 2;
        const widths = isBoq
          ? section.columns.length >= 8
            ? [4, 14, 12, 7, 7, 4, 8, 8]
            : [5, 24, 7, 6, 10, 10]
          : [30, 32];
        const separator = `+${widths.map((width) => "-".repeat(width + 2)).join("+")}+`;
        const row = (cells) =>
          `| ${widths
            .map((width, index) => padTableCell(cells[index] || "", width))
            .join(" | ")} |`;
        return [
          section.title,
          separator,
          row(section.columns),
          separator,
          ...section.rows.map(row),
          separator,
        ].join("\n");
      }

      function buildTablePdfText(sections) {
        return sections.map(buildTextTable).join("\n\n");
      }

      function sanitizePdfText(value) {
        return String(value || "")
          .replace(/\r/g, "")
          .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");
      }

      function escapePdfLine(value) {
        return sanitizePdfText(value)
          .replace(/\\/g, "\\\\")
          .replace(/\(/g, "\\(")
          .replace(/\)/g, "\\)");
      }

      function wrapPdfLine(line, maxLength) {
        const words = line.split(/\s+/);
        const lines = [];
        let current = "";
        words.forEach((word) => {
          if (!word) return;
          if ((current + " " + word).trim().length > maxLength) {
            if (current) lines.push(current);
            current = word;
          } else {
            current = `${current} ${word}`.trim();
          }
        });
        if (current) lines.push(current);
        return lines.length ? lines : [""];
      }

      function createPdfDataUri(title, text) {
        const lines = sanitizePdfText(`${title}\n\n${text}`)
          .split("\n")
          .flatMap((line) => wrapPdfLine(line, 92));
        const pages = [];
        for (let index = 0; index < lines.length; index += 58) {
          pages.push(lines.slice(index, index + 58));
        }
        if (!pages.length) pages.push(["No output"]);

        const objects = [];
        const addObject = (body) => {
          objects.push(body);
          return objects.length;
        };
        const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
        const pagesId = addObject("");
        const fontId = addObject(
          "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        );
        const pageIds = [];

        pages.forEach((pageLines) => {
          const content = `BT /F1 10 Tf 12 TL 50 790 Td ${pageLines
            .map(
              (line, index) =>
                `${index ? "T* " : ""}(${escapePdfLine(line)}) Tj`,
            )
            .join(" ")} ET`;
          const contentId = addObject(
            `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
          );
          const pageId = addObject(
            `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`,
          );
          pageIds.push(pageId);
        });

        objects[pagesId - 1] =
          `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

        let pdf = "%PDF-1.4\n";
        const offsets = [0];
        objects.forEach((body, index) => {
          offsets.push(pdf.length);
          pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
        });
        const xrefOffset = pdf.length;
        pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
        offsets.slice(1).forEach((offset) => {
          pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
        });
        pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
        return `data:application/pdf;base64,${btoa(pdf)}`;
      }

      function createPdfFromPages(pages) {
        const objects = [];
        const addObject = (body) => {
          objects.push(body);
          return objects.length;
        };
        const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
        const pagesId = addObject("");
        const fontId = addObject(
          "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        );
        const fontBoldId = addObject(
          "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
        );
        const pageIds = [];
        pages.forEach((commands) => {
          const content = commands.join("\n");
          const contentId = addObject(
            `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
          );
          const pageId = addObject(
            `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`,
          );
          pageIds.push(pageId);
        });
        objects[pagesId - 1] =
          `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

        let pdf = "%PDF-1.4\n";
        const offsets = [0];
        objects.forEach((body, index) => {
          offsets.push(pdf.length);
          pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
        });
        const xrefOffset = pdf.length;
        pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
        offsets.slice(1).forEach((offset) => {
          pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
        });
        pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
        return `data:application/pdf;base64,${btoa(pdf)}`;
      }

      function createTablePdfDataUri(title, sections) {
        const pageWidth = 612;
        const pageHeight = 792;
        const margin = 36;
        const bottom = 38;
        const pages = [[]];
        let y = pageHeight - margin;

        const current = () => pages[pages.length - 1];
        const newPage = () => {
          pages.push([]);
          y = pageHeight - margin;
        };
        const ensureSpace = (height) => {
          if (y - height < bottom) newPage();
        };
        const textWidth = (text, fontSize) =>
          sanitizePdfText(text).length * fontSize * 0.52;
        const wrapByWidth = (text, width, fontSize) => {
          const words = sanitizePdfText(text).split(/\s+/);
          const lines = [];
          let line = "";
          words.forEach((word) => {
            const next = `${line} ${word}`.trim();
            if (line && textWidth(next, fontSize) > width) {
              lines.push(line);
              line = word;
            } else {
              line = next;
            }
          });
          if (line) lines.push(line);
          return lines.length ? lines : [""];
        };
        const drawText = (text, x, textY, size = 9, bold = false) => {
          current().push(
            `BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${textY} Td (${escapePdfLine(text)}) Tj ET`,
          );
        };
        const drawLine = (x1, y1, x2, y2) => {
          current().push(`${x1} ${y1} m ${x2} ${y2} l S`);
        };

        drawText(title, margin, y, 15, true);
        y -= 26;

        sections.forEach((section) => {
          const isBoq = section.columns.length > 2;
          const widths = isBoq ? [38, 202, 48, 46, 74, 72] : [235, 245];
          const tableWidth = widths.reduce((sum, width) => sum + width, 0);
          const startX = margin;
          const rowFont = isBoq ? 7.5 : 8.5;

          ensureSpace(48);
          drawText(section.title, margin, y, 11, true);
          y -= 16;

          const drawRow = (cells, bold = false) => {
            const wrapped = cells.map((cell, index) =>
              wrapByWidth(cell, widths[index] - 8, rowFont),
            );
            const rowHeight =
              Math.max(...wrapped.map((lines) => lines.length)) *
                (rowFont + 2) +
              10;
            ensureSpace(rowHeight + 4);
            const topY = y;
            let x = startX;
            drawLine(startX, topY, startX + tableWidth, topY);
            wrapped.forEach((lines, cellIndex) => {
              drawLine(x, topY, x, topY - rowHeight);
              lines.forEach((line, lineIndex) => {
                drawText(
                  line,
                  x + 4,
                  topY - rowFont - 4 - lineIndex * (rowFont + 2),
                  rowFont,
                  bold,
                );
              });
              x += widths[cellIndex];
            });
            drawLine(x, topY, x, topY - rowHeight);
            drawLine(
              startX,
              topY - rowHeight,
              startX + tableWidth,
              topY - rowHeight,
            );
            y -= rowHeight;
          };

          drawRow(section.columns, true);
          section.rows.forEach((row) => drawRow(row.map(String)));
          y -= 18;
        });

        if (!sections.length) {
          drawText("No output", margin, y, 10);
        }
        return createPdfFromPages(pages);
      }

      // Returns project info object for BOQ PDF generation
      function buildBoqProjectInfo(project) {
        const enquiry = project && project.enquiry ? project.enquiry : {};
        const clientName =
          enquiry.existingClient === "yes"
            ? enquiry.existingClientName || ""
            : enquiry.companyName || "";
        return {
          documentNumber: project
            ? "BOQ-" +
              String(project.id || "")
                .slice(-6)
                .toUpperCase()
            : "BOQ-001",
          documentDate: new Date().toLocaleDateString("en-IN"),
          projectName: (project && project.name) || "Project",
          clientName: clientName || "Client",
          projectLocation: enquiry.location || enquiry.city || "—",
          revision: "Rev 1",
          preparedBy: "Engineering Team",
        };
      }

      // Generates a styled PDF data URI from BOQ sections, visually matching the HTML template.
      // Uses the existing createPdfFromPages() infrastructure — no external libraries needed.
      function createBoqWithPricePdfDataUri(boqSections, projectInfo) {
        projectInfo = projectInfo || {};

        // Page: US Letter 612×792 (same as createPdfFromPages)
        const pageWidth = 612;
        const pageHeight = 792;
        const margin = 36;
        const usableW = pageWidth - margin * 2; // 540

        const pages = [[]];
        let y = pageHeight - margin;

        const cur = () => pages[pages.length - 1];
        const newPage = () => {
          pages.push([]);
          y = pageHeight - margin;
        };
        const need = (h) => {
          if (y - h < 48) newPage();
        };

        // PDF drawing helpers
        const fillRect = (x, ry, w, h, r, g, b) =>
          cur().push(`${r} ${g} ${b} rg ${x} ${ry} ${w} ${h} re f`);

        const strokeLine = (x1, y1, x2, y2, r, g, b, lw) =>
          cur().push(`${lw} w ${r} ${g} ${b} RG ${x1} ${y1} m ${x2} ${y2} l S`);

        const san = (v) =>
          String(v || "")
            .replace(/\r/g, "")
            .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");

        const esc = (v) =>
          san(v)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)");

        // r g b rg sets fill color for text; bold uses F2
        const txt = (text, x, ty, size, bold, r, g, b) =>
          cur().push(
            `BT ${r} ${g} ${b} rg /${bold ? "F2" : "F1"} ${size} Tf ${x} ${ty} Td (${esc(text)}) Tj ET`,
          );

        const twid = (text, size) => san(text).length * size * 0.52;

        const wrap = (text, maxW, size) => {
          const words = san(text).split(/\s+/);
          const lines = [];
          let line = "";
          words.forEach((w) => {
            const next = `${line} ${w}`.trim();
            if (line && twid(next, size) > maxW) {
              lines.push(line);
              line = w;
            } else line = next;
          });
          if (line) lines.push(line);
          return lines.length ? lines : [""];
        };

        const fmtMoney = (v) => {
          const n = Number(v) || 0;
          return (
            "INR " +
            n.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
        };

        // Colour palette matching the template
        // Dark blue #1f3b63
        const DB = [0.122, 0.231, 0.388];
        // Light panel #eef2f7
        const LB = [0.933, 0.949, 0.969];
        // Muted label #94a3b8
        const MU = [0.58, 0.639, 0.722];
        // Row border #dbe3ef
        const BD = [0.859, 0.89, 0.937];
        // Body text #2d3748
        const BK = [0.176, 0.216, 0.282];
        // White
        const WH = [1, 1, 1];
        // Alternate row #f5f8fc
        const ALT = [0.961, 0.973, 0.988];

        const c = (arr) => arr.join(" ");

        // ── TITLE ────────────────────────────────────────────────────────
        txt("BILL OF QUANTITIES", margin, y, 18, true, ...DB);
        y -= 24;
        txt(
          "Document No: " + (projectInfo.documentNumber || "BOQ-001"),
          margin,
          y,
          8,
          false,
          ...MU,
        );
        y -= 12;
        txt(
          "Date: " +
            (projectInfo.documentDate ||
              new Date().toLocaleDateString("en-IN")),
          margin,
          y,
          8,
          false,
          ...MU,
        );
        y -= 16;

        // Thick blue rule
        fillRect(margin, y, usableW, 3, ...DB);
        y -= 14;

        // ── PROJECT INFO PANEL ───────────────────────────────────────────
        const panelH = 46;
        fillRect(margin, y - panelH, usableW, panelH, ...LB);
        const colW4 = usableW / 4;
        const panelLabels = ["PROJECT NAME", "CLIENT", "LOCATION", "REVISION"];
        const panelVals = [
          projectInfo.projectName || "Project",
          projectInfo.clientName || "Client",
          projectInfo.projectLocation || "—",
          projectInfo.revision || "Rev 1",
        ];
        panelLabels.forEach((lbl, i) => {
          const px = margin + i * colW4 + 8;
          txt(lbl, px, y - 13, 6.5, true, ...MU);
          txt(panelVals[i], px, y - 28, 8, true, ...DB);
        });
        y -= panelH + 14;

        // ── TABLE ────────────────────────────────────────────────────────
        // Column widths summing to usableW = 540
        const colWidths = [27, 86, 143, 60, 34, 34, 68, 88];
        const colHeaders = [
          "S.No",
          "Product Name",
          "Specifications",
          "MOC",
          "Qty",
          "Unit",
          "Unit Price",
          "Total Price",
        ];
        const colFontSz = [7.5, 8, 8, 7.5, 7.5, 7.5, 8, 8];
        const rightAlign = [
          false,
          false,
          false,
          false,
          true,
          false,
          true,
          true,
        ];

        // Header row
        const hdrH = 20;
        need(hdrH);
        fillRect(margin, y - hdrH, usableW, hdrH, ...DB);
        let hx = margin;
        colHeaders.forEach((h, i) => {
          txt(h, hx + 4, y - 14, 7.5, true, ...WH);
          hx += colWidths[i];
        });
        // Vertical dividers in header
        hx = margin;
        colWidths.forEach((w) => {
          hx += w;
          if (hx < margin + usableW)
            strokeLine(hx, y, hx, y - hdrH, ...WH, 0.3);
        });
        y -= hdrH;

        // Collect rows (skip BOQ Summary section)
        const allRows = [];
        let sno = 1;
        (boqSections || []).forEach((section) => {
          if (section.title === "BOQ Summary") return;
          // Dynamically find column indices for our 8 target columns
          const cols = (section.columns || []).map((c) =>
            String(c).toLowerCase(),
          );
          const idx = {
            name: cols.findIndex((c) => /product|item|name/i.test(c)),
            spec: cols.findIndex((c) => /spec/i.test(c)),
            moc: cols.findIndex((c) => /moc|material/i.test(c)),
            qty: cols.findIndex((c) => /qty|quan/i.test(c)),
            unit: cols.findIndex((c) => /^unit$|^unit\s/i.test(c)),
            up: cols.findIndex((c) => /unit.*price|rate/i.test(c)),
            total: cols.findIndex((c) => /total|amount/i.test(c)),
          };
          (section.rows || []).forEach((row) => {
            allRows.push([
              String(sno++),
              idx.name >= 0 ? row[idx.name] || "" : row[1] || "",
              idx.spec >= 0 ? row[idx.spec] || "" : row[2] || "",
              idx.moc >= 0 ? row[idx.moc] || "" : row[3] || "",
              idx.qty >= 0 ? row[idx.qty] || "" : row[4] || "",
              idx.unit >= 0 ? row[idx.unit] || "" : row[5] || "",
              idx.up >= 0 ? row[idx.up] || "" : row[6] || "",
              idx.total >= 0 ? row[idx.total] || "" : row[7] || "",
            ]);
          });
        });

        let subtotal = 0;

        allRows.forEach((row, ri) => {
          const cells = row.map((cell, ci) =>
            wrap(String(cell), colWidths[ci] - 8, colFontSz[ci]),
          );
          const rowH = Math.max(...cells.map((ls) => ls.length)) * 11 + 8;
          need(rowH + 4);

          // Alternating row background
          if (ri % 2 === 1) fillRect(margin, y - rowH, usableW, rowH, ...ALT);

          // Cell text
          let rx = margin;
          cells.forEach((lines, ci) => {
            lines.forEach((line, li) => {
              const ty = y - 7 - li * 11;
              if (rightAlign[ci]) {
                const tw = twid(line, colFontSz[ci]);
                txt(
                  line,
                  rx + colWidths[ci] - tw - 4,
                  ty,
                  colFontSz[ci],
                  false,
                  ...BK,
                );
              } else {
                txt(line, rx + 4, ty, colFontSz[ci], false, ...BK);
              }
            });
            rx += colWidths[ci];
          });

          // Row bottom border
          strokeLine(margin, y - rowH, margin + usableW, y - rowH, ...BD, 0.4);
          y -= rowH;

          subtotal += Number(row[7]) || 0;
        });

        y -= 14;

        // ── SUMMARY ──────────────────────────────────────────────────────
        const gst = subtotal * 0.18;
        const grandTotal = subtotal + gst;
        const sumX = margin + usableW - 220;
        const sumW = 220;

        need(70);

        const summaryRow = (label, amount, isBold, topBorder) => {
          if (topBorder)
            strokeLine(sumX, y + 2, sumX + sumW, y + 2, ...DB, 1.2);
          txt(label, sumX + 6, y - 12, 9, isBold, ...(isBold ? DB : BK));
          const amtStr = fmtMoney(amount);
          const aw = twid(amtStr, 9);
          txt(
            amtStr,
            sumX + sumW - aw - 6,
            y - 12,
            9,
            isBold,
            ...(isBold ? DB : BK),
          );
          y -= 20;
          if (isBold) strokeLine(sumX, y + 2, sumX + sumW, y + 2, ...DB, 1.2);
        };

        summaryRow("Subtotal", subtotal, false, false);
        summaryRow("GST @ 18%", gst, false, false);
        summaryRow("Grand Total", grandTotal, true, true);

        y -= 30;

        // ── SIGNATURE ────────────────────────────────────────────────────
        need(60);
        txt("Prepared By", margin, y, 8, false, ...MU);
        y -= 40;
        strokeLine(margin, y, margin + 200, y, ...BD, 1.2);
        y -= 12;
        txt(
          projectInfo.preparedBy || "Engineering Team",
          margin,
          y,
          9,
          true,
          ...BK,
        );

        return createPdfFromPages(pages);
      }

      // Generates a styled PDF for BOQ WITHOUT prices, matching the boq-template.html design.
      // Columns: S.No | Product Name | Specifications | MOC | Qty | Unit
      // No summary block (no subtotal / GST / total).
      function createBoqWithoutPricePdfDataUri(boqSections, projectInfo) {
        projectInfo = projectInfo || {};

        const pageWidth = 612;
        const pageHeight = 792;
        const margin = 36;
        const usableW = pageWidth - margin * 2; // 540

        const pages = [[]];
        let y = pageHeight - margin;

        const cur = () => pages[pages.length - 1];
        const newPage = () => {
          pages.push([]);
          y = pageHeight - margin;
        };
        const need = (h) => {
          if (y - h < 48) newPage();
        };

        const fillRect = (x, ry, w, h, r, g, b) =>
          cur().push(`${r} ${g} ${b} rg ${x} ${ry} ${w} ${h} re f`);

        const strokeLine = (x1, y1, x2, y2, r, g, b, lw) =>
          cur().push(`${lw} w ${r} ${g} ${b} RG ${x1} ${y1} m ${x2} ${y2} l S`);

        const san = (v) =>
          String(v || "")
            .replace(/\r/g, "")
            .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");

        const esc = (v) =>
          san(v)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)");

        const txt = (text, x, ty, size, bold, r, g, b) =>
          cur().push(
            `BT ${r} ${g} ${b} rg /${bold ? "F2" : "F1"} ${size} Tf ${x} ${ty} Td (${esc(text)}) Tj ET`,
          );

        const twid = (text, size) => san(text).length * size * 0.52;

        const wrap = (text, maxW, size) => {
          const words = san(text).split(/\s+/);
          const lines = [];
          let line = "";
          words.forEach((w) => {
            const next = `${line} ${w}`.trim();
            if (line && twid(next, size) > maxW) {
              lines.push(line);
              line = w;
            } else line = next;
          });
          if (line) lines.push(line);
          return lines.length ? lines : [""];
        };

        // Colours matching the template
        const DB = [0.122, 0.231, 0.388]; // #1f3b63  dark blue
        const LB = [0.933, 0.949, 0.969]; // #eef2f7  light panel
        const MU = [0.58, 0.639, 0.722]; // #94a3b8  muted label
        const BD = [0.859, 0.89, 0.937]; // #dbe3ef  row border
        const BK = [0.176, 0.216, 0.282]; // #2d3748  body text
        const WH = [1, 1, 1]; // white
        const ALT = [0.961, 0.973, 0.988]; // alternating row tint

        // ── TITLE ─────────────────────────────────────────────────────────
        txt("BILL OF QUANTITIES", margin, y, 18, true, ...DB);
        y -= 24;
        txt(
          "Document No: " + (projectInfo.documentNumber || "BOQ-001"),
          margin,
          y,
          8,
          false,
          ...MU,
        );
        y -= 12;
        txt(
          "Date: " +
            (projectInfo.documentDate ||
              new Date().toLocaleDateString("en-IN")),
          margin,
          y,
          8,
          false,
          ...MU,
        );
        y -= 16;

        // Thick blue rule
        fillRect(margin, y, usableW, 3, ...DB);
        y -= 14;

        // ── PROJECT INFO PANEL ────────────────────────────────────────────
        const panelH = 46;
        fillRect(margin, y - panelH, usableW, panelH, ...LB);
        const colW4 = usableW / 4;
        const panelLabels = ["PROJECT NAME", "CLIENT", "LOCATION", "REVISION"];
        const panelVals = [
          projectInfo.projectName || "Project",
          projectInfo.clientName || "Client",
          projectInfo.projectLocation || "—",
          projectInfo.revision || "Rev 1",
        ];
        panelLabels.forEach((lbl, i) => {
          const px = margin + i * colW4 + 8;
          txt(lbl, px, y - 13, 6.5, true, ...MU);
          txt(panelVals[i], px, y - 28, 8, true, ...DB);
        });
        y -= panelH + 14;

        // ── TABLE ─────────────────────────────────────────────────────────
        // 6 columns, proportional widths from template CSS (scaled to fill 540px):
        //   5% 16% 34% 12% 7% 7%  → scaled by 540/81 ≈ 6.67
        const colWidths = [33, 107, 227, 80, 47, 46]; // sum = 540
        const colHeaders = [
          "S.No",
          "Product Name",
          "Specifications",
          "MOC",
          "Qty",
          "Unit",
        ];
        const colFontSz = [7.5, 8, 8, 7.5, 7.5, 7.5];
        const rightAlign = [false, false, false, false, true, false];

        // Header row
        const hdrH = 20;
        need(hdrH);
        fillRect(margin, y - hdrH, usableW, hdrH, ...DB);
        let hx = margin;
        colHeaders.forEach((h, i) => {
          txt(h, hx + 4, y - 14, 7.5, true, ...WH);
          hx += colWidths[i];
        });
        // Vertical dividers in header
        hx = margin;
        colWidths.forEach((w) => {
          hx += w;
          if (hx < margin + usableW)
            strokeLine(hx, y, hx, y - hdrH, ...WH, 0.3);
        });
        y -= hdrH;

        // Collect rows (sections already have price columns stripped)
        const allRows = [];
        let sno = 1;
        (boqSections || []).forEach((section) => {
          const cols = (section.columns || []).map((c) =>
            String(c).toLowerCase(),
          );
          const idx = {
            name: cols.findIndex((c) => /product|item|name/i.test(c)),
            spec: cols.findIndex((c) => /spec/i.test(c)),
            moc: cols.findIndex((c) => /moc|material/i.test(c)),
            qty: cols.findIndex((c) => /qty|quan/i.test(c)),
            unit: cols.findIndex((c) => /^unit$|^unit\s/i.test(c)),
          };
          (section.rows || []).forEach((row) => {
            allRows.push([
              String(sno++),
              idx.name >= 0 ? row[idx.name] || "" : row[1] || "",
              idx.spec >= 0 ? row[idx.spec] || "" : row[2] || "",
              idx.moc >= 0 ? row[idx.moc] || "" : row[3] || "",
              idx.qty >= 0 ? row[idx.qty] || "" : row[4] || "",
              idx.unit >= 0 ? row[idx.unit] || "" : row[5] || "",
            ]);
          });
        });

        allRows.forEach((row, ri) => {
          const cells = row.map((cell, ci) =>
            wrap(String(cell), colWidths[ci] - 8, colFontSz[ci]),
          );
          const rowH = Math.max(...cells.map((ls) => ls.length)) * 11 + 8;
          need(rowH + 4);

          // Alternating row background
          if (ri % 2 === 1) fillRect(margin, y - rowH, usableW, rowH, ...ALT);

          // Cell text
          let rx = margin;
          cells.forEach((lines, ci) => {
            lines.forEach((line, li) => {
              const ty = y - 7 - li * 11;
              if (rightAlign[ci]) {
                const tw = twid(line, colFontSz[ci]);
                txt(
                  line,
                  rx + colWidths[ci] - tw - 4,
                  ty,
                  colFontSz[ci],
                  false,
                  ...BK,
                );
              } else {
                txt(line, rx + 4, ty, colFontSz[ci], false, ...BK);
              }
            });
            rx += colWidths[ci];
          });

          strokeLine(margin, y - rowH, margin + usableW, y - rowH, ...BD, 0.4);
          y -= rowH;
        });

        y -= 30;

        // ── SIGNATURE ─────────────────────────────────────────────────────
        need(60);
        txt("Prepared By", margin, y, 8, false, ...MU);
        y -= 40;
        strokeLine(margin, y, margin + 200, y, ...BD, 1.2);
        y -= 12;
        txt(
          projectInfo.preparedBy || "Engineering Team",
          margin,
          y,
          9,
          true,
          ...BK,
        );

        return createPdfFromPages(pages);
      }

      async function saveCalculationOutputPayload(payload) {
        if (!state.activeCalculation) return;
        const subtask = getSubtask(
          state.activeCalculation.stageId,
          state.activeCalculation.subtaskId,
        );
        if (!subtask) return;
        const outputText = (payload.text || "").trim();
        if (!outputText || outputText.includes("Fill in the inputs")) {
          alert("Please calculate the system before saving output.");
          return;
        }
        if (!subtask.data.calculationOutputs) {
          subtask.data.calculationOutputs = [];
        }
        const system = SYSTEM_REQUIREMENTS.find(
          (item) => item.value === state.activeCalculation.systemValue,
        );
        const title = `${subtask.name} ${system ? "- " + system.label : ""} Output ${subtask.data.calculationOutputs.length + 1}`;
        const gasStructured =
          state.activeCalculation.systemValue === "gas-chlorinator" &&
          payload.structured &&
          payload.structured.format === "gas-chlorination"
            ? payload.structured
            : null;
        if (
          state.activeCalculation.systemValue === "gas-chlorinator" &&
          (!gasStructured || !gasStructured.calculationSections.length)
        ) {
          alert(
            "Please calculate the Gas Chlorination system before saving output.",
          );
          return;
        }
        const boqWithoutPriceSections = gasStructured
          ? createBoqWithoutPriceSections(gasStructured.boqSections)
          : [];
        const project = getCurrentProject();
        const output = {
          savedAt: new Date().toISOString(),
          systemValue: state.activeCalculation.systemValue || "",
          systemLabel: system ? system.label : "",
          phase: subtask.data.phase || "",
          html: payload.html || "",
          text: outputText,
          structured: gasStructured,
          pdfDataUri: gasStructured
            ? createPdfDataUri(
                `${title} - Calculation Output`,
                buildTablePdfText(gasStructured.calculationSections),
              )
            : createPdfDataUri(title, outputText),
          boqPdfDataUri:
            gasStructured && boqWithoutPriceSections.length
              ? createBoqWithoutPricePdfDataUri(
                  boqWithoutPriceSections,
                  buildBoqProjectInfo(project),
                )
              : "",
          boqWithPricePdfDataUri:
            gasStructured && gasStructured.boqSections.length
              ? createBoqWithPricePdfDataUri(
                  gasStructured.boqSections,
                  buildBoqProjectInfo(project),
                )
              : "",
        };
        subtask.data.calculationOutputs.push(output);
        subtask.data.latestCalculationOutput = output;
        subtask.data.calculationStored = true;
        const backendResult = await saveCalculationOutputToBackend(
          subtask,
          output,
        );
        persistAppStateSoon();
        renderDatabase();
        const storagePath = `Supabase Storage > calculation-pdfs > ${project ? project.id : "Project"} > ${subtask.id}`;
        alert(
          backendResult && backendResult.supabaseSaved
            ? `Calculation PDF${output.boqPdfDataUri ? ", BOQ without price, and BOQwithprice" : ""} saved to Supabase and ${storagePath}. Open Database > Project Records to view it.`
            : `Calculation PDF${output.boqPdfDataUri ? ", BOQ without price, and BOQwithprice" : ""} saved locally at ${storagePath}, but not in Supabase.${backendResult && backendResult.supabaseError ? " " + backendResult.supabaseError : " Check server env vars and table setup."}`,
        );
      }

      async function saveCalculationOutputToBackend(subtask, output) {
        const project = getCurrentProject();
        if (!project) return;
        try {
          const response = await fetch("/api/calculations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              project_id: project.id,
              project_name: project.name,
              subtask_id: subtask.id,
              subtask_name: subtask.name,
              output,
            }),
          });
          if (!response.ok) {
            throw new Error(await response.text());
          }
          return response.json();
        } catch (error) {
          console.warn(
            "Calculation output was saved in browser state only.",
            error,
          );
          return { supabaseSaved: false, supabaseError: error.message };
        }
      }

      function getLatestCalculationOutputForSystem(systemValue) {
        const project = getCurrentProject();
        if (!project) return null;
        const outputs = [];
        project.stages.forEach((stage) => {
          stage.subtasks
            .filter((task) => task.id.startsWith("design-calculation"))
            .forEach((task) => {
              (task.data.calculationOutputs || []).forEach((output) => {
                if (output.systemValue === systemValue) {
                  outputs.push(output);
                }
              });
            });
        });
        return (
          outputs.sort((a, b) =>
            String(b.savedAt || "").localeCompare(String(a.savedAt || "")),
          )[0] || null
        );
      }

      function getDocumentPayload(subtask, documentType) {
        const project = getCurrentProject();
        const output = getLatestCalculationOutputForSystem(
          subtask.data.systemValue,
        );
        const structured =
          output && output.structured ? output.structured : null;
        return {
          type: documentType,
          project_id: project ? project.id : "",
          project_name: project ? project.name : "",
          system_value: subtask.data.systemValue || "",
          system_label: subtask.data.systemLabel || "",
          system_capacity: structured ? structured.systemCapacity || 0 : 0,
          boq_items: structured ? structured.boqItems || [] : [],
        };
      }

      async function getGeneratedDocument(stageId, subtaskId, documentType) {
        const subtask = getSubtask(stageId, subtaskId);
        if (!subtask) return;
        if (subtask.data.systemValue === "pending") {
          alert("Select at least one System Requirement first.");
          return;
        }
        const payload = getDocumentPayload(subtask, documentType);
        if (
          documentType === "pid" &&
          subtask.data.systemValue === "gas-chlorinator" &&
          !payload.system_capacity
        ) {
          alert(
            "Save the Gas Chlorinator calculation output first so System Capacity is available.",
          );
          return;
        }
        if (
          (documentType === "gad" || documentType === "tds") &&
          !payload.boq_items.length
        ) {
          alert("Save the calculation BOQ first so item names are available.");
          return;
        }
        try {
          const response = await fetch("/api/documents/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error(await response.text());
          const result = await response.json();
          if (!subtask.data.documentStatus) subtask.data.documentStatus = {};
          subtask.data.documentStatus[documentType] = {
            saved: result.saved || [],
            missing: result.missing || [],
            savedAt: result.savedAt || new Date().toISOString(),
          };
          persistAppStateSoon();
          renderSubtaskModal();
          renderDashboard();
          if (state.activeStageId) showStageDetail(state.activeStageId);
          const savedCount = result.saved ? result.saved.length : 0;
          const missingCount = result.missing ? result.missing.length : 0;
          alert(
            `Fetched ${savedCount} file${savedCount === 1 ? "" : "s"}.${missingCount ? ` Missing: ${result.missing.join(", ")}` : ""}`,
          );
        } catch (error) {
          alert(`Could not fetch document: ${error.message}`);
        }
      }

      function generateDesignExplanation(stageId, subtaskId) {
        generateAiDocument(
          stageId,
          subtaskId,
          "design-explanation",
          "Design Explanation",
        );
      }

      function openStoredPdf(
        projectId,
        subtaskId,
        outputIndex,
        pdfKind = "calculation",
      ) {
        if (pdfKind === "boqwithprice" && !isAdmin()) {
          alert("Only Administrator can view BOQwithprice.");
          return;
        }
        const project = state.projects.find((item) => item.id === projectId);
        if (!project) return;
        const stage = project.stages.find(
          (item) => item.id === "requirement-engineering",
        );
        const subtask = stage
          ? stage.subtasks.find((item) => item.id === subtaskId)
          : null;
        const output =
          subtask && subtask.data.calculationOutputs
            ? subtask.data.calculationOutputs[outputIndex]
            : null;
        let pdfDataUri =
          pdfKind === "boqwithprice"
            ? output && (output.boqWithPricePdfDataUri || output.boqPdfDataUri)
            : pdfKind === "boq"
              ? output && output.boqPdfDataUri
              : output && output.pdfDataUri;
        if (output && output.systemValue === "gas-chlorinator") {
          const regenerated =
            output.structured ||
            collectGasChlorinationOutputFromHtml(output.html);
          if (regenerated && regenerated.calculationSections.length) {
            output.structured = regenerated;
            output.pdfDataUri = createPdfDataUri(
              `${subtask.name} - Gas Chlorinator Calculation Output`,
              buildTablePdfText(regenerated.calculationSections),
            );
            const boqWithoutPriceSections = createBoqWithoutPriceSections(
              regenerated.boqSections,
            );
            output.boqPdfDataUri = boqWithoutPriceSections.length
              ? createBoqWithoutPricePdfDataUri(
                  boqWithoutPriceSections,
                  buildBoqProjectInfo(project),
                )
              : "";
            output.boqWithPricePdfDataUri = regenerated.boqSections.length
              ? createBoqWithPricePdfDataUri(
                  regenerated.boqSections,
                  buildBoqProjectInfo(project),
                )
              : "";
            pdfDataUri =
              pdfKind === "boqwithprice"
                ? output.boqWithPricePdfDataUri
                : pdfKind === "boq"
                  ? output.boqPdfDataUri
                  : output.pdfDataUri;
            persistAppStateSoon();
          }
        }
        if (!output || !pdfDataUri) {
          alert("PDF output is not available.");
          return;
        }
        document.getElementById("utilityModalTitle").textContent =
          `${project.name} - ${subtask.name} ${pdfKind === "boqwithprice" ? "BOQwithprice" : pdfKind === "boq" ? "BOQ" : "Calculation"} PDF`;
        document.getElementById("utilityModalBody").innerHTML = `
                <p class="helper-note">View only PDF stored at Supabase Storage &gt; calculation-pdfs &gt; ${escapeHtml(project.id)} &gt; ${escapeHtml(subtask.id)}.</p>
                <iframe class="pdf-viewer-frame" src="${escapeAttr(pdfDataUri)}"></iframe>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function openStoredProjectDocumentPdf(projectId, subtaskId, pdfKind) {
        const project = state.projects.find((item) => item.id === projectId);
        if (!project) return;
        let subtask = null;
        (project.stages || []).forEach((stage) => {
          const found = (stage.subtasks || []).find(
            (item) => item.id === subtaskId,
          );
          if (found) subtask = found;
        });
        if (!subtask) return;
        const pdfDataUri =
          pdfKind === "quotation"
            ? subtask.data.quotationPdfDataUri
            : subtask.data.aiPdfDataUri;
        if (!pdfDataUri) {
          alert("PDF output is not available.");
          return;
        }
        document.getElementById("utilityModalTitle").textContent =
          `${project.name} - ${subtask.name} PDF`;
        document.getElementById("utilityModalBody").innerHTML = `
                <iframe class="pdf-viewer-frame" src="${escapeAttr(pdfDataUri)}"></iframe>
              `;
        document.getElementById("utilityModal").classList.add("active");
      }

      function downloadStoredPdf(projectId, subtaskId, outputIndex) {
        openStoredPdf(projectId, subtaskId, outputIndex);
      }

      function getCalendarEvents() {
        const events = [];
        state.projects.forEach((project) => {
          const meetingSubtask = getMeetingSubtask(project);
          const visitSubtask = getVisitSubtask(project);

          (meetingSubtask && meetingSubtask.data.meets
            ? meetingSubtask.data.meets
            : []
          ).forEach((meet, index) => {
            if (!meet.scheduledDate) return;
            events.push({
              type: "Meeting",
              title: `${project.name} - Meet ${index + 1}`,
              date: meet.scheduledDate,
              time: meet.scheduledTime || "",
              link: meet.meetLink || "",
              attendees: (meet.attendees || [])
                .map(getEmployeeName)
                .filter(Boolean),
            });
          });

          (visitSubtask && visitSubtask.data.visits
            ? visitSubtask.data.visits
            : []
          ).forEach((visit, index) => {
            if (!visit.visitDate) return;
            events.push({
              type: "Site Visit",
              title: `${project.name} - Visit ${index + 1}`,
              date: visit.visitDate,
              time: visit.visitTime || "",
              link: visit.locationLink || "",
              attendees: (visit.attendees || [])
                .map(getEmployeeName)
                .filter(Boolean),
            });
          });
        });

        return events.sort((a, b) =>
          `${a.date}T${a.time || "00:00"}`.localeCompare(
            `${b.date}T${b.time || "00:00"}`,
          ),
        );
      }

      function getHolidayEvents() {
        return INDIA_HOLIDAYS_2026.map((holiday) => ({
          type: "Holiday",
          title: holiday.name,
          date: holiday.date,
          time: "",
          link: "",
          attendees: [],
          holiday: true,
        }));
      }

      function isReminderEvent(event) {
        if (!event.date || !event.time) return false;
        const eventTime = new Date(`${event.date}T${event.time}`);
        const now = new Date();
        const diff = eventTime.getTime() - now.getTime();
        return diff <= 60 * 60 * 1000 && diff >= -24 * 60 * 60 * 1000;
      }

      function renderEventList(events, emptyTitle, emptyText) {
        if (!events.length) {
          return `<div class="empty-state"><h3>${emptyTitle}</h3><p>${emptyText}</p></div>`;
        }
        return `
                <div class="event-list">
                  ${events
                    .map(
                      (event) => `
                        <div class="event-row">
                          <div>
                            <h4>${escapeHtml(event.title)}</h4>
                            <p class="helper-note">${escapeHtml(event.type)}${event.attendees.length ? " | " + escapeHtml(event.attendees.join(", ")) : ""}</p>
                            ${event.link ? `<p class="helper-note">Link: ${escapeHtml(event.link)}</p>` : ""}
                          </div>
                          <div class="event-date">${escapeHtml(event.date)} ${escapeHtml(event.time || "")}</div>
                        </div>
                      `,
                    )
                    .join("")}
                </div>
              `;
      }

      function openUtilityModal(kind) {
        state.activeUtilityModal = kind;
        const events = getCalendarEvents();
        const visibleEvents =
          kind === "reminders" ? events.filter(isReminderEvent) : events;
        document.getElementById("utilityModalTitle").textContent =
          kind === "reminders" ? "Reminders" : "Calendar";
        document.getElementById("utilityModalBody").innerHTML =
          kind === "reminders"
            ? renderEventList(
                visibleEvents,
                "No reminders due",
                "Meeting and site visit reminders appear here one hour before the scheduled date and time.",
              )
            : renderCalendar();
        document.getElementById("utilityModal").classList.add("active");
      }

      function renderCalendar() {
        const [year, month] = state.calendarDate.split("-").map(Number);
        const monthIndex = month - 1;
        const monthStart = new Date(year, monthIndex, 1);
        const start = new Date(monthStart);
        start.setDate(start.getDate() - start.getDay());
        const todayKey = getLocalDateKey(new Date());
        const allEvents = [...getHolidayEvents(), ...getCalendarEvents()];
        const monthName = monthStart.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const days = [];

        for (let index = 0; index < 42; index += 1) {
          const date = new Date(start);
          date.setDate(start.getDate() + index);
          const dateKey = getLocalDateKey(date);
          const dayEvents = allEvents.filter((event) => event.date === dateKey);
          days.push(`
                  <div class="calendar-day ${date.getMonth() === monthIndex ? "" : "muted"} ${dateKey === todayKey ? "today" : ""}">
                    <div class="day-number">${date.getDate()}</div>
                    ${dayEvents
                      .map(
                        (event) =>
                          `<span class="calendar-chip ${event.holiday ? "holiday" : ""}" title="${escapeAttr(event.title)}">${escapeHtml(event.time ? event.time + " " + event.title : event.title)}</span>`,
                      )
                      .join("")}
                  </div>
                `);
        }

        return `
                <div class="calendar-shell">
                  <div class="calendar-toolbar">
                    <button class="icon-btn" type="button" onclick="changeCalendarMonth(-1)">&lt;</button>
                    <div class="calendar-title">${escapeHtml(monthName)}</div>
                    <button class="icon-btn" type="button" onclick="changeCalendarMonth(1)">&gt;</button>
                  </div>
                  <div class="calendar-grid">
                    ${weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`).join("")}
                    ${days.join("")}
                  </div>
                </div>
              `;
      }

      function changeCalendarMonth(delta) {
        const [year, month] = state.calendarDate.split("-").map(Number);
        const next = new Date(year, month - 1 + delta, 1);
        state.calendarDate = getLocalMonthKey(next);
        if (state.activeUtilityModal === "calendar") {
          document.getElementById("utilityModalBody").innerHTML =
            renderCalendar();
        }
      }

      function closeUtilityModal() {
        state.activeUtilityModal = null;
        document.getElementById("utilityModal").classList.remove("active");
      }

      function getPersistableState() {
        return {
          enquiry: state.enquiry,
          employeeDraft: state.employeeDraft,
          enquiries: state.enquiries,
          employees: state.employees,
          projects: state.projects,
          currentProjectId: state.currentProjectId,
          calendarDate: state.calendarDate,
        };
      }

      function applyPersistedState(data) {
        if (!data || typeof data !== "object") return;
        state.enquiry = data.enquiry || clone(ENQUIRY_TEMPLATE);
        state.employeeDraft = data.employeeDraft || clone(EMPLOYEE_TEMPLATE);
        state.enquiries = Array.isArray(data.enquiries) ? data.enquiries : [];
        state.employees = Array.isArray(data.employees) ? data.employees : [];
        state.projects = Array.isArray(data.projects) ? data.projects : [];
        state.currentProjectId = data.currentProjectId || null;
        state.calendarDate = data.calendarDate || getLocalMonthKey(new Date());
        state.projects.forEach((project) => {
          state.currentProjectId = project.id;
          syncProposalStageTasks(project);
          syncDesignCalculationTasks();
          syncGenerateDocumentTasks();
        });
        state.currentProjectId = data.currentProjectId || null;
      }

      async function loadPersistedState() {
        try {
          const response = await fetch("/api/state", { cache: "no-store" });
          if (!response.ok) return;
          const data = await response.json();
          applyPersistedState(data);
        } catch (error) {
          console.warn("Saved app state could not be loaded.", error);
        }
      }

      function ensureDefaultAdminUser() {
        if (!Array.isArray(state.employees)) {
          state.employees = [];
        }
        const hasAdmin = state.employees.some(
          (employee) => employee.designation === "Administrator",
        );
        if (!hasAdmin && state.employees.length === 0) {
          state.employees.push({
            id: "setup-admin",
            employeeId: "setup-admin",
            name: "Setup Administrator",
            loginPass: "setup-admin",
            designation: "Administrator",
            email: "",
            documents: [],
          });
        }
      }

      function persistAppStateSoon() {
        clearTimeout(persistTimer);
        persistTimer = setTimeout(persistAppState, 350);
      }

      async function persistAppState() {
        try {
          await fetch("/api/state", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getPersistableState()),
          });
        } catch (error) {
          console.warn("App state was not persisted.", error);
        }
      }

      async function initializeApp() {
        if (window.__rsvpAppInitialized) return;
        window.__rsvpAppInitialized = true;
        await loadPersistedState();
        ensureDefaultAdminUser();
        renderEnquiryDrawer();
        renderEmployeeDrawer();
        renderDashboard();
        renderDatabase();
        renderMenuViews();
        refreshDatabaseTree();
        showLoginScreen("");
      }

      async function refreshDatabaseTree() {
        const box = document.getElementById("databaseTreeBox");
        if (!box) return;
        try {
          const res = await fetch("/api/database/tree", { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          const tree = await res.json();
          box.innerHTML = renderTreeHtml(tree, 0);
        } catch (e) {
          box.textContent = "Storage unavailable: " + e.message;
        }
      }

      function renderTreeHtml(node, depth) {
        if (!node) return "";
        const pad = "&nbsp;".repeat(depth * 2);
        if (node.type === "file") {
          return `<div>${pad}- ${escapeHtml(node.name)}</div>`;
        }
        const head = `<div>${pad}[${escapeHtml(node.name)}]</div>`;
        const kids = (node.children || [])
          .slice(0, 60)
          .map((c) => renderTreeHtml(c, depth + 1))
          .join("");
        return head + kids;
      }

      Object.assign(window, {
        addRepeaterItem,
        backToDashboard,
        changeCalendarMonth,
        closeDrawers,
        closeSubtaskModal,
        closeUtilityModal,
        connectDatabaseFolder,
        confirmCreateProjectFromSavedEnquiry,
        createProjectFromSavedEnquiry,
        refreshDatabaseTree,
        downloadStoredPdf,
        editEmployee,
        getProposalDocuments,
        handleEmployeeFile,
        handleEnquiryFile,
        handleRepeaterFile,
        handleTaskFile,
        generateDesignExplanation,
        generateAiDocument,
        generateQuotationPdf,
        previewDesignReport,
        saveDesignReportPdf,
        openDesignReportPdf,
        getGeneratedDocument,
        loginUser,
        logoutUser,
        openCalculationPage,
        openExternalLink,
        openMeetingDetails,
        openProjectDashboard,
        openStoredPdf,
        openStoredProjectDocumentPdf,
        openSubtaskModal,
        openEnquiryDetails,
        openVisitDetails,
        openUtilityModal,
        removeRepeaterItem,
        resetEmployeeDraft,
        resetEnquiry,
        saveCalculationOutput,
        saveEmployee,
        saveMomPdf,
        saveProposalDocuments,
        saveSubtask,
        selectProject,
        setCalculationSystem,
        setDocumentRequest,
        setEmployeeDraftField,
        setCostingSystemPrice,
        setEnquiryStatus,
        setEnquiryField,
        setPrePostSystem,
        setProposalDocumentContent,
        setRepeaterField,
        setRequirementTaskAssignee,
        setTaskField,
        showStageDetail,
        startProjectCreationFromEnquiry,
        submitEnquiry,
        switchView,
        toggleEmployeeDrawer,
        toggleEnquiryDrawer,
        toggleRepeaterEmployeeSelection,
        toggleSubtask,
        toggleSystemRequirement,
      });

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeApp);
      } else {
        initializeApp();
      }
      window.addEventListener("load", initializeApp);

      document
        .getElementById("subtaskModal")
        .addEventListener("click", (event) => {
          if (event.target.id === "subtaskModal") {
            closeSubtaskModal();
          }
        });

      document
        .getElementById("utilityModal")
        .addEventListener("click", (event) => {
          if (event.target.id === "utilityModal") {
            closeUtilityModal();
          }
        });

      window.addEventListener("message", (event) => {
        if (!event.data || event.data.type !== "calculation-output") return;
        saveCalculationOutputPayload(event.data);
      });
