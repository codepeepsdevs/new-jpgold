import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill, RiTelegram2Fill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import images from "../../public/images";

export const navItems = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About Us", path: "/about-us" },
  { id: 3, title: "Market Place", path: "/marketplace" },
  { id: 4, title: "Blog", path: "/blog" },
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
        id: 2,
        title: "Blog",
        type: "internal",
        path: "/blog",
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
