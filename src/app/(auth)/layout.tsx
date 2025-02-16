import Copyright from "@/components/root/Copyright";
import Footer from "@/components/root/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full no-scrollbar">
      <div> {children}</div>
      <Footer />
      <Copyright />
    </main>
  );
}
