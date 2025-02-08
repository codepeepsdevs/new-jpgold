import { socialsLinks } from "@/constants";

const Socials = () => {
  return (
    <div className="flex items-center gap-4">
      {socialsLinks.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <item.logo className="text-base xs:text-lg text-text-200 dark:text-white" />
        </a>
      ))}
    </div>
  );
};

export default Socials;
