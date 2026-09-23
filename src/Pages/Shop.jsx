import { useState, useEffect } from 'react';
import shopbg from '../assets/shop/shop-bg.png';
import shopMobBg from '../assets/shop/shop-mob-bg.png';
import cloud from '../assets/shop/cloud.png';
import { gridItems } from '../data/shopproducts';
export { gridItems };
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
import pink from '../assets/shop/peekaaboo-pink.png';
import headerCar from '../assets/cart/left-img.png';
import Footer from '../components/Footer';
import wlist from '../assets/shop/wlist.png';
import filter from '../assets/shop/filter.png';
import sort from '../assets/shop/sort.png';
import ProductCard from '../components/ProductCard';

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
                    <span className="text-base font-black tracking-wide">{title}</span>
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
                            <span className="text-gray-600 text-xs font-bold group-hover:text-[#F96E8F] transition-colors">{opt}</span>
                        </label>
                    ))}
                </div>
            )}
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



export default function Shop({ onSelectProduct, addToCart, wishlist = [], onAddToWishlist, cartItems = [], updateQuantity }) {
    const [wishlistToast, setWishlistToast] = useState(null);
    const [cartToast, setCartToast] = useState(null);
    const [filterToast, setFilterToast] = useState(false);
    const [emptyFilterToast, setEmptyFilterToast] = useState(false);
    const [resetToast, setResetToast] = useState(false);

    useEffect(() => {
        if (resetToast) {
            const timer = setTimeout(() => {
                setResetToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [resetToast]);

    useEffect(() => {
        if (filterToast) {
            const timer = setTimeout(() => {
                setFilterToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [filterToast]);

    useEffect(() => {
        if (emptyFilterToast) {
            const timer = setTimeout(() => {
                setEmptyFilterToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [emptyFilterToast]);

    useEffect(() => {
        if (cartToast) {
            const timer = setTimeout(() => {
                setCartToast(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cartToast]);

    const triggerCartToast = (message, type = 'updated') => {
        setCartToast({
            message,
            type,
            id: Date.now()
        });
    };

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

    const getCategoryFromPath = () => {
        const path = window.location.pathname;
        if (path.includes('boys')) return "Boys Collections";
        if (path.includes('girls')) return "Girls Collections";
        if (path.includes('just-born')) return "Just Born Collections";
        return "All items";
    };

    const [selectedCategory, setSelectedCategory] = useState(getCategoryFromPath);

    useEffect(() => {
        const handleLocationChange = () => {
            setSelectedCategory(getCategoryFromPath());
        };
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    const [selectedAge, setSelectedAge] = useState(null);
    const [sortBy, setSortBy] = useState('default');
    const [sortOpen, setSortOpen] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [mobileSortOpen, setMobileSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [filters, setFilters] = useState({
        Categories: [],
        Price: [],
        Colours: [],
        Sizes: [],
        Patterns: [],
        'Product Type': [],
    });

    const [tempFilters, setTempFilters] = useState({
        Categories: [],
        Price: [],
        Colours: [],
        Sizes: [],
        Patterns: [],
        'Product Type': [],
    });

    useEffect(() => {
        setTempFilters(filters);
    }, [filters]);

    const applyFilters = () => {
        setFilters(tempFilters);
        const hasActiveFilters = Object.values(tempFilters).some(arr => arr.length > 0);
        if (!hasActiveFilters) {
            setEmptyFilterToast(true);
        } else {
            setFilterToast(true);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, filters, sortBy]);

    const handleFilterChange = (title, option, isChecked) => {
        setTempFilters(prev => {
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
    const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0) + (selectedAge ? 1 : 0);

    const filteredItems = gridItems.filter(item => {
        if (selectedCategory !== "All items" && item.category !== selectedCategory) return false;

        const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);
        if (item.type === 'banner' && hasActiveFilters) return false;
        if (item.type === 'banner') return true;

        if (filters.Colours.length > 0 && !filters.Colours.includes(item.color)) return false;
        if (filters.Sizes.length > 0 && !filters.Sizes.includes(item.size)) return false;
        if (filters.Patterns.length > 0 && !filters.Patterns.includes(item.pattern)) return false;
        if (filters['Product Type'].length > 0 && !filters['Product Type'].includes(item.productType)) return false;
        if (selectedAge && item.type === 'product' && item.age !== selectedAge) return false;

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
                className="w-full pt-[196px] sm:pt-[206px] lg:pt-[130px] pb-40 md:pb-36 -mt-[155px] lg:-mt-[142px] relative flex justify-center items-center z-10 bg-top bg-no-repeat shop-hero-bg"
                style={{
                    '--shop-bg-mob': `url(${shopMobBg})`,
                    '--shop-bg-desk': `url(${shopbg})`
                }}
            >
                <div className="text-center mt-6 lg:mt-6">
                    <h1 className="text-4xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-wide">
                        {headingParts.first} <span className="text-[#F96E8F]">{headingParts.second}</span>
                    </h1>
                    <p className="text-xl sm:text-sm text-gray-800 font-extrabold mt-0 tracking-wide">
                        <span
                            className="cursor-pointer hover:text-[#F96E8F] transition-colors"
                            onClick={() => {
                                window.history.pushState({}, '', '/');
                                window.dispatchEvent(new Event('popstate'));
                            }}
                        >Home</span> &gt; shop &gt; <span className="text-[#F96E8F]">{selectedCategory === "All items" ? "All Collections" : selectedCategory}</span>
                    </p>
                </div>
                <img src={cloud} alt="cloud" className="absolute top-[-115px] sm:top-[-110px] lg:top-[-25px] left-[54%] -translate-x-1/2 lg:left-0 lg:translate-x-0 w-full md:w-[340px] lg:w-[330px] xl:w-[360px] h-auto object-contain pointer-events-none z-30 lg:z-auto" />
                {/* Left Decoration (Car) */}
                <img src={headerCar} alt="Car" className="block absolute top-[175px] sm:top-[185px] lg:top-[200px] lg:bottom-[15%] left-1 sm:left-3 lg:left-[2%] xl:left-[4%] w-[65px] sm:w-[80px] lg:w-[90px] xl:w-[100px] object-contain pointer-events-none z-20" />
                {/* Right Decoration (Bunny) */}
                <img src={pink} alt="Bunny" className="block absolute bottom-[34px] sm:bottom-[30px] md:bottom-[46px] right-[2%] sm:right-[3%] xl:right-[5%] w-[60px] sm:w-[68px] md:w-[100px] lg:w-[120px] xl:w-[100px] object-contain pointer-events-none z-30" />
            </div>

            <div className="bg-white relative z-20">
                {/* Collections by Age */}
                <div className="w-full max-w-[1440px] mx-auto px-6 pt-8 md:pt-12 pb-2 md:pb-4 text-center">
                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-6 md:mb-10">
                        Explore Collections by <span className="text-[#F96E8F]">Age</span>
                    </h2>

                    <div
                        className="flex min-[1106px]:flex-wrap min-[1106px]:justify-center items-end gap-6 sm:gap-8 md:gap-10 min-[1106px]:gap-14 overflow-x-auto min-[1106px]:overflow-visible pb-2 pt-1 px-4 min-[1106px]:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {ageCollections.map((item, index) => {
                            const isSelected = selectedAge === item.label;
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedAge(prev => prev === item.label ? null : item.label);
                                    }}
                                    className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0"
                                >
                                    <img src={item.image} alt={item.label} className="h-[70px] sm:h-[80px] md:h-[90px] object-contain mb-1 transition-transform group-hover:scale-105" />
                                    <span className={`inline-block font-black text-xs sm:text-base md:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-2 md:py-2.5 bg-no-repeat bg-center bg-contain whitespace-nowrap transition-colors ${isSelected ? 'text-[#F96E8F]' : 'text-gray-900'}`} style={{ backgroundImage: `url('${item.bgVector}')` }}>
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-2 md:pt-4 pb-8 md:pb-6">

                    {/* Category Tags */}
                    <div className="flex gap-2 md:gap-4 mb-3 md:mb-8 flex-nowrap overflow-x-auto pb-1 md:pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {categoryTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(tag)}
                                className={`${selectedCategory === tag
                                    ? "bg-[#F96E8F] text-white shadow-sm hover:bg-[#E44971]"
                                    : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                                    } px-4 py-1.5 md:px-6 md:py-2.5 rounded-[16px] text-xs md:text-base font-extrabold transition-colors whitespace-nowrap`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

                        {/* Filters Sidebar */}
                        <div className="hidden lg:flex flex-col w-full lg:w-[300px] flex-shrink-0">
                            {/* Filter Section */}
                            <div className="flex flex-col gap-4">
                                <div className="bg-[#F96E8F] text-white px-5 py-4 rounded-[8px] font-black flex justify-between items-center shadow-sm">
                                    <span className="text-lg font-[Nunito] tracking-wide">Filters</span>
                                    <span
                                        onClick={applyFilters}
                                        className="text-xs font-[Nunito] font-extrabold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-3 py-1 rounded-[6px] cursor-pointer transition-colors"
                                    >
                                        Apply
                                    </span>
                                </div>

                                <div className="border border-gray-200 rounded-[15px] overflow-hidden shadow-sm bg-white">
                                    <div className="p-6 flex flex-col gap-5">
                                        <FilterSection title="Categories" options={['Boys', 'Girls', 'Just Born', '0-5']} selectedOptions={tempFilters.Categories} onChange={handleFilterChange} />
                                        <FilterSection title="Price" options={['₹ 0 - 2000', '₹ 2000 - 10000', '₹ 10000 - 20000', '₹ 20000 - 50000']} selectedOptions={tempFilters.Price} onChange={handleFilterChange} />
                                        <FilterSection title="Colours" options={['Gold', 'Silver', 'Brass', 'Rose Gold']} selectedOptions={tempFilters.Colours} onChange={handleFilterChange} />
                                        <FilterSection title="Sizes" options={['22.7mm', '24mm', '23mm', '22mm', '21mm']} selectedOptions={tempFilters.Sizes} onChange={handleFilterChange} />
                                        <FilterSection title="Patterns" options={['Eternity', 'Three Stones', 'Gem Stones', 'Diamond']} selectedOptions={tempFilters.Patterns} onChange={handleFilterChange} />
                                        <FilterSection title="Product Type" options={['Bangles', 'Rings', 'Earrings', 'Bracelets']} selectedOptions={tempFilters['Product Type']} onChange={handleFilterChange} />
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedAge(null);
                                        const cleared = { Categories: [], Price: [], Colours: [], Sizes: [], Patterns: [], 'Product Type': [] };
                                        setFilters(cleared);
                                        setTempFilters(cleared);
                                        setResetToast(true);
                                    }}
                                    className="w-full bg-[#F96E8F] text-white font-extrabold py-3.5 rounded-[8px] hover:bg-[#E44971] transition-colors shadow-sm text-sm">
                                    RESET ALL FILTER
                                </button>
                            </div>
                        </div>

                        {/* Right Area (Products) */}
                        <div className="flex-1">
                            {/* Top Sort Bar */}
                            <div className="flex justify-between items-center mb-3 md:mb-6 border border-gray-200 bg-white rounded-[8px] py-1.5 md:py-2 pl-3 md:pl-6 pr-1.5 md:pr-2 shadow-sm">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-gray-900 font-extrabold text-xs md:text-sm">Showing {sortedItems.filter(i => i.type === 'product').length} Results</span>
                                    {selectedAge && (
                                        <span className="inline-flex items-center gap-1.5 bg-[#F96E8F]/15 text-[#F96E8F] border border-[#F96E8F]/30 px-3 py-1 rounded-full font-black text-xs">
                                            Age: {selectedAge}
                                            <button
                                                onClick={() => setSelectedAge(null)}
                                                className="hover:bg-[#F96E8F]/20 w-4 h-4 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    )}
                                </div>
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
                                    <div className="relative hidden lg:block">
                                        <button
                                            onClick={() => setSortOpen(!sortOpen)}
                                            className="bg-[#F96E8F] text-white px-3 md:px-5 h-8 md:h-10 rounded-[6px] font-bold text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:bg-[#E44971] transition-colors shadow-sm"
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
                                                        className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-colors ${sortBy === option.id ? 'bg-gray-50 text-[#F96E8F]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#F96E8F]'}`}
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
                            <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6" : "flex flex-col gap-4 md:gap-6"}>
                                {paginatedItems.map((item, index) => {
                                    if (item.type === 'product') {
                                        const cartItem = cartItems.find(c => (c.id && item.id) ? c.id === item.id : c.title === item.title);
                                        const cartQuantity = cartItem ? cartItem.quantity : 0;
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
                                                onAddToCart={() => {
                                                    if (addToCart) addToCart(item, 1);
                                                    triggerCartToast('cart item updated', 'updated');
                                                }}
                                                viewMode={viewMode}
                                                cartQuantity={cartQuantity}
                                                onUpdateQuantity={(productItem, delta) => {
                                                    const matchingCartItem = cartItems.find(c => (c.id && productItem.id) ? c.id === productItem.id : c.title === productItem.title);
                                                    if (matchingCartItem) {
                                                        if (delta === -1 && matchingCartItem.quantity <= 1) {
                                                            triggerCartToast('Item removed from cart', 'removed');
                                                        } else {
                                                            triggerCartToast('cart item updated', 'updated');
                                                        }
                                                        updateQuantity(matchingCartItem, delta);
                                                    }
                                                }}
                                            />
                                        );
                                    } else if (item.type === 'banner') {
                                        const borderClass = item.bannerTheme === 'pink' ? 'border-[#F6C0CD]' : 'border-[#B7E6FA]';
                                        const bgClass = item.bannerTheme === 'pink' ? 'bg-[#FDE5EB]' : 'bg-[#DEF4FD]';
                                        return (
                                            <div key={index} className={`col-span-2 md:col-span-2 rounded-[12px] md:rounded-[20px] overflow-hidden relative shadow-sm border-[2px] md:border-[3px] ${borderClass} ${bgClass} group cursor-pointer h-[220px] sm:h-[280px] md:h-auto`}>
                                                <img src={item.bannerImage} alt={item.title} className="w-[45%] h-full object-cover absolute right-0 inset-y-0" />
                                                <div className="relative z-10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 h-full flex flex-col justify-center max-w-[55%]">
                                                    <h3 className="text-2xl sm:text-4xl md:text-5xl whitespace-nowrap w-full font-black text-gray-900 leading-tight md:leading-none mb-1 font-['Lobster_Two'] tracking-tight">{item.title}</h3>
                                                    <p className="text-gray-900 font-['Nunito'] font-bold text-xs sm:text-base md:text-2xl mb-3 md:mb-6">{item.subtitle}</p>
                                                    <button className="bg-white text-[#F96E8F] border-[2px] border-dashed border-[#F96E8F] px-4 md:px-8 py-1.5 md:py-2.5 rounded-full font-black w-fit shadow-sm hover:shadow-md transition-shadow uppercase tracking-wide text-xs md:text-xs">View Shop</button>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-6 md:mt-8 mb-2 md:mb-4">
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
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-sm transition-colors ${currentPage === pageNum ? 'bg-[#F96E8F] text-white' : 'border-[1.5px] border-gray-300 text-gray-600 bg-white hover:bg-gray-50'}`}
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
                <div className={`fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] bg-white border-[2px] ${wishlistToast.action === 'removed' ? 'border-gray-300 shadow-lg' : 'border-[#F96E8F] shadow-lg'} text-gray-800 px-5 py-4 rounded-[16px] flex items-center gap-3.5 min-w-[280px] max-w-[360px] animate-toast-up`}>
                    <div className={`w-10 h-10 rounded-[12px] ${wishlistToast.action === 'removed' ? 'bg-gray-100 text-gray-500' : 'bg-[#F96E8F]/15 text-[#F96E8F]'} flex items-center justify-center flex-shrink-0`}>
                        {wishlistToast.action === 'removed' ? (
                            <img src={wlist} alt="wishlist" className="h-5 grayscale opacity-60" />
                        ) : (
                            <img src={wlist} alt="wishlist" className="h-5" />
                        )}
                    </div>
                    <div className="flex-1 pr-2">
                        <h4 className={`font-black ${wishlistToast.action === 'removed' ? 'text-gray-700' : 'text-[#F96E8F]'} text-sm font-['Nunito'] leading-tight`}>
                            {wishlistToast.action === 'removed' ? 'Wishlist removed' : 'Wishlist added'}
                        </h4>
                        <p className="text-gray-500 text-xs font-bold font-['Nunito'] line-clamp-1 mt-0.5">
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

            {/* Cart Update Toast Notification */}
            {cartToast && (
                <div key={cartToast.id} className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] animate-toast-up bg-white rounded-2xl shadow-[0_12px_40px_rgba(249,110,143,0.18)] border border-[#F87597]/20 px-5 py-4 font-['Nunito'] flex items-center gap-3">
                    {cartToast.type === 'removed' ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                    <div className="flex flex-col text-left">
                        <span className="text-[#F87597] text-sm font-black uppercase tracking-wider font-['Baloo_2']">
                            {cartToast.type === 'removed' ? 'Item Removed' : 'Cart Updated'}
                        </span>
                        <span className="text-gray-500 text-xs font-semibold">
                            {cartToast.message}
                        </span>
                    </div>
                    <button
                        onClick={() => setCartToast(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer ml-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Filter Applied Toast Notification */}
            {filterToast && (
                <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] animate-toast-up bg-white rounded-2xl shadow-[0_12px_40px_rgba(249,110,143,0.18)] border border-[#F87597]/20 px-5 py-4 font-['Nunito'] flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[#F87597] text-sm font-black uppercase tracking-wider font-['Baloo_2']">
                            Filters Applied
                        </span>
                        <span className="text-gray-500 text-xs font-semibold">
                            Your product list has been updated
                        </span>
                    </div>
                    <button
                        onClick={() => setFilterToast(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer ml-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Empty Filter Toast Notification */}
            {emptyFilterToast && (
                <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] animate-toast-up bg-white rounded-2xl shadow-[0_12px_40px_rgba(249,110,143,0.18)] border border-yellow-200 px-5 py-4 font-['Nunito'] flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50 text-yellow-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-yellow-600 text-sm font-black uppercase tracking-wider font-['Baloo_2']">
                            No Filters Selected
                        </span>
                        <span className="text-gray-500 text-xs font-semibold">
                            Please select at least one filter
                        </span>
                    </div>
                    <button
                        onClick={() => setEmptyFilterToast(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer ml-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Filters Reset Toast Notification */}
            {resetToast && (
                <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] animate-toast-up bg-white rounded-2xl shadow-[0_12px_40px_rgba(249,110,143,0.18)] border border-[#F87597]/20 px-5 py-4 font-['Nunito'] flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[#F87597] text-sm font-black uppercase tracking-wider font-['Baloo_2']">
                            Filters Reset
                        </span>
                        <span className="text-gray-500 text-xs font-semibold">
                            All filters have been cleared
                        </span>
                    </div>
                    <button
                        onClick={() => setResetToast(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer ml-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Fixed Bottom Filter & Sort Bar for Mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white  py-3 px-4  flex items-center gap-3">
                {/* Filter By Button */}
                <button
                    onClick={() => {
                        setTempFilters(filters);
                        setMobileFilterOpen(true);
                    }}
                    className="flex-1 bg-[#F96E8F] hover:bg-[#E44971] font-[Helvetica] text-white py-2.5 px-4 rounded-[10px] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                    <img src={filter} alt="filter" className="w-5" />
                    <span>Filter By</span>
                    {activeFilterCount > 0 && (
                        <span className="w-5 h-5 bg-white text-[#F96E8F] text-xs rounded-full flex items-center justify-center font-black">
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                {/* Sort By Button */}
                <button
                    onClick={() => setMobileSortOpen(true)}
                    className="flex-1 bg-white hover:bg-pink-50/40 border-[1.5px] border-[#F96E8F] font-[Helvetica] text-[#F96E8F] py-2.5 px-4 rounded-[10px] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                    <img src={sort} alt="sort" className="w-5" />
                    <span>Sort By</span>
                </button>
            </div>

            {/* Mobile Filter Modal / Drawer */}
            {mobileFilterOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300"
                    onClick={() => setMobileFilterOpen(false)}
                >
                    <div
                        className="bg-white rounded-t-[24px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-900 font-extrabold text-lg">Filters</span>
                                {activeFilterCount > 0 && (
                                    <span className="bg-[#F96E8F] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                                        {activeFilterCount} active
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Filter Options Body */}
                        <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-5">
                            <FilterSection title="Categories" options={['Boys', 'Girls', 'Just Born', '0-5']} selectedOptions={tempFilters.Categories} onChange={handleFilterChange} />
                            <FilterSection title="Price" options={['₹ 0 - 2000', '₹ 2000 - 10000', '₹ 10000 - 20000', '₹ 20000 - 50000']} selectedOptions={tempFilters.Price} onChange={handleFilterChange} />
                            <FilterSection title="Colours" options={['Gold', 'Silver', 'Brass', 'Rose Gold']} selectedOptions={tempFilters.Colours} onChange={handleFilterChange} />
                            <FilterSection title="Sizes" options={['22.7mm', '24mm', '23mm', '22mm', '21mm']} selectedOptions={tempFilters.Sizes} onChange={handleFilterChange} />
                            <FilterSection title="Patterns" options={['Eternity', 'Three Stones', 'Gem Stones', 'Diamond']} selectedOptions={tempFilters.Patterns} onChange={handleFilterChange} />
                            <FilterSection title="Product Type" options={['Bangles', 'Rings', 'Earrings', 'Bracelets']} selectedOptions={tempFilters['Product Type']} onChange={handleFilterChange} />
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => {
                                    setSelectedAge(null);
                                    const cleared = { Categories: [], Price: [], Colours: [], Sizes: [], Patterns: [], 'Product Type': [] };
                                    setFilters(cleared);
                                    setTempFilters(cleared);
                                    setResetToast(true);
                                }}
                                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-extrabold py-3 rounded-xl transition-colors cursor-pointer text-sm"
                            >
                                Reset All
                            </button>
                            <button
                                onClick={() => {
                                    applyFilters();
                                    setMobileFilterOpen(false);
                                }}
                                className="flex-1 bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold py-3 rounded-xl transition-colors shadow-md cursor-pointer text-sm"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sort Modal / Bottom Sheet */}
            {mobileSortOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300"
                    onClick={() => setMobileSortOpen(false)}
                >
                    <div
                        className="bg-white rounded-t-[24px] p-5 shadow-2xl max-h-[70vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-2">
                            <span className="text-gray-900 font-extrabold text-lg">Sort By</span>
                            <button
                                onClick={() => setMobileSortOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Sort Options */}
                        <div className="flex flex-col py-1">
                            {[
                                { id: 'default', label: 'Default' },
                                { id: 'price-low-high', label: 'Price: Low to High' },
                                { id: 'price-high-low', label: 'Price: High to Low' },
                                { id: 'rating-low-high', label: 'Rating: Low to High' },
                                { id: 'rating-high-low', label: 'Rating: High to Low' },
                                { id: 'latest', label: 'Latest' },
                                { id: 'oldest', label: 'Oldest' }
                            ].map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSortBy(option.id);
                                        setMobileSortOpen(false);
                                    }}
                                    className={`w-full text-left py-3 px-3 rounded-xl font-bold text-sm flex items-center justify-between transition-colors cursor-pointer ${sortBy === option.id
                                        ? 'bg-[#F96E8F]/10 text-[#F96E8F]'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{option.label}</span>
                                    {sortBy === option.id && (
                                        <span className="text-[#F96E8F] font-black text-base">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
