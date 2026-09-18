# Specialized APIs (September 2026)

Non-chat or narrow-modality providers on the OpenRouter catalog. Do not pick these as general LLM backends.

---

## Embeddings and rerank

### Voyage AI by MongoDB

- **Slug:** `voyageai` · **Retention:** retains prompts · **BYOK:** Yes
- **Docs / pricing:** https://docs.voyageai.com/docs/pricing · https://docs.voyageai.com
- **Fit:** High-quality text embeddings and rerankers for RAG.
- **Models:** `voyage-4-large`, `voyage-4`, `voyage-4-lite`, `voyage-context-4`, `voyage-code-3`, plus older voyage-3.x / domain models.
- **Pricing snapshot:** First 200M tokens free on current voyage-4 family (per docs). Then per-million rates on the pricing table (e.g. older `voyage-3.5-lite` $0.02/M, `voyage-3-large` $0.18/M). Re-fetch the table for voyage-4 SKUs.

OpenAI, Cohere, Google, and Mistral also sell embeddings — see [labs.md](labs.md).

---

## Speech

### Deepgram

- **Slug:** `deepgram` · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://developers.deepgram.com · **Fit:** STT (Nova family). OpenRouter volume is tiny vs chat hosts — call Deepgram directly for production audio.
- **Aggregator quote:** Nova-3 ~$0.0043/min — **verify Deepgram pricing page**.

### Fish Audio

- **Slug:** `fish-audio` · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.fish.audio · **Fit:** TTS / voice cloning (5 models on OpenRouter).

---

## Image

### Black Forest Labs (FLUX)

- **Slug:** `black-forest-labs` · **Retention:** 30 days · **BYOK:** No
- **Docs:** https://docs.bfl.ai · **Site:** https://blackforestlabs.ai
- **Fit:** FLUX image generation (7 models). LiteLLM has a BFL image provider page.
- **Pricing:** Credit / megapixel — confirm docs.bfl.ai (not token-priced like LLMs).

### Recraft

- **Slug:** `recraft` · **Retention:** retains prompts · **BYOK:** No
- **Site:** https://www.recraft.ai · LiteLLM: Recraft image provider
- **Fit:** Design-oriented image models (15 models on OpenRouter).

### Krea

- **Slug:** `krea` · **HQ:** United States · **Retention:** Zero · **BYOK:** No
- **Site:** https://www.krea.ai · **Fit:** Realtime / aesthetic image (3 models).

---

## Video

### Runway

- **Slug:** `runway` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** No
- **Docs:** https://docs.dev.runwayml.com · **Fit:** Gen video (2 models). Credits (~$0.01/credit on some plans — verify). Zero OpenRouter tokens at snapshot (catalogued, low marketplace use).

### HeyGen

- **Slug:** `heygen` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** No
- **Docs:** https://docs.heygen.com · **Fit:** Avatar video. Avatar III quoted ~$0.0167/s on third-party pages — verify HeyGen billing.

### Decart

- **Slug:** `decart` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Site:** https://decart.ai · **Fit:** Realtime/video-ish models (4 models, high monthly tokens vs tiny image labs).

---

## Coding apply / morphing

### Morph

- **Slug:** `morph` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.morphllm.com (confirm live) · **Fit:** Fast apply / merge models for coding agents (6 models, 55B daily tokens). Distinct from general chat.

Relace (see [inference-hosts.md](inference-hosts.md)) is in the same “fast apply” neighborhood.

---

## Confidential / TEE inference

### Phala

- **Slug:** `phala` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.phala.com/phala-cloud/confidential-ai/confidential-model/confidential-ai-api
- **Base URL:** `https://inference.phala.com/v1`
- **Fit:** OpenAI-compat chat **inside TEE** with attestation + per-response receipts (`x-receipt-id`, `GET /v1/aci/receipts/{id}`). Use `is_tee` on `GET /v1/models`. 21 models.
- **When:** Proof of confidential compute matters more than raw $/token.

---

## Other specialized / thin rows

| Provider | Slug | Notes |
| :--- | :--- | :--- |
| Sourceful | `sourceful` | 30-day retention; 4 models — confirm modality on OpenRouter provider page |
| TypeSafe | — | 1 model, ZDR; slug not in the public enum snapshot |
| Unbiased | — | 1 model, 30-day retention |
| AssemblyAI | `assemblyai` | STT; slug in enum, not on volume table |
| Deepgram / Fish Audio / BFL / Recraft | (above) | Prefer vendor consoles over OpenRouter for SLA |

For **Sora, Veo, gpt-image, Muse Image**, use the lab SKUs in [labs.md](labs.md) rather than these specialists.
