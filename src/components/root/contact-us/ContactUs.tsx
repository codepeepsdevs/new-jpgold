"use client";

import React from "react";
import Socials from "../Socials";
import ContactForm from "./ContactForm";
import LocationMap from "./LocationMap";

export default function ContactUs() {
  return (
    <div className="w-full flex flex-col">
      <div className="container w-full flex flex-col items-center py-8 2xs:py-10 sm:py-12">
        <div className="w-[95%] xl:w-[90%] py-8 flex flex-col lg:flex-row gap-6 xl:gap-12 2xl:gap-20 justify-between">
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 xl:gap-10">
            <div className="flex flex-col max-sm:justify-center max-sm:items-center gap-3 xl:gap-5">
              <h1 className="text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-ibold text-[#050706] dark:text-[#D9D9D9]">
                Get in Touch
              </h1>{" "}
              <p className="hidden lg:block w-[80%] lg:w-[90%] text-base xl:text-lg text-[#323232] dark:text-[#BBBBBB] whitespace-pre-line">
                If you would prefer to chat in real time with our support team,
                we are available online every week day.
              </p>
            </div>

            <div className="hidden lg:flex flex-col gap-3 xl:gap-5 ">
              <h2 className="text-3xl xl:text-4xl font-ibold text-[#050706] dark:text-[#D9D9D9]">
                Follow us
              </h2>

              <Socials isContactUs={true} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <ContactForm />
          </div>

          <div className="space-y-4 block lg:hidden">
            <p className="w-full xs:w-[90%] sm:w-[80%] text-base lg:text-lg text-[#323232] dark:text-[#BBBBBB] whitespace-pre-line">
              If you would prefer to chat in real time with our support team, we
              are available online every week day.
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#050706] dark:text-[#D9D9D9]">
              Follow us
            </h2>

            <Socials isContactUs={true} />
          </div>
        </div>
      </div>
      <div className="w-full dark:bg-[#171718] bg-[#F7F7F7] py-5 lg:py-10 my-10">
        <div className="container">
          <div className="w-[95%] xl:w-[90%] mx-auto">
            <LocationMap />
          </div>
        </div>
      </div>
    </div>
  );
}
