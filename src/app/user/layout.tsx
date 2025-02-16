import Content from "@/components/user/content";
import Sidebar from "@/components/user/sidebar/Sidebar";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex w-full h-screen overflow-hidden">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}
