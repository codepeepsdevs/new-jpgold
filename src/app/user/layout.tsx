import { AuthenticationProvider } from "@/providers/AuthenticationProvider";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
}
