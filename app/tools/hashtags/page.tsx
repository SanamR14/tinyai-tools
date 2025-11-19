"use client";
import SupportButton from "@/components/SupportButton";
import { useState } from "react";

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setHashtags([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate 14 relevant, trendy, and creative hashtags for a social media post about "${topic}". Return them as a comma-separated list.`,
        }),
      });

      const data = await res.json();
      const tags = data.result
        .split(",")
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0);
      setHashtags(tags);
    } catch (error) {
      console.error("Error:", error);
      setHashtags(["⚠️ Something went wrong. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-2">
          🏷️ Social Media Hashtag Generator
        </h1>
        <p className="text-gray-500 mb-6">
          Enter your post topic and get 14 trending hashtags instantly.
        </p>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="e.g., travel, fitness, coffee..."
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Hashtags"}
        </button>

        {hashtags.length > 0 && (
          <div className="mt-6 text-left border-t pt-4">
            <h2 className="font-semibold mb-2">✨ Hashtags:</h2>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-50 border px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCopy(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <SupportButton />
      </div>
    </main>
  );
}
