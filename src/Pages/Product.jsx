import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist as toggleWishlistAction, selectWishlistItems } from '../redux/wishlistSlice';
import Header from './Header';

// Assets
import bisLogo from '../assets/product/bis-logo.png';
import truckLogo from '../assets/product/truck-logo.png';
import goldImg from '../assets/product/gold.jpg';
import roseGoldImg from '../assets/product/rose-gold.png';
import brassImg from '../assets/product/brass.jpg';
import silverImg from '../assets/product/silver.jpg';
import oxidisedImg from '../assets/product/oxidised.jpg';
import bunnyIcon from '../assets/login/bunny@4x 1.png';
import ad from '../assets/shop/silver-yellow.png';
import badge from '../assets/product/star-badge.png';
import spark1 from '../assets/product/spark1.png';
import spark2 from '../assets/product/spark2.png';
import arrowLeft from '../assets/product/arrow-l.png';
import user from '../assets/product/user.png';
import arrowRight from '../assets/product/arrow-r.png';
import { gridItems } from './Shop';
import Footer from './Footer';
import wishlist from '../assets/product/w-list.png';
import share from '../assets/product/share.png';
import whatsapp from '../assets/product/social-icons/w-app.png';
import facebook from '../assets/product/social-icons/fb-.png';
import x from '../assets/product/social-icons/x.png';
import pinterest from '../assets/product/social-icons/pint.png';
import mail from '../assets/product/social-icons/mail.png';


const Product = ({ product, cartItems, addToCart }) => {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState('24');
    const [selectedColor, setSelectedColor] = useState('Gold');
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState(null);
    const [locationDetails, setLocationDetails] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const shopProducts = gridItems.filter(item => item.type === 'product');
    const itemsPerPage = isMobile ? 1 : 4;
    const maxCarouselIndex = Math.max(0, shopProducts.length - itemsPerPage);

    const defaultProduct = product || shopProducts[0];
    const productImages = defaultProduct?.images || Array(4).fill(defaultProduct?.image);

    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [addedItems, setAddedItems] = useState({});

    const wishlistItems = useSelector(selectWishlistItems);
    const isWishlisted = Boolean(wishlistItems?.some(item =>
        item.id && defaultProduct?.id ? item.id === defaultProduct.id : item.title === defaultProduct?.title
    ));

    const handleWishlistClick = (e) => {
        if (e) e.preventDefault();
        const activeProduct = defaultProduct;
        if (activeProduct) {
            dispatch(toggleWishlistAction(activeProduct));
        }
    };

    const handleShareClick = (platform) => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://peekaaboo.com/product';
        const prodTitle = defaultProduct?.title || 'PEE KAA BOO Jewellery';
        const prodPrice = defaultProduct?.price ? `₹${defaultProduct.price}` : '';
        const prodImage = defaultProduct?.image || '';

        switch (platform) {
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${prodTitle} (${prodPrice}) on PEE KAA BOO: ${currentUrl}`)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(`Check out ${prodTitle} on PEE KAA BOO`)}&body=${encodeURIComponent(`Hi,\n\nI found this beautiful jewellery on PEE KAA BOO:\n\n${prodTitle}\nPrice: ${prodPrice}\n\nView details here: ${currentUrl}`)}`;
                break;
            case 'x':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${prodTitle} on PEE KAA BOO!`)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
                break;
            case 'pinterest':
                window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(prodImage)}&description=${encodeURIComponent(prodTitle)}`, '_blank');
                break;
            case 'copy':
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(currentUrl).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                    });
                }
                break;
            default:
                break;
        }
    };

    const handleNextCarousel = () => setCarouselIndex(prev => Math.min(prev + 1, maxCarouselIndex));
    const handlePrevCarousel = () => setCarouselIndex(prev => Math.max(prev - 1, 0));

    const progressWidth = shopProducts.length > 0
        ? Math.min(100, Math.max(0, ((carouselIndex + Math.min(itemsPerPage, shopProducts.length)) / shopProducts.length) * 100))
        : 100;

    const checkPincode = async () => {
        if (!pincode || pincode.length !== 6) {
            setDeliveryStatus(null);
            setLocationDetails(null);
            return;
        }

        setDeliveryStatus('loading');
        setLocationDetails(null);

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data && data[0].Status === "Success") {
                const postOffice = data[0].PostOffice[0];
                const state = postOffice.State;
                const district = postOffice.District;
                const area = postOffice.Name;

                setLocationDetails({ area, district, state });

                const allowedStates = ["Tamil Nadu", "Andhra Pradesh", "Kerala", "Karnataka"];
                if (allowedStates.includes(state)) {
                    setDeliveryStatus('available');
                } else {
                    setDeliveryStatus('unavailable');
                }
            } else {
                setDeliveryStatus('error');
            }
        } catch (error) {
            setDeliveryStatus('error');
        }
    };

    const getExpectedDeliveryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });

        let suffix = "th";
        if (day % 10 === 1 && day !== 11) suffix = "st";
        else if (day % 10 === 2 && day !== 12) suffix = "nd";
        else if (day % 10 === 3 && day !== 13) suffix = "rd";

        return `${day}${suffix} ${month}`;
    };

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const accordionItems = [
        { id: 'desc', title: 'Product Description', content: 'Product description goes here.' },
        { id: 'specs', title: 'Specifications', content: 'Product specifications go here.' },
        { id: 'care', title: 'Jewellery Care', content: 'Jewellery care instructions go here.' },
        { id: 'shipping', title: 'Shipping Details', content: 'Shipping details go here.' },

    ];

    const sizes = [
        { label: '24', status: 'In-Stock' },
        { label: '23', status: 'In-Stock' },
        { label: '22', status: 'Out of stock' },
        { label: 'FS', status: 'In-Stock' }
    ];

    const colors = [
        { name: 'Gold', img: goldImg },
        { name: 'Rose Gold', img: roseGoldImg },
        { name: 'Brass', img: brassImg },
        { name: 'Silver', img: silverImg },
        { name: 'Oxidised', img: oxidisedImg }
    ];

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Nunito'] pb-0">
            <Header cartItems={cartItems} />

            {/* Breadcrumbs */}
            <div className="max-w-[1500px] mt-[28px] mx-auto px-4 pt-8 pb-2">
                <div className="text-[14px] sm:text-[15px] md:text-[18px] text-[#888] font-medium flex items-center flex-nowrap whitespace-nowrap overflow-x-auto gap-1.5 sm:gap-2">
                    <button onClick={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new Event('popstate')); }} className="hover:text-[#F96E8F] transition-colors cursor-pointer flex-shrink-0">Home</button>
                    <span className="flex-shrink-0">&gt;</span>
                    <button onClick={() => { window.history.pushState({}, '', '/shop'); window.dispatchEvent(new Event('popstate')); }} className="hover:text-[#F96E8F] transition-colors cursor-pointer flex-shrink-0">shop</button>
                    <span className="flex-shrink-0">&gt;</span>
                    <button onClick={() => { window.history.pushState({}, '', '/shop'); window.dispatchEvent(new Event('popstate')); }} className="hover:text-[#F96E8F] transition-colors cursor-pointer flex-shrink-0">{product?.category || 'Boys Collections'}</button>
                    <span className="flex-shrink-0 text-[#F96E8F]">&gt;</span>
                    <span className="text-[#F96E8F] flex-shrink-0">{product?.title || 'Product 1'}</span>
                </div>
            </div>

            <div className="max-w-[1200px] bg-[#F4FCFF] rounded-2xl mx-auto px-4 pt-8 lg:pt-12 pb-12 lg:pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column - Media */}
                    <div className="flex flex-col gap-6">
                        {/* Main Image Box */}
                        <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden flex items-center justify-center shadow-sm">

                            {/* Product Image */}
                            <img src={productImages[currentImageIndex]} alt={product?.title || "Product"} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />

                            {/* Badges */}
                            <div className="absolute top-6 left-6 font-['Helvetica'] bg-[#00D0CC] text-white text-[11px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md z-10">
                                <img src={spark1} />
                                <img src={badge} alt="Badge" className="w-5 h-5" />
                                <img src={spark2} />
                                <h1>Best Selling</h1>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                                <button
                                    onClick={handleWishlistClick}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 ${isWishlisted
                                            ? 'bg-[#F96E8F] text-white ring-2 ring-pink-300 shadow-pink-200'
                                            : 'bg-[#00D0CC] text-white hover:bg-[#00b3b0]'
                                        }`}
                                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                                >
                                    <img src={wishlist} alt="Wishlist" className="w-5 h-5 object-contain" />
                                </button>
                                <button
                                    onClick={() => setShareModalOpen(true)}
                                    className="w-10 h-10 bg-[#00D0CC] text-white rounded-full flex items-center justify-center hover:bg-[#00b3b0] transition-colors shadow-md cursor-pointer"
                                    title="Share Product"
                                >
                                    <img src={share} alt="Share" className="w-5 h-5 object-contain" />
                                </button>
                            </div>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                                {productImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors shadow-sm ${currentImageIndex === idx ? 'bg-[#F96E8F]' : 'bg-white'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <img src={bisLogo} alt="BIS" className="w-full h-full object-contain" />
                            {/* {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex-1 flex justify-center border-r last:border-r-0 border-gray-100">
                                    <img src={bisLogo} alt="BIS" className="w-[70px] object-contain" />
                                </div>
                            ))} */}
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="flex flex-col gap-5">

                        {/* Header Info */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 font-['Nunito'] bg-[#00D0CC] text-white text-[11px] font-bold px-3 py-1 rounded-md mb-3 shadow-sm">
                                {defaultProduct?.rating || 4.5} <span className="text-yellow-300 text-[13px] leading-none">★</span> | {defaultProduct?.reviews || 42} Reviews
                            </div>
                            <h1 className="text-3xl md:text-[34px] font-black text-gray-900 leading-tight mb-2">
                                {product?.title || "Name Of The Product"}
                            </h1>
                            <p className="text-gray-600 font-bold text-[14px]">
                                Product Code : {product?.code || product?.id || '64A288075'}
                            </p>
                        </div>

                        {/* Price Card */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h3 className=" text-gray-700 font-extrabold text-[16px] mb-3">Price</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-400 font-bold text-lg line-through">₹ {product?.oldPrice || '2000'}</span>
                                <span className="text-[#F96E8F] font-['Nunito'] font-bold text-[24px]">₹ {product?.price || '1710'}</span>
                                <span className="text-red-500 font-[Helvetica] font-bold text-[11.79px]">(3% Off)</span>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h3 className="text-gray-700 font-['Baloo_2'] font-extrabold text-[16px] mb-4">Choose size</h3>
                            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full">
                                {sizes.map((size) => {
                                    const isSelected = selectedSize === size.label;
                                    const isOut = size.status === 'Out of stock';
                                    return (
                                        <button
                                            key={size.label}
                                            onClick={() => !isOut && setSelectedSize(size.label)}
                                            className={`
                                                relative w-full h-13 sm:h-14 rounded-[10px] flex flex-col items-center justify-center font-black text-[14px] sm:text-[15px] transition-all overflow-hidden
                                                ${isSelected ? 'bg-[#F96E8F] text-white shadow-md' : 'bg-[#BCBCBC] font-[Nunito] text-white'}
                                                ${isOut ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 cursor-pointer'}
                                            `}
                                        >
                                            <span className="mb-2 sm:mb-3">{size.label}</span>
                                            <div className="absolute bottom-1 w-[88%] bg-white rounded-md text-[8px] sm:text-[9px] font-bold text-gray-800 py-0.5 text-center">
                                                {size.status}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h3 className="font-['Baloo_2'] text-gray-700 font-extrabold text-[16px] mb-4">Choose Colour</h3>
                            <div className="grid grid-cols-5 gap-1.5 sm:gap-3 w-full items-center justify-items-center">
                                {colors.map((color) => {
                                    const isSelected = selectedColor === color.name;
                                    return (
                                        <div
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full"
                                        >
                                            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full p-[2px]">
                                                {isSelected && (
                                                    <>
                                                        <div className="absolute inset-0 border-[2px] border-[#F96E8F] rounded-full"></div>
                                                        <div className="absolute -top-1 -right-1 bg-[#F96E8F] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm z-10">
                                                            ✓
                                                        </div>
                                                    </>
                                                )}
                                                <div className="w-full h-full rounded-full overflow-hidden shadow-sm">
                                                    <img src={color.img} alt={color.name} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <span className="text-[10px] sm:text-[11px] font-extrabold text-gray-800 text-center truncate w-full">{color.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h3 className="text-gray-700 font-['Baloo_2'] font-extrabold text-[16px] mb-4">Delivery details</h3>
                            <div className="flex items-stretch h-11 sm:h-12 mb-4">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => {
                                        setPincode(e.target.value);
                                        setDeliveryStatus(null);
                                    }}
                                    maxLength="6"
                                    className="flex-1 min-w-0 h-full px-3 sm:px-4 text-[13px] sm:text-sm outline-none border border-gray-300 border-r-0 rounded-l-md font-bold text-gray-700 placeholder-gray-400"
                                />
                                <button
                                    onClick={checkPincode}
                                    className="h-full px-3 sm:px-6 bg-[#F96E8F] font-['Nunito'] text-white text-[12px] sm:text-[14px] font-bold rounded-r-md hover:bg-[#E44971] transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer flex items-center justify-center"
                                >
                                    Check availability
                                </button>
                            </div>
                            <div className="border-b border-dashed border-gray-200 mb-4"></div>

                            {/* Delivery Status Message */}
                            {deliveryStatus === 'loading' && (
                                <div className="text-blue-500 font-bold text-[13px] mb-4">
                                    Checking location...
                                </div>
                            )}
                            {deliveryStatus === 'available' && locationDetails && (
                                <div className="text-green-600 font-bold text-[13px] mb-4">
                                    ✓ Delivery is available to {locationDetails.area}, {locationDetails.district}, {locationDetails.state}!
                                </div>
                            )}
                            {deliveryStatus === 'unavailable' && locationDetails && (
                                <div className="text-red-500 font-bold text-[13px] mb-4">
                                    ✕ Delivery is not available to {locationDetails.state}. We currently only deliver to Tamil Nadu, Andhra Pradesh, Kerala, and Karnataka.
                                </div>
                            )}
                            {deliveryStatus === 'error' && (
                                <div className="text-red-500 font-bold text-[13px] mb-4">
                                    ✕ Invalid pincode or unable to fetch location details.
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <img src={truckLogo} alt="Delivery" className="w-6 h-6 object-contain" />
                                <span className="font-bold font-['Nunito'] text-[18px] text-gray-800 tracking-wide">
                                    Expected Delivery By {getExpectedDeliveryDate()}
                                </span>
                            </div>
                        </div>

                        {/* Actions (Add to Cart / Buy Now) */}
                        <div className="flex flex-col gap-4 mt-2">
                            {/* Top Row: Qty + Add to Cart */}
                            <div className="flex gap-4 h-[50px]">
                                {/* Quantity Selector */}
                                <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white w-[120px] text-[20.78px] font-bold border-[2px] border-dashed border-zinc-900 text-gray-700 shadow-sm">
                                    <button
                                        className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >−</button>
                                    <div className="flex-1 h-full flex items-center justify-center border-x border-gray-300">{quantity}</div>
                                    <button
                                        className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >+</button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={() => addToCart && addToCart(product || shopProducts[0], quantity, selectedSize, selectedColor)}
                                    className="flex-1 h-full border-[2px] border-dashed border-[#F96E8F] text-[#F96E8F] rounded-full font-bold text-[20.78px] hover:bg-[#F96E8F] hover:text-white transition-colors tracking-wide bg-white shadow-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>

                            {/* Buy Now */}
                            <button
                                onClick={() => {
                                    if (addToCart) addToCart(product || shopProducts[0], quantity, selectedSize, selectedColor);
                                    window.history.pushState({}, '', '/cart');
                                }}
                                className="w-full h-[55px] bg-[#F96E8F] text-white rounded-full font-bold text-[20.78px] hover:bg-[#E44971] transition-colors shadow-md tracking-wide"
                            >
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Additional Information Section */}
            <div className="max-w-[1200px] bg-[#F4FCFF] rounded-2xl mx-auto px-4 py-8 lg:py-12 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column - Image */}
                    <div className="w-full flex items-center justify-center h-full">
                        <div className="relative rounded-[20px] overflow-hidden shadow-sm">
                            <img src={ad} alt="Product Details" className="w-[649px] h-[461px] object-cover" />
                            {/* Ad Badge */}
                            <div className="absolute top-4 right-4 font-['Helvetica_Now_Display'] bg-white/95 text-gray-800 text-[13px] font-extrabold px-3 py-1 rounded shadow-md uppercase tracking-wider z-10">
                                Ad
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Accordions */}
                    <div className="flex flex-col gap-4 justify-center">
                        {accordionItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 flex items-center justify-center">
                                            <img src={bunnyIcon} alt="bunny" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="font-bold font-['Baloo_2'] text-[#555] text-[24px]">{item.title}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 text-gray-700 transition-transform ${openAccordion === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openAccordion === item.id && (
                                    <div className="px-5 pb-5 text-gray-600 font-bold text-[14px] whitespace-pre-line">
                                        {item.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Third Section: You May Also Like */}
            <div className="w-[calc(100%-2rem)] max-w-[1200px] bg-[#F4FCFF] rounded-[2rem] mx-auto p-5 sm:p-8 md:p-10 lg:p-12 mt-12 sm:mt-16 mb-12">
                <h2 className="text-[28px] md:text-[36px] font-bold text-gray-800 mb-8 font-['Baloo_2']">
                    You May <span className="text-[#F96E8F]">Also Like</span>
                </h2>

                <div className={`grid ${isMobile ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
                    {shopProducts.slice(carouselIndex, carouselIndex + itemsPerPage).map((item, index) => {
                        const itemWishlisted = Boolean(wishlistItems?.some(w => w.id && item.id ? w.id === item.id : w.title === item.title));
                        const themeBg = item.theme === 'yellow' ? 'bg-[#FFF8E7]' : item.theme === 'blue' ? 'bg-[#EBF7FF]' : 'bg-[#FFE5EC]';

                        return (
                            <div
                                key={item.id || index}
                                onClick={() => {
                                    window.history.pushState({ product: item }, '', '/product');
                                    window.dispatchEvent(new Event('popstate'));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`rounded-[24px] overflow-hidden flex flex-col justify-between group transition-all duration-300 relative cursor-pointer border border-pink-100/40 ${themeBg} shadow-sm hover:shadow-xl`}
                            >
                                {/* Top Image Area */}
                                <div className="h-[210px] sm:h-[240px] w-full p-0 relative flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-t-[17px] group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Best Selling Badge (Top Left - Appears on Hover) */}
                                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <div className="bg-[#00D0CC] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                                                <path d="m8.21 13.89-3 4.1c-.26.36-.02.85.43.85h3.6l1.26 3.16c.16.4.74.4 1 0L12.76 18.84h3.6c.45 0 .69-.49.43-.85l-3-4.1" />
                                            </svg>
                                            <span className="text-[12px] font-extrabold tracking-wide">Best Selling</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons (Top Right - Wishlist & Copy) */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        {/* Wishlist Heart */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(toggleWishlistAction(item));
                                            }}
                                            title="Add to Wishlist"
                                            className={`w-9 h-9 text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer ${
                                                itemWishlisted ? 'bg-[#F96E8F]' : 'bg-[#00D0CC] hover:bg-[#00b3b0]'
                                            }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={itemWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                            </svg>
                                        </button>
                                        {/* Compare / Copy Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (navigator.clipboard) {
                                                    navigator.clipboard.writeText(window.location.origin + '/product');
                                                }
                                            }}
                                            title="Copy Link"
                                            className="w-9 h-9 bg-[#00D0CC] hover:bg-[#00b3b0] text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Content area */}
                                <div className="bg-white m-[10px] mt-0 rounded-[18px] p-4 text-center flex-1 flex flex-col justify-center relative transition-all duration-300 shadow-xs">
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
                                                }
                                                setAddedItems(prev => ({ ...prev, [item.id || index]: true }));
                                                setTimeout(() => {
                                                    setAddedItems(prev => ({ ...prev, [item.id || index]: false }));
                                                }, 2000);
                                            }}
                                            className={`w-full py-2.5 px-4 border-2 border-[#F96E8F] rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs ${
                                                addedItems[item.id || index]
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
                <div className="w-full flex items-center justify-between mt-8 sm:mt-12 gap-4">
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
            </div>

            {/* Dynamic Share Product Modal */}
            {shareModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
                    onClick={() => setShareModalOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-[460px] rounded-[24px] shadow-2xl p-6 relative flex flex-col gap-5 border border-pink-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div>
                                <h3 className="text-[20px] font-black text-gray-900 font-['Baloo_2']">Share Product</h3>
                                <p className="text-[12px] text-gray-500 font-bold">Share this beautiful piece with your friends & family</p>
                            </div>
                            <button
                                onClick={() => setShareModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-50 hover:text-[#F96E8F] text-gray-500 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Product Summary Preview */}
                        <div className="flex items-center gap-3.5 bg-[#FFF5F7] border border-[#FDE5EB] rounded-[16px] p-3">
                            <img
                                src={defaultProduct?.image || productImages[0]}
                                alt={defaultProduct?.title}
                                className="w-14 h-14 rounded-xl object-cover border border-pink-200/60 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-extrabold text-[15px] text-gray-900 truncate">{defaultProduct?.title || 'Product'}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[#F96E8F] font-black text-[15px]">₹{defaultProduct?.price}</span>
                                    {defaultProduct?.oldPrice && (
                                        <span className="text-gray-400 font-bold text-[12px] line-through">₹{defaultProduct?.oldPrice}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Share Options Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* WhatsApp */}
                            <button
                                onClick={() => handleShareClick('whatsapp')}
                                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] bg-[#E8F8EE] hover:bg-[#D3F3DE] text-[#25D366] transition-all hover:scale-105 cursor-pointer shadow-xs border border-[#C2ECCF]"
                            >
                                <img src={whatsapp} alt="WhatsApp" className="w-10 h-10 object-contain" />
                                <span className="text-[12px] font-extrabold text-gray-800">WhatsApp</span>
                            </button>

                            {/* Facebook */}
                            <button
                                onClick={() => handleShareClick('facebook')}
                                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] bg-[#EAF2FE] hover:bg-[#D5E5FD] text-[#1877F2] transition-all hover:scale-105 cursor-pointer shadow-xs border border-[#BED7FB]"
                            >
                                <img src={facebook} alt="Facebook" className="w-10 h-10 object-contain" />
                                <span className="text-[12px] font-extrabold text-gray-800">Facebook</span>
                            </button>

                            {/* Email */}
                            <button
                                onClick={() => handleShareClick('email')}
                                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] bg-[#FDEEED] hover:bg-[#FCDCDA] text-[#EA4335] transition-all hover:scale-105 cursor-pointer shadow-xs border border-[#F8C4C0]"
                            >
                                <img src={mail} alt="Email" className="w-10 h-10 object-contain" />
                                <span className="text-[12px] font-extrabold text-gray-800">Email</span>
                            </button>

                            {/* X (Twitter) */}
                            <button
                                onClick={() => handleShareClick('x')}
                                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] bg-gray-100 hover:bg-gray-200 text-black transition-all hover:scale-105 cursor-pointer shadow-xs border border-gray-200"
                            >
                                <img src={x} alt="X (Twitter)" className="w-10 h-10 object-contain" />
                                <span className="text-[12px] font-extrabold text-gray-800">X (Twitter)</span>
                            </button>

                            {/* Pinterest */}
                            <button
                                onClick={() => handleShareClick('pinterest')}
                                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] bg-[#FDE6E9] hover:bg-[#FBD0D6] text-[#E60023] transition-all hover:scale-105 cursor-pointer shadow-xs border border-[#F7B0BA]"
                            >
                                <img src={pinterest} alt="Pinterest" className="w-10 h-10 object-contain" />
                                <span className="text-[12px] font-extrabold text-gray-800">Pinterest</span>
                            </button>

                            {/* Copy Link */}
                            <button
                                onClick={() => handleShareClick('copy')}
                                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] bg-[#FFF0F4] hover:bg-[#FFE0E9] text-[#F96E8F] transition-all hover:scale-105 cursor-pointer shadow-xs border border-[#FDC2D2]"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#F96E8F] text-white flex items-center justify-center shadow-xs">
                                    {copied ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-[12px] font-extrabold text-gray-800">{copied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                        </div>

                        {/* Copy Link Input Bar */}
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-[14px] p-1.5 pl-3 mt-1">
                            <input
                                type="text"
                                readOnly
                                value={typeof window !== 'undefined' ? window.location.href : ''}
                                className="bg-transparent text-gray-600 text-[13px] font-bold outline-none flex-1 truncate"
                            />
                            <button
                                onClick={() => handleShareClick('copy')}
                                className={`px-4 py-2 rounded-[10px] font-black text-[12px] transition-all cursor-pointer shadow-xs ${copied
                                        ? 'bg-green-600 text-white'
                                        : 'bg-[#F96E8F] hover:bg-[#E44971] text-white'
                                    }`}
                            >
                                {copied ? '✓ Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ReviewsSection />
            <FAQSection />
            <Footer />
        </div>
    );
};

const ReviewsSection = () => {
    const [reviewStep, setReviewStep] = useState(null); // 'upload', 'write'
    const [filterBy, setFilterBy] = useState('Highest');
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleWriteReviewClick = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Please login to write a review');
            window.history.pushState({}, '', '/login');
            window.dispatchEvent(new Event('popstate'));
            return;
        }
        setReviewStep('upload');
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const timerIntervalRef = useRef(null);

    const startCamera = async () => {
        setIsCameraActive(true);
        setIsRecording(false);
        setRecordingTime(0);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(async () => {
                return await navigator.mediaDevices.getUserMedia({ video: true });
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera/microphone. Please check permissions.");
            setIsCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (isRecording) {
            stopVideoRecording();
        }
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
        setIsRecording(false);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    const startVideoRecording = () => {
        if (!videoRef.current || !videoRef.current.srcObject) return;
        const stream = videoRef.current.srcObject;
        recordedChunksRef.current = [];

        try {
            const options = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
                ? { mimeType: 'video/webm;codecs=vp9' }
                : (MediaRecorder.isTypeSupported('video/mp4') ? { mimeType: 'video/mp4' } : {});

            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    recordedChunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, { type: mediaRecorder.mimeType || 'video/mp4' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCapturedMedia(reader.result);
                    setCapturedMediaType('video');
                    setReviewStep('write');
                };
                reader.readAsDataURL(blob);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            timerIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Failed to start video recording:", err);
            alert("Video recording is not supported in this browser.");
        }
    };

    const stopVideoRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        setIsRecording(false);
        stopCamera();
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedMedia(dataUrl);
            setCapturedMediaType('image');
            stopCamera();
            setReviewStep('write');
        }
    };

    const handleCameraClick = () => {
        startCamera();
    };

    const closeUploadModal = () => {
        stopCamera();
        setReviewStep(null);
    };

    const [capturedMedia, setCapturedMedia] = useState(null);
    const [capturedMediaType, setCapturedMediaType] = useState('image'); // 'image' or 'video'

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isVideo = file.type.startsWith('video/');
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedMedia(e.target.result);
                setCapturedMediaType(isVideo ? 'video' : 'image');
                setReviewStep('write');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSkipUpload = () => {
        setReviewStep('write');
    };

    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [previewMedia, setPreviewMedia] = useState(null);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (reviewText.trim() || capturedMedia) {
            setReviews([{
                id: Date.now(),
                name: 'You',
                rating: reviewRating,
                text: reviewText,
                media: capturedMedia,
                mediaType: capturedMediaType
            }, ...reviews]);
        }
        stopCamera();
        setReviewStep(null);
        setReviewText('');
        setReviewRating(5);
        setCapturedMedia(null);
        setCapturedMediaType('image');
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        if (filterBy === 'Highest') return b.rating - a.rating;
        if (filterBy === 'Lowest') return a.rating - b.rating;
        return b.id - a.id; // Most Recent or Most Helpful fallback
    });

    return (
        <div className="max-w-[1200px] bg-[#F4FCFF] rounded-[2rem] mx-auto p-6 md:p-10 lg:p-12 mt-4 mb-12">
            <h2 className="text-[28px] md:text-[41px] font-black text-gray-800 mb-8 font-['Nunito']">
                Reviews
            </h2>
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Section */}
                <div className="w-full lg:w-[35%] flex flex-col gap-6">
                    {/* Rating Bars */}
                    <div className="flex flex-col gap-2">
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = reviews.filter(r => r.rating === star).length;
                            const totalReviews = reviews.length;
                            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <div className="flex text-[#F76188]">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${i < star ? "text-[#F2EA1E] fill-current" : "text-gray-400 stroke-current"}`} fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                                        <div className="h-full bg-[#F96E8F] rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                    <span className="text-gray-600 font-bold w-4 text-sm">{count}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Write Review Button */}
                    <button onClick={handleWriteReviewClick} className="w-48 mx-auto mt-4 py-3 bg-[#F76188] text-white text-[24px] font-['Baloo_2'] font-bold rounded-[1rem] hover:bg-[#E44971] transition-colors shadow-md">
                        Write a Review
                    </button>

                    <h3 className="text-center font-bold font-['Baloo_2'] text-gray-800 mt-4 text-[20px]">Photos & Videos</h3>

                    {/* Grid */}
                    {reviews.filter(r => r.media).length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {reviews.filter(r => r.media).map((r) => (
                                <div
                                    key={r.id}
                                    onClick={() => setPreviewMedia(r)}
                                    className="aspect-square bg-white rounded-lg flex items-center justify-center relative shadow-sm overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                    {r.mediaType === 'video' || (typeof r.media === 'string' && r.media.startsWith('data:video')) ? (
                                        <div className="w-full h-full relative">
                                            <video src={r.media} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <div className="w-7 h-7 rounded-full bg-white/90 text-[#F96E8F] flex items-center justify-center text-xs font-bold pl-0.5 shadow-md group-hover:scale-110 transition-transform">
                                                    ▶
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={r.media} alt="Review" className="w-full h-full object-cover" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-[13px] text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">No photos or videos uploaded yet</p>
                    )}
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-[65%] flex flex-col">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 pb-6 border-b border-gray-300">
                        {['Highest', 'Lowest', 'Most Recent', 'Most Helpful'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setFilterBy(filter)}
                                className={`px-6 py-2 rounded-[0.8rem] border-[1.5px] font-[Baloo_2] font-bold text-[17px] transition-colors ${filterBy === filter ? 'bg-[#F76188] text-white border-[#F76188]' : 'bg-transparent border-gray-400 text-gray-700 hover:border-gray-800'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Review List */}
                    <div className="flex flex-col mt-6">
                        {sortedReviews.length === 0 ? (
                            <p className="text-gray-400 font-bold text-center py-12 text-[15px]">No reviews yet. Be the first to review!</p>
                        ) : (
                            sortedReviews.map((review) => (
                                <div key={review.id} className="py-6 border-b border-gray-300 last:border-0 first:pt-0">
                                    <div className="flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${i < review.rating ? "text-[#F2EA1E] fill-current" : "text-gray-300 stroke-current"}`} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-[#F76188] rounded-lg flex items-center justify-center text-white">
                                            <img src={user} alt="user" className='w-5 h-6 object-contain' />
                                        </div>
                                        <span className=" font-['Nunito'] text-gray-700 text-[18px]">{review.name}</span>
                                    </div>
                                    <p className="text-gray-600 font-['Nunito'] text-[18px] leading-relaxed mb-3">
                                        {review.text}
                                    </p>
                                    {review.media && review.mediaType !== 'video' && !(typeof review.media === 'string' && review.media.startsWith('data:video')) && (
                                        <div className="mt-2 max-w-xs">
                                            <img src={review.media} alt="Review attachment" className="w-32 h-32 rounded-xl object-cover border border-gray-200 shadow-sm" />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {reviewStep === 'upload' && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full flex flex-col gap-6 shadow-2xl relative font-['Nunito']">
                        <button onClick={closeUploadModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>

                        {!isCameraActive ? (
                            <>
                                <h3 className="text-2xl font-black text-gray-800 text-center">Upload Photo or Video</h3>
                                <p className="text-center text-gray-500 font-medium text-sm">Upload an image/video or record one with your camera.</p>

                                <div className="flex gap-4 h-40">
                                    {/* Upload Option */}
                                    <div
                                        onClick={handleUploadClick}
                                        className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors p-3 text-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F96E8F] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span className="text-gray-700 font-bold text-sm">Upload File</span>
                                        <span className="text-gray-400 font-medium text-[11px]">Photo or Video</span>
                                    </div>

                                    {/* Capture Option */}
                                    <div
                                        onClick={handleCameraClick}
                                        className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors p-3 text-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#04BCC6] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-700 font-bold text-sm">Camera</span>
                                        <span className="text-gray-400 font-medium text-[11px]">Take Photo / Video</span>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*,video/*"
                                    className="hidden"
                                />

                                <div className="flex gap-4">
                                    <button onClick={handleSkipUpload} className="flex-1 py-3 border-[1.5px] border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">Skip</button>
                                    <button onClick={handleSkipUpload} className="flex-1 py-3 bg-[#F76188] text-white font-bold rounded-xl hover:bg-[#E44971] transition-colors">Next</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-black text-gray-800 text-center">Camera & Video Recorder</h3>
                                <div className="relative w-full h-64 bg-black rounded-2xl overflow-hidden flex items-center justify-center mt-2">
                                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                                    <canvas ref={canvasRef} className="hidden"></canvas>

                                    {isRecording && (
                                        <div className="absolute top-3 left-3 bg-red-600/90 text-white font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-pulse z-10">
                                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                                            <span>REC {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center gap-4 mt-4">
                                    {!isRecording ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={capturePhoto}
                                                className="flex-1 py-3 bg-[#F96E8F] text-white font-black rounded-xl hover:bg-[#E44971] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer text-sm"
                                            >
                                                📷 Take Photo
                                            </button>
                                            <button
                                                type="button"
                                                onClick={startVideoRecording}
                                                className="flex-1 py-3 bg-[#04BCC6] text-white font-black rounded-xl hover:bg-[#0399A2] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer text-sm"
                                            >
                                                🎥 Record Video
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={stopVideoRecording}
                                            className="w-full py-3.5 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer text-[15px]"
                                        >
                                            ⏹ Stop & Save Video
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {reviewStep === 'write' && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full flex flex-col gap-6 shadow-2xl relative font-['Nunito']">
                        <button onClick={() => { stopCamera(); setReviewStep(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>
                        <h3 className="text-2xl font-black text-gray-800 text-center">Write Review</h3>

                        <div className="flex justify-center text-3xl cursor-pointer">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    onClick={() => setReviewRating(star)}
                                    className={`transition-colors ${star <= reviewRating ? 'text-[#F2EA1E]' : 'text-gray-300'} hover:text-[#F2EA1E]`}
                                >★</span>
                            ))}
                        </div>

                        {capturedMedia && (
                            <div className="flex justify-center">
                                {capturedMediaType === 'video' || (typeof capturedMedia === 'string' && capturedMedia.startsWith('data:video')) ? (
                                    <video src={capturedMedia} controls className="w-48 h-36 object-cover rounded-xl shadow-md border-[1.5px] border-gray-200" />
                                ) : (
                                    <img src={capturedMedia} alt="Captured" className="w-24 h-24 object-cover rounded-xl shadow-md border-[1.5px] border-gray-200" />
                                )}
                            </div>
                        )}

                        <textarea
                            rows="4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full border-[1.5px] border-gray-300 rounded-xl p-4 outline-none focus:border-[#F96E8F] font-medium text-gray-700 resize-none"
                            placeholder="Tell us what you loved..."
                        ></textarea>
                        <button onClick={handleSubmitReview} className="w-full py-3 bg-[#F96E8F] text-white font-bold rounded-xl hover:bg-[#E44971] transition-colors">Submit Review</button>
                    </div>
                </div>
            )}

            {/* Media Lightbox Modal for Playing Review Videos & Viewing Photos */}
            {previewMedia && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-[110] p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl relative font-['Nunito']">
                        <button
                            onClick={() => setPreviewMedia(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-black text-gray-800">
                            Customer Review {previewMedia.mediaType === 'video' || (typeof previewMedia.media === 'string' && previewMedia.media.startsWith('data:video')) ? 'Video' : 'Photo'} {previewMedia.name ? `by ${previewMedia.name}` : ''}
                        </h3>

                        <div className="w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[60vh]">
                            {previewMedia.mediaType === 'video' || (typeof previewMedia.media === 'string' && previewMedia.media.startsWith('data:video')) ? (
                                <video src={previewMedia.media} controls autoPlay className="w-full max-h-[60vh] object-contain" />
                            ) : (
                                <img src={previewMedia.media} alt="Review" className="w-full max-h-[60vh] object-contain" />
                            )}
                        </div>

                        {previewMedia.text && (
                            <p className="text-gray-600 font-medium text-sm leading-relaxed border-t border-gray-100 pt-3">
                                "{previewMedia.text}"
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = React.useState(null);
    const faqs = [
        { q: "Is the jewellery safe for kids?", a: "Yes! All our products are hypoallergenic, lead-free, and nickel-free." },
        { q: "Can I return or exchange the item?", a: "Absolutely! We offer a hassle-free 7-day return policy." },
        { q: "How long does shipping take?", a: "Standard delivery takes 2-5 business days depending on your location." },
        { q: "Does the colour fade?", a: "Our items are coated with anti-tarnish layers to prevent fading." },
        { q: "How should I clean the jewellery?", a: "Wipe gently with a soft cloth after each use and keep it away from water." }
    ];

    return (
        <div className="max-w-[1200px] bg-[#F4FCFF] rounded-[2rem] mx-auto p-6 md:p-10 lg:p-12 mt-4 mb-12">
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-[24px] md:text-[28px] font-black text-[#2B2B2B] font-['Nunito']">
                    Frequently Asked Questions
                </h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2B2B2B] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-[1.2rem] flex flex-col shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                        <div
                            className="p-6 flex justify-between items-center cursor-pointer"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <span className="font-bold text-gray-700 text-[16px]">{faq.q}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-800 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {openIndex === index && (
                            <div className="px-6 pb-6 text-gray-600 text-[15px] font-medium border-t border-gray-100 pt-4">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>

    );

};

export default Product;
