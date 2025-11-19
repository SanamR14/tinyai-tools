import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "TinyAI Tools | Free AI Writing Utilities",
  description: "Free AI tools for rewriting, summarizing, and generating captions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
