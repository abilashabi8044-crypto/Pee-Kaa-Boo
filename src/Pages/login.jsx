import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/actions/authActions';
import LoginPopup from './loginpopup';
import LoginPopup2 from './loginpopup2';
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

export default function Login() {
    const dispatch = useDispatch();
    const [popupState, setPopupState] = useState(0); // 0 = none, 1 = first popup, 2 = second popup
    const [bgIndex, setBgIndex] = useState(0);

    useEffect(() => {
        // Show first popup after 5 seconds
        const timer = setTimeout(() => {
            setPopupState(1);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleFirstPopupClose = (skipped) => {
        if (skipped === true) {
            setPopupState(2);
        } else {
            setPopupState(0);
        }
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
        sessionStorage.setItem('loginBgIndex', ((currentIndex + 1) % 3).toString());
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

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userEmail = email.trim();
        const userId = `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userId', userId);
        dispatch(setLoggedIn(true));

        const existingProfile = localStorage.getItem('userProfile');
        if (!existingProfile) {
            const defaultProfile = {
                fullName: userEmail.split('@')[0] || 'Your name',
                emailId: userEmail,
                mobileNumber: '+91 91234 56789',
                altMobileNumber: '',
                altEmailId: '',
                gender: 'Female',
                dob: '1998-05-15'
            };
            localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
        }

        window.history.pushState({}, '', '/account');
        window.dispatchEvent(new Event('popstate'));
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/forgotpassword');
        window.dispatchEvent(new Event('popstate'));
    };

    const handleGoHome = (e) => {
        if (e) e.preventDefault();
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div className={`min-h-[100dvh] bg-gradient-to-br ${gradients[bgIndex]} relative overflow-hidden flex flex-col md:flex-row md:items-center justify-center font-['Baloo_2'] pt-0 md:pt-8 pb-4 md:pb-8 px-4 md:px-8`}>
            {/* Mobile Top Header (Centered Logo) */}
            <div className="md:hidden absolute top-0 left-0 w-[100vw] flex justify-center z-10 pointer-events-none">
                <div className="relative flex justify-center items-center w-full -mt-[9vw]">
                    <img src={imgMain} alt="Cloud Background" className="w-full h-auto object-cover" />
                    <img
                        src={mainlogo}
                        alt="Main Logo"
                        onClick={handleGoHome}
                        className="absolute w-[18vw] mt-[7vw] z-30 cursor-pointer pointer-events-auto hover:opacity-90 transition-opacity"
                    />
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
                    <img
                        src={mainlogo}
                        alt="Main Logo"
                        onClick={handleGoHome}
                        className="absolute w-[60px] lg:w-[90px] z-30 mt-[10px] lg:mt-[30px] cursor-pointer pointer-events-auto hover:opacity-90 transition-opacity"
                    />
                </div>
            </div>
            <img src={bunnyImg} alt="Large Bunny" className="hidden xl:block absolute top-12 left-[56%] w-[126px] h-[193px] z-30 object-contain" />

            {/* Login Form Wrapper */}
            <div className="relative w-full max-w-[450px] mx-auto z-20 scale-[0.85] min-[430px]:scale-100 md:scale-100">
                {/* Image behind form */}
                <img src={img2} alt="" className="block md:hidden absolute -top-[20vw] -left-[11vw] w-[40vw] z-[-1] object-contain pointer-events-none" />

                {/* Login Form Container */}
                <div className="w-full bg-white/10 backdrop-blur-md rounded-[20px] md:rounded-[30px] p-[20px] md:p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative">
                    {/* Thin Gradient Border */}
                    <div className="absolute inset-0 rounded-[inherit] pointer-events-none p-[1.5px] bg-gradient-to-r from-[#FFA1C4] to-[#F76188]" style={{
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                    }}></div>
                    {/* Mobile-Only Card Decorators */}
                    <img src={bunnyImg} alt="" className="block md:hidden absolute -top-[10vw] right-[2vw] w-[15vw] z-30 object-contain pointer-events-none" />

                    <h1 className="text-white text-3xl md:text-4xl font-bold text-center mb-[15px] leading-none tracking-wide">Login</h1>

                    <div className="mb-[15px]">
                        <label className="text-white text-sm font-bold mb-[5px] block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            placeholder="username@gmail.com"
                            className={`w-full h-[45px] rounded-[10px] px-[15px] text-sm text-[#333] outline-none border-2 placeholder-gray-400 font-medium bg-white transition-colors ${emailError ? 'border-[#FF5252]' : 'border-transparent'}`}
                        />
                        {emailError && <p className="text-[#FF5252] text-xs font-bold mt-[4px]">{emailError}</p>}
                    </div>

                    <div className="mb-[5px]">
                        <label className="text-white text-sm font-bold mb-[5px] block">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder="Password"
                                className={`w-full h-[45px] rounded-[10px] px-[15px] text-sm text-[#333] outline-none border-2 placeholder-gray-400 font-medium bg-white transition-colors ${passwordError ? 'border-[#FF5252]' : 'border-transparent'}`}
                            />
                            {/* Eye Icon placeholder */}
                            <span className="absolute right-[15px] top-[12px] text-gray-400 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </span>
                        </div>
                        {passwordError && <p className="text-[#FF5252] text-xs font-bold mt-[4px]">{passwordError}</p>}
                    </div>

                    <div className="mb-[20px]">
                        <a href="#" onClick={handleForgotPassword} className="text-white text-xs font-bold hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full h-[45px] bg-[#04BCC6] text-white text-lg font-bold rounded-[10px] transition-transform hover:scale-[1.02] shadow-md cursor-pointer"
                    >
                        Sign in
                    </button>

                    <p className="text-white text-xs text-center my-[15px] font-bold">or continue with</p>

                    <div className="flex justify-between gap-[10px]">
                        <button className="flex-1 h-[45px] bg-white rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[20px] h-[20px]">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                        </button>
                        <button className="flex-1 h-[45px] bg-white rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[24px] h-[24px]">
                                <path fill="#1976D2" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z" />
                                <path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-4.078,2.456-6.286,6.128-6.286c1.743,0,3.243,0.13,3.682,0.188v4.267l-2.527,0.001c-1.979,0-2.361,0.94-2.361,2.32L31,21h3.771L34.368,25z" />
                            </svg>
                        </button>
                        <button className="flex-1 h-[45px] bg-white rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-[20px] h-[20px]">
                                <path d="M41.7,35.4c-2,3-4.7,6.3-7.9,6.3c-2,0-3.3-1.3-5.5-1.3c-2.2,0-3.9,1.3-5.6,1.3c-3,0-5.7-3.1-7.8-6.1 C11.5,28.8,11.2,21,15.1,16.8c1.8-2,4.3-3.2,6.8-3.2c2,0,3.7,0.9,5.2,0.9c1.6,0,3.8-1.2,6-1.2c2.7-0.1,5.2,1,6.8,3 c-5.8,3.3-4.8,11.3,1.3,13.8C40.6,31.7,41.2,33.5,41.7,35.4z M29.6,12.5c1.4-1.8,2.4-4,2.2-6.2c-2.1,0.1-4.6,1.4-6,3.2 c-1.2,1.6-2.2,4.1-1.9,6.2C26.1,15.8,28.3,14.3,29.6,12.5z" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-white text-xs text-center mt-[20px] font-bold">
                        Don't have an account yet? <a href="#" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/signup'); window.dispatchEvent(new Event('popstate')); }} className="underline hover:text-gray-200">Register For Free</a>
                    </p>

                    <div className="text-center mt-[12px]">
                        <a
                            href="/"
                            onClick={handleGoHome}
                            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-bold transition-all hover:underline"
                        >
                            <span>←</span>
                            <span>Continue browsing as Guest</span>
                        </a>
                    </div>
                </div>
            </div>
            {popupState === 1 && <LoginPopup onClose={handleFirstPopupClose} />}
            {popupState === 2 && <LoginPopup2 onClose={() => setPopupState(0)} />}
        </div>
    );
}
