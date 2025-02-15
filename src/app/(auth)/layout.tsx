export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full no-scrollbar">{children}</main>;
}
