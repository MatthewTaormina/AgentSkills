"""DeepSeek Reference Implementation (Python).

Official `openai` package with DeepSeek base_url — there is no proprietary SDK.
"""

import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)


def run_chat():
    response = client.chat.completions.create(
        model="deepseek-flash",
        messages=[
            {"role": "system", "content": "You are a software architect."},
            {"role": "user", "content": "Explain the advantages of columnar storage."},
        ],
        extra_body={"thinking": {"type": "disabled"}},
    )
    print("Response:\n", response.choices[0].message.content)


def run_thinking():
    response = client.chat.completions.create(
        model="deepseek-flash",
        messages=[
            {"role": "user", "content": "Design a high-throughput cache invalidation strategy."},
        ],
        extra_body={
            "thinking": {"type": "enabled"},
            "reasoning_effort": "high",
        },
    )
    print("Response:\n", response.choices[0].message.content)


if __name__ == "__main__":
    run_chat()
