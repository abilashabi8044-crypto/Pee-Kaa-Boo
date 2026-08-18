import { useState, useEffect } from 'react';
import shopbg from '../assets/shop/shop-bg.png';
import cloud from '../assets/shop/cloud.png';
import prod1 from '../assets/shop/product1.jpg';
import banner1 from '../assets/shop/5ac2235c236dda0548ffadcb89a2362280a7f92c.png';
import banner2 from '../assets/shop/silver-yellow.png';
import prod2 from '../assets/shop/e6d33d54f4b94cee7f7fa20b4b7d7c16f7b1464d.png';
import baby1 from '../assets/shop/00.png';
import baby2 from '../assets/shop/11.png';
import baby3 from '../assets/shop/22.png';
import baby4 from '../assets/shop/33.png';
import baby5 from '../assets/shop/44.png';
import bgVector2 from '../assets/shop/v3.png';
import bgVector3 from '../assets/shop/v2.png';
import bgVector4 from '../assets/shop/v1.png';
import bgVector5 from '../assets/shop/v5.png';
import bgVector6 from '../assets/shop/v4.png';
import badge from '../assets/shop/star-badge.png';
import spark1 from '../assets/shop/spark1.png';
import spark2 from '../assets/shop/spark2.png';
// import headerBunny from '../assets/cart/right-img.png';
import pink from '../assets/shop/peekaaboo-pink.png';
import headerCar from '../assets/cart/left-img.png';
import Footer from './Footer';
import wlist from '../assets/shop/wlist.png';
import save from '../assets/shop/save.png';

// Subcomponents
const FilterSection = ({ title, options = [], selectedOptions = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div
                className="flex justify-between items-center cursor-pointer text-[#333] mb-3 relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-[14px] h-[26px] bg-[#F96E8F]  absolute -left-6 shadow-md shadow-[#F96E8F]/30 rounded-r-[2px]"></div>
                    <span className="text-[16px] font-black tracking-wide">{title}</span>
                </div>
                <svg className={`w-5 h-5 transform transition-transform text-[#F96E8F] ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <div className="flex flex-col gap-2">
                    {options.map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(opt)}
                                onChange={(e) => onChange && onChange(title, opt, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-[#F96E8F] focus:ring-[#F96E8F] accent-[#F96E8F]"
                            />
                            <span className="text-gray-600 text-[13px] font-bold group-hover:text-[#F96E8F] transition-colors">{opt}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({
    item,
    image,
    title,
    price,
    oldPrice,
    theme,
    category,
    onClick,
    onAddToCart,
    onAddToWishlist,
    isWishlisted,
    viewMode = 'grid'
}) => {
    const [isAdded, setIsAdded] = useState(false);
    const isGrid = viewMode === 'grid';

    if (isGrid) {
        let borderColor = 'border-[#FFB7D5]';
        let bg = 'bg-[#FFB7D5]/20';

        if (theme === 'blue') {
            borderColor = 'border-[#85CDFD]';
            bg = 'bg-[#85CDFD]/20';
        } else if (theme === 'yellow') {
            borderColor = 'border-[#FFE2A0]';
            bg = 'bg-[#FFE2A0]/20';
        }

        return (
            <div
                onClick={onClick}
                className={`rounded-[12px] md:rounded-[20px] border-[2px] md:border-[3px] ${borderColor} ${bg} overflow-hidden flex flex-col shadow-sm relative group cursor-pointer transition-all duration-300`}
            >
                {/* Top Image area */}
                <div className="h-[140px] md:h-[240px] w-full p-0 relative flex items-center justify-center">
                    <img src={image} alt={title} className="w-full h-full object-fill rounded-t-[10px] md:rounded-t-[17px]" />

                    {/* Hover Elements on Image */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#00D0CC] text-white px-2.5 py-1.5 rounded-[8px] flex items-center gap-1.5 shadow-sm">
                            <img src={spark1} alt="spark" className="h-3" />
                            <img src={badge} alt="badge" className="h-3" />
                            <img src={spark2} alt="spark" className="h-3" />
                            <span className="text-[12px] font-semibold tracking-wide">Best Selling</span>
                        </div>
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToWishlist) onAddToWishlist(item || { image, title, price, oldPrice, theme, category });
                            }}
                            title="Add to Wishlist"
                            className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${isWishlisted ? 'bg-[#F96E8F] text-white' : 'bg-[#00D0CC] hover:bg-[#00b3b0] text-white'}`}
                        >
                            <img src={wlist} alt="wishlist" className="h-4" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="w-9 h-9 bg-[#00D0CC] rounded-[8px] flex items-center justify-center text-white hover:bg-[#00b3b0] transition-colors shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <img src={save} alt="cart" className="h-4" />
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="bg-white m-[6px] md:m-[10px] mt-[-20px] md:mt-[-30px] rounded-[16px] md:rounded-[20px] p-2 md:p-4 text-center flex-1 flex flex-col justify-center relative z-10 transition-all duration-300 shadow-sm">
                    <div className="text-gray-400 text-[10px] md:text-[13px] font-medium mb-1">
                        {category || "Category"}
                    </div>

                    <h4 className="text-[#333] font-['Nunito'] font-bold text-[13px] md:text-[20px] leading-tight mb-1 md:mb-2 tracking-wide md:group-hover:text-[17px] md:group-hover:mb-3 transition-all duration-300">{title}</h4>

                    <div className="flex justify-center items-center gap-1 md:gap-2 mb-0 md:group-hover:mb-4 transition-all duration-300">
                        <span className="text-gray-400 font-['Nunito'] font-medium text-[13px] md:text-[16px] line-through">₹ {oldPrice}</span>
                        <span className="text-[#F76188] font-['Nunito'] font-bold text-[18px] md:text-[27px] md:group-hover:text-[24px] transition-all">₹ {price}</span>
                    </div>

                    <div className="h-0 opacity-0 group-hover:h-[42px] group-hover:opacity-100 transition-all duration-300 overflow-hidden w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToCart) onAddToCart();
                                setIsAdded(true);
                                setTimeout(() => setIsAdded(false), 2000);
                            }}
                            className={`w-full h-[40px] border-[2px] rounded-full font-semibold text-[16px] transition-all duration-300 flex items-center justify-center tracking-wide ${isAdded
                                ? 'bg-[#F96E8F] text-white border-solid border-[#F96E8F] scale-95'
                                : 'border-dashed border-[#F96E8F] text-[#F96E8F] hover:bg-[#F96E8F] hover:text-white hover:border-solid active:scale-95'
                                }`}
                        >
                            {isAdded ? (
                                <span className="flex items-center gap-2 transform transition-transform duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    Added!
                                </span>
                            ) : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // List View Layout
    return (
        <div
            onClick={onClick}
            className="flex flex-row items-center p-3 border border-gray-200 rounded-[12px] bg-white w-full gap-4 md:gap-8 cursor-pointer hover:border-[#F87597]/30 transition-colors duration-300 shadow-sm"
        >
            <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-[8px] overflow-hidden relative flex-shrink-0 bg-gray-50 border border-gray-100">
                <img src={image} alt={title} className="w-full h-full object-fill" />
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToWishlist) onAddToWishlist(item || { image, title, price, oldPrice, theme, category });
                    }}
                    className={`absolute top-1.5 right-1.5 transition-colors cursor-pointer ${isWishlisted ? 'text-[#F96E8F]' : 'text-[#F87597]/40 hover:text-[#F87597]'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                </div>
            </div>

            <div className="flex flex-col flex-1 gap-1">
                <h4 className="text-[#F87597] font-['Nunito'] font-semibold text-[15px] md:text-[16px] tracking-wide">{title}</h4>
                <div className="flex items-center">
                    <span className="text-[#F87597] font-['Nunito'] font-extrabold text-[16px] md:text-[18px]">₹{price}</span>
                </div>
            </div>

            <div className="flex-shrink-0 pr-2 md:pr-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) onAddToCart();
                        setIsAdded(true);
                        setTimeout(() => setIsAdded(false), 2000);
                    }}
                    className={`px-4 md:px-6 py-2 rounded-[4px] font-bold text-[12px] md:text-[13px] transition-all duration-300 flex items-center justify-center uppercase ${isAdded
                        ? 'bg-[#F87597]/80 text-white scale-95'
                        : 'bg-[#F87597] text-white hover:opacity-90 active:scale-95'
                        }`}
                >
                    {isAdded ? (
                        <span className="flex items-center gap-1.5 transform transition-transform duration-300">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            Added
                        </span>
                    ) : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

const categoryTags = ["All items", "Boys Collections", "Girls Collections", "Just Born Collections"];

const ageCollections = [
    { image: baby1, label: "0-12 months", bgVector: bgVector2 },
    { image: baby2, label: "1-5 years", bgVector: bgVector3 },
    { image: baby3, label: "5-8 years", bgVector: bgVector4 },
    { image: baby4, label: "8-10 years", bgVector: bgVector5 },
    { image: baby5, label: "10-12 years", bgVector: bgVector6 },
];

export const gridItems = [
    { id: 101, type: 'product', image: prod1, title: 'Name of the product', price: '3710', oldPrice: '5000', theme: 'pink', category: 'Girls Collections', size: '22.7mm', color: 'Gold', pattern: 'Eternity', productType: 'Bangles', rating: 4.5, date: '2023-10-01' },
    { id: 102, type: 'product', image: prod2, title: 'Name of the product', price: '2710', oldPrice: '4000', theme: 'blue', category: 'Boys Collections', size: '24mm', color: 'Silver', pattern: 'Three Stones', productType: 'Rings', rating: 3.8, date: '2023-09-15' },
    { id: 103, type: 'product', image: prod1, title: 'Name of the product', price: '3710', oldPrice: '4000', theme: 'yellow', category: 'Just Born Collections', size: '23mm', color: 'Brass', pattern: 'Gem Stones', productType: 'Earrings', rating: 4.9, date: '2023-11-20' },

    { id: 104, type: 'product', image: prod1, title: 'Name of the product', price: '6710', oldPrice: '8000', theme: 'pink', category: 'Girls Collections', size: '22mm', color: 'Rose Gold', pattern: 'Diamond', productType: 'Bracelets', rating: 4.2, date: '2023-08-05' },
    { id: 105, type: 'product', image: prod2, title: 'Name of the product', price: '5710', oldPrice: '7000', theme: 'blue', category: 'Boys Collections', size: '21mm', color: 'Gold', pattern: 'Eternity', productType: 'Bangles', rating: 4.7, date: '2023-10-12' },
    { id: 106, type: 'product', image: prod1, title: 'Name of the product', price: '2710', oldPrice: '4000', theme: 'yellow', category: 'Just Born Collections', size: '22.7mm', color: 'Silver', pattern: 'Three Stones', productType: 'Rings', rating: 3.5, date: '2023-07-22' },

    { id: 107, type: 'product', image: prod1, title: 'Name of the product', price: '7710', oldPrice: '8000', theme: 'pink', category: 'Girls Collections', size: '24mm', color: 'Brass', pattern: 'Gem Stones', productType: 'Earrings', rating: 5.0, date: '2023-12-01' },
    { id: 108, type: 'banner', bannerTheme: 'pink', bannerImage: banner1, title: 'Girls Collections', subtitle: 'Get an extra 30% discount', category: 'Girls Collections' },

    { id: 109, type: 'product', image: prod1, title: 'Name of the product', price: '2710', oldPrice: '4000', theme: 'pink', category: 'Girls Collections', size: '23mm', color: 'Rose Gold', pattern: 'Diamond', productType: 'Bracelets', rating: 4.1, date: '2023-09-30' },
    { id: 110, type: 'product', image: prod2, title: 'Name of the product', price: '3710', oldPrice: '5000', theme: 'blue', category: 'Boys Collections', size: '22mm', color: 'Gold', pattern: 'Eternity', productType: 'Bangles', rating: 4.6, date: '2023-11-05' },
    { id: 111, type: 'product', image: prod1, title: 'Name of the product', price: '3710', oldPrice: '4000', theme: 'yellow', category: 'Just Born Collections', size: '21mm', color: 'Silver', pattern: 'Three Stones', productType: 'Rings', rating: 4.3, date: '2023-10-25' },

    { id: 112, type: 'banner', bannerTheme: 'blue', bannerImage: banner2, title: 'Boys Collections', subtitle: 'Get an extra 30% discount', category: 'Boys Collections' },
    { id: 113, type: 'product', image: prod1, title: 'Name of the product', price: '3710', oldPrice: '4000', theme: 'yellow', category: 'Just Born Collections', size: '22.7mm', color: 'Brass', pattern: 'Gem Stones', productType: 'Earrings', rating: 4.8, date: '2023-12-10' },
];

export default function Shop({ onSelectProduct, addToCart, wishlist = [], onAddToWishlist }) {
    const [wishlistToast, setWishlistToast] = useState(null);

    const handleWishlistClick = (product) => {
        const isRemoving = wishlist.some(w => (w.id && product.id ? w.id === product.id : w.title === product.title));
        if (onAddToWishlist) {
            onAddToWishlist(product);
        }
        setWishlistToast({
            ...product,
            action: isRemoving ? 'removed' : 'added'
        });
        setTimeout(() => {
            setWishlistToast(null);
        }, 2500);
    };

    const [selectedCategory, setSelectedCategory] = useState(() => {
        const path = window.location.pathname;
        if (path.includes('boys')) return "Boys Collections";
        if (path.includes('girls')) return "Girls Collections";
        if (path.includes('just-born')) return "Just Born Collections";
        return "All items";
    });

    const [sortBy, setSortBy] = useState('default');
    const [sortOpen, setSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        Categories: [],
        Price: [],
        Colours: [],
        Sizes: [],
        Patterns: [],
        'Product Type': [],
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, filters, sortBy]);

    const handleFilterChange = (title, option, isChecked) => {
        setFilters(prev => {
            const current = prev[title] || [];
            if (isChecked) {
                return { ...prev, [title]: [...current, option] };
            } else {
                return { ...prev, [title]: current.filter(item => item !== option) };
            }
        });
    };

    const getHeadingParts = () => {
        if (selectedCategory === "Just Born Collections") return { first: "Just Born", second: "Collections" };
        if (selectedCategory === "Boys Collections") return { first: "Boys", second: "Collections" };
        if (selectedCategory === "Girls Collections") return { first: "Girls", second: "Collections" };
        return { first: "All", second: "Collections" };
    };
    const headingParts = getHeadingParts();

    const filteredItems = gridItems.filter(item => {
        if (selectedCategory !== "All items" && item.category !== selectedCategory) return false;

        const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);
        if (item.type === 'banner' && hasActiveFilters) return false;
        if (item.type === 'banner') return true;

        if (filters.Colours.length > 0 && !filters.Colours.includes(item.color)) return false;
        if (filters.Sizes.length > 0 && !filters.Sizes.includes(item.size)) return false;
        if (filters.Patterns.length > 0 && !filters.Patterns.includes(item.pattern)) return false;
        if (filters['Product Type'].length > 0 && !filters['Product Type'].includes(item.productType)) return false;

        if (filters.Categories.length > 0) {
            const matchesCategory = filters.Categories.some(cat => {
                if (cat === 'Boys' && item.category === 'Boys Collections') return true;
                if (cat === 'Girls' && item.category === 'Girls Collections') return true;
                if (cat === 'Just Born' && item.category === 'Just Born Collections') return true;
                if (cat === '0-5' && item.category === 'Just Born Collections') return true; // Mapped '0-5' to 'Just Born'
                return false;
            });
            if (!matchesCategory) return false;
        }

        if (filters.Price.length > 0) {
            const priceVal = parseInt(item.price);
            const matchesPrice = filters.Price.some(range => {
                if (range === '₹ 0 - 2000') return priceVal >= 0 && priceVal <= 2000;
                if (range === '₹ 2000 - 10000') return priceVal >= 2000 && priceVal <= 10000;
                if (range === '₹ 10000 - 20000') return priceVal >= 10000 && priceVal <= 20000;
                if (range === '₹ 20000 - 50000') return priceVal >= 20000 && priceVal <= 50000;
                return false;
            });
            if (!matchesPrice) return false;
        }

        return true;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (a.type === 'banner' || b.type === 'banner') return 0;

        if (sortBy === 'price-low-high') return parseInt(a.price) - parseInt(b.price);
        if (sortBy === 'price-high-low') return parseInt(b.price) - parseInt(a.price);
        if (sortBy === 'rating-low-high') return a.rating - b.rating;
        if (sortBy === 'rating-high-low') return b.rating - a.rating;
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
        return 0;
    });

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full font-['Baloo_2']">

            {/* Hero Section */}
            <div
                className="w-full pt-[130px] pb-36 -mt-[142px] relative flex justify-center items-center z-10 bg-top bg-no-repeat w-full"
                style={{ backgroundImage: `url(${shopbg})`, backgroundSize: '100% 100%' }}
            >
                <div className="text-center mt-6">
                    <h1 className="text-[40px] md:text-[50px] font-black text-gray-900 leading-tight tracking-wide">
                        {headingParts.first} <span className="text-[#F96E8F]">{headingParts.second}</span>
                    </h1>
                    <p className="text-[14px] text-gray-800 font-extrabold mt-1 tracking-wide">
                        Home &gt; shop &gt; <span className="text-[#F96E8F]">{selectedCategory === "All items" ? "All Collections" : selectedCategory}</span>
                    </p>
                </div>
                <img src={cloud} alt="cloud" className="absolute top-[0%] left-[0%] w-[340px] h-auto object-contain pointer-events-none" />
                {/* Left Decoration (Car) */}
                <img src={headerCar} alt="Car" className="hidden lg:block absolute bottom-[15%] top-[200px] left-[2%] xl:left-[4%] w-[90px] xl:w-[100px] object-contain pointer-events-none" />

                {/* Right Decoration (Bunny) */}
                <img src={pink} alt="Bunny" className="hidden lg:block absolute bottom-[46px] right-[2%] xl:right-[5%] w-[120px] xl:w-[100px] object-contain pointer-events-none z-30" />
            </div>

            <div className="bg-white relative z-20">
                {/* Collections by Age */}
                <div className="w-full max-w-[1440px] mx-auto px-6 py-12 text-center">
                    <h2 className="text-[43px] font-black text-gray-900 mb-10">
                        Explore Collections by <span className="text-[#F96E8F]">Age</span>
                    </h2>

                    <div className="flex flex-wrap justify-center items-end gap-3 md:gap-14">
                        {ageCollections.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => window.history.pushState({}, '', '/shop')}
                                className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer group w-[30%] md:w-auto"
                            >
                                <img src={item.image} alt={item.label} className="h-[60px] md:h-[90px] object-contain mb-1 group-hover:scale-105 transition-transform" />
                                <span className="inline-block text-gray-900 font-black text-[10px] md:text-[22px] px-3 py-1.5 md:px-8 md:py-2.5 bg-no-repeat bg-center bg-contain whitespace-nowrap" style={{ backgroundImage: `url('${item.bgVector}')` }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="max-w-[1440px] mx-auto px-6 py-8 pb-20">

                    {/* Category Tags */}
                    <div className="flex gap-2 md:gap-4 mb-8 flex-nowrap overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {categoryTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(tag)}
                                className={`${selectedCategory === tag
                                    ? "bg-[#F96E8F] text-white shadow-sm hover:bg-[#E44971]"
                                    : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                                    } px-4 py-1.5 md:px-6 md:py-2.5 rounded-[16px] text-[11px] md:text-[16px] font-extrabold transition-colors whitespace-nowrap`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Filters Sidebar */}
                        <div className="hidden lg:flex flex-col w-full lg:w-[300px] flex-shrink-0">
                            {/* Filter Section */}
                            <div className="flex flex-col gap-4">
                                <div className="bg-[#F96E8F] text-white px-5 py-4 rounded-[8px] font-black flex justify-between items-center cursor-pointer shadow-sm">
                                    <span className="text-[18px] font-[Nunito] tracking-wide">Filters</span>
                                    <span className="text-[10px] font-[Nunito] font-bold">Apply</span>
                                </div>

                                <div className="border border-gray-200 rounded-[15px] overflow-hidden shadow-sm bg-white">
                                    <div className="p-6 flex flex-col gap-5">
                                        <FilterSection title="Categories" options={['Boys', 'Girls', 'Just Born', '0-5']} selectedOptions={filters.Categories} onChange={handleFilterChange} />
                                        <FilterSection title="Price" options={['₹ 0 - 2000', '₹ 2000 - 10000', '₹ 10000 - 20000', '₹ 20000 - 50000']} selectedOptions={filters.Price} onChange={handleFilterChange} />
                                        <FilterSection title="Colours" options={['Gold', 'Silver', 'Brass', 'Rose Gold']} selectedOptions={filters.Colours} onChange={handleFilterChange} />
                                        <FilterSection title="Sizes" options={['22.7mm', '24mm', '23mm', '22mm', '21mm']} selectedOptions={filters.Sizes} onChange={handleFilterChange} />
                                        <FilterSection title="Patterns" options={['Eternity', 'Three Stones', 'Gem Stones', 'Diamond']} selectedOptions={filters.Patterns} onChange={handleFilterChange} />
                                        <FilterSection title="Product Type" options={['Bangles', 'Rings', 'Earrings', 'Bracelets']} selectedOptions={filters['Product Type']} onChange={handleFilterChange} />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFilters({ Categories: [], Price: [], Colours: [], Sizes: [], Patterns: [], 'Product Type': [] })}
                                    className="w-full bg-[#F96E8F] text-white font-extrabold py-3.5 rounded-[8px] hover:bg-[#E44971] transition-colors shadow-sm text-[14px]">
                                    RESET ALL FILTER
                                </button>
                            </div>
                        </div>

                        {/* Right Area (Products) */}
                        <div className="flex-1">
                            {/* Top Sort Bar */}
                            <div className="flex justify-between items-center mb-6 border border-gray-200 bg-white rounded-[8px] py-1.5 md:py-2 pl-3 md:pl-6 pr-1.5 md:pr-2 shadow-sm">
                                <span className="text-gray-900 font-extrabold text-[11px] md:text-[15px]">Showing 1–20 Of 50 Results</span>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="flex bg-gray-50 rounded-[6px] overflow-hidden p-1 border border-gray-100">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-[4px] transition-colors ${viewMode === 'list' ? 'bg-[#F96E8F] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-[4px] transition-colors ${viewMode === 'grid' ? 'bg-[#F96E8F] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setSortOpen(!sortOpen)}
                                            className="bg-[#F96E8F] text-white px-3 md:px-5 h-8 md:h-10 rounded-[6px] font-bold text-[11px] md:text-[14px] flex items-center gap-1 md:gap-2 hover:bg-[#E44971] transition-colors shadow-sm"
                                        >
                                            {sortBy === 'default' ? 'Sort By' :
                                                sortBy === 'price-low-high' ? 'Price: Low to High' :
                                                    sortBy === 'price-high-low' ? 'Price: High to Low' :
                                                        sortBy === 'rating-low-high' ? 'Rating: Low to High' :
                                                            sortBy === 'rating-high-low' ? 'Rating: High to Low' :
                                                                sortBy === 'latest' ? 'Latest' : 'Oldest'}
                                            <svg className={`w-3 h-3 md:w-4 md:h-4 transform transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                        {sortOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-[8px] shadow-lg overflow-hidden z-50">
                                                {[
                                                    { id: 'default', label: 'Default' },
                                                    { id: 'price-low-high', label: 'Price: Low to High' },
                                                    { id: 'price-high-low', label: 'Price: High to Low' },
                                                    { id: 'rating-low-high', label: 'Rating: Low to High' },
                                                    { id: 'rating-high-low', label: 'Rating: High to Low' },
                                                    { id: 'latest', label: 'Latest' },
                                                    { id: 'oldest', label: 'Oldest' }
                                                ].map(option => (
                                                    <div
                                                        key={option.id}
                                                        onClick={() => { setSortBy(option.id); setSortOpen(false); }}
                                                        className={`px-4 py-2.5 text-[13px] font-bold cursor-pointer transition-colors ${sortBy === option.id ? 'bg-gray-50 text-[#F96E8F]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#F96E8F]'}`}
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Product Grid / List */}
                            <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6" : "flex flex-col gap-4 md:gap-6"}>
                                {paginatedItems.map((item, index) => {
                                    if (item.type === 'product') {
                                        return (
                                            <ProductCard
                                                key={item.id || index}
                                                item={item}
                                                image={item.image}
                                                title={item.title}
                                                price={item.price}
                                                oldPrice={item.oldPrice}
                                                theme={item.theme}
                                                category={item.category}
                                                isWishlisted={wishlist.some(w => (w.id && item.id ? w.id === item.id : w.title === item.title))}
                                                onAddToWishlist={handleWishlistClick}
                                                onClick={() => onSelectProduct && onSelectProduct(item)}
                                                onAddToCart={() => addToCart && addToCart(item, 1)}
                                                viewMode={viewMode}
                                            />
                                        );
                                    } else if (item.type === 'banner') {
                                        const borderClass = item.bannerTheme === 'pink' ? 'border-[#F6C0CD]' : 'border-[#B7E6FA]';
                                        const bgClass = item.bannerTheme === 'pink' ? 'bg-[#FDE5EB]' : 'bg-[#DEF4FD]';
                                        return (
                                            <div key={index} className={`col-span-2 md:col-span-2 rounded-[12px] md:rounded-[20px] overflow-hidden relative shadow-sm border-[2px] md:border-[3px] ${borderClass} ${bgClass} group cursor-pointer h-[120px] md:h-auto`}>
                                                <img src={item.bannerImage} alt={item.title} className="w-[45%] h-full object-cover absolute right-0 inset-y-0" />
                                                <div className="relative z-10 px-4 md:px-8 py-2 md:py-8 h-full flex flex-col justify-center max-w-[55%]">
                                                    <h3 className="text-[20px] md:text-[52.5px] whitespace-nowrap w-full font-black text-gray-900 leading-none mb-1 font-['Lobster_Two'] tracking-tight">{item.title}</h3>
                                                    <p className="text-gray-900 font-['Nunito'] font-bold text-[10px] md:text-[22.5px] mb-2 md:mb-6">{item.subtitle}</p>
                                                    <button className="bg-white text-[#F96E8F] border-[2px] border-dashed border-[#F96E8F] px-4 md:px-8 py-1 md:py-2.5 rounded-full font-black w-fit shadow-sm hover:shadow-md transition-shadow uppercase tracking-wide text-[9px] md:text-[13px]">View Shop</button>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-16 mb-8">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors shadow-sm ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#F96E8F] text-white hover:bg-[#E44971]'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                                    </button>

                                    {Array.from({ length: totalPages }).map((_, idx) => {
                                        const pageNum = idx + 1;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[15px] shadow-sm transition-colors ${currentPage === pageNum ? 'bg-[#F96E8F] text-white' : 'border-[1.5px] border-gray-300 text-gray-600 bg-white hover:bg-gray-50'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors shadow-sm ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#F96E8F] text-white hover:bg-[#E44971]'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Wishlist Added / Removed Popup Notification */}
            {wishlistToast && (
                <div className={`fixed top-8 right-8 z-50 bg-white border-[2px] ${wishlistToast.action === 'removed' ? 'border-gray-300 shadow-lg' : 'border-[#F96E8F] shadow-lg'} text-gray-800 px-5 py-4 rounded-[16px] flex items-center gap-3.5 min-w-[280px] max-w-[360px]`}>
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
                        <h4 className={`font-black ${wishlistToast.action === 'removed' ? 'text-gray-700' : 'text-[#F96E8F]'} text-[15px] font-['Nunito'] leading-tight`}>
                            {wishlistToast.action === 'removed' ? 'Wishlist removed' : 'Wishlist added'}
                        </h4>
                        <p className="text-gray-500 text-[12px] font-bold font-['Nunito'] line-clamp-1 mt-0.5">
                            {wishlistToast.title || "Product"}
                        </p>
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
}
