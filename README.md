# Rithik Reddy Challa · Portfolio

Interactive portfolio for a data engineer working on Spark, Apache Iceberg lakehouses, Palantir Foundry ontologies and AI agents.

What's on the page (content comes from my résumé):
- **Hero:** title, headline impact numbers and three.js points that morph between a warehouse, a lake, an iceberg, a neural net and an agent.
- **Below the waterline:** a scroll-driven 3D dive. The job title is the tip; each layer underneath is real impact (AI systems, agents, platforms, cost savings, foundation).
- **git log --career:** experience as an expandable commit history.
- **How my agents work:** three illustrated walkthroughs (text-to-SQL, self-healing pipelines, grounded RAG) synced to a 3D tool orbit. Sample data only.
- **Case studies:** problem → built → result for six systems. Confidential work, so no code or links.
- **Foundry ontology explorer**, a flip-able **GCP Professional Data Engineer** badge and a sortable **skills** table showing where each skill was used.

Edit content in `assets/data.js`. three.js r160 is vendored in `assets/vendor/` (MIT), so there's no build step and no CDN.

Run locally: `python3 -m http.server`, then open http://localhost:8000. ES modules don't load from `file://`.
Deploy: Settings → Pages → Source: **GitHub Actions** (`.github/workflows/pages.yml` publishes `main`).
