import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "JAPAUL GOLD",
  description:
    "Welcome to JAPAUL GOLD COIN. Explore the intersection of tradition and innovation at JAPAUL GOLD COIN, where the world of gold meets the cutting-edge realm of blockchain technology. Immerse yourself in an exclusive platform where you can buy, sell, and trade digital representations of tangible gold assets. Experience the future of gold ownership with our secure and innovative platform.",
};

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider>
          <ReactQueryProvider>
            <NextTopLoader color="#CC8F00" showSpinner={false} />
            <main className="w-full ">{children}</main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
