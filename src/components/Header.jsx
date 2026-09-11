import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/cartSlice';
import { selectWishlistCount } from '../redux/wishlistSlice';
import { gridItems } from '../Pages/Shop';
import logo from '../assets/Header/peekaaboo.png';
import profile from '../assets/Header/profile.png';
import heart from '../assets/Header/heart.png';
import cart from '../assets/Header/cart.png';
import search from '../assets/Header/search.png';
import searchbarBg from '../assets/Header/searchbar.png';
import searchbar1Bg from '../assets/Header/searchbar1.png';

const navData = ["Boys", "Girls", "Just Born"];
const actionIcons = [
    { name: 'profile', icon: profile },
    { name: 'heart', icon: heart },
    { name: 'cart', icon: cart },
];

export default function Header({ cartItems, wishlistCount, showMobileSearch, customLogo }) {
    const reduxCartCount = useSelector(selectCartCount);
    const reduxWishlistCount = useSelector(selectWishlistCount);

    const activeCartCount = cartItems
        ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
        : reduxCartCount;

    const activeWishlistCount = typeof wishlistCount === 'number'
        ? wishlistCount
        : reduxWishlistCount;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(() => typeof window !== 'undefined' ? window.location.pathname : '');

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');
    const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false);

    const desktopSearchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    const shopProducts = (gridItems || []).filter(item => item.type === 'product');

    const getFilteredProducts = (query) => {
        if (!query || !query.trim()) return [];
        const q = query.toLowerCase().trim();
        return shopProducts.filter(p =>
            (p.title && p.title.toLowerCase().includes(q)) ||
            (p.code && p.code.toLowerCase().includes(q)) ||
            (p.category && p.category.toLowerCase().includes(q)) ||
            (p.productType && p.productType.toLowerCase().includes(q)) ||
            (p.color && p.color.toLowerCase().includes(q)) ||
            (p.pattern && p.pattern.toLowerCase().includes(q))
        );
    };

    const desktopResults = getFilteredProducts(searchQuery);
    const mobileResults = getFilteredProducts(mobileSearchQuery);

    const handleSelectSearchResult = (prod) => {
        try {
            localStorage.setItem('pkb_selected_product', JSON.stringify(prod));
        } catch (e) {
            console.error(e);
        }
        window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: prod }));
        window.history.pushState({}, '', '/product');
        window.dispatchEvent(new Event('popstate'));
        setSearchQuery('');
        setMobileSearchQuery('');
        setIsSearchFocused(false);
        setIsMobileSearchFocused(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) {
                setIsSearchFocused(false);
            }
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
                setIsMobileSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        handleLocationChange();
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    const isCart = currentPath.includes('/cart');
    const isOtherPage = currentPath.includes('/account') || currentPath.includes('/product') || currentPath.includes('/checkout') || currentPath.includes('/login');
    const isShop = !isOtherPage && !isCart;

    const shouldShowMobileSearch = showMobileSearch !== undefined ? showMobileSearch : (isShop || isCart);

    return (
        <header className="w-full font-['Baloo_2'] relative z-40 bg-transparent">
            {/* Top Bar (Hidden on mobile < md) */}
            <div className="hidden md:flex w-full bg-[#FFCD4E] text-gray-800 text-[13px] py-2 px-4 md:px-10 flex-col sm:flex-row justify-between items-center font-bold relative z-30">
                <div className="md:ml-24 mb-1 sm:mb-0 text-center sm:text-left">Free Returns and Free Shipping</div>
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.846-6.846l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <span>+00 123 456 789</span>
                    </div>
                    <div className="w-[1.5px] h-3.5 bg-gray-600/30"></div>
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span>demo@example.com</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation Wrapper */}
            <div className="w-full px-4 md:px-10 py-3 lg:py-4 flex flex-col lg:flex-row items-center justify-between max-w-[1920px] mx-auto relative z-30 bg-transparent min-h-[70px] gap-3 lg:gap-0">
                {/* Top Row for Mobile (Hamburger | Logo | Icons) / Desktop Left Row (Logo) */}
                <div className="w-full lg:w-auto flex items-center justify-between relative min-h-[50px] lg:min-h-0">
                    {/* Mobile Hamburger Menu Button (Left on mobile) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-1.5 rounded-lg text-gray-800 hover:text-[#F96E8F] focus:outline-none cursor-pointer z-40"
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <div className="cursor-pointer flex items-center absolute left-1/2 top-1/2 lg:top-auto -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 lg:static lg:flex-shrink-0 z-50 mt-4 lg:mt-0">
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', '/');
                            window.dispatchEvent(new Event('popstate'));
                        }} className="block">
                            <img src={customLogo || logo} alt="PEE KAA BOO" className="w-[60px] sm:w-[80px] -ml-1.5 lg:ml-24 object-contain" />
                        </a>
                    </div>

                    {/* Mobile Action Icons (Profile, Wishlist, Cart) */}
                    <div className="flex lg:hidden items-center gap-4 sm:gap-6 z-40">
                        {actionIcons.map((action, index) => (
                            <button key={index} onClick={(e) => {
                                if (action.name === 'cart') {
                                    e.preventDefault();
                                    window.history.pushState({}, '', '/cart');
                                    window.dispatchEvent(new Event('popstate'));
                                } else if (action.name === 'profile') {
                                    e.preventDefault();
                                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                                    const targetPath = isLoggedIn ? '/account' : '/login';
                                    window.history.pushState({}, '', targetPath);
                                    window.dispatchEvent(new Event('popstate'));
                                } else if (action.name === 'heart') {
                                    e.preventDefault();
                                    window.history.pushState({}, '', '/account?tab=wishlist');
                                    window.dispatchEvent(new Event('popstate'));
                                }
                            }} className="relative text-gray-800 hover:text-[#F96E8F] transition-colors cursor-pointer p-0.5">
                                <img src={action.icon} alt={action.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                                {action.name === 'cart' && activeCartCount > 0 && (
                                    <div className="absolute -top-2 -right-2 bg-[#F96E8F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                        {activeCartCount}
                                    </div>
                                )}
                                {action.name === 'heart' && activeWishlistCount > 0 && (
                                    <div className="absolute -top-2 -right-2 bg-[#F96E8F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                                        {activeWishlistCount}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Search Bar: Only shown for Shop and Cart at mobile responsive */}
                {shouldShowMobileSearch && (
                    <div ref={mobileSearchRef} className="relative flex lg:hidden flex-col items-center w-[90%] sm:w-[400px] mt-4 sm:mt-2.5 translate-y-[28px] lg:translate-y-0 lg:mt-0 z-40">
                        <div
                            className="flex items-center w-full h-[40px] transition-colors bg-no-repeat bg-center bg-transparent"
                            style={{ backgroundImage: `url(${searchbarBg})`, backgroundSize: '100% 100%' }}
                        >
                            <input
                                type="text"
                                placeholder="Search Everything"
                                value={mobileSearchQuery}
                                onChange={(e) => {
                                    setMobileSearchQuery(e.target.value);
                                    setIsMobileSearchFocused(true);
                                }}
                                onFocus={() => setIsMobileSearchFocused(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && mobileResults.length > 0) {
                                        handleSelectSearchResult(mobileResults[0]);
                                    }
                                }}
                                className="flex-1 pl-6 pr-3 h-full outline-none text-[13px] text-gray-700 font-extrabold bg-transparent border-none placeholder-gray-400"
                            />
                            <button
                                onClick={() => {
                                    if (mobileResults.length > 0) {
                                        handleSelectSearchResult(mobileResults[0]);
                                    }
                                }}
                                className="w-[60px] h-full flex items-center justify-center transition-colors cursor-pointer bg-transparent bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${searchbar1Bg})`, backgroundSize: '100% 100%' }}
                            >
                                <img src={search} alt="search" className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Mobile Search Results Dropdown */}
                        {isMobileSearchFocused && mobileSearchQuery.trim() && (
                            <div className="absolute top-[44px] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-pink-200/80 p-2 z-50 max-h-[300px] overflow-y-auto font-['Nunito']">
                                {mobileResults.length > 0 ? (
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider px-2 py-1">
                                            Found {mobileResults.length} {mobileResults.length === 1 ? 'Product' : 'Products'}
                                        </div>
                                        {mobileResults.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleSelectSearchResult(item)}
                                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50/80 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-0"
                                            >
                                                <div className="w-11 h-11 rounded-lg bg-[#F9E2E8]/40 flex-shrink-0 overflow-hidden border border-pink-100 flex items-center justify-center p-0.5">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-1">
                                                        <h4 className="font-bold text-gray-800 text-[13px] truncate">
                                                            {item.title}
                                                        </h4>
                                                        <span className="font-black text-[#F96E8F] text-[13px]">
                                                            ₹{item.price}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] text-gray-500 font-bold">
                                                            {item.code || `64A288${item.id}`}
                                                        </span>
                                                        <span className="text-[9px] bg-pink-100 text-[#F96E8F] font-extrabold px-1.5 py-0.5 rounded">
                                                            {item.category || item.productType}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-400 font-bold text-[12px]">
                                        No products found matching "{mobileSearchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Desktop Nav + Search + Actions (Preserved on Desktop lg view) */}
                <div className="hidden lg:flex items-center gap-4 lg:gap-14">
                    {/* Desktop Navigation Links */}
                    <nav className="flex items-center gap-8 text-gray-800 font-extrabold text-[16px] tracking-wide">
                        {navData.map((item, index) => {
                            const path = `/${item.toLowerCase().replace(' ', '-')}`;
                            return (
                                <a
                                    key={index}
                                    href={path}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.history.pushState({}, '', path);
                                        window.dispatchEvent(new Event('popstate'));
                                    }}
                                    className="hover:text-[#F96E8F] transition-colors uppercase cursor-pointer"
                                >
                                    {item}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Desktop Right Actions (Search Bar + Profile/Heart/Cart) */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Desktop Search Bar */}
                        <div ref={desktopSearchRef} className="relative flex flex-col items-center">
                            <div
                                className="flex items-center w-[200px] md:w-[280px] h-[42px] transition-colors bg-no-repeat bg-center bg-transparent"
                                style={{ backgroundImage: `url(${searchbarBg})`, backgroundSize: '100% 100%' }}
                            >
                                <input
                                    type="text"
                                    placeholder="Search Everything"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setIsSearchFocused(true);
                                    }}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && desktopResults.length > 0) {
                                            handleSelectSearchResult(desktopResults[0]);
                                        }
                                    }}
                                    className="flex-1 pl-6 pr-3 h-full outline-none text-[13px] text-gray-700 font-extrabold bg-transparent border-none placeholder-gray-400"
                                />
                                <button
                                    onClick={() => {
                                        if (desktopResults.length > 0) {
                                            handleSelectSearchResult(desktopResults[0]);
                                        }
                                    }}
                                    className="w-[65px] h-full flex items-center justify-center transition-colors cursor-pointer bg-transparent bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url(${searchbar1Bg})`, backgroundSize: '100% 100%' }}
                                >
                                    <img src={search} alt="search" className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Desktop Search Results Dropdown */}
                            {isSearchFocused && searchQuery.trim() && (
                                <div className="absolute top-[46px] left-0 w-[320px] bg-white rounded-2xl shadow-2xl border border-pink-200/80 p-2.5 z-50 max-h-[360px] overflow-y-auto font-['Nunito']">
                                    {desktopResults.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider px-2 py-1">
                                                Found {desktopResults.length} {desktopResults.length === 1 ? 'Product' : 'Products'}
                                            </div>
                                            {desktopResults.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSelectSearchResult(item)}
                                                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-pink-50/80 cursor-pointer transition-all duration-200 group border-b border-gray-100 last:border-0"
                                                >
                                                    <div className="w-12 h-12 rounded-lg bg-[#F9E2E8]/40 flex-shrink-0 overflow-hidden border border-pink-100 flex items-center justify-center p-0.5">
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <h4 className="font-bold text-gray-800 text-[14px] truncate group-hover:text-[#F96E8F] transition-colors">
                                                                {item.title}
                                                            </h4>
                                                            <span className="font-black text-[#F96E8F] text-[14px]">
                                                                ₹{item.price}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-[11px] text-gray-500 font-bold">
                                                                {item.code || `64A288${item.id}`}
                                                            </span>
                                                            <span className="text-[10px] bg-pink-100 text-[#F96E8F] font-extrabold px-1.5 py-0.5 rounded">
                                                                {item.category || item.productType}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-300 group-hover:text-[#F96E8F] transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 font-bold text-[13px]">
                                            No products found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Action Icons (Profile, Wishlist, Cart) */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            {actionIcons.map((action, index) => (
                                <button key={index} onClick={(e) => {
                                    if (action.name === 'cart') {
                                        e.preventDefault();
                                        window.history.pushState({}, '', '/cart');
                                        window.dispatchEvent(new Event('popstate'));
                                    } else if (action.name === 'profile') {
                                        e.preventDefault();
                                        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                                        const targetPath = isLoggedIn ? '/account' : '/login';
                                        window.history.pushState({}, '', targetPath);
                                        window.dispatchEvent(new Event('popstate'));
                                    } else if (action.name === 'heart') {
                                        e.preventDefault();
                                        window.history.pushState({}, '', '/account?tab=wishlist');
                                        window.dispatchEvent(new Event('popstate'));
                                    }
                                }} className="relative text-gray-800 hover:text-[#F96E8F] transition-colors cursor-pointer p-0.5">
                                    <img src={action.icon} alt={action.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                                    {action.name === 'cart' && activeCartCount > 0 && (
                                        <div className="absolute -top-2 -right-2 bg-[#F96E8F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                            {activeCartCount}
                                        </div>
                                    )}
                                    {action.name === 'heart' && activeWishlistCount > 0 && (
                                        <div className="absolute -top-2 -right-2 bg-[#F96E8F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                                            {activeWishlistCount}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer: Appears at the top of the header */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-0 left-0 w-full bg-white shadow-2xl z-50 border-b border-pink-100 px-6 py-4 flex flex-col gap-3 animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                            window.history.pushState({}, '', '/');
                            window.dispatchEvent(new Event('popstate'));
                        }} className="block cursor-pointer">
                            <img src={customLogo || logo} alt="PEE KAA BOO" className="w-[60px] h-auto object-contain" />
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-1.5 rounded-full text-gray-500 hover:text-[#F96E8F] hover:bg-pink-50 transition-colors cursor-pointer"
                            aria-label="Close Menu"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1 font-extrabold text-[16px] text-gray-800 py-1">
                        {navData.map((item, index) => {
                            const path = `/${item.toLowerCase().replace(' ', '-')}`;
                            return (
                                <a
                                    key={index}
                                    href={path}
                                    className="hover:text-[#F96E8F] hover:bg-pink-50 px-3 py-2.5 rounded-xl transition-colors uppercase font-bold cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        window.history.pushState({}, '', path);
                                        window.dispatchEvent(new Event('popstate'));
                                    }}
                                >
                                    {item}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
