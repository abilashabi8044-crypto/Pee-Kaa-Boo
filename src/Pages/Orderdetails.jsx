import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, cancelOrder as cancelOrderAction } from '../redux/ordersSlice';
import { selectCartItems } from '../redux/cartSlice';
import { selectWishlistItems } from '../redux/wishlistSlice';
import Header from './Header';
import Footer from './Footer';
import upiIcon from '../assets/checkout/upi-id 1.png';
import prod1 from '../assets/shop/product1.jpg';

const Orderdetails = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders) || [];
  const cartItems = useSelector(selectCartItems) || [];
  const wishlist = useSelector(selectWishlistItems) || [];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  // Address from localStorage or default
  const [userAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('userAddresses');
      const parsed = saved ? JSON.parse(saved) : [];
      if (parsed.length > 0) {
        return {
          name: parsed[0].name || 'Home',
          username: parsed[0].username || 'User Name',
          address: `${parsed[0].line1 || ''}, ${parsed[0].line2 || ''}`.trim() || '123 Anywhere St., Any City, ST 12345',
          phone: parsed[0].phone || '+91 91234 56789'
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      name: 'Home',
      username: 'User Name',
      address: '123 Anywhere St., Any City, ST 12345',
      phone: '+91 91234 56789'
    };
  });

  // Default mock products matching the user's reference image if no order in redux
  const defaultItems = [
    {
      id: 'item1',
      title: 'Name of the product',
      code: '64A288075',
      image: prod1,
      orderDate: '10/01/2026',
      qty: 1,
      oldPrice: 2000,
      price: 1710,
    },
    {
      id: 'item2',
      title: 'Name of the product',
      code: '64A288075',
      image: prod1,
      orderDate: '10/01/2026',
      qty: 1,
      oldPrice: 2000,
      price: 1710,
    }
  ];

  // Display items
  const displayItems = orders.length > 0
    ? orders.map((o, idx) => ({
        id: o.id || `order-${idx}`,
        title: o.title || o.name || 'Name of the product',
        code: o.code || '64A288075',
        image: o.image || prod1,
        orderDate: o.date ? new Date(o.date).toLocaleDateString('en-GB') : '10/01/2026',
        qty: o.quantity || o.qty || 1,
        oldPrice: Number(o.oldPrice) || 2000,
        price: Number(o.price) || 1710,
        status: o.status || 'active'
      }))
    : defaultItems;

  const itemTotal = displayItems.reduce((acc, item) => acc + ((item.oldPrice || item.price) * item.qty), 0);
  const subTotal = displayItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const savedAmount = Math.max(0, itemTotal - subTotal);
  const billTotal = subTotal;

  const handleCancelOrder = () => {
    if (orders.length > 0) {
      orders.forEach(o => {
        if (o.id) dispatch(cancelOrderAction(o.id));
      });
    }
    setCancelSuccess(true);
    setTimeout(() => {
      setCancelSuccess(false);
    }, 4000);
  };

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    setTimeout(() => {
      setDownloadingInvoice(false);
      const invoiceContent = `====================================
PEE KAA BOO - INVOICE
====================================
Order ID: 123456789
Date: ${new Date().toLocaleDateString()}
Customer: ${userAddress.username} (${userAddress.phone})
Address: ${userAddress.address}

------------------------------------
ITEMS:
------------------------------------
${displayItems.map(i => `- ${i.title} (${i.code}) x${i.qty}: Rs. ${i.price * i.qty}`).join('\n')}

------------------------------------
Price Summary:
Item Total: Rs. ${itemTotal}
You Saved: -Rs. ${savedAmount}
Coupon Discount: Rs. 0
Shipping: FREE
------------------------------------
Bill Total: Rs. ${billTotal}
Payment Method: UPI
====================================
Thank you for shopping with PEE KAA BOO!
`;
      const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-123456789.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-white font-['Baloo_2'] flex flex-col">
      <Header cartItems={cartItems} wishlistCount={wishlist.length} />

      <main className="flex-grow w-full py-8 sm:py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Main Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-black text-gray-900 tracking-wide">
              Order <span className="text-[#F96E8F]">Details</span>
            </h1>
          </div>

          {/* Cancellation Success Notification */}
          {cancelSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-3.5 rounded-[16px] flex items-center justify-between font-bold text-[15px] animate-fade-in shadow-xs">
              <span>✓ Order cancellation requested successfully! Your refund will be processed within 2-3 business days.</span>
              <button onClick={() => setCancelSuccess(false)} className="text-green-700 hover:text-green-900 ml-4 font-black cursor-pointer">✕</button>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Top Arriving & Products Card */}
              <div className="bg-[#F4FCFF] rounded-[24px] p-5 sm:p-7 border border-blue-50/60 shadow-xs flex flex-col gap-5">
                
                {/* Header */}
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-black text-gray-900">
                    Arriving September 30
                  </h2>
                  <p className="text-[13px] sm:text-[14px] font-black text-gray-800 mt-0.5">
                    Order ID: <span className="text-[#F96E8F]">123456789</span>
                  </p>
                </div>

                {/* Products List */}
                <div className="flex flex-col gap-4">
                  {displayItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-white rounded-[20px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xs border border-gray-100/70"
                    >
                      {/* Product Image */}
                      <div className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] rounded-[16px] overflow-hidden bg-[#FBE8EC] shrink-0 flex items-center justify-center p-1.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-[12px]"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-center text-center sm:text-left min-w-0">
                        <h3 className="font-bold text-[18px] sm:text-[20px] text-gray-900 font-['Nunito'] mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 font-bold text-[12px] sm:text-[13px] mb-1 font-['Nunito']">
                          Product Code : {item.code}
                        </p>
                        <p className="text-gray-600 font-bold text-[13px] mb-1.5 font-['Nunito']">
                          Order Placed on : <span className="text-[#F96E8F]">{item.orderDate}</span>
                        </p>
                        <p className="text-gray-500 font-bold text-[13px] font-['Nunito']">
                          Quantity : <span className="text-[#F96E8F]">{String(item.qty).padStart(2, '0')} Nos</span>
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        {item.oldPrice && (
                          <del className="text-gray-400 font-bold text-[15px] sm:text-[16px] font-['Nunito']">
                            ₹ {item.oldPrice}
                          </del>
                        )}
                        <span className="text-[#F96E8F] font-bold text-[24px] sm:text-[28px] font-['Nunito'] leading-tight">
                          ₹ {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cancel Order Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCancelOrder}
                    className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-[15px] py-2.5 px-8 rounded-[10px] transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                  >
                    Cancel order
                  </button>
                </div>

              </div>

              {/* Order Updates Card */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-xs border border-gray-100 font-['Nunito']">
                <h3 className="font-extrabold text-[18px] sm:text-[20px] text-gray-900 mb-8">
                  Order Updates
                </h3>

                {/* Steps Tracker */}
                <div className="relative flex items-center justify-between px-2 sm:px-6">
                  
                  {/* Connecting Horizontal Line */}
                  <div className="absolute top-6 left-8 right-8 sm:left-12 sm:right-12 h-[2px] bg-gray-300 z-0"></div>

                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F96E8F] text-white flex items-center justify-center font-black text-[17px] sm:text-[18px] shadow-sm mb-3">
                      1
                    </div>
                    <span className="font-extrabold text-[12px] sm:text-[14px] text-gray-900 whitespace-nowrap">
                      Order Dispatch
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-bold text-gray-400 mt-0.5">
                      Processing
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-black text-[17px] sm:text-[18px] shadow-sm mb-3">
                      2
                    </div>
                    <span className="font-extrabold text-[12px] sm:text-[14px] text-gray-900 whitespace-nowrap">
                      Order Shipped
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-bold text-gray-400 mt-0.5">
                      Pending
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-black text-[17px] sm:text-[18px] shadow-sm mb-3">
                      3
                    </div>
                    <span className="font-extrabold text-[12px] sm:text-[14px] text-gray-900 whitespace-nowrap">
                      Out For Delivery
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-bold text-gray-400 mt-0.5">
                      Pending
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-black text-[17px] sm:text-[18px] shadow-sm mb-3">
                      4
                    </div>
                    <span className="font-extrabold text-[12px] sm:text-[14px] text-gray-900 whitespace-nowrap">
                      Delivered
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-bold text-gray-400 mt-0.5">
                      Pending
                    </span>
                  </div>

                </div>
              </div>

              {/* Rate Your Experience Card */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 shadow-xs border border-gray-100 font-['Nunito']">
                <h3 className="font-extrabold text-[18px] sm:text-[20px] text-gray-900 mb-1">
                  Rate your experience
                </h3>
                <p className="flex items-center gap-1.5 text-gray-500 font-bold text-[13px] mb-4">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Rate your Product
                </p>

                {/* Star Rating Box */}
                <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[18px] p-5 flex items-center justify-center gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (hoverRating || rating);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all transform hover:scale-125 focus:outline-none cursor-pointer"
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <svg
                          className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors ${
                            isFilled ? 'text-[#F96E8F] fill-[#F96E8F]' : 'text-gray-400 fill-gray-400 hover:text-pink-300'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Delivery Details Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-xs border border-gray-100 font-['Nunito']">
                <h3 className="font-extrabold text-[18px] sm:text-[20px] text-gray-900 mb-4">
                  Delivery Details
                </h3>

                <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[18px] p-4 sm:p-5 flex flex-col gap-3.5">
                  {/* Address */}
                  <div className="flex items-start gap-3 text-[13px] sm:text-[14px]">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-gray-900 mt-0.5">
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-extrabold text-gray-900 mr-2">{userAddress.name}</span>
                      <span className="text-gray-600 font-medium">{userAddress.address}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 text-[13px] sm:text-[14px]">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-gray-900">
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-extrabold text-gray-900 mr-2">{userAddress.username}</span>
                      <span className="text-gray-600 font-medium">{userAddress.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Details Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-xs border border-gray-100 font-['Nunito'] flex flex-col gap-3.5">
                <h3 className="font-extrabold text-[18px] sm:text-[20px] text-gray-900 mb-1">
                  Price Details
                </h3>

                <div className="flex justify-between items-center text-[15px] font-bold text-gray-700">
                  <span>Item Total</span>
                  <span className="font-extrabold text-gray-900">₹{itemTotal || 999}</span>
                </div>

                <div className="flex justify-between items-center text-[15px] font-bold text-gray-700">
                  <span>You Saved</span>
                  <span className="font-extrabold text-gray-900">-₹{savedAmount || 349}</span>
                </div>

                <div className="flex justify-between items-center text-[15px] font-bold text-gray-700">
                  <span>Coupon Discount</span>
                  <span className="font-extrabold text-gray-900">₹0</span>
                </div>

                <div className="flex justify-between items-center text-[15px] font-bold text-gray-700">
                  <span>Shipping (standard)</span>
                  <span className="font-black text-gray-900">FREE</span>
                </div>

                <div className="border-t border-gray-200 my-1"></div>

                <div className="flex justify-between items-center text-[17px] font-black text-gray-900">
                  <span>Bill Total</span>
                  <span className="font-black">₹{billTotal || 650}</span>
                </div>

                {/* Paid By Box */}
                <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-[14px] font-black text-gray-900 mt-2">
                  <span>Paid By</span>
                  <div className="flex items-center gap-2">
                    <span>UPI</span>
                    <img src={upiIcon} alt="UPI" className="h-5 w-auto object-contain" />
                  </div>
                </div>

                {/* Download Invoice Button */}
                <button
                  onClick={handleDownloadInvoice}
                  disabled={downloadingInvoice}
                  className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-[15px] py-3.5 px-6 rounded-[12px] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-95 w-full mt-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {downloadingInvoice ? 'Downloading...' : 'Download Invoice'}
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orderdetails;
