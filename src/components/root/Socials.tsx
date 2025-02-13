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
          <item.logo className={`text-base xs:text-lg dark:text-white ${isContactUs ? "text-gold-200" : "text-text-200"}`} />
        </a>
      ))}
    </div>
  );
};

export default Socials;
