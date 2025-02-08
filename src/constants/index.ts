import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill, RiTelegram2Fill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

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
