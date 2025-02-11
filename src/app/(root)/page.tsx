"use client";
import Elements from "@/components/root/home/Elements";
import Heroarea from "@/components/root/home/Heroarea";
import Jpgold from "@/components/root/home/Jpgold";
import Newsletter from "@/components/root/home/Newsletter";
import Stats from "@/components/root/home/stats/Stats";
import Wcu from "@/components/root/home/Wcu";
import Updates from "@/components/root/home/updates";
import Faqs from "@/components/root/home/Faqs/Faqs";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-16 sm:gap-20 pb-10">
      <Heroarea />
      <Wcu />
      <Jpgold />
      <Elements />
      <Stats />
      <Newsletter />
      <Updates />
      <Faqs />
    </div>
  );
};

export default HomePage;
