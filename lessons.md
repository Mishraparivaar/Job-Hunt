# LESSONS LEARNED & TECHNICAL INSIGHTS

## 1. Vercel Serverless / Edge API Routing
- **Pitfall:** Placing helper files like `api/knowledge-graph.js` and `api/knowledge-graph.json` directly under `api/` causes Vercel to treat both as identical conflicting route endpoints (`/api/knowledge-graph`), causing build failures.
- **Solution:** Place all helper utilities, data fixtures, and RAG modules inside `api/_shared/` (e.g. `api/_shared/knowledge-graph.js`), which Vercel ignores during API route registration.

## 2. Overlapping String Replacements in Codebases
- **Pitfall:** Running blanket regex replaces for partial strings (e.g. `/prakhar/`) can duplicate or corrupt existing strings like `prakharmishra` or `prakhar-mishra-b74b85124`.
- **Solution:** Always match full trailing URL segments `prakhar[a-zA-Z0-9\-\/]+` or use exact AST / symbol replacement to ensure clean target URLs.

## 3. Apple Pages 1-Page Document Budgets
- **Pitfall:** Default DOCX margins (1 inch) and standard 12pt fonts cause 1-page executive resumes to overflow onto a second blank/trailing page when imported into Apple Pages.
- **Solution:** Set page margins to `0.5in - 0.55in`, line spacing to `1.05`, paragraph spacing `space_after=Pt(1.5-2)`, and body font size to `8.5pt` with standard cross-platform fonts (`Calibri` / `Arial`). This guarantees a strict 1-page budget in both Microsoft Word and Apple Pages.

## 4. Playwright Node Resolution in Nested Subdirectories
- **Pitfall:** Running Node scripts from workspace root when `playwright` is installed in `Job-Hunt/node_modules` causes `MODULE_NOT_FOUND`.
- **Solution:** Explicitly pass `NODE_PATH=/Users/grandvision/Projects/CV/Job-Hunt/node_modules node script.js`.
