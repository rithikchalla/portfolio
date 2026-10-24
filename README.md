# Rithik Reddy Challa · Portfolio

Interactive portfolio for a data engineer working on Spark, Apache Iceberg lakehouses, Palantir Foundry ontologies and AI agents.

What's on the page:
- **Hero:** 2,744 three.js points that morph between a warehouse, a data lake, an Iceberg table, a neural net and an AI agent. Drag to spin, click to reshape.
- **Dive into the lakehouse:** a scroll-driven 3D descent below the waterline of an Apache Iceberg table: catalog → metadata.json → manifest lists → manifests → Parquet data files.
- **Follow the data:** a conveyor from ingest → Spark → Iceberg → ontology → agent.
- **Agents:** an illustrative agent trace whose tool calls light up a 3D tool orbit.
- **Ontology explorer:** draggable Foundry-style object types with properties, links and actions.
- **Certification:** a flip-able Google Cloud Professional Data Engineer badge.
- **Skills:** a sortable, filterable "SQL" table, a live dbt clean-up demo and the projects.

Edit content in `assets/data.js`. three.js r160 is vendored in `assets/vendor/` (MIT), so there's no build step and no CDN.

Run locally: `python3 -m http.server`, then open http://localhost:8000. ES modules don't load from `file://`.
Deploy: GitHub Pages serves `main` directly (Settings → Pages → Deploy from a branch → main / root). `.nojekyll` skips Jekyll processing.
