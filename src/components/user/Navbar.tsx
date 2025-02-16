"use client";
import { FiMenu } from "react-icons/fi";
import useUserStore from "@/store/user.store";
import useUserLayoutStore from "@/store/userLayout.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import images from "@/public/images";

const Navbar = () => {
  const { user } = useUserStore();
  const { toggleMenu } = useUserLayoutStore();
  const pathname = usePathname();

  const HeadingData = [
    {
      id: 1,
      title: "Dashboard",
      path: "/user/dashboard",
    },
    {
      id: 2,
      title: "JPGold Coin",
      path: "/user/jpgoldcoin",
    },
    {
      id: 3,
      title: "JPGold NFT",
      path: "/user/jpgoldnft",
    },

    {
      id: 4,
      title: "Bridge",
      path: "/user/bridge",
    },
    {
      id: 5,
      title: "Marketplace",
      path: "/user/marketplace",
    },

    {
      id: 6,
      title: "Transactions",
      path: "/user/transactions",
    },

    {
      id: 7,
      title: "Games",
      path: "/user/games",
    },

    {
      id: 8,
      title: "My NFTs",
      path: "/user/nfts",
    },

    {
      id: 9,
      title: "Profile",
      path: "/user/profile",
    },
  ];

  const Heading = HeadingData.sort(
    (a, b) => b.path.length - a.path.length
  ).find((item) => {
    if (Array.isArray(item.path)) {
      return item.path.includes(pathname);
    }
    return pathname.startsWith(item.path); // Match paths with dynamic segments
  });

  return (
    <div
      style={{
        boxShadow: "0px 1.5px 3px -1.5px #0000001A",
      }}
      className="w-full z-40 xs:z-50 sticky top-0 flex justify-between items-center  gap-2 bg-white dark:bg-[#0E0E0E] px-4 lg:px-8 py-5"
    >
      <div className="flex items-center gap-6">
        <div
          onClick={toggleMenu}
          className="flex lg:hidden justify-center items-center text-[#1C1B1F] dark:text-white text-center text-3xl"
        >
          <FiMenu />
        </div>
        <h1 className="max-sm:hidden text-2xl xl:text-3xl font-ibold text-[#282828] dark:text-white">
          {Heading?.title}
        </h1>
      </div>

      <div className="flex text-sm items-center space-x-4">
        <button
          onClick={() => {}}
          className="px-6 py-2.5 text-center rounded-full  text-[#0C0C0C] dark:text-white border border-black dark:border-white"
        >
          Connect Wallet
        </button>
        <div className="h-10 w-[1px] bg-[#EAEAEA] dark:bg-[#3D3D3D]"></div>

        <Link
          href="/user/profile"
          className="relative uppercase flex justify-center items-center rounded-full bg-[#356505] w-10 xs:w-12 h-10 xs:h-12 text-center text-white text-base font-semibold"
        >
          {user ? (
            user?.profileImage ? (
              <Image
                src={user?.profileImage}
                alt="profile"
                fill
                objectFit="cover"
                className="w-fit h-fit rounded-full"
              />
            ) : (
              <p> {user?.fullname.slice(0, 2)}</p>
            )
          ) : (
            <Image
              src={images.user.avatar}
              alt="avatar"
              fill
              objectFit="cover"
              className="w-fit h-fit rounded-full"
            />
          )}{" "}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
