import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SupportButton from "@/components/SupportButton";

export const metadata = {
  title: "TinyAI Tools | Free AI Writing Utilities",
  description:
    "Free AI-powered tools for rewriting, summarizing, and creating Instagram captions in seconds.",
  keywords:
    "AI text rewriter, AI summarizer, Instagram caption generator, AI writing tools",
  openGraph: {
    title: "TinyAI Tools",
    description:
      "Free AI tools for writing, summarizing, and creating captions — fast and easy!",
    url: "https://tinyaitools.vercel.app", // your deployed URL
    siteName: "TinyAI Tools",
    images: [
      {
        url: "https://tinyaitools.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "TinyAI Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <SupportButton />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
