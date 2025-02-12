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

export const teamMembers = [
  {
    name: "Jegede Paul Abiodun",
    linkedin: "https://www.linkedin.com/in/jegede-paul-abiodun",
    position: "Group Chairman",
    image: images.team.team1,
    description:
      "Mr. Abiodun Paul Jegede is the founder of Japaul Group of Companies and the current Chairman of the Board of Directors",
  },
  {
    name: "Ricardo Valls",
    linkedin: "https://www.linkedin.com/in/ricardo-valls",
    position: "Professional Geoscientist – On Contract​",
    image: images.team.team2,
    description:
      "Ricardo Valls is a professional geologist with more than thirty-three years in the mining industry with extensive geological, geochemical, and mining experience, managerial skills, and a solid background in research techniques, and training of technical personnel.",
  },
  {
    name: "Dr. Ludvig Kapllani",
    linkedin: "https://www.linkedin.com/in/ludvig-kapllani",
    position: "Director Operations (on contract)",
    image: images.team.team3,
    description:
      "Dr. Kapllani is the co-founder of Matrix GeoTechnologies Ltd., with over 35 years’ experience in geophysical methodology and research gained over countless assignments spreading across North America, Europe, Africa, Asia, and South America.",
  },
  {
    name: "Genc Kallfa",
    linkedin: "https://www.linkedin.com/in/genc-kallfa",
    position: "Managing Director – Consulting",
    image: images.team.team4,
    description:
      "Mr. Kallfa has utilized his business experience from Switzerland, US, and Canada to develop Matrix GeoTechnologies Ltd into a leader in innovative thinking and solution driven enterprise.",
  },
  {
    name: "Suhununu Mahama Arizini",
    linkedin: "https://www.linkedin.com/in/suhununu-mahama-arizini",
    position: "Director Legal Ghana",
    image: images.team.team5,
    description:
      "Suhununu Maha Arizini is a conscientious and versatile senior corporate administrator who started his legal career about three decades now. His passion for his career has endeared him seek more professional prowess in the business and mining sector.He is a dual citizen of Ghana and the United Kingdom.",
  },
  {
    name: "Ethan Speijer",
    linkedin: "https://www.linkedin.com/in/ethan-speijer",
    position: "General Manager, Commercial",
    image: images.team.team6,
    description:
      "Ethan Speijer has been an International Business Development Manager for more than 5 years",
  },
  {
    name: "Amoo Olukunle Olanrewaju",
    linkedin: "https://www.linkedin.com/in/amoo-olukunle-olanrewaju",
    position: "Consulting Geoscientist",
    image: images.team.team7,
    description:
      "Experienced President with a demonstrated history of working in the mining & metals industry. Skilled in Oil & Gas Exploration, Exploration Management, Geophysics, Export Finance, and Exploration Geologists.",
  },
  {
    name: "Dr. Israel Ovirih",
    linkedin: "https://www.linkedin.com/in/israel-ovirih",
    position: "Finance Consultant",
    image: images.team.team8,
    description:
      "Israel Ovirih founded Banklink Africa Group after over a decade stint with some of Nigerian leading Banks, including Oceanic and GTBank up unto the late 90’s",
  },
  {
    name: "Ethan Speijer",
    linkedin: "https://www.linkedin.com/in/joshua-at",
    position: "Advisor & Top Blockchain Expert",
    image: images.team.team9,
    description:
      "Hamza Khan, Blockchain expert and ico analyst having 5-year experience in the crypto world. And an expert in Stellar Blockchain and worked with many icos and help them reach a successful position in the market.",
  },
  {
    name: "Joshua A.T",
    linkedin: "https://www.linkedin.com/in/joshua-at",
    position: "Business Development Consultant",
    image: images.team.team10,
    description:
      "For six years, Joshua A.T. has worked in various businesses development roles. She holds an MSc in Management Technology another MSc in Digital Innovation Management (in view). She provides consulting services to established companies, particularly those in the technology sector. Her areas of expertise include project management, product development, content production, business negotiations, sales, and brand communications.",
  },
  {
    name: "Victoria Nkong",
    linkedin: "https://www.linkedin.com/in/victoria-nkong",
    position: "Marketing consultant",
    image: images.team.team11,
    description:
      "She is a Multilingual Marketing & Communication Consultant, A Talent Manager, Events/TV Producer, Writer, Public Speaker C.E.O: QTABY EVENTS",
  },
];
