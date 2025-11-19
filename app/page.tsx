import SupportButton from "@/components/SupportButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-indigo-600">
        ✨ TinyAI Tools ✨
      </h1>
      <p className="text-gray-600 mb-6 max-w-lg">
        Free AI-powered tools to rewrite, summarize, generate captions, and
        create trending hashtags instantly.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/tools/caption"
          className="border rounded-lg p-4 w-48 hover:bg-indigo-50 hover:shadow-md transition"
        >
          📸 Caption Generator
        </Link>
        <Link
          href="/tools/hashtags"
          className="border rounded-lg p-4 w-48 hover:bg-indigo-50 hover:shadow-md transition"
        >
          🏷️ Hashtag Generator
        </Link>
        <Link
          href="/tools/rewriter"
          className="border rounded-lg p-4 w-48 hover:bg-indigo-50 hover:shadow-md transition"
        >
          ✍️ Text Rewriter
        </Link>
        <Link
          href="/tools/summarize"
          className="border rounded-lg p-4 w-48 hover:bg-indigo-50 hover:shadow-md transition"
        >
          📄 Summarizer
        </Link>
      </div>

      <div className="mt-8">
        <SupportButton />
      </div>
    </main>
  );
}
