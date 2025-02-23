import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import AppWalletProvider from "@/providers/AppWalletProvider";

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
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AppWalletProvider>
            <ReactQueryProvider>
              <UserProvider>
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  toastOptions={{
                    style: {
                      border: "1px solid #E4E7EC",
                      borderRadius: 15,
                      padding: "16px",
                      color: "#000",
                      fontSize: 15,
                      fontWeight: 400,
                    },
                    duration: 1000,
                  }}
                />
                <NextTopLoader color="#CC8F00" showSpinner={false} />
                <main className="w-full no-scrollbar">{children}</main>
              </UserProvider>
            </ReactQueryProvider>
          </AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
