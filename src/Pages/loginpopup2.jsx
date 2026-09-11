import React, { useState } from 'react';
import frameImage from '../assets/Loginpopup2/Frame 1000003579.png';
import vector4 from '../assets/Loginpopup2/Vector (4).png';
import vector5 from '../assets/Loginpopup2/Vector (5).png';
import closeBtn from '../assets/Loginpopup2/close.png';

const LoginPopup2 = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 280);
    };

    return (
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4 md:p-8 font-['DM_Sans'] overflow-y-auto ${isClosing ? 'animate-popup-fade-out' : 'animate-popup-fade-in'}`}>
            
            {/* Container to hold the modal and the extended dashed lines */}
            <div className="relative w-full max-w-[950px] mx-auto flex items-center justify-center py-10">
                
                {/* Main Modal */}
                <div className={`bg-white w-full rounded-[4px] relative shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 min-h-[500px] ${isClosing ? 'animate-popup-scale-out' : 'animate-popup-scale-in'}`}>
                    
                    {/* Vertical Pink Dashed Line */}
                    <div className="absolute top-0 bottom-0 left-4 md:left-8 w-[1.5px] border-l-[1.5px] border-dashed border-[#F96E8F] pointer-events-none z-20"></div>
                    
                    {/* Horizontal Blue Dashed Line */}
                    <div className="absolute left-0 right-0 bottom-4 md:bottom-8 h-[1.5px] border-b-[1.5px] border-dashed border-[#85CDFD] pointer-events-none z-20"></div>
                    
                    {/* Close Button */}
                    <button onClick={handleClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-[35px] h-[35px] flex items-center justify-center border-gray-800 rounded-full hover:bg-gray-100 transition-colors z-30 cursor-pointer">
                        <img src={closeBtn} alt="Close" className="w-[24px] opacity-80" />
                    </button>

                    {/* Left Content Area */}
                    <div className="w-full md:w-[45%] p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-20">
                        
                        {/* Dot Pattern Background behind text */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-1">
                                <span className="text-[#333333] font-bold text-xl md:text-2xl">Summer</span>
                                <div className="w-[50px] h-[2px] bg-[#A881DB]/40"></div>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-['Lobster_Two'] font-bold leading-[1] text-[#A881DB] mb-1 drop-shadow-[2px_2px_0px_#F49800]">
                                SALE OFF
                            </h1>

                            <h3 className="font-['Lobster_Two'] font-bold text-base md:text-xl text-[#333333] mb-8">
                                Anything for your kids
                            </h3>

                            {/* Custom Double Border Button */}
                            <div className="relative inline-block mt-2 mb-4 group cursor-pointer w-fit">
                                <div className="absolute inset-0 bg-transparent border-[2px] border-[#333333] rounded-[4px] translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                                <button className="relative bg-[#Fdfdfd] border-[2px] border-[#333333] px-8 py-3.5 rounded-[4px] font-bold text-[#333333] text-base tracking-wide transition-transform shadow-sm">
                                    View All Deals
                                </button>
                            </div>

                            {/* Yellow Starburst Badge */}
                            <div className="absolute bottom-[-10px] right-[-10px] md:bottom-0 md:right-[-50px] w-[140px] h-[140px] flex items-center justify-center z-30 transform rotate-[-5deg]">
                                {/*Starburst Background */}
                                <img src={vector4} className='absolute inset-0 w-full h-full drop-shadow-md text-[#FFD700] fill-current' />
                                <img src={vector5} className='absolute inset-0 w-full h-full drop-shadow-md text-[#FFD700] fill-current' />
                                
                                <div className="relative z-10 flex flex-col items-center justify-center text-center mt-1">
                                    <span className="text-[#333333] font-bold text-xs uppercase tracking-wider mb-0 leading-none">UP TO</span>
                                    <div className="flex items-start justify-center">
                                        <span className="text-[#A881DB] font-black text-4xl leading-none tracking-tighter">60</span>
                                        <div className="flex flex-col text-[#333333] font-bold text-xs leading-[1] ml-1 mt-1.5">
                                            <span>%</span>
                                            <span>OFF</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Area */}
                    <div className="w-full md:w-[55%] relative min-h-[350px] md:min-h-[500px] bg-white overflow-hidden">
                        {/* The main image asset containing the kids and doodles */}
                        <img src={frameImage} alt="Kids Sale" className="absolute inset-0 w-full h-full object-cover md:object-contain object-bottom md:object-right-bottom z-10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPopup2;
