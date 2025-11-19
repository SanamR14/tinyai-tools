"use client";
import { useState } from "react";

export default function TextRewriter() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Rewrite the following text in a clear and natural way:\n\n${inputText}`,
        }),
      });

      const data = await res.json();
      setOutput(data.result);
    } catch (error) {
      console.error("Error:", error);
      setOutput("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-2">📝 Text Rewriter</h1>
        <p className="text-gray-500 mb-6">
          Paste your text below and let AI rewrite it instantly.
        </p>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-40 p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="Enter your text here..."
        />

        <button
          onClick={handleRewrite}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Rewriting..." : "Rewrite Text"}
        </button>

        {output && (
          <div className="mt-6 text-left border-t pt-4">
            <h2 className="font-semibold mb-2">✨ Rewritten Output:</h2>
            <div className="relative">
              <p className="bg-gray-50 border rounded-md p-3 text-gray-800 whitespace-pre-line">
                {output}
              </p>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
