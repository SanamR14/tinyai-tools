"use client";
import { useState } from "react";

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [vibe, setVibe] = useState("funny");
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setCaptions([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate 5 creative Instagram captions about "${topic}" in a ${vibe} tone. Each caption should be short, engaging, and unique.`,
        }),
      });

      const data = await res.json();
      // const lines = data.result
      //   .split("\n")
      //   .filter((l: string) => l.trim() && !/^\d/.test(l.trim()));
      // setCaptions(lines);
      const text = data.result || "";

      const lines = text
        .split("\n")
        .map((l: string) =>
          l
            .trim()
            // remove numbering/bullets
            .replace(/^(\d+\.\s*|\d+\)\s*|[-*•]\s*)/, "")
        )
        // keep only real caption lines (remove blank & intro/outro)
        .filter(
          (l: string) =>
            l.length > 5 && // avoid super short junk like “1.”
            !l.toLowerCase().includes("here are") &&
            !l.toLowerCase().includes("let me know")
        )
        .slice(0, 5); // ensure exactly 5 captions

      setCaptions(lines);
    } catch (error) {
      console.error("Error:", error);
      setCaptions(["⚠️ Something went wrong. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Caption copied!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-2">
          📸 Instagram Caption Generator
        </h1>
        <p className="text-gray-500 mb-6">
          Describe your post and pick a vibe — AI will craft catchy captions for
          you.
        </p>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="e.g., beach vacation, morning coffee, gym workout..."
        />

        <select
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="funny">😂 Funny</option>
          <option value="romantic">💖 Romantic</option>
          <option value="motivational">💪 Motivational</option>
          <option value="aesthetic">🌅 Aesthetic</option>
          <option value="cool">😎 Cool</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Captions"}
        </button>

        {captions.length > 0 && (
          <div className="mt-6 text-left border-t pt-4">
            <h2 className="font-semibold mb-2">✨ Your Captions:</h2>
            <ul className="space-y-3">
              {captions.map((caption, idx) => (
                <li
                  key={idx}
                  className="relative bg-gray-50 border rounded-md p-3 text-gray-800"
                >
                  {caption}
                  <button
                    onClick={() => handleCopy(caption)}
                    className="absolute top-2 right-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
