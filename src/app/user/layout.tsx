import Content from "@/components/user/content";
import Sidebar from "@/components/user/sidebar/Sidebar";
import { UserProtectionProvider } from "@/providers/UserProtectionProvider";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProtectionProvider>
      <div className="relative flex w-full h-screen overflow-hidden">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </UserProtectionProvider>
  );
}
