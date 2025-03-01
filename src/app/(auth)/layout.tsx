import Copyright from "@/components/root/Copyright";
import Footer from "@/components/root/Footer";
import { AuthProtectionProvider } from "@/providers/AuthProtectionProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProtectionProvider>
      <main className="w-full no-scrollbar">
        <div> {children}</div>
        <Footer />
        <Copyright />
      </main>
    </AuthProtectionProvider>
  );
}
