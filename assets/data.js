// Edit this file to update the site content. Nothing else needs to change.
window.SITE = {
  cert: {
    name: "Professional Data Engineer",
    issuer: "Google Cloud",
    url: "", // paste your Credly / Google verification link here and a "verify" button appears
    domains: [
      "Designing data processing systems",
      "Ingesting and processing data",
      "Storing data",
      "Preparing and using data for analysis",
      "Maintaining and automating data workloads"
    ]
  },

  roles: ["lakehouses on Apache Iceberg", "Spark pipelines at scale", "Foundry ontologies", "AI agents that take action"],

  // Hero 3D: the same points re-shape themselves into each of these.
  shapes: ["WAREHOUSE", "DATA LAKE", "ICEBERG TABLE", "NEURAL NET", "AI AGENT"],

  // Messy rows, shaped like the problems my dbt project solves.
  dirty: [
    { raw: ["FromSoftware, Inc.",  "Feb 25th, 2022", "10,000,000 .. 20,000,000", "NULL"], clean: ["fromsoftware", "2022-02-25", "10000000", "20000000"] },
    { raw: ["Fromsoftware inc ®", "25/02/22",      "10000000..20000000",       "NULL"], clean: ["fromsoftware", "2022-02-25", "10000000", "20000000"] },
    { raw: ["  VALVE ® corporation", "2019-3-7th",  "5,000,000 .. 10,000,000",  "NULL"], clean: ["valve",         "2019-03-07", "5000000",  "10000000"] },
    { raw: ["valve corp.",         "Mar 7, 2019",   "5000000 .. 10000000",      "NULL"], clean: ["valve",         "2019-03-07", "5000000",  "10000000"] },
    { raw: ["CD PROJEKT RED S.A.", "dec-10-2020",   "20,000,000 ..  50,000,000", "NULL"], clean: ["cd projekt red","2020-12-10", "20000000", "50000000"] }
  ],

  // The scroll-driven conveyor.
  stations: [
    { name: "INGEST",   title: "Get it out of the wild",  text: "APIs, files, event streams, SEC EDGAR filings. Landed raw, typed and replayable." },
    { name: "SPARK",    title: "Crunch it in parallel",   text: "PySpark jobs that clean, join and aggregate across a cluster instead of a laptop. Partition-aware, so they stay fast as data grows." },
    { name: "ICEBERG",  title: "Store it like a warehouse, price it like a lake", text: "Apache Iceberg tables on object storage: ACID commits, schema evolution, time travel and hidden partitioning." },
    { name: "ONTOLOGY", title: "Give it meaning",         text: "In Palantir Foundry, tables become objects (Orders, Suppliers, Shipments) with links and actions people and software can use." },
    { name: "AGENT",    title: "Let AI act on it",        text: "AI agents that read the ontology, call tools, query Spark and take governed actions, not just chat." }
  ],

  // Iceberg anatomy for the "dive" section, top to bottom.
  dive: [
    { title: "Above the waterline", text: "What your query engine sees: one table, lake.sales.orders. Simple. The interesting part is underneath." },
    { title: "Catalog → metadata.json", text: "The catalog points to the current metadata file: schema, partition spec and snapshot history. Swapping that pointer is the atomic commit." },
    { title: "Manifest list", text: "Every snapshot has a manifest list. Time travel just means reading an older one." },
    { title: "Manifests", text: "Manifests track data files and their column stats, so Spark can skip files without opening them." },
    { title: "Parquet data files", text: "The bulk of the iceberg. Immutable files, compacted in the background and never edited in place." }
  ],

  // AI agent demo. Each tool id must match a node in the 3D scene (see tools below).
  tools: ["ontology.search", "ontology.links", "spark.sql", "vector.search", "ontology.action", "python"],
  trace: [
    { t: "user",  s: "Which open orders are at risk of missing their ship date this week?" },
    { t: "plan",  s: "find open orders → follow links to shipments + suppliers → check supplier delays → flag" },
    { t: "tool",  tool: "ontology.search", s: "Order where status = open and due ≤ 7d", r: "42 objects" },
    { t: "tool",  tool: "ontology.links",  s: "Order → Shipment → Supplier", r: "42 shipments · 6 suppliers" },
    { t: "tool",  tool: "spark.sql",       s: "SELECT supplier, avg(delay_days) FROM iceberg.ops.deliveries …", r: "2 suppliers > 3 days late" },
    { t: "tool",  tool: "vector.search",   s: "supplier emails mentioning 'delay' last 14d", r: "5 matching threads" },
    { t: "tool",  tool: "ontology.action", s: "flag_at_risk(orders = [9 ids])", r: "9 orders flagged ✔" },
    { t: "answer", s: "9 orders are at risk, all from 2 suppliers averaging 3+ days late. I flagged them and drafted a note to the buyers." }
  ],

  // Ontology explorer (illustrative supply-chain example).
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

  categories: ["All", "AI / Agents", "Lakehouse & Spark", "Foundry", "Cloud & Warehouse", "ML", "Languages & Tools"],
  skills: [
    { name: "AI agents",            cat: "AI / Agents",       level: 90 },
    { name: "LLM tool calling",     cat: "AI / Agents",       level: 88 },
    { name: "RAG & vector search",  cat: "AI / Agents",       level: 82 },
    { name: "Prompt engineering",   cat: "AI / Agents",       level: 85 },
    { name: "Palantir Foundry",     cat: "Foundry",           level: 90 },
    { name: "Foundry Ontology",     cat: "Foundry",           level: 90 },
    { name: "Apache Spark / PySpark", cat: "Lakehouse & Spark", level: 88 },
    { name: "Apache Iceberg",       cat: "Lakehouse & Spark", level: 82 },
    { name: "Data lakes & lakehouse", cat: "Lakehouse & Spark", level: 85 },
    { name: "ETL / ELT design",     cat: "Lakehouse & Spark", level: 90 },
    { name: "Google Cloud (GCP)",   cat: "Cloud & Warehouse", level: 85 },
    { name: "BigQuery",             cat: "Cloud & Warehouse", level: 85 },
    { name: "Data warehousing",     cat: "Cloud & Warehouse", level: 85 },
    { name: "dbt",                  cat: "Cloud & Warehouse", level: 75 },
    { name: "SQL",                  cat: "Languages & Tools", level: 92 },
    { name: "Python",               cat: "Languages & Tools", level: 92 },
    { name: "Git & CI",             cat: "Languages & Tools", level: 80 },
    { name: "scikit-learn",         cat: "ML",                level: 80 },
    { name: "BERT / NLP",           cat: "ML",                level: 72 },
    { name: "Go",                   cat: "Languages & Tools", level: 50 }
  ],

  projects: [
    { title: "Finance ETL Process", tag: "Data Engineering",
      desc: "Pulls financial statements of all publicly traded companies from SEC EDGAR with Python and builds a de-normalised, easily queryable data asset. Linted, tested, requirements-pinned.",
      stack: ["Python", "SEC EDGAR", "ETL", "Testing"], url: "https://github.com/smurffers/finance-ETL-Process" },
    { title: "dbt Transformation Project", tag: "Data Engineering",
      desc: "Heavy transformations in dbt: macros to normalise messy keys, date extraction, column splitting, type casts, and BigQuery-style denormalised tables with nested and repeated fields.",
      stack: ["dbt", "SQL", "BigQuery", "Macros"], url: "https://github.com/smurffers/dbt-dibi-project" },
    { title: "Fakeddit Fake-News Detection", tag: "ML / AI",
      desc: "Detects misinformation on a 1M+ sample multimodal Reddit dataset. Compared a neural network built from scratch against a fine-tuned pre-trained BERT model.",
      stack: ["Python", "BERT", "NLP", "Jupyter"], url: "https://github.com/rithikchalla/fakeddit-news-detection" },
    { title: "Coding Agent in Go", tag: "AI / Agents",
      desc: "My own Claude Code-style coding assistant in Go (CodeCrafters challenge): an agent loop over an LLM with OpenAI-compatible tool calling and multiple integrated tools.",
      stack: ["Go", "LLM", "Tool calling", "Agent loop"], url: "https://github.com/rithikchalla/codecrafters-claude-code-go" },
    { title: "Predicting Readmission Rate", tag: "ML / AI",
      desc: "Predicts hospital readmission among diabetic patients from clinical and demographic parameters.",
      stack: ["Python", "scikit-learn", "Jupyter"], url: "https://github.com/rithikchalla/predicting-readmission-rate" },
    { title: "OCR Streamlit App", tag: "Tooling",
      desc: "A small Streamlit web app that turns images into text with OCR, a quick way to put a model in front of users.",
      stack: ["Python", "Streamlit", "OCR"], url: "https://github.com/rithikchalla/ocr-streamlit-app-" }
  ]
};
