import React, { useState, useEffect } from 'react';
import logo from '../assets/login/PEEKAABOO (2) 8.png';
import logo2 from '../assets/login/PEEKAABOO.png';
import bunnyImg from '../assets/login/bunny@4x 1.png';
import img1 from '../assets/login/Image (1).png';
import img2 from '../assets/login/Image (2).png';
import img3 from '../assets/login/Image (3).png';
import img4 from '../assets/login/Image (4).png';
import img5 from '../assets/login/Image (5).png';
import imgMain from '../assets/login/cloud.png';
import mainlogo from '../assets/login/logo.png';

export default function Signup() {
    const [bgIndex, setBgIndex] = useState(0);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleNameChange = (val) => {
        setFullName(val);
        if (nameError) setNameError('');
    };

    const handleEmailChange = (val) => {
        setEmail(val);
        if (emailError) setEmailError('');
    };

    const handlePasswordChange = (val) => {
        setPassword(val);
        if (passwordError) setPasswordError('');
    };

    useEffect(() => {
        const storedIndex = sessionStorage.getItem('loginBgIndex');
        const currentIndex = storedIndex !== null ? parseInt(storedIndex, 10) : 0;
        setBgIndex(currentIndex);
        // Optionally cycle the background for the next load
        sessionStorage.setItem('loginBgIndex', ((currentIndex + 1) % 3).toString());
    }, []);

    const gradients = [
        "from-[#F49800] via-[#FFA209] to-[#FFB740]",
        "from-[#4B83D1] via-[#5686BB] to-[#ABD3FF]",
        "from-[#E44971] via-[#F76188] to-[#FF8AB6]"
    ];

    const validateForm = () => {
        let isValid = true;

        if (!fullName.trim()) {
            setNameError('Full Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userEmail = email.trim();
        const userId = `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userId', userId);

        const newProfile = {
            fullName: fullName.trim(),
            emailId: userEmail,
            mobileNumber: '',
            altMobileNumber: '',
            altEmailId: '',
            gender: '',
            dob: ''
        };
        localStorage.setItem('userProfile', JSON.stringify(newProfile));

        window.history.pushState({}, '', '/account');
        window.dispatchEvent(new Event('popstate'));
    };

    const navigateToLogin = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div className={`min-h-[100dvh] bg-gradient-to-br ${gradients[bgIndex]} relative overflow-hidden flex flex-col md:flex-row md:items-center justify-center font-['Baloo_2'] pt-0 md:pt-8 pb-4 md:pb-8 px-4 md:px-8`}>
            {/* Mobile Top Header (Centered Logo) */}
            <div className="md:hidden absolute top-0 left-0 w-[100vw] flex justify-center z-10 pointer-events-none">
                <div className="relative flex justify-center items-center w-full -mt-[9vw]">
                    <img src={imgMain} alt="Cloud Background" className="w-full h-auto object-cover" />
                    <img src={mainlogo} alt="Main Logo" className="absolute w-[18vw] mt-[7vw] z-30" />
                </div>
            </div>

            {/* Mobile Bottom Bunnies */}
            <img src={img5} alt="Decoration Right" className="block md:hidden absolute bottom-0 -right-[7vw] w-[73vw] z-10 object-contain pointer-events-none" />

            {/* Background Decorator Images */}
            <img src={logo} alt="Logo" className="absolute bottom-4 left-4 md:bottom-0 md:left-8 w-[25vw] md:w-[180px] z-30 object-contain pointer-events-none" />
            <img src={logo2} alt="logo" className="absolute bottom-4 right-4 md:bottom-0 md:right-6 w-[43vw] md:w-[260px] z-30 object-contain pointer-events-none" />
            <img src={img1} alt="Decoration" className="hidden lg:block absolute top-100 left-83 w-[130px] object-contain" />
            <img src={img2} alt="Decoration" className="login-img2-nesthub hidden xl:block absolute top-12 right-240 w-[224.4px] object-contain" />
            <img src={img3} alt="Decoration" className="hidden lg:block absolute top-[15%] left-[85%] w-[140px] object-contain" />
            <img src={img4} alt="Decoration" className="hidden lg:block absolute top-[50%] right-[10%] w-[120px] object-contain" />
            <img src={img5} alt="Decoration" className="hidden md:block absolute bottom-0 right-0 w-[380px] lg:w-[560px] object-contain" />
            {/* Desktop Cloud and Main Logo */}
            <div className="hidden md:flex absolute -top-[42px] -left-8 z-10 pointer-events-none">
                <div className="relative flex justify-center items-center">
                    <img src={imgMain} alt="Decoration" className="w-[250px] lg:w-[450px] object-contain" />
                    <img src={mainlogo} alt="Main Logo" className="absolute w-[60px] lg:w-[90px] z-30 mt-[10px] lg:mt-[30px]" />
                </div>
            </div>
            <img src={bunnyImg} alt="Large Bunny" className="hidden xl:block absolute top-12 left-[56%] w-[126px] h-[193px] z-30 object-contain" />

            {/* Signup Form Wrapper */}
            <div className="relative w-full max-w-[450px] mx-auto z-20 scale-[0.85] min-[430px]:scale-100 md:scale-100 mt-8 md:mt-0">
                {/* Image behind form */}
                <img src={img2} alt="" className="block md:hidden absolute -top-[20vw] -left-[11vw] w-[40vw] z-[-1] object-contain pointer-events-none" />

                {/* Signup Form Container */}
                <div className="w-full bg-white/10 backdrop-blur-md rounded-[20px] md:rounded-[30px] p-[20px] md:p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative">
                    {/* Thin Gradient Border */}
                    <div className="absolute inset-0 rounded-[inherit] pointer-events-none p-[1.5px] bg-gradient-to-r from-[#FFA1C4] to-[#F76188]" style={{
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                    }}></div>
                    {/* Mobile-Only Card Decorators */}
                    <img src={bunnyImg} alt="" className="block md:hidden absolute -top-[10vw] right-[2vw] w-[15vw] z-30 object-contain pointer-events-none" />

                    <h1 className="text-white text-[32px] md:text-[40px] font-bold text-center mb-[15px] leading-none tracking-wide">Sign Up</h1>

                    <div className="mb-[15px]">
                        <label className="text-white text-[14px] font-bold mb-[5px] block">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="John Doe"
                            className={`w-full h-[45px] rounded-[10px] px-[15px] text-[14px] text-[#333] outline-none border-2 placeholder-gray-400 font-medium bg-white transition-colors ${nameError ? 'border-[#FF5252]' : 'border-transparent'}`}
                        />
                        {nameError && <p className="text-[#FF5252] text-[12.5px] font-bold mt-[4px]">{nameError}</p>}
                    </div>

                    <div className="mb-[15px]">
                        <label className="text-white text-[14px] font-bold mb-[5px] block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            placeholder="username@gmail.com"
                            className={`w-full h-[45px] rounded-[10px] px-[15px] text-[14px] text-[#333] outline-none border-2 placeholder-gray-400 font-medium bg-white transition-colors ${emailError ? 'border-[#FF5252]' : 'border-transparent'}`}
                        />
                        {emailError && <p className="text-[#FF5252] text-[12.5px] font-bold mt-[4px]">{emailError}</p>}
                    </div>

                    <div className="mb-[20px]">
                        <label className="text-white text-[14px] font-bold mb-[5px] block">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder="Password"
                                className={`w-full h-[45px] rounded-[10px] px-[15px] text-[14px] text-[#333] outline-none border-2 placeholder-gray-400 font-medium bg-white transition-colors ${passwordError ? 'border-[#FF5252]' : 'border-transparent'}`}
                            />
                        </div>
                        {passwordError && <p className="text-[#FF5252] text-[12.5px] font-bold mt-[4px]">{passwordError}</p>}
                    </div>

                    <button
                        onClick={handleSignup}
                        className="w-full h-[45px] bg-[#04BCC6] text-white text-[18px] font-bold rounded-[10px] transition-transform hover:scale-[1.02] shadow-md cursor-pointer mb-2"
                    >
                        Register
                    </button>

                    <p className="text-white text-[12px] text-center mt-[15px] font-bold">
                        Already have an account? <a href="#" onClick={navigateToLogin} className="underline hover:text-gray-200">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
