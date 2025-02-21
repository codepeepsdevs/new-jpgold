import JpgoldnftNav from "@/components/user/jpgoldnft/JpgoldnftNav";

export default function JpgoldnftLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-8">
      <JpgoldnftNav />
      <div className="w-full">{children}</div>
    </div>
  );
}
