"""OpenAI Python SDK (openai v1+) Reference Implementation."""

import os
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


# 1. Responses API (Agentic call with built-in search)
def run_responses():
    response = client.responses.create(
        model="gpt-5.6-terra",
        input="Summarize the latest developments in multimodal AI models.",
        instructions="Provide 3 concise takeaways.",
        tools=[{"type": "web_search_preview"}],
    )
    print("Responses Output:\n", response.output_text)


# 2. Chat Completions
def run_chat():
    completion = client.chat.completions.create(
        model="gpt-5.6-terra",
        messages=[
            {"role": "system", "content": "You are a pragmatic software architect."},
            {"role": "user", "content": "What are the trade-offs of microservices?"},
        ],
        temperature=0.2,
    )
    print("Chat Output:\n", completion.choices[0].message.content)


# 3. Streaming Output
def run_stream():
    stream = client.chat.completions.create(
        model="gpt-5.6-luna",
        messages=[{"role": "user", "content": "Write 2 sentences about asynchronous I/O."}],
        stream=True,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        print(delta, end="", flush=True)
    print()


# 4. Structured Output with Pydantic
class TaskExtraction(BaseModel):
    task: str
    assignee: str
    priority: str


def run_structured():
    completion = client.beta.chat.completions.parse(
        model="gpt-5.6-terra",
        messages=[
            {"role": "user", "content": "Assign the database indexing review to Alex with high priority."}
        ],
        response_format=TaskExtraction,
    )
    parsed = completion.choices[0].message.parsed
    print("Parsed object:", parsed)


# 5. Reasoning Model (o4-mini / o3)
def run_reasoning():
    response = client.chat.completions.create(
        model="o4-mini",
        reasoning_effort="medium",
        messages=[
            {"role": "developer", "content": "You are a math tutor."},
            {"role": "user", "content": "How many primes are between 90 and 100?"},
        ],
    )
    print("Result:", response.choices[0].message.content)


# 6. Embeddings
def run_embeddings():
    res = client.embeddings.create(
        model="text-embedding-3-small",
        input=["Agent Engine SQLite schema", "LanceDB vector store"],
    )
    print("Vector dimensions:", len(res.data[0].embedding))


if __name__ == "__main__":
    run_chat()
