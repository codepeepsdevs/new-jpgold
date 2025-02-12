import Heroarea from "@/components/root/about-us/Heroarea";
import Mission from "@/components/root/about-us/Mission";
import Team from "@/components/root/about-us/team/Team";
import TokenDistribution from "@/components/root/about-us/TokenDistribution";
import Newsletter from "@/components/root/home/Newsletter";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col gap-10 sm:gap-12 pb-10">
      <Heroarea />
      <Mission />
      <Team />
      <TokenDistribution />
      <Newsletter />
    </div>
  );
};

export default AboutUsPage;
