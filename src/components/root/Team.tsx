import React from 'react'
import images from '../../../public/images'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FaLinkedin } from 'react-icons/fa'

interface TeamMember {
    name: string;
    position: string;
    linkedin: string;
    image: string | StaticImageData;
    about: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Jegede Paul Abiodun",
        image: images.team.team1,
        linkedin: "https://www.linkedin.com/in/jegede-paul-abiodun-9000000000/",
        position: "Group Chairman",
        about: "Mr. Abiodun Paul Jegede is the founder of Japaul Group of Companies and the current Chairman of the Board of Directors",
    },
    {
        name: "Ricardo Valls",
        image: images.team.team2,
        linkedin: "https://www.linkedin.com/in/ricardo-valls-7000000000/",
        position: "Professional Geoscientist – On Contract​",
        about: "Ricardo Valls is a professional geologist with more than thirty-three years in the mining industry with extensive geological, geochemical, and mining experience, managerial skills, and a solid background in research techniques, and training of technical personnel.",
    },
    {
        name: "Dr. Ludvig Kapllani",
        image: images.team.team3,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Director Operations (on contract)",
        about: "Dr. Kapllani is the co-founder of Matrix GeoTechnologies Ltd., with over 35 years’ experience in geophysical methodology and research gained over countless assignments spreading across North America, Europe, Africa, Asia, and South America.",
    },

    {
        name: "Genc Kallfa",
        image: images.team.team4,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Managing Director – Consulting",
        about: "Mr. Kallfa has utilized his business experience from Switzerland, US, and Canada to develop Matrix GeoTechnologies Ltd into a leader in innovative thinking and solution driven enterprise.",
    },
    {
        name: "Suhununu Mahama Arizini",
        image: images.team.team5,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Director Legal Ghana",
        about: "Suhununu Maha Arizini is a conscientious and versatile senior corporate administrator who started his legal career about three decades now. His passion for his career has endeared him seek more professional prowess in the business and mining sector.He is a dual citizen of Ghana and the United Kingdom.",
    },
    {
        name: "Ethan Speijer",
        image: images.team.team6,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "General Manager, Commercial",
        about: "Ethan Speijer has been an International Business Development Manager for more than 5 years",
    },
    {
        name: "Amoo Olukunle Olanrewaju",
        image: images.team.team7,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Consulting Geoscientist",
        about: "Experienced President with a demonstrated history of working in the mining & metals industry. Skilled in Oil & Gas Exploration, Exploration Management, Geophysics, Export Finance, and Exploration Geologists.",
    },
    {
        name: "Dr. Israel Ovirih",
        image: images.team.team8,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Finance Consultant",
        about: "Israel Ovirih founded Banklink Africa Group after over a decade stint with some of Nigerian leading Banks, including Oceanic and GTBank up unto the late 90’s",
    },
    {
        name: "Hamza Khan",
        image: images.team.team9,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Advisor & Top Blockchain Expert",
        about: "Hamza Khan, Blockchain expert and ico analyst having 5-year experience in the crypto world. And an expert in Stellar Blockchain and worked with many icos and help them reach a successful position in the market.",
    },
    {
        name: "Joshua A.T",
        image: images.team.team10,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Business Development Consultant",
        about: "For six years, Joshua A.T. has worked in various businesses development roles. She holds an MSc in Management Technology another MSc in Digital Innovation Management (in view). She provides consulting services to established companies, particularly those in the technology sector. Her areas of expertise include project management, product development, content production, business negotiations, sales, and brand communications.",
    },
    {
        name: "Victoria Nkong",
        image: images.team.team11,
        linkedin: "https://www.linkedin.com/in/john-doe-0000000000/",
        position: "Marketing consultant",
        about: "She is a Multilingual Marketing & Communication Consultant, A Talent Manager, Events/TV Producer, Writer, Public Speaker C.E.O: QTABY EVENTS",
    },
]

export default function Team() {
    return (
        <div className="md:container mx-auto w-full flex justify-center bg-white dark:bg-bg-700 py-3 relative">
            <div className="container">
                {/* title */}
                <div className='w-full flex flex-col md:flex-row gap-2 text-center md:text-left justify-between items-center py-5'>
                    <h1 className='dark:text-white text-3xl md:text-5xl font-bold text-text-100'>Meet the Team</h1>
                    <p className='dark:text-white/80 text-[#131319] md:w-1/3'>We are committed to developing an outstanding product that not only meets but surpasses the needs and expectations of our users.</p>
                </div>

                {/* Team members grid */}
                <div className='mt-4 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {teamMembers.map((member) => (
                        <TeamMember key={member.name} {...member} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const TeamMember: React.FC<TeamMember> = ({ name, position, image, linkedin, about }) => {
    return (
        <div className='bg-white dark:bg-[#1C1C1E] rounded-lg p-6 shadow-lg border border-gray-100 dark:border-none'>
            <div className='flex flex-col gap-4'>
                {/* Image and LinkedIn */}
                <div className='relative'>
                    <Image
                        src={image}
                        alt={name}
                        width={130}
                        height={130}
                        className='rounded-lg object-cover'
                    />

                </div>

                {/* Text content */}
                <div className='space-y-2'>
                    <div className='flex gap-2 items-center'>
                        <h3 className='text-xl font-bold dark:text-white text-[#050706]'>{name}</h3>
                        {linkedin && (
                            <Link href={linkedin} target="_blank">
                                <FaLinkedin className='text-[#050706] dark:text-white' size={20} />
                            </Link>
                        )}
                    </div>
                    <p className='text-sm text-[#6B6B6B] dark:text-white/80'>{position}</p>
                    <p className='text-sm text-[#3C3C3C] dark:text-white line-clamp-4'>{about}</p>
                </div>
            </div>
        </div>
    );
}