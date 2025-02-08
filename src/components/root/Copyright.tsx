import Link from "next/link";

const Copyright = () => {
  return (
    <div className="w-full flex justify-center bg-bg-300 py-7 sm:py-8 relative">
      <div className="container flex max-3xs:gap-2 max-sm:gap-3 max-sm:flex-col justify-center sm:justify-between max-sm:items-center text-xs 3xs:text-sm md:text-base text-text-300">
        <p>© {new Date().getFullYear()} Japaul Ltd. All rights reserved.</p>
        <div className="flex items-center gap-3 lg:gap-4">
          <Link href="terms-condition">Terms & Conditions</Link>
          <Link href="disclaimer">Disclaimer</Link>
          <Link href="privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
