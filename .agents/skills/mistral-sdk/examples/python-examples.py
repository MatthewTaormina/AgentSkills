"""Mistral AI Reference Implementation (Python).

Using official `mistralai` SDK or OpenAI-compatible client.
"""

import os
from mistralai import Mistral

client = Mistral(api_key=os.environ.get("MISTRAL_API_KEY"))


# 1. Chat Completion with Mistral Large 3
def run_chat():
    response = client.chat.complete(
        model="mistral-large-latest",
        messages=[
            {"role": "system", "content": "You are a software architect."},
            {"role": "user", "content": "Explain the advantages of columnar storage."},
        ],
        temperature=0.2,
    )
    print("Response:\n", response.choices[0].message.content)


# 2. Codestral Fill-in-the-Middle (FIM)
def run_codestral_fim():
    response = client.fim.complete(
        model="codestral-latest",
        prompt="def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n",
        suffix="\n    return quicksort(left) + middle + quicksort(right)\n",
    )
    print("FIM Generated Code:\n", response.choices[0].message.content)


# 3. Vector Embeddings
def run_embeddings():
    res = client.embeddings.create(
        model="mistral-embed",
        inputs=["Semantic vector embeddings with Mistral"],
    )
    print("Embedding dims:", len(res.data[0].embedding))


if __name__ == "__main__":
    run_chat()
