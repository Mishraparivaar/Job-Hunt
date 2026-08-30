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

## Forked-template contamination runs deep
- **Pitfall:** This repo was forked from another person's portfolio (Santiago / "Career-Ops" / Santifer iRepair). Identity leaked far beyond the visible pages: `scripts/prerender.tsx` full Person JSON-LD, `api/voice-token.js` Spanish "Seville" voice persona, `api/cron/evaluate.js` evaluator prompt, `README.md` half in Spanish, `public/robots.txt`/`humans.txt`/`security.txt`, 400+ asset files, `.seo-audit*/` dirs.
- **Solution:** When de-branding a fork, grep the WHOLE tree for the prior identity (name, domain, email, project slugs) — not just `src/`. Check: system/evaluator prompts, SEO/prerender scripts, static text files under `public/`, CI workflow env vars, and JSON-LD in `index.html`. `npm run build` here is only `tsc -b && vite build`, so `scripts/` is dead weight and safe to delete wholesale.
- **Rule:** After the purge, re-run the identity grep restricted to the *shipping* surface (`src/ api/ public/ index.html vercel.json`) and require zero hits before pushing.

## OpenAI Realtime API: beta -> GA migration (Aug 2025 GA)
- **Pitfall:** Code written against the 2024 beta breaks silently in prod. `POST /v1/realtime/sessions` is GONE (returns `{error:"Invalid URL"}`). Beta model ids (`gpt-4o-realtime-preview`, dated snapshots like `gpt-realtime-2025-08-28`) and the flat `session` schema no longer apply.
- **GA shape:** mint ephemeral key at `POST /v1/realtime/client_secrets` with body `{expires_after:{anchor:'created_at',seconds:600}, session:{type:'realtime', model:'gpt-realtime', instructions, output_modalities:['audio'], audio:{input:{format:{type:'audio/pcm',rate:24000}, turn_detection:{type:'server_vad'}, transcription:{model:'whisper-1'}}, output:{voice:'cedar', format:{type:'audio/pcm',rate:24000}}}, tools:[...] }}`. Token is at **top-level `data.value`** (not `data.client_secret.value`). `audio.*.format` MUST be an object — a string `'pcm16'` gives `invalid_type`.
- **Browser WS:** `new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-realtime', ['realtime', 'openai-insecure-api-key.'+ek])`. Drop the old `openai-beta.realtime-v1` subprotocol.
- **Server event renames:** `response.audio.delta` -> `response.output_audio.delta`; `response.audio_transcript.delta`/`.done` -> `response.output_audio_transcript.delta`/`.done`. Unchanged: `input_audio_buffer.*`, `conversation.item.input_audio_transcription.completed`, `response.function_call_arguments.done`, `response.done`, and all client->server events.
- **CSP:** the browser opens the WS directly to OpenAI, so `connect-src` must list `https://api.openai.com wss://api.openai.com` or it's silently blocked.
- **Rule:** verify a live 3rd-party API contract with a real request (curl the endpoint + a Node `WebSocket` handshake) before assuming the integration works — don't deploy-and-pray one field at a time.
