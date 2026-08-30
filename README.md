# prakhar-ai.dev

**Prakhar Mishra — interactive CV & AI portfolio.**

A single-page CV with a first-person AI chatbot (text + voice) grounded in a
verified knowledge graph, plus a private LLMOps dashboard for observability.

[![Live](https://img.shields.io/badge/live-prakhar--ai.dev-blue?style=flat-square)](https://prakhar-ai.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](#license)

---

## What it is

- **The CV** (`/`) — one page: profile, experience, skills, certifications, speaking, education.
- **AI avatar** — a floating chatbot that answers as Prakhar in the first person. Every fact is grounded in `api/_shared/knowledge-graph.js` + `chatbot-prompt.txt`; no invented numbers.
- **Voice mode** — OpenAI Realtime, English, same knowledge, function-calling into RAG.
- **`/ops`** — private, password-protected LLMOps dashboard (traces, cost, RAG, safety, evals) built on Langfuse data.

## Tech Stack

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-191919?style=flat&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_Realtime-412991?style=flat&logo=openai&logoColor=white)
![Langfuse](https://img.shields.io/badge/Langfuse-000000?style=flat&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Edge-000000?style=flat&logo=vercel&logoColor=white)

---

## Chatbot architecture

```
User message → src/FloatingChat.tsx → api/chat.js (Vercel Edge)
                                        ├── System prompt: chatbot-prompt.txt + knowledge-graph.js
                                        ├── LLM (via OpenRouter) — streaming generation
                                        ├── Agentic RAG (api/_shared/rag.js), when needed:
                                        │     ├── OpenAI embeddings (text-embedding-3-small)
                                        │     ├── Supabase pgvector (semantic) + full-text
                                        │     └── Claude Haiku (rerank + diversify)
                                        └── Langfuse tracing (per-span cost)

Voice → src/useVoiceMode.ts → api/voice-token.js → OpenAI Realtime WebSocket
                                └── api/rag-search.js (function-calling RAG)
```

The **text** bot reads `chatbot-prompt.txt` directly. The **voice** bot reads a
Langfuse-hosted copy of the same prompt (`api/_shared/prompt.js`) — after editing
`chatbot-prompt.txt`, run `npm run prompt:sync` to push it to production.

### Key files

| File | Purpose |
|------|---------|
| `api/chat.js` | Text chatbot edge function — RAG, tracing, streaming |
| `api/_shared/knowledge-graph.js` | Verified facts + RDF triples (the ground truth) |
| `chatbot-prompt.txt` | System prompt (text bot direct; voice bot via Langfuse) |
| `api/_shared/rag.js` | Hybrid search, reranking, cost tracking |
| `api/_shared/prompt.js` | Langfuse prompt registry with file fallback |
| `api/voice-token.js` | OpenAI Realtime ephemeral token + rate limiting |
| `api/rag-search.js` | RAG search for voice function calling |
| `src/FloatingChat.tsx` | Chat widget (text mode, streaming SSE) |
| `src/useVoiceMode.ts` | Voice mode hook |
| `public/llms.txt` | Machine-readable CV for AI crawlers |

---

## LLMOps dashboard (`/ops`)

Private, password-protected (`OPS_DASHBOARD_SECRET`). Tabs: Overview, Conversations,
Costs, RAG, Security, Evals, Voice, System — all from live Langfuse traces + Supabase.

| Endpoint | Purpose |
|----------|---------|
| `api/ops/auth.js` | Login |
| `api/ops/stats.js` | Aggregated stats from traces |
| `api/ops/traces.js` | Trace list with filters |
| `api/ops/trace/[id].js` | Full trace detail |
| `api/ops/evals.js` | Eval results (embedded at build) |
| `api/ops/prompts.js` | Prompt versions from Langfuse |
| `api/ops/rag-stats.js` | RAG document stats from Supabase |

---

## Evals & testing

Automated tests in `evals/` across 10 datasets (factual, persona, boundaries,
quality, safety/jailbreak, languages, RAG, multi-turn, source-badges, voice).
Mix of deterministic assertions and LLM-as-judge (Haiku).

| Command | Purpose |
|---------|---------|
| `npm run evals` | Run the eval suite |
| `npm run adversarial` | Red-team: auto-generated attack vectors |
| `npm run chats` | View recent conversations from Langfuse |
| `npm run evaluate-traces` | Batch-score traces with Haiku |
| `npm run diagnose:rag` | RAG retrieval diagnostic |
| `npm run prompt:sync` | Push `chatbot-prompt.txt` to Langfuse |
| `npm run prompt:regression` | Diff two prompt versions |
| `npm run rag:sync` | Re-ingest content into Supabase pgvector |
| `npm run test:contract` / `npm run test:ops` | Dashboard contract + API tests |

---

## Quick start

```bash
git clone https://github.com/prakharmishra2026/PrakharCV.git
cd PrakharCV
npm install
npm run dev
```

Open http://localhost:5173

### Environment variables

```bash
# Core
ANTHROPIC_API_KEY=            # Claude (RAG rerank, scoring)
OPENROUTER_API_KEY=           # Text chatbot generation
OPENAI_API_KEY=               # Embeddings + Voice Realtime

# RAG
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RAG_SUPABASE_URL=

# Observability
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_BASE_URL=

# Alerts & dashboard
RESEND_API_KEY=               # Jailbreak email alerts
OPS_DASHBOARD_SECRET=         # /ops password
```

`npm run build` = `tsc -b && vite build`. Vercel deploys the `dist/` output.

---

## Project structure

```
src/
├── App.tsx                 # The CV — all sections
├── AboutPage.tsx           # /about
├── PrivacyPolicy.tsx       # /privacy
├── FloatingChat.tsx        # Chat widget (text)
├── useVoiceMode.ts         # Voice mode hook
├── VoiceOrb.tsx            # Voice UI
├── GlobalNav.tsx           # Nav + breadcrumbs
├── main.tsx                # Router
├── i18n.ts                 # UI copy + hero content
├── about-i18n.ts           # About page content
├── articles/               # Layout primitives reused by /privacy
│   ├── registry.ts         # (empty — no article pages)
│   ├── components.tsx
│   └── content-types.tsx
└── ops/                    # LLMOps dashboard (shell, tabs, hooks, components)

api/
├── chat.js                 # Text chatbot
├── voice-token.js          # Voice token + rate limit
├── voice-trace.js          # Voice tracing
├── rag-search.js           # RAG for voice
├── cron/evaluate.js        # Daily eval cron
├── _shared/                # rag.js, prompt.js, knowledge-graph.js, ops-auth.js
└── ops/                    # Dashboard API layer

evals/                      # Datasets + runner + assertions + LLM judge
tests/                      # Contract + dashboard API tests
chatbot-prompt.txt          # System prompt (fallback; prod via Langfuse)
public/llms.txt             # Machine-readable CV
```

---

## Cost

- **< $0.005 per text conversation**
- **~$0.25 per voice session** (OpenAI Realtime)
- **$0 infrastructure** on free tiers (Vercel, Supabase, Langfuse)

---

## License

MIT

---

## Connect

[![Website](https://img.shields.io/badge/prakhar--ai.dev-000?style=for-the-badge&logo=safari&logoColor=white)](https://prakhar-ai.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prakhar-mishra-b74b85124)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:prakharmishra2015@gmail.com)
