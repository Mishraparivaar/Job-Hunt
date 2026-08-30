# SCRATCHPAD & ACTIVE STATUS

## SESSION CHECKPOINT — 2026-08-30 (CV fact-sync + Santiago purge + voice fix)

### What was completed this session
1. **CV fact-sync** — aligned every bio fact on the interactive CV + chatbot/voice knowledge with the finalized `Final CV/Resume 2026 Final CV PDF.pdf`. Files: `chatbot-prompt.txt`, `api/_shared/knowledge-graph.js`, `src/i18n.ts`, `src/about-i18n.ts`, `src/App.tsx`, `src/articles/components.tsx`, `index.html`. Key corrections: **4 → 3 promotions**; "2,500+ E&F leaders / 94 prototypes / 240 voice interviews / 200 trainers" → "13 hubs / 300+ trainers certified / 2,000+ execs upskilled / 1,000+ guided / thousands of prototypes / 5,000+ associates evaluated"; "$1.5M–$3M+" → "INR 18 Cr (~$1.9M)"; "top 10–20 accounts" → "top 50 accounts"; MBA "Strategy & Marketing" → "Business Management"; AI Catalyst 2024 → 2026; ETAP team 8 → 6, "29 blogs" → "18 blogs + 9 points of view"; M&E role "Dec 2021–Aug 2023" → "Sep 2021–Mar 2024". Kept Lean Six Sigma + CSM. Site keeps the single "Nov 2023 – Present" role block (user's choice).
2. **Template-author (Santiago) + Spanish purge** — deleted 8 case-study route components + 8 article i18n modules + `articles/json-ld.ts`; emptied `articleRegistry`; removed `/sobre-mi` + `/privacidad` + all article routes from `main.tsx`; English-only 404. Removed ~425 files: all Santiago `public/` assets, `.seo-audit/`, `.seo-audit-v2/`, `.playwright-mcp/`, `docs/hero.gif`, dead SEO scripts (`prerender.tsx`, `generate-rss/sitemap`, `validate-*`). Rewrote for Prakhar: `README.md` (was half a Spanish "Versión en Español" section for santifer.io), `public/llms.txt` (was 100% Santiago), `robots.txt`, `humans.txt`, `.well-known/security.txt`, `api/voice-token.js` voice persona, `api/cron/evaluate.js` + `scripts/evaluate-traces.ts` evaluator persona, `api/_shared/rag.js` (emptied dead ARTICLE_KEYWORDS/ROUTES), `.github/workflows` chat URL. `vercel.json`: stripped article/Spanish redirects+rewrites, added SPA fallback + OpenAI CSP.
3. **Voice mode fixed** — was 502. Migrated beta → GA Realtime API:
   - `api/voice-token.js`: `POST /v1/realtime/sessions` (removed by OpenAI) → `POST /v1/realtime/client_secrets`; token at top-level `data.value`; nested `session.audio.{input,output}`; `format` is an **object** `{type:'audio/pcm',rate:24000}`; model `gpt-realtime`, voice `cedar`.
   - `src/useVoiceMode.ts`: WS `?model=gpt-realtime`; dropped `openai-beta.realtime-v1` subprotocol; `session.update` → GA nested `audio.input`; event handlers accept beta + GA names (`response.output_audio.delta`, `response.output_audio_transcript.delta/.done`).
   - `vercel.json` CSP `connect-src` += `https://api.openai.com wss://api.openai.com`.
   - Verified live: `/api/voice-token` → 200 + `ek_` token; WS handshake → `session.updated` OK.
4. **LinkedIn plan** — `/Users/grandvision/Projects/CV/LinkedIn_Update_Plan_2026_v2.md` (copy-paste blocks per section, from the final CV).

### Deployed
- Commits on `main`: `7abb17f` (fact-sync) → `b394471` (purge) → `23dc749` (docs) → `cabde74` + `8b259a9` (voice) → `595f5ca` (docs).
- Pushed to all 3 remotes: `Mishraparivaar/Job-Hunt`, `Supervaish95/Job-Hunt`, `prakharmishra2026/PrakharCV`.
- Vercel `prakhar-cv` production: latest deploy ● Ready (voice fix verified live on `prakhar-abu58qpz6...vercel.app`).

### Still in flight / open items
- **Run `npm run prompt:sync`** — the voice bot reads a Langfuse-hosted copy of `chatbot-prompt.txt`; it serves stale facts until synced. Needs `LANGFUSE_SECRET_KEY`. (Text bot already reads the file at build.)
- **Custom domain** `prakhar-ai.dev` did not resolve during testing — confirm it points at the `prakhar-cv` Vercel project and shows the updates.
- **Langfuse env vars** not set on the Vercel project → `traceId: null`, voice sessions not traced in `/ops`. Add `LANGFUSE_*` in Vercel env if tracing is wanted.
- Non-shipping dev files still contain "santifer" strings: `scripts/update-{discord,twitter,reddit}-stats.ts`, `scripts/supabase-setup.sql` comment, `.gitignore` rule, `evals/datasets/*.json` fixtures. Not on the repo landing page; left to avoid breaking eval/ops tooling.
- Old routes (`/sobre-mi`, `/ai-agent-jacobo`, …) now render the in-app 404 (HTTP 200 SPA shell). Add hard 410s if SEO cares.

### Known open bugs
| # | Bug | Severity | Status |
|---|---|---|---|
| 1 | Voice sessions not traced (no `LANGFUSE_*` env on Vercel) | Low | Open — needs env vars |
| 2 | Langfuse-hosted voice prompt is stale until `npm run prompt:sync` | Med | Open — user action |

---

## Prior Status (pre-2026-08-30)
- Real headshot favicons & metadata active.
- Credly badges interactive and verified.
- Executive LinkedIn banner delivered.
- 1-Page ATS Resume & Apple Pages DOCX generated (superseded by `Final CV/Resume 2026 Final CV PDF.pdf`).
- Verified LinkedIn profile link updated across all surfaces.

## Active Deliverables & Artifacts
- **Final CV (source of truth):** `/Users/grandvision/Projects/CV/Final CV/Resume 2026 Final CV PDF.pdf` (+ `.pages`)
- Also: `/Users/grandvision/Projects/CV/Resume 2026 v 2.pdf` / `.docx` (the ATS-cleaned v2 pass)
- LinkedIn plan: `/Users/grandvision/Projects/CV/LinkedIn_Update_Plan_2026_v2.md`
- Knowledge Graph Engine: `Job-Hunt/api/_shared/knowledge-graph.js`
- Live Vercel App: `https://prakhar-ai.dev` (custom domain) / `prakhar-cv` project
