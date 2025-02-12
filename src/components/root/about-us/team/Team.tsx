"use client";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { teamMembers } from "@/constants";
import TeamCard from "./TeamCard";
import { FaChevronRight } from "react-icons/fa6";

// const SwiperNavButtons = () => {
//   const swiper = useSwiper();

//   return (
//     <div className="flex gap-4 mt-12">
//       <div
//         className="swiper-button-prev flex justify-center items-center w-10 h-10 rounded-full border-2 border-white text-white text-base cursor-pointer"
//         onClick={() => swiper.slidePrev()}
//       >
//         <FiArrowLeft />
//       </div>
//       <div
//         className="swiper-button-next flex justify-center items-center w-10 h-10 rounded-full border-2 border-white text-white text-base cursor-pointer"
//         onClick={() => swiper.slideNext()}
//       >
//         <FiArrowRight />
//       </div>
//     </div>
//   );
// };

const Team = () => {
  return (
    <div className="w-full">
      <div className="container w-full flex flex-col  gap-6 md:gap-8">
        <div className="xl:mb-2 flex flex-col gap-2.5 sm:gap-4 xl:gap-6">
          <p className="text-[#131319] dark:text-[#D9D9D9] text-lg md:text-xl font-bold">
            Our Team
          </p>
          <h2 className="w-full 2xs:w-[95%] xs:w-[85%] sm:w-[75%] lg:w-[65%] 2xl:w-[60%] text-black dark:text-white font-imedium text-xl md:text-2xl xl:text-3xl ">
            We are committed to developing an outstanding product that not only
            meets but surpasses the needs and expectations of our users.
          </h2>
        </div>

        <Swiper
          autoplay={{
            disableOnInteraction: false,
          }}
          breakpoints={{
            200: {
              slidesPerView: 1.0,
            },
            330: {
              slidesPerView: 1.2,
            },
            480: {
              slidesPerView: 1.5,
            },
            700: {
              slidesPerView: 2.4,
            },
            1000: {
              slidesPerView: 3.0,
            },
            1100: {
              slidesPerView: 3.1,
            },
            1200: {
              slidesPerView: 3.5,
            },
            // 1300: {
            //   slidesPerView: 3.9,
            // },
            // 1400: {
            //   slidesPerView: 4.1,
            // },
          }}
          className="w-full text-white h-full testimonial-swiper"
          modules={[Navigation]}
          slidesPerView={2.2}
          spaceBetween={12}
        >
          {teamMembers.map((item, index) => (
            <SwiperSlide className="" key={index}>
              <TeamCard key={index} {...item} />
            </SwiperSlide>
          ))}

          {/* <SwiperNavButtons /> */}
        </Swiper>
        <button className="text-primary w-full bg-white dark:bg-[#050706]  2xs:w-fit border border-[#00000014] dark:border-white px-8 py-3.5 rounded-full flex items-center max-2xs:justify-center gap-2">
          <p className="font-semibold text-sm">Meet the Team</p>
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Team;
