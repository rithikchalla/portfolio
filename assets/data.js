// All site content lives here. Edit this file; nothing else needs to change.
window.SITE = {
  name: "Rithik Reddy Challa",
  title: "Data & AI Engineer",
  location: "Boston, MA",
  email: "19rithik@gmail.com",
  linkedin: "https://www.linkedin.com/in/rithikreddychalla",
  github: "https://github.com/rithikchalla",
  resumeUrl: "", // e.g. "assets/Rithik_Reddy_Challa_Resume.pdf"; a "résumé" button appears when set
  openTo: "AI Data Engineer · AI Engineer · Forward Deployed Engineer",

  roles: ["multi-agent text-to-SQL", "RAG with cited answers", "LLM evals & guardrails", "self-healing pipeline agents", "TB-scale GCP platforms"],
  // Hero 3D: the same points re-shape into each of these, with a line about me.
  shapes: [
    { name: "WAREHOUSE", line: "I've modelled them at Wayfair, Optum and CVS" },
    { name: "DATA LAKE", line: "I archived 600 TB of one ($130K/yr saved)" },
    { name: "ICEBERG", line: "I moved Spark pipelines onto it: −50% compute" },
    { name: "NEURAL NET", line: "I fine-tuned BERT on 1M+ posts" },
    { name: "AI AGENT", line: "I ship them to VPs and SVPs" }
  ],

  // Hero stat tiles (count-up)
  stats: [
    { n: 120, suffix: "+", label: "tables migrated Azure → GCP at 99% accuracy" },
    { n: 50, prefix: "~", label: "analysts, VPs & SVPs use my text-to-SQL agent" },
    { n: 600, suffix: " TB", label: "of dead data archived · $130K/yr saved" },
    { n: 98, suffix: "%", label: "extraction accuracy, RAG contract parser" }
  ],

  cert: {
    name: "Professional Data Engineer", issuer: "Google Cloud", date: "Jan 2025",
    url: "", // paste your Credly link and a "verify credential" button appears
    domains: ["Designing data processing systems", "Ingesting and processing data", "Storing data", "Preparing and using data for analysis", "Maintaining and automating data workloads"]
  },

  // "What's under the title": the iceberg dive, told in first person.
  // big = headline number that counts up; strata = short layer name shown beside the iceberg.
  dive: [
    { strata: "THE TITLE", kicker: "above the waterline", title: "This is what my title says.",
      text: "Data & AI Engineer at CVS Health. Accurate, but it's the 10% you can see. Dive with me.",
      items: [] },
    { strata: "PRODUCTION AI", kicker: "−12 m", title: "I build AI that executives use every day.",
      text: "Not prototypes. Systems analysts, VPs and SVPs open every morning.",
      big: { n: 70, pre: "−", suf: "%", label: "investigation time" },
      items: [
        { k: "−70%", s: "investigation time", v: "My multi-agent text-to-SQL system (Google ADK) is used by ~50 people, VPs and SVPs included" },
        { k: "98%", s: "RAG accuracy", v: "My RAG contract-intelligence pipeline extracts terms with a citation on every answer" },
        { k: "evals", s: "regressions caught", v: "I score production agents for accuracy and groundedness against labeled test sets before any prompt or model change ships" }
      ] },
    { strata: "AGENTS", kicker: "−30 m", title: "My agents fix things before anyone wakes up.",
      text: "On Palantir AIP they triage failures, diagnose root causes and rerun safe fixes behind guardrails.",
      big: { n: 70, pre: "−", suf: "%", label: "after-hours on-call calls" },
      items: [
        { k: "−50%", s: "debug time", v: "Pipeline debug time, with my AIP production-support agent" },
        { k: "−70%", s: "on-call calls", v: "After-hours on-call calls, same agent" },
        { k: "days→hrs", s: "scenario analysis", v: "My AIP scenario-modeling assistant queries the data, runs simulations and compares outcomes" },
        { k: "~100M", s: "records, geospatial AI", v: "Patient records behind my AI analyst agent; it answers access questions with PDF briefs, charts and maps" }
      ] },
    { strata: "PLATFORMS", kicker: "−55 m", title: "I build the ground the AI stands on.",
      text: "TB-scale platforms that other teams trust and reuse.",
      big: { n: 120, suf: "+", label: "tables migrated at 99% accuracy" },
      items: [
        { k: "120+", s: "tables → GCP", v: "Tables I migrated Azure → GCP, some with billions of rows, at 99% accuracy, on a platform I built from scratch" },
        { k: "every row", s: "validated on Dataproc", v: "My TB-scale Spark validation framework hashes and compares every row and column; reused across teams" },
        { k: "~60", s: "engineers on my DQ framework", v: "Engineers across 6–7 teams use my data quality & drift framework; it also guards executive finance reporting" },
        { k: "SFTP", s: "event-driven payments check", v: "My event-driven pipeline flags under/overpayments and protects a high-dollar revenue stream" }
      ] },
    { strata: "COST & SPEED", kicker: "−75 m", title: "I make it cheaper and faster, and I measure it.",
      text: "Every optimisation comes with a number.",
      big: { n: 130, pre: "$", suf: "K", label: "saved every year" },
      items: [
        { k: "$130K", s: "saved / yr", v: "A year, from archiving 600 TB of unused data" },
        { k: "−50%", s: "compute (Iceberg)", v: "Compute, after I moved Foundry PySpark pipelines to Apache Iceberg incremental loads" },
        { k: "−40%", s: "Spark runtime", v: "Spark runtime, from partitioning and resource tuning" }
      ] },
    { strata: "FOUNDATION", kicker: "−90 m · the base", title: "5+ years of doing this for real.",
      text: "Healthcare and e-commerce, from tuning SQL to shipping agents.",
      big: { n: 5, suf: "+", label: "years in industry" },
      items: [
        { k: "CVS", s: "2024–now", v: "Health · Data Engineer · 2024–now" },
        { k: "Optum", s: "2019–2021", v: "UnitedHealth Group · Software Engineer · 2019–2021" },
        { k: "Wayfair", s: "2023", v: "Data Engineer Co-op · 2023" },
        { k: "MS", s: "Northeastern", v: "Data Analytics Engineering · Northeastern University" }
      ] },
    { finale: true, kicker: "the whole iceberg", title: "That's what's under my title.",
      text: "Next: where I did it, one commit at a time.",
      chips: ["5+ years", "4 companies", "2 industries", "~50 exec users", "$130K/yr saved", "Google Cloud certified"],
      items: [] }
  ],

  // Career, newest first. hl = numbers to highlight in the bullets.
  experience: [
    { org: "CVS Health", role: "Data Engineer", when: "Sep 2024 – Present", where: "Woonsocket, RI", head: true,
      groups: [
        { name: "AI & LLM systems", bullets: [
          "Architected a multi-agent text-to-SQL and root-cause analysis system on Google ADK and GCP, with tool-calling agents that generate, run and explain SQL; serves ~50 users including VPs and SVPs with audience-tailored briefs, cutting investigation cycles by 70%",
          "Built a RAG pipeline for contract intelligence (chunking, embeddings, retrieval, structured extraction) with citations on every answer, reaching 98% extraction accuracy and eliminating manual reimbursement errors",
          "Established LLM evaluation for production agents, scoring accuracy and groundedness against labeled test sets to catch regressions before prompt or model changes ship",
          "Shipped an AI production-support agent on Palantir AIP that triages pipeline and data quality failures, diagnoses root causes and auto-reruns safe failures behind guardrails, cutting debug time by 50% and after-hours on-call calls by 70%",
          "Built an AI scenario-modeling assistant on Palantir AIP that interprets user questions, queries the relevant data, runs simulation functions and compares outcomes, cutting scenario analysis from days to hours",
          "Developed an AI analyst agent over a geospatial pipeline spanning ~100M patient records that answers healthcare-access questions and auto-generates PDF briefs, charts and maps" ] },
        { name: "Data platform & engineering", bullets: [
          "Led the Azure-to-GCP migration of the team's application: 120+ tables, several with billions of rows, at 99% source-to-target accuracy; stood up the GCP platform from scratch (Composer, Pub/Sub, GKE, GCS, BigQuery)",
          "Engineered a TB-scale validation framework in Spark on Dataproc that hashes and compares every row and column between source and target; now reused across multiple teams",
          "Designed a cross-platform data quality and drift framework (Snowflake, BigQuery, Foundry, Cloud SQL) with a React UI, adopted as the standard across 6–7 teams (~60 engineers) and embedded in executive finance reporting",
          "Automated an event-driven pipeline that ingests partner files (PDF, CSV, Excel) from SFTP, joins them with internal data and flags under/overpayments with AI-generated suggestions",
          "Cut platform costs by archiving 600 TB of unused data ($130K/year), moving Foundry PySpark pipelines to Apache Iceberg incremental loads (50% less compute) and tuning Spark partitioning (40% faster runtime)",
          "Partnered with finance and business stakeholders from requirements through delivery, shipping semantic layers and AI tools now used in executive reporting" ] }
      ], tags: ["Google ADK", "Palantir AIP", "RAG", "LLM evals", "Guardrails", "Foundry", "GCP", "Dataproc", "BigQuery", "Iceberg", "Spark", "Snowflake", "React"] },
    { org: "Apex Systems", role: "Data Engineer · client: CVS Health", when: "Apr 2024 – Sep 2024", where: "Woonsocket, RI",
      groups: [{ bullets: [
        "Developed Palantir Foundry pipelines integrating multi-source datasets, cutting data processing time by 30%",
        "Refactored PySpark transforms and cleaned data for reconciliation, improving runtime and cross-dataset accuracy",
        "Built a centralized data health dashboard in Foundry, giving stakeholders real-time visibility into data quality metrics" ] }],
      tags: ["Palantir Foundry", "PySpark", "Data quality"] },
    { org: "Wayfair", role: "Data Engineer Co-op", when: "Jan 2023 – Jul 2023", where: "Boston, MA",
      groups: [{ bullets: [
        "Architected a GCP data environment for a product management team, giving them self-serve access to analytics data",
        "Designed an ELT pipeline (BigQuery, SQL, Cloud Composer) powering the company Data Catalog initiative",
        "Identified and removed 100K+ redundant and obsolete tables using Looker dashboards tracking 10+ catalog KPIs",
        "Reworked existing ETL pipelines, reducing operational costs by 30% while maintaining data integrity" ] }],
      tags: ["GCP", "BigQuery", "Cloud Composer", "Looker"] },
    { org: "Northeastern University", role: "MS, Data Analytics Engineering", when: "Jan 2022 – Dec 2023", where: "Boston, MA", edu: true,
      groups: [], tags: [] },
    { org: "UnitedHealth Group (Optum)", role: "Software Engineer", when: "Jul 2019 – Dec 2021", where: "Hyderabad, India",
      groups: [{ bullets: [
        "Engineered a Python and Airflow ingestion framework, containerized on Kubernetes, that migrated 100+ tables from MS SQL to Snowflake, cutting ETL time by 80% and saving 20 hours/week",
        "Architected an end-to-end pipeline for patient EHR data on Azure (Blob Storage, ADF, Functions) and Snowflake, improving data freshness by 50%",
        "Automated data ingestion through REST API integrations, enabling near real-time updates for downstream ML models",
        "Developed a full-stack Angular and .NET Core application that maps payments to claims, with multi-level approval workflows",
        "Optimized SQL with CTEs, window functions and indexing, speeding up query execution by 25%",
        "Created a CI/CD pipeline (Jenkins, Git) with automated tests and security scans across four environments, cutting deployment time by 60%; mentored 4 new engineers building Grafana/Loki/Prometheus monitoring" ] }],
      tags: ["Python", "Airflow", "Snowflake", "Azure", "Kubernetes", "Angular", ".NET Core", "Jenkins"] },
    { org: "Osmania University (MVSR Engineering College)", role: "BE, Computer Science", when: "May 2019", where: "Hyderabad, India", edu: true,
      groups: [], tags: [] }
  ],

  // AI agent demos: sample data, recreating the shape of systems I've built.
  tools: ["router", "sql.agent", "rca.agent", "rag.retrieve", "foundry.ops", "eval.check"],
  scenarios: [
    { id: "t2s", name: "Multi-agent text-to-SQL", stack: "Google ADK · BigQuery · Gemini",
      trace: [
        { t: "user", s: "VP asks: why did order fulfilment time jump last week?" },
        { t: "plan", s: "detect audience → write SQL → decompose the change → exec brief" },
        { t: "tool", tool: "router", s: "audience = executive", r: "3-line brief + 1 chart" },
        { t: "tool", tool: "sql.agent", s: "SELECT week, region, carrier, avg(hours) FROM fulfilment_daily …", r: "+18% week over week" },
        { t: "tool", tool: "rca.agent", s: "decompose Δ by region × carrier", r: "82% of Δ: one carrier, two regions" },
        { t: "tool", tool: "eval.check", s: "every number traced to a query?", r: "grounded ✔" },
        { t: "answer", s: "Fulfilment time rose 18%. 82% of it comes from one carrier in two regions. Brief and chart attached; analysts get the SQL." }
      ] },
    { id: "heal", name: "Self-healing pipeline agent", stack: "Palantir AIP · Foundry · PySpark",
      trace: [
        { t: "user", s: "alert: build orders_clean FAILED at 02:14" },
        { t: "plan", s: "triage → find root cause → guardrail check: is the fix safe? → rerun → verify" },
        { t: "tool", tool: "foundry.ops", s: "get_build_logs(orders_clean)", r: "schema mismatch on amount" },
        { t: "tool", tool: "rca.agent", s: "diff upstream schema vs contract", r: "string → decimal upstream; safe cast" },
        { t: "tool", tool: "foundry.ops", s: "rerun(orders_clean, patch = cast_amount)", r: "build ✔ in 4m 12s" },
        { t: "tool", tool: "eval.check", s: "row counts + 42 data-quality rules", r: "42 / 42 pass" },
        { t: "answer", s: "Fixed and rerun before anyone woke up. No page sent. Ticket filed with the diff for the morning." }
      ] },
    { id: "rag", name: "Grounded contract RAG", stack: "Embeddings · vector search · LLM evals",
      trace: [
        { t: "user", s: "What's the termination notice period and late-payment penalty in this supplier agreement?" },
        { t: "plan", s: "classify → hybrid retrieve → extract → cite → check groundedness" },
        { t: "tool", tool: "router", s: "intent = term extraction", r: "2 fields" },
        { t: "tool", tool: "rag.retrieve", s: "hybrid search, top-k = 8", r: "§12.2 Termination · §7.4 Payment" },
        { t: "tool", tool: "eval.check", s: "is every claim supported by a cited span?", r: "2 / 2 grounded ✔" },
        { t: "answer", s: "90 days' written notice (§12.2). Late invoices accrue 1.5% per month (§7.4). Both answers link to the exact clause." }
      ] }
  ],

  // Ontology explorer (sample supply-chain model).
  ontology: {
    objects: [
      { id: "Customer", color: "pink",   props: ["customer_id (PK)", "name", "segment", "region"], actions: ["update_segment"] },
      { id: "Order",    color: "lime",   props: ["order_id (PK)", "status", "due_date", "value_usd"], actions: ["flag_at_risk", "reassign_plant"] },
      { id: "Product",  color: "paper",  props: ["sku (PK)", "name", "category", "unit_cost"], actions: ["update_cost"] },
      { id: "Shipment", color: "blue",   props: ["shipment_id (PK)", "eta", "carrier", "delay_days"], actions: ["expedite"] },
      { id: "Supplier", color: "tomato", props: ["supplier_id (PK)", "name", "avg_delay_days", "risk_score"], actions: ["open_review"] },
      { id: "Plant",    color: "paper",  props: ["plant_id (PK)", "location", "capacity"], actions: ["adjust_capacity"] }
    ],
    links: [
      ["Customer", "Order", "places"], ["Order", "Product", "contains"], ["Order", "Shipment", "ships via"],
      ["Shipment", "Plant", "leaves from"], ["Product", "Supplier", "sourced from"], ["Supplier", "Plant", "supplies"]
    ]
  },

  // Skills with receipts. "at" = org keys below; receipts come straight from my résumé.
  orgs: {
    CVS: { name: "CVS Health", when: "2024–now" },
    Apex: { name: "Apex Systems", when: "2024 · client CVS" },
    Wayfair: { name: "Wayfair", when: "2023" },
    Optum: { name: "Optum (UHG)", when: "2019–2021" },
    GitHub: { name: "GitHub", when: "public" }
  },
  featuredSkills: ["Google ADK · multi-agent", "Palantir AIP", "RAG · embeddings · retrieval", "LLM evaluation", "Apache Spark · PySpark", "Apache Iceberg", "BigQuery", "Snowflake"],
  categories: ["AI & LLM", "Data Engineering", "Cloud & DevOps", "Languages & Frameworks", "BI"],
  skills: [
    { name: "Google ADK · multi-agent", cat: "AI & LLM", r: [["CVS", "Multi-agent text-to-SQL + root-cause analysis; tool-calling agents generate, run and explain SQL for ~50 users incl. VPs & SVPs", "−70% investigation time"]] },
    { name: "Palantir AIP", cat: "AI & LLM", r: [["CVS", "Production-support agent that triages failures, diagnoses root causes and auto-reruns safe fixes", "−50% debug · −70% on-call"], ["CVS", "Scenario-modeling assistant that queries data, runs simulation functions and compares outcomes", "days → hours"]] },
    { name: "RAG · embeddings · retrieval", cat: "AI & LLM", r: [["CVS", "Contract-intelligence pipeline: chunking, embeddings, retrieval, structured extraction, citations on every answer", "98% extraction accuracy"]] },
    { name: "LLM evaluation", cat: "AI & LLM", r: [["CVS", "Scores production agents for accuracy and groundedness against labeled test sets", "regressions caught before ship"]] },
    { name: "Guardrails", cat: "AI & LLM", r: [["CVS", "Safe-fix guardrails on the AIP production-support agent before any auto-rerun", "−70% after-hours calls"]] },
    { name: "Text-to-SQL", cat: "AI & LLM", r: [["CVS", "Agents that generate, run and explain SQL, with audience-tailored briefs", "~50 users"]] },
    { name: "Tool calling", cat: "AI & LLM", r: [["CVS", "Tool-calling agents across SQL, RCA, simulation and pipeline tools", "in production"], ["GitHub", "Coding agent in Go with OpenAI-compatible tool calling", "public repo"]] },
    { name: "LLM applications · agents", cat: "AI & LLM", r: [["CVS", "AI analyst agent over a geospatial pipeline that writes PDF briefs, charts and maps", "~100M patient records"], ["GitHub", "Claude Code-style coding agent in Go", "public repo"]] },
    { name: "LangChain", cat: "AI & LLM", r: [] },
    { name: "Prompt engineering", cat: "AI & LLM", r: [] },
    { name: "Palantir Foundry · Ontology", cat: "Data Engineering", r: [["CVS", "Moved Foundry PySpark pipelines to Apache Iceberg incremental loads", "50% less compute"], ["Apex", "Foundry pipelines integrating multi-source datasets", "−30% processing time"], ["Apex", "Centralized data health dashboard in Foundry", "real-time DQ visibility"]] },
    { name: "Apache Spark · PySpark", cat: "Data Engineering", r: [["CVS", "TB-scale validation framework on Dataproc that hashes and compares every row and column", "reused across teams"], ["CVS", "Tuned Spark partitioning", "40% faster runtime"], ["Apex", "Refactored PySpark transforms for reconciliation", "better runtime & accuracy"]] },
    { name: "Apache Iceberg", cat: "Data Engineering", r: [["CVS", "Foundry PySpark pipelines → Iceberg incremental loads", "50% less compute"]] },
    { name: "BigQuery", cat: "Data Engineering", r: [["CVS", "Core of the GCP platform I stood up for the Azure → GCP migration", "120+ tables · 99%"], ["Wayfair", "ELT pipeline powering the company Data Catalog", "company-wide catalog"]] },
    { name: "Snowflake", cat: "Data Engineering", r: [["Optum", "Python + Airflow framework migrating 100+ MS SQL tables to Snowflake", "−80% ETL time"], ["Optum", "Patient EHR pipeline landing in Snowflake", "+50% data freshness"], ["CVS", "One of four platforms under my data quality & drift framework", "~60 engineers"]] },
    { name: "Airflow · Composer", cat: "Data Engineering", r: [["CVS", "Composer orchestration on the GCP platform I built", "TB-scale migration"], ["Wayfair", "Cloud Composer ELT for the Data Catalog", "company-wide catalog"], ["Optum", "Airflow ingestion framework for 100+ tables", "20 h/week saved"]] },
    { name: "Pub/Sub · event-driven", cat: "Data Engineering", r: [["CVS", "Ingests partner files (PDF, CSV, Excel) from SFTP and flags under/overpayments with AI suggestions", "protects a high-dollar revenue stream"]] },
    { name: "Data quality", cat: "Data Engineering", r: [["CVS", "Cross-platform DQ & drift framework with a React UI, embedded in executive finance reporting", "standard for ~60 engineers"], ["Apex", "Foundry data health dashboard", "real-time visibility"]] },
    { name: "Data migration · validation", cat: "Data Engineering", r: [["CVS", "Azure → GCP, several tables with billions of rows, validated row by row on Dataproc", "120+ tables · 99%"], ["Optum", "MS SQL → Snowflake", "100+ tables · −80% ETL"]] },
    { name: "Semantic layers", cat: "Data Engineering", r: [["CVS", "Semantic layers built with finance & business stakeholders, used in executive reporting", "exec reporting"]] },
    { name: "Data modeling", cat: "Data Engineering", r: [["CVS", "Models behind the semantic layers and executive reporting", "exec reporting"]] },
    { name: "Geospatial pipelines", cat: "Data Engineering", r: [["CVS", "Geospatial pipeline for healthcare-access analysis", "~100M patient records"]] },
    { name: "Storage cost / archival", cat: "Data Engineering", r: [["CVS", "Archival strategy for unused data", "600 TB · $130K/yr"]] },
    { name: "Google Cloud (GCP)", cat: "Cloud & DevOps", r: [["CVS", "Stood up the platform from scratch: Composer, Pub/Sub, GKE, GCS, BigQuery", "TB scale"], ["Wayfair", "GCP data environment for a product management team", "self-serve analytics"]] },
    { name: "Dataproc", cat: "Cloud & DevOps", r: [["CVS", "Spark validation framework comparing every row and column, source vs target", "reused across teams"]] },
    { name: "Azure", cat: "Cloud & DevOps", r: [["Optum", "Patient EHR pipeline on Blob Storage, ADF and Functions", "+50% data freshness"], ["CVS", "Migrated the team's application off Azure", "120+ tables"]] },
    { name: "Docker · Kubernetes", cat: "Cloud & DevOps", r: [["Optum", "Ingestion framework containerized on Kubernetes", "100+ tables migrated"], ["CVS", "GKE on the new GCP platform", "built from scratch"]] },
    { name: "CI/CD · Jenkins", cat: "Cloud & DevOps", r: [["Optum", "Pipeline with automated tests and security scans across 4 environments", "−60% deploy time"]] },
    { name: "Grafana · Prometheus", cat: "Cloud & DevOps", r: [["Optum", "Mentored 4 new engineers building Grafana/Loki/Prometheus monitoring", "4 engineers mentored"]] },
    { name: "Python", cat: "Languages & Frameworks", r: [["Optum", "Ingestion framework migrating 100+ tables", "−80% ETL time"], ["GitHub", "SEC EDGAR financial-statements ETL", "public repo"]] },
    { name: "SQL", cat: "Languages & Frameworks", r: [["Optum", "CTEs, window functions and indexing", "−25% query time"], ["CVS", "SQL generated, run and explained by my agents", "~50 users"]] },
    { name: "TypeScript · React", cat: "Languages & Frameworks", r: [["CVS", "UI for the data quality framework", "used by ~60 engineers"]] },
    { name: "Angular · .NET Core · C#", cat: "Languages & Frameworks", r: [["Optum", "Full-stack app mapping payments to claims with multi-level approvals", "full stack"]] },
    { name: "REST APIs", cat: "Languages & Frameworks", r: [["Optum", "API ingestion feeding near real-time updates to downstream ML models", "near real-time"]] },
    { name: "Looker", cat: "BI", r: [["Wayfair", "Dashboards tracking 10+ catalog KPIs", "100K+ tables removed"]] }
  ],

  // The narrator bubble: one line per section, in my voice.
  narrator: {
    hero: "Hi, I'm Rithik. I build data platforms and the AI that runs on them.",
    dive: "Most people only see the title. Let me show you what's underneath.",
    experience: "Here's where I've done it, newest first. Click to expand.",
    agents: "This is how my agents think. Pick one and watch.",
    work: "A few things I've shipped, with the numbers.",
    ontology: "On Foundry I model the business itself. Drag things around.",
    cert: "Google checked my work too: certified in January 2025.",
    skills: "Click any skill and I'll show you where I used it.",
    contact: "That's me. I'd love to hear what you're building."
  },

  // Case studies from my work. Confidential, so no code, data or links: problem → build → result.
  cases: [
    { title: "Multi-agent text-to-SQL", tag: "AI system", metric: "−70%", metricLabel: "investigation time",
      problem: "Leaders waited on analysts for every 'why did this number move?' question.",
      build: "A multi-agent system on Google ADK + GCP: tool-calling agents generate, run and explain SQL, another runs root-cause analysis, and the output is tailored to the audience (exec brief vs analyst detail).",
      result: "Used by ~50 people including VPs and SVPs; investigation cycles 70% shorter.",
      stack: ["Google ADK", "Gemini", "BigQuery", "Text-to-SQL"] },
    { title: "Self-healing pipeline agent", tag: "AI system", metric: "−70%", metricLabel: "after-hours on-call calls",
      problem: "Pipeline and data quality failures meant night-time pages and slow manual debugging.",
      build: "An AI production-support agent on Palantir AIP that triages failures, diagnoses root causes and auto-reruns safe fixes behind guardrails.",
      result: "Pipeline debug time down 50%, after-hours on-call calls down 70%.",
      stack: ["Palantir AIP", "Foundry", "PySpark"] },
    { title: "Grounded contract parser", tag: "AI system", metric: "98%", metricLabel: "extraction accuracy",
      problem: "Manual reading of contract terms caused reimbursement errors.",
      build: "A RAG pipeline (chunking, embeddings, retrieval, structured extraction) with citations on every answer, plus LLM evals for accuracy and groundedness against labeled test sets.",
      result: "98% accuracy; manual reimbursement errors eliminated.",
      stack: ["RAG", "Embeddings", "Vector search", "LLM evals"] },
    { title: "Azure → GCP migration", tag: "Platform", metric: "120+", metricLabel: "tables at 99% accuracy",
      problem: "The team's application needed to move clouds without losing trust in the data.",
      build: "Led the migration, stood up the GCP platform from scratch (Composer, Pub/Sub, GKE, GCS, BigQuery) and proved it with a Spark validation framework on Dataproc that compares every row and column.",
      result: "120+ tables, several with billions of rows, at 99% source-to-target accuracy.",
      stack: ["GCP", "BigQuery", "Dataproc", "Composer", "Pub/Sub", "GKE"] },
    { title: "Data quality & drift framework", tag: "Platform", metric: "~60", metricLabel: "engineers on one standard",
      problem: "Every team checked data quality differently, across four platforms.",
      build: "A cross-platform quality and drift framework over Snowflake, BigQuery, Foundry and Cloud SQL, with a React UI.",
      result: "The standard across 6–7 teams (~60 engineers), and embedded in executive finance reporting to catch issues before publication.",
      stack: ["Snowflake", "BigQuery", "Foundry", "React"] },
    { title: "Lakehouse cost cuts", tag: "Cost & speed", metric: "$130K", metricLabel: "saved per year",
      problem: "Storage and Spark compute costs kept growing.",
      build: "An archival strategy for unused data, plus Foundry PySpark pipelines moved to Apache Iceberg incremental loads with tuned partitioning.",
      result: "600 TB removed ($130K/yr), compute down 50%, Spark runtime down 40%.",
      stack: ["Apache Iceberg", "PySpark", "Foundry"] }
  ],

  // Public repos (optional). Add new ones here as you publish them; an empty list hides the row.
  projects: [
    { title: "Coding Agent in Go", desc: "Claude Code-style assistant: agent loop + tool calling", url: "https://github.com/rithikchalla/codecrafters-claude-code-go" },
    { title: "Finance ETL Process", desc: "SEC EDGAR filings → queryable data asset", url: "https://github.com/smurffers/finance-ETL-Process" }
  ]
};
