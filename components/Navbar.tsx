"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          TinyAI Tools
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/tools/caption" className="hover:text-indigo-600">
            Captions
          </Link>
          <Link href="/tools/rewriter" className="hover:text-indigo-600">
            Rewriter
          </Link>
          <Link href="/tools/summarize" className="hover:text-indigo-600">
            Summarizer
          </Link>
          <Link href="/about" className="hover:text-indigo-600">
            About
          </Link>
        </div>

        <button
          className="md:hidden border rounded px-2 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white border-t">
          <Link
            href="/tools/rewriter"
            className="py-2 w-full text-center hover:bg-gray-100"
          >
            Rewriter
          </Link>
          <Link
            href="/tools/summarize"
            className="py-2 w-full text-center hover:bg-gray-100"
          >
            Summarizer
          </Link>
          <Link
            href="/tools/caption"
            className="py-2 w-full text-center hover:bg-gray-100"
          >
            Captions
          </Link>
          <Link
            href="/about"
            className="py-2 w-full text-center hover:bg-gray-100"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
