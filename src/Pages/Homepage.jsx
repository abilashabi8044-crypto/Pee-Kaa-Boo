import React, { useState } from 'react';
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
import section3Plane from '../assets/Homepage/Section3/flying.png';
import section3Baby from '../assets/Homepage/Section3/baby.png';
import section3Butterfly from '../assets/Homepage/Section3/butterfly-skin.png';
import section3Glp from '../assets/Homepage/Section3/glp.png';
import section3Iso from '../assets/Homepage/Section3/iso.png';
import section3Tested from '../assets/Homepage/Section3/tested.png';

const Homepage = ({ cartItems, wishlistCount, addToCart }) => {
    const [activeCategory, setActiveCategory] = useState('All Items');
    const [currentIndex, setCurrentIndex] = useState(0);

    const categories = ['All Items', 'Boys Collections', 'Girls Collections', 'Just Born Collections'];

    // Filter products (exclude banners)
    const products = gridItems.filter(item => item.type === 'product');
    const filteredProducts = activeCategory === 'All Items'
        ? products
        : products.filter(item => item.category === activeCategory);

    // Get top 3 for display
    const displayProducts = filteredProducts.slice(currentIndex, currentIndex + 3);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(Math.max(0, filteredProducts.length - 3), prev + 1));
    };

    const [flashSaleIndex, setFlashSaleIndex] = useState(0);
    const handleFlashPrev = () => setFlashSaleIndex(prev => Math.max(0, prev - 1));
    const handleFlashNext = () => setFlashSaleIndex(prev => Math.min(Math.max(0, products.length - 3), prev + 1));
    const displayFlashProducts = products.slice(flashSaleIndex, flashSaleIndex + 3);

    const [trendingCategory, setTrendingCategory] = useState('All Items');
    const trendingProducts = trendingCategory === 'All Items'
        ? products
        : products.filter(item => item.category === trendingCategory);
    const displayTrendingProducts = trendingProducts.slice(0, 5);

    const [testimonialPage, setTestimonialPage] = useState(0);
    const displayTestimonials = testimonialsData.slice(testimonialPage * 3, testimonialPage * 3 + 3);

    return (
        <div className="w-full font-['Nunito'] overflow-x-hidden flex flex-col bg-white">
            <div
                className="w-full h-[100dvh] relative overflow-hidden flex flex-col"
                style={{ backgroundColor: '#C3EFFF' }}
            >
                {/* Top Left Cloud Background for Logo Area */}
                <img
                    src={cloud}
                    alt="Cloud"
                    className="absolute top-0 left-0 w-[250px] md:w-[400px] object-contain opacity-70 pointer-events-none -translate-y-4 -translate-x-4 z-10"
                />

                <img src={wave} alt='wave' className='absolute  bottom-0 left-0 w-[100%] h-auto object-contain z-50 ' />


                {/* Header */}
                <div className="relative z-50">
                    <Header cartItems={cartItems} wishlistCount={wishlistCount} customLogo={logo} />
                </div>

                {/* Main Hero Content */}
                <div className="flex-1 w-full max-w-[1920px] mx-auto px-6 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center justify-between relative z-20">

                    {/* Left Column (Text & Button) */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center items-start -mt-8 lg:-mt-[150px] relative z-30">
                        <h1 className="text-[#333333] font-['Baloo_2'] font-extrabold text-[40px] sm:text-[50px] md:text-[65px] lg:text-[72px] leading-[1.1] mb-6">
                            Best Kids Store <br />
                            & <span className="text-[#F96E8F]">Online Shop</span>
                        </h1>
                        <p className="text-gray-800 font-['Baloo_2'] font-bold text-[18px] md:text-[24px] mb-10">
                            Give The Gift Of Your Children Everyday
                        </p>
                        <button
                            onClick={() => {
                                window.history.pushState({}, '', '/shop');
                                window.dispatchEvent(new Event('popstate'));
                            }}
                            className="bg-[#F96E8F] text-white px-10 py-3.5 rounded-full font-bold font-['Baloo_2'] text-[20px] shadow-lg hover:bg-[#E44971] transition-transform hover:scale-105 cursor-pointer"
                        >
                            Shop This Now
                        </button>

                        {/* Car Decoration */}
                        <img
                            src={car}
                            alt="Car"
                            className="w-[90px] md:w-[120px] mt-16 md:mt-16 ml-0 md:ml-4 object-contain "

                        />
                    </div>

                    {/* Right Column (Jewelry Ornaments) */}
                    <div className="w-full lg:w-[65%] flex justify-center lg:justify-end items-center relative mr-36 mt-16 lg:mt-0 z-120">
                        <img
                            src={ornaments}
                            alt="Jewelry"
                            className="w-full max-w-[600px] lg:max-w-[600px] rotate-[-10.24deg] object-contain drop-shadow-2xl "
                        />
                    </div>
                </div>

                {/* Flying Airplane Decoration (Bottom Right) */}
                <img
                    src={flying}
                    alt="Airplane"
                    className="absolute bottom-16 md:-bottom-30 right-4 md:right-16 w-[150px] md:w-[250px] object-contain z-50 pointer-events-none"
                />

                {/* Bottom Cloud Border */}
                <img
                    src={cloudDwn}
                    alt="Cloud Border"
                    className="absolute -bottom-4 right-0 h-auto w-full md:w-[150px] lg:w-[470px] object-cover md:object-fill z-40 pointer-events-none"
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
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 py-16 lg:py-24 relative bg-white">
                <img src={butterfly} alt="Butterfly" className="absolute top-10 right-10 w-[60px] md:w-[100px] object-contain rotate-12 z-10 pointer-events-none" />

                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 relative z-20 items-stretch">

                    {/* Featured Card */}
                    <div className="ml-[50px] w-full xl:w-[25%] xl:h-[500px] rounded-[30px] overflow-hidden relative min-h-[480px] xl:min-h-0 ">
                        <img src={featuredBanner} alt="Kids Collection" className="absolute inset-0 w-full h-full object-cover" />

                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center -mt-[200px] p-6">
                            <span className="text-white text-[12px] font-['Baloo_2'] font-black tracking-[0.2em] mb-4 uppercase shadow-sm">Featured</span>
                            <h2 className="text-white text-[24px] font-['Baloo_2'] md:text-[32px] font-extrabold leading-tight mb-8 font-['Nunito'] drop-shadow-md">
                                Kids Collection <br /> For Summer
                            </h2>
                            <button
                                onClick={() => {
                                    window.history.pushState({}, '', '/shop');
                                    window.dispatchEvent(new Event('popstate'));
                                }}
                                className="bg-white text-[#F96E8F] px-8 py-2.5 rounded-full font-['Baloo_2'] text-[16px] font-bold border-2 border-dashed border-[#F76188] shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                View Shop
                            </button>
                        </div>
                    </div>

                    {/* Products Area */}
                    <div className="flex-1 flex flex-col">

                        {/* Header & Arrows */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center  mb-6 gap-4">
                            <h2 className="text-3xl md:text-[42px] font-extrabold text-gray-900 font-['Baloo_2'] tracking-tight">
                                Top Selling <span className="text-[#F96E8F]">products</span>
                            </h2>
                            <div className="flex items-center gap-2 mr-[100px]">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className={`w-10 h-10 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center text-gray-400 transition-colors shadow-sm ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer'}`}>
                                    <img src={leftarrow} alt="leftarrow" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex >= filteredProducts.length - 3}
                                    className={`w-10 h-10 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center text-gray-400 transition-colors shadow-sm ${currentIndex >= filteredProducts.length - 3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer'}`}>
                                    <img src={rightarrow} alt="rightarrow" />
                                </button>
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setCurrentIndex(0);
                                    }}
                                    className={`px-6 py-2.5 rounded-full font-['Baloo_2'] font-bold text-[16px] transition-all border-[1.5px] cursor-pointer shadow-xs ${activeCategory === cat
                                            ? 'bg-[#F96E8F] text-white border-[#F96E8F]'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-[#F96E8F] hover:text-[#F96E8F]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Product Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-8 max-w-[1000px]">
                            {displayProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    item={product}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    oldPrice={product.oldPrice}
                                    theme={product.theme}
                                    category={product.category}
                                    onAddToCart={() => addToCart && addToCart(product)}
                                    onClick={() => {
                                        window.history.pushState({}, '', '/product');
                                        window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: product }));
                                    }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>


            {/* Certification Section */}
            <div className="w-full relative mt-10 md:mt-20 flex justify-center items-center py-24 md:py-32 px-4 md:px-[128px]"
                style={{
                    backgroundImage: `url(${section3Bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Airplane */}
                <img src={fly} alt="Airplane" className="absolute top-20 left-10 md:left-55 w-24 md:w-[280px] z-10 animate-bounce-slow" />

                {/* Main Box */}
                <div className="relative w-full min-h-[250px] border-[6px] border-[#333333] rounded-[30px] md:rounded-[40px] py-16 md:py-20 px-6 md:px-16 flex flex-col md:flex-row justify-center items-center z-20 mt-10 md:mt-15">

                    {/* Title overlapping border */}
                    <div className="absolute -top-[24px] md:-top-[32px] left-1/2 -translate-x-1/2 bg-[#FCDCEA] px-6 md:px-10 py-1.5 md:py-2 border-[4px] border-[#333333] rounded-2xl md:rounded-[30px] whitespace-nowrap z-30">
                        <h2 className="text-xl md:text-[50px] font-['Baloo_2'] font-bold text-[#333333] flex items-center gap-2 font-['Lobster_Two']">
                            Certified Big Care for Little <span className="text-[#F96E8F]">Jewellery</span>
                        </h2>
                    </div>

                    {/* Logos */}
                    <div className="w-full flex flex-wrap justify-center items-center gap-10 md:gap-30 md:pr-[150px]">
                        <img src={section3Tested} alt="Dermatologically Tested" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Glp} alt="GLP" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Butterfly} alt="Sensitive Skin" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Iso} alt="ISO" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                        <img src={section3Baby} alt="Minor Skin Safe" className="h-24 md:h-[150px] object-contain hover:scale-105 transition-transform" />
                    </div>

                    {/* Rabbit Image */}
                    <img src={section3Rabbit} alt="Rabbit Mascot" className="absolute -right-6 md:-right-34 bottom-0 translate-y-[20%] h-40 md:h-[280px] object-contain z-30 pointer-events-none" />
                </div>
            </div>
            {/* Flash Sale Section */}
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 py-16 lg:py-24 relative bg-white border-t border-gray-100 mt-12 lg:mt-20">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left Column (Header + Products) */}
                    <div className="w-full lg:w-[65%] flex flex-col">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <div className="flex items-center gap-4">
                                <img src={flower} alt="flower" className="w-[45px] md:w-[65px] object-contain" />
                                <h2 className="text-2xl md:text-[33px] font-['Baloo_2'] font-black text-[#333333] tracking-tight">
                                    Flash <span className="text-[#F96E8F]">Sale</span>
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleFlashPrev}
                                    disabled={flashSaleIndex === 0}
                                    className={`w-11 h-11 rounded-full border-[2px] border-gray-300 flex items-center justify-center text-gray-400 transition-all shadow-sm ${flashSaleIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer hover:shadow-md'}`}>
                                    <img src={leftarrow} alt="leftarrow" />
                                </button>
                                <button
                                    onClick={handleFlashNext}
                                    disabled={flashSaleIndex >= products.length - 3}
                                    className={`w-11 h-11 rounded-full border-[2px] border-gray-300 flex items-center justify-center text-gray-400 transition-all shadow-sm ${flashSaleIndex >= products.length - 3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800 hover:border-gray-800 cursor-pointer hover:shadow-md'}`}>
                                    <img src={rightarrow} alt="rightarrow" />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                            {displayFlashProducts.map(product => (
                                <ProductCard
                                    key={product.id + 'flash'}
                                    item={product}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    oldPrice={product.oldPrice}
                                    theme={product.theme}
                                    category={product.category}
                                    onAddToCart={() => addToCart && addToCart(product)}
                                    onClick={() => {
                                        window.history.pushState({}, '', '/product');
                                        window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: product }));
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Banners */}
                    <div className="w-full lg:w-[35%] flex flex-col gap-6">
                        {/* Girls Collection Banner */}
                        <div className="flex-1 bg-[#FFB7D5]/40 rounded-[28px] overflow-hidden relative flex items-center p-6 lg:p-8">
                            <div className="relative z-20 flex flex-col items-start max-w-[65%] lg:max-w-[55%]">
                                <h3 className="text-[28px] sm:text-[32px] lg:text-[33px] font-black text-gray-900 font-['Lobster_Two'] leading-tight mb-2 tracking-wide">
                                    Girls Collections
                                </h3>
                                <p className="text-gray-700 font-bold text-[14px] sm:text-[16px] mb-4">
                                    Get an extra 30% discount
                                </p>
                                <button
                                    onClick={() => {
                                        window.history.pushState({}, '', '/shop/girls');
                                        window.dispatchEvent(new Event('popstate'));
                                    }}
                                    className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white border-2 border-dashed border-[#F96E8F] text-[#F96E8F] font-['Baloo_2'] font-black rounded-full text-[13px] sm:text-[13px] hover:bg-[#F96E8F] hover:text-white transition-colors hover:border-solid shadow-sm cursor-pointer"
                                >
                                    View Shop
                                </button>
                            </div>
                            <img src={girl} alt="Girls Collection" className="absolute right-0 bottom-0 h-full w-[220px] sm:w-[260px] lg:w-[240px] object-cover object-left mask-image-linear z-10 rounded-br-[28px]" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }} />
                        </div>

                        {/* Boys Collection Banner */}
                        <div className="flex-1 bg-[#85CDFD]/40 rounded-[28px] overflow-hidden relative flex items-center p-6 lg:p-8">
                            <div className="relative z-20 flex flex-col items-start max-w-[65%] lg:max-w-[55%]">
                                <h3 className="text-[28px] sm:text-[32px] lg:text-[33px] font-black text-gray-900 font-['Lobster_Two'] leading-tight mb-2 tracking-wide">
                                    Boys Collections
                                </h3>
                                <p className="text-gray-700 font-bold text-[14px] sm:text-[16px] mb-4">
                                    Get an extra 50% discount
                                </p>
                                <button
                                    onClick={() => {
                                        window.history.pushState({}, '', '/shop/boys');
                                        window.dispatchEvent(new Event('popstate'));
                                    }}
                                    className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white border-2 border-dashed border-[#F96E8F] text-[#F96E8F] font-['Baloo_2'] font-black rounded-full text-[13px] sm:text-[13px] hover:bg-[#F96E8F] hover:text-white transition-colors hover:border-solid shadow-sm cursor-pointer"
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
            <div className="w-full relative pt-10 pb-32 lg:pt-16 lg:pb-56 xl:pt-20 xl:pb-64 flex flex-col items-center bg-[#E6F8FB]"
                style={{
                    backgroundImage: `url(${shopbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <img src={requestButterflyRight} alt="Butterfly" className="absolute top-10 right-10 w-[60px] md:w-[140px] object-contain rotate-12 z-10 pointer-events-none" />

                <h2 className="text-3xl md:text-[43px] font-black text-gray-900 font-['Baloo_2'] tracking-tight mb-8 relative z-20">
                    Trending <span className="text-[#F96E8F]">products</span>
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-3 mb-12 relative z-20">
                    {categories.map(cat => (
                        <button
                            key={cat + 'trending'}
                            onClick={() => setTrendingCategory(cat)}
                            className={`px-6 py-2.5 rounded-full font-bold text-[16px] font-['Baloo_2'] transition-all cursor-pointer shadow-sm ${trendingCategory === cat
                                    ? 'bg-[#F96E8F] text-white'
                                    : 'bg-white text-gray-700 hover:text-[#F96E8F]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 relative z-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                        {displayTrendingProducts.map(product => (
                            <ProductCard
                                key={product.id + 'trending'}
                                item={product}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                oldPrice={product.oldPrice}
                                theme={product.theme}
                                category={product.category}
                                onAddToCart={() => addToCart && addToCart(product)}
                                onClick={() => {
                                    window.history.pushState({}, '', '/product');
                                    window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: product }));
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Trending Instagram Feeds Section */}
            <div className="w-full bg-white py-16 lg:py-24 flex flex-col items-center overflow-hidden">
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
                    <h2 className="text-3xl md:text-[43px] font-black text-gray-900 font-['Baloo_2'] tracking-tight mb-4">
                        Trending <span className="text-[#F96E8F]">Instagram Feeds</span>
                    </h2>
                    <p className="text-gray-600 font-['Baloo_2'] font-bold text-[14px] md:text-[18px]">
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
            <div className="w-full relative py-20 lg:py-28 bg-gradient-to-r from-[#F7FCFD] to-[#E9F9FA] flex flex-col items-center overflow-hidden">
                {/* Decorative Images */}
                <img src={butterfly} alt="Butterfly" className="absolute top-10 left-10 w-[80px] md:w-[120px] object-contain pointer-events-none drop-shadow-sm" />
                <img src={car} alt="Car" className="absolute bottom-10 right-10 w-[80px] md:w-[100px] object-contain pointer-events-none drop-shadow-sm z-10" />

                {/* Header */}
                <div className="text-center px-4 mb-16 relative z-20">
                    <h2 className="text-3xl md:text-[43px] font-black text-gray-900 font-['Baloo_2'] tracking-tight mb-4">
                        Client <span className="text-[#F96E8F]">Testimonials</span>
                    </h2>
                    <p className="text-gray-600 font-bold font-['Baloo_2'] text-[14px] md:text-[18px]">
                        What Customers Say About Us What Customers Say About Us
                    </p>
                </div>

                {/* Cards */}
                <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative z-20">
                    {displayTestimonials.map((testimonial, idx) => (
                        <div key={idx} className="flex flex-col items-center relative animate-fade-in">
                            <div className="w-full rounded-[24px] p-8 md:p-10 relative mb-12 shadow-sm" style={{ backgroundColor: testimonial.color }}>
                                <p className="text-white font-['Baloo_2'] font-bold text-[14px] md:text-[18px] leading-relaxed mb-6">
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
                                    <h4 className="text-[#1C2C5E] font-black text-[18px]">{testimonial.name}</h4>
                                    <p className="text-gray-500 font-bold text-[12px]">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex gap-2 mt-16 relative z-20">
                    {[0, 1, 2].map(pageIndex => (
                        <button
                            key={pageIndex}
                            onClick={() => setTestimonialPage(pageIndex)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${testimonialPage === pageIndex
                                    ? 'bg-[#F96E8F]'
                                    : 'bg-transparent border-[1.5px] border-[#F96E8F] hover:bg-[#F96E8F]/30'
                                }`}
                            aria-label={`Go to testimonial page ${pageIndex + 1}`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Gallery Section */}
            <div className="w-full relative py-16 lg:py-[160px] bg-white flex justify-center overflow-hidden">
                <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[400px] lg:h-[450px] xl:h-[500px] relative z-20">

                    {/* Decorative Elements */}
                    <div className="absolute -left-4 md:left-20 -top-24 md:-top-34 z-10 pointer-events-none">
                        <img src={galleryBunny} alt="Bunny" className="w-[50px] md:w-[80px] object-contain drop-shadow-md" />
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
            </div>

            {/* Last-minute Requests Section */}
            <div className="w-full relative py-20 lg:py-32 flex flex-col items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `url(${requestBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Left Butterfly */}
                <img src={butterfly} alt="Butterfly" className="absolute top-[10%] lg:top-[15%] left-[10%] lg:left-[15%] w-[60px] md:w-[100px] object-contain rotate-12 z-10 animate-bounce-slow" />

                {/* Right Butterfly */}
                <img src={requestButterflyRight} alt="Butterfly" className="absolute top-[15%] lg:top-[20%] right-[10%] lg:right-[15%] w-[50px] md:w-[80px] object-contain -rotate-12 z-10 animate-bounce-slow" />

                {/* Left Bunny */}
                <img src={bunny} alt="Bunny Left" className="absolute bottom-0 left-[2%] lg:left-[5%] w-[120px] md:w-[220px] object-contain z-20 pointer-events-none" />

                <img src={cloudDwn1} alt='cloud' className='absolute bottom-[10%] lg:-bottom-[3%] right-[10%] lg:-right-[76px] w-[60px] md:w-[600px] object-contain  z-10 animate-bounce-slow' />
                
                {/* Right Bunny */}
                <img src={requestRightBunny} alt="Bunny Right" className="absolute bottom-0 right-[2%] lg:right-[5%] w-[150px] md:w-[280px] object-contain z-20 pointer-events-none" />

                {/* Content */}
                <div className="relative z-30 flex flex-col items-center text-center max-w-[800px] px-6 mt-10 md:mt-0">
                    {/* Logo mark */}
                    <div className="w-[190px] h-[190px] mb-6 flex justify-center items-center  overflow-hidden">
                        <img src={bunnyLogo} alt="Logo Mark" className="w-[180px] h-[180px] object-contain" />
                    </div>
                    
                    <h2 className="text-[35px] md:text-[50px] font-black text-[#333333] font-['Baloo_2'] mb-4">
                        Last-minute <span className="text-[#F96E8F]">Requests</span>
                    </h2>
                    
                    <p className="text-gray-500 font-semibold text-[14px] md:text-[19px] font-['Nunito'] leading-relaxed mb-8 max-w-[700px]">
                        Cum sociis Theme natoque penatibus et magnis dis montes, semper libero nibh velit auctor parturient nascetur ridiculus mus.
                    </p>
                    
                    <button className="bg-[#F96E8F] text-white px-10 py-3.5 rounded-[15px] font-bold text-[16px] shadow-md hover:bg-[#E44971] transition-transform hover:scale-105 cursor-pointer">
                        Contact Us
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Homepage;
