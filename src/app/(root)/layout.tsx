import Copyright from "@/components/root/Copyright";
import Footer from "@/components/root/Footer";
import Navbar from "@/components/root/Navbar";
import Tickerbar from "@/components/root/Tickerbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-bg-700">
      <header className="sticky top-0 z-50 ">
        <Navbar />
        <Tickerbar />
      </header>
      <main className="flex-grow overflow-hidden">{children}</main>
      <div className="flex flex-col">
        <Footer />
        <Copyright />
      </div>
    </div>
  );
}
