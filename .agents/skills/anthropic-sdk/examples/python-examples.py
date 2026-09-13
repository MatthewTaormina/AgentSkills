"""Anthropic Python SDK (anthropic) Reference Implementation."""

import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


# 1. Basic Messages API Call
def run_basic_message():
    message = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="You are a principal database engineer.",
        messages=[
            {
                "role": "user",
                "content": "Compare write amplification in B-Trees versus LSM-Trees.",
            }
        ],
    )
    for block in message.content:
        if block.type == "text":
            print("Response:\n", block.text)


# 2. Real-time Streaming
def run_streaming():
    with client.messages.stream(
        model="claude-haiku-4-5",
        max_tokens=512,
        messages=[{"role": "user", "content": "Explain memory fencing in multi-core CPUs."}],
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
    print()


# 3. Extended Thinking
def run_thinking():
    response = client.messages.create(
        model="claude-3-7-sonnet-20250219",
        max_tokens=8000,
        thinking={"type": "enabled", "budget_tokens": 4000},
        messages=[
            {
                "role": "user",
                "content": "How many words in the English language start with 'un' and end with 'able'?",
            }
        ],
    )
    for block in response.content:
        if block.type == "thinking":
            print("--- THINKING ---")
            print(block.thinking)
        elif block.type == "text":
            print("--- ANSWER ---")
            print(block.text)


# 4. Prompt Caching
def run_prompt_caching():
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system=[
            {
                "type": "text",
                "text": "Enterprise Policy Document: Section 1... " + ("X" * 6000),
                "cache_control": {"type": "ephemeral"},
            }
        ],
        messages=[{"role": "user", "content": "Summarize the key compliance policy."}],
    )
    print("Cache creation tokens:", response.usage.cache_creation_input_tokens)
    print("Cache read tokens:", response.usage.cache_read_input_tokens)


# 5. Token Counting
def run_count_tokens():
    count = client.messages.count_tokens(
        model="claude-sonnet-5",
        messages=[{"role": "user", "content": "Count tokens in this input prompt."}],
    )
    print("Input tokens:", count.input_tokens)


if __name__ == "__main__":
    run_basic_message()
