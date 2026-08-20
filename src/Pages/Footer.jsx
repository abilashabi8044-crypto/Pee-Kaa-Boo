import React from 'react';
import footerLogo from '../assets/Footer/PEEKAABOO (2) 4.png';
import footerBunny from '../assets/Footer/e8fdcf6a0b0fb107418a8d2fa9ec6697fa9cb054.png';
import footerBg from '../assets/Footer/footer-bg.png';
import fb from '../assets/Footer/fb.png';
import insta from '../assets/Footer/ig.png';
import twitter from '../assets/Footer/x.png';
import youtube from '../assets/Footer/yt.png';
import pinterest from '../assets/Footer/pt.png';
import visa from '../assets/Footer/visa.png';
import mastercard from '../assets/Footer/ms-card.png';
import paytm from '../assets/Footer/paytm.png';

export default function Footer() {
    return (
        <footer
            className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 relative mt-16 font-['Baloo_2'] bg-cover bg-top bg-no-repeat overflow-hidden"
            style={{ backgroundImage: `url(${footerBg})` }}
        >
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-8 md:pb-12 relative z-10">

                    {/* Column 1: Logo & Socials (Left Column on desktop) */}
                    <div className="lg:col-span-3 flex flex-col items-start">
                        <img
                            src={footerBunny}
                            alt="PEE KAA BOO"
                            className="w-[100px] sm:w-[150px] lg:w-[185px] lg:-ml-[128px] h-auto mt-[40px] object-contain mb-5 lg:mb-6"
                        />

                        <h4 className="text-gray-900 font-['Baloo_2'] font-black text-[24px] lg:text-[26px] lg:-ml-[128px] mb-3 uppercase tracking-wider">
                            Follow Us
                        </h4>
                        <div className="flex items-center gap-3 lg:-ml-[128px]">
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] hover:scale-105 transition-all shadow-xs">
                                <img src={fb} alt="facebook" className='w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain' />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] hover:scale-105 transition-all shadow-xs">
                                <img src={insta} alt="instagram" className='w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain' />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] hover:scale-105 transition-all shadow-xs">
                                <img src={twitter} alt="twitter" className='w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain' />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] hover:scale-105 transition-all shadow-xs">
                                <img src={youtube} alt="youtube" className='w-5 h-3.5 sm:w-5.5 sm:h-4 object-contain' />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] hover:scale-105 transition-all shadow-xs">
                                <img src={pinterest} alt="pinterest" className='w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain' />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: About Us */}
                    <div className="lg:col-span-3 flex flex-col items-start pt-1 md:pt-2 lg:ml-[40px]">
                        <h4 className="text-gray-900 font-black text-[24px] sm:text-[18px] lg:text-[26px] mb-2.5 lg:mb-3.5 uppercase tracking-wider whitespace-nowrap">
                            About Us
                        </h4>
                        <ul className="flex flex-col gap-1.5 sm:gap-2 lg:gap-2.5 text-gray-700 font-bold text-[18px] sm:text-[18px] lg:text-[20px] xl:text-[22px]">
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">About our company</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Privacy Policy</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Terms and Conditions</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">FAQ</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Testimonials</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Offers</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Why Us */}
                    <div className="lg:col-span-3 flex flex-col items-start pt-1 md:pt-2 lg:ml-[40px]">
                        <h4 className="text-gray-900 font-black text-[24px] sm:text-[18px] lg:text-[26px] mb-2.5 lg:mb-3.5 uppercase tracking-wider whitespace-nowrap">
                            Why Us ?
                        </h4>
                        <ul className="flex flex-col gap-1.5 sm:gap-2 lg:gap-2.5 text-gray-700 font-bold text-[18px] sm:text-[18px] lg:text-[20px] xl:text-[22px]">
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Return Policy</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Privacy Policy</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Cancel and Refund</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Certified Jewellery</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">DGRP</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Jewellery Guides + Bunny Illustration */}
                    <div className="lg:col-span-3 flex flex-col items-start pt-1 md:pt-2 relative min-h-[220px] lg:ml-[40px]">
                        <h4 className="text-gray-900 font-black text-[24px] sm:text-[18px] lg:text-[26px] mb-2.5 lg:mb-3.5 uppercase tracking-wider whitespace-nowrap">
                            Jewellery Guides
                        </h4>
                        <ul className="flex flex-col gap-1.5 sm:gap-2 lg:gap-2.5 text-gray-700 font-bold text-[18px] sm:text-[18px] lg:text-[20px] xl:text-[22px] mb-4 md:mb-0">
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Lorem Ipsum</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Lorem Ipsum</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Lorem Ipsum</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Lorem Ipsum</a></li>
                            <li className="whitespace-nowrap"><a href="#" className="hover:text-[#F96E8F] transition-colors whitespace-nowrap">Lorem Ipsum</a></li>
                        </ul>

                        {/* Bunny Character Illustration (Bottom Right resting on the divider line) */}
                        <img
                            src={footerLogo}
                            alt="Bunny Illustration"
                            className="absolute right-0 sm:right-2 lg:-mr-[128px] bottom-0 lg:-bottom-[70px] w-[110px] sm:w-[130px] lg:w-[165px] object-contain pointer-events-none z-20"
                        />
                    </div>

                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-300/80 my-4 md:my-6 lg:-ml-[128px] lg:-mr-[128px]"></div>

                {/* Bottom Bar: Copyright on Left, We Accept on Right */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:-ml-[128px] lg:-mr-[128px] relative z-10 pb-2">
                    {/* Copyright (Left on desktop, bottom on mobile) */}
                    <p className="text-gray-900 text-[20px] sm:text-[15px] font-extrabold text-center md:text-left order-2 md:order-1">
                        © 2026 PEE KAA BOO All Rights Reserved.
                    </p>

                    {/* We Accept (Right on desktop, top on mobile) */}
                    <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5 w-full md:w-auto order-1 md:order-2">
                        <span className="text-gray-900 font-black text-[20px] sm:text-[17px] uppercase tracking-wider whitespace-nowrap">
                            We Accept
                        </span>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <img src={visa} alt="visa" className='h-5 sm:h-6 lg:h-7 object-contain' />
                            <img src={mastercard} alt="mastercard" className='h-5 sm:h-6 lg:h-7 object-contain' />
                            <img src={paytm} alt="paytm" className='h-5 sm:h-6 lg:h-7 object-contain' />
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
