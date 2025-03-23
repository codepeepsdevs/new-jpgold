import NftsNav from "@/components/user/nfts/NftsNav";

export default function NftsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="my-nfts" className="flex flex-col gap-8">
      <NftsNav />
      <div className="w-full">{children}</div>
    </div>
  );
}
