import YouMayAlsoLike from '../components/YouMayAlsoLike';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrders as addOrdersAction } from '../redux/ordersSlice';
import { clearCart } from '../redux/cartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Icons & Assets
import discount from '../assets/cart/discount.png';
import arrowLeft from '../assets/product/arrow-l.png';
import arrowRight from '../assets/product/arrow-r.png';
import { gridItems } from './Shop';

// Subcomponents
import CheckoutAddress from '../components/CheckoutAddress';
import CheckoutPayment from '../components/CheckoutPayment';

const Checkout = ({ cartItems = [], updateQuantity, addToCart, placeOrder }) => {
  const dispatch = useDispatch();
  const giftWraps = [
    { id: 'wrap1', name: 'Warm Hugs' },
    { id: 'wrap2', name: 'Purple Sun' },
    { id: 'wrap3', name: 'Fairy Tales' },
  ];
  const [checkoutStep, setCheckoutStep] = useState('address');
  const [selectedPayment, setSelectedPayment] = useState('online');
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setAppliedCoupon(false);
      setAppliedCouponCode('');
      setCouponCode('');
      setShowCouponInput(false);
    }
  }, [cartItems]);

  const recommendedProducts = gridItems.filter(item => item.type === 'product');
  const itemsPerPage = isMobile ? 1 : 4;
  const maxCarousel = Math.max(0, recommendedProducts.length - itemsPerPage);
  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };
  const handleNextCarousel = () => {
    setCarouselIndex((prev) => Math.min(maxCarousel, prev + 1));
  };
  const progressWidth = recommendedProducts.length > 0 
    ? ((carouselIndex + Math.min(itemsPerPage, recommendedProducts.length)) / recommendedProducts.length) * 100 
    : 100;

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


  const [isGift, setIsGift] = useState(false);
  const [selectedGiftWrap, setSelectedGiftWrap] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
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

  const handleCompletePayment = () => {
    const userProfile = (() => {
      try {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    })();

    const currentUserId = localStorage.getItem('userId') || (userProfile?.emailId ? `user_${userProfile.emailId.replace(/[^a-zA-Z0-9]/g, '_')}` : 'user_guest');
    const currentUserEmail = localStorage.getItem('userEmail') || userProfile?.emailId || 'username@gmail.com';
    const currentUserName = userProfile?.fullName || 'Your name';
    const currentUserPhone = userProfile?.mobileNumber || '+91 91234 56789';

    const deliveryAddress = addresses.find(a => a.id === (sameAsBilling ? billingAddressId : shippingAddressId)) || addresses[0] || {
      name: 'Home',
      username: currentUserName,
      line1: '123 Anywhere St.',
      line2: 'Any City, ST 12345',
      phone: currentUserPhone
    };

    const orderId = Math.floor(100000000 + Math.random() * 900000000).toString();
    const orderDate = new Date().toLocaleDateString('en-GB');

    const orderData = {
      orderId,
      userId: currentUserId,
      userEmail: currentUserEmail,
      userName: deliveryAddress.username || currentUserName,
      userPhone: deliveryAddress.phone || currentUserPhone,
      customer: {
        id: currentUserId,
        name: deliveryAddress.username || currentUserName,
        email: currentUserEmail,
        phone: deliveryAddress.phone || currentUserPhone
      },
      items: cartItems.length > 0 ? cartItems.map(item => ({
        id: item.id || Math.random().toString().substring(2, 9),
        title: item.title || 'Name of the product',
        code: item.code || (item.id ? `64A288${item.id}` : '64A288075'),
        image: item.image,
        price: Number(item.price) || 1710,
        oldPrice: Number(item.oldPrice) || Number(item.price) || 2000,
        qty: item.quantity || 1,
        orderDate,
        status: 'active'
      })) : [],
      address: {
        name: deliveryAddress.name || 'Home',
        username: deliveryAddress.username || currentUserName,
        address: `${deliveryAddress.line1 || ''}, ${deliveryAddress.line2 || ''}`.replace(/^,\s*|,\s*$/g, '') || '123 Anywhere St., Any City, ST 12345',
        phone: deliveryAddress.phone || currentUserPhone
      },
      paymentMethod: selectedPayment === 'cod' ? 'Cash On Delivery' : 'Online Payment',
      itemTotal: displayItemTotal,
      savedAmount: displaySaved,
      couponDiscount,
      shippingCost: 0,
      billTotal: displayBillTotal,
      status: 'active',
      date: new Date().toISOString(),
      orderDate
    };

    dispatch(addOrdersAction(orderData));
    dispatch(clearCart());

    try {
      localStorage.setItem('pkb_latest_order', JSON.stringify(orderData));
    } catch (e) {
      console.error(e);
    }

    setShowThankYouModal(true);
  };

  // Dynamic financial calculations from Cart
  const displayItemTotal = cartItems.reduce((acc, item) => acc + ((Number(item.oldPrice) || Number(item.price) || 0) * (item.quantity || 1)), 0);
  const displaySubTotal = cartItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
  const displaySaved = Math.max(0, displayItemTotal - displaySubTotal);
  const giftWrapFee = isGift && selectedGiftWrap ? 50 : 0;
  const couponDiscount = appliedCoupon && cartItems.length > 0 ? (displaySubTotal >= 1000 ? 1000 : displaySubTotal) : 0;
  const shippingCost = 0;
  const displayBillTotal = Math.max(0, displaySubTotal - couponDiscount + giftWrapFee + shippingCost);

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('userAddresses');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [billingAddressId, setBillingAddressId] = useState(() => {
    try {
      const saved = localStorage.getItem('userAddresses');
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.length > 0 ? parsed[0].id : '';
    } catch (e) {
      return '';
    }
  });
  const [shippingAddressId, setShippingAddressId] = useState(() => {
    try {
      const saved = localStorage.getItem('userAddresses');
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.length > 0 ? parsed[0].id : '';
    } catch (e) {
      return '';
    }
  });
  const [sameAsBilling, setSameAsBilling] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('userAddresses', JSON.stringify(addresses));
    } catch (e) {
      console.error(e);
    }
    if (addresses.length > 0) {
      if (!addresses.some(a => a.id === billingAddressId)) {
        setBillingAddressId(addresses[0].id);
      }
      if (!addresses.some(a => a.id === shippingAddressId)) {
        setShippingAddressId(addresses[0].id);
      }
    } else {
      setBillingAddressId('');
      setShippingAddressId('');
    }
  }, [addresses]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', username: '', line1: '', line2: '', phone: '', type: 'HOME' });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressErrors, setAddressErrors] = useState({});

  const validateAddressForm = () => {
    const errors = {};
    if (!newAddress.name) {
      errors.name = 'Please select an Address Label';
    }
    if (!newAddress.username || !newAddress.username.trim()) {
      errors.username = 'Full Name is required';
    }
    if (!newAddress.line1 || !newAddress.line1.trim()) {
      errors.line1 = 'Address Line 1 is required';
    }
    if (!newAddress.line2 || !newAddress.line2.trim()) {
      errors.line2 = 'City, State & Pincode is required';
    }
    const cleanPhone = (newAddress.phone || '').replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Valid 10-digit mobile number is required';
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!validateAddressForm()) {
      return;
    }

    if (editingAddressId) {
      setAddresses(addresses.map(addr => addr.id === editingAddressId ? { ...newAddress, id: editingAddressId } : addr));
    } else {
      const newId = `addr${Date.now()}`;
      setAddresses([...addresses, { ...newAddress, id: newId }]);
    }

    setShowAddressForm(false);
    setNewAddress({ name: '', username: '', line1: '', line2: '', phone: '', type: 'HOME' });
    setEditingAddressId(null);
    setAddressErrors({});
  };

  const closeAddressModal = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setNewAddress({ name: '', username: '', line1: '', line2: '', phone: '', type: 'HOME' });
    setAddressErrors({});
  };

  const handleEditAddress = (e, addr) => {
    e.stopPropagation();
    setNewAddress(addr);
    setEditingAddressId(addr.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (e, id) => {
    e.stopPropagation();
    setAddresses(addresses.filter(addr => addr.id !== id));
  };



return (
    <div className="w-full min-h-screen bg-white font-['Baloo_2'] flex flex-col">
      <Header cartItems={cartItems} />

      <main className="w-full flex-grow relative pt-8 pb-20 lg:pb-0">

        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] p-6 sm:p-7 w-full max-w-md shadow-2xl font-['Baloo_2'] border border-gray-100">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h3 className="text-[20px] font-black text-gray-900">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
                <button
                  onClick={closeAddressModal}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center font-bold text-base cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="flex flex-col gap-4" noValidate>
                {/* Address Label Styled Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-black text-gray-800">Address Label <span className="text-[#F96E8F]">*</span></label>
                  <div className="relative">
                    <select
                      value={newAddress.name}
                      onChange={e => {
                        const val = e.target.value;
                        setNewAddress({ ...newAddress, name: val, type: val.toUpperCase() });
                        if (addressErrors.name) setAddressErrors(prev => ({ ...prev, name: '' }));
                      }}
                      className={`w-full appearance-none bg-white border ${addressErrors.name ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} rounded-[12px] py-3.5 pl-4 pr-10 font-bold text-[14px] ${newAddress.name ? 'text-gray-900' : 'text-gray-400'} outline-none focus:border-[#F96E8F] transition-all shadow-xs cursor-pointer`}
                    >
                      <option value="" disabled className="text-gray-400">Select Address Label</option>
                      <option value="Home" className="text-gray-800 font-bold py-2">🏠 Home (Residence)</option>
                      <option value="Work" className="text-gray-800 font-bold py-2">💼 Work (Office / Business)</option>
                      <option value="Other" className="text-gray-800 font-bold py-2">📍 Other (Friend / Family)</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {addressErrors.name && <span className="text-red-500 text-[12px] font-bold mt-0.5">{addressErrors.name}</span>}
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-black text-gray-800">Full Name <span className="text-[#F96E8F]">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter recipient's full name"
                    value={newAddress.username}
                    onChange={e => {
                      setNewAddress({ ...newAddress, username: e.target.value });
                      if (addressErrors.username) setAddressErrors(prev => ({ ...prev, username: '' }));
                    }}
                    className={`w-full border ${addressErrors.username ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} p-3.5 rounded-[12px] outline-none focus:border-[#F96E8F] font-bold text-[14px] text-gray-800 transition-all shadow-xs`}
                  />
                  {addressErrors.username && <span className="text-red-500 text-[12px] font-bold mt-0.5">{addressErrors.username}</span>}
                </div>

                {/* Address Line 1 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-black text-gray-800">Address Line 1 <span className="text-[#F96E8F]">*</span></label>
                  <input
                    type="text"
                    placeholder="House/Flat No., Building Name, Street"
                    value={newAddress.line1}
                    onChange={e => {
                      setNewAddress({ ...newAddress, line1: e.target.value });
                      if (addressErrors.line1) setAddressErrors(prev => ({ ...prev, line1: '' }));
                    }}
                    className={`w-full border ${addressErrors.line1 ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} p-3.5 rounded-[12px] outline-none focus:border-[#F96E8F] font-bold text-[14px] text-gray-800 transition-all shadow-xs`}
                  />
                  {addressErrors.line1 && <span className="text-red-500 text-[12px] font-bold mt-0.5">{addressErrors.line1}</span>}
                </div>

                {/* City, State, Pincode */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-black text-gray-800">City, State & Pincode <span className="text-[#F96E8F]">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai, Tamil Nadu - 600001"
                    value={newAddress.line2}
                    onChange={e => {
                      setNewAddress({ ...newAddress, line2: e.target.value });
                      if (addressErrors.line2) setAddressErrors(prev => ({ ...prev, line2: '' }));
                    }}
                    className={`w-full border ${addressErrors.line2 ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} p-3.5 rounded-[12px] outline-none focus:border-[#F96E8F] font-bold text-[14px] text-gray-800 transition-all shadow-xs`}
                  />
                  {addressErrors.line2 && <span className="text-red-500 text-[12px] font-bold mt-0.5">{addressErrors.line2}</span>}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-black text-gray-800">Mobile Number <span className="text-[#F96E8F]">*</span></label>
                  <input
                    type="text"
                    placeholder="10-digit mobile number"
                    value={newAddress.phone}
                    onChange={e => {
                      setNewAddress({ ...newAddress, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
                      if (addressErrors.phone) setAddressErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full border ${addressErrors.phone ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} p-3.5 rounded-[12px] outline-none focus:border-[#F96E8F] font-bold text-[14px] text-gray-800 transition-all shadow-xs`}
                  />
                  {addressErrors.phone && <span className="text-red-500 text-[12px] font-bold mt-0.5">{addressErrors.phone}</span>}
                </div>

                <div className="flex gap-4 mt-3">
                  <button
                    type="button"
                    onClick={closeAddressModal}
                    className="flex-1 py-3.5 border border-gray-300 rounded-[12px] hover:bg-gray-50 font-bold cursor-pointer text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#F96E8F] text-white rounded-[12px] hover:bg-[#E44971] font-bold cursor-pointer shadow-sm transition-colors"
                  >
                    {editingAddressId ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Hero Section */}
        <div className="w-full text-center mb-10">
          <h1 className="text-[40px] md:text-[72px] font-black text-gray-900 tracking-wide">
            Checkout
          </h1>
        </div>

        {/* Content Wrapper */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column (Forms) */}
          <div className="lg:col-span-7 flex flex-col gap-6 bg-[#F4FCFF] p-6 md:p-8 rounded-[30px] border border-blue-50">
            {checkoutStep === 'address' ? (
              <CheckoutAddress
                addresses={addresses}
                billingAddressId={billingAddressId}
                setBillingAddressId={setBillingAddressId}
                shippingAddressId={shippingAddressId}
                setShippingAddressId={setShippingAddressId}
                sameAsBilling={sameAsBilling}
                setSameAsBilling={setSameAsBilling}
                showAddressForm={showAddressForm}
                setShowAddressForm={setShowAddressForm}
                isGift={isGift}
                setIsGift={setIsGift}
                selectedGiftWrap={selectedGiftWrap}
                setSelectedGiftWrap={setSelectedGiftWrap}
                giftMessage={giftMessage}
                setGiftMessage={setGiftMessage}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                setCheckoutStep={setCheckoutStep}
              />
            ) : (
              <CheckoutPayment
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                handleCompletePayment={handleCompletePayment}
              />
            )}

          </div>

          {/* Right Column (Order Summary) */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-24 h-fit">

            {/* Products List */}
            <div className="flex flex-col gap-4">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const itemQty = item.quantity || 1;
                  const itemPrice = Number(item.price) || 0;
                  const itemOldPrice = Number(item.oldPrice) || itemPrice;
                  return (
                    <div key={item.id || index} className="border border-[#F96E8F]/30 rounded-[20px] p-4 bg-white flex items-center gap-4 sm:gap-5 shadow-sm relative overflow-hidden">
                      <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-[16px] overflow-hidden flex-shrink-0 bg-[#F4D9DC]">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#F9E5E8]"></div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <h3 className="font-[Baloo_2] font-bold text-[16px] sm:text-[24px] text-gray-900 mb-1 leading-tight truncate" title={item.title}>
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-gray-500 font-extrabold text-[14px]">
                            Product Code: {item.code || (item.id ? `PKB-${item.id}` : 'PKB-101')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {itemOldPrice > itemPrice && (
                            <del className="text-gray-400 font-['Baloo_2']  text-[14px]">
                              ₹ {itemOldPrice * itemQty}
                            </del>
                          )}
                          <span className="text-[#F96E8F] font-bold font-['Baloo_2']  text-[24px]">
                            ₹ {itemPrice * itemQty}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="border border-[#F96E8F]/30 rounded-[20px] p-8 bg-white text-center text-gray-500 font-bold shadow-sm">
                  Your cart is empty
                </div>
              )}
            </div>

            {/* Apply Coupon Box */}
            <div
              className={`rounded-xl flex bg-white shadow-xs ${cartItems.length === 0 ? 'opacity-60' : ''}`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'12\' ry=\'12\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'14%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
            >
              <div
                className="flex items-center gap-4 p-4 flex-1"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cline x1=\'100%25\' y1=\'15%25\' x2=\'100%25\' y2=\'85%25\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'8%2c 8\' /%3e%3c/svg%3e")' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] text-white flex items-center justify-center font-black shadow-sm">
                  <img src={discount} alt="" className={`h-[30px] w-[30px] ${cartItems.length === 0 ? 'grayscale opacity-60' : ''}`} />
                </div>
                <span className={`font-black text-[21px] tracking-wide ${cartItems.length === 0 ? 'text-gray-400' : 'text-[#F96E8F]'}`}>
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
                className={`font-black text-[16px] px-6 cursor-pointer ${cartItems.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#F96E8F] hover:underline'}`}
              >
                {appliedCoupon ? 'Remove' : 'Apply'}
              </button>
            </div>

            {/* Specific Offer Card */}
            <div className={`border rounded-[12px] p-4 bg-white flex justify-between items-center shadow-xs transition-colors ${cartItems.length === 0 ? 'border-gray-200 opacity-60' : (appliedCoupon ? 'border-green-400 bg-green-50/20' : 'border-[#F96E8F]')}`}>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black shadow-xs">
                  <img src={discount} alt="" className={`h-[20px] w-[20px] ${cartItems.length === 0 ? 'grayscale opacity-60' : ''}`} />
                </div>
                <div>
                  <h4 className={`font-black text-gray-900 text-[13px] uppercase ${cartItems.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}>FLAT ₹1000</h4>
                  <p className={`font-bold text-[12px] ${cartItems.length === 0 ? 'text-gray-400' : 'text-gray-600'}`}>Flat 1000 off on Preset jewellery</p>
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
                className={`font-extrabold text-[12px] px-4 cursor-pointer ${cartItems.length === 0 ? 'text-gray-300 cursor-not-allowed' : (appliedCoupon && appliedCouponCode === 'FLAT1000' ? 'text-green-600 font-black' : 'text-gray-400 hover:underline')}`}
              >
                {appliedCoupon && appliedCouponCode === 'FLAT1000' ? 'Applied ✓' : 'Apply'}
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
                    className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-['Nunito'] text-[12px] px-5 py-2 rounded-lg font-bold transition-colors cursor-pointer"
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
              className={`w-full font-medium py-3 rounded-b-xl text-[12px] font-[Nunito] transition-colors shadow-xs flex items-center justify-center gap-2 ${
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
              className="hidden lg:flex rounded-xl p-6 bg-white shadow-xs flex-col gap-4 mt-2"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'12\' ry=\'12\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'14%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
            >
              <div className="flex justify-between items-center text-[17px] font-black text-gray-800">
                <span>Item Total ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)</span>
                <span className="font-black">₹{displayItemTotal}</span>
              </div>
              {displaySaved > 0 && (
                <div className="flex justify-between items-center text-[17px] font-black text-green-600">
                  <span>You Saved</span>
                  <span className="font-black">-₹{displaySaved}</span>
                </div>
              )}
              {appliedCoupon && couponDiscount > 0 && (
                <div className="flex justify-between items-center text-[17px] font-black text-[#F96E8F]">
                  <span>Coupon Discount (FLAT 1000)</span>
                  <span className="font-black">-₹{couponDiscount}</span>
                </div>
              )}
              {isGift && selectedGiftWrap && (
                <div className="flex justify-between items-center text-[17px] font-black text-gray-800">
                  <span>Gift Wrap ({giftWraps.find(w => w.id === selectedGiftWrap)?.name || 'Custom'})</span>
                  <span className="font-black">₹{giftWrapFee}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-[17px] font-black text-gray-800">
                <span>Shipping (standard)</span>
                <span className="font-black uppercase text-green-600">FREE</span>
              </div>
              <div className="border-t-2 border-gray-300 my-1"></div>
              <div className="flex justify-between items-center text-[17px] font-black text-gray-900">
                <span>Bill Total</span>
                <span className="font-black text-[#F96E8F]">₹{displayBillTotal}</span>
              </div>
            </div>
          </div>
        </div>

        <YouMayAlsoLike />

        {/* Thank You / Order Confirmation Popup Modal */}
        {showThankYouModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[150] flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 md:p-14 w-full max-w-[620px] shadow-2xl font-['Baloo_2'] text-center border border-gray-100 animate-fade-in relative">
              {/* Pink Circle Checkmark */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F96E8F] text-white rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-md shadow-pink-200">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-[28px] sm:text-[36px] font-black text-gray-900 mb-2 sm:mb-3">
                Thank you!
              </h2>

              {/* Description */}
              <p className="text-gray-500  font-['Nunito'] text-[14px] sm:text-[16px] max-w-[420px] mx-auto mb-8 sm:mb-10 leading-relaxed">
                Your order has been confirmed &amp; it is on the way. Check your email for the details
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setShowThankYouModal(false);
                    window.history.pushState({}, '', '/');
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="w-full sm:w-auto min-w-[190px] bg-[#F96E8F] hover:bg-[#E44971] text-white font-black text-[16px] sm:text-[17px] py-3.5 px-8 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Go to Homepage
                </button>
                <button
                  onClick={() => {
                    setShowThankYouModal(false);
                    window.history.pushState({}, '', '/order-details');
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="w-full sm:w-auto min-w-[190px] bg-white border-2 border-[#F96E8F] text-[#F96E8F] hover:bg-[#FFF0F4] font-black text-[16px] sm:text-[17px] py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Check Order Details
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Order Summary & Action Bar for Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 py-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        {/* Left: Prices & Info Icon */}
        <div className="flex flex-col justify-center">
          <del className="text-gray-400 font-bold text-[13px] leading-tight">
            ₹ {displayItemTotal}
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

        {/* Right: Action Button (Deliver To This Address or Pay/Continue) */}
        {checkoutStep === 'address' ? (
          <button
            disabled={addresses.length === 0 || !billingAddressId}
            onClick={() => {
              if (addresses.length > 0 && billingAddressId) {
                setCheckoutStep('payment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setShowAddressForm(true);
              }
            }}
            className={`text-white px-5 py-3 rounded-[12px] font-bold text-[15px] shadow-sm transition-all tracking-wide ${
              addresses.length > 0 && billingAddressId
                ? 'bg-[#F96E8F] hover:bg-[#E44971] active:scale-[0.98] cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed opacity-70'
            }`}
          >
            Deliver To This Address
          </button>
        ) : (
          <button
            onClick={handleCompletePayment}
            className="bg-[#F96E8F] hover:bg-[#E44971] text-white px-6 py-3 rounded-[12px] font-bold text-[15px] shadow-sm transition-all tracking-wide active:scale-[0.98] cursor-pointer"
          >
            {selectedPayment === 'online' ? 'Pay Now' : 'Place Order'}
          </button>
        )}
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
            <span>Item Total ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)</span>
            <span className="font-extrabold text-gray-900">₹{displayItemTotal}</span>
          </div>

          {displaySaved > 0 && (
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
              <span>You Saved</span>
              <span className="font-extrabold text-[#27AE60]">-₹{displaySaved}</span>
            </div>
          )}

          {appliedCoupon && couponDiscount > 0 && (
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
              <span>Coupon Discount</span>
              <span className="font-extrabold text-[#F96E8F]">-₹{couponDiscount}</span>
            </div>
          )}

          {isGift && selectedGiftWrap && (
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 font-['Baloo_2']">
              <span>Gift Wrap</span>
              <span className="font-extrabold text-gray-900">₹{giftWrapFee}</span>
            </div>
          )}

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

      <Footer />
    </div>
  );
};

export default Checkout;
