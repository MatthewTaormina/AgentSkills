"""Google Gen AI SDK (google-genai) Reference Implementation for Python."""

import os
from google import genai
from google.genai import types
from pydantic import BaseModel

# Initialize Client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))


# 1. Basic Content Generation
def run_generate():
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents="Explain quantum superposition simply.",
        config=types.GenerateContentConfig(
            temperature=0.2,
            system_instruction="You are an expert physics tutor.",
        ),
    )
    print("Response:", response.text)


# 2. Streaming Generation
def run_streaming():
    response = client.models.generate_content_stream(
        model="gemini-3.8-flash",
        contents="Write a 4-line poem on compiler design.",
    )
    for chunk in response:
        print(chunk.text, end="", flush=True)
    print()


# 3. Multi-turn Chat
def run_chat():
    chat = client.chats.create(
        model="gemini-3.8-flash",
        config=types.GenerateContentConfig(
            system_instruction="You are a polite receptionist.",
        ),
    )
    turn1 = chat.send_message("Hello, I have an appointment at 2 PM.")
    print("Turn 1:", turn1.text)

    turn2 = chat.send_message("Where should I wait?")
    print("Turn 2:", turn2.text)


# 4. Structured Output with Pydantic
class ProductExtraction(BaseModel):
    name: str
    price: float
    category: str


def run_structured():
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents="Logitech MX Master 3S Wireless Mouse, Price: $99.99, Category: Electronics",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ProductExtraction,
        ),
    )
    print("Extracted JSON:", response.text)


# 5. Extended Thinking
def run_thinking():
    response = client.models.generate_content(
        model="gemini-3.1-pro",
        contents="Solve: If a bat and ball cost $1.10 and the bat costs $1.00 more than the ball, how much does the ball cost?",
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(
                thinking_budget=2048,
                include_thoughts=True,
            )
        ),
    )
    print("Answer:", response.text)


if __name__ == "__main__":
    run_generate()
