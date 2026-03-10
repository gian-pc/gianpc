import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gian PC — Backend Engineer",
  description: "Backend Engineer especializado en Java, Spring Boot y AWS Serverless.",
  keywords: ["Java", "Backend", "AWS", "Spring Boot", "Next.js"],
  authors: [{ name: "Gian PC" }],
  openGraph: {
    title: "Gian PC — Backend Engineer",
    description: "Backend Engineer especializado en Java, Spring Boot y AWS Serverless.",
    url: "https://gianpc.com",
    siteName: "gianpc.com",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
