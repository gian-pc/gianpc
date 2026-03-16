import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { LanguageProvider } from "@/features/i18n/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://gianpc.com"),
  title: {
    default: "gianpc | Java Backend Developer",
    template: "%s | gianpc",
  },
  description: "Java Backend Developer especializado en Spring Boot, APIs REST y AWS.",
  keywords: [
    "Java Backend Developer",
    "Spring Boot",
    "APIs REST",
    "AWS",
    "Microservices",
    "Backend Engineer Peru",
  ],
  authors: [{ name: "Gian PC" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "gianpc | Java Backend Developer",
    description: "Portfolio de Java Backend Developer con foco en Spring Boot, APIs REST y AWS.",
    url: "https://gianpc.com",
    siteName: "gianpc.com",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/avatar.png",
        alt: "gianpc - Java Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "gianpc | Java Backend Developer",
    description: "Portfolio de Java Backend Developer con foco en Spring Boot, APIs REST y AWS.",
    images: ["/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
