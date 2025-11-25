import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Genuine Solutions - Premier Recruitment & Visa Services in Australia",
  description: "Expert recruitment and visa consultancy services in Australia. Specializing in talent acquisition, CV preparation, 407 Visa Training Plans, Labour Market Testing, and more. Trusted by 100+ clients.",
  keywords: ["recruitment Australia", "visa services", "407 visa", "labour market testing", "CV preparation", "talent acquisition"],
  authors: [{ name: "Genuine Solutions" }],
  creator: "Genuine Solutions",
  publisher: "Genuine Solutions",
  metadataBase: new URL("https://genuinesolutions.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://genuinesolutions.com.au",
    siteName: "Genuine Solutions",
    title: "Genuine Solutions - Premier Recruitment & Visa Services",
    description: "Expert recruitment and visa consultancy services in Australia. Trusted by 100+ clients with 5+ years of combined expertise.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Genuine Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GenuineSolAU",
    creator: "@GenuineSolAU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </div>
          </SmoothScrollProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
