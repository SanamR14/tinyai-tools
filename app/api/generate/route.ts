import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
console.log(prompt);
    const completion = await client.chat.completions.create({
      model: "google/gemma-2-9b-it", // ✔ FREE MODEL
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });
console.log(completion.choices[0].message);
    const message = completion.choices[0].message.content;
    return NextResponse.json({ result: message });
  } catch (error: any) {
    console.error("OpenRouter API Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
