# MEMORY & ARCHITECTURAL GROUND TRUTH

> **Source of truth for all facts:** `/Users/grandvision/Projects/CV/Final CV/Resume 2026 Final CV PDF.pdf`.
> If anything here disagrees with that PDF, the PDF wins — update this file.

## 1. Executive Identity & Verified Nuance
- **Full Name:** Prakhar Mishra
- **Current Role:** Senior Manager | Chief of Staff & Enterprise AI Transformation Lead — Cloud & Custom Applications India (C&CA)
- **Practice:** Cloud & Custom Applications (C&CA) India (~20,000 professionals) at Capgemini Technology Services India Limited, Gurugram.
- **C-Suite Relationship:** Strategic advisor to the unit CEO and partner to the unit COO. (The site's About/i18n also phrases this as advisor to the EVP & Head of C&CA India — both refer to the same top of the unit.)
- **Career Velocity:** **3 promotions in 6 years** — Consultant → Senior Consultant → Manager → Senior Manager. (NEVER say 4. The chain has 4 titles = 3 promotions.)
- **Reports:** 7 direct and ~50 indirect reports (B-School talent pool).
- **Role dates (CV):** Senior Manager | Chief of Staff — Oct 2025–Present; Manager | PMO Lead — Apr 2024–Sep 2025; Senior Consultant | Product BA & PM, Media & Entertainment SaaS — Sep 2021–Mar 2024; Consultant | Scrum Master & Community Marketing Lead — Aug 2020–Sep 2021.
  - **Exception:** the interactive site (`src/i18n.ts`, `src/about-i18n.ts`) deliberately keeps the current role as a single **"Nov 2023 – Present"** block (user's explicit choice for that surface). LinkedIn + CV use the two-position split.
- **Location:** Gurgaon, India (open to India + global relocation).
- **Contact:** `prakharmishra2015@gmail.com` | `+91 62395 54160` (there is NO `hi@prakhar-ai.dev` — that was a leftover fake address, now removed everywhere).
- **LinkedIn:** `https://www.linkedin.com/in/prakhar-mishra-b74b85124`
- **GitHub:** `https://github.com/prakharmishra2026`
- **Portfolio / interactive CV:** `https://prakhar-ai.dev` (Vercel project `prakhar-cv`, org `prakharmishra2026s-projects`).

## 2. Selling Pillars & Badges (LOCKED — NEVER USE SQUARE BRACKETS `[]`)
1. `Claude Certified Architect`
2. `Outskill AI Catalyst`
3. `Chief AI Trainer`

## 3. Verified Credly Badges
- **Anthropic Claude Certified Architect — Foundations (2026):** `https://www.credly.com/badges/5d37c2f2-c466-45c0-8cf3-a9b6b5aed4b2` — 100% in Agentic Architecture & System Orchestration.
- **AWS Partner: Sales Accredited – Training Badge:** `https://www.credly.com/badges/0a10fe25-f5cd-4838-90d3-fb2e0e62610d`
- Also on CV: Anthropic Interactive Accreditations (2026) — MCP, Claude API Architecture, Custom Tool/Skills Engineering, Multi-Agent Collaboration; 24-Week AI Catalyst Certification (**2026**), OutSkill / GrowthSchool; AWS Certified Solutions Architect – Associate (2022); SAFe 5 POPM (2021); Lean Six Sigma Green Belt (KPMG, 2018); Certified Scrum Master.

## 4. Ground-Truth Career Metrics (CV — use these exact figures everywhere)
- **Enterprise AI enablement:** first AI upskilling architecture for senior executives across **13 technology delivery hubs**. As Chief AI Trainer, a train-the-trainer (TTT) model **certified 300+ trainers**, who **upskilled 2,000+ senior executives**; **1,000+ executives guided** to a tool-agnostic AI mindset. Output: **thousands of working prototypes**, each scoped to a named enterprise use case. Reached 5,000+ associates and 1,000+ senior leaders in total.
  - DO NOT use the old numbers "2,500+ E&F leaders", "94 prototypes", "240 voice interviews", "200 trainers", "500+ mentored" — those were template-era placeholders, now purged.
- **Candidate evaluation transformation (~$1.9M / INR 18 Cr):** adaptive assessment engine + AI-led voice interviews across **5,000+ associates**. External certification failure **20% → under 5%**. Average bench tenure **117 → under 60 days** (~57 idle days removed per associate across a ~2,000-person fresher pool). **INR 18 Cr (~$1.9M)** annualised idle-bench cost released. (NOT "$1.5M–$3M+".)
- **India PMO control tower:** converted from a reporting function; governs **9 transformation programmes across 38+ business leaders** under one KPI architecture feeding the quarterly executive review.
- **Account opportunity engine:** opportunity-mining model across the **top 50 accounts** (NOT "top 10–20"), used by the Centre of Excellence.
- **B-School / Chrysalis redesign:** billability **30% → 60%**, intake cycle time **−80%**, first-year trainee attrition **−~90%**.
- **Manager-era wins:** practice-wide reporting on unit data lake (Power BI, budget model, leadership structure); SharePoint + M365 + Power BI Copilot; 15+ VP/EVP strategy workshops; governance charter across 5 communities (Industry, Architect, AI, BA, Engagement Manager; ~15,000 professionals) + knowledge portal; marketing playbook + org chart for C&CA India (unit formed Jan 2024).
- **Media & Entertainment SaaS (Sep 2021–Mar 2024):** DEX theatrical platform for Sony Pictures + Universal Studios; Sony account SPOC; client demos +15% engagement, +5% revenue. ReelSwipe iOS — four-person team, 25% ahead of schedule, NAB Show 2022 New York. Pre-sales — five-person team, AWS-funded ML extension of DEX, 2022 M&E hackathon.
- **Consultant era (Aug 2020–Sep 2021):** Scrum Master, Baker Hughes Industrial IoT — 95% on-time sprint delivery, 20% timeline improvement. Marketing Team Lead, NA Architect Community — **six-person team**, INR 1.55L funding, **18 blogs + 9 points of view**, 1,200+ architects, Capgemini Super Team Award 2021. Sector value-chain research — EVOLVE Award for SAP S/4HANA migration analysis.
- **Education:** MBA **Business Management** — XIMB (2018–2020); B.Tech Mining Engineering — NIT Jalandhar (NIT-J) (2013–2017). Internship: Strategic Planning Intern, Ogilvy India (2019).
- **Speaking:** Xcelsior 6.0 XIMB keynote panelist (Aug 2026, "The 'Born AI' Mindset", SHIFT 5-level framework); Unscripted, Capgemini C&CA India (1 of 3 speakers, 350+ attendees); India AI Impact Summit 2026 (Bharat Mandapam) — authored the competitive read.
- **Beyond work:** music composer & singer-songwriter, 10+ original tracks (Spotify/Apple Music/YouTube); "Chahat" (Hindi–Odia) sold to Dongyue Entertainment; "Chehra Hai Ya Chand" 1L+ streams; "Jiye Jaa Rahe Ho" featured across 35 Indian cities by Red FM.

## 5. Architectural & System Rules
- **Vercel API conventions:** helper modules live in `api/_shared/` (not directly under `api/`) to avoid route-name collisions.
- **Build = `tsc -b && vite build`** (package.json). `scripts/` is NOT typechecked and NOT run on deploy — those are manual dev tools, safe to delete wholesale.
- **Chatbot knowledge sources:** `chatbot-prompt.txt` + `api/_shared/knowledge-graph.js`. `api/chat.js` (text bot) reads the file directly at build. The **voice** RAG path (`api/rag-search.js` via `api/_shared/prompt.js`) prefers a **Langfuse-hosted** prompt `chatbot-system` label `production` — push updates with `npm run prompt:sync`.
- **RAG store** (Supabase pgvector) holds only article content, no bio facts — so bio corrections only need the prompt + knowledge-graph files. `ARTICLE_KEYWORDS` / `ARTICLE_ROUTES` in `api/_shared/rag.js` are now empty (no article pages).
- **The repo is a de-branded fork** of another person's portfolio (Santiago Fernández / "Career-Ops" / Santifer iRepair). All article/case-study routes, Spanish pages, and that identity have been removed. When touching SEO/prerender/prompt/static-text files, grep the whole tree for `santifer` / `santiago` before assuming it's clean.
- **Git remotes** (all the user's own): `mishraparivaar` → `Mishraparivaar/Job-Hunt` (tracked by `main`); `origin` → `Supervaish95/Job-Hunt`; `prakhar2026` → `prakharmishra2026/PrakharCV` (the one Vercel `prakhar-cv` auto-deploys from). Push `main` to all three to keep them in sync + trigger deploy.

## 6. OpenAI Realtime API (voice mode) — GA contract
- Endpoint: `POST https://api.openai.com/v1/realtime/client_secrets` (the old `/v1/realtime/sessions` was removed — returns `{"error":"Invalid URL"}`).
- Request body: `{ expires_after: { anchor: 'created_at', seconds: 600 }, session: { type: 'realtime', model: 'gpt-realtime', instructions, output_modalities: ['audio'], audio: { input: { format: { type: 'audio/pcm', rate: 24000 }, turn_detection: { type: 'server_vad' }, transcription: { model: 'whisper-1' } }, output: { voice: 'cedar', format: { type: 'audio/pcm', rate: 24000 } } }, tools: [...] } }`.
  - `audio.*.format` MUST be an object, not the string `'pcm16'` (that gives `invalid_type`).
- Response: ephemeral key is at **top-level `data.value`** (`ek_...`), expiry at `data.expires_at`.
- Browser WS: `new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-realtime', ['realtime', 'openai-insecure-api-key.' + ek])`. No `openai-beta.realtime-v1` subprotocol.
- Server event renames (GA): `response.audio.delta` → `response.output_audio.delta`; `response.audio_transcript.delta`/`.done` → `response.output_audio_transcript.delta`/`.done`. Unchanged: `input_audio_buffer.*`, `conversation.item.input_audio_transcription.completed`, `response.function_call_arguments.done`, `response.done`, and all client→server events.
- `vercel.json` CSP `connect-src` must include `https://api.openai.com wss://api.openai.com` (browser opens the WS directly).
- Client `session.update` uses the GA nested shape: `session.audio.input.{format,turn_detection,transcription}`.

## 7. Next Steps
- Run `npm run prompt:sync` (needs `LANGFUSE_SECRET_KEY`) so the voice bot's Langfuse prompt matches `chatbot-prompt.txt`.
- Confirm `prakhar-ai.dev` custom domain serves the current deploy.
- (Optional) add `LANGFUSE_*` env vars to the Vercel project for voice-session tracing in `/ops`.
- (Optional) scrub remaining "santifer" strings from non-shipping `scripts/*` and `evals/datasets/*`.
