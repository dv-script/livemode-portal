import type { Metadata } from "next";
import Head from "next/head";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NextUiProvider } from "@/providers/next-ui";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Livemode Portal",
  description: "Livemode Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.png" />
      </Head>
      <body className={`${poppins.className}`}>
        <NextUiProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextUiProvider>
      </body>
    </html>
  );
}
