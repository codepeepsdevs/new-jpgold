export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full">{children}</main>;
}
