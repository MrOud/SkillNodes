import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const rubic = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillNodes",
  description: "Learn. Share. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubic.className}>
        <main className="w-full h-full gradient overflow-hidden">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
