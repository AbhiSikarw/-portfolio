import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const logo = "/dpt-logo.png";

const navGroups = [
  { title: "OVERVIEW", items: [["dashboard","Executive Overview","⌂"]] },
  { title: "AI & MACHINE LEARNING", items: [
    ["ai","AI & ML Hub","✦"],["chat","AI Assistant","◉"],["data","Data Processing","▦"],["maintenance","Predictive Maintenance","◈"]
  ]},
  { title: "ENERGY SOLUTIONS", items: [
    ["energy","Energy Management","⚡"],["driving","Energy Efficient Driving","◌"]
  ]},
  { title: "ENTERPRISE SOLUTIONS", items: [
    ["automation","Process Automation","⇄"],["erp","ERP Solution","▤"],["crm","CRM Solution","◎"]
  ]},
  { title: "SOFTWARE & CLOUD", items: [
    ["web","Website Development","▣"],["mobile","Mobile Applications","▯"],["integration","System Integration","⌘"],["cloud","Cloud Solutions","☁"],["custom","Custom Software","◇"]
  ]},
  { title: "EXPLORE", items: [["ecosystem","Technology Ecosystem","✺"],["about","About & Contact","◆"]] }
];

const services = [
  ["ai","AI & Machine Learning","Enterprise AI models for predictive analytics, neural reasoning, and operational optimization.","AI / ML","https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"],
  ["data","Data Processing","High-throughput pipelines transforming raw operational streams into clean, validated intelligence.","Data Engine","https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85"],
  ["maintenance","Predictive Maintenance","Continuous vibration & thermal telemetry to predict equipment failure before downtime occurs.","Predictive IoT","https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=85"],
  ["energy","Energy Management","Smart grid telemetry, automated peak-load shifting, power factor tuning and renewable storage.","Clean Energy","https://images.unsplash.com/photo-1508791290064-c27cc1ef7a9a?auto=format&fit=crop&w=1200&q=85"],
  ["driving","Energy Efficient Driving","Telemetry analytics and AI guidance for EV fleet battery optimization and driver efficiency.","Mobility AI","https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"],
  ["automation","Enterprise Automation","Straight-through robotic workflow orchestration eliminating manual handoffs across departments.","RPA / Workflow","https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&w=1200&q=85"],
  ["erp","ERP Solutions","Unified operations command center managing inventory buffers, manufacturing schedules, and orders.","Enterprise ERP","https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"],
  ["crm","CRM Solutions","Customer lifecycle platform tracking deal velocity, sales stages, and executive follow-up cadences.","Revenue CRM","https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"],
  ["web","Website Development","High-performance web applications, enterprise portals, and high-concurrency digital platforms.","Web Platforms","https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"],
  ["mobile","Mobile Applications","Native and responsive mobile apps for field operations, warehouse dispatch, and executive approvals.","Mobile Apps","https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85"],
  ["integration","System Integration","Unified integration architecture connecting legacy ERPs, CRMs, APIs, cloud microservices and IoT.","API & Integration","https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"],
  ["cloud","Cloud Solutions","Scalable cloud architecture designed for multi-region resilience, observability, and sub-second APIs.","Cloud Native","https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85"],
];

const itServices = [
  {
    id: "ai",
    name: "AI & Machine Learning Engineering",
    category: "ai",
    categoryName: "AI & Data Engineering",
    desc: "Production deep learning, neural predictive models, computer vision, and LLM orchestration built for high-throughput enterprise inference.",
    tech: ["PyTorch", "Python", "CUDA", "TensorRT", "FastAPI"],
    deliverables: "Model Training, Low-Latency API Inference, Anomaly Detection",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    icon: "✦"
  },
  {
    id: "data",
    name: "Big Data & Ingestion Pipelines",
    category: "ai",
    categoryName: "AI & Data Engineering",
    desc: "High-throughput streaming pipelines transforming heterogeneous enterprise records into validated, real-time analytics data lakes.",
    tech: ["Apache Kafka", "Spark", "PostgreSQL", "Parquet", "Python"],
    deliverables: "ETL / ELT Pipelines, Schema Normalization, 3-Sigma Anomaly Isolation",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    icon: "▦"
  },
  {
    id: "cloud",
    name: "Cloud Native Architecture & DevOps",
    category: "cloud",
    categoryName: "Cloud & DevOps",
    desc: "Multi-region cloud infrastructure designed for 99.99% availability, automated horizontal scaling, container orchestration, and 24/7 SLA.",
    tech: ["AWS", "Kubernetes (EKS)", "Terraform", "Docker", "Prometheus"],
    deliverables: "Zero-Downtime CI/CD, Multi-Region Failover, Cloud Cost Optimization",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
    icon: "☁"
  },
  {
    id: "integration",
    name: "System Integration & Enterprise API Fabric",
    category: "cloud",
    categoryName: "Cloud & DevOps",
    desc: "Asynchronous integration fabric connecting legacy ERPs, CRMs, microservices, cloud data lakes, and third-party partner APIs.",
    tech: ["Kong API Gateway", "GraphQL", "RabbitMQ", "Kafka", "mTLS"],
    deliverables: "Zero-Data-Loss Queues, Sub-second API Latency, Secure mTLS Handshakes",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    icon: "⌘"
  },
  {
    id: "automation",
    name: "Enterprise Process Automation (RPA)",
    category: "enterprise",
    categoryName: "Enterprise Software & ERP",
    desc: "Straight-through robotic workflow orchestration eliminating manual data entry, human verification bottlenecks, and approval latency.",
    tech: ["Camunda", "Python RPA", "OCR Vision", "Webhook Gateway"],
    deliverables: "84% Cycle Time Reduction, 99.7% Accuracy, Immutable Audit Trail",
    image: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&w=1200&q=85",
    icon: "⇄"
  },
  {
    id: "erp",
    name: "Integrated Enterprise ERP Systems",
    category: "enterprise",
    categoryName: "Enterprise Software & ERP",
    desc: "Unified operations command center connecting warehouse inventory buffers, factory batch scheduling, procurement, and workforce.",
    tech: ["PostgreSQL", "Node.js", "Redis", "REST/GraphQL", "Docker"],
    deliverables: "Safety Threshold Reorder Logic, Production MRP, Dispatch Logistics",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    icon: "▤"
  },
  {
    id: "crm",
    name: "Revenue Operations & CRM Platforms",
    category: "enterprise",
    categoryName: "Enterprise Software & ERP",
    desc: "Customer lifecycle platform tracking deal velocity, sales stages, BANT qualification criteria, and automated executive follow-up cadences.",
    tech: ["React", "TypeScript", "Prisma ORM", "WebSocket", "Tailwind"],
    deliverables: "Pipeline Velocity Acceleration, Lead Scoring Matrix, Real-Time Forecasts",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    icon: "◎"
  },
  {
    id: "web",
    name: "Custom Web Application & Portal Engineering",
    category: "software",
    categoryName: "Custom Web & Mobile",
    desc: "High-performance enterprise web applications, client portals, and omnichannel digital commerce platforms with sub-second page loads.",
    tech: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "GraphQL"],
    deliverables: "99/100 Lighthouse Web Vitals, Edge CDN, WCAG 2.1 AA Accessibility",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
    icon: "▣"
  },
  {
    id: "mobile",
    name: "Enterprise Mobile App Development",
    category: "software",
    categoryName: "Custom Web & Mobile",
    desc: "High-performance native and cross-platform mobile apps for field engineers, warehouse logistics tracking, and executive approvals.",
    tech: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"],
    deliverables: "Offline-First Synchronization, Push Notifications, Biometric Auth",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85",
    icon: "▯"
  },
  {
    id: "maintenance",
    name: "Predictive IoT & Asset Diagnostics",
    category: "iot",
    categoryName: "Smart IoT & Clean Energy",
    desc: "Continuous vibration spectral telemetry, thermal monitoring, and acoustic analysis preventing catastrophic machinery breakdown.",
    tech: ["MQTT", "Edge IoT", "Signal Processing", "Time-Series DB"],
    deliverables: "Spectral FFT Analysis, Remaining Useful Life (RUL), Automated Work-Orders",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=85",
    icon: "◈"
  },
  {
    id: "energy",
    name: "Industrial Energy & Smart Grid SCADA",
    category: "iot",
    categoryName: "Smart IoT & Clean Energy",
    desc: "Real-time substation telemetry, automated peak-load shifting, battery storage optimization, and power factor tuning across industrial zones.",
    tech: ["SCADA", "Modbus", "Solar PV APIs", "Power Analytics"],
    deliverables: "0.98 Power Factor Tuning, Peak-Shaving Algorithms, ESG Audit Reporting",
    image: "https://images.unsplash.com/photo-1508791290064-c27cc1ef7a9a?auto=format&fit=crop&w=1200&q=85",
    icon: "⚡"
  },
  {
    id: "driving",
    name: "Mobility & EV Telematics AI",
    category: "iot",
    categoryName: "Smart IoT & Clean Energy",
    desc: "Vehicle telematics analytics and driver behavior models optimizing fleet battery life and regenerative braking recovery.",
    tech: ["CAN Bus", "GPS Telemetry", "Battery BMS", "React Native"],
    deliverables: "Kinetic Energy Recovery, Fleet Charge Arbitrage, Driver Safety Scoring",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
    icon: "◌"
  }
];

const machineRows = [
  ["M-101","92%","64°C","Normal","Normal","8%","Healthy"],
  ["M-102","61%","82°C","High","Increasing","72%","Warning"],
  ["M-103","38%","94°C","Very High","High","87%","Critical"],
  ["M-104","84%","68°C","Normal","Normal","16%","Healthy"],
];

function Icon({children}) { return <span className="icon">{children}</span>; }

// --- Predefined AI Conversations for the 3 Interactive Options ---
const conversationThreads = [
  {
    id: 0,
    title: "Business Intelligence & KPIs",
    subtitle: "Enterprise Throughput & Metrics",
    time: "Live Session",
    badge: "Analytics",
    messages: [
      { role: "ai", text: "Welcome to DPT AI Business Intelligence Assistant. I am monitoring operational throughput across ERP, CRM, and cloud pipelines. How can I assist your executive review?" },
      { role: "user", text: "Summarize current operational throughput and revenue pipeline." },
      { role: "ai", text: "Across active modules, total processed records reached 2,450 with 96% data quality. In CRM, 19 enterprise opportunities are active totaling ₹15.35L in pipeline value with a 14.2% qualified win-rate. Three workflow bottlenecks were automatically resolved in finance reconciliation." }
    ],
    context: {
      dataset: "Enterprise ERP & CRM Stream",
      signals: "Revenue • Throughput • Bottlenecks",
      status: "Optimal (99.98% SLA)",
      bars: [45, 62, 58, 84, 76, 92]
    }
  },
  {
    id: 1,
    title: "Energy & Grid Telemetry",
    subtitle: "Real-Time Substation & Renewables",
    time: "Active Telemetry",
    badge: "Clean Energy",
    messages: [
      { role: "ai", text: "DPT Energy AI Engine online. Monitoring 18,450 kWh total facility demand, substation power factor (0.98 pf), and renewable generation split." },
      { role: "user", text: "Analyze energy consumption trends and peak tariff exposure." },
      { role: "ai", text: "Facility power factor is optimal at 0.98 pf with zero utility penalty. Renewable integration provides 60% of total demand (Solar PV: 42%, Battery BESS: 18%). Alert: Industrial Motor B experienced a 28% load surge during peak tariff hours (14:00-16:00). Recommendation: Implement automated 45-minute start offset to save an estimated ₹42,000/month." }
    ],
    context: {
      dataset: "Substation SCADA & Smart Meters",
      signals: "Grid Load • Solar PV • Power Factor",
      status: "60% Renewable Mix",
      bars: [35, 48, 72, 65, 88, 54]
    }
  },
  {
    id: 2,
    title: "Predictive Machine Health",
    subtitle: "IoT Telemetry & Risk Scoring",
    time: "Continuous IoT",
    badge: "Asset Health",
    messages: [
      { role: "ai", text: "Predictive Maintenance telemetry active. Scanning vibration spectral patterns, temperature sensors, and current loads across 24 monitored industrial assets." },
      { role: "user", text: "Check vibration and temperature anomalies across monitored assets." },
      { role: "ai", text: "Status summary: 17 assets Healthy, 5 in Warning, 2 Critical. Warning on Machine M-102: Bearing vibration increased by 18% over baseline with housing temperature at 82°C. Remaining Useful Life (RUL) estimated at ~48 operational hours before failure risk exceeds 90%. Automated preventative work-order #WO-419 has been scheduled." }
    ],
    context: {
      dataset: "Edge IoT Vibration & Thermal Sensors",
      signals: "Asset Health • Vibration • Temp",
      status: "2 Assets Flagged",
      bars: [28, 35, 52, 68, 75, 42]
    }
  }
];

function App() {
  const [logged, setLogged] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Chatbot State with 3 distinct interactive conversation options
  const [activeConv, setActiveConv] = useState(0);
  const [convStore, setConvStore] = useState(conversationThreads);
  const [chatInput, setChatInput] = useState("");

  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [automationRunning, setAutomationRunning] = useState(false);
  const [automationStep, setAutomationStep] = useState(-1);
  const [activeMachine, setActiveMachine] = useState(null);
  const [erpTab, setErpTab] = useState("dashboard");
  const [crmStage, setCrmStage] = useState(0);
  const [mobileScreen, setMobileScreen] = useState("Dashboard");
  const [connections, setConnections] = useState({ERP:true,CRM:true,Analytics:true,"External Service":true});

  useEffect(()=>{ if(!toast) return; const t=setTimeout(()=>setToast(""),2800); return ()=>clearTimeout(t)},[toast]);
  useEffect(()=>{ const f=()=>setModal(null); window.addEventListener("dpt-close-modal",f); return()=>window.removeEventListener("dpt-close-modal",f)},[]);
  useEffect(()=>{
    if(!automationRunning) return;
    if(automationStep < 5) {
      const t=setTimeout(()=>setAutomationStep(s=>s+1),650);
      return ()=>clearTimeout(t);
    }
    const t=setTimeout(()=>{setAutomationRunning(false); setToast("Workflow orchestrated & executed successfully");},650);
    return ()=>clearTimeout(t);
  },[automationRunning,automationStep]);

  const go = (p)=>{ setPage(p); setSidebarOpen(false); window.scrollTo({top:0,behavior:"smooth"}); };
  const action = (msg)=>setToast(msg);

  const handleAskInChat = (prompt) => {
    const answers = {
      "ANALYZE ENERGY LOAD": "Current facility load is 18,450 kWh. Power factor is maintained at 0.98 pf. Peak-shaving on Motor B is projected to reduce monthly tariff charges by ₹42,000.",
      "CHECK MACHINE HEALTH": "Asset M-102 is flagged with elevated bearing vibration (82°C housing temp, 72% failure risk). Maintenance work-order #WO-419 has been created.",
      "SUMMARIZE THROUGHPUT": "The platform has validated 2,386 out of 2,450 records (96% data quality). Cross-system integration between ERP and CRM is operating at sub-second latency.",
      "OPTIMIZE GRID LOAD": "Automated dispatch recommendation: Charge BESS storage during off-peak night hours (₹4.20/kWh) and discharge during peak hours (14:00-18:00) to maximize tariff savings.",
      "EXPLAIN PIPELINE VELOCITY": "CRM pipeline holds 19 active enterprise deals valued at ₹15.35L. Deal conversion velocity has accelerated by 24% following workflow automation rollout."
    };

    const reply = answers[prompt] || `AI telemetry response for query: "${prompt}". Operational indicators across the enterprise cluster are functioning within nominal parameters. Real-time telemetry is synchronized.`;

    setConvStore(prev => {
      const updated = [...prev];
      const target = { ...updated[activeConv] };
      target.messages = [
        ...target.messages,
        { role: "user", text: prompt },
        { role: "ai", text: reply }
      ];
      updated[activeConv] = target;
      return updated;
    });
  };

  const handleNewConversation = () => {
    const newId = convStore.length;
    const newThread = {
      id: newId,
      title: `Executive Session #${newId + 1}`,
      subtitle: "Custom Intelligence Review",
      time: "Just Now",
      badge: "Custom",
      messages: [
        { role: "ai", text: "New intelligent query session initialized. How can I assist with your architecture, energy analysis, or enterprise workflows?" }
      ],
      context: {
        dataset: "Unified Operations Stream",
        signals: "Custom Analysis Session",
        status: "Ready",
        bars: [50, 60, 45, 70, 80, 65]
      }
    };
    setConvStore(prev => [...prev, newThread]);
    setActiveConv(newId);
    setToast("New AI conversation session started");
  };

  return <div className="app">
    <Sidebar page={page} go={go} open={sidebarOpen} close={()=>setSidebarOpen(false)} />
    <main className="main">
      <Topbar page={page} onMenu={()=>setSidebarOpen(true)} go={go} />
      <div className="content">
        {page==="dashboard" && <Dashboard go={go} />}
        {page==="ai" && <AIHub go={go} />}
        {page==="chat" && (
          <Chatbot 
            activeConv={activeConv} 
            setActiveConv={setActiveConv} 
            convStore={convStore} 
            input={chatInput} 
            setInput={setChatInput} 
            ask={handleAskInChat} 
            onNewChat={handleNewConversation}
          />
        )}
        {page==="data" && <DataProcessing processing={processing} setProcessing={setProcessing} processed={processed} setProcessed={setProcessed} action={action} />}
        {page==="maintenance" && <Maintenance openMachine={(m)=>setActiveMachine(m)} />}
        {page==="energy" && <Energy report={()=>setModal("energyReport")} />}
        {page==="driving" && <Driving report={()=>setModal("drivingReport")} />}
        {page==="automation" && <Automation running={automationRunning} step={automationStep} run={()=>{setAutomationRunning(true);setAutomationStep(0)}} action={action} />}
        {page==="erp" && <ERP tab={erpTab} setTab={setErpTab} action={action} />}
        {page==="crm" && <CRM stage={crmStage} setStage={setCrmStage} modal={modal} setModal={setModal} action={action} />}
        {page==="web" && <WebDemo open={()=>setModal("webDemo")} />}
        {page==="mobile" && <Mobile screen={mobileScreen} setScreen={setMobileScreen} />}
        {page==="integration" && <Integration connections={connections} setConnections={setConnections} />}
        {page==="cloud" && <Cloud />}
        {page==="custom" && <Custom open={()=>setModal("lifecycle")} />}
        {page==="ecosystem" && <Ecosystem go={go} />}
        {page==="about" && <About go={go} />}
      </div>
    </main>
    {toast && <div className="toast"><span>✓</span>{toast}</div>}
    {activeMachine && <MachineModal machine={activeMachine} close={()=>setActiveMachine(null)} />}
    {modal==="energyReport" && <EnergyReportModal close={()=>setModal(null)} action={action} />}
    {modal==="drivingReport" && <Modal title="EV Fleet Telemetry Report"><div className="report"><b>Fleet Asset EV-102 • Telemetry Audit</b><p>Overall Efficiency Index: 84% (18.2 kWh/100 km)</p><p>Regenerative Braking Utilization: 76% efficiency</p><p>Primary Opportunity: Smooth acceleration profiles reduce battery thermal stress by 14%.</p></div><button className="btn primary" onClick={()=>{setModal(null);action("Driving report generated successfully")}}>Close Audit</button></Modal>}
    {modal==="webDemo" && <WebModal close={()=>setModal(null)} />}
    {modal==="followup" && <Modal title="Schedule Executive Follow-up"><div className="form-grid"><input placeholder="Date" type="date"/><input placeholder="Time" type="time"/><input placeholder="Executive Owner" defaultValue="Senior Technology Consultant"/><input placeholder="Meeting Objectives" defaultValue="Technical Architecture & Enterprise Integration Review"/></div><button className="btn primary" onClick={()=>{setModal(null);action("Executive follow-up scheduled successfully")}}>CONFIRM SCHEDULE</button></Modal>}
    {modal==="lifecycle" && <Modal title="Custom Software Delivery Lifecycle"><div className="lifecycle">{["Requirements Engineering","Solution Architecture","UI/UX Design Systems","Frontend Engineering","Microservices Backend","Distributed Database","API Gateway","Automated Testing","CI/CD Deployment","Production Monitoring"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b>{x}</div>)}</div><button className="btn primary" onClick={()=>setModal(null)}>Done</button></Modal>}
  </div>;
}

function Sidebar({page,go,open,close}) {
  return <aside className={"sidebar "+(open?"mobile-open":"")}>
    <div className="brand">
      <img src={logo} alt="DPT Technologies" />
      <button className="close-side" onClick={close}>×</button>
    </div>
    <div className="brand-name">TECHNOLOGY SOLUTIONS HUB</div>
    <nav>
      {navGroups.map(g=><div className="nav-group" key={g.title}>
        <div className="nav-title">{g.title}</div>
        {g.items.map(([id,label,ic])=><button key={id} className={"nav-item "+(page===id?"active":"")} onClick={()=>go(id)}>
          <Icon>{ic}</Icon>
          <span>{label}</span>
          {id==="dashboard" && <em className="live-pill">LIVE</em>}
        </button>)}
      </div>)}
    </nav>
    <div className="side-footer">
      <div className="mini-status"><i className="pulse-dot"></i> ENTERPRISE SUITE ACTIVE</div>
      <div className="side-contact">
        <a href="mailto:dpttechnologiespvtltd@gmail.com">dpttechnologiespvtltd@gmail.com</a>
        <a href="tel:+917065300376">+91 70653 00376</a>
        <span>SPAZE I–TECH PARK, Sector 49, Gurgaon, Haryana</span>
      </div>
      <div className="side-version">DPT HUB v4.0 • Enterprise Edition</div>
    </div>
  </aside>;
}

function Topbar({page,onMenu,go}) {
  const title = navGroups.flatMap(g=>g.items).find(x=>x[0]===page)?.[1] || "Overview";
  return <header className="topbar">
    <button className="hamb" onClick={onMenu}>☰</button>
    <div className="crumb">DPT TECHNOLOGIES <span>/</span> {title}</div>
    <div className="top-actions">
      <div className="search">⌕ <span>Search enterprise solutions...</span></div>
      <div className="top-status-badge">
        <span className="live-dot"></span>
        <span>SYSTEMS OPERATIONAL</span>
      </div>
      <button className="top-cta-btn" onClick={()=>go("about")}>CONTACT ENGINEERING</button>
      <div className="avatar">D</div>
    </div>
  </header>;
}

function PageHead({eyebrow,title,sub,children}) { 
  return <div className="page-head">
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
    {children}
  </div>; 
}

function Kpi({label,value,sub,accent}){
  return <div className={"kpi "+(accent||"")}>
    <div className="kpi-top"><span>{label}</span><span className="kpi-dot"></span></div>
    <strong>{value}</strong>
    {sub && <small>{sub}</small>}
  </div>;
}

// --- Front Page (Dashboard) - Flagship IT & Enterprise Software Engineering Front View ---
function Dashboard({go}) {
  return (
    <div className="front-page-container">
      {/* 1. Flagship Enterprise IT Hero Banner */}
      <section className="it-hero-banner">
        <div className="it-hero-content">
          <div className="it-hero-eyebrow">
            <span className="it-status-dot"></span>
            <span>DPT TECHNOLOGIES • ENTERPRISE IT & SOFTWARE ENGINEERING</span>
          </div>

          <h1 className="it-hero-heading">
            Architecting Scalable Enterprise IT, 
            <span className="it-gradient-text"> Cloud & Next-Gen Software.</span>
          </h1>

          <p className="it-hero-description">
            We partner with growing and global enterprises to architect, build, and deploy mission-critical software solutions, distributed cloud microservices, high-throughput AI pipelines, and intelligent operational automation.
          </p>

          <div className="it-hero-actions">
            <button className="btn primary it-btn-primary" onClick={() => go("ai")}>
              EXPLORE IT SOLUTIONS →
            </button>
            <button className="btn secondary it-btn-secondary" onClick={() => go("cloud")}>
              CLOUD ARCHITECTURE ☁
            </button>
            <button className="btn ghost it-btn-ghost" onClick={() => go("about")}>
              TALK TO ARCHITECTS ↗
            </button>
          </div>

          <div className="it-hero-metrics">
            <div className="it-metric-item">
              <strong>50+</strong>
              <span>Enterprise Systems</span>
            </div>
            <div className="it-metric-divider"></div>
            <div className="it-metric-item">
              <strong>99.99%</strong>
              <span>Cloud Uptime SLA</span>
            </div>
            <div className="it-metric-divider"></div>
            <div className="it-metric-item">
              <strong>&lt; 15ms</strong>
              <span>Edge API Latency</span>
            </div>
            <div className="it-metric-divider"></div>
            <div className="it-metric-item">
              <strong>SOC2 / ISO</strong>
              <span>Security-First</span>
            </div>
          </div>
        </div>

        <div className="it-hero-showcase">
          <div className="it-showcase-card">
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85" 
              alt="Enterprise IT & Server Infrastructure" 
              className="it-showcase-img"
            />
            <div className="it-showcase-overlay"></div>
            <div className="it-showcase-badge">
              <span className="it-pulse-emerald"></span>
              <span>ENTERPRISE CLOUD • SYSTEM ACTIVE</span>
            </div>
            <div className="it-showcase-info">
              <span className="it-showcase-kicker">MISSION-CRITICAL INFRASTRUCTURE</span>
              <h3>High-Concurrency Systems & Microservices</h3>
              <p>Kubernetes • Multi-Region Cloud • Event-Driven Data Streams • Zero Downtime</p>
            </div>
            <div className="it-showcase-stats">
              <div>
                <small>DEPLOYED CODE</small>
                <b>Production v4.2</b>
              </div>
              <div>
                <small>GLOBAL TRAFFIC</small>
                <b className="green-text">142k req/s</b>
              </div>
              <div>
                <small>HEALTH</small>
                <b className="green-text">Optimal 100%</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Solution Portfolio: Full 12 Service Cards with restored preview images */}
      <section className="portfolio-section" id="solution-portfolio">
        <div className="section-title">
          <div>
            <span className="eyebrow">SOLUTION PORTFOLIO</span>
            <h2>What We Build & Engineer</h2>
          </div>
          <span className="muted">12 Core Production Capabilities</span>
        </div>

        <div className="service-grid">
          {services.map(([id, name, desc, tag, image], i) => (
            <button className={"service-card service-card-" + (i % 6)} key={id} onClick={() => go(id)}>
              <div className="service-visual">
                <img src={image} alt={name} loading="lazy" />
                <div className="service-image-shade"></div>
                <span className="service-icon">
                  {id === "energy" ? "⚡" :
                   id === "automation" ? "⇄" :
                   id === "cloud" ? "☁" :
                   id === "mobile" ? "▯" :
                   id === "web" ? "▣" :
                   id === "crm" ? "◎" :
                   id === "ai" ? "✦" :
                   id === "data" ? "▦" :
                   id === "maintenance" ? "◈" :
                   id === "driving" ? "◌" :
                   id === "integration" ? "⌘" : "✺"}
                </span>
              </div>
              <div className="service-tag">{tag}</div>
              <h3>{name}</h3>
              <p>{desc}</p>
              <span className="open-demo">
                <span>EXPLORE SOLUTION</span>
                <b>→</b>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Direct Platform Workspaces / Consoles */}
      <section className="consoles-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">DIRECT PLATFORM WORKSPACES</span>
            <h2>Launch Enterprise Solution Consoles</h2>
          </div>
        </div>
        <div className="quick-grid">
          {[
            ["AI ASSISTANT CONSOLE", "chat", "Intelligent Business Copilot"],
            ["PREDICTIVE MAINTENANCE", "maintenance", "Industrial IoT Telemetry & Diagnostics"],
            ["SMART ENERGY MANAGEMENT", "energy", "Clean Grid & Solar SCADA Optimization"],
            ["ENTERPRISE ERP PLATFORM", "erp", "Operations, Inventory & Manufacturing"],
            ["REVENUE CRM PIPELINE", "crm", "Deals, Velocity & Customer Lifecycle"],
            ["WORKFLOW AUTOMATION", "automation", "Robotic Process Orchestration"]
          ].map(([x, id, sub]) => (
            <button className="quick" key={id} onClick={() => go(id)}>
              <div>
                <span>{x}</span>
                <small>{sub}</small>
              </div>
              <b>↗</b>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- AI Hub ---
function AIHub({go}){
  const cards=[
    ["ENTERPRISE AI ASSISTANT","Natural language business intelligence assistant querying operational data.","chat","https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85"],
    ["INTELLIGENT DATA PROCESSING","Automated anomaly detection, cleaning, validation, and feature engineering.","data","https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"],
    ["CLEAN ENERGY PREDICTIVE MODELS","Machine learning forecasting for grid demand, solar output, and tariff arbitrage.","energy","https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85"],
    ["PREDICTIVE MAINTENANCE IOT","Vibration spectral analysis and thermal monitoring to eliminate unexpected machine breakdown.","maintenance","https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"],
    ["FLEET EFFICIENCY OPTIMIZATION","AI-assisted driving behavior guidance reducing vehicle energy drain and wear.","driving","https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"]
  ];

  return <>
    <PageHead 
      eyebrow="ARTIFICIAL INTELLIGENCE & MACHINE LEARNING" 
      title="Enterprise Intelligence, Prediction & Optimization" 
      sub="Deploy machine learning workflows that transform raw IoT telemetry, customer transactions, and operational signals into autonomous business action."
    />
    <div className="ai-cards">
      {cards.map(([n,d,id,image],i)=>(
        <button className={"ai-card ai-card-"+i} onClick={()=>go(id)} key={n}>
          <div className="ai-card-image">
            <img src={image} alt={n}/>
            <span>PRODUCTION AI</span>
          </div>
          <div className="ai-card-body">
            <span className="num">0{i+1}</span>
            <h3>{n}</h3>
            <p>{d}</p>
            <span>EXPLORE SYSTEM →</span>
          </div>
        </button>
      ))}
    </div>
    <div className="workflow-card">
      <div className="section-title">
        <div>
          <span className="eyebrow">INTELLIGENCE PIPELINE ARCHITECTURE</span>
          <h2>From Raw Operational Data to Autonomous Business Action</h2>
        </div>
      </div>
      <div className="flow">
        {[
          ["DATA INGESTION","▦","Edge IoT & ERP APIs"],
          ["FEATURE PIPELINE","✦","Normalization & Cleaning"],
          ["MODEL INFERENCE","⌁","Neural Classifiers & Transformers"],
          ["PREDICTION","◈","Time-to-Failure & Demand"],
          ["INSIGHT ENGINE","◉","Root-Cause & Recommendations"],
          ["AUTONOMOUS ACTION","✓","Automated Dispatch & Alerts"]
        ].map(([x,icon,desc],i)=>(
          <React.Fragment key={x}>
            <div className="flow-node">
              <b>{icon}</b>
              <span>{x}</span>
              <small>{desc}</small>
            </div>
            {i<5 && <div className="flow-arrow">→</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </>;
}

// --- AI Chatbot with 3 Clickable, Interactive Options ---
function Chatbot({activeConv, setActiveConv, convStore, input, setInput, ask, onNewChat}){
  const currentThread = convStore[activeConv] || convStore[0];

  const send = () => {
    if(!input.trim()) return;
    const q = input;
    setInput("");
    ask(q);
  };

  const quickPrompts = [
    "ANALYZE ENERGY LOAD",
    "CHECK MACHINE HEALTH",
    "SUMMARIZE THROUGHPUT",
    "OPTIMIZE GRID LOAD",
    "EXPLAIN PIPELINE VELOCITY"
  ];

  return <>
    <PageHead 
      eyebrow="ENTERPRISE INTELLIGENCE CONSOLE" 
      title="DPT AI Assistant" 
      sub="Interactive business intelligence assistant with pre-configured operational review threads and live telemetry querying."
    />
    <div className="chat-layout">
      {/* 3 Clickable Options in the Left History Panel */}
      <div className="history panel">
        <div className="panel-head">
          <span>INTELLIGENCE SESSIONS</span>
          <button className="new-chat-btn" onClick={onNewChat} title="Start New Conversation">＋ NEW</button>
        </div>
        <div className="conversations-list">
          {convStore.map((c, i) => (
            <button 
              key={c.id} 
              className={"history-item-btn " + (activeConv === i ? "active" : "")}
              onClick={() => setActiveConv(i)}
            >
              <div className="hib-top">
                <span className="hib-badge">{c.badge}</span>
                <small>{c.time}</small>
              </div>
              <b>{c.title}</b>
              <span>{c.subtitle}</span>
            </button>
          ))}
        </div>
        <div className="history-tip">
          <small>💡 Click any session above to switch context and load detailed operational telemetry.</small>
        </div>
      </div>

      {/* Main Chat Stream */}
      <div className="chat panel">
        <div className="chat-head">
          <div className="bot-avatar">✦</div>
          <div>
            <b>{currentThread.title}</b>
            <small>DPT Enterprise AI Assistant • Active Context: {currentThread.context.dataset}</small>
          </div>
          <span className="status-online"><i className="pulse-dot"></i> Connected</span>
        </div>

        <div className="messages">
          {currentThread.messages.map((m,i)=>(
            <div key={i} className={"msg " + m.role}>
              <div className="msg-bubble">
                <span className="msg-sender">{m.role === "ai" ? "DPT AI Intelligence" : "Executive User"}</span>
                <div className="msg-text">{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="prompts-bar">
          <span className="prompts-label">Suggested Inquiries:</span>
          <div className="prompts">
            {quickPrompts.map(x=>(
              <button key={x} onClick={()=>ask(x)}>{x}</button>
            ))}
          </div>
        </div>

        <div className="chat-input">
          <input 
            value={input} 
            onChange={e=>setInput(e.target.value)} 
            onKeyDown={e=>e.key==="Enter"&&send()} 
            placeholder={`Ask about ${currentThread.title.toLowerCase()} or type a custom query...`}
          />
          <button className="chat-send-btn" onClick={send} title="Send Inquiry">↑</button>
        </div>
      </div>

      {/* Right Context & Insights Panel */}
      <div className="context panel">
        <div className="panel-head">ACTIVE TELEMETRY CONTEXT</div>
        <div className="insight-box">
          <div className="insight">
            <b>Target Data Stream</b>
            <span>{currentThread.context.dataset}</span>
          </div>
          <div className="insight">
            <b>Monitored Parameters</b>
            <span>{currentThread.context.signals}</span>
          </div>
          <div className="insight">
            <b>System State</b>
            <span className="green-text">{currentThread.context.status}</span>
          </div>
        </div>

        <div className="context-visual">
          <span className="cv-title">Signal Spectral Density</span>
          <div className="context-chart">
            {currentThread.context.bars.map((h, i)=>(
              <div key={i} style={{height: h + "%"}} title={`Signal Band ${i+1}: ${h}%`}></div>
            ))}
          </div>
          <div className="cv-labels">
            <span>B-1</span><span>B-2</span><span>B-3</span><span>B-4</span><span>B-5</span><span>B-6</span>
          </div>
        </div>

        <div className="context-footer-card">
          <b>Enterprise Compliance</b>
          <p>End-to-end audit logging enabled with role-based access control.</p>
        </div>
      </div>
    </div>
  </>;
}

// --- Data Processing ---
function DataProcessing({processing,setProcessing,processed,setProcessed,action}){
  const run=()=>{
    setProcessing(true);
    setProcessed(false);
    setTimeout(()=>{
      setProcessing(false);
      setProcessed(true);
      action("Operational dataset processed and validated successfully");
    },2200);
  };

  return <>
    <PageHead 
      eyebrow="DATA PIPELINES & VALIDATION" 
      title="High-Throughput Data Processing Engine" 
      sub="Stream, normalize, and validate heterogeneous data from ERP tables, SCADA meters, and edge IoT devices."
    />
    <div className="upload panel">
      <div className="upload-icon">⇧</div>
      <h3>INGEST ENTERPRISE DATASET</h3>
      <p>CSV • Excel • JSON • Apache Parquet • Kafka Telemetry Streams</p>
      <button className="btn primary" onClick={run} disabled={processing}>
        {processing?"PROCESSING INGESTION PIPELINE…":"PROCESS SAMPLE PRODUCTION DATASET"}
      </button>
    </div>
    {processing && (
      <div className="process-steps panel">
        {["Data Streaming Received","Schema & Type Validation","Outlier & Missing Value Cleaning","Feature Normalization","AI Model Evaluation","Actionable Insights Generated"].map((x,i)=>(
          <div className="step" key={x}>
            <span className="step-dot">{i<4?"✓":i===4?"…":"○"}</span>
            <b>STAGE 0{i+1}</b>
            <span>{x}</span>
          </div>
        ))}
      </div>
    )}
    {processed && <>
      <div className="kpi-grid four">
        <Kpi label="TOTAL RECORDS STREAMED" value="2,450" sub="Batch #DP-802" />
        <Kpi label="VERIFIED CLEAN RECORDS" value="2,386" accent="green" sub="97.4% Pass Rate" />
        <Kpi label="ANOMALIES RESOLVED" value="24" accent="amber" sub="Auto-reconciled" />
        <Kpi label="DATA QUALITY RATING" value="96.2%" accent="blue" sub="Production Grade" />
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head">PROCESSED DATA AUDIT TRAIL</div>
          <table>
            <thead>
              <tr><th>Record ID</th><th>Source System</th><th>Validation Status</th><th>Reconciliation</th></tr>
            </thead>
            <tbody>
              {[
                ["REC-1024","Enterprise ERP","Valid","Reconciled cleanly"],
                ["REC-1025","Substation SCADA","Normalized","Outlier capped to 3-sigma"],
                ["REC-1026","Sales CRM","Valid","Lead sync verified"],
                ["REC-1027","Facility Energy","Normalized","Interpolated missing timestamp"],
                ["REC-1028","IoT Asset M-102","Flagged","Vibration spike routed to maintenance"]
              ].map(r=>(
                <tr key={r[0]}>
                  <td><b>{r[0]}</b></td>
                  <td>{r[1]}</td>
                  <td><span className="status-badge healthy">{r[2]}</span></td>
                  <td>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel insight-panel">
          <div className="panel-head">AI AUTOMATED INGESTION INSIGHTS</div>
          {[
            "Cross-system schema consistency achieved between ERP and SCADA feeds.",
            "Energy consumption curve reflects a 14% peak during 14:00-16:00 window.",
            "Predictive anomaly filter isolated 24 anomalous telemetry packets without data loss."
          ].map((x,i)=>(
            <div className="insight-row" key={x}>
              <b>0{i+1}</b>
              <span>{x}</span>
            </div>
          ))}
          <button className="btn secondary" onClick={()=>action("Detailed dataset export generated")}>
            EXPORT VALIDATED AUDIT REPORT
          </button>
        </div>
      </div>
    </>}
  </>;
}

// --- Predictive Maintenance ---
function Maintenance({openMachine}){
  return <>
    <PageHead 
      eyebrow="PREDICTIVE ASSET INTELLIGENCE" 
      title="Industrial Predictive Maintenance" 
      sub="Continuous vibration spectral analysis, housing thermal telemetry, and motor current signatures to eliminate catastrophic downtime."
    />
    <div className="kpi-grid four">
      <Kpi label="TOTAL ASSETS MONITORED" value="24" sub="Edge Telemetry Connected" />
      <Kpi label="HEALTHY & OPTIMAL" value="17" accent="green" sub="Nominal Vibration & Temp" />
      <Kpi label="ELEVATED RISK WARNING" value="5" accent="amber" sub="Scheduled Inspection" />
      <Kpi label="CRITICAL ATTENTION" value="2" accent="red" sub="Immediate Action Required" />
    </div>
    <div className="panel table-panel">
      <div className="panel-head">
        <span>ASSET HEALTH MONITORING MATRIX</span>
        <span className="muted">Select any machine to view spectral telemetry</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Machine Asset</th>
            <th>Health Score</th>
            <th>Bearing Temp</th>
            <th>Vibration Index</th>
            <th>Current Load</th>
            <th>Failure Risk</th>
            <th>Condition Status</th>
          </tr>
        </thead>
        <tbody>
          {machineRows.map(r=>(
            <tr className="click-row" key={r[0]} onClick={()=>openMachine(r)}>
              {r.map((x,i)=>(
                <td key={i}>
                  {i===0 ? <b>{x}</b> : i===6 ? <span className={"status-badge "+x.toLowerCase()}>{x}</span> : x}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>;
}

function MachineModal({machine,close}){
  return <Modal title={"Asset Diagnostic Telemetry • " + machine[0]}>
    <div className="machine-detail">
      <div className="machine-hero">
        <div>
          <span>ASSET OVERALL HEALTH</span>
          <strong>{machine[1]}</strong>
          <small>Operating within monitored parameters</small>
        </div>
        <div>
          <span>CALCULATED FAILURE RISK</span>
          <strong className="red-text">{machine[5]}</strong>
          <small>Remaining Useful Life: ~48 Hours</small>
        </div>
      </div>
      <div className="mini-kpis">
        <Kpi label="HOUSING TEMP" value={machine[2]} sub="Threshold: 85°C" />
        <Kpi label="VIBRATION SPECTRA" value={machine[3]} sub="Tri-axial sensor" />
        <Kpi label="CURRENT DRAW" value={machine[4]} sub="Nominal: 110A" />
      </div>
      <div className="charts">
        <MiniChart title="Temperature Profile (7 Days)" vals={[35,48,46,63,59,72,86]}/>
        <MiniChart title="Vibration Amplitude (mm/s)" vals={[30,38,34,55,62,76,82]}/>
        <MiniChart title="Motor Current Draw (Amps)" vals={[45,42,50,58,54,68,72]}/>
      </div>
      <div className="prediction">
        <b>AI ROOT-CAUSE DIAGNOSIS</b>
        <strong>BEARING RACEWAY DEGRADATION DETECTED • {machine[5]} PROBABILITY</strong>
        <p>Telemetry indicates harmonic vibration in the 2.4 kHz band correlated with elevated bearing housing temperature. Automated preventative work order #WO-419 has been dispatched to prevent rotor seizure.</p>
      </div>
    </div>
    <button className="btn primary" onClick={close}>Acknowledge & Close</button>
  </Modal>;
}

function MiniChart({title,vals}){
  return <div className="mini-chart">
    <span>{title}</span>
    <div className="bars">
      {vals.map((v,i)=><i key={i} style={{height:v+"%"}} title={`${v}%`}></i>)}
    </div>
  </div>;
}

// --- Energy Section - Upgraded with High-Impact Content & High-Tech Clean Theme ---
function Energy({report}){
  const [energyView, setEnergyView] = useState("overview");

  return <div className="energy-page-theme">
    <PageHead 
      eyebrow="CLEAN ENERGY & GRID INTELLIGENCE" 
      title="Industrial Energy Management & Smart Grid" 
      sub="Real-time substation telemetry, automated peak-load shifting, battery storage optimization, and power factor tuning across industrial facilities."
    />

    {/* Hero Banner with Clean Renewable + Grid Theme */}
    <div className="energy-banner panel">
      <div className="eb-image-wrap">
        <img 
          src="https://images.unsplash.com/photo-1508791290064-c27cc1ef7a9a?auto=format&fit=crop&w=1200&q=85" 
          alt="Modern renewable smart power grid infrastructure"
        />
        <span className="eb-badge">SMART GRID SCADA</span>
      </div>
      <div className="eb-content">
        <div className="energy-kicker">✦ ZERO-CARBON EMISSION & PEAK ARBITRAGE</div>
        <h2>Optimizing Energy Consumption, Power Quality & ESG Savings.</h2>
        <p>
          Continuous sub-metering captures kilowatt-hour consumption, harmonic distortion, and power factor across heavy industrial loads, automated chillers, and renewable solar arrays.
        </p>
        <div className="eb-stats-row">
          <div>
            <span>Solar Generation</span>
            <b>42% (7,750 kWh)</b>
          </div>
          <div>
            <span>Battery BESS</span>
            <b>18% (3,320 kWh)</b>
          </div>
          <div>
            <span>Grid Power Factor</span>
            <b className="green-text">0.98 pf (Optimal)</b>
          </div>
          <div>
            <span>CO₂ Avoided</span>
            <b className="green-text">12.4 Tons / Mo</b>
          </div>
        </div>
      </div>
    </div>

    {/* 4 Realistic, High-Impact Energy KPIs */}
    <div className="kpi-grid four">
      <Kpi label="TOTAL DAILY DEMAND" value="18,450 kWh" sub="-14.2% vs Previous Baseline" accent="green" />
      <Kpi label="NET MONTHLY SPEND" value="₹1,84,200" sub="₹38,600 Saved via Peak Shaving" accent="blue" />
      <Kpi label="GRID POWER FACTOR" value="0.98 pf" sub="Optimal • 0% DISCOM Penalty" accent="green" />
      <Kpi label="CARBON OFFSET (ESG)" value="12.4 Tons" sub="Equivalent to 560 Trees Planted" accent="amber" />
    </div>

    {/* Load Telemetry and AI Recommendations */}
    <div className="energy-grid">
      <div className="panel big-chart energy-chart">
        <div className="panel-head">
          <div>
            <b>24-HOUR LOAD PROFILE & TIME-OF-DAY (ToD) TARIFF</b>
            <small className="chart-sub">Peak Tariff Window: 14:00 - 18:00 (₹11.80/kWh) • Off-Peak Night: (₹4.20/kWh)</small>
          </div>
          <span className="tariff-indicator">Live Substation Telemetry</span>
        </div>
        <div className="line-chart energy-bars">
          {[
            {h: 38, tariff: "off-peak", label: "00:00"},
            {h: 32, tariff: "off-peak", label: "02:00"},
            {h: 35, tariff: "off-peak", label: "04:00"},
            {h: 52, tariff: "normal", label: "06:00"},
            {h: 68, tariff: "normal", label: "08:00"},
            {h: 78, tariff: "normal", label: "10:00"},
            {h: 74, tariff: "normal", label: "12:00"},
            {h: 94, tariff: "peak", label: "14:00"},
            {h: 88, tariff: "peak", label: "16:00"},
            {h: 70, tariff: "normal", label: "18:00"},
            {h: 58, tariff: "normal", label: "20:00"},
            {h: 44, tariff: "off-peak", label: "22:00"}
          ].map((item, i) => (
            <div key={i} className={"energy-bar " + item.tariff} style={{height: item.h + "%"}} title={`${item.label} Load: ${item.h * 200} kW (${item.tariff.toUpperCase()})`}>
              <span className="bar-val">{item.h}%</span>
            </div>
          ))}
        </div>
        <div className="chart-labels">
          <span>00:00</span><span>02:00</span><span>04:00</span><span>06:00</span><span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span><span>22:00</span>
        </div>
        <div className="chart-legend">
          <span className="legend-item"><i className="legend-box off-peak"></i> Off-Peak (₹4.20/kWh)</span>
          <span className="legend-item"><i className="legend-box normal"></i> Standard (₹7.50/kWh)</span>
          <span className="legend-item"><i className="legend-box peak"></i> Peak Tariff (₹11.80/kWh)</span>
        </div>
      </div>

      <div className="panel recommendation energy-recommendation">
        <div className="panel-head">AI ENERGY OPTIMIZATION ENGINE</div>
        <div className="rec-icon">⚡</div>
        <h3>High-ROI Optimization Identified</h3>
        <p>
          Heavy consumption spike detected on <b>Motor Group B</b> during peak tariff hours (14:00 - 16:00).
        </p>
        <div className="savings-badge">
          <span>Projected Monthly Savings:</span>
          <b>₹42,000 / month</b>
        </div>
        <div className="rec-steps">
          <div><span>1</span> Shift Motor B batch run by 45 minutes to off-peak.</div>
          <div><span>2</span> Automate VFD chiller throttling during peak hours.</div>
          <div><span>3</span> Maintain capacitor bank for zero DISCOM penalty.</div>
        </div>
        <button className="btn primary" onClick={report}>VIEW FULL AUDIT & RECOMMENDATIONS</button>
      </div>
    </div>

    {/* Comprehensive Sub-Metering Matrix */}
    <div className="panel">
      <div className="panel-head">
        <div>
          <b>FACILITY EQUIPMENT SUB-METERING MATRIX</b>
          <small className="chart-sub">Real-time voltage, current, power factor, and consumption breakdown across plant zones</small>
        </div>
        <button className="btn secondary" onClick={report}>GENERATE AUDIT REPORT</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Monitored Equipment / Sub-system</th>
            <th>Power Consumption</th>
            <th>Operating Voltage / Current</th>
            <th>Power Factor</th>
            <th>Load State</th>
            <th>Weekly Trend</th>
            <th>Optimization Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Industrial Water Chiller #1 (HVAC)","4,850 kWh","415 V / 185 A","0.98 pf","Normal","Stable","Optimal"],
            ["High-Torque Production Motor B","3,420 kWh","415 V / 120 A","0.92 pf","High Peak","Increasing","VFD Throttle Recommended"],
            ["Cleanroom Air Handling Unit (AHU)","2,890 kWh","415 V / 98 A","0.97 pf","Normal","Efficient","Optimal"],
            ["EV Commercial Fleet Chargers (Dock 4)","2,150 kWh","480 V / 160 A","0.99 pf","Scheduled","Stable","Off-Peak Window Active"],
            ["Data Center UPS & Server Racks","1,940 kWh","230 V / 85 A","0.99 pf","Critical","Stable","PUE 1.18 Certified"],
            ["Auxiliary Plant Lighting & Utilities","1,200 kWh","230 V / 45 A","0.96 pf","Eco Mode","Decreasing","Motion-Sensing Enabled"]
          ].map(r=>(
            <tr key={r[0]}>
              <td><b>{r[0]}</b></td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td><b className="green-text">{r[3]}</b></td>
              <td>
                <span className={"status-badge " + (r[4].includes("High")?"warning":r[4].includes("Critical")?"critical":"healthy")}>
                  {r[4]}
                </span>
              </td>
              <td>{r[5]}</td>
              <td><span className="opt-tag">{r[6]}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="energy-actions-footer">
      <button className="btn primary report-btn" onClick={report}>
        GENERATE EXECUTIVE ENERGY & ESG AUDIT REPORT →
      </button>
    </div>
  </div>;
}

// --- Detailed Energy Report Modal ---
function EnergyReportModal({close, action}){
  return <Modal title="Executive Energy Management & ESG Audit Report">
    <div className="energy-report-modal-content">
      <div className="erm-header">
        <div>
          <b>DPT INDUSTRIAL ENERGY AUDIT • ISO 50001 CERTIFIED</b>
          <p>Reporting Period: Current Operating Month • Facility: Primary Industrial Complex</p>
        </div>
        <span className="status-badge healthy">COMPLIANT (A+)</span>
      </div>

      <div className="erm-grid">
        <div className="erm-card">
          <span>TOTAL ENERGY CONSUMPTION</span>
          <strong>18,450 kWh</strong>
          <small>-14.2% reduction compared to last year baseline</small>
        </div>
        <div className="erm-card">
          <span>NET ENERGY EXPENDITURE</span>
          <strong>₹1,84,200</strong>
          <small>Net savings of ₹38,600 captured via tariff management</small>
        </div>
        <div className="erm-card">
          <span>RENEWABLE ENERGY MIX</span>
          <strong className="green-text">60% Clean</strong>
          <small>Solar PV: 42% (7,750 kWh) • Storage: 18% (3,320 kWh)</small>
        </div>
        <div className="erm-card">
          <span>CARBON EMISSIONS AVOIDED</span>
          <strong className="green-text">12.4 Tons CO₂e</strong>
          <small>Meets Tier-1 ESG greenhouse gas sustainability target</small>
        </div>
      </div>

      <div className="erm-section">
        <b>HIGH-PRIORITY SAVINGS ACTIONS:</b>
        <ul>
          <li><b>Motor Group B Start-Sequence Shift:</b> Moving start time from 14:15 to 15:45 reduces peak-tariff billing, generating <b>₹42,000/month</b> in direct savings.</li>
          <li><b>HVAC Variable Frequency Drive (VFD) Tuning:</b> Dynamic chilled water delta-T tuning preserves thermal comfort while reducing peak electrical draw by 18 kW (<b>₹26,500/month</b>).</li>
          <li><b>Power Factor Compliance:</b> Maintaining 0.98 power factor via automated capacitor bank prevents utility penalty surcharges of <b>₹18,000/month</b>.</li>
        </ul>
      </div>

      <div className="erm-footer">
        <button className="btn primary" onClick={()=>{close(); action("Energy audit report exported successfully");}}>
          DOWNLOAD OFFICIAL AUDIT (PDF)
        </button>
        <button className="btn ghost" onClick={close}>Close</button>
      </div>
    </div>
  </Modal>;
}

// --- Driving Section ---
function Driving({report}){
  return <div className="driving-page">
    <PageHead 
      eyebrow="MOBILITY AI & TELEMETRICS" 
      title="Energy Efficient EV Driving Telemetry" 
      sub="Real-time commercial fleet telemetry, regenerative braking efficiency, and AI battery longevity guidance."
    />
    <div className="vehicle-grid">
      <div className="vehicle-card panel">
        <div className="vehicle-visual">
          EV<span>102</span>
        </div>
        <div className="vehicle-data">
          <div><span>ASSET IDENTIFIER</span><b>Commercial EV-102</b></div>
          <div><span>BATTERY CHARGE</span><b className="green-text">74% (38.5 kWh)</b></div>
          <div><span>CONSUMPTION RATE</span><b>18.2 kWh/100 km</b></div>
          <div><span>EFFICIENCY RATING</span><b className="green-text">84% (+6% vs avg)</b></div>
          <div><span>DISTANCE LOGGED</span><b>126 km (Today)</b></div>
          <div><span>REGEN UTILIZATION</span><b>76% Recovered</b></div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">REAL-TIME DRIVER TELEMETRY SIGNALS</div>
        <div className="signal"><span>SMOOTH ACCELERATION SCORE</span><b className="green-text">OPTIMAL (92/100)</b></div>
        <div className="signal"><span>HARSH BRAKING FREQUENCY</span><b className="amber-text">ELEVATED (3 EVENTS)</b></div>
        <div className="signal"><span>IDLE AUXILIARY CONSUMPTION</span><b>NORMAL (0.4 kW)</b></div>
        <div className="recommend">
          <b>AI TELEMETRY GUIDANCE</b>
          <p>Maintain gradual acceleration ramp-up during gradient climbs to preserve battery chemistry.</p>
          <p>Anticipate braking zones to utilize regenerative kinetic recovery instead of friction pads.</p>
        </div>
      </div>
    </div>
    <div className="panel driving-chart">
      <div className="panel-head">FLEET ASSET TELEMETRY LOGS (LAST TRIP)</div>
      <MiniChart title="Vehicle Speed Profile (km/h)" vals={[30,44,62,58,75,68,84,70,90]}/>
      <MiniChart title="Throttle Acceleration Rate" vals={[20,28,56,30,62,35,50,27,42]}/>
      <MiniChart title="Instantaneous Power Consumption (kW)" vals={[42,48,45,58,51,62,57,70,65]}/>
    </div>
    <button className="btn primary" onClick={report}>GENERATE COMPLETE FLEET AUDIT</button>
  </div>;
}

// --- Enterprise Section: Automation (Every Heading Clear & Understandable) ---
function Automation({running,step,run,action}){
  const steps = [
    { title: "Invoice Ingestion", desc: "Digital invoice received via API webhook and encrypted email drop" },
    { title: "AI Optical Character Recognition", desc: "Line items, tax IDs & purchase order codes extracted with 99.4% accuracy" },
    { title: "Policy Verification & Three-Way Match", desc: "Cross-checked against original purchase order and delivery receipt" },
    { title: "Executive Approval Routing", desc: "Auto-approved within tolerance threshold; flagged exceptions routed to VP" },
    { title: "Enterprise ERP Ledger Posting", desc: "Reconciled ledger entry automatically committed to SAP/Oracle ERP tables" },
    { title: "Audit Trail & Notification", desc: "Immutable compliance receipt archived with automated notification to vendor" }
  ];

  return <>
    <PageHead 
      eyebrow="ENTERPRISE WORKFLOW ORCHESTRATION" 
      title="Enterprise Process Automation (RPA)" 
      sub="Design, orchestrate, and audit straight-through digital workflows connecting disparate enterprise systems without human latency."
    />

    {/* Understandable Overview Banner */}
    <div className="enterprise-visual panel">
      <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85" alt="Enterprise technology collaboration"/>
      <div>
        <span className="enterprise-kicker">STRAIGHT-THROUGH WORKFLOW ORCHESTRATION</span>
        <h2>Automate Repetitive Business Operations with Zero Latency.</h2>
        <p>
          Robotic Process Automation (RPA) eliminates manual data entry, standardizes approvals, synchronizes enterprise databases, and delivers complete audit transparency.
        </p>
      </div>
    </div>

    {/* 4 Impactful Automation Business Metrics */}
    <div className="kpi-grid four">
      <Kpi label="AVERAGE CYCLE TIME REDUCTION" value="84%" sub="From 3 Days to 4 Minutes" accent="green" />
      <Kpi label="STRAIGHT-THROUGH ACCURACY" value="99.7%" sub="Zero Re-entry Errors" accent="blue" />
      <Kpi label="ANNUAL LABOR HOURS SAVED" value="1,850 hrs" sub="Per Operations Division" accent="purple" />
      <Kpi label="COMPLIANCE AUDIT READINESS" value="100%" sub="Immutable Cryptographic Logs" accent="green" />
    </div>

    <div className="automation-layout">
      {/* Workflow Builder with Clear Descriptions */}
      <div className="panel workflow-builder">
        <div className="panel-head">
          <div>
            <b>AUTOMATED INVOICE RECONCILIATION PIPELINE</b>
            <small className="chart-sub">End-to-end straight-through financial approval workflow</small>
          </div>
          <span className="opt-tag">RPA Engine Active</span>
        </div>

        <div className="workflow-steps-list">
          {steps.map((s,i)=>(
            <React.Fragment key={s.title}>
              <div className={"workflow-block " + (running&&step>=i?"done":"")}>
                <span className="wb-num">0{i+1}</span>
                <div className="wb-content">
                  <b>{s.title}</b>
                  <p>{s.desc}</p>
                </div>
                {running && step>=i && <em className="wb-check">✓ Executed</em>}
              </div>
              {i < steps.length - 1 && <div className="down-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>

        <div className="workflow-actions">
          <button className="btn primary" onClick={run} disabled={running}>
            {running ? "EXECUTING LIVE PIPELINE…" : "RUN WORKFLOW EXECUTION"}
          </button>
          <button className="btn ghost" onClick={()=>action("Workflow builder configuration opened")}>
            CONFIGURE WORKFLOW RULES
          </button>
        </div>
      </div>

      {/* Execution Log with Clear Descriptions */}
      <div className="panel execution">
        <div className="panel-head">
          <div>
            <b>REAL-TIME TRANSACTION EXECUTION AUDIT</b>
            <small className="chart-sub">Millisecond-level event timeline demonstrating SLA compliance</small>
          </div>
        </div>
        <div className="execution-list">
          {steps.map((s,i)=>(
            <div className={"execution-row " + (running&&step>=i?"complete":"")} key={s.title}>
              <span className="er-dot">{running&&step>=i?"✓":"○"}</span>
              <div className="er-info">
                <b>{s.title}</b>
                <small>{running&&step>=i?"Completed in 240ms • SLA Passed":"Pending upstream trigger"}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>;
}

// --- Enterprise Section: ERP (Every Heading Clear & Understandable) ---
function ERP({tab,setTab,action}){
  return <>
    <PageHead 
      eyebrow="ENTERPRISE RESOURCE PLANNING (ERP)" 
      title="DPT Integrated ERP Operations Platform" 
      sub="Unified operational command center managing warehouse inventory levels, manufacturing schedules, purchase orders, customer dispatches, and workforce capacity."
    />

    {/* Understandable Header Banner */}
    <div className="enterprise-visual compact panel">
      <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85" alt="ERP enterprise meeting"/>
      <div>
        <span className="enterprise-kicker">CROSS-DEPARTMENTAL SYNCHRONIZATION</span>
        <h2>One Unified Source of Operational Truth.</h2>
        <p>
          Connect plant floor manufacturing directly to corporate finance, inventory safety buffers, and sales fulfillment to eliminate departmental silos.
        </p>
      </div>
    </div>

    {/* Clear, Understandable ERP Tabs */}
    <div className="erp-shell">
      <div className="erp-tabs">
        {[
          ["dashboard","DASHBOARD (Operations Summary)"],
          ["inventory","INVENTORY (Stock Levels & Reorder Thresholds)"],
          ["production","PRODUCTION (Factory Batch Scheduling)"],
          ["orders","ORDERS (Fulfillment & Dispatch Logistics)"],
          ["employees","EMPLOYEES (Workforce Management & Shifts)"]
        ].map(([key, label]) => (
          <button 
            className={tab === key ? "active" : ""} 
            onClick={() => setTab(key)} 
            key={key}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab 1: Dashboard */}
      {tab==="dashboard" && (
        <div className="erp-tab-content">
          <div className="tab-explainer">
            <b>EXECUTIVE OPERATIONS OVERVIEW</b>
            <p>Real-time consolidated indicators across inventory buffers, ongoing production runs, open procurement, and daily fulfilled revenue.</p>
          </div>
          <div className="kpi-grid four">
            <Kpi label="WAREHOUSE INVENTORY" value="1,248 Units" sub="Across 4 Regional Warehouses" accent="blue" />
            <Kpi label="ACTIVE PRODUCTION RUN" value="86 Units" sub="Shift Target: 100 Units on Line 2" accent="green" />
            <Kpi label="OPEN PURCHASE ORDERS" value="32 Orders" sub="Raw Material Inflow Scheduled" accent="amber" />
            <Kpi label="DISPATCHES IN TRANSIT" value="24 Shipments" sub="Carrier Handover Complete" accent="purple" />
            <Kpi label="ACTIVE PLANT WORKFORCE" value="148 Operators" sub="Full Shift Capacity Coverage" accent="blue" />
            <Kpi label="MONTH-TO-DATE REVENUE" value="₹8.40 Lakh" sub="Billed on Fulfilled Shipments" accent="green" />
          </div>
        </div>
      )}

      {/* Tab 2: Inventory */}
      {tab==="inventory" && (
        <div className="erp-tab-content">
          <div className="tab-explainer">
            <b>INVENTORY STOCK CONTROL & REORDER THRESHOLDS</b>
            <p>Continuous monitoring of warehouse parts against safety thresholds to prevent assembly line starvation.</p>
          </div>
          <ERPTable 
            title="WAREHOUSE INVENTORY STATUS MATRIX" 
            headers={["Component / Product Description","SKU Code","Available In-Stock","Safety Threshold","Stock Health","Procurement Action"]} 
            rows={[
              ["Industrial High-Torque Motor","MTR-101","240 Units","80 Units","Healthy","Sufficient Buffer"],
              ["Automated PLC Control Panel","CTL-220","42 Units","50 Units","Low","Auto-Reorder Dispatched"],
              ["HVAC Air Filtration Unit","HVC-008","180 Units","60 Units","Healthy","Sufficient Buffer"],
              ["Thermal & Vibration Sensor Kit","SNS-440","18 Units","25 Units","Low","Auto-Reorder Dispatched"],
              ["Cast Iron Mounting Bracket","BRK-092","520 Units","150 Units","Healthy","Optimal Stock"]
            ]} 
          />
        </div>
      )}

      {/* Tab 3: Production */}
      {tab==="production" && (
        <div className="erp-tab-content">
          <div className="tab-explainer">
            <b>MANUFACTURING WORK-ORDER SCHEDULING</b>
            <p>Initiate batch manufacturing jobs, specify bill of materials (BOM), and assign lead floor operators.</p>
          </div>
          <div className="form-panel panel">
            <div className="form-grid">
              <div>
                <label className="field-label">Target Product Line</label>
                <input placeholder="e.g. Industrial Motor Model MTR-101" defaultValue="Industrial Motor MTR-101"/>
              </div>
              <div>
                <label className="field-label">Batch Production Quantity</label>
                <input placeholder="e.g. 50 Units" defaultValue="50 Units"/>
              </div>
              <div>
                <label className="field-label">Scheduled Completion Date</label>
                <input type="date" defaultValue="2026-10-25"/>
              </div>
              <div>
                <label className="field-label">Bill of Materials (BOM) Lot</label>
                <input placeholder="Raw Material Allocation Lot" defaultValue="LOT-2026-BOM-88"/>
              </div>
              <div>
                <label className="field-label">Shift Supervisor / Operator</label>
                <input placeholder="Lead Operator" defaultValue="A. Sharma (Shift A)"/>
              </div>
            </div>
            <button className="btn primary" onClick={()=>action("Production batch work-order created successfully")}>
              DISPATCH PRODUCTION WORK-ORDER →
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Orders */}
      {tab==="orders" && (
        <div className="erp-tab-content">
          <div className="tab-explainer">
            <b>CUSTOMER SALES ORDERS & DISPATCH FULFILLMENT</b>
            <p>End-to-end commercial order lifecycle from customer purchase to warehouse packing, dispatch, and carrier delivery.</p>
          </div>
          <ERPTable 
            title="ACTIVE SALES & FULFILLMENT ORDERS" 
            headers={["Order Identifier","Client Organization","Contract Value","Fulfillment Stage","Target Delivery","Payment Terms"]} 
            rows={[
              ["ORD-1042","Apex Heavy Manufacturing","₹84,500","Processing","18 Oct 2026","Net 30 Days"],
              ["ORD-1043","National Retail Distribution","₹42,200","Ready","16 Oct 2026","Prepaid"],
              ["ORD-1044","Pioneer Clean Energy Corp","₹1,18,000","Dispatched","15 Oct 2026","Letter of Credit"],
              ["ORD-1045","Precision Engineering Ltd","₹65,000","Processing","20 Oct 2026","Net 15 Days"]
            ]} 
          />
        </div>
      )}

      {/* Tab 5: Employees */}
      {tab==="employees" && (
        <div className="erp-tab-content">
          <div className="tab-explainer">
            <b>WORKFORCE CAPACITY & SHIFT ATTENDANCE</b>
            <p>Review engineering team availability, departmental staffing, and shift floor coverage across facilities.</p>
          </div>
          <ERPTable 
            title="PLANT WORKFORCE & ATTENDANCE ROSTER" 
            headers={["Employee Name","Department Division","Assigned Role","Daily Shift Status","Capacity Utilization"]} 
            rows={[
              ["A. Sharma","Operations Division","Shift Lead Engineer","Present","100% (Active Line 1)"],
              ["R. Singh","Manufacturing Production","Senior CNC Operator","Present","95% (Line 2 Run)"],
              ["K. Mehta","Technical Sales Engineering","Commercial Solutions Manager","On leave","Coverage: S. Gupta"],
              ["P. Verma","Quality Assurance (QA)","Lead Compliance Inspector","Present","100% (Batch Testing)"],
              ["S. Nair","Warehouse & Dispatch","Logistics Coordinator","Present","92% (Carrier Loading)"]
            ]} 
          />
        </div>
      )}
    </div>
  </>;
}

function ERPTable({title,headers,rows}){
  return <div className="panel erp-table-panel">
    <div className="panel-head">
      <b>{title}</b>
      <span className="live-dot-tag"><span className="live-dot"></span> Live Sync</span>
    </div>
    <table>
      <thead>
        <tr>
          {headers.map(h=><th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr className="click-row" key={i}>
            {r.map((x,j)=>(
              <td key={j}>
                {j===0 ? <b>{x}</b> : ["Healthy","Low","Processing","Ready","Dispatched","Active","Present","On leave"].includes(x) ? 
                  <span className={"status-badge "+x.toLowerCase().replace(" ","-")}>{x}</span> : x}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}

// --- Enterprise Section: CRM (Every Heading Clear & Understandable) ---
function CRM({stage,setStage,setModal,action}){
  const stages = [
    { name: "NEW LEAD", desc: "Inbound web inquiry & prospect qualification", count: 42 },
    { name: "CONTACTED", desc: "Discovery call & technical requirement scoping", count: 31 },
    { name: "QUALIFIED", desc: "BANT criteria & budget alignment confirmed", count: 22 },
    { name: "PROPOSAL SENT", desc: "Commercial proposal & architecture submitted", count: 12 },
    { name: "CONTRACT WON", desc: "Master service agreement signed & executed", count: 4 }
  ];

  return <>
    <PageHead 
      eyebrow="CUSTOMER RELATIONSHIP MANAGEMENT (CRM)" 
      title="Revenue Operations & Client Lifecycle" 
      sub="Track deal velocity, manage qualified customer leads, schedule executive touchpoints, and forecast enterprise contract revenue."
    />

    {/* Understandable Overview Banner */}
    <div className="enterprise-visual compact crm-visual panel">
      <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85" alt="CRM executive meeting"/>
      <div>
        <span className="enterprise-kicker">REVENUE ACCELERATION PIPELINE</span>
        <h2>Turn Inbound Prospects into Long-Term Enterprise Partners.</h2>
        <p>
          Centralize client interactions, track deal stage progression, and automate sales follow-ups to maintain consistent engagement.
        </p>
      </div>
    </div>

    {/* 4 CRM Business KPIs */}
    <div className="kpi-grid four">
      <Kpi label="TOTAL PIPELINE LEADS" value="128" sub="Inbound & Outreach Channels" accent="blue" />
      <Kpi label="BANT QUALIFIED ACCOUNTS" value="46" accent="green" sub="Decision-makers Engaged" />
      <Kpi label="ACTIVE COMMERCIAL DEALS" value="19" sub="Valued at ₹15.35 Lakh" accent="amber" />
      <Kpi label="OPPORTUNITY WIN RATE" value="14.2%" accent="purple" sub="+3.8% Quarter-over-Quarter" />
    </div>

    {/* Understandable Pipeline Section */}
    <div className="pipeline panel">
      <div className="panel-head">
        <div>
          <b>SALES PIPELINE STAGES & DEAL VELOCITY</b>
          <small className="chart-sub">Click any pipeline stage below to filter active opportunities</small>
        </div>
        <span className="opt-tag">Total Pipeline: ₹15,35,000</span>
      </div>
      <div className="pipeline-track">
        {stages.map((s,i)=>(
          <button 
            className={"pipeline-stage " + (stage===i?"current":"")} 
            onClick={()=>setStage(i)} 
            key={s.name}
          >
            <span className="ps-stage-num">STAGE 0{i+1}</span>
            <b>{s.name}</b>
            <p className="ps-desc">{s.desc}</p>
            <small>{s.count} Active Deals</small>
          </button>
        ))}
      </div>
    </div>

    {/* Lead Detail & Active Deals Grid */}
    <div className="two-col">
      <div className="panel">
        <div className="panel-head">
          <b>QUALIFIED ACCOUNT PROFILE & INTERACTION INTELLIGENCE</b>
          <span className="status-badge qualified">BANT VERIFIED</span>
        </div>
        <div className="lead">
          <div className="lead-avatar">AM</div>
          <div>
            <h3>Alex Morgan • Chief Technology Officer</h3>
            <p>Apex Heavy Manufacturing Corporation</p>
            <span>alex.morgan@apex-manufacturing.example</span>
          </div>
        </div>
        <div className="lead-fields">
          <div><span>Acquisition Channel</span><b>Inbound Architecture Inquiry</b></div>
          <div><span>Target Next Touchpoint</span><b>22 Oct 2026 • Executive Call</b></div>
          <div><span>Direct Phone Line</span><b>+91 70653 00376</b></div>
        </div>
        <div className="lead-notes">
          <b>Client Pain Point & Objectives:</b>
          <p>Seeking automated predictive maintenance across 24 machining assets to eliminate unplanned hydraulic downtime.</p>
        </div>
        <button className="btn primary" onClick={()=>setModal("followup")}>
          SCHEDULE EXECUTIVE FOLLOW-UP MEETING
        </button>
      </div>

      <div className="panel deals">
        <div className="panel-head">
          <b>ACTIVE HIGH-VALUE COMMERCIAL OPPORTUNITIES</b>
          <span className="muted">Forecast: ₹15.35L</span>
        </div>
        {[
          ["Enterprise Operations ERP & Cloud Suite", "Apex Heavy Manufacturing", "₹8,40,000", "Proposal Sent", "90% Close Probability"],
          ["Substation SCADA & Energy Analytics", "Pioneer Clean Energy Corp", "₹4,20,000", "Qualified", "75% Close Probability"],
          ["Mobile Field Inspection Application", "Precision Engineering Ltd", "₹2,75,000", "Contacted", "60% Close Probability"]
        ].map(([title, client, value, stg, prob], i)=>(
          <div className="deal" key={title}>
            <span className="deal-num">0{i+1}</span>
            <div className="deal-info">
              <b>{title}</b>
              <small>{client}</small>
              <div className="deal-prob">{prob}</div>
            </div>
            <div className="deal-right">
              <strong>{value}</strong>
              <em className="deal-stage-pill">{stg}</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>;
}

// --- Website Development: Fixed Large Images, Expanded Rich Content ---
function WebDemo({open}){
  const projects = [
    {
      title: "Corporate Enterprise Platform & Global Portal",
      sub: "High-Performance Multi-Region Digital Experience",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
      desc: "Engineered a flagship corporate web platform with Next.js 14, React, and Tailwind CSS. Built to handle global corporate traffic with sub-second page loads, headless CMS integration, multi-language internationalization, and complete WCAG 2.1 AA accessibility compliance.",
      specs: [
        "⚡ 99/100 Google Lighthouse Core Web Vitals score",
        "🛡️ Enterprise SOC2 & OWASP Top 10 hardened security",
        "🌐 Multi-region Edge CDN delivery across 280+ POPs",
        "📱 100% Fluid Responsive design with custom theme tokens"
      ],
      tags: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "GraphQL", "Cloudflare Edge"]
    },
    {
      title: "B2B Client Portal & Real-Time Workspace",
      sub: "Secure Multi-Tenant Enterprise Collaboration",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      desc: "Architected a scalable B2B operations portal allowing corporate clients, vendors, and internal teams to securely collaborate. Includes real-time WebSocket telemetry dashboards, automated PDF invoicing, contract status trackers, and granular role-based access control (RBAC).",
      specs: [
        "📊 Real-time WebSocket streaming analytics dashboards",
        "🔐 Multi-factor authentication (MFA) with granular RBAC",
        "📄 Automated PDF report generation & encrypted document store",
        "🔄 Bi-directional REST & GraphQL sync with enterprise ERP"
      ],
      tags: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS Fargate", "Tailwind CSS"]
    },
    {
      title: "High-Throughput Enterprise E-Commerce Platform",
      sub: "Omnichannel Digital Commerce & Instant Checkout",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
      desc: "Engineered an omnichannel digital commerce engine built to handle high-concurrency peak flash traffic. Features real-time multi-warehouse inventory reservation, dynamic product configurators, multi-currency pricing, and a streamlined 3-step checkout with instant gateway integration.",
      specs: [
        "💳 Multi-gateway integration (Stripe, Razorpay, UPI & Net Banking)",
        "⚡ Sub-180ms average server response time during traffic surges",
        "📦 Sub-second inventory sync preventing overselling",
        "📈 +48% mobile checkout conversion rate uplift"
      ],
      tags: ["Next.js", "Tailwind CSS", "Stripe API", "Prisma ORM", "Elasticsearch", "Vercel", "Redis"]
    }
  ];

  return <>
    <PageHead 
      eyebrow="SOFTWARE ENGINEERING & WEB PLATFORMS" 
      title="Website & Web Application Development" 
      sub="High-performance, accessible, and scalable digital web experiences engineered for enterprise reliability and measurable conversion."
    />
    <div className="web-gallery">
      {projects.map((p, i)=>(
        <div className="web-showcase panel" key={p.title}>
          {/* Framed Browser Mockup (Proportionate, Not Giant) */}
          <div className="browser-mockup">
            <div className="browser-header">
              <div className="browser-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="browser-url">https://dpttechnologies.com/solutions/{p.title.toLowerCase().replace(/[^a-z0-9]/g,"-").slice(0,25)}</div>
            </div>
            <div className="browser-screen">
              <img src={p.image} alt={p.title}/>
              <span className="browser-tag">PRODUCTION REFERENCE</span>
            </div>
            <div className="browser-insight-strip">
              <span className="insight-icon">✦</span>
              <div><b>BUILT FOR BUSINESS</b><small>Secure · Responsive · Scalable</small></div>
              <span className="insight-status"><i></i> READY TO SCALE</span>
            </div>
          </div>

          {/* Generous, Well-Structured Content */}
          <div className="project-info">
            <div className="service-tag">ENTERPRISE WEB PLATFORM</div>
            <h3>{p.title}</h3>
            <p className="project-subtitle">{p.sub}</p>
            <p className="project-description">{p.desc}</p>
            
            <div className="project-specs">
              <b>KEY TECHNICAL HIGHLIGHTS:</b>
              <ul>
                {p.specs.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>

            <div className="tag-row">
              {p.tags.map(t => <span key={t}>{t}</span>)}
            </div>

            <div className="project-action-row">
              <button className="btn primary" onClick={open}>
                LAUNCH INTERACTIVE PREVIEW →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>;
}

function WebModal({close}){
  const [tab,setTab]=useState("HOME");
  return <Modal title="Interactive Digital Web Experience">
    <div className="site-demo">
      <div className="site-nav">
        {["HOME","ABOUT","SOLUTIONS","CASE STUDIES","CONTACT"].map(x=><button className={tab===x?"active":""} onClick={()=>setTab(x)} key={x}>{x}</button>)}
      </div>
      <div className="site-body">
        <span className="tag">ENTERPRISE DIGITAL EXPERIENCE</span>
        <h2>
          {tab==="HOME" ? "Architecting High-Performance Digital Platforms." :
           tab==="ABOUT" ? "Engineered for Resilience, Scalability & Speed." :
           tab==="SOLUTIONS" ? "Web • Mobile • Cloud • AI • Enterprise Integration" :
           tab==="CASE STUDIES" ? "Measured ROI: 99/100 Lighthouse & +48% Conversion." :
           "Initiate Your Enterprise Engineering Engagement."}
        </h2>
        <p>Interactive web simulation demonstrating component hierarchy, fluid typography, and sub-second client-side page transitions.</p>
        <button className="btn primary" onClick={()=>alert("Technical demonstration action triggered")}>EXPLORE ARCHITECTURE</button>
      </div>
    </div>
    <button className="btn ghost" onClick={close}>Close Demo</button>
  </Modal>;
}

// --- Mobile Section ---
function Mobile({screen,setScreen}) {
  const screens = ["Dashboard", "Orders", "Inventory", "Notifications", "Profile"];
  return (
    <>
      <PageHead
        eyebrow="SOFTWARE DEVELOPMENT"
        title="Mobile Application Development"
        sub="Native and responsive mobile apps for field operations, warehouse dispatch, and executive approvals."
      />
      <div className="mobile-showcase panel">
        <div className="mobile-reference">
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=85"
            alt="Mobile application interface"
          />
          <div>
            <span>MOBILE PRODUCT DESIGN</span>
            <h2>Business operations, built for the phone.</h2>
            <p>Responsive field workflows, approvals, inventory tracking, and telemetry alerts delivered in an intuitive mobile-first experience.</p>
          </div>
        </div>
        <div className="mobile-layout">
          <div className="phone">
            <div className="phone-side left"></div>
            <div className="phone-side right"></div>
            <div className="phone-screen">
              <div className="phone-notch"><i></i></div>
              <div className="phone-top">9:41 <span>● ● ●</span></div>
              <div className="mobile-brand">DPT <small>BUSINESS OPERATIONS</small></div>
              <div className="mobile-content">
                {screen === "Dashboard" && (
                  <>
                    <h3>Good morning</h3>
                    <div className="m-kpis">
                      <span>Orders<b>24</b></span>
                      <span>Stock<b>86%</b></span>
                    </div>
                    <div className="m-card">Today’s activity<br/><b>12 tasks completed</b></div>
                  </>
                )}
                {screen === "Orders" && (
                  <>
                    <h3>Orders</h3>
                    {["ORD-1042", "ORD-1043", "ORD-1044"].map(x => (
                      <div className="m-list" key={x}>{x}<b>→</b></div>
                    ))}
                  </>
                )}
                {screen === "Inventory" && (
                  <>
                    <h3>Inventory</h3>
                    {["Industrial Motor", "Sensors Kit", "HVAC Filters"].map(x => (
                      <div className="m-list" key={x}>{x}<b>Healthy</b></div>
                    ))}
                  </>
                )}
                {screen === "Notifications" && (
                  <>
                    <h3>Notifications</h3>
                    <div className="m-card">⚡ Energy alert<br/><b>Motor B peak load review</b></div>
                    <div className="m-card">✓ Workflow completed<br/><b>Invoice reconciliation</b></div>
                  </>
                )}
                {screen === "Profile" && (
                  <>
                    <h3>Profile</h3>
                    <div className="profile-circle">AM</div>
                    <p className="center">Alex Morgan<br/><small>Operations Director</small></p>
                  </>
                )}
              </div>
              <div className="mobile-nav">
                {screens.map(x => (
                  <button className={screen === x ? "active" : ""} onClick={() => setScreen(x)} key={x}>{x.slice(0, 4)}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="architecture panel">
            <div className="panel-head">MOBILE ARCHITECTURE & API SYNCHRONIZATION</div>
            <div className="arch-flow">
              {["MOBILE NATIVE APP (React Native / Flutter)", "REST & WEBSOCKET API GATEWAY", "MICROSERVICES BACKEND", "DISTRIBUTED DATABASE & CLUSTER"].map((x, i) => (
                <React.Fragment key={x}>
                  <div>{x}</div>
                  {i < 3 && <span>↕</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- Integration ---
function Integration({connections, setConnections}) {
  return (
    <>
      <PageHead eyebrow="ENTERPRISE CONNECTIVITY" title="System Integration Layer" sub="Visualize how disparate enterprise systems connect through an asynchronous integration layer." />
      <div className="integration-hero panel">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85" alt="Enterprise network and server infrastructure" />
        <div>
          <span className="integration-kicker">CONNECTED ENTERPRISE ARCHITECTURE</span>
          <h2>Systems That Work Together in Real-Time.</h2>
          <p>ERP, CRM, APIs, cloud databases, IoT telemetry, and analytics unified into one resilient event-driven architecture.</p>
        </div>
      </div>
      <div className="integration-map panel">
        <div className="system-nodes left">
          {["ERP", "CRM", "SAP", "DATABASE"].map(x => <div key={x}>{x}<small>Source System</small></div>)}
        </div>
        <div className="integration-core">
          <div>DPT</div>
          <b>INTEGRATION<br/>BUS</b>
        </div>
        <div className="system-nodes right">
          {["APIs", "CLOUD", "IoT SCADA", "ANALYTICS"].map(x => <div key={x}>{x}<small>Consumer Service</small></div>)}
        </div>
        <div className="integration-output"><span>WORKFLOW AUTOMATION</span><span>ANALYTICS ENGINE</span><span>EXECUTIVE DASHBOARDS</span></div>
      </div>
      <div className="panel">
        <div className="panel-head">MANAGED API INTEGRATION CONNECTIONS</div>
        {Object.entries(connections).map(([x, v]) => (
          <div className="connection" key={x}>
            <div><b>{x} Connector</b><small>{v ? "High-speed bi-directional sync active" : "Standby connection ready"}</small></div>
            <button className={"switch " + (v ? "on" : "")} onClick={() => setConnections(c => ({...c, [x]: !c[x]}))}>
              <i></i>{v ? "CONNECTED" : "OFFLINE"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// --- Cloud ---
function Cloud() {
  const layers = [
    ["USERS & CLIENTS", "Web, Mobile, External API Consumer Access", "#ff3fa4"],
    ["EDGE & CDN LAYER", "Cloudflare edge caching, DDoS mitigation, WAF", "#a855f7"],
    ["API GATEWAY", "Rate-limiting, JWT authentication, GraphQL / REST", "#22d3ee"],
    ["APPLICATION MICROSERVICES", "Containerized business logic, Kubernetes pods", "#f97316"],
    ["PERSISTENCE & CACHING", "PostgreSQL, MongoDB, Redis in-memory cache", "#20d9a6"],
    ["CLOUD INFRASTRUCTURE", "AWS / Azure multi-region VPC with automated scaling", "#ffd166"]
  ];
  return (
    <>
      <PageHead eyebrow="CLOUD ARCHITECTURE & DEVOPS" title="Scalable Cloud Solutions" sub="Multi-tenant cloud infrastructure engineered for 99.98% availability, observability, and sub-second response times." />
      <div className="cloud-hero panel">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85" alt="Cloud computing network" />
        <div>
          <span className="cloud-kicker">CLOUD NATIVE RESILIENCE</span>
          <h2>Build Once. Scale Everywhere.</h2>
          <p>From web and mobile experiences to APIs, data persistence and infrastructure, every tier is decoupled for independent horizontal scalability.</p>
        </div>
      </div>
      <div className="cloud-stack">
        {layers.map(([x, desc, color], i) => (
          <div key={x} className={"cloud-layer cloud-tone-" + i} style={{"--tone": color}}>
            <span className="cloud-mark">☁</span><b>{x}</b><small>{desc}</small>
          </div>
        ))}
      </div>
      <div className="feature-grid">
        {[
          ["Multi-Region Deployment","Automated failover across redundant availability zones."],
          ["Distributed Database Clustering","Read-replicas, point-in-time recovery, and ACID compliance."],
          ["API Gateway & Rate Limiting","Hardened reverse proxy protecting core microservices."],
          ["Zero-Trust Security","mTLS, OAuth2/OIDC RBAC, and encrypted data at rest."],
          ["Full-Stack Observability","OpenTelemetry tracing, Prometheus metrics, and Grafana."],
          ["Auto-Scaling Kubernetes","Horizontal Pod Autoscaling (HPA) handling peak surges."]
        ].map(([title, desc], i) => (
          <div className={"feature panel cloud-feature cloud-feature-" + i} key={title}>
            <span>✦</span><h3>{title}</h3><p>{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// --- Custom Software ---
function Custom({open}) {
  const steps = ["REQUIREMENTS ENGINEERING", "SYSTEM ARCHITECTURE", "UI/UX DESIGN SYSTEM", "FRONTEND CODING", "BACKEND MICROSERVICES", "DATABASE SCHEMAS", "API GATEWAY", "AUTOMATED TESTING", "CI/CD DEPLOYMENT", "24/7 SLA SUPPORT"];
  return (
    <>
      <PageHead eyebrow="SOFTWARE ENGINEERING" title="Custom Software Development Lifecycle" sub="From initial requirement discovery to production deployment and long-term SLA support." />
      <div className="software-hero panel">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85" alt="Software team working with digital systems" />
        <div>
          <span className="software-kicker">FULL-LIFECYCLE ENGINEERING</span>
          <h2>Turning Complex Specifications into Production Systems.</h2>
          <p>Architecture, product design, development, automated test suites, and continuous deployment united into an agile delivery methodology.</p>
        </div>
      </div>
      <div className="lifecycle-grid">
        {steps.map((x, i) => <div className={'lifecycle-step lifecycle-step-' + (i%10)} key={x}><span className="lifecycle-mark">✦</span><b>{x}</b>{i < 9 && <em>↓</em>}</div>)}
      </div>
      <div className="center-action">
        <button className="btn primary" onClick={open}>VIEW DEVELOPMENT LIFECYCLE BREAKDOWN →</button>
      </div>
    </>
  );
}

// --- Ecosystem ---
function Ecosystem({go}) {
  const groups = [
    {n:"01", title:"Intelligent Systems", desc:"Turn business data into foresight, automation, and better decisions.", icon:"✳", items:"AI & Machine Learning · Data Analytics · Business Intelligence", links:["ai","data"]},
    {n:"02", title:"Digital Experiences", desc:"Build accessible, high-performance experiences across every screen.", icon:"⌘", items:"Web Platforms · Mobile Applications · Customer Portals", links:["web","mobile"]},
    {n:"03", title:"Enterprise Platforms", desc:"Connect the core workflows that keep an organisation moving.", icon:"▦", items:"ERP Systems · CRM Platforms · Business Workflows", links:["erp","crm"]},
    {n:"04", title:"Cloud & Integration", desc:"Bring services, applications, and information together securely.", icon:"⇄", items:"Cloud Infrastructure · APIs · System Integration", links:["cloud","integration"]},
    {n:"05", title:"Connected Operations", desc:"Improve visibility and control across physical operations.", icon:"⌁", items:"IoT · SCADA · Energy Technology", links:["integration","energy"]},
    {n:"06", title:"Purpose-built Software", desc:"Create dependable tools around the way your business actually works.", icon:"◇", items:"Custom Applications · Process Automation · Modernisation", links:["custom","automation"]}
  ];
  return (
    <>
      <PageHead eyebrow="DPT DIGITAL CAPABILITIES" title="Technology Ecosystem" sub="A clear view of the capabilities we bring together to solve complex business challenges." />
      <section className="ecosystem-hero panel">
        <div className="ecosystem-hero-visual">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85" alt="Technology team collaborating" />
          <span className="ecosystem-visual-label"><i></i> CONNECTED BY DESIGN</span>
        </div>
        <div className="ecosystem-hero-copy">
          <span>ONE PARTNER. CONNECTED CAPABILITIES.</span>
          <h2>Technology that works<br/><em>better together.</em></h2>
          <p>From strategy and software to infrastructure and intelligent operations, DPT aligns the right technologies around your goals—with clarity, security, and room to scale.</p>
          <div className="ecosystem-stats"><div><b>06</b><small>CAPABILITY GROUPS</small></div><div><b>360°</b><small>CONNECTED THINKING</small></div><div><b>∞</b><small>ROOM TO GROW</small></div></div>
        </div>
      </section>
      <section className="ecosystem-frame">
        <div className="ecosystem-frame-head"><div><span className="eyebrow">THE DPT FRAMEWORK</span><h2>Explore our capabilities</h2></div><p>Choose a capability group to view its solutions.</p></div>
        <div className="ecosystem-brandbar"><div className="ecosystem-brandmark"><img src={logo} alt="DPT Technologies" /></div><div><b>DPT TECHNOLOGIES</b><small>ENTERPRISE TECHNOLOGY PARTNER</small></div><span className="ecosystem-live"><i></i> CONNECTED ECOSYSTEM</span></div>
        <div className="ecosystem ecosystem-groups">
          {groups.map((group) => (
            <article key={group.n} className="eco-group">
              <div className="eco-group-top"><span className="eco-group-icon">{group.icon}</span><span className="eco-group-number">{group.n} / 06</span></div>
              <h3>{group.title}</h3><p>{group.desc}</p>
              <div className="eco-group-items">{group.items}</div>
              <div className="eco-group-actions">{group.links.map((id, i) => <button key={id} onClick={() => go(id)}>{i === 0 ? "Explore solutions" : "Related capability"}<span>↗</span></button>)}</div>
            </article>
          ))}
        </div>
        <div className="ecosystem-frame-foot"><span>MODULAR BY NATURE</span><span>SCALABLE BY DESIGN</span><span>CONNECTED FOR IMPACT</span></div>
      </section>
    </>
  );
}

// --- About & Contact ---
function About({go}){
  return <div className="closing">
    <img src={logo} alt="DPT Technologies" />
    <span className="eyebrow">DPT TECHNOLOGIES PRIVATE LIMITED</span>
    <h1>Engineering Enterprise Solutions.<br/><span>Connecting Intelligence to Business Action.</span></h1>
    <p className="closing-intro">We partner with ambitious teams to turn complex challenges into reliable, scalable digital products. From the first architecture discussion to long-term optimization, our focus is on technology that creates measurable business value.</p>
    <div className="closing-pillars">
      <div><span>01</span><b>Built around your goals</b><small>Practical solutions shaped by your workflows and priorities.</small></div>
      <div><span>02</span><b>Connected by design</b><small>AI, cloud, data, and business systems working together.</small></div>
      <div><span>03</span><b>Ready to scale</b><small>Maintainable foundations for your next stage of growth.</small></div>
    </div>
    <div className="closing-contact-heading"><span className="eyebrow">LET'S BUILD SOMETHING USEFUL</span><h2>Start a conversation</h2><p>Tell us what you’re planning. We’ll help you map the next step.</p></div>
    <div className="closing-contact-card">
      <div className="ccc-row">
        <b>Direct Inquiries:</b>
        <a href="mailto:dpttechnologiespvtltd@gmail.com">dpttechnologiespvtltd@gmail.com</a>
      </div>
      <div className="ccc-row">
        <b>Phone Support:</b>
        <a href="tel:+917065300376">+91 70653 00376</a>
      </div>
      <div className="ccc-row">
        <b>Corporate Headquarters:</b>
        <span>SPAZE I–TECH PARK, Sector 49, Gurgaon, Haryana, India</span>
      </div>
    </div>
    <div className="closing-actions">
      <button className="btn primary" onClick={()=>go("dashboard")}>RETURN TO EXECUTIVE OVERVIEW</button>
    </div>
  </div>;
}

// --- Modal Component ---
function Modal({title,children}){
  return <div className="modal-backdrop">
    <div className="modal">
      <div className="modal-head">
        <h2>{title}</h2>
        <button onClick={()=>window.dispatchEvent(new CustomEvent("dpt-close-modal"))}>×</button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
