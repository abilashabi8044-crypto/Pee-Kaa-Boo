import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist as toggleWishlistAction, selectWishlistItems } from '../redux/wishlistSlice';
import { gridItems } from '../Pages/Shop';
import arrowLeft from '../assets/product/arrow-l.png';
import arrowRight from '../assets/product/arrow-r.png';

const YouMayAlsoLike = ({ addToCart, updateQuantity }) => {
    const dispatch = useDispatch();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
    const [addedItems, setAddedItems] = useState({});

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let shopProducts = gridItems.filter(item => item.type === 'product');
    if (isMobile) {
        shopProducts = shopProducts.slice(0, 4);
    }
    const itemsPerPage = isMobile ? 1 : 4;
    const maxCarouselIndex = Math.max(0, shopProducts.length - itemsPerPage);

    const wishlistItems = useSelector(selectWishlistItems);

    const handleWishlistClick = (e, item) => {
        e.stopPropagation();
        dispatch(toggleWishlistAction(item));
    };

    const handleNextCarousel = () => setCarouselIndex(prev => Math.min(prev + 1, maxCarouselIndex));
    const handlePrevCarousel = () => setCarouselIndex(prev => Math.max(prev - 1, 0));

    const progressWidth = shopProducts.length > 0
        ? Math.min(100, Math.max(0, ((carouselIndex + Math.min(itemsPerPage, shopProducts.length)) / shopProducts.length) * 100))
        : 100;

    const navigateToProduct = (item) => {
        try {
            localStorage.setItem('pkb_selected_product', JSON.stringify(item));
        } catch (err) {}
        window.dispatchEvent(new CustomEvent('pkb_select_product', { detail: item }));
        if (window.location.pathname !== '/product') {
            window.history.pushState({}, '', '/product');
            window.dispatchEvent(new Event('popstate'));
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const copyLink = (e) => {
        e.stopPropagation();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.origin + '/product');
        }
    };

    return (
        <section className="w-full mt-8 sm:mt-12 mb-8">
            <div className="w-[calc(100%-2rem)] max-w-[1200px] bg-[#F4FCFF] rounded-[2rem] mx-auto p-4 pb-4 sm:p-6 sm:pb-6 md:p-8 md:pb-6 shadow-xs border border-blue-50">
                <h2 className="text-[28px] md:text-[36px] font-bold text-gray-800 mb-8 font-['Baloo_2']">
                    You May <span className="text-[#F96E8F]">Also Like</span>
                </h2>

                <div className={`grid ${isMobile ? 'grid-cols-1 max-w-[360px] mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
                    {shopProducts.slice(carouselIndex, carouselIndex + itemsPerPage).map((item, index) => {
                        const itemWishlisted = Boolean(wishlistItems?.some(w => w.id && item.id ? w.id === item.id : w.title === item.title));
                        const themeBg = item.theme === 'yellow' ? 'bg-[#FFF8E7]' : item.theme === 'blue' ? 'bg-[#EBF7FF]' : 'bg-[#FFE5EC]';

                        return (
                            <div
                                key={item.id || index}
                                onClick={() => navigateToProduct(item)}
                                className={`rounded-[24px] overflow-hidden relative group transition-all duration-300 cursor-pointer border border-pink-100/40 ${themeBg} shadow-sm hover:shadow-xl h-[360px] sm:h-[340px] md:h-[320px] flex flex-col justify-between max-w-[360px] mx-auto sm:max-w-none w-full`}
                            >
                                {/* Full-Cover Background Product Image */}
                                <div className="absolute inset-0 w-full h-full z-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Best Selling Badge */}
                                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <div className="bg-[#00D0CC] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                            <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                                            <path d="m8.21 13.89-3 4.1c-.26.36-.02.85.43.85h3.6l1.26 3.16c.16.4.74.4 1 0L12.76 18.84h3.6c.45 0 .69-.49.43-.85l-3-4.1" />
                                        </svg>
                                        <span className="text-[12px] font-extrabold tracking-wide">Best Selling</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <button
                                        onClick={(e) => handleWishlistClick(e, item)}
                                        title="Add to Wishlist"
                                        className={`w-9 h-9 text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer ${
                                            itemWishlisted ? 'bg-[#F96E8F]' : 'bg-[#00D0CC] hover:bg-[#00b3b0]'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={itemWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={copyLink}
                                        title="Copy Link"
                                        className="w-9 h-9 bg-[#00D0CC] hover:bg-[#00b3b0] text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Overlaid details content area */}
                                <div className="absolute bottom-2 inset-x-0 mx-[3%] sm:mx-[4%] bg-white rounded-[10px] py-1.5 px-2 sm:py-2.5 sm:px-4 text-center z-10 transition-all duration-300 shadow-xs">
                                    <span className="text-gray-400 text-[11px] font-[Nunito] uppercase mb-1">
                                        {item.category || 'Category'}
                                    </span>

                                    <h4 className="text-gray-900 font-bold text-[18px] sm:text-[20px] leading-tight mb-1 tracking-wide font-['Nunito'] group-hover:text-[#F96E8F] transition-colors truncate">
                                        {item.title}
                                    </h4>

                                    <div className="flex justify-center items-center gap-2">
                                        {item.oldPrice && (
                                            <del className="text-gray-400 font-bold text-[16px] font-[Nunito]">₹ {item.oldPrice}</del>
                                        )}
                                        <span className="text-[#F96E8F] font-bold text-[24px] sm:text-[27px] font-['Nunito']">₹ {item.price}</span>
                                    </div>

                                    {/* Expandable Content (Add to Cart) */}
                                    <div className="w-full max-h-0 opacity-0 overflow-hidden group-hover:max-h-[60px] group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-in-out">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (addToCart) {
                                                    addToCart(item, 1);
                                                } else if (updateQuantity) {
                                                    updateQuantity(item, 1);
                                                }
                                                setAddedItems(prev => ({ ...prev, [item.id || index]: true }));
                                                setTimeout(() => {
                                                    setAddedItems(prev => ({ ...prev, [item.id || index]: false }));
                                                }, 2000);
                                            }}
                                            className={`w-full py-2.5 px-4 border-2 border-[#F96E8F] rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs ${addedItems[item.id || index]
                                                    ? 'bg-[#F96E8F] text-white border-solid scale-95'
                                                    : 'border-dashed text-[#F96E8F] hover:bg-[#F96E8F] hover:text-white hover:border-solid active:scale-95'
                                                }`}
                                        >
                                            {addedItems[item.id || index] ? (
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
                    })}
                </div>

                {/* Slider Controls */}
                {isMobile ? (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {shopProducts.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCarouselIndex(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${carouselIndex === idx ? 'bg-[#F96E8F] w-6' : 'bg-gray-300 w-2.5'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-between mt-4 sm:mt-6 gap-4">
                        {/* Progress Line */}
                        <div className="flex-1 min-w-0 h-[3px] bg-gray-200 rounded-full relative overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-[#F96E8F] rounded-full transition-all duration-300"
                                style={{ width: `${progressWidth}%` }}
                            ></div>
                        </div>
                        {/* Arrows */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <button
                                onClick={handlePrevCarousel}
                                disabled={carouselIndex === 0}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors bg-transparent disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                                title="Previous"
                            >
                                <img src={arrowLeft} alt="Previous" className="w-3.5 h-3.5 object-contain" />
                            </button>
                            <button
                                onClick={handleNextCarousel}
                                disabled={carouselIndex >= maxCarouselIndex}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors bg-transparent disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                                title="Next"
                            >
                                <img src={arrowRight} alt="Next" className="w-3.5 h-3.5 object-contain" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default YouMayAlsoLike;
