import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { gridItems } from '../data/shopproducts';
import ornaments from '../assets/Homepage/Ornaments.png';
import car from '../assets/Homepage/car.png';
import cloudDwn from '../assets/Homepage/cloud-dwn.png';
import cloudDwn1 from '../assets/Homepage/Cloud-dwn1.png';
import cloud from '../assets/Homepage/cloud.png';
import flying from '../assets/Homepage/flying.png';
import wave from '../assets/Homepage/wave.png';
import wave1 from '../assets/Homepage/wave1.png';
import logo from '../assets/Homepage/logo.png';
import bunnyLogo from '../assets/Homepage/logobunny.png';
import butterfly from '../assets/Homepage/bflyleft.png';
import featuredBanner from '../assets/Homepage/hero-banner.png';
import ProductCard from '../components/ProductCard';
import leftarrow from '../assets/Homepage/arrow-l.png';
import rightarrow from '../assets/Homepage/arrow-r.png';
import flower from '../assets/Homepage/flashsale/flower.png';
import boy from '../assets/Homepage/flashsale/boy.png';
import girl from '../assets/Homepage/flashsale/girl.jpg';
import shopbg from '../assets/shop/shop-bg.png';
import fly from '../assets/Homepage/fly.png';

// Carousel Images
import c1 from '../assets/Homepage/carousel/c1.jpg';
import c3 from '../assets/Homepage/carousel/c3.jpg';
import c4 from '../assets/Homepage/carousel/c4.jpg';
import c5 from '../assets/Homepage/carousel/c5.jpg';
import c6 from '../assets/Homepage/carousel/c6.jpg';
import c7 from '../assets/Homepage/carousel/c7.jpg';

// Gallery Assets
import galleryBunny from '../assets/gallery/PEEKAABOO.png';
import galleryFlower from '../assets/gallery/flower.png';
import g1 from '../assets/gallery/g1.png';
import g2 from '../assets/gallery/g2.png';
import g3 from '../assets/gallery/g3.png';

// Last-minute Requests Assets
import requestBg from '../assets/Homepage/homepage.png';
import requestRightBunny from '../assets/Homepage/image.png';
import requestButterflyRight from '../assets/Homepage/bflyright.png';
import bunny from '../assets/Homepage/bunny.png';

const instagramFeeds = [c1, c3, c4, c5, c6, c7];

const testimonialsData = [
    // Page 1
    {
        text: "I stumbled upon this fashion shop while walking down the street and I am so glad I did! The clothes are chic and fashionable without being too over-the-top. I appreciate that the styles are versatile and can be dressed up or down. The prices are also very reasonable",
        stars: 5,
        color: "#FBC75B",
        name: "Kathy Harper",
        role: "Psychologist",
        avatar: "https://i.pravatar.cc/150?img=44"
    },
    {
        text: "I am a frequent shopper at this fashion shop and I can't say enough good things about it! The clothes are always on-trend and the quality is fantastic. I also appreciate that they offer a range of sizes, including plus sizes. I always leave this store feeling happy and satisfied.",
        stars: 5,
        color: "#FF95B2",
        name: "Sandra Ward",
        role: "Counselor",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        text: "\"I recently discovered this fashion shop and I am obsessed! The clothes are of great quality and the designs are unique and stylish. I always receive compliments whenever I wear something from this store. Definitely my new go-to for trendy outfits.\"",
        stars: 4,
        color: "#8FDCFC",
        name: "Linda Adams",
        role: "Future mom",
        avatar: "https://i.pravatar.cc/150?img=9"
    },
    // Page 2
    {
        text: "The quality of the baby clothes here is unmatched. They are so soft and comfortable for my little one. The vibrant colors haven't faded after dozens of washes. Highly recommended for any new parent!",
        stars: 5,
        color: "#FBC75B",
        name: "Emily Chen",
        role: "Mother of two",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        text: "Great customer service and fast shipping! I needed a gift for a baby shower last minute, and they helped me pick the perfect outfit. The packaging was beautiful and the parents loved it.",
        stars: 5,
        color: "#FF95B2",
        name: "Michael Torres",
        role: "Uncle",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        text: "I love the variety of themes they have for different seasons. The summer collection is incredibly adorable. My kids always look forward to wearing their new clothes from Pee-Kaa-Boo.",
        stars: 4,
        color: "#8FDCFC",
        name: "Sarah Jenkins",
        role: "Fashion Blogger",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    // Page 3
    {
        text: "I was skeptical about buying clothes online, but the sizing guide was perfectly accurate. Everything fits perfectly and looks exactly like the pictures. I will definitely be ordering again soon.",
        stars: 5,
        color: "#FBC75B",
        name: "David Kim",
        role: "Father",
        avatar: "https://i.pravatar.cc/150?img=15"
    },
    {
        text: "The accessories are just as cute as the clothes. I bought matching headbands for my twin girls and they are adorable. The material is gentle on their skin and stays in place all day.",
        stars: 5,
        color: "#FF95B2",
        name: "Amanda Lewis",
        role: "Photographer",
        avatar: "https://i.pravatar.cc/150?img=16"
    },
    {
        text: "This is the only place I shop for my kids now. The durability of these clothes is impressive. They survive playground tumbles, messy eaters, and endless washing cycles while still looking fresh.",
        stars: 5,
        color: "#8FDCFC",
        name: "Jessica Brown",
        role: "Teacher",
        avatar: "https://i.pravatar.cc/150?img=20"
    }
];

// Section 3 Assets
import section3Bg from '../assets/Homepage/Section3/footer-bg.png';
import section3Rabbit from '../assets/Homepage/Section3/PEEKAABOO (2) 1.png';
import section3Baby from '../assets/Homepage/Section3/baby.png';
import section3Butterfly from '../assets/Homepage/Section3/butterfly-skin.png';
import section3Glp from '../assets/Homepage/Section3/glp.png';
import section3Iso from '../assets/Homepage/Section3/iso.png';
import section3Tested from '../assets/Homepage/Section3/tested.png';
import wlist from '../assets/shop/wlist.png';

const Homepage = ({ cartItems, wishlistCount, addToCart, wishlist, onAddToWishlist }) => {
    const [activeCategory, setActiveCategory] = useState('All Items');
    const [currentIndex, setCurrentIndex] = useState(0);

    const categories = ['All Items', 'Boys Collections', 'Girls Collections', 'Just Born Collections'];

    const [wishlistToast, setWishlistToast] = useState(null);

    useEffect(() => {
        if (wishlistToast) {
            const timer = setTimeout(() => {
                setWishlistToast(null);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [wishlistToast]);

    const handleWishlistClick = (product) => {
        const isRemoving = wishlist?.some(w => (w.id && product.id ? w.id === product.id : w.title === product.title));
        if (onAddToWishlist) {
            onAddToWishlist(product);
        }
        setWishlistToast({
            action: isRemoving ? 'removed' : 'added'
        });
    };


    // Filter products (exclude banners)
    const products = gridItems.filter(item => item.type === 'product');
    const filteredProducts = activeCategory === 'All Items'
        ? products
        : products.filter(item => item.category === activeCategory);

    // Get top 3 for display
    const displayProducts = filteredProducts.slice(currentIndex, currentIndex + 3);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
    const [isLargeTablet, setIsLargeTablet] = useState(window.innerWidth >= 1024 && window.innerWidth < 1280);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
            setIsLargeTablet(window.innerWidth >= 1024 && window.innerWidth < 1280);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(Math.max(0, filteredProducts.length - (isMobile ? 1 : isTablet ? 2 : 3)), prev + 1));
    };

    const [flashSaleIndex, setFlashSaleIndex] = useState(0);
    const handleFlashPrev = () => setFlashSaleIndex(prev => Math.max(0, prev - 1));
    const handleFlashNext = () => setFlashSaleIndex(prev => Math.min(Math.max(0, products.length - (isMobile ? 1 : isTablet ? 2 : 3)), prev + 1));
    const displayFlashProducts = products.slice(flashSaleIndex, flashSaleIndex + 3);

    const [trendingCategory, setTrendingCategory] = useState('All Items');
    const [trendingIndex, setTrendingIndex] = useState(0);
    const trendingProducts = trendingCategory === 'All Items'
        ? products
        : products.filter(item => item.category === trendingCategory);
    const displayTrendingProducts = trendingProducts.slice(0, 5);

    const [testimonialPage, setTestimonialPage] = useState(0);
    const displayTestimonials = isMobile
        ? testimonialsData.slice(testimonialPage, testimonialPage + 1)
        : isTablet || isLargeTablet
            ? testimonialsData.slice(testimonialPage, testimonialPage + 2)
            : testimonialsData.slice(testimonialPage * 3, testimonialPage * 3 + 3);

    const [gallerySlide, setGallerySlide] = useState(0);
    const handleGalleryNext = () => setGallerySlide(prev => (prev + 1) % 3);
    const handleGalleryPrev = () => setGallerySlide(prev => (prev === 0 ? 2 : prev - 1));

    // Auto-swipe gallery slides every 3 seconds on mobile
    useEffect(() => {
        const timer = setInterval(() => {
            setGallerySlide(prev => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(timer);
    }, [gallerySlide]);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (onSwipeLeft, onSwipeRight) => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance && onSwipeLeft) {
            onSwipeLeft();
        }
        if (distance < -minSwipeDistance && onSwipeRight) {
            onSwipeRight();
        }
    };



    return (
        <div className="w-full font-['Nunito'] overflow-x-hidden flex flex-col bg-white">
            <div
                className="w-full min-h-[85dvh] lg:h-auto lg:min-h-[990px] xl:h-[100dvh] xl:min-h-[100dvh] relative overflow-hidden flex flex-col pb-20 xl:pb-0"
                style={{ backgroundColor: '#C3EFFF' }}
            >
                {/* Top Left Cloud Background for Logo Area (Desktop only) */}
                <img
                    src={cloud}
                    alt="Cloud"
                    className="hidden lg:block absolute top-0 left-0 w-[400px] object-contain opacity-70 pointer-events-none -translate-y-4 -translate-x-4 z-10"
                />

                {/* Bottom Wave Border */}
                <img src={wave} alt='wave' className='hidden lg:block absolute bottom-0 left-0 w-[100%] h-auto object-contain z-100 pointer-events-none' />
                <img src={wave1} alt='wave' className='block lg:hidden absolute bottom-0 left-0 w-[100%] h-auto object-contain z-50 pointer-events-none' />

                {/* Mobile Top Center Cloud Background */}
                <img
                    src={cloud}
                    alt="Cloud Background"
                    className="block lg:hidden absolute top-[-30px] left-1/2 -translate-x-1/2 w-[300px] object-contain z-40 pointer-events-none opacity-90"
                />


                {/* Header */}
                <div className="relative z-50">
                    <Header cartItems={cartItems} wishlistCount={wishlistCount} customLogo={logo} />
                </div>

                {/* Mobile Responsive Hero Content (Matching mobile design exactly) */}
                <div className="flex lg:hidden flex-1 w-full flex-col relative z-20 justify-between pb-4">


                    {/* Heading & Subtitle */}
                    <div className="w-full px-6 pt-6 pb-1 flex flex-col items-start z-30">
                        <h1 className="text-[#1e293b] font-['Baloo_2'] font-black text-4xl sm:text-5xl leading-[1.1] mb-2 tracking-tight">
                            Best Kids Store <br />
                            & <span className="text-[#F96E8F]">Online Shop</span>
                        </h1>
                        <p className="text-[#1e293b] font-['Baloo_2'] font-extrabold text-base sm:text-lg mb-5">
                            Give The Gift Of Your Children Everyday
                        </p>
                    </div>

                    {/* Visual Area: Button, Jewelry, Car, Airplane, Clouds */}
                    <div className="flex-1 w-full relative px-6 z-20 min-h-[420px] pb-6">
                        {/* Shop This Now Button */}
                        <div className="relative z-30 inline-block">
                            <button
                                onClick={() => {
                                    window.history.pushState({}, '', '/shop');
                                    window.dispatchEvent(new Event('popstate'));
                                }}
                                className="bg-[#F96E8F] text-white px-8 py-3.5 rounded-full font-bold font-['Baloo_2'] text-lg shadow-md hover:bg-[#E44971] transition-transform active:scale-95 cursor-pointer"
                            >
                                Shop This Now
                            </button>
                        </div>

                        {/* Car Decoration Sticker (Upper Right of Jewelry) */}
                        <img
                            src={car}
                            alt="Toy Car"
                            className="absolute right-12 sm:right-16 top-[-4px] md:top-[-80px] w-[80px] sm:w-[92px] object-contain drop-shadow-sm z-30"
                        />

                        {/* Jewelry Ornaments */}
                        <div className="absolute left-1/2 -translate-x-[47%] top-16 md:top-[-40px] lg:top-2 w-[380px] sm:w-[360px] md:w-[500px] max-w-[88%] z-20">
                            <img
                                src={ornaments}
                                alt="Jewelry Ornaments"
                                className="w-full h-auto object-contain drop-shadow-xl"
                            />
                        </div>

                        {/* Flying Airplane Sticker */}
                        <img
                            src={flying}
                            alt="Airplane"
                            className="absolute lg:bottom-6 -bottom-40 right-4 lg:right-5 w-[115px] sm:w-[130px] object-contain z-30 pointer-events-none"
                        />

                        {/* Bottom Cloud */}
                        <img
                            src={cloudDwn}
                            alt="Cloud"
                            className="absolute -bottom-32 right-[-50px] lg:right-0 xl:right-0 w-[280px] sm:w-[340px] object-contain opacity-95 z-20 pointer-events-none"
                        />
                    </div>
                </div>

                {/* Desktop Main Hero Content (Preserved 100% untouched) */}
                <div className="hidden lg:flex flex-1 w-full max-w-[1920px] mx-auto px-6 md:px-20 lg:px-32 flex-row items-center justify-between relative z-20">
                    {/* Left Column (Text & Button) */}
                    <div className="w-[45%] flex flex-col justify-center items-start -mt-[200px] relative z-30">
                        <h1 className="text-[#333333] font-['Baloo_2'] font-extrabold text-5xl xl:text-5xl min-[1366px]:text-7xl leading-[1.1] mb-6">
                            Best Kids Store <br />
                            & <span className="text-[#F96E8F]">Online Shop</span>
                        </h1>
                        <p className="text-gray-800 font-['Baloo_2'] font-bold text-lg xl:text-xl min-[1366px]:text-2xl mb-10">
                            Give The Gift Of Your Children Everyday
                        </p>
                        <button
                            onClick={() => {
                                window.history.pushState({}, '', '/shop');
                                window.dispatchEvent(new Event('popstate'));
                            }}
                            className="bg-[#F96E8F] text-white px-10 py-3.5 rounded-full font-bold font-['Baloo_2'] text-xl shadow-lg hover:bg-[#E44971] transition-transform hover:scale-105 cursor-pointer"
                        >
                            Shop This Now
                        </button>

                        {/* Car Decoration */}
                        <img
                            src={car}
                            alt="Car"
                            className="w-[120px] mt-16 ml-4 object-contain"
                        />
                    </div>

                    {/* Right Column (Jewelry Ornaments) */}
                    <div className="lg:w-[80%] xl:w-[65%] flex justify-end items-center relative lg:mr-0 xl:mr-36 -mt-4 z-120">
                        <img
                            src={ornaments}
                            alt="Jewelry"
                            className="w-full lg:max-w-[800px] xl:max-w-[530px] rotate-[-10.24deg] object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Desktop Flying Airplane Decoration (Bottom Right) */}
                <img
                    src={flying}
                    alt="Airplane"
                    className="hidden lg:block absolute -bottom-30 right-16 w-[250px] object-contain z-50 pointer-events-none"
                />

                {/* Desktop Bottom Cloud Border */}
                <img
                    src={cloudDwn}
                    alt="Cloud Border"
                    className="hidden lg:block absolute -bottom-[80px] right-0 h-auto w-[470px] object-fill z-40 pointer-events-none"
                />

                {/* Global style for slow bounce animation */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow infinite ease-in-out;
                }
            `}} />
            </div> {/* End of Hero Section */}

            {/* Top Selling Products Section */}
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 pt-8 pb-6 md:pt-12 md:pb-8 lg:pt-14 lg:pb-10 relative bg-white">
                <img src={butterfly} alt="Butterfly" className="hidden md:block absolute top-10 lg:top-2 xl:top-10 right-10 w-[60px] md:w-[100px] lg:w-[75px] xl:w-[100px] object-contain rotate-12 z-10 pointer-events-none" />

                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 relative z-20 items-stretch">

                    {/* Featured Card */}
                    <div className="lg:ml-0 mx-auto xl:mx-0 w-full xl:w-[25%] xl:h-[500px] rounded-[30px] overflow-hidden relative min-h-[480px] xl:min-h-0 ">
                        <img src={featuredBanner} alt="Kids Collection" className="absolute inset-0 w-full h-full object-cover" />

                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center -mt-[200px] p-6">
                            <span className="text-white text-xs font-['Baloo_2'] font-black tracking-[0.2em] mb-4 uppercase shadow-sm">Featured</span>
                            <h2 className="text-white text-3xl font-['Baloo_2'] md:text-3xl font-extrabold leading-tight mb-8 font-['Nunito'] drop-shadow-md">
                                Kids Collection <br /> For Summer
                            </h2>
                            <button
                                onClick={() => {
                                    window.history.pushState({}, '', '/shop');
                                    window.dispatchEvent(new Event('popstate'));
                                }}
                                className="bg-white text-[#F96E8F] px-8 py-2.5 rounded-full font-['Baloo_2'] text-sm lg:text-base font-bold border-2 border-dashed border-[#F76188] shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                View Shop
                            </button>
                        </div>
                    </div>

                    {/* Products Area */}
                    <div className="flex-1 flex flex-col">

                        {/* Header & Arrows */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center  mb-6 gap-4">
                            <h2 className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold text-gray-900 font-['Baloo_2'] tracking-tight">
                                <div>Top Selling <span className="text-[#F96E8F]">products</span></div>
                                <img src={butterfly} alt="Butterfly" className="md:hidden w-[40px] object-contain rotate-12" />
                            </h2>
                            <div className="hidden md:flex items-center gap-2 mr-[100px]">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className={`w-10 h-10 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center text-gray-400 transition-colors shadow-sm ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer'}`}>
                                    <img src={leftarrow} alt="leftarrow" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex >= filteredProducts.length - (isMobile ? 1 : isTablet ? 2 : 3)}
                                    className={`w-10 h-10 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center text-gray-400 transition-colors shadow-sm ${currentIndex >= filteredProducts.length - (isMobile ? 1 : isTablet ? 2 : 3) ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer'}`}>
                                    <img src={rightarrow} alt="rightarrow" />
                                </button>
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-nowrap md:flex-wrap items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setCurrentIndex(0);
                                    }}
                                    className={`px-6 py-2.5 rounded-full font-['Baloo_2'] font-bold text-base transition-all border-[1.5px] cursor-pointer shadow-xs whitespace-nowrap flex-shrink-0 ${activeCategory === cat
                                        ? 'bg-[#F96E8F] text-white border-[#F96E8F]'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#F96E8F] hover:text-[#F96E8F]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Product Cards Grid */}
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-8 max-w-[1000px] mx-auto md:mx-0 w-full"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={() => onTouchEnd(handleNext, handlePrev)}
                        >
                            {(isMobile ? displayProducts.slice(0, 1) : isTablet ? displayProducts.slice(0, 2) : displayProducts).map(product => (
                                <div key={product.id} className="animate-fade-in">
                                    <ProductCard
                                        isHomepage={true}
                                        item={product}
                                        heightClass="h-[420px] sm:h-[420px] md:h-[360px] xl:h-[320px] min-[1366px]:h-[360px]"
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                        oldPrice={product.oldPrice}
                                        theme={product.theme}
                                        category={product.category}
                                        onAddToCart={() => addToCart && addToCart(product)}
                                        onAddToWishlist={() => handleWishlistClick(product)}
                                        isWishlisted={wishlist?.some(w => w.id === product.id || w.title === product.title)}
                                        onClick={() => {
                                            window.history.pushState({}, '', '/product');
                                            window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: product }));
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Pagination Dots */}
                        {isMobile && filteredProducts.length > 1 && (
                            <div className="md:hidden flex justify-center items-center gap-2 mt-6">
                                {Array.from({ length: filteredProducts.length }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${currentIndex === idx ? 'bg-[#F96E8F]' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>


            {/* Certification Section */}
            <div className="w-full relative mt-6 md:mt-10 flex justify-center items-center py-20 md:py-28 px-4 md:px-[128px] lg:px-[200px]"
                style={{
                    backgroundImage: `url(${section3Bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Airplane */}
                <img src={fly} alt="Airplane" className="absolute top-10 md:top-14 left-6 md:left-10 w-24 md:w-[280px] z-10 animate-bounce-slow" />

                {/* Main Box */}
                <div className="relative w-full min-h-[250px] border-[6px] border-[#333333] rounded-[30px] md:rounded-[40px] py-10 md:py-14 px-6 md:px-16 flex flex-col md:flex-row justify-center items-center z-20 mt-8 md:mt-10">

                    {/* Title overlapping border */}
                    <div className="absolute -top-[24px] md:-top-[28px] lg:-top-[24px] xl:-top-[32px] left-1/2 -translate-x-1/2 bg-[#FCDCEA] px-6 md:px-8 lg:px-6 xl:px-10 py-1.5 lg:py-1 xl:py-2 border-[4px] lg:border-[3px] xl:border-[4px] border-[#333333] rounded-2xl md:rounded-[24px] xl:rounded-[30px] whitespace-nowrap z-30">
                        <h2 className="text-xl md:text-4xl lg:text-3xl xl:text-5xl font-['Baloo_2'] font-bold text-[#333333] flex items-center gap-2 font-['Lobster_Two']">
                            Certified Big Care for Little <span className="text-[#F96E8F]">Jewellery</span>
                        </h2>
                    </div>

                    {/* Desktop Logos (Static Flex Row - Preserved 100% on md and up) */}
                    <div className="hidden md:flex w-full flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 xl:gap-30 md:pr-[20px]">
                        <img src={section3Tested} alt="Dermatologically Tested" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Glp} alt="GLP" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Butterfly} alt="Sensitive Skin" className="h-28 md:h-[160px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Iso} alt="ISO" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Baby} alt="Minor Skin Safe" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                    </div>

                    {/* Mobile Auto-Scrolling Carousel (Only on mobile responsive) */}
                    <div className="w-full overflow-hidden md:hidden py-2 relative z-20" style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
                    }}>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @keyframes cert-scroll {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            .animate-cert-scroll {
                                animation: cert-scroll 18s linear infinite;
                            }
                            .animate-cert-scroll:hover,
                            .animate-cert-scroll:active {
                                animation-play-state: paused;
                            }
                        `}} />
                        <div className="flex w-max items-center gap-8 animate-cert-scroll">
                            {[
                                { src: section3Tested, alt: "Dermatologically Tested", h: "h-20" },
                                { src: section3Glp, alt: "GLP", h: "h-20" },
                                { src: section3Butterfly, alt: "Sensitive Skin", h: "h-24" },
                                { src: section3Iso, alt: "ISO", h: "h-20" },
                                { src: section3Baby, alt: "Minor Skin Safe", h: "h-20" },
                                { src: section3Tested, alt: "Dermatologically Tested", h: "h-20" },
                                { src: section3Glp, alt: "GLP", h: "h-20" },
                                { src: section3Butterfly, alt: "Sensitive Skin", h: "h-24" },
                                { src: section3Iso, alt: "ISO", h: "h-20" },
                                { src: section3Baby, alt: "Minor Skin Safe", h: "h-20" },
                                { src: section3Tested, alt: "Dermatologically Tested", h: "h-20" },
                                { src: section3Glp, alt: "GLP", h: "h-20" },
                                { src: section3Butterfly, alt: "Sensitive Skin", h: "h-24" },
                                { src: section3Iso, alt: "ISO", h: "h-20" },
                                { src: section3Baby, alt: "Minor Skin Safe", h: "h-20" },
                                { src: section3Tested, alt: "Dermatologically Tested", h: "h-20" },
                                { src: section3Glp, alt: "GLP", h: "h-20" },
                                { src: section3Butterfly, alt: "Sensitive Skin", h: "h-24" },
                                { src: section3Iso, alt: "ISO", h: "h-20" },
                                { src: section3Baby, alt: "Minor Skin Safe", h: "h-20" },
                            ].map((logo, idx) => (
                                <div key={idx} className="flex-shrink-0 flex items-center justify-center px-1">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className={`${logo.h} object-contain`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rabbit Image */}
                    <img src={section3Rabbit} alt="Rabbit Mascot" className="absolute -right-6 md:-right-34 bottom-0 translate-y-[20%] h-40 md:h-[280px] object-contain z-30 pointer-events-none" />
                </div>
            </div>
            {/* Flash Sale Section */}
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 pt-8 pb-6 md:pt-12 md:pb-8 lg:pt-14 lg:pb-10 relative bg-white border-t border-gray-100 mt-6 md:mt-8">
                <div className="flex flex-col xl:flex-row gap-8 items-stretch">
                    {/* Left Column (Header + Products) */}
                    <div className="w-full xl:w-[65%] flex flex-col">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <div className="flex items-center gap-4">
                                <img src={flower} alt="flower" className="w-[45px] md:w-[65px] object-contain" />
                                <h2 className="text-2xl md:text-3xl font-['Baloo_2'] font-black text-[#333333] tracking-tight">
                                    Flash <span className="text-[#F96E8F]">Sale</span>
                                </h2>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button
                                    onClick={handleFlashPrev}
                                    disabled={flashSaleIndex === 0}
                                    className={`w-11 h-11 rounded-full border-[2px] border-gray-300 flex items-center justify-center text-gray-400 transition-all shadow-sm ${flashSaleIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer hover:shadow-md'}`}>
                                    <img src={leftarrow} alt="leftarrow" />
                                </button>
                                <button
                                    onClick={handleFlashNext}
                                    disabled={flashSaleIndex >= products.length - (isMobile ? 1 : isTablet ? 2 : 3)}
                                    className={`w-11 h-11 rounded-full border-[2px] border-gray-300 flex items-center justify-center text-gray-400 transition-all shadow-sm ${flashSaleIndex >= products.length - (isMobile ? 1 : isTablet ? 2 : 3) ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer hover:shadow-md'}`}>
                                    <img src={rightarrow} alt="rightarrow" />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={() => onTouchEnd(handleFlashNext, handleFlashPrev)}
                        >
                            {(isMobile ? products.slice(flashSaleIndex, flashSaleIndex + 1) : isTablet ? products.slice(flashSaleIndex, flashSaleIndex + 2) : displayFlashProducts).map(product => (
                                <div key={product.id + 'flash'} className="animate-fade-in">
                                    <ProductCard
                                        isHomepage={true}
                                        item={product}
                                        heightClass="h-[420px] sm:h-[420px] md:h-[360px] xl:h-[320px] min-[1366px]:h-[360px]"
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                        oldPrice={product.oldPrice}
                                        theme={product.theme}
                                        category={product.category}
                                        onAddToCart={() => addToCart && addToCart(product)}
                                        onAddToWishlist={() => handleWishlistClick(product)}
                                        isWishlisted={wishlist?.some(w => w.id === product.id || w.title === product.title)}
                                        onClick={() => {
                                            window.history.pushState({}, '', '/product');
                                            window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: product }));
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Pagination Dots */}
                        {isMobile && products.length > 1 && (
                            <div className="md:hidden flex justify-center items-center gap-2 mt-6 mb-2">
                                {Array.from({ length: products.length }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setFlashSaleIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${flashSaleIndex === idx ? 'bg-[#F96E8F]' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Banners */}
                    <div className="w-full xl:w-[35%] flex flex-col gap-6">
                        {/* Girls Collection Banner */}
                        <div className="flex-1 bg-[#FFB7D5]/40 rounded-[28px] overflow-hidden relative flex items-center p-6 lg:p-8">
                            <div className="relative z-20 flex flex-col items-start max-w-[65%] lg:max-w-[55%]">
                                <h3 className="text-3xl sm:text-3xl lg:text-3xl font-black text-gray-900 font-['Lobster_Two'] leading-tight mb-2 tracking-wide">
                                    Girls Collections
                                </h3>
                                <p className="text-gray-700 font-bold text-sm sm:text-base mb-4">
                                    Get an extra 30% discount
                                </p>
                                <button
                                    onClick={() => {
                                        window.history.pushState({}, '', '/shop/girls');
                                        window.dispatchEvent(new Event('popstate'));
                                    }}
                                    className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white border-2 border-dashed border-[#F96E8F] text-[#F96E8F] font-['Baloo_2'] font-black rounded-full text-xs sm:text-xs hover:bg-[#F96E8F] hover:text-white transition-colors hover:border-solid shadow-sm cursor-pointer"
                                >
                                    View Shop
                                </button>
                            </div>
                            <img src={girl} alt="Girls Collection" className="absolute right-0 bottom-0 h-full w-[220px] sm:w-[260px] lg:w-[240px] object-cover object-left mask-image-linear z-10 rounded-br-[28px]" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }} />
                        </div>

                        {/* Boys Collection Banner */}
                        <div className="flex-1 bg-[#85CDFD]/40 rounded-[28px] overflow-hidden relative flex items-center p-6 lg:p-8">
                            <div className="relative z-20 flex flex-col items-start max-w-[65%] lg:max-w-[55%]">
                                <h3 className="text-3xl sm:text-3xl lg:text-3xl font-black text-gray-900 font-['Lobster_Two'] leading-tight mb-2 tracking-wide">
                                    Boys Collections
                                </h3>
                                <p className="text-gray-700 font-bold text-sm sm:text-base mb-4">
                                    Get an extra 50% discount
                                </p>
                                <button
                                    onClick={() => {
                                        window.history.pushState({}, '', '/shop/boys');
                                        window.dispatchEvent(new Event('popstate'));
                                    }}
                                    className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white border-2 border-dashed border-[#F96E8F] text-[#F96E8F] font-['Baloo_2'] font-black rounded-full text-xs sm:text-xs hover:bg-[#F96E8F] hover:text-white transition-colors hover:border-solid shadow-sm cursor-pointer"
                                >
                                    View Shop
                                </button>
                            </div>
                            <img src={boy} alt="Boys Collection" className="absolute right-0 bottom-0 h-[115%] w-[220px] sm:w-[260px] lg:w-[240px] object-contain object-bottom translate-y-[8%] translate-x-[10%] z-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Products Section */}
            <div className="w-full relative pt-8 pb-[220px] md:pt-12 md:pb-[260px] lg:pt-16 lg:pb-[300px] xl:pt-20 xl:pb-[340px] min-h-[750px] md:min-h-[850px] flex flex-col items-center bg-[#E6F8FB]"
                style={{
                    backgroundImage: `url(${shopbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? '65% bottom' : 'bottom center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <img src={requestButterflyRight} alt="Butterfly" className="absolute md:-top-0 lg:top-10 right-10 w-[60px] md:w-[90px] lg:w-[140px] object-contain rotate-12 z-10 pointer-events-none" />

                <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-['Baloo_2'] tracking-tight mb-4 md:mb-8 relative z-20 self-start px-6 md:px-0 md:self-auto mt-4 md:mt-0">
                    Trending <span className="text-[#F96E8F]">products</span>
                </h2>

                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-3 mb-6 md:mb-12 relative z-20 overflow-x-auto no-scrollbar w-full px-6 md:px-0 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categories.map(cat => (
                        <button
                            key={cat + 'trending'}
                            onClick={() => {
                                setTrendingCategory(cat);
                                setTrendingIndex(0);
                            }}
                            className={`px-6 py-2.5 rounded-full font-bold text-base font-['Baloo_2'] transition-all cursor-pointer shadow-sm whitespace-nowrap flex-shrink-0 ${trendingCategory === cat
                                ? 'bg-[#F96E8F] text-white'
                                : 'bg-white text-gray-700 hover:text-[#F96E8F]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 relative z-20 md:-mt-8 xl:mt-0">
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 md:max-w-[680px] lg:max-w-[850px] xl:max-w-none mx-auto"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={() => onTouchEnd(
                            () => setTrendingIndex(prev => Math.min(Math.max(0, trendingProducts.length - (isMobile ? 1 : isTablet || isLargeTablet ? 2 : 5)), prev + 1)),
                            () => setTrendingIndex(prev => Math.max(0, prev - 1))
                        )}
                    >
                        {(isMobile ? trendingProducts.slice(trendingIndex, trendingIndex + 1) : isTablet || isLargeTablet ? trendingProducts.slice(trendingIndex, trendingIndex + 2) : displayTrendingProducts).map(product => (
                            <div key={product.id + 'trending'} className="animate-fade-in">
                                <ProductCard
                                    isHomepage={true}
                                    item={product}
                                    heightClass="h-[420px] sm:h-[420px] md:h-[360px] xl:h-[320px] min-[1366px]:h-[360px]"
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    oldPrice={product.oldPrice}
                                    theme={product.theme}
                                    category={product.category}
                                    onAddToCart={() => addToCart && addToCart(product)}
                                    onAddToWishlist={() => handleWishlistClick(product)}
                                    isWishlisted={wishlist?.some(w => w.id === product.id || w.title === product.title)}
                                    onClick={() => {
                                        window.history.pushState({}, '', '/product');
                                        window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: product }));
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile and Tablet Pagination Dots */}
                    {(isMobile || isTablet || isLargeTablet) && trendingProducts.length > (isMobile ? 1 : isTablet || isLargeTablet ? 2 : 1) && (
                        <div className="xl:hidden flex justify-center items-center gap-2 mt-8">
                            {Array.from({ length: trendingProducts.length - (isMobile ? 0 : isTablet || isLargeTablet ? 1 : 0) }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setTrendingIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${trendingIndex === idx ? 'bg-[#F96E8F]' : 'bg-gray-100'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Trending Instagram Feeds Section */}
            <div className="w-full bg-white pt-8 pb-6 md:pt-12 md:pb-8 lg:pt-14 lg:pb-10 flex flex-col items-center overflow-hidden">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes instagram-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-instagram-scroll {
                        animation: instagram-scroll 30s linear infinite;
                    }
                    .animate-instagram-scroll:hover {
                        animation-play-state: paused;
                    }
                `}} />

                <div className="text-center px-4 mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-['Baloo_2'] tracking-tight mb-4">
                        Trending <span className="text-[#F96E8F]">Instagram Feeds</span>
                    </h2>
                    <p className="text-gray-600 font-['Baloo_2'] font-bold text-sm md:text-lg">
                        Don't miss out on great promotional news or upcoming events in our store system
                    </p>
                </div>

                {/* Auto-scrolling Carousel */}
                <div className="w-full overflow-hidden">
                    <div className="flex w-max animate-instagram-scroll">
                        {[...instagramFeeds, ...instagramFeeds].map((img, index) => (
                            <div key={index} className="flex-none w-[70vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] xl:w-[16.666vw] h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
                                <img src={img} alt={`Instagram Feed ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Client Testimonials Section */}
            <div className="w-full relative pt-10 pb-8 md:pt-14 md:pb-10 lg:pt-16 lg:pb-12 bg-gradient-to-r from-[#F7FCFD] to-[#E9F9FA] flex flex-col items-center overflow-hidden">
                {/* Decorative Images */}
                <img src={butterfly} alt="Butterfly" className="absolute top-10 left-10 w-[80px] md:w-[120px] object-contain pointer-events-none drop-shadow-sm" />
                <img src={car} alt="Car" className="absolute bottom-10 right-10 w-[80px] md:w-[100px] object-contain pointer-events-none drop-shadow-sm z-10" />

                {/* Header */}
                <div className="text-center px-4 mb-16 relative z-20">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-['Baloo_2'] tracking-tight mb-4">
                        Client <span className="text-[#F96E8F]">Testimonials</span>
                    </h2>
                    <p className="text-gray-600 font-bold font-['Baloo_2'] text-sm md:text-lg">
                        What Customers Say About Us What Customers Say About Us
                    </p>
                </div>

                {/* Cards */}
                <div
                    className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 relative z-20"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={() => onTouchEnd(
                        () => setTestimonialPage(prev => Math.min(prev + 1, isMobile ? testimonialsData.length - 1 : isTablet || isLargeTablet ? testimonialsData.length - 2 : 2)),
                        () => setTestimonialPage(prev => Math.max(prev - 1, 0))
                    )}
                >
                    {displayTestimonials.map((testimonial, idx) => (
                        <div key={idx} className="flex flex-col items-center relative animate-fade-in">
                            <div className="w-full rounded-[24px] p-8 md:p-10 lg:p-6 xl:p-10 relative mb-12 shadow-sm" style={{ backgroundColor: testimonial.color }}>
                                <p className="text-white font-['Baloo_2'] font-bold text-sm md:text-lg lg:text-sm xl:text-lg leading-relaxed mb-6 lg:mb-4 xl:mb-6">
                                    {testimonial.text}
                                </p>
                                <div className="flex gap-1 text-white">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-5 h-5 fill-current ${i < testimonial.stars ? 'opacity-100' : 'opacity-30'}`} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <svg className="absolute -bottom-[23px] right-12 w-[30px] h-[30px] fill-current drop-shadow-sm" style={{ color: testimonial.color }} viewBox="0 0 30 30">
                                    <path d="M0 0 C 0 15, 10 30, 30 30 L 30 0 Z" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-4 w-full pl-8">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                                <div>
                                    <h4 className="text-[#1C2C5E] font-black text-lg">{testimonial.name}</h4>
                                    <p className="text-gray-500 font-bold text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex gap-2 mt-8 md:mt-10 relative z-20 flex-wrap justify-center px-4">
                    {Array.from({ length: isMobile ? testimonialsData.length : isTablet || isLargeTablet ? testimonialsData.length - 1 : 3 }).map((_, pageIndex) => (
                        <button
                            key={pageIndex}
                            onClick={() => setTestimonialPage(pageIndex)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-colors flex-shrink-0 ${testimonialPage === pageIndex
                                ? 'bg-[#F96E8F]'
                                : 'bg-transparent border-[1.5px] border-[#F96E8F] hover:bg-[#F96E8F]/30'
                                }`}
                            aria-label={`Go to testimonial page ${pageIndex + 1}`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Gallery Section */}
            <div className="w-full relative pt-16 pb-6 md:pt-32 lg:pt-36 md:pb-8 lg:pb-10 bg-white flex justify-center overflow-visible">
                {/* Desktop Grid (Preserved 100% on md and up) */}
                <div className="hidden md:grid w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 grid-cols-2 gap-4 md:gap-6 h-auto md:h-[400px] lg:h-[450px] xl:h-[500px] relative z-20">
                    {/* Decorative Elements */}
                    <div className="absolute -left-2 sm:left-6 md:left-14 lg:left-20 -top-16 sm:-top-20 md:-top-[125px] z-10 pointer-events-none">
                        <img src={galleryBunny} alt="Bunny" className="w-[55px] md:w-[85px] object-contain drop-shadow-md" />
                    </div>
                    <div className="absolute -left-6 md:-left-12 top-1/3 z-30 pointer-events-none hidden sm:block">
                        <img src={galleryFlower} alt="Flower" className="w-[50px] md:w-[70px] object-contain drop-shadow-md" />
                    </div>

                    {/* Left Side: Large Image */}
                    <div className="w-full h-[300px] sm:h-[400px] md:h-full rounded-[24px] bg-[#F379A7] overflow-hidden shadow-sm relative z-20">
                        <img src={g1} alt="Girl in Pink Beret" className="w-full h-auto object-fill" />
                    </div>

                    {/* Right Side: Stack of 2 Images */}
                    <div className="w-full h-[200px] sm:h-[300px] md:h-full flex flex-col gap-4 md:gap-6 relative z-20">
                        <div className="flex-1 rounded-[24px] overflow-hidden shadow-sm">
                            <img src={g2} alt="Girl smiling" className="w-full h-full object-cover " />
                        </div>
                        <div className="flex-1 rounded-[24px] overflow-hidden shadow-sm">
                            <img src={g3} alt="Baby with jewelry" className="w-full h-full object-cover " />
                        </div>
                    </div>
                </div>

                {/* Mobile Swiper (Only on mobile responsive) */}
                <div className="md:hidden w-full max-w-[500px] mx-auto px-5 sm:px-8 relative z-20 flex flex-col items-center">
                    {/* Decorative Bunny (Placed on backside of swiper card) */}
                    <div className="absolute left-6 sm:left-9 -top-12 sm:-top-14 z-10 pointer-events-none">
                        <img src={galleryBunny} alt="Bunny" className="w-[55px] sm:w-[65px] object-contain drop-shadow-md" />
                    </div>

                    {/* Swiper Slider Card */}
                    <div
                        className="w-full relative z-20 overflow-hidden rounded-[24px] shadow-sm bg-white"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={() => onTouchEnd(handleGalleryNext, handleGalleryPrev)}
                    >
                        <div
                            className="flex transition-transform duration-300 ease-out"
                            style={{ transform: `translateX(-${gallerySlide * 100}%)` }}
                        >
                            {/* Slide 1: g1 */}
                            <div className="w-full flex-shrink-0 h-[320px] sm:h-[380px] rounded-[24px] bg-[#F379A7] overflow-hidden relative flex items-center justify-center">
                                <img src={g1} alt="Girl in Pink Beret" className="w-full h-full object-cover" />
                            </div>

                            {/* Slide 2: g2 */}
                            <div className="w-full flex-shrink-0 h-[320px] sm:h-[380px] rounded-[24px] bg-gray-50 overflow-hidden relative flex items-center justify-center">
                                <img src={g2} alt="Girl smiling" className="w-full h-full object-cover" />
                            </div>

                            {/* Slide 3: g3 */}
                            <div className="w-full flex-shrink-0 h-[320px] sm:h-[380px] rounded-[24px] bg-gray-50 overflow-hidden relative flex items-center justify-center">
                                <img src={g3} alt="Baby with jewelry" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center items-center gap-2 mt-4">
                        {[0, 1, 2].map(idx => (
                            <button
                                key={idx}
                                onClick={() => setGallerySlide(idx)}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${gallerySlide === idx
                                        ? 'w-6 h-2 bg-[#F96E8F]'
                                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Last-minute Requests Section */}
            <div className="w-full relative pt-[160px] pb-[120px] md:pt-12 md:pb-10 lg:pt-16 lg:pb-12 flex flex-col items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `url(${requestBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Left Butterfly (Top Centered on mobile) */}
                <img src={butterfly} alt="Butterfly" className="absolute top-[6%] md:top-[10%] lg:top-[15%] left-1/2 md:left-[10%] lg:left-[15%] -translate-x-1/2 md:-translate-x-0 w-[60px] md:w-[100px] object-contain rotate-12 z-10 animate-bounce-slow" />

                {/* Right Butterfly (Bottom Right on mobile) */}
                <img src={requestButterflyRight} alt="Butterfly" className="absolute bottom-[28%] md:bottom-auto md:top-[15%] lg:top-[20%] right-[8%] md:right-[10%] lg:right-[15%] w-[45px] md:w-[80px] object-contain -rotate-12 z-10 animate-bounce-slow" />

                {/* Left Bunny (Top Left on mobile) */}
                <img src={bunny} alt="Bunny Left" className="last-minute-bunny-left absolute top-[12%] md:top-auto bottom-auto md:bottom-0 left-[5%] md:left-[2%] lg:left-[5%] w-[140px] md:w-[220px] object-contain z-20 pointer-events-none" />

                <img src={cloudDwn1} alt='cloud' className='absolute -bottom-[0%] lg:-bottom-[3%] -right-[15%] lg:-right-[76px] w-[360px] md:w-[600px] object-contain z-10 animate-bounce-slow' />

                {/* Right Bunny */}
                <img src={requestRightBunny} alt="Bunny Right" className="last-minute-bunny-right absolute bottom-3 md:top-auto md:bottom-0 right-1/4 translate-x-[38%] md:translate-x-0 md:right-[2%] lg:right-[5%] w-[230px] md:w-[280px] object-contain z-20 pointer-events-none" />

                {/* Content */}
                <div className="relative z-30 flex flex-col items-center text-center max-w-[800px] px-6 mt-10 md:mt-0">
                    {/* Logo mark */}
                    <div className="w-[190px] h-[190px] mb-6 flex justify-center items-center  overflow-hidden">
                        <img src={bunnyLogo} alt="Logo Mark" className="w-[180px] h-[180px] object-contain" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-[#333333] font-['Baloo_2'] mb-4">
                        Last-minute <span className="text-[#F96E8F]">Requests</span>
                    </h2>

                    <p className="text-gray-500 font-semibold text-sm md:text-lg font-['Nunito'] leading-relaxed mb-8 max-w-[700px]">
                        Cum sociis Theme natoque penatibus et magnis dis montes, semper libero nibh velit auctor parturient nascetur ridiculus mus.
                    </p>

                    <button className="bg-[#F96E8F] text-white px-10 py-3.5 rounded-[15px] font-bold text-base shadow-md hover:bg-[#E44971] transition-transform hover:scale-105 cursor-pointer">
                        Contact Us
                    </button>
                </div>
            </div>

            {/* Wishlist Added / Removed Popup Notification */}
            {wishlistToast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:w-auto z-[9999] bg-white border-[2px] ${wishlistToast.action === 'removed' ? 'border-gray-300 shadow-lg' : 'border-[#F96E8F] shadow-lg'} text-gray-800 px-5 py-4 rounded-[16px] flex items-center gap-3.5 max-w-[360px] animate-toast-up`}>
                    <div className={`w-10 h-10 rounded-[12px] ${wishlistToast.action === 'removed' ? 'bg-gray-100 text-gray-500' : 'bg-[#F96E8F]/15 text-[#F96E8F]'} flex items-center justify-center flex-shrink-0`}>
                        {wishlistToast.action === 'removed' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <img src={wlist} alt="wishlist" className="h-5" />
                        )}
                    </div>
                    <div className="flex-1 pr-2">
                        <h4 className={`font-black ${wishlistToast.action === 'removed' ? 'text-gray-700' : 'text-[#F96E8F]'} text-sm font-['Nunito'] leading-tight`}>
                            {wishlistToast.action === 'removed' ? 'Removed from Wishlist' : 'Added to Wishlist'}
                        </h4>
                    </div>
                    <button
                        onClick={() => setWishlistToast(null)}
                        className="w-7 h-7 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                    >
                        ✕
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Homepage;
