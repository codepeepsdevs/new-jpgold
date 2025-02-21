import JpgoldcoinNav from "@/components/user/jpgoldcoin/JpgoldcoinNav";

export default function JpgoldcoinLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-8">
      <JpgoldcoinNav />
      <div className="w-full">{children}</div>
    </div>
  );
}
