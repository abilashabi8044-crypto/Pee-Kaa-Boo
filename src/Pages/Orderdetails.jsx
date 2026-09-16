import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, selectLatestOrder, cancelOrder as cancelOrderAction } from '../redux/ordersReducer';
import { selectCartItems } from '../redux/cartReducer';
import { selectWishlistItems } from '../redux/wishlistReducer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import upiIcon from '../assets/checkout/upi-id 1.png';
import netBankingIcon from '../assets/checkout/noto_bank.png';
import debitCardIcon from '../assets/checkout/twemoji_credit-card (1).png';
import creditCardIcon from '../assets/checkout/twemoji_credit-card.png';
import prod1 from '../assets/shop/product1.jpg';

const Orderdetails = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders) || [];
  const latestOrder = useSelector(selectLatestOrder);
  const cartItems = useSelector(selectCartItems) || [];
  const wishlist = useSelector(selectWishlistItems) || [];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  // Determine current active order dynamically
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    let orderToUse = null;

    // 1. Check window.history.state
    const historyOrderId = window.history.state?.orderId;
    const historyOrder = window.history.state?.order;

    if (historyOrder) {
      orderToUse = historyOrder;
    } else if (historyOrderId && orders.length > 0) {
      orderToUse = orders.find(o => o.orderId === historyOrderId || o.id === historyOrderId);
    }

    // 2. Check latestOrder from Redux
    if (!orderToUse && latestOrder) {
      orderToUse = latestOrder;
    }

    // 3. Check first order from orders array
    if (!orderToUse && orders.length > 0) {
      orderToUse = orders[0];
    }

    // 4. Check localStorage fallback
    if (!orderToUse) {
      try {
        const saved = localStorage.getItem('pkb_latest_order');
        if (saved) orderToUse = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    setActiveOrder(orderToUse);
  }, [orders, latestOrder]);

  // Dynamic user address from order or localStorage
  const userAddress = activeOrder?.address || (() => {
    try {
      const saved = localStorage.getItem('userAddresses');
      const parsed = saved ? JSON.parse(saved) : [];
      if (parsed.length > 0) {
        return {
          name: parsed[0].name || 'Home',
          username: parsed[0].username || 'User Name',
          address: `${parsed[0].line1 || ''}, ${parsed[0].line2 || ''}`.replace(/^,\s*|,\s*$/g, '') || '123 Anywhere St., Any City, ST 12345',
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
  })();

  // Dynamic products list
  const displayItems = activeOrder?.items && activeOrder.items.length > 0
    ? activeOrder.items.map((item, idx) => ({
        id: item.id || `item-${idx}`,
        title: item.title || item.name || 'Product',
        code: item.code || (item.id ? `64A288${item.id}` : '64A288075'),
        image: item.image || prod1,
        orderDate: item.orderDate || (activeOrder.date ? new Date(activeOrder.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')),
        qty: item.quantity || item.qty || 1,
        oldPrice: Number(item.oldPrice) || Number(item.price) || 0,
        price: Number(item.price) || 0,
        status: item.status || activeOrder.status || 'active'
      }))
    : activeOrder?.title || activeOrder?.name
    ? [{
        id: activeOrder.id || 'order-1',
        title: activeOrder.title || activeOrder.name || 'Product',
        code: activeOrder.code || (activeOrder.id ? `64A288${activeOrder.id}` : '64A288075'),
        image: activeOrder.image || prod1,
        orderDate: activeOrder.date ? new Date(activeOrder.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
        qty: activeOrder.quantity || activeOrder.qty || 1,
        oldPrice: Number(activeOrder.oldPrice) || 0,
        price: Number(activeOrder.price) || 0,
        status: activeOrder.status || 'active'
      }]
    : [];

  const orderId = activeOrder?.orderId || activeOrder?.id || '123456789';
  const isCancelled = activeOrder?.status === 'cancelled';

  // Dynamic financial totals
  const itemTotal = activeOrder?.itemTotal ?? displayItems.reduce((acc, item) => acc + (item.oldPrice * item.qty), 0);
  const subTotal = displayItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const savedAmount = activeOrder?.savedAmount ?? Math.max(0, itemTotal - subTotal);
  const couponDiscount = activeOrder?.couponDiscount ?? 0;
  const billTotal = activeOrder?.billTotal ?? (subTotal - couponDiscount);
  const paymentMethod = activeOrder?.paymentMethod || 'UPI';

  const normPayment = (paymentMethod || '').toLowerCase();
  const isCod = normPayment.includes('cod') || normPayment.includes('cash');
  const isUpi = normPayment.includes('upi');
  const isNetBanking = normPayment.includes('net') || normPayment.includes('bank');
  const isDebit = normPayment.includes('debit');
  const isCredit = normPayment.includes('credit');

  const handleCancelOrder = () => {
    if (orderId) {
      dispatch(cancelOrderAction(orderId));
      setActiveOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
    }
    setCancelSuccess(true);
    setTimeout(() => {
      setCancelSuccess(false);
    }, 4000);
  };

  const customerEmail = activeOrder?.customer?.email || activeOrder?.userEmail || localStorage.getItem('userEmail') || 'user@gmail.com';
  const customerName = activeOrder?.customer?.name || activeOrder?.userName || userAddress.username;
  const customerPhone = activeOrder?.customer?.phone || activeOrder?.userPhone || userAddress.phone;
  const customerUserId = activeOrder?.userId || activeOrder?.customer?.id || localStorage.getItem('userId') || 'user_guest';

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    setTimeout(() => {
      setDownloadingInvoice(false);
      const invoiceContent = `====================================
PEE KAA BOO - INVOICE
====================================
Order ID: ${orderId}
Order Date: ${displayItems[0]?.orderDate || new Date().toLocaleDateString('en-GB')}
Status: ${isCancelled ? 'CANCELLED' : 'CONFIRMED'}

CUSTOMER DETAILS:
Customer Name: ${customerName}
Customer Email: ${customerEmail}
Customer Phone: ${customerPhone}
User ID: ${customerUserId}
Delivery Address: [${userAddress.name}] ${userAddress.address}

------------------------------------
ITEMS:
------------------------------------
${displayItems.map(i => `- ${i.title} (${i.code}) x${i.qty}: Rs. ${i.price * i.qty}`).join('\n')}

------------------------------------
PRICE SUMMARY:
Item Total: Rs. ${itemTotal}
You Saved: -Rs. ${savedAmount}
Coupon Discount: Rs. ${couponDiscount}
Shipping: FREE
------------------------------------
Bill Total: Rs. ${billTotal}
Payment Method: ${paymentMethod}
====================================
Thank you for shopping with PEE KAA BOO!
`;
      const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${orderId}.txt`;
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
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-black text-gray-900 tracking-wide">
              Order <span className="text-[#F96E8F]">Details</span>
            </h1>
          </div>

          {/* Cancellation Success Notification */}
          {cancelSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-3.5 rounded-[16px] flex items-center justify-between font-bold text-sm animate-fade-in shadow-xs">
              <span>✓ Order cancellation requested successfully! Your refund will be processed within 2-3 business days.</span>
              <button onClick={() => setCancelSuccess(false)} className="text-green-700 hover:text-green-900 ml-4 font-black cursor-pointer">✕</button>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Top Arriving & Products Card */}
              <div className="bg-[#F4FCFF] rounded-[24px] p-5 sm:p-7 border border-blue-100/70 shadow-xs flex flex-col gap-5">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-gray-900">
                      {isCancelled ? 'Order Cancelled' : 'Arriving September 30'}
                    </h2>
                    <p className="text-xs sm:text-sm font-black text-gray-800 mt-0.5">
                      Order ID: <span className="text-[#F96E8F]">{orderId}</span>
                    </p>
                  </div>

                  {isCancelled && (
                    <span className="self-start sm:self-auto bg-red-100 text-red-600 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      Cancelled
                    </span>
                  )}
                </div>

                {/* Products List */}
                <div className="flex flex-col gap-4">
                  {displayItems.length > 0 ? (
                    displayItems.map((item, idx) => (
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
                          <h3 className="font-bold text-lg sm:text-xl text-gray-900 font-['Nunito'] mb-1 truncate" title={item.title}>
                            {item.title}
                          </h3>
                          <p className="text-gray-400 font-bold text-xs sm:text-xs mb-1 font-['Nunito']">
                            Product Code : {item.code}
                          </p>
                          <p className="text-gray-600 font-bold text-xs mb-1.5 font-['Nunito']">
                            Order Placed on : <span className="text-[#F96E8F]">{item.orderDate}</span>
                          </p>
                          <p className="text-gray-500 font-bold text-xs font-['Nunito']">
                            Quantity : <span className="text-[#F96E8F]">{String(item.qty).padStart(2, '0')} Nos</span>
                          </p>
                        </div>

                        {/* Pricing */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                          {item.oldPrice && item.oldPrice > item.price && (
                            <del className="text-gray-400 font-bold text-sm sm:text-base font-['Nunito']">
                              ₹ {item.oldPrice * item.qty}
                            </del>
                          )}
                          <span className="text-[#F96E8F] font-bold text-2xl sm:text-3xl font-['Nunito'] leading-tight">
                            ₹ {item.price * item.qty}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-[20px] p-8 text-center text-gray-500 font-bold border border-gray-100/70">
                      No order items found.
                    </div>
                  )}
                </div>

                {/* Cancel Order Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCancelOrder}
                    disabled={isCancelled}
                    className={`font-extrabold text-sm py-2.5 px-8 rounded-[10px] transition-all shadow-sm ${
                      isCancelled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-[#F96E8F] hover:bg-[#E44971] text-white cursor-pointer hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isCancelled ? 'Order Cancelled' : 'Cancel order'}
                  </button>
                </div>

              </div>

              {/* Order Updates Card */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-xs border border-pink-200/80 font-['Nunito']">
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-8">
                  Order Updates
                </h3>

                {/* Steps Tracker */}
                <div className="overflow-x-auto pb-4 hide-scrollbar">
                  <div className="relative flex items-center justify-between px-2 sm:px-6 min-w-[550px] sm:min-w-full">
                  
                  {/* Connecting Horizontal Line */}
                  <div className="absolute top-6 left-12 right-12 sm:left-12 sm:right-12 h-[2px] bg-gray-300 z-0"></div>

                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm mb-3 ${
                      isCancelled ? 'bg-red-500' : 'bg-[#F96E8F]'
                    }`}>
                      1
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                      {isCancelled ? 'Cancelled' : 'Order Dispatch'}
                    </span>
                    <span className="text-xs sm:text-xs font-bold text-gray-400 mt-0.5">
                      {isCancelled ? 'Terminated' : 'Processing'}
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm mb-3">
                      2
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                      Order Shipped
                    </span>
                    <span className="text-xs sm:text-xs font-bold text-gray-400 mt-0.5">
                      Pending
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm mb-3">
                      3
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                      Out For Delivery
                    </span>
                    <span className="text-xs sm:text-xs font-bold text-gray-400 mt-0.5">
                      Pending
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm mb-3">
                      4
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                      Delivered
                    </span>
                    <span className="text-xs sm:text-xs font-bold text-gray-400 mt-0.5">
                      Pending
                    </span>
                  </div>

                </div>
                </div>
              </div>

              {/* Rate Your Experience Card */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 shadow-xs border border-pink-200/80 font-['Nunito']">
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-1">
                  Rate your experience
                </h3>
                <p className="flex items-center gap-1.5 text-gray-500 font-bold text-xs mb-4">
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
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Delivery Details Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-xs border border-pink-200/80 font-['Nunito']">
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-4">
                  Delivery Details
                </h3>

                <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[18px] p-4 sm:p-5 flex flex-col gap-3.5">
                  {/* Address */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
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
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
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
              <div className="bg-white rounded-[24px] p-6 shadow-xs border border-pink-200/80 font-['Nunito'] flex flex-col gap-3.5">
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-1">
                  Price Details
                </h3>

                <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                  <span>Item Total</span>
                  <span className="font-extrabold text-gray-900">₹{itemTotal}</span>
                </div>

                {savedAmount > 0 && (
                  <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                    <span>You Saved</span>
                    <span className="font-extrabold text-green-600">-₹{savedAmount}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                    <span>Coupon Discount</span>
                    <span className="font-extrabold text-[#F96E8F]">-₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                  <span>Shipping (standard)</span>
                  <span className="font-black text-green-600 uppercase">FREE</span>
                </div>

                <div className="border-t border-gray-200 my-1"></div>

                <div className="flex justify-between items-center text-base font-black text-gray-900">
                  <span>Bill Total</span>
                  <span className="font-black text-[#F96E8F]">₹{billTotal}</span>
                </div>

                {/* Paid By Box - Only shows the chosen payment option */}
                {isCod ? (
                  <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-sm font-black text-gray-900 mt-2">
                    <span>Paid By</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-gray-800">Cash On Delivery</span>
                      <span className="text-[#F96E8F] font-black text-sm">(₹{billTotal})</span>
                    </div>
                  </div>
                ) : isUpi ? (
                  <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-sm font-black text-gray-900 mt-2">
                    <span>Paid By</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-800">UPI</span>
                      <img src={upiIcon} alt="UPI" className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                ) : isNetBanking ? (
                  <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-sm font-black text-gray-900 mt-2">
                    <span>Paid By</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-800">{paymentMethod}</span>
                      <img src={netBankingIcon} alt="Net Banking" className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                ) : isDebit ? (
                  <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-sm font-black text-gray-900 mt-2">
                    <span>Paid By</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-800">Debit Card</span>
                      <img src={debitCardIcon} alt="Debit Card" className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                ) : isCredit ? (
                  <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-sm font-black text-gray-900 mt-2">
                    <span>Paid By</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-800">Credit Card</span>
                      <img src={creditCardIcon} alt="Credit Card" className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FFF0F4] border border-pink-200/80 rounded-[14px] p-3.5 flex justify-between items-center text-sm font-black text-gray-900 mt-2">
                    <span>Paid By</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-800">{paymentMethod}</span>
                    </div>
                  </div>
                )}

                {/* Download Invoice Button */}
                <button
                  onClick={handleDownloadInvoice}
                  disabled={downloadingInvoice}
                  className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-sm py-3.5 px-6 rounded-[12px] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-95 w-full mt-2"
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
