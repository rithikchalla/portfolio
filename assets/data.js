// Edit this file to update the site content. Nothing else needs to change.
window.SITE = {
  // Messy rows, shaped like the problems my dbt project solves. Clean values are what comes out.
  dirty: [
    { raw: ["FromSoftware, Inc.",  "Feb 25th, 2022", "10,000,000 .. 20,000,000", "NULL"], clean: ["fromsoftware", "2022-02-25", "10000000", "20000000"] },
    { raw: ["Fromsoftware inc \u00ae", "25/02/22",      "10000000..20000000",       "NULL"], clean: ["fromsoftware", "2022-02-25", "10000000", "20000000"] },
    { raw: ["  VALVE \u00ae corporation", "2019-3-7th",  "5,000,000 .. 10,000,000",  "NULL"], clean: ["valve",         "2019-03-07", "5000000",  "10000000"] },
    { raw: ["valve corp.",         "Mar 7, 2019",   "5000000 .. 10000000",      "NULL"], clean: ["valve",         "2019-03-07", "5000000",  "10000000"] },
    { raw: ["CD PROJEKT RED S.A.", "dec-10-2020",   "20,000,000 ..  50,000,000", "NULL"], clean: ["cd projekt red","2020-12-10", "20000000", "50000000"] }
  ],
  stations: [
    { name: "EXTRACT", title: "Get it out of the wild", text: "SEC EDGAR filings for every public company, files from Google Drive, public datasets. If it has an API or a URL, I can pull it." },
    { name: "CLEAN",   title: "Make it behave",        text: "Macros that turn five spellings of one company into a single key. Dates pulled out of text. Columns split. Types cast. Tests so it stays clean." },
    { name: "MODEL",   title: "Shape it for questions", text: "De-normalised tables with nested and repeated fields, so analysts query one table instead of seven joins." },
    { name: "SERVE",   title: "Put it to work",        text: "BI-ready tables, ML models and Streamlit apps on top. Data nobody uses is just expensive storage." }
  ],
  roles: [
    "reliable ETL pipelines",
    "dbt models analysts love",
    "data assets from raw filings",
    "ML models that ship",
    "clean, queryable warehouses"
  ],
  categories: ["All", "Data Engineering", "ML / AI", "Languages", "Tooling"],
  skills: [
    { name: "Python",        cat: "Languages",        level: 90 },
    { name: "SQL",           cat: "Data Engineering", level: 85 },
    { name: "ETL design",    cat: "Data Engineering", level: 80 },
    { name: "dbt",           cat: "Data Engineering", level: 70 },
    { name: "BigQuery",      cat: "Data Engineering", level: 65 },
    { name: "Pandas",        cat: "Data Engineering", level: 88 },
    { name: "scikit-learn",  cat: "ML / AI",          level: 80 },
    { name: "BERT / NLP",    cat: "ML / AI",          level: 70 },
    { name: "Neural nets",   cat: "ML / AI",          level: 70 },
    { name: "Streamlit",     cat: "Tooling",          level: 75 },
    { name: "Jupyter",       cat: "Tooling",          level: 90 },
    { name: "Git & CI",      cat: "Tooling",          level: 75 },
    { name: "Jenkins",       cat: "Tooling",          level: 50 },
    { name: "Go",            cat: "Languages",        level: 50 },
    { name: "TypeScript",    cat: "Languages",        level: 55 }
  ],
  projects: [
    {
      title: "Finance ETL Process",
      tag: "Data Engineering",
      desc: "Pulls financial statements of all publicly traded companies from SEC EDGAR with Python and builds a de-normalised, easily queryable data asset. Linted, tested, requirements-pinned.",
      stack: ["Python", "SEC EDGAR", "ETL", "Testing"],
      url: "https://github.com/smurffers/finance-ETL-Process"
    },
    {
      title: "dbt Transformation Project",
      tag: "Data Engineering",
      desc: "Heavy transformations in dbt: macros to normalise messy keys, date extraction, column splitting, type casts, and BigQuery-style denormalised tables with nested and repeated fields.",
      stack: ["dbt", "SQL", "BigQuery", "Macros"],
      url: "https://github.com/smurffers/dbt-dibi-project"
    },
    {
      title: "Fakeddit Fake-News Detection",
      tag: "ML / AI",
      desc: "Detects misinformation on a 1M+ sample multimodal Reddit dataset. Compared a neural network built from scratch against a fine-tuned pre-trained BERT model.",
      stack: ["Python", "BERT", "NLP", "Jupyter"],
      url: "https://github.com/rithikchalla/fakeddit-news-detection"
    },
    {
      title: "Predicting Readmission Rate",
      tag: "ML / AI",
      desc: "Predicts hospital readmission among diabetic patients from clinical and demographic parameters.",
      stack: ["Python", "scikit-learn", "Jupyter"],
      url: "https://github.com/rithikchalla/predicting-readmission-rate"
    },
    {
      title: "YouTube Data Analysis",
      tag: "Data Engineering",
      desc: "Exploratory analysis and pipeline work over YouTube data in Python.",
      stack: ["Python", "Analytics"],
      url: "https://github.com/rithikchalla/youtube_data_analysis"
    },
    {
      title: "OCR Streamlit App",
      tag: "Tooling",
      desc: "A small Streamlit web app that turns images into text with OCR, a quick way to put a model in front of users.",
      stack: ["Python", "Streamlit", "OCR"],
      url: "https://github.com/rithikchalla/ocr-streamlit-app-"
    },
    {
      title: "End-to-End ML Project",
      tag: "ML / AI",
      desc: "A full machine learning project structure, from ingestion and training through to prediction.",
      stack: ["Python", "ML", "Pipeline"],
      url: "https://github.com/smurffers/mlproject-end-to-end"
    },
    {
      title: "Wear Prediction",
      tag: "ML / AI",
      desc: "Predictive model that reads its data straight from Google Drive using environment-configured credentials.",
      stack: ["Python", "Google Drive API", "Jupyter"],
      url: "https://github.com/rithikchalla/wear-prediction"
    }
  ],
  terminal: [
    "$ whoami",
    "rithik-reddy-challa  # data engineer, ML enthusiast",
    "$ cat interests.txt",
    "machine learning · artificial intelligence · data science · data engineering",
    "$ cat currently_learning.txt",
    "ML algorithms · ETL processes · tooling for modern data stacks",
    "$ cat looking_for.txt",
    "collaboration on ML and cloud projects, and my next data role",
    "$ ./contact.sh",
    "-> 19rithik@gmail.com"
  ]
};
