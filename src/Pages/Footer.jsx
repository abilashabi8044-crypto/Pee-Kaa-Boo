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
            className="w-full pt-16 pb-6 relative mt-24 font-['Baloo_2'] bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${footerBg})` }}
        >

            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-10 relative z-10">
                    
                    {/* Column 1: Logo & Socials */}
                    <div className="flex flex-col items-start">
                        <img src={footerBunny} alt="PEE KAA BOO" className="w-[180px] object-contain mt-8 -ml-[128px] mb-8" />
                        
                        <h4 className="text-gray-900 font-extrabold text-[16px] -ml-[128px] mb-4 uppercase">Follow Us</h4>
                        <div className="flex items-center -ml-[128px] gap-3">
                            {/* Facebook */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] transition-colors">
                                <img src={fb} alt="facebook" className='w-4 h-4' />
                            </a>
                            {/* Instagram */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] transition-colors">
                                <img src={insta} alt="instagram" className='w-4 h-4' />
                            </a>
                            {/* X (Twitter) */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] transition-colors">
                                <img src={twitter} alt="twitter" className='w-4 h-4' />
                            </a>
                            {/* YouTube */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] transition-colors">
                                <img src={youtube} alt="youtube" className='w-5 h-3.5' />
                            </a>
                            {/* Pinterest */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#F96E8F] flex items-center justify-center text-white hover:bg-[#E44971] transition-colors">
                                <img src={pinterest} alt="pinterest" className='w-4 h-4' />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: About Us */}
                    <div className="pt-8 lg:ml-12 xl:ml-20">
                        <h4 className="text-gray-900 font-bold font-[Baloo_2] text-[26px] mb-5 uppercase tracking-wider">About Us</h4>
                        <ul className="flex flex-col gap-3 text-gray-700 font-bold text-[14px]">
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">About our company</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Terms and Conditions</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Testimonials</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Offers</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Why Us */}
                    <div className="pt-8 lg:ml-12 xl:ml-20">
                        <h4 className="text-gray-900 font-bold font-[Baloo_2] text-[26px] mb-5 uppercase tracking-wider">Why Us ?</h4>
                        <ul className="flex flex-col gap-3 text-gray-700 font-bold text-[14px]">
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Return Policy</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Cancel and Refund</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Certified Jewellery</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">DGRP</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Jewellery Guides */}
                    <div className="pt-8 lg:ml-12 xl:ml-20">
                        <h4 className="text-gray-900 font-bold font-[Baloo_2] text-[26px] mb-5 uppercase tracking-wider whitespace-nowrap">Jewellery Guides</h4>
                        <ul className="flex flex-col gap-3 text-gray-700 font-bold text-[14px]">
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Lorem Ipsum</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Lorem Ipsum</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Lorem Ipsum</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Lorem Ipsum</a></li>
                            <li><a href="#" className="hover:text-[#F96E8F] font-[Baloo_2] text-[22px] transition-colors">Lorem Ipsum</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bunny Character (Absolute positioned to overlap bottom right) */}
                <img 
                    src={footerLogo} 
                    alt="Bunny Decoration" 
                    className="hidden lg:block absolute bottom-14 right-1 xl:-right-26 w-[150px] object-contain pointer-events-none z-20"
                />

                {/* Bottom Bar */}
                <div className="auto -ml-[128px] -mr-[128px] border-t-[1.5px] border-gray-200/120 pt-6 mt-2 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                    <p className="text-gray-800 font-extrabold text-[13.5px]">
                        © 2026 PEE KAA BOO All Rights Reserved.
                    </p>

                    <div className="flex items-center  gap-5">
                        <span className="text-gray-900 font-extrabold text-[14px] uppercase mr-1">We Accept</span>
                        
                        {/* Visa */}
                        <div className="">
                            <img src={visa} alt="visa" className='w-14'/>
                        </div>
                        
                        {/* MasterCard */}
                        <div className="">
                            <img src={mastercard} alt="mastercard" className='w-14'/>
                        </div>

                        {/* Paytm */}
                        <div className="">
                            <img src={paytm} alt="paytm" className='w-14'/>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
