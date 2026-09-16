import React, { useState } from 'react';
import asset1 from '../assets/Loginpopup/Asset 1.png';
import vector1 from '../assets/Loginpopup/Vector1.png';
import vector2 from '../assets/Loginpopup/Vector2.png';
import closeBtn from '../assets/Loginpopup/close.png';
import vector3 from '../assets/Loginpopup/vector3.png';

const LoginPopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = (skipped) => {
        setIsClosing(true);
        setTimeout(() => {
            onClose(skipped);
        }, 280); // matches the 0.3s animation
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Email address is required');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        
        setError('');
        setSuccess(true);
        setTimeout(() => {
            handleClose(false);
        }, 3000);
    };

    return (
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4 ${isClosing ? 'animate-popup-fade-out' : 'animate-popup-fade-in'}`} style={{ fontFamily: '"DM Sans"' }}>
            {/* Toast Notification */}
            {success && (
                <div className="fixed top-8 right-8 z-[200] bg-white px-5 py-4 rounded-[12px] shadow-2xl flex items-center gap-4 animate-toast border-l-4 border-green-500">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-bold text-sm leading-tight">Subscribed Successfully</h4>
                        <p className="text-gray-500 text-xs font-semibold mt-0.5">Your 20% discount code is on the way!</p>
                    </div>
                </div>
            )}

            <div className={`bg-white w-full max-w-[850px] rounded-[2px] p-2 relative shadow-2xl ${isClosing ? 'animate-popup-scale-out' : 'animate-popup-scale-in'}`}>
                {/* Dashed Border Container */}
                <div className="w-full h-full border-[2px] border-dashed border-[#F96E8F] p-10 md:p-16 relative flex flex-col items-center text-center overflow-hidden">
                    
                    {/* Decorative Elements */}
                    <img src={vector2} alt="Star" className="absolute top-6 left-6 md:top-4 md:left-4 w-[8px] md:w-[20px] pointer-events-none" />
                    <img src={vector2} alt="Star" className="absolute top-6 left-6 md:top-6 md:left-6 w-[50px] md:w-[70px] pointer-events-none" />
                    <img src={asset1} alt="Leaves" className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[80px] md:w-[120px] pointer-events-none" />
                    <img src={vector3} alt="Leaves" className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-[80px] md:w-[120px] pointer-events-none" />
                    
                    {/* Close Button */}
                    <button onClick={() => handleClose(true)} className="absolute top-6 right-6 md:top-8 md:right-8 w-[35px] h-[35px] flex items-center justify-center  transition-colors z-10 cursor-pointer">
                        <img src={closeBtn} alt="Close" className="w-[24px] opacity-80" />
                    </button>

                    {/* Content */}
                    <div className="relative z-10 w-full max-w-[650px] flex flex-col items-center mt-4">
                        <h3 className="text-[#A881DB] font-extrabold tracking-widest text-base md:text-lg mb-1">
                            SIGN UP FOR EMAILS
                        </h3>
                        <img src={vector1} alt="Wavy underline" className="w-[70px] mb-8 pointer-events-none object-contain" />

                        <h2 className="text-[#222222] font-bold text-4xl md:text-5xl leading-[1.1] mb-6">
                            Get 20% discount shipped <br className="hidden md:block" /> to your inbox
                        </h2>
                        
                        <p className="text-gray-700 font-bold text-sm md:text-base mb-12">
                            Subscribe to our newsletter and we will ship 20% discount code today
                        </p>

                        <form onSubmit={handleSubscribe} className="w-full max-w-[500px] mb-8">
                            <div className={`w-full flex flex-col sm:flex-row h-auto sm:h-[55px] rounded-[3px] overflow-hidden border ${error ? 'border-red-500' : 'border-gray-300'}`}>
                                <input 
                                    type="text" 
                                    placeholder="Your email adress" 
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError('');
                                    }}
                                    className="flex-1 h-[50px] sm:h-full px-5 outline-none text-sm text-gray-700 bg-white placeholder-gray-500 font-semibold"
                                />
                                <button type="submit" className="w-full sm:w-[150px] h-[50px] sm:h-full bg-[#A881DB] text-white font-bold text-sm tracking-wider hover:bg-[#976FCB] transition-colors cursor-pointer">
                                    SUBSCRIBE
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-xs font-semibold mt-2 text-left">{error}</p>}
                        </form>

                        <a href="#" className="text-gray-700 font-semibold text-sm underline hover:text-[#A881DB] transition-colors">
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;
