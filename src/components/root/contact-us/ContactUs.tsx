import React from 'react'
import Socials from '../Socials'

export default function ContactUs() {
    return (
        <div className="w-full flex flex-col">
            <div className="container mx-auto space-y-4 py-8 flex justify-between">
                <div className="w-full md:w-1/2 flex flex-col space-y-4 justify-center">
                    <h1 className="text-[72px] font-bold text-[#050706] ">Get in Touch</h1>
                    <p className="text-lg text-[#323232] whitespace-pre-line">
                        {`If you would prefer to chat in real time with 
                        our support team, we are available online every week 
                        day.`}
                    </p>

                    <h2 className="text-[36px] font-bold text-[#050706]">Follow us</h2>

                    <Socials isContactUs={true} />


                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="text-2xl font-bold">Contact Us</h1>
                </div>
            </div>
        </div>
    )
}
