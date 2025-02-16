import { FC } from "react";
import { socialsLinks } from "@/constants";

interface SocialsProps {
  isContactUs?: boolean;
}

const Socials: FC<SocialsProps> = ({ isContactUs = false }) => {
  return (
    <div
      className={`${
        isContactUs ? "w-full gap-8" : "w-fit gap-4"
      } flex items-center `}
    >
      {socialsLinks.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isContactUs ? "" : ""}`}
        >
          <item.logo
            className={` ${
              isContactUs
                ? "text-gold-200 text-2xl xs:text-2xl"
                : "text-text-200 dark:text-white text-base xs:text-lg"
            }`}
          />
        </a>
      ))}
    </div>
  );
};

export default Socials;
