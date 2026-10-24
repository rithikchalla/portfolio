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

  roles: ["multi-agent text-to-SQL", "RAG with cited answers", "self-healing pipeline agents", "TB-scale GCP platforms", "Palantir Foundry ontologies"],
  shapes: ["WAREHOUSE", "DATA LAKE", "ICEBERG", "NEURAL NET", "AI AGENT"],

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

  // "Below the waterline": the iceberg dive. Each layer = what's under the job title.
  dive: [
    { title: "Data & AI Engineer", kicker: "above the waterline",
      text: "That's the title. It's the 10% everyone sees. Scroll to dive into the 90% underneath.",
      items: [] },
    { title: "Production AI, used daily", kicker: "−12 m",
      text: "AI systems that executives and analysts rely on every day, not demos.",
      items: [
        { k: "−70%", s: "investigation time", v: "investigation time with a multi-agent text-to-SQL system (Google ADK) used by ~50 people incl. VPs & SVPs" },
        { k: "98%", s: "RAG accuracy", v: "extraction accuracy from a RAG contract parser, with a cited source for every answer and LLM evals" }
      ] },
    { title: "Agents that fix things", kicker: "−30 m",
      text: "Agents that take action, on Palantir AIP and beyond.",
      items: [
        { k: "−50%", s: "debug time", v: "pipeline debug time: an AIP agent that diagnoses failures and auto-reruns safe fixes" },
        { k: "−70%", s: "on-call calls", v: "after-hours on-call calls, same agent" },
        { k: "~100M", s: "records, geospatial AI", v: "patient records in a geospatial system whose agent writes PDF briefs, charts and maps" }
      ] },
    { title: "Platforms at TB scale", kicker: "−55 m",
      text: "The foundations the AI stands on.",
      items: [
        { k: "120+", s: "tables → GCP", v: "tables, some with billions of rows, migrated Azure → GCP at 99% accuracy; GCP platform built from scratch" },
        { k: "~60", s: "engineers on my DQ framework", v: "engineers across 6–7 teams use my data quality & drift framework (Snowflake, BigQuery, Foundry, Cloud SQL)" },
        { k: "SFTP", s: "event-driven payments check", v: "event-driven pipeline that flags under/overpayments, protecting a high-dollar revenue stream" }
      ] },
    { title: "Cost & speed", kicker: "−75 m",
      text: "Making it cheaper and faster, measurably.",
      items: [
        { k: "$130K", s: "saved / yr", v: "a year saved by archiving 600 TB of unused data" },
        { k: "−50%", s: "compute (Iceberg)", v: "compute after moving Foundry PySpark pipelines to Apache Iceberg incremental loads" },
        { k: "−40%", s: "Spark runtime", v: "Spark runtime from partitioning & resource tuning" }
      ] },
    { title: "5+ years of foundation", kicker: "−90 m · the base",
      text: "Healthcare and e-commerce, from SQL tuning to AI agents.",
      items: [
        { k: "CVS", s: "2024–now", v: "Health · Data Engineer · 2024–now" },
        { k: "Optum", s: "2019–2021", v: "UnitedHealth Group · Software → Data Engineer · 2019–2021" },
        { k: "Wayfair", s: "2023", v: "Data Engineer Co-op · 2023" },
        { k: "MS", s: "Northeastern", v: "Data Analytics Engineering · Northeastern University" }
      ] }
  ],

  // Career, newest first. hl = numbers to highlight in the bullets.
  experience: [
    { org: "CVS Health", role: "Data Engineer", when: "Sep 2024 – Present", where: "Woonsocket, RI", head: true,
      groups: [
        { name: "AI systems", bullets: [
          "Engineered a multi-agent text-to-SQL system on Google ADK and GCP used by ~50 users including VPs and SVPs; tailors output by audience and automates root-cause analysis, cutting investigation cycles by 70%",
          "Built a RAG-based contract parser that extracts key contract terms with 98% accuracy and source grounding for every answer, validated with LLM evals; eliminated manual reimbursement errors",
          "Built an AI production-support agent on Palantir AIP that detects pipeline and data quality failures, diagnoses root causes and auto-reruns safe fixes: −50% debug time, −70% after-hours on-call calls",
          "Developed AI-driven negotiation scenario simulations on Palantir AIP with supporting backend pipelines, giving business teams real-time feedback",
          "Built a geospatial analytics system over ~100M patient records to assess healthcare access, with an AI agent that answers questions and auto-generates PDF briefs, charts and maps" ] },
        { name: "Data platform & engineering", bullets: [
          "Led the end-to-end Azure-to-GCP migration: 120+ tables, several with billions of rows (TB scale), at 99% source-to-target accuracy; built the GCP platform from the ground up (Composer, Pub/Sub, GKE, GCS, BigQuery)",
          "Designed an event-driven pipeline that detects SFTP file drops (PDF, CSV, Excel), joins them with internal data and flags under/overpayments with AI-assisted suggestions",
          "Designed a cross-platform data quality and drift framework (Snowflake, BigQuery, Foundry, Cloud SQL) with a React UI, adopted as the standard across 6–7 teams (~60 engineers)",
          "Designed a data archival strategy that removed 600 TB of unused data, cutting annual storage costs by $130K",
          "Migrated Foundry PySpark pipelines to Apache Iceberg with incremental loads (−50% compute); tuned partitioning and resources (−40% Spark runtime)",
          "Migrated Azure Data Factory pipelines to Airflow for SFTP-to-Snowflake transfers with a reusable framework (−30% processing time)" ] }
      ], tags: ["Google ADK", "Palantir AIP", "Foundry", "GCP", "BigQuery", "Iceberg", "Spark", "Snowflake", "RAG", "React"] },
    { org: "Apex Systems", role: "Data Engineer (Contract)", when: "Apr 2024 – Sep 2024", where: "Boston, MA",
      groups: [{ bullets: [
        "Refactored PySpark transforms in Palantir Foundry, improving pipeline efficiency and runtime",
        "Built a centralized data health dashboard in Foundry, giving stakeholders real-time visibility into data quality",
        "Cleaned and transformed data in Foundry to support reconciliation across datasets" ] }],
      tags: ["Palantir Foundry", "PySpark", "Data quality"] },
    { org: "Wayfair", role: "Data Engineer Co-op", when: "Jan 2023 – Jul 2023", where: "Boston, MA",
      groups: [{ bullets: [
        "Architected a new GCP data environment for product managers, cutting decision-making time by 50%",
        "Led design of a scalable ELT pipeline (BigQuery, SQL, Cloud Composer) powering a company Data Catalog, improving data quality and accessibility by 30%",
        "Built Looker dashboards tracking 10+ KPIs; identified and removed 100K+ redundant and obsolete tables",
        "Revamped existing ETL pipelines, reducing operational costs by 30%" ] }],
      tags: ["GCP", "BigQuery", "Cloud Composer", "Looker"] },
    { org: "Northeastern University", role: "MS, Data Analytics Engineering", when: "Jan 2022 – Dec 2023", where: "Boston, MA", edu: true,
      groups: [{ bullets: ["Graduate Teaching Assistant", "Coursework: Data Warehousing & BI, Machine Learning, AWS Cloud Architecting"] }],
      tags: ["Data Warehousing", "ML", "AWS"] },
    { org: "UnitedHealth Group (Optum)", role: "Data Engineer", when: "Jan 2021 – Dec 2021", where: "Hyderabad, India",
      groups: [{ bullets: [
        "Architected an end-to-end pipeline for patient EHR data on Azure (Blob Storage, ADF, Functions) and Snowflake, improving data freshness by 50%",
        "Built a Python and Airflow ingestion framework that migrated 100+ tables and views from MS SQL to Snowflake, cutting ETL time by 80% and saving 20 hours/week",
        "Containerized ETL pipelines with Docker for Kubernetes, +30% processing efficiency and −20% resource use" ] }],
      tags: ["Azure", "Snowflake", "Airflow", "Docker", "Kubernetes"] },
    { org: "UnitedHealth Group (Optum)", role: "Software Engineer", when: "Jul 2019 – Dec 2020", where: "Hyderabad, India",
      groups: [{ bullets: [
        "Tuned SQL performance with CTEs, window functions and indexing, speeding up queries by 25%",
        "Built a CI/CD pipeline (Jenkins, Git) with automated testing and security scans across four environments, cutting deployment time by 60%",
        "Led 4 new engineers to build a centralized monitoring system (Grafana, Loki, Prometheus), improving operational efficiency by 45%" ] }],
      tags: ["SQL", "Jenkins", "CI/CD", "Grafana"] },
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
        { t: "plan", s: "read logs → find root cause → is the fix safe? → rerun → verify" },
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

  // Skills, each with where I used it (from the résumé). Empty "at" = in my toolkit.
  categories: ["All", "AI & LLM", "Data Engineering", "Cloud & DevOps", "Languages", "Analytics & BI"],
  skills: [
    { name: "Multi-agent systems (Google ADK)", cat: "AI & LLM", at: "CVS" },
    { name: "Palantir AIP", cat: "AI & LLM", at: "CVS" },
    { name: "RAG · embeddings · vector search", cat: "AI & LLM", at: "CVS" },
    { name: "Text-to-SQL", cat: "AI & LLM", at: "CVS" },
    { name: "LLM evaluation (groundedness)", cat: "AI & LLM", at: "CVS" },
    { name: "Tool / function calling", cat: "AI & LLM", at: "CVS" },
    { name: "Vertex AI (Gemini)", cat: "AI & LLM", at: "" },
    { name: "LangChain", cat: "AI & LLM", at: "" },
    { name: "Palantir Foundry (Ontology)", cat: "Data Engineering", at: "CVS · Apex" },
    { name: "PySpark / Apache Spark", cat: "Data Engineering", at: "CVS · Apex" },
    { name: "Apache Iceberg", cat: "Data Engineering", at: "CVS" },
    { name: "BigQuery", cat: "Data Engineering", at: "CVS · Wayfair" },
    { name: "Snowflake", cat: "Data Engineering", at: "CVS · Optum" },
    { name: "Airflow / Cloud Composer", cat: "Data Engineering", at: "CVS · Wayfair · Optum" },
    { name: "Pub/Sub · event-driven pipelines", cat: "Data Engineering", at: "CVS" },
    { name: "Data quality & governance", cat: "Data Engineering", at: "CVS · Apex" },
    { name: "Geospatial analytics", cat: "Data Engineering", at: "CVS" },
    { name: "Kafka", cat: "Data Engineering", at: "" },
    { name: "dbt", cat: "Data Engineering", at: "projects" },
    { name: "GCP (Composer, GKE, GCS, Cloud SQL)", cat: "Cloud & DevOps", at: "CVS · Wayfair" },
    { name: "Azure (ADF, Blob, Functions)", cat: "Cloud & DevOps", at: "CVS · Optum" },
    { name: "Docker · Kubernetes", cat: "Cloud & DevOps", at: "Optum" },
    { name: "CI/CD (Jenkins, Git)", cat: "Cloud & DevOps", at: "Optum" },
    { name: "AWS (S3, Lambda, SageMaker)", cat: "Cloud & DevOps", at: "" },
    { name: "Terraform", cat: "Cloud & DevOps", at: "" },
    { name: "Python", cat: "Languages", at: "everywhere" },
    { name: "SQL", cat: "Languages", at: "everywhere" },
    { name: "TypeScript · React", cat: "Languages", at: "CVS" },
    { name: "C# · R · Shell", cat: "Languages", at: "" },
    { name: "Looker", cat: "Analytics & BI", at: "Wayfair" },
    { name: "Tableau · Power BI", cat: "Analytics & BI", at: "" },
    { name: "Pandas · NumPy · TensorFlow", cat: "Analytics & BI", at: "" }
  ],

  // Case studies from my work. Confidential, so no code, data or links: problem → build → result.
  cases: [
    { title: "Multi-agent text-to-SQL", tag: "AI system", metric: "−70%", metricLabel: "investigation time",
      problem: "Leaders waited on analysts for every 'why did this number move?' question.",
      build: "A multi-agent system on Google ADK + GCP: one agent writes SQL, another runs root-cause analysis, and the output is tailored to the audience (exec brief vs analyst detail).",
      result: "Used by ~50 people including VPs and SVPs; investigation cycles 70% shorter.",
      stack: ["Google ADK", "Gemini", "BigQuery", "Text-to-SQL"] },
    { title: "Self-healing pipeline agent", tag: "AI system", metric: "−70%", metricLabel: "after-hours on-call calls",
      problem: "Pipeline and data quality failures meant night-time pages and slow manual debugging.",
      build: "An AI production-support agent on Palantir AIP that detects failures, diagnoses root causes and auto-reruns fixes that are safe to apply.",
      result: "Pipeline debug time down 50%, after-hours on-call calls down 70%.",
      stack: ["Palantir AIP", "Foundry", "PySpark"] },
    { title: "Grounded contract parser", tag: "AI system", metric: "98%", metricLabel: "extraction accuracy",
      problem: "Manual reading of contract terms caused reimbursement errors.",
      build: "A RAG pipeline that extracts key terms and cites its source for every answer, validated with LLM evals for accuracy and groundedness.",
      result: "98% accuracy; manual reimbursement errors eliminated.",
      stack: ["RAG", "Embeddings", "Vector search", "LLM evals"] },
    { title: "Azure → GCP migration", tag: "Platform", metric: "120+", metricLabel: "tables at 99% accuracy",
      problem: "The team's application needed to move clouds without losing trust in the data.",
      build: "Led the end-to-end migration and built the GCP platform from scratch: Composer, Pub/Sub, GKE, GCS and BigQuery.",
      result: "120+ tables, several with billions of rows, at 99% source-to-target accuracy.",
      stack: ["GCP", "BigQuery", "Composer", "Pub/Sub", "GKE"] },
    { title: "Data quality & drift framework", tag: "Platform", metric: "~60", metricLabel: "engineers on one standard",
      problem: "Every team checked data quality differently, across four platforms.",
      build: "A cross-platform quality and drift framework over Snowflake, BigQuery, Foundry and Cloud SQL, with a React UI.",
      result: "Adopted as the standard across 6–7 teams (~60 engineers).",
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
