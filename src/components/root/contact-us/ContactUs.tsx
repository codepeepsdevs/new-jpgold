"use client"

import React from 'react'
import Socials from '../Socials'
import ContactForm from './ContactForm'
import LocationMap from './LocationMap'

export default function ContactUs() {
    return (
        <div className="w-full flex flex-col">
            <div className="container mx-auto space-y-4 py-8 flex flex-col md:flex-row gap-10 justify-between">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                    <h1 className="text-[36px] md:text-[72px] font-bold text-[#050706] dark:text-[#D9D9D9]">Get in Touch</h1>
                    <div className='space-y-4 hidden md:block'>
                        <p className="text-base md:text-lg text-[#323232] dark:text-[#BBBBBB] whitespace-pre-line">
                            {`If you would prefer to chat in real time with 
                        our support team, we are available online every week 
                        day.`}
                        </p>

                        <h2 className="text-[26px] md:text-[36px] font-bold text-[#050706] dark:text-[#D9D9D9]">Follow us</h2>

                        <Socials isContactUs={true} />
                    </div>

                </div >
                <div className="w-full md:w-1/2 flex flex-col">
                    <ContactForm />
                </div>


                <div className='space-y-4 block md:hidden'>
                    <p className="text-base md:text-lg text-[#323232] dark:text-[#BBBBBB] whitespace-pre-line">
                        {`If you would prefer to chat in real time with 
                        our support team, we are available online every week 
                        day.`}
                    </p>

                    <h2 className="text-[26px] md:text-[36px] font-bold text-[#050706] dark:text-[#D9D9D9]">Follow us</h2>

                    <Socials isContactUs={true} />
                </div>
            </div >

            <div className="dark:bg-[#171718] bg-[#F7F7F7] py-5 md:py-10 my-10">
                <div className="container mx-auto">
                    <LocationMap />
                </div>
            </div>
        </div >
    )
}
