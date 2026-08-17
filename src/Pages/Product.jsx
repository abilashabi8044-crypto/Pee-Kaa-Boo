import React, { useState, useRef } from 'react';
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
import arrowRight from '../assets/product/arrow-r.png';
import { gridItems } from './Shop';

const Product = ({ product, cartItems, addToCart }) => {
    const [selectedSize, setSelectedSize] = useState('24');
    const [selectedColor, setSelectedColor] = useState('Gold');
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState(null);
    const [locationDetails, setLocationDetails] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [carouselIndex, setCarouselIndex] = useState(0);
    const shopProducts = gridItems.filter(item => item.type === 'product');
    const maxCarouselIndex = Math.max(0, shopProducts.length - 4);

    const defaultProduct = product || shopProducts[0];
    const productImages = defaultProduct?.images || Array(4).fill(defaultProduct?.image);

    const handleNextCarousel = () => setCarouselIndex(prev => Math.min(prev + 1, maxCarouselIndex));
    const handlePrevCarousel = () => setCarouselIndex(prev => Math.max(prev - 1, 0));

    const progressWidth = shopProducts.length > 0
        ? ((carouselIndex + Math.min(4, shopProducts.length)) / shopProducts.length) * 100
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
        { 
            id: 'faq', 
            title: 'Frequently Asked Questions', 
            content: 'Q: Is the jewellery hypoallergenic?\nA: Yes, all our products are lead and nickel free, making them safe for sensitive skin.\n\nQ: Can I return the item if it doesn\'t fit?\nA: Absolutely! We offer a hassle-free 7-day return policy.\n\nQ: Does the colour fade?\nA: Our items are coated with anti-tarnish layers to prevent fading. With proper care, they will last for years.' 
        }
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
        <div className="w-full min-h-screen bg-[#ffffff] font-['Nunito'] pb-12">
            <Header cartItems={cartItems} />

            {/* Breadcrumbs */}
            <div className="max-w-[1200px] mx-auto px-4 pt-8 pb-2">
                <div className="text-[18px] text-[#888] font-medium flex items-center flex-wrap gap-2">
                    <button onClick={() => window.location.href = '/'} className="hover:text-[#F96E8F] transition-colors">Home</button>
                    <span>&gt;</span>
                    <button onClick={() => window.location.href = '/shop'} className="hover:text-[#F96E8F] transition-colors">shop</button>
                    <span>&gt;</span>
                    <button onClick={() => window.location.href = `/${product?.category?.toLowerCase().replace(/\s+/g, '-') || 'boys-collections'}`} className="hover:text-[#F96E8F] transition-colors">{product?.category || 'Boys Collections'}</button>
                    <span className="text-[#F96E8F]">&gt; {product?.title || 'Product 1'}</span>
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
                                <button className="w-10 h-10 bg-[#00D0CC] text-white rounded-full flex items-center justify-center hover:bg-[#00b3b0] transition-colors shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                                <button className="w-10 h-10 bg-[#00D0CC] text-white rounded-full flex items-center justify-center hover:bg-[#00b3b0] transition-colors shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
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
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => {
                                    const isSelected = selectedSize === size.label;
                                    const isOut = size.status === 'Out of stock';
                                    return (
                                        <button
                                            key={size.label}
                                            onClick={() => !isOut && setSelectedSize(size.label)}
                                            className={`
                                                relative w-[85px] h-14 rounded-[10px] flex flex-col items-center justify-center font-black text-[15px] transition-all overflow-hidden
                                                ${isSelected ? 'bg-[#F96E8F] text-white shadow-md' : 'bg-[#BCBCBC] font-[Nunito] text-white'}
                                                ${isOut ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}
                                            `}
                                        >
                                            <span className="mb-3">{size.label}</span>
                                            <div className="absolute bottom-1 w-[80%] bg-white rounded-md text-[9px] font-bold text-gray-800 py-0.5">
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
                            <div className="flex flex-wrap gap-6 items-center">
                                {colors.map((color) => {
                                    const isSelected = selectedColor === color.name;
                                    return (
                                        <div
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className="flex flex-col items-center gap-2 cursor-pointer group"
                                        >
                                            <div className="relative w-14 h-14 rounded-full p-[2px]">
                                                {isSelected && (
                                                    <>
                                                        <div className="absolute inset-0 border-[2px] border-[#F96E8F] rounded-full"></div>
                                                        <div className="absolute -top-1 -right-1 bg-[#F96E8F] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm z-10">
                                                            ✓
                                                        </div>
                                                    </>
                                                )}
                                                <div className="w-full h-full rounded-full overflow-hidden shadow-sm">
                                                    <img src={color.img} alt={color.name} className=" w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <span className="text-[11px] font-extrabold text-gray-800">{color.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h3 className="text-gray-700 font-['Baloo_2'] font-extrabold text-[16px] mb-4">Delivery details</h3>
                            <div className="flex h-12 mb-4 border-b border-dashed border-gray-300 pb-4">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => {
                                        setPincode(e.target.value);
                                        setDeliveryStatus(null);
                                    }}
                                    maxLength="6"
                                    className="flex-1 h-full px-4 text-sm outline-none border border-gray-300 border-r-0 rounded-l-md font-bold text-gray-700 placeholder-gray-400"
                                />
                                <button
                                    onClick={checkPincode}
                                    className="h-full px-6 bg-[#F96E8F] font-['Nunito'] text-white text-[14px] font-medium rounded-r-md hover:bg-[#E44971] transition-colors"
                                >
                                    Check availability
                                </button>
                            </div>

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
            <div className="max-w-[1200px] bg-[#F4FCFF] rounded-[2rem] mx-auto p-6 md:p-10 lg:p-12 mt-16 mb-12">
                <h2 className="text-[28px] md:text-[36px] font-bold text-gray-800 mb-8 font-['Baloo_2']">
                    You May <span className="text-[#F96E8F]">Also Like</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {shopProducts.slice(carouselIndex, carouselIndex + 4).map((item, index) => {
                        return (
                            <div key={index} className="rounded-[2rem] p-4 flex flex-col relative overflow-hidden group shadow-sm h-[340px]">
                                <img src={item.image} alt="Product" className="w-full h-full object-cover absolute top-0 left-0 " />

                                <div className="h-[110px] absolute bottom-4 left-4 right-4 bg-white rounded-[1.2rem] p-4 text-center shadow-md z-10">
                                    <p className="text-[9px] text-gray-400 font-[Nunito] font-semibold uppercase mb-1">{item.category}</p>
                                    <h3 className="font-bold text-gray-800 text-[18px] mb-2 font-['Nunito']">{item.title}</h3>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-gray-400 font-bold text-[13px] line-through">₹ {item.oldPrice}</span>
                                        <span className="text-[#F96E8F] font-[Nunito] font-bold text-[22.43px]">₹ {item.price}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Slider Controls */}
                <div className="flex items-center justify-between mt-12">
                    {/* Progress Line */}
                    <div className="flex-1 h-[2px] bg-gray-300 mr-8 relative rounded-full">
                        <div className="absolute left-0 top-0 h-full bg-[#F96E8F] rounded-full transition-all duration-300" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                    {/* Arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrevCarousel}
                            disabled={carouselIndex === 0}
                            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors bg-transparent disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <img src={arrowLeft} alt="Previous" />
                        </button>
                        <button
                            onClick={handleNextCarousel}
                            disabled={carouselIndex >= maxCarouselIndex}
                            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors bg-transparent disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <img src={arrowRight} alt="Next" />
                        </button>
                    </div>
                </div>
            </div>

            <ReviewsSection />
            <FAQSection />

        </div>
    );
};

const ReviewsSection = () => {
    const [reviewStep, setReviewStep] = useState(null); // 'upload', 'write'
    const [filterBy, setFilterBy] = useState('Highest');
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const [isCameraActive, setIsCameraActive] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleWriteReviewClick = () => {
        setReviewStep('upload');
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const startCamera = async () => {
        setIsCameraActive(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please allow camera permissions.");
            setIsCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setIsCameraActive(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedMedia(dataUrl);
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedMedia(e.target.result);
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
    const [capturedMedia, setCapturedMedia] = useState(null);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (reviewText.trim() || capturedMedia) {
            setReviews([{ id: Date.now(), name: 'You', rating: reviewRating, text: reviewText, media: capturedMedia }, ...reviews]);
        }
        setReviewStep(null);
        setReviewText('');
        setReviewRating(5);
        setCapturedMedia(null);
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        if (filterBy === 'Highest') return b.rating - a.rating;
        if (filterBy === 'Lowest') return a.rating - b.rating;
        return b.id - a.id; // Most Recent or Most Helpful fallback
    });

    return (
        <div className="max-w-[1200px] bg-[#F4FCFF] rounded-[2rem] mx-auto p-6 md:p-10 lg:p-12 mt-4 mb-12">
            <h2 className="text-[28px] md:text-[36px] font-black text-gray-800 mb-8 font-['Nunito']">
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
                    <button onClick={handleWriteReviewClick} className="w-48 mx-auto mt-4 py-3 bg-[#F76188] text-white font-bold rounded-[1rem] hover:bg-[#E44971] transition-colors shadow-md">
                        Write a Review
                    </button>

                    <h3 className="text-center font-bold text-gray-800 mt-4 text-[16px]">Photos & Videos</h3>

                    {/* Grid */}
                    {reviews.filter(r => r.media).length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {reviews.filter(r => r.media).map((r) => (
                                <div key={r.id} className="aspect-square bg-white rounded-lg flex items-center justify-center relative shadow-sm overflow-hidden">
                                    <img src={r.media} alt="Review" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-[13px] text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">No photos uploaded yet</p>
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
                                className={`px-6 py-2 rounded-[0.8rem] border-[1.5px] font-bold text-[13px] transition-colors ${filterBy === filter ? 'bg-[#F76188] text-white border-[#F76188]' : 'bg-transparent border-gray-400 text-gray-700 hover:border-gray-800'}`}
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
                            sortedReviews.map((review, i) => (
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-gray-700 text-[14px]">{review.name}</span>
                                    </div>
                                    <p className="text-gray-600 font-medium text-[14px] leading-relaxed">
                                        {review.text}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {reviewStep === 'upload' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full flex flex-col gap-6 shadow-2xl relative">
                        <button onClick={closeUploadModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>

                        {!isCameraActive ? (
                            <>
                                <h3 className="text-2xl font-black text-gray-800 text-center font-['Nunito']">Upload Media</h3>
                                <p className="text-center text-gray-500 font-medium text-sm">Drop a picture/video here or capture one.</p>

                                <div className="flex gap-4 h-40">
                                    {/* Upload Option */}
                                    <div
                                        onClick={handleUploadClick}
                                        className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span className="text-gray-400 font-bold text-sm">Upload File</span>
                                    </div>

                                    {/* Capture Option */}
                                    <div
                                        onClick={handleCameraClick}
                                        className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-gray-400 font-bold text-sm">Take Photo</span>
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
                                <h3 className="text-2xl font-black text-gray-800 text-center font-['Nunito']">Camera</h3>
                                <div className="relative w-full h-64 bg-black rounded-2xl overflow-hidden flex items-center justify-center mt-2">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                                    <canvas ref={canvasRef} className="hidden"></canvas>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button onClick={capturePhoto} className="w-16 h-16 bg-white border-4 border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:border-[#F96E8F] transition-colors">
                                        <div className="w-12 h-12 bg-[#F76188] rounded-full"></div>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {reviewStep === 'write' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full flex flex-col gap-6 shadow-2xl relative">
                        <button onClick={() => setReviewStep(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>
                        <h3 className="text-2xl font-black text-gray-800 text-center font-['Nunito']">Write Review</h3>

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
                                <img src={capturedMedia} alt="Captured" className="w-24 h-24 object-cover rounded-xl shadow-md border-[1.5px] border-gray-200" />
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
