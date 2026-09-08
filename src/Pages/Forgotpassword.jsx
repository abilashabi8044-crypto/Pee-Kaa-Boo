import React, { useState, useEffect } from 'react';
import logo from '../assets/login/PEEKAABOO (2) 8.png';
import logo2 from '../assets/login/PEEKAABOO.png';
import bunnyImg from '../assets/login/bunny@4x 1.png';
import img1 from '../assets/login/Image (1).png';
import img2 from '../assets/login/Image (2).png';
import img3 from '../assets/login/Image (3).png';
import img4 from '../assets/login/Image (4).png';
import img5 from '../assets/login/Image (5).png';
import imgMain from '../assets/login/Image.png';

export default function Forgotpassword() {
    const [bgIndex, setBgIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (val) => {
        setEmail(val);
        if (emailError) setEmailError('');
    };

    useEffect(() => {
        const storedIndex = sessionStorage.getItem('loginBgIndex');
        const currentIndex = storedIndex !== null ? parseInt(storedIndex, 10) : 0;
        const matchIndex = storedIndex !== null ? (currentIndex - 1 + 3) % 3 : 0;
        setBgIndex(matchIndex);
    }, []);

    const gradients = [
        "from-[#F49800] via-[#FFA209] to-[#FFB740]",
        "from-[#4B83D1] via-[#5686BB] to-[#ABD3FF]",
        "from-[#E44971] via-[#F76188] to-[#FF8AB6]"
    ];

    const borderColors = [
        "border-[#F49800]",
        "border-[#4B83D1]",
        "border-[#F76188]"
    ];

    const validateForm = () => {
        let isValid = true;
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitted(true);
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${gradients[bgIndex]} relative overflow-hidden flex items-center justify-center font-['Baloo_2'] p-4 md:p-8`}>
            {/* Background Decorator Images */}
            <img src={logo} alt="Logo" className="absolute bottom-4 left-4 md:bottom-0 md:left-8 w-[120px] md:w-[180px] z-10" />
            <img src={logo2} alt="logo" className="absolute bottom-4 right-4 md:bottom-0 md:right-6 w-[160px] md:w-[260px] z-30" />
            <img src={img1} alt="Decoration" className="hidden lg:block absolute top-100 left-83 w-[130px] object-contain" />
            <img src={img2} alt="Decoration" className="hidden xl:block absolute top-12 right-240 w-[224.4px] object-contain" />
            <img src={img3} alt="Decoration" className="hidden lg:block absolute top-[15%] left-[85%] w-[140px] object-contain" />
            <img src={img4} alt="Decoration" className="hidden lg:block absolute top-[50%] right-[10%] w-[120px] object-contain" />
            <img src={img5} alt="Decoration" className="hidden md:block absolute bottom-0 right-0 w-[250px] lg:w-[420px] object-contain" />
            <img src={imgMain} alt="Decoration" className="hidden md:block absolute top-0 left-0 w-[250px] lg:w-[450px] object-contain" />
            <img src={bunnyImg} alt="Large Bunny" className="hidden xl:block absolute top-12 left-[56%] w-[126px] h-[193px] z-30 object-contain" />

            {/* Forgot Password Form Container */}
            <div className={`w-full max-w-[450px] bg-white/10 backdrop-blur-md rounded-[20px] md:rounded-[30px] border ${borderColors[bgIndex]} p-[20px] md:p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative z-20`}>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-white text-[32px] md:text-[40px] font-bold text-center mb-[15px] leading-none tracking-wide">Forgot Password</h1>
                        <p className="text-white text-[14px] text-center mb-[20px] font-medium leading-relaxed">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <div className="mb-[20px]">
                            <label className="text-white text-[14px] font-bold mb-[5px] block">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                placeholder="username@gmail.com"
                                className={`w-full h-[45px] rounded-[10px] px-[15px] text-[14px] text-[#333] outline-none border-2 placeholder-gray-400 font-medium bg-white transition-colors ${emailError ? 'border-[#FF5252]' : 'border-transparent'}`}
                            />
                            {emailError && <p className="text-[#FF5252] text-[12.5px] font-bold mt-[4px]">{emailError}</p>}
                        </div>

                        <button 
                            type="submit"
                            className="w-full h-[45px] bg-[#04BCC6] text-white text-[18px] font-bold rounded-[10px] transition-transform hover:scale-[1.02] shadow-md cursor-pointer mb-[15px]"
                        >
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h1 className="text-white text-[32px] md:text-[40px] font-bold text-center mb-[15px] leading-none tracking-wide">Check Your Email</h1>
                        <p className="text-white text-[14px] text-center mb-[25px] font-medium leading-relaxed">
                            We have sent a password reset link to <strong className="text-yellow-200">{email}</strong>. Please check your inbox and follow the instructions.
                        </p>
                    </div>
                )}

                <div className="text-center">
                    <a href="#" onClick={handleBackToLogin} className="text-white text-[14px] font-bold hover:underline">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}
