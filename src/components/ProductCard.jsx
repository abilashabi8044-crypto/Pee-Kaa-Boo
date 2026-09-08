import React, { useState } from 'react';
import badge from '../assets/shop/star-badge.png';
import spark1 from '../assets/shop/spark1.png';
import spark2 from '../assets/shop/spark2.png';
import wlist from '../assets/shop/wlist.png';

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
    viewMode = 'grid',
    cartQuantity = 0,
    onUpdateQuantity
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
                className={`rounded-[24px] border-[3px] ${borderColor} ${bg} overflow-hidden relative group cursor-pointer transition-all duration-300 h-[220px] sm:h-[280px] md:h-[360px] flex flex-col justify-between shadow-sm`}
            >
                {/* Full-Cover Background Product Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>

                {/* Hover/Action Buttons */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-[#00D0CC] text-white px-2.5 py-1.5 rounded-[8px] flex items-center gap-1.5 shadow-sm">
                        <img src={spark1} alt="spark" className="h-3" />
                        <img src={badge} alt="badge" className="h-3" />
                        <img src={spark2} alt="spark" className="h-3" />
                        <span className="text-[12px] font-semibold tracking-wide">Best Selling</span>
                    </div>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20">
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
                </div>

                {/* Overlaid details content area */}
                <div className="absolute bottom-0 inset-x-0 bg-white m-[6px] md:m-[10px] rounded-[10px] p-2 md:p-3 text-center z-10 transition-all duration-300 shadow-sm">
                    <div className="text-gray-400 text-[9px] md:text-[11px] font-medium mb-1">
                        {category || "Category"}
                    </div>

                    <h4 className="text-[#333] font-['Nunito'] font-bold text-[12px] md:text-[18px] leading-tight mb-1 md:mb-1.5 tracking-wide md:group-hover:text-[16px] md:group-hover:mb-2 transition-all duration-300">{title}</h4>

                    <div className="flex justify-center items-center gap-1 md:gap-2 mb-0 md:group-hover:mb-3 transition-all duration-300">
                        <span className="text-gray-400 font-['Nunito'] font-medium text-[11px] md:text-[14px] line-through">₹ {oldPrice}</span>
                        <span className="text-[#F76188] font-['Nunito'] font-bold text-[15px] md:text-[22px] md:group-hover:text-[20px] transition-all">₹ {price}</span>
                    </div>

                    <div className="h-0 opacity-0 group-hover:h-[36px] group-hover:opacity-100 transition-all duration-300 overflow-hidden w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToCart) onAddToCart();
                                setIsAdded(true);
                                setTimeout(() => setIsAdded(false), 2000);
                            }}
                            className={`w-full h-[36px] border-[2px] rounded-full font-semibold text-[14px] transition-all duration-300 flex items-center justify-center tracking-wide ${isAdded
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
                <img src={image} alt={title} className="w-full h-full object-cover" />
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

            <div className="flex-shrink-0 pr-2 md:pr-4" onClick={(e) => e.stopPropagation()}>
                {cartQuantity > 0 ? (
                    <div className="flex items-center border-2 border-dashed border-[#F87597] rounded-[18px] overflow-hidden bg-white shadow-xs">
                        <button
                            onClick={() => {
                                if (onUpdateQuantity) onUpdateQuantity(item, 1);
                            }}
                            className="w-8 h-8 flex items-center justify-center font-bold text-[#F87597] hover:bg-pink-50 cursor-pointer transition-colors text-lg"
                        >
                            +
                        </button>
                        <span className="w-8 text-center font-black text-gray-800 text-sm">
                            {cartQuantity}
                        </span>
                        <button
                            onClick={() => {
                                if (onUpdateQuantity) onUpdateQuantity(item, -1);
                            }}
                            className="w-8 h-8 flex items-center justify-center font-bold text-[#F87597] hover:bg-pink-50 cursor-pointer transition-colors text-lg"
                        >
                            -
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            if (onAddToCart) onAddToCart();
                        }}
                        className="px-4 md:px-6 py-2 rounded-[4px] font-bold text-[12px] md:text-[13px] bg-[#F87597] text-white hover:opacity-90 active:scale-95 transition-all duration-300 flex items-center justify-center uppercase cursor-pointer"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
