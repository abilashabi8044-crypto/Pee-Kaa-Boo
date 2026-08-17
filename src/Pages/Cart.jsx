import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

// Assets
import leftCar from '../assets/cart/left-img.png';
import rightBunny from '../assets/cart/right-img.png';
import headerBg from '../assets/cart/shop-bg.png';
import prod1 from '../assets/shop/62741597f1c25de37c22ae67896b59fca2148f7e.jpg';
import prod2 from '../assets/shop/silver-yellow.png';
import prod3 from '../assets/shop/e6d33d54f4b94cee7f7fa20b4b7d7c16f7b1464d.png';
import prod4 from '../assets/shop/product1.jpg';
import arrowLeft from '../assets/product/arrow-l.png';
import arrowRight from '../assets/product/arrow-r.png';
import discount from '../assets/cart/discount.png';
import location from '../assets/cart/location.png';

const recommendedProducts = [
  { id: 1, title: 'Name of the product', category: 'Category', price: '1710', oldPrice: '2000', image: prod1, theme: 'pink' },
  { id: 2, title: 'Name of the product', category: 'Category', price: '1710', oldPrice: '2000', image: prod2, theme: 'blue' },
  { id: 3, title: 'Name of the product', category: 'Category', price: '1710', oldPrice: '2000', image: prod3, theme: 'yellow' },
  { id: 4, title: 'Name of the product', category: 'Category', price: '1710', oldPrice: '2000', image: prod4, theme: 'pink' },
  { id: 5, title: 'Name of the product', category: 'Category', price: '1710', oldPrice: '2000', image: prod1, theme: 'blue' },
  { id: 6, title: 'Name of the product', category: 'Category', price: '1710', oldPrice: '2000', image: prod2, theme: 'yellow' },
];

const Cart = ({ cartItems = [], updateQuantity, addToCart }) => {
  const [localQty, setLocalQty] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [pincode, setPincode] = useState('600001');
  const [isChangingPincode, setIsChangingPincode] = useState(false);
  const [newPincode, setNewPincode] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleQtyChange = (item, delta) => {
    if (updateQuantity) {
      updateQuantity(item, delta);
    }
  };

  // Financial calculations
  const displayItemTotal = cartItems.reduce((acc, item) => acc + ((item.oldPrice || 2000) * (item.quantity || 1)), 0);
  const displaySaved = cartItems.reduce((acc, item) => acc + (((item.oldPrice || 2000) - (item.price || 1710)) * (item.quantity || 1)), 0);
  const couponDiscount = appliedCoupon && cartItems.length > 0 ? 1000 : 0;
  const shippingCost = 0;
  const displayBillTotal = Math.max(0, displayItemTotal - displaySaved - couponDiscount + shippingCost);

  const maxCarousel = Math.max(0, recommendedProducts.length - 4);
  const handlePrevCarousel = () => setCarouselIndex(prev => Math.max(0, prev - 1));
  const handleNextCarousel = () => setCarouselIndex(prev => Math.min(maxCarousel, prev + 1));
  const progressWidth = recommendedProducts.length > 0
    ? ((carouselIndex + Math.min(4, recommendedProducts.length)) / recommendedProducts.length) * 100
    : 100;

  return (
    <div className="w-full min-h-screen bg-white font-['Baloo_2'] flex flex-col">
      {/* Combined Header & Hero Banner Section with full header-bg.png */}
      <div
        className="w-full relative bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center top'

        }}
      >
        {/* Header Navigation */}
        <Header cartItems={cartItems} />

        {/* Hero Heading Content */}
        <div className="w-full relative pt-6 pb-20 sm:pb-28 flex flex-col items-center justify-center">
          {/* Breadcrumb & Heading */}
          <div className="text-center z-10 px-4">
            <h1 className="text-[72px] md:text-[72px] font-black text-gray-900 mb-2 tracking-wide">
              My <span className="text-[#F96E8F]">Cart</span>
            </h1>
            <div className="text-sm md:text-base font-extrabold text-gray-800 flex items-center justify-center gap-2">
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
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Cart Items & Actions */}
          <div className="lg:col-span-7 bg-[#F4FCFF] rounded-3xl p-4 sm:p-8 flex flex-col justify-between shadow-sm min-h-[520px]">
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
                  <div key={item.id || index} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-100">

                    {/* Product Thumbnail */}
                    <div className="w-38 h-38 sm:w-38 sm:h-38 rounded-xl overflow-hidden flex-shrink-0 bg-[#F9E2E8] p-1 flex items-center justify-center">
                      <img
                        src={item.image || prod1}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                      <h3 className="text-gray-900 font-extrabold text-[25px] sm:text-[25px] leading-tight font-['Baloo_2']">
                        {item.title || 'Name of the product'}
                      </h3>
                      <p className="text-gray-500 font-bold text-[15px] sm:text-[15px] mb-1">
                        Product Code : {item.code || 'GAA200075'}
                      </p>
                      <p className="mt-16 text-gray-700 font-extrabold text-[17px] sm:text-[17px] mb-3">
                        Expected Delivery Date : {item.weight || '20 Grams'}
                      </p>

                      {/* Quantity Control Buttons */}
                      <div className="flex items-center justify-center sm:justify-start gap-1">
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
                    </div>

                    {/* Price Tag */}
                    <div className="flex sm:flex-row items-center mt-48 sm:items-end justify-center gap-2 sm:gap-1 text-right min-w-[100px]">
                      <del className="text-gray-400 font-bold text-[20px] sm:text-[20px]">
                        ₹{item.oldPrice || 2000}
                      </del>
                      <span className="text-[#F96E8F] font-black text-[25px] sm:text-[25px] font-['Nunito']">
                        ₹ {item.price || 1710}
                      </span>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col items-center text-center gap-3">
              <button
                onClick={() => navigateTo('/shop')}
                className="text-[#F96E8F] font-bold text-sm sm:text-base hover:underline cursor-pointer transition-colors"
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
                className={`w-full max-w-[380px] text-white py-3.5 px-8 rounded-[16px] font-bold text-base sm:text-lg shadow-md transition-all tracking-wide uppercase ${
                  cartItems.length === 0 
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
              className="rounded-xl flex bg-white shadow-xs"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'12\' ry=\'12\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'14%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
            >
              <div
                className="flex items-center gap-4 p-4 flex-1"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cline x1=\'100%25\' y1=\'15%25\' x2=\'100%25\' y2=\'85%25\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'8%2c 8\' /%3e%3c/svg%3e")' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] text-white flex items-center justify-center font-black">
                  <img src={discount} alt="" className='h-[36px] w-[36px]' />
                </div>
                <span className="text-[#F96E8F] font-bold text-[28px] font-[Baloo_2] tracking-wide">
                  Apply Coupon
                </span>
              </div>
              <button
                onClick={() => {
                  if (appliedCoupon) {
                    setAppliedCoupon(false);
                    setAppliedCouponCode('');
                    setCouponCode('');
                  } else {
                    setShowCouponInput(true);
                  }
                }}
                className="text-[#F96E8F] font-bold text-[21px] px-8 hover:underline cursor-pointer"
              >
                {appliedCoupon ? 'Remove' : 'Apply'}
              </button>
            </div>

            {/* Specific Offer Card */}
            <div className="border border-[#F96E8F] rounded-xl p-4 bg-white flex justify-between items-center shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#Fffff] text-white flex items-center justify-center font-black">
                  <img src={discount} alt="" className='h-[24px] w-[24px]' />
                </div>
                <div>
                  <h4 className="font-[Baloo_2] font-bold text-gray-900 text-[17px] uppercase">FLAT ₹1000</h4>
                  <p className="text-gray-800 font-[Baloo_2] font-bold text-[15px]">Flat 1000 off on Preset jewellery</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (appliedCoupon && appliedCouponCode === 'FLAT1000') {
                    setAppliedCoupon(false);
                    setAppliedCouponCode('');
                  } else {
                    setAppliedCoupon(true);
                    setAppliedCouponCode('FLAT1000');
                    setShowCouponInput(false);
                  }
                }}
                className="text-gray-400 font-extrabold text-sm px-4 hover:underline cursor-pointer"
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
              onClick={() => setShowCouponInput(!showCouponInput)}
              className="w-full bg-[#F96E8F] hover:bg-[#E44971] text-white font-medium py-3 rounded-b-xl text-[15px] font-[Nunito] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              {showCouponInput ? 'Close Coupon Input' : 'Apply More Coupons'}
            </button>

            {/* Deliver to Pincode Section */}
            <div className="border border-[#F96E8F] rounded-xl p-4 bg-white shadow-xs">
              <div className="flex justify-between items-center text-sm font-extrabold text-gray-900">
                <div className="flex items-center gap-3">
                  <img src={location} alt="" className='h-[24px] w-[24px]' />
                  <span className="text-[15px] font-[Baloo_2]">Deliver to Pincode</span>
                </div>
                <button
                  onClick={() => setIsChangingPincode(!isChangingPincode)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer font-bold text-[15px] font-[Baloo_2]"
                >
                  Change Pincode
                </button>
              </div>

              {isChangingPincode && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none font-bold"
                    maxLength={6}
                  />
                  <button
                    onClick={() => {
                      if (newPincode.trim().length === 6) {
                        setPincode(newPincode.trim());
                        setIsChangingPincode(false);
                      }
                    }}
                    className="bg-[#F96E8F] text-white text-sm px-4 py-2 rounded font-bold hover:bg-[#E44971]"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Bill Details Summary Card */}
            <div
              className="rounded-xl p-6 bg-white shadow-xs flex flex-col gap-5 mt-2"
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

        {/* You May Also Like Section */}
        <section className="bg-[#F4FCFF] rounded-[2rem] p-6 md:p-10 my-16 shadow-xs">
          <h2 className="text-[29px] md:text-[41px] font-black text-gray-900 mb-8 font-['Baloo_2']">
            You May <span className="text-[#F96E8F]">Also Like</span>
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(carouselIndex, carouselIndex + 4).map((product, idx) => {
              let borderColor = 'border-[#FFB7D5]';
              let bgTheme = 'bg-[#FFB7D5]/20';
              if (product.theme === 'blue') {
                borderColor = 'border-[#85CDFD]';
                bgTheme = 'bg-[#85CDFD]/20';
              } else if (product.theme === 'yellow') {
                borderColor = 'border-[#FFE2A0]';
                bgTheme = 'bg-[#FFE2A0]/20';
              }

              return (
                <div
                  key={product.id || idx}
                  onClick={() => navigateTo('/product')}
                  className={`rounded-[20px] border-[3px] ${borderColor} ${bgTheme} overflow-hidden flex flex-col shadow-sm relative group cursor-pointer transition-all duration-300 hover:shadow-md`}
                >
                  {/* Top Image area */}
                  <div className="h-[240px] w-full p-0 relative flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-t-[17px] group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Best Selling Badge (Top Left - Appears on Hover / Active) */}
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
                      <button className="w-9 h-9 bg-[#00D0CC] hover:bg-[#00b3b0] text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                      {/* Compare / Copy Icon */}
                      <button className="w-9 h-9 bg-[#00D0CC] hover:bg-[#00b3b0] text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="bg-white m-[10px] mt-0 rounded-[14px] p-4 text-center flex-1 flex flex-col justify-center relative transition-all duration-300 shadow-xs">
                    <span className="text-gray-400 text-[11px] font-[Nunito] font-[13px] uppercase mb-1">
                      {product.category}
                    </span>

                    <h4 className="text-gray-900 font-bold text-[18px] sm:text-[20px] leading-tight mb-1 tracking-wide font-['Nunito'] group-hover:text-[#F96E8F] transition-colors">
                      {product.title}
                    </h4>

                    <div className="flex justify-center items-center gap-2">
                      <del className="text-gray-400 font-bold text-[16px] font-[Nunito]">₹ {product.oldPrice}</del>
                      <span className="text-[#F96E8F] font-bold text-[27px] font-['Nunito']">₹ {product.price}</span>
                    </div>

                    {/* Expandable Content (Add to Cart) */}
                    <div className="w-full max-h-0 opacity-0 overflow-hidden group-hover:max-h-[60px] group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-in-out">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (addToCart) {
                            addToCart(product, 1);
                          } else if (updateQuantity) {
                            updateQuantity(product, 1);
                          }

                          // Trigger success animation
                          setAddedItems(prev => ({ ...prev, [product.id]: true }));
                          setTimeout(() => {
                            setAddedItems(prev => ({ ...prev, [product.id]: false }));
                          }, 2000);
                        }}
                        className={`w-full py-2.5 px-4 border-2 border-[#F96E8F] rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs ${addedItems[product.id]
                          ? 'bg-[#F96E8F] text-white border-solid scale-95'
                          : 'border-dashed text-[#F96E8F] hover:bg-[#F96E8F] hover:text-white hover:border-solid active:scale-95'
                          }`}
                      >
                        {addedItems[product.id] ? (
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
          <div className="flex items-center justify-between mt-10">
            {/* Progress Bar */}
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full mr-6 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#F96E8F] rounded-full transition-all duration-300"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>

            {/* Next / Prev Circle Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevCarousel}
                disabled={carouselIndex === 0}
                className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-colors bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <img src={arrowLeft} alt="Previous" className="w-8 h-8" />
              </button>
              <button
                onClick={handleNextCarousel}
                disabled={carouselIndex >= maxCarousel}
                className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-colors bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <img src={arrowRight} alt="Next" className="w-8 h-8" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cart;

