import { FC } from 'react';
import { socialsLinks } from "@/constants";

interface SocialsProps {
  isContactUs?: boolean;
}

const Socials: FC<SocialsProps> = ({ isContactUs = false }) => {
  return (
    <div className="flex items-center gap-4">
      {socialsLinks.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <item.logo className={`text-base ${isContactUs ? "text-gold-200 xs:text-2xl" : "text-text-200 dark:text-white xs:text-lg"}`} />
        </a>
      ))}
    </div>
  );
};

export default Socials;
