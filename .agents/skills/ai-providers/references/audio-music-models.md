# Music, speech, and audio models (OpenRouter, September 2026)

Token prices are OpenRouter USD **per 1M tokens**. Image/video/music often bill **per image, second, or song** — if prompt/completion show $0, open the OpenRouter page. `:batch` SKUs omitted.

OpenRouter: `https://openrouter.ai/{id}`.

**Music generation** on this marketplace snapshot is **Google Lyria 3** (Gemini API). Suno / Udio are **not** listed on OpenRouter here — use those vendors directly if needed.

**TTS / voice:** Fish Audio, MiniMax Speech, Qwen-Audio TTS, Deepgram Aura, Grok Voice, Gemini Flash TTS, Mistral Voxtral TTS, plus open Kokoro/Orpheus/CSM.

**Realtime audio chat:** OpenAI `gpt-audio` / `gpt-audio-mini`.

Vendor docs: [Lyria / Gemini](https://ai.google.dev/gemini-api/docs) · [OpenAI audio](https://developers.openai.com/api/docs) · [Fish Audio](https://docs.fish.audio) · [Deepgram](https://developers.deepgram.com) · [MiniMax](https://platform.minimax.io/docs)

## Music generation

### `google/lyria-3-pro-preview` — Google: Lyria 3 Pro Preview

- **OpenRouter:** https://openrouter.ai/google/lyria-3-pro-preview
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image` → out `text,audio`
- **Context:** 1M · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Full-length songs are priced at $0.08 per song. Lyria 3 is Google's family of music generation models, available through the Gemini API. With Lyria 3, you can generate high-quality, 48kHz...

### `google/lyria-3-clip-preview` — Google: Lyria 3 Clip Preview

- **OpenRouter:** https://openrouter.ai/google/lyria-3-clip-preview
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image` → out `text,audio`
- **Context:** 1M · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** 30 second duration clips are priced at $0.04 per clip. Lyria 3 is Google's family of music generation models, available through the Gemini API. With Lyria 3, you can generate...

## Text-to-speech / voice

### `deepgram/flux-tts:free` — Deepgram: Flux TTS (free)

- **OpenRouter:** https://openrouter.ai/deepgram/flux-tts:free
- **Vendor docs:** https://developers.deepgram.com
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Flux TTS is a text-to-speech model from Deepgram. It is suited for natural, expressive English speech synthesis across Deepgram's Flux voice catalog.

### `fish-audio/s1` — Fish Audio: S1

- **OpenRouter:** https://openrouter.ai/fish-audio/s1
- **Vendor docs:** https://docs.fish.audio
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** S1 is a multilingual text-to-speech model from Fish Audio. It is suited for voice applications that need broad emotional expression, using parenthetical controls to guide speaking style across its supported...

### `fish-audio/s2-pro` — Fish Audio: S2 Pro

- **OpenRouter:** https://openrouter.ai/fish-audio/s2-pro
- **Vendor docs:** https://docs.fish.audio
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** S2 Pro is a multilingual text-to-speech model from Fish Audio. It is suited for expressive narration and multi-speaker dialogue, with natural-language controls for speaking style and emotion.

### `fish-audio/s2.1-pro-free:free` — Fish Audio: S2.1 Pro Free (free)

- **OpenRouter:** https://openrouter.ai/fish-audio/s2.1-pro-free:free
- **Vendor docs:** https://docs.fish.audio
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** S2.1 Pro Free is the no-cost variant of Fish Audio S2.1 Pro, intended for testing, prototyping, and low-volume applications. It provides the same synthesis capabilities without production latency or availability...

### `fish-audio/s2.1-pro` — Fish Audio: S2.1 Pro

- **OpenRouter:** https://openrouter.ai/fish-audio/s2.1-pro
- **Vendor docs:** https://docs.fish.audio
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** S2.1 Pro is a production-oriented text-to-speech model from Fish Audio. It is suited for multilingual voice applications, expressive narration, and dialogue synthesis, with open-ended natural-language controls for speaking style and...

### `microsoft/mai-voice-2-flash` — Microsoft AI: MAI-Voice-2-Flash

- **OpenRouter:** https://openrouter.ai/microsoft/mai-voice-2-flash
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** MAI-Voice-2-Flash is a low-latency text-to-speech model from Microsoft AI for voice agents, assistants, call centers, accessibility, narration, and other interactive applications. It generates expressive 24 kHz mono speech across 15...

### `qwen/qwen-audio-3.0-tts-flash` — Qwen: Qwen-Audio-3.0-TTS Flash

- **OpenRouter:** https://openrouter.ai/qwen/qwen-audio-3.0-tts-flash
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** Qwen-Audio-3.0-TTS Flash is Alibaba's fast, cost-efficient text-to-speech model, generating spoken audio from text via the DashScope Speech Synthesizer API.

### `qwen/qwen-audio-3.0-tts-plus` — Qwen: Qwen-Audio-3.0-TTS Plus

- **OpenRouter:** https://openrouter.ai/qwen/qwen-audio-3.0-tts-plus
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $20 / $0 per 1M tok
- **About:** Qwen-Audio-3.0-TTS Plus is Alibaba's higher-quality text-to-speech model, generating spoken audio from text via the DashScope Speech Synthesizer API.

### `deepgram/aura-2` — Deepgram: Aura-2

- **OpenRouter:** https://openrouter.ai/deepgram/aura-2
- **Vendor docs:** https://developers.deepgram.com
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $30 / $0 per 1M tok
- **About:** Aura-2 is a multilingual text-to-speech model from Deepgram. It supports Deepgram’s canonical Aura-2 voice catalog for speech synthesis across multiple languages.

### `minimax/speech-2.8-hd` — MiniMax: Speech 2.8 HD

- **OpenRouter:** https://openrouter.ai/minimax/speech-2.8-hd
- **Vendor docs:** https://platform.minimax.io/docs
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $100 / $0 per 1M tok
- **About:** MiniMax Speech 2.8 HD is a text-to-speech model from MiniMax. It is suited for applications that generate spoken audio from text and accepts arbitrary MiniMax voice IDs.

### `minimax/speech-2.8-turbo` — MiniMax: Speech 2.8 Turbo

- **OpenRouter:** https://openrouter.ai/minimax/speech-2.8-turbo
- **Vendor docs:** https://platform.minimax.io/docs
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $60 / $0 per 1M tok
- **About:** MiniMax Speech 2.8 Turbo is a text-to-speech model from MiniMax. It is suited for applications that generate spoken audio from text and accepts arbitrary MiniMax voice IDs.

### `microsoft/mai-voice-2` — Microsoft AI: MAI-Voice-2

- **OpenRouter:** https://openrouter.ai/microsoft/mai-voice-2
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `text` → out `speech`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $22 / $0 per 1M tok
- **About:** MAI-Voice-2 is an expressive text-to-speech model from Microsoft AI. It is suited for conversational assistants, media narration, accessibility, education, and other long-form voice applications. It supports 15 languages across 18...

### `x-ai/grok-voice-tts-1.0` — SpaceXAI: Grok Voice TTS 1.0

- **OpenRouter:** https://openrouter.ai/x-ai/grok-voice-tts-1.0
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text` → out `speech`
- **Context:** 15K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** Grok Voice TTS 1.0 is a text-to-speech model from SpaceXAI. It converts text into spoken audio across 20+ languages with automatic language detection, and offers five built-in voices (Eve, Ara,...

### `google/gemini-3.1-flash-tts-preview` — Google: Gemini 3.1 Flash TTS Preview

- **OpenRouter:** https://openrouter.ai/google/gemini-3.1-flash-tts-preview
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text` → out `speech`
- **Context:** 32K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $1 / $20 per 1M tok
- **About:** Gemini 3.1 Flash TTS Preview is a text-to-speech model from Google, and a substantial generational step up from Gemini 2.5 Flash TTS. It takes text input and produces audio output...

### `canopylabs/orpheus-3b-0.1-ft` — Canopy Labs: Orpheus 3B

- **OpenRouter:** https://openrouter.ai/canopylabs/orpheus-3b-0.1-ft
- **Modalities:** in `text` → out `speech`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $15 / $0 per 1M tok
- **About:** Orpheus 3B is an English text-to-speech model from Canopy Labs, fine-tuned for natural prosody and expressive delivery. It offers 7 preset voices and is suited for narration, voice assistants, and...

### `sesame/csm-1b` — Sesame: CSM 1B

- **OpenRouter:** https://openrouter.ai/sesame/csm-1b
- **Modalities:** in `text` → out `speech`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $7 / $0 per 1M tok
- **About:** CSM 1B is a conversational speech model from Sesame. It accepts text input and produces English speech output, with voice options spanning conversational and read-speech styles. At 1B parameters, it...

### `hexgrad/kokoro-82m` — hexgrad: Kokoro 82M

- **OpenRouter:** https://openrouter.ai/hexgrad/kokoro-82m
- **Modalities:** in `text` → out `speech`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $4 / $0 per 1M tok
- **About:** Kokoro 82M is a lightweight, open-weight text-to-speech model from hexgrad. It converts text to speech across 8 languages (American and British English, Spanish, French, Hindi, Italian, Japanese, Portuguese, and Chinese)...

### `mistralai/voxtral-mini-tts-2603` — Mistral: Voxtral Mini TTS

- **OpenRouter:** https://openrouter.ai/mistralai/voxtral-mini-tts-2603
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Modalities:** in `text` → out `speech`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $16 / $0 per 1M tok
- **About:** Voxtral Mini TTS is Mistral's text-to-speech model featuring zero-shot voice cloning and multilingual support. It converts text input into natural-sounding audio output.

## Realtime / native audio chat

### `openai/gpt-audio` — OpenAI: GPT Audio

- **OpenRouter:** https://openrouter.ai/openai/gpt-audio
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,audio` → out `text,audio`
- **Context:** 128K · **Tools:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2.5 / $10 per 1M tok · audio $32 per 1M
- **About:** The gpt-audio model is OpenAI's first generally available audio model. The new snapshot features an upgraded decoder for more natural sounding voices and maintains better voice consistency. Audio is priced...

### `openai/gpt-audio-mini` — OpenAI: GPT Audio Mini

- **OpenRouter:** https://openrouter.ai/openai/gpt-audio-mini
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,audio` → out `text,audio`
- **Context:** 128K · **Tools:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.6 / $2.4 per 1M tok · audio $0.6 per 1M
- **About:** A cost-efficient version of GPT Audio. The new snapshot features an upgraded decoder for more natural sounding voices and maintains better voice consistency. Input is priced at $0.60 per million...

## Speech-to-text / transcription

### `meta/muse-voice-transcribe-1.0` — Meta: Muse Voice Transcribe 1.0

- **OpenRouter:** https://openrouter.ai/meta/muse-voice-transcribe-1.0
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $180000 / $0 per 1M tok
- **About:** Muse Voice Transcribe 1.0 is a synchronous speech-to-text model from Meta. It is suited for push-to-talk, endpointing, and speaker-aware transcription, with keyword biasing for domain terms and language biasing through...

### `microsoft/mai-transcribe-2` — Microsoft AI: MAI-Transcribe 2

- **OpenRouter:** https://openrouter.ai/microsoft/mai-transcribe-2
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $100000 / $0 per 1M tok
- **About:** MAI-Transcribe 2 is a multilingual speech-to-text model from Microsoft AI, ranked #1 on the FLEURS multilingual benchmark. It supports 60 languages with automatic language identification, code switching for mixed-language speech,...

### `nvidia/nemotron-3.5-asr-streaming-multilingual-0.6b` — NVIDIA: Nemotron 3.5 ASR Streaming Multilingual 0.6B

- **OpenRouter:** https://openrouter.ai/nvidia/nemotron-3.5-asr-streaming-multilingual-0.6b
- **Vendor docs:** https://docs.nvidia.com/nim/
- **Hugging Face:** https://huggingface.co/nvidia/Nemotron-3.5-ASR-Streaming-Multilingual-0.6b
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $3.33 / $0 per 1M tok
- **About:** Nemotron 3.5 ASR Streaming Multilingual 0.6B is a speech recognition model from NVIDIA. Its prompt-conditioned, cache-aware FastConformer-RNNT design targets low-latency transcription across more than 40 languages for real-time captioning, voice...

### `mistralai/voxtral-small-24b-2507-stt` — Mistral: Voxtral Small 24B 2507 STT

- **OpenRouter:** https://openrouter.ai/mistralai/voxtral-small-24b-2507-stt
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Hugging Face:** https://huggingface.co/mistralai/Voxtral-Small-24B-2507
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $50 / $0 per 1M tok
- **About:** Voxtral Small 24B 2507 STT is a speech transcription model from Mistral AI. It is suited for transcription, translation, and audio understanding workloads that benefit from its larger model capacity.

### `mistralai/voxtral-mini-3b-2507` — Mistral: Voxtral Mini 3B 2507

- **OpenRouter:** https://openrouter.ai/mistralai/voxtral-mini-3b-2507
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Hugging Face:** https://huggingface.co/mistralai/Voxtral-Mini-3B-2507
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $16.67 / $0 per 1M tok
- **About:** Voxtral Mini 3B 2507 is a speech and audio understanding model from Mistral AI. It is suited for transcription, translation, and compact audio processing workloads.

### `qwen/qwen3-asr-1.7b` — Qwen: Qwen3 ASR 1.7B

- **OpenRouter:** https://openrouter.ai/qwen/qwen3-asr-1.7b
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Hugging Face:** https://huggingface.co/Qwen/Qwen3-ASR-1.7B
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $7.5 / $0 per 1M tok
- **About:** Qwen3 ASR 1.7B is an automatic speech recognition model from Qwen. It supports multilingual language identification and transcription across 30 languages and 22 Chinese dialects, with streaming and offline inference...

### `qwen/qwen3-asr-0.6b` — Qwen: Qwen3 ASR 0.6B

- **OpenRouter:** https://openrouter.ai/qwen/qwen3-asr-0.6b
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Hugging Face:** https://huggingface.co/Qwen/Qwen3-ASR-0.6B
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $3.33 / $0 per 1M tok
- **About:** Qwen3 ASR 0.6B is a compact automatic speech recognition model from Qwen. It supports multilingual language identification and transcription across 30 languages and 22 Chinese dialects, with streaming and offline...

### `openai/gpt-transcribe` — OpenAI: GPT Transcribe

- **OpenRouter:** https://openrouter.ai/openai/gpt-transcribe
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $4500 / $0 per 1M tok
- **About:** GPT Transcribe is a high-accuracy speech-to-text model from OpenAI. It is suited for recorded audio, streamed file transcription, and committed Realtime turns, with free-form context, keyword hints, and multiple language...

### `fish-audio/transcribe-1` — Fish Audio: Transcribe 1

- **OpenRouter:** https://openrouter.ai/fish-audio/transcribe-1
- **Vendor docs:** https://docs.fish.audio
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $100 / $0 per 1M tok
- **About:** Transcribe 1 is a speech-to-text model from Fish Audio. It is suited for audio transcription with automatic language detection and can return timestamped word-level segments when alignment details are requested.

### `x-ai/grok-stt-1.0` — SpaceXAI: Grok STT 1.0

- **OpenRouter:** https://openrouter.ai/x-ai/grok-stt-1.0
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $100000 / $0 per 1M tok
- **About:** Grok STT is SpaceXAI's speech-to-text model, available via the REST /v1/stt endpoint. It supports transcription with word-level timestamps, optional speaker diarization, and multichannel audio.

### `deepgram/nova-3` — Deepgram: Nova-3

- **OpenRouter:** https://openrouter.ai/deepgram/nova-3
- **Vendor docs:** https://developers.deepgram.com
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $4300 / $0 per 1M tok
- **About:** Deepgram Nova-3 general-purpose speech-to-text model with monolingual and multilingual transcription support.

### `microsoft/mai-transcribe-1.5` — Microsoft AI: MAI-Transcribe 1.5

- **OpenRouter:** https://openrouter.ai/microsoft/mai-transcribe-1.5
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $360000 / $0 per 1M tok
- **About:** MAI-Transcribe 1.5 is a multilingual speech-to-text model from Microsoft AI. It is suited for captions, call transcription, subtitling, accessibility, and other voice-enabled applications, with reliable transcription across 43 languages, diverse...

### `nvidia/parakeet-tdt-0.6b-v3` — NVIDIA: Parakeet TDT 0.6B v3

- **OpenRouter:** https://openrouter.ai/nvidia/parakeet-tdt-0.6b-v3
- **Vendor docs:** https://docs.nvidia.com/nim/
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $1500 / $0 per 1M tok
- **About:** Parakeet TDT 0.6B v3 is NVIDIA's 600M-parameter multilingual speech-to-text model built on the FastConformer-TDT architecture. Trained on the Granary dataset (670,000+ hours of audio), it supports automatic language detection across...

### `mistralai/voxtral-mini-transcribe` — Mistral: Voxtral Mini Transcribe

- **OpenRouter:** https://openrouter.ai/mistralai/voxtral-mini-transcribe
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $3000 / $0 per 1M tok
- **About:** Voxtral Mini Transcribe is Mistral's speech-to-text model, derived from the Voxtral Mini family. It accepts audio input and returns transcribed text via the standard transcription API. Suited for transcribing meetings,...

### `qwen/qwen3-asr-flash-2026-02-10` — Qwen: Qwen3 ASR Flash

- **OpenRouter:** https://openrouter.ai/qwen/qwen3-asr-flash-2026-02-10
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $35 / $0 per 1M tok
- **About:** Qwen3-ASR-Flash is Alibaba's automatic speech recognition service, built on the Qwen3-Omni foundation and trained on tens of millions of hours of multimodal speech data. The model handles 11 languages —...

### `google/chirp-3` — Google: Chirp 3

- **OpenRouter:** https://openrouter.ai/google/chirp-3
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $16000 / $0 per 1M tok
- **About:** Chirp 3 is Google's latest multilingual speech-to-text model. It offers enhanced transcription accuracy across 24 GA languages and 77+ preview languages, with support for automatic language detection, automatic punctuation, and...

### `openai/gpt-4o-mini-transcribe` — OpenAI: GPT-4o Mini Transcribe

- **OpenRouter:** https://openrouter.ai/openai/gpt-4o-mini-transcribe
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** 128K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $5 per 1M tok
- **About:** GPT-4o Mini Transcribe is OpenAI's smaller, cost-efficient speech-to-text model built on GPT-4o Mini audio capabilities. It's priced per token (input and output), making it suitable for high-volume transcription workflows that...

### `openai/whisper-large-v3` — OpenAI: Whisper Large V3

- **OpenRouter:** https://openrouter.ai/openai/whisper-large-v3
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Hugging Face:** https://huggingface.co/openai/whisper-large-v3
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $7.5 / $0 per 1M tok
- **About:** Whisper Large V3 is OpenAI's open-source automatic speech recognition model offering both audio transcription and translation. It supports 99+ languages and accepts common audio formats including mp3, mp4, wav, webm,...

### `openai/whisper-large-v3-turbo` — OpenAI: Whisper Large V3 Turbo

- **OpenRouter:** https://openrouter.ai/openai/whisper-large-v3-turbo
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Hugging Face:** https://huggingface.co/openai/whisper-large-v3-turbo
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $3.33 / $0 per 1M tok
- **About:** Whisper Large V3 Turbo is an optimized version of OpenAI's Whisper Large V3 speech recognition model, designed for speed and cost efficiency. It supports transcription across 99+ languages with a...

### `openai/whisper-1` — OpenAI: Whisper 1

- **OpenRouter:** https://openrouter.ai/openai/whisper-1
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $6000 / $0 per 1M tok
- **About:** Whisper is OpenAI's open-source automatic speech recognition model, available via API as `whisper-1`. It supports transcription and translation across 50+ languages from audio files up to 25 MB. Accepts formats...

### `openai/gpt-4o-transcribe` — OpenAI: GPT-4o Transcribe

- **OpenRouter:** https://openrouter.ai/openai/gpt-4o-transcribe
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `audio` → out `transcription`
- **Context:** 128K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $2.5 / $10 per 1M tok
- **About:** GPT-4o Transcribe is OpenAI's high-quality speech-to-text model built on GPT-4o audio capabilities. It's priced per token (input and output), making it suitable for workflows that benefit from token-level billing transparency.

