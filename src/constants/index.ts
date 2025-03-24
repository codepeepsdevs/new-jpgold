import { FaFacebookSquare } from "react-icons/fa";
import {
  RiInstagramFill,
  RiNftFill,
  RiNftLine,
  RiTelegram2Fill,
} from "react-icons/ri";
import {
  IoExtensionPuzzleOutline,
  IoExtensionPuzzleSharp,
  IoList,
  IoLogoLinkedin,
  IoLogOut,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaCircleUser, FaRegCircleUser, FaXTwitter } from "react-icons/fa6";
import images from "../../public/images";
import { TeamMemberProps } from "./types";
import {
  MdDashboard,
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineSwapHorizontalCircle,
  MdShoppingCart,
  MdSwapHorizontalCircle,
} from "react-icons/md";
import { HiCircleStack, HiOutlineCircleStack } from "react-icons/hi2";
import { TbHexagonLetterN, TbHexagonLetterNFilled } from "react-icons/tb";
import {
  METAL_PRICE_BASES,
  METAL_PRICE_UNITS,
} from "@/api/metal-price/metal-price.types";

export const dynamicFrontendUrl =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "";

export const navItems = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About Us", path: "/about-us" },
  { id: 3, title: "Market Place", path: "/marketplace" },
  { id: 4, title: "Blog", path: "/blog" },
  { id: 4, title: "Bridge", path: "/bridge" },
  { id: 3, title: "Contact Us", path: "/contact-us" },
];

export const socialsLinks = [
  {
    id: 1,
    logo: FaFacebookSquare,
    link: "https://www.facebook.com/JPGCofficial",
  },
  { id: 2, logo: RiInstagramFill, link: "https://instagram.com/jpgoldcoin" },
  {
    id: 3,
    logo: IoLogoLinkedin,
    link: "https://www.linkedin.com/company/japaulgold",
  },
  { id: 4, logo: FaXTwitter, link: "https://twitter.com/jpgoldcoin" },
  { id: 5, logo: RiTelegram2Fill, link: "https://t.me/officialjpgoldcoin" },
  // { id: 6, logo: FaDiscord, link: "/" },
];

export const footerLinks = [
  {
    title: "Company",
    links: [
      {
        id: 1,
        title: "About Us",
        type: "internal",
        path: "/about-us",
      },

      {
        id: 3,
        title: "Career",
        type: "external",
        path: "https://blog.jpgoldcoin.app/sort/blog/category/jobs/1",
      },
      {
        id: 4,
        title: "Our Team",
        type: "internal",
        path: "/team",
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        id: 1,
        title: "Home",
        type: "internal",
        path: "/",
      },
      {
        id: 2,
        title: "Marketplace",
        type: "internal",
        path: "/marketplace",
      },
      {
        id: 3,
        title: "Dashboard",
        type: "internal",
        path: "/user/dashboard",
      },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        id: 1,
        title: "support@jpgoldcoin.app",
        type: "external",
        path: "mailto:contact@support@jpgoldcoin.app",
      },
      {
        id: 2,
        title: "+234 802 897 3881",
        type: "external",
        path: "tel:+2348028973881",
      },
      {
        id: 3,
        title: "+234 802 616 9018",
        type: "external",
        path: "tel:+2348026169018",
      },
    ],
  },
];

export const blogData = [
  {
    id: 1,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog1,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 2,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog2,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 3,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog3,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 4,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog4,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 5,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog5,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 6,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog6,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 7,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog7,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 8,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog8,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
];

export const teamMembers: TeamMemberProps[] = [
  {
    name: "Jegede Paul Abiodun",
    image: images.team.team1,
    linkedin: "https://www.linkedin.com/in/jegede-paul-abiodun-9000000000/",
    position: "Group Chairman",
    about:
      "Mr. Abiodun Paul Jegede is the founder of Japaul Group of Companies and the current Chairman of the Board of Directors",
  },
  {
    name: "Ricardo Valls",
    image: images.team.team2,
    linkedin: "https://www.linkedin.com/in/ricardo-valls-7000000000/",
    position: "Professional Geoscientist – On Contract​",
    about:
      "Ricardo Valls is a professional geologist with more than thirty-three years in the mining industry with extensive geological, geochemical, and mining experience, managerial skills, and a solid background in research techniques, and training of technical personnel.",
  },
  {
    name: "Dr. Ludvig Kapllani",
    image: images.team.team3,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Director Operations (on contract)",
    about:
      "Dr. Kapllani is the co-founder of Matrix GeoTechnologies Ltd., with over 35 years’ experience in geophysical methodology and research gained over countless assignments spreading across North America, Europe, Africa, Asia, and South America.",
  },

  {
    name: "Genc Kallfa",
    image: images.team.team4,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Managing Director – Consulting",
    about:
      "Mr. Kallfa has utilized his business experience from Switzerland, US, and Canada to develop Matrix GeoTechnologies Ltd into a leader in innovative thinking and solution driven enterprise.",
  },
  {
    name: "Suhununu Mahama Arizini",
    image: images.team.team5,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Director Legal Ghana",
    about:
      "Suhununu Maha Arizini is a conscientious and versatile senior corporate administrator who started his legal career about three decades now. His passion for his career has endeared him seek more professional prowess in the business and mining sector.He is a dual citizen of Ghana and the United Kingdom.",
  },
  {
    name: "Ethan Speijer",
    image: images.team.team6,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "General Manager, Commercial",
    about:
      "Ethan Speijer has been an International Business Development Manager for more than 5 years",
  },
  {
    name: "Amoo Olukunle Olanrewaju",
    image: images.team.team7,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Consulting Geoscientist",
    about:
      "Experienced President with a demonstrated history of working in the mining & metals industry. Skilled in Oil & Gas Exploration, Exploration Management, Geophysics, Export Finance, and Exploration Geologists.",
  },
  {
    name: "Dr. Israel Ovirih",
    image: images.team.team8,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Finance Consultant",
    about:
      "Israel Ovirih founded Banklink Africa Group after over a decade stint with some of Nigerian leading Banks, including Oceanic and GTBank up unto the late 90’s",
  },
  {
    name: "Hamza Khan",
    image: images.team.team9,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Advisor & Top Blockchain Expert",
    about:
      "Hamza Khan, Blockchain expert and ico analyst having 5-year experience in the crypto world. And an expert in Stellar Blockchain and worked with many icos and help them reach a successful position in the market.",
  },
  {
    name: "Joshua A.T",
    image: images.team.team10,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Business Development Consultant",
    about:
      "For six years, Joshua A.T. has worked in various businesses development roles. She holds an MSc in Management Technology another MSc in Digital Innovation Management (in view). She provides consulting services to established companies, particularly those in the technology sector. Her areas of expertise include project management, product development, content production, business negotiations, sales, and brand communications.",
  },
  {
    name: "Victoria Nkong",
    image: images.team.team11,
    linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
    position: "Marketing consultant",
    about:
      "She is a Multilingual Marketing & Communication Consultant, A Talent Manager, Events/TV Producer, Writer, Public Speaker C.E.O: QTABY EVENTS",
  },
];

export const SidebarData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/user/dashboard",
    icon: MdOutlineDashboard,
    iconActive: MdDashboard,
  },
  {
    id: 2,
    title: "JPGold Coin",
    path: "/user/jpgoldcoin/swap",
    icon: HiOutlineCircleStack,
    iconActive: HiCircleStack,
  },
  {
    id: 3,
    title: "JPGold NFT",
    path: "/user/jpgoldnft/buy",
    icon: RiNftLine,
    iconActive: RiNftFill,
  },

  {
    id: 4,
    title: "Bridge",
    path: "/bridge",
    icon: MdOutlineSwapHorizontalCircle,
    iconActive: MdSwapHorizontalCircle,
  },
  {
    id: 5,
    title: "Marketplace",
    path: "/marketplace",
    icon: MdOutlineShoppingCart,
    iconActive: MdShoppingCart,
  },

  {
    id: 6,
    title: "Transactions",
    path: "/user/transactions",
    icon: IoList,
    iconActive: IoList,
  },

  {
    id: 7,
    title: "Games",
    path: "/user/games",
    icon: IoExtensionPuzzleOutline,
    iconActive: IoExtensionPuzzleSharp,
  },

  {
    id: 8,
    title: "My NFTs",
    path: "/user/nfts/private",
    icon: TbHexagonLetterN,
    iconActive: TbHexagonLetterNFilled,
  },

  {
    id: 9,
    title: "Profile",
    path: "/user/profile",
    icon: FaRegCircleUser,
    iconActive: FaCircleUser,
  },
  {
    id: 10,
    title: "Logout",
    path: "/logout",
    icon: IoLogOutOutline,
    iconActive: IoLogOut,
  },
];

export const HeadingData = [
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

export const metal_price_bases = [
  {
    value: METAL_PRICE_BASES.USD,
    label: "USD",
    symbol: "$",
  },
  {
    value: METAL_PRICE_BASES.NGN,
    label: "NGN",
    symbol: "₦",
  },
  {
    value: METAL_PRICE_BASES.EUR,
    label: "EUR",
    symbol: "€",
  },
  {
    value: METAL_PRICE_BASES.GBP,
    label: "GBP",
    symbol: "£",
  },
  {
    value: METAL_PRICE_BASES.JPY,
    label: "JPY",
    symbol: "¥",
  },
  {
    value: METAL_PRICE_BASES.CAD,
    label: "CAD",
    symbol: "$",
  },
  {
    value: METAL_PRICE_BASES.AUD,
    label: "AUD",
    symbol: "$",
  },
  {
    value: METAL_PRICE_BASES.CNY,
    label: "CNY",
    symbol: "¥",
  },
  {
    value: METAL_PRICE_BASES.INR,
    label: "INR",
    symbol: "₹",
  },
  {
    value: METAL_PRICE_BASES.CHF,
    label: "CHF",
    symbol: "₣",
  },
];

export const metal_price_units = [
  {
    value: METAL_PRICE_UNITS.TROY_OUNCE,
    label: "TROY OUNCE",
  },
  {
    value: METAL_PRICE_UNITS.GRAM,
    label: "GRAM",
  },
  {
    value: METAL_PRICE_UNITS.KILOGRAM,
    label: "KILOGRAM",
  },
];
