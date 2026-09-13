"""OpenRouter & EuroRouter Reference Implementation (Python).

Both routers use the standard OpenAI Python client with custom base_url.
"""

import os
from openai import OpenAI


# 1. OpenRouter Integration
def run_openrouter():
    client = OpenAI(
        api_key=os.environ.get("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": "https://agent-engine.local",
            "X-Title": "Agent Engine Monorepo",
        },
    )

    response = client.chat.completions.create(
        model="openrouter/auto",
        messages=[
            {"role": "user", "content": "Explain write amplification in LSM trees."}
        ],
    )
    print("OpenRouter Result:\n", response.choices[0].message.content)


# 2. EuroRouter Integration (GDPR / EU Data Residency)
def run_eurorouter():
    client = OpenAI(
        api_key=os.environ.get("EUROUTER_API_KEY"),
        base_url="https://api.eurouter.ai/v1",
    )

    response = client.chat.completions.create(
        model="mistralai/mistral-large-3",
        messages=[
            {"role": "user", "content": "Explain data minimization under GDPR."}
        ],
    )
    print("EuroRouter Result:\n", response.choices[0].message.content)


if __name__ == "__main__":
    run_openrouter()
