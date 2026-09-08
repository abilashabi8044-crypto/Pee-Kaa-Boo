import YouMayAlsoLike from '../components/YouMayAlsoLike';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Assets
import leftCar from '../assets/cart/left-img.png';
import rightBunny from '../assets/cart/right-img.png';
import headerBg from '../assets/cart/shop-bg.png';
import shopMobBg from '../assets/shop/shop-mob-bg.png';
import cloud from '../assets/shop/cloud.png';
import prod1 from '../assets/shop/62741597f1c25de37c22ae67896b59fca2148f7e.jpg';
import arrowLeft from '../assets/product/arrow-l.png';
import arrowRight from '../assets/product/arrow-r.png';
import discount from '../assets/cart/discount.png';
import location from '../assets/cart/location.png';
import { gridItems } from './Shop';

const recommendedProducts = gridItems.filter(item => item.type === 'product');

const Cart = ({ cartItems = [], updateQuantity, addToCart }) => {
  const [localQty, setLocalQty] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [pincode, setPincode] = useState('');
  const [isChangingPincode, setIsChangingPincode] = useState(false);
  const [newPincode, setNewPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [pincodeLocation, setPincodeLocation] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('updated'); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (toastTrigger > 0) {
      const timer = setTimeout(() => {
        setToastTrigger(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastTrigger]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setAppliedCoupon(false);
      setAppliedCouponCode('');
      setCouponCode('');
      setShowCouponInput(false);
    }
  }, [cartItems]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const checkPincode = async (code) => {
    if (!code || code.length !== 6) {
      setPincodeStatus('error');
      setPincodeLocation(null);
      return;
    }
    setPincodeStatus('loading');
    setPincodeLocation(null);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${code}`);
      const data = await response.json();
      if (data && data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0];
        setPincodeLocation({ area: postOffice.Name, district: postOffice.District, state: postOffice.State });
        const allowedStates = ['Tamil Nadu', 'Andhra Pradesh', 'Kerala', 'Karnataka'];
        setPincodeStatus(allowedStates.includes(postOffice.State) ? 'available' : 'unavailable');
      } else {
        setPincodeStatus('error');
      }
    } catch {
      setPincodeStatus('error');
    }
  };

  const handleQtyChange = (item, delta) => {
    if (updateQuantity) {
      if (delta === -1 && (item.quantity || 1) <= 1) {
        setToastType('removed');
      } else {
        setToastType('updated');
      }
      updateQuantity(item, delta);
      setToastTrigger(prev => prev + 1);
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

  // Financial calculations
  const displayItemTotal = cartItems.reduce((acc, item) => acc + ((item.oldPrice || 2000) * (item.quantity || 1)), 0);
  const displaySaved = cartItems.reduce((acc, item) => acc + (((item.oldPrice || 2000) - (item.price || 1710)) * (item.quantity || 1)), 0);
  const couponDiscount = appliedCoupon && cartItems.length > 0 ? 1000 : 0;
  const shippingCost = 0;
  const displayBillTotal = Math.max(0, displayItemTotal - displaySaved - couponDiscount + shippingCost);

  const itemsPerPage = isMobile ? 1 : 4;
  const maxCarousel = Math.max(0, recommendedProducts.length - itemsPerPage);
  const handlePrevCarousel = () => setCarouselIndex(prev => Math.max(0, prev - 1));
  const handleNextCarousel = () => setCarouselIndex(prev => Math.min(maxCarousel, prev + 1));
  const progressWidth = recommendedProducts.length > 0
    ? ((carouselIndex + Math.min(itemsPerPage, recommendedProducts.length)) / recommendedProducts.length) * 100
    : 100;

  return (
    <div className="w-full min-h-screen bg-white font-['Baloo_2'] flex flex-col">
      {/* Combined Header & Hero Banner Section with responsive background */}
      <div
        className="w-full relative bg-no-repeat bg-center shop-hero-bg"
        style={{
          '--shop-bg-mob': `url(${shopMobBg})`,
          '--shop-bg-desk': `url(${headerBg})`,
          backgroundPosition: 'center top'
        }}
      >
        {/* Cloud Decoration (Mobile Responsive) */}
        <img
          src={cloud}
          alt="cloud"
          className="absolute top-[-122px] sm:top-[-118px] lg:top-[-25px] left-[54%] -translate-x-1/2 lg:left-0 lg:translate-x-0 w-full md:w-[340px] lg:w-[330px] xl:w-[360px] h-auto object-contain pointer-events-none z-30 lg:z-auto md:hidden"
        />

        {/* Header Navigation */}
        <Header cartItems={cartItems} />

        {/* Hero Heading Content */}
        <div className="w-full relative pt-6 pb-20 sm:pb-28 flex flex-col items-center justify-center">
          {/* Breadcrumb & Heading */}
          <div className="text-center z-10 px-4">
            <h1 className="text-[32px] md:text-[72px] font-black text-gray-900 mb-2 tracking-wide">
              My <span className="text-[#F96E8F]">Cart</span>
            </h1>
            <div className="text-[20px] md:text-base font-extrabold text-gray-800 flex items-center justify-center gap-2">
              <button onClick={() => navigateTo('/')} className="hover:text-[#F96E8F] transition-colors cursor-pointer">
                Home
              </button>
              <span>&gt;</span>
              <span className="text-[#F96E8F]">My Cart</span>
            </div>
          </div>

          {/* Decorative Car (Left) */}
          <img
            src={leftCar}
            alt="Car Illustration"
            className="hidden sm:block absolute left-[16px] lg:left-[64px] top-[20px] md:top-[40px] lg:top-[60px] w-[80px] md:w-[96px] lg:w-[116px] h-auto object-contain pointer-events-none z-10"
          />

          {/* Decorative Bunny (Right) */}
          <img
            src={rightBunny}
            alt="Bunny Illustration"
            className="hidden sm:block absolute right-[16px] lg:right-[64px] top-[20px] md:top-[40px] lg:top-[52px] w-[112px] md:w-[144px] lg:w-[176px] h-auto object-contain pointer-events-none z-10"
          />
        </div>
      </div>

      {/* Main Cart Content Area */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 pt-8 pb-20 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">

          {/* Left Column: Cart Items & Actions */}
          <div className="lg:col-span-7 bg-[#F4FCFF] rounded-3xl p-4 sm:p-8 flex flex-col justify-start lg:justify-between shadow-sm min-h-0 lg:min-h-[520px]">
            <div>
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm text-center flex flex-col items-center justify-center h-full border border-sky-100 mb-4">
                  <div className="w-24 h-24 bg-[#F9E2E8] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F96E8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <button
                    onClick={() => navigateTo('/shop')}
                    className="bg-[#F96E8F] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#E44971] transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={item.id || index} className="bg-white rounded-2xl p-3 sm:p-5 shadow-sm mb-3 sm:mb-4 flex flex-row items-center sm:items-start justify-between gap-3 sm:gap-4 border border-sky-100">

                    {/* Product Thumbnail */}
                    <div className="w-[115px] h-[115px] sm:w-38 sm:h-38 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F9E2E8] p-1 flex items-center justify-center">
                      <img
                        src={item.image || prod1}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-left flex flex-col justify-between self-stretch py-0.5 sm:py-0">
                      <div>
                        <h3 className="text-gray-900 font-bold sm:font-extrabold text-[18px] sm:text-[25px] leading-tight font-['Baloo_2']">
                          {item.title || 'Name of the product'}
                        </h3>
                        <p className="text-gray-900 sm:text-gray-500 font-bold text-[12px] sm:text-[15px] mt-0.5 sm:mb-1">
                          Product Code : {item.code || (item.id ? `64A288${item.id}` : '64A288075')}
                        </p>
                        <p className="text-gray-900 sm:text-gray-700 font-extrabold text-[12px] sm:text-[17px] my-1.5 sm:mt-16 sm:mb-3">
                          Expected Delivery Date : {getExpectedDeliveryDate()}
                        </p>
                      </div>

                      {/* Desktop Only Quantity Control Buttons */}
                      <div className="hidden sm:flex items-center justify-start gap-1">
                        <div className="flex items-center border-2 border-dashed border-[#000000] rounded-[18px] overflow-hidden bg-white shadow-xs">
                          <button
                            onClick={() => handleQtyChange(item, 1)}
                            className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors text-lg"
                          >
                            +
                          </button>
                          <span className="w-10 text-center font-black text-gray-800 text-sm">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item, -1)}
                            className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors text-lg"
                          >
                            -
                          </button>
                        </div>
                      </div>

                      {/* Mobile Only Bottom Row (Prices on Left, Quantity on Right) */}
                      <div className="flex sm:hidden items-center justify-between mt-auto pt-1">
                        <div className="flex items-center gap-1.5">
                          <del className="text-gray-400 font-bold text-[14px]">
                            ₹{item.oldPrice || 2000}
                          </del>
                          <span className="text-[#F96E8F] font-black text-[24px] font-['Nunito']">
                            ₹ {item.price || 1710}
                          </span>
                        </div>

                        {/* Mobile Quantity Control */}
                        <div className="flex items-center border border-dashed border-gray-600 rounded-full overflow-hidden bg-white px-0.5 py-0.5">
                          <button
                            onClick={() => handleQtyChange(item, 1)}
                            className="w-5 h-5 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer text-xs"
                          >
                            +
                          </button>
                          <span className="w-5 text-center font-black text-gray-800 text-xs border-x border-dashed border-gray-400">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item, -1)}
                            className="w-5 h-5 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer text-xs"
                          >
                            -
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Desktop Only Price Tag */}
                    <div className="hidden sm:flex sm:flex-row items-end justify-end mt-48 gap-1 text-right min-w-[100px]">
                      <del className="text-gray-400 font-bold text-[20px]">
                        ₹{item.oldPrice || 2000}
                      </del>
                      <span className="text-[#F96E8F] font-black text-[25px] font-['Nunito']">
                        ₹ {item.price || 1710}
                      </span>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 sm:mt-8 flex flex-col items-center text-center gap-3">
              <button
                onClick={() => navigateTo('/shop')}
                className="text-[#F96E8F] font-bold text-[17px] sm:text-base hover:underline cursor-pointer transition-colors"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => {
                  if (cartItems.length > 0) {
                    navigateTo('/checkout');
                  }
                }}
                disabled={cartItems.length === 0}
                className={`hidden lg:block w-full max-w-[380px] text-white py-3.5 px-8 rounded-[16px] font-bold text-base sm:text-lg shadow-md transition-all tracking-wide uppercase ${cartItems.length === 0
                    ? 'bg-gray-400 cursor-not-allowed opacity-70'
                    : 'bg-[#F96E8F] hover:bg-[#E44971] cursor-pointer'
                  }`}
              >
                Proceed to Checkout
              </button>
            </div>

          </div>

          {/* Right Column: Coupons & Bill Details */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Apply Coupon Box */}
            <div
              className={`rounded-xl flex bg-white shadow-xs ${cartItems.length === 0 ? 'opacity-60' : ''}`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'12\' ry=\'12\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'14%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
            >
              <div
                className="flex items-center gap-4 p-4 flex-1"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cline x1=\'100%25\' y1=\'15%25\' x2=\'100%25\' y2=\'85%25\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'8%2c 8\' /%3e%3c/svg%3e")' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] text-white flex items-center justify-center font-black">
                  <img src={discount} alt="" className={`h-[36px] w-[36px] ${cartItems.length === 0 ? 'grayscale opacity-60' : ''}`} />
                </div>
                <span className={`font-bold text-[21px] md:text-[28px] font-[Baloo_2] tracking-wide ${cartItems.length === 0 ? 'text-gray-400' : 'text-[#F96E8F]'}`}>
                  Apply Coupon
                </span>
              </div>
              <button
                onClick={() => {
                  if (cartItems.length === 0) return;
                  if (appliedCoupon) {
                    setAppliedCoupon(false);
                    setAppliedCouponCode('');
                    setCouponCode('');
                  } else {
                    setShowCouponInput(true);
                  }
                }}
                disabled={cartItems.length === 0}
                className={`font-bold text-[16px] md:text-[21px] px-8 cursor-pointer ${cartItems.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#F96E8F] hover:underline'}`}
              >
                {appliedCoupon ? 'Remove' : 'Apply'}
              </button>
            </div>

            {/* Specific Offer Card */}
            <div className={`border rounded-xl p-4 bg-white flex justify-between items-center shadow-xs ${cartItems.length === 0 ? 'border-gray-200 opacity-60' : 'border-[#F96E8F]'}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#Fffff] text-white flex items-center justify-center font-black">
                  <img src={discount} alt="" className={`h-[24px] w-[24px] ${cartItems.length === 0 ? 'grayscale opacity-60' : ''}`} />
                </div>
                <div>
                  <h4 className={`font-[Baloo_2] font-bold text-[14px] md:text-[17px] uppercase ${cartItems.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}>FLAT ₹1000</h4>
                  <p className={`font-[Baloo_2] font-bold text-[12px] md:text-[15px] ${cartItems.length === 0 ? 'text-gray-400' : 'text-gray-800'}`}>Flat 1000 off on Preset jewellery</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (cartItems.length === 0) return;
                  if (appliedCoupon && appliedCouponCode === 'FLAT1000') {
                    setAppliedCoupon(false);
                    setAppliedCouponCode('');
                  } else {
                    setAppliedCoupon(true);
                    setAppliedCouponCode('FLAT1000');
                    setShowCouponInput(false);
                  }
                }}
                disabled={cartItems.length === 0}
                className={`font-extrabold text-[12px] md:text-[14px] px-4 cursor-pointer ${cartItems.length === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:underline'}`}
              >
                {appliedCoupon && appliedCouponCode === 'FLAT1000' ? 'Applied' : 'Apply'}
              </button>
            </div>

            {/* Coupon Input Box when "Apply More Coupons" is clicked */}
            {showCouponInput && (
              <div className="border-2 border-dashed border-[#F96E8F] bg-[#FFF5F7] rounded-xl p-4 flex flex-col gap-3 shadow-sm transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[16px] text-gray-800 font-['Baloo_2']">Enter Coupon Code</span>
                  <button
                    onClick={() => { setShowCouponInput(false); setCouponError(''); }}
                    className="text-gray-400 hover:text-gray-600 font-bold text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (!couponCode.trim()) {
                          setCouponError('Please enter a coupon code');
                          return;
                        }
                        setAppliedCoupon(true);
                        setAppliedCouponCode(couponCode.trim().toUpperCase());
                        setShowCouponInput(false);
                      }
                    }}
                    placeholder="Enter coupon code (e.g. FLAT1000)"
                    className="flex-1 border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none font-bold uppercase bg-white focus:border-[#F96E8F]"
                  />
                  <button
                    onClick={() => {
                      if (!couponCode.trim()) {
                        setCouponError('Please enter a coupon code');
                        return;
                      }
                      setAppliedCoupon(true);
                      setAppliedCouponCode(couponCode.trim().toUpperCase());
                      setShowCouponInput(false);
                    }}
                    className="bg-[#F96E8F] hover:bg-[#E44971] text-white text-sm px-5 py-2 rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-500 text-xs font-bold">{couponError}</p>
                )}
              </div>
            )}

            {/* Applied Coupon Status Banner */}
            {appliedCoupon && (
              <div className="bg-[#E8F8F5] border border-[#2ECC71]/40 text-[#27AE60] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex justify-between items-center shadow-xs">
                <span>✓ {appliedCouponCode ? `Coupon "${appliedCouponCode}" Applied (-₹1000)` : 'FLAT ₹1000 Coupon Applied!'}</span>
                <button
                  onClick={() => {
                    setAppliedCoupon(false);
                    setAppliedCouponCode('');
                    setCouponCode('');
                  }}
                  className="text-red-500 hover:text-red-700 hover:underline cursor-pointer ml-2 text-xs uppercase font-extrabold"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Full Width Apply More Coupons Button */}
            <button
              onClick={() => {
                if (cartItems.length === 0) return;
                setShowCouponInput(!showCouponInput);
              }}
              disabled={cartItems.length === 0}
              className={`w-full font-medium py-3 rounded-b-xl text-[15px] font-[Nunito] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                cartItems.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 border border-gray-200 border-t-0'
                  : 'bg-[#F96E8F] hover:bg-[#E44971] text-white cursor-pointer'
              }`}
            >
              {showCouponInput ? 'Close Coupon Input' : 'Apply More Coupons'}
            </button>

            {/* Deliver to Pincode Section */}
            <div className="border border-[#F96E8F] rounded-xl p-4 bg-white shadow-xs">
              <div className="flex justify-between items-center text-sm font-extrabold text-gray-900">
                <div className="flex items-center gap-3">
                  <img src={location} alt="" className='h-[24px] w-[24px]' />
                  <span className="text-[15px] font-[Baloo_2]">
                    {pincode && pincodeLocation ? `Deliver to ${pincodeLocation.area}, ${pincodeLocation.district}` : 'Check Delivery Availability'}
                  </span>
                </div>
                <button
                  onClick={() => setIsChangingPincode(!isChangingPincode)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer font-bold text-[15px] font-[Baloo_2]"
                >
                  {pincode ? 'Change Pincode' : 'Enter Pincode'}
                </button>
              </div>

              {isChangingPincode && (
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none font-bold"
                      maxLength={6}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newPincode.trim().length === 6) {
                          setPincode(newPincode.trim());
                          checkPincode(newPincode.trim());
                          setIsChangingPincode(false);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newPincode.trim().length === 6) {
                          setPincode(newPincode.trim());
                          checkPincode(newPincode.trim());
                          setIsChangingPincode(false);
                        }
                      }}
                      className="bg-[#F96E8F] text-white text-sm px-4 py-2 rounded font-bold hover:bg-[#E44971] cursor-pointer"
                    >
                      Check
                    </button>
                  </div>
                </div>
              )}

              {/* Pincode API Result */}
              {pincodeStatus === 'loading' && (
                <div className="text-blue-500 font-bold text-[13px] mt-3 flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  Checking delivery availability...
                </div>
              )}
              {pincodeStatus === 'available' && pincodeLocation && (
                <div className="text-green-600 font-bold text-[13px] mt-3">
                  ✓ Delivery available to {pincodeLocation.area}, {pincodeLocation.district}, {pincodeLocation.state}
                </div>
              )}
              {pincodeStatus === 'unavailable' && pincodeLocation && (
                <div className="text-red-500 font-bold text-[13px] mt-3">
                  ✕ Delivery not available to {pincodeLocation.state}. We deliver to Tamil Nadu, Andhra Pradesh, Kerala & Karnataka.
                </div>
              )}
              {pincodeStatus === 'error' && (
                <div className="text-red-500 font-bold text-[13px] mt-3">
                  ✕ Invalid pincode. Please enter a valid 6-digit pincode.
                </div>
              )}
            </div>

            {/* Bill Details Summary Card */}
            <div
              className="hidden lg:flex rounded-xl p-6 bg-white shadow-xs flex-col gap-5 mt-2"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'12\' ry=\'12\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'14%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
            >
              <div className="flex justify-between items-center text-[17px] font-[Baloo_2] font-black text-gray-800">
                <span>Item Total</span>
                <span className="font-black">₹{displayItemTotal}</span>
              </div>

              <div className="flex justify-between items-center text-[17px] font-[Baloo_2] font-black text-gray-800">
                <span>You Saved</span>
                <span className="font-black">-₹{displaySaved}</span>
              </div>

              <div className="flex justify-between items-center text-[17px] font-[Baloo_2] font-black text-gray-800">
                <span>Coupon Discount</span>
                <span className="font-black">₹{couponDiscount}</span>
              </div>

              <div className="flex justify-between items-center text-[17px] font-[Baloo_2] font-black text-gray-800">
                <span>Shipping (standard)</span>
                <span className="font-black uppercase">FREE</span>
              </div>

              <div className="border-t-2 border-gray-400 my-1"></div>

              <div className="flex justify-between items-center text-[17px] font-[Baloo_2] font-black text-gray-900">
                <span>Bill Total</span>
                <span className="font-black">₹{displayBillTotal}</span>
              </div>
            </div>
          </div>

        </div>

        <YouMayAlsoLike addToCart={addToCart} updateQuantity={updateQuantity} />

      </main>

      {/* Fixed Bottom Order Summary & Checkout Bar for Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 py-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        {/* Left: Prices & Info Icon */}
        <div className="flex flex-col justify-center">
          <del className="text-gray-400 font-bold text-[13px] leading-tight">
            ₹{displayItemTotal}
          </del>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[#F96E8F] font-black text-[22px] leading-none font-['Nunito']">
              ₹ {displayBillTotal}
            </span>
            <button
              onClick={() => setShowOrderSummaryModal(!showOrderSummaryModal)}
              className={`w-4.5 h-4.5 rounded-full text-white text-[10px] font-bold inline-flex items-center justify-center cursor-pointer transition-colors shadow-2xs font-['Nunito'] ${
                showOrderSummaryModal ? 'bg-[#F96E8F]' : 'bg-[#7C8894] hover:bg-[#5A6570]'
              }`}
              aria-label="Order Summary Info"
              title="View Order Summary"
            >
              i
            </button>
          </div>
        </div>

        {/* Right: Proceed To Checkout Button */}
        <button
          onClick={() => {
            if (cartItems.length > 0) {
              navigateTo('/checkout');
            }
          }}
          disabled={cartItems.length === 0}
          className={`text-white px-6 py-3 rounded-[12px] font-bold text-[15px] shadow-sm transition-all tracking-wide ${cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed opacity-70'
              : 'bg-[#F96E8F] hover:bg-[#E44971] active:scale-[0.98] cursor-pointer'
            }`}
        >
          Proceed To Checkout
        </button>
      </div>

      {/* Mobile Order Summary Popup (Slides out from behind the fixed bottom bar) */}
      {/* Transparent Click-Outside Area (No dark overlay on screen) */}
      {showOrderSummaryModal && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-transparent"
          onClick={() => setShowOrderSummaryModal(false)}
        />
      )}

      {/* Popup Card with Smooth Slide Up/Down from Behind the Fixed Button */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-dashed border-[#F96E8F] rounded-t-[24px] p-5 pb-22 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transform transition-all duration-300 ease-out ${
          showOrderSummaryModal
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[19px] font-black text-gray-900 font-['Baloo_2']">
            Order <span className="text-[#F96E8F]">Summary</span>
          </h3>
          <button
            onClick={() => setShowOrderSummaryModal(false)}
            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Bill Rows */}
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
            <span>Item Total</span>
            <span className="font-extrabold text-gray-900">₹{displayItemTotal}</span>
          </div>

          <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
            <span>You Saved</span>
            <span className="font-extrabold text-gray-900">-₹{displaySaved}</span>
          </div>

          <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
            <span>Coupon Discount</span>
            <span className="font-extrabold text-gray-900">₹{couponDiscount}</span>
          </div>

          <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
            <span>Shipping (standard)</span>
            <span className="font-extrabold text-gray-900">FREE</span>
          </div>

          <hr className="border-t border-gray-400 my-1" />

          <div className="flex justify-between items-center text-[16px] font-black text-gray-900 font-['Baloo_2']">
            <span>Bill Total</span>
            <span className="font-black text-gray-900">₹{displayBillTotal}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toastTrigger > 0 && (
        <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] animate-toast-up bg-white rounded-2xl shadow-[0_12px_40px_rgba(249,110,143,0.18)] border border-[#F96E8F]/20 px-5 py-4 font-['Nunito'] flex items-center gap-3">
          {toastType === 'removed' ? (
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
            <span className="text-[#F96E8F] text-[15px] font-black uppercase tracking-wider font-['Baloo_2']">
              {toastType === 'removed' ? 'Item Removed' : 'Cart Updated'}
            </span>
            <span className="text-gray-500 text-xs font-semibold">
              {toastType === 'removed' ? 'Item removed from cart' : 'Your items have been updated'}
            </span>
          </div>
          <button 
            onClick={() => setToastTrigger(0)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer ml-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

