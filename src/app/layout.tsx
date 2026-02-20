import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans, Bruno_Ace_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";
import NavItems from "@/components/global/nav/nav-items";
import NextTopLoader from "nextjs-toploader";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const brunoAceSc = Bruno_Ace_SC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bruno-ace-sc",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TheShowbiz",
    default: "TheShowbiz",
  },
  description:
    "A fast, feature-rich TV and movie discovery platform powered by TMDB. Browse detailed show and film information, cast profiles, trailers, ratings, and personalized watchlists with a clean, responsive interface.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} page-layout antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="var(--color-primary)" />
          <Header />
          <aside>
            <NavItems />
          </aside>
          <main>{children}</main>
          <Footer />
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
