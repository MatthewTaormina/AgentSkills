"""Cohere Reference Implementation (Python).

Official `cohere` SDK — ClientV2 (API v2).
"""

import os
import cohere

client = cohere.ClientV2(api_key=os.environ.get("COHERE_API_KEY"))


def run_chat():
    response = client.chat(
        model="command-a-plus-05-2026",
        messages=[
            {"role": "system", "content": "You are a software architect."},
            {"role": "user", "content": "Explain the advantages of columnar storage."},
        ],
        temperature=0.2,
    )
    texts = [
        block.text
        for block in (response.message.content or [])
        if getattr(block, "type", None) == "text"
    ]
    print("Response:\n", "".join(texts))


def run_embeddings():
    res = client.embed(
        model="embed-v4.0",
        input_type="search_document",
        texts=["Semantic vector embeddings with Cohere"],
        embedding_types=["float"],
    )
    vectors = res.embeddings.float or []
    print("Embedding dims:", len(vectors[0]) if vectors else 0)


def run_rerank():
    res = client.rerank(
        model="rerank-v4.0-pro",
        query="after-hours motion at dock B",
        documents=[
            "Camera 12 saw a person at 02:14 near dock door B.",
            "HVAC temperature drifted 2C in zone 3.",
        ],
        top_n=2,
    )
    print(res.results)


if __name__ == "__main__":
    run_chat()
