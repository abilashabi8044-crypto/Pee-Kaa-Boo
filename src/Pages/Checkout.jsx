import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrders as addOrdersAction } from '../redux/ordersSlice';
import { clearCart } from '../redux/cartSlice';
import Header from './Header';
import Footer from './Footer';

// Icons & Assets
import discount from '../assets/cart/discount.png';
import giftWrap1 from '../assets/checkout/wrap1.png';
import giftWrap2 from '../assets/checkout/wrap2.png';
import giftWrap3 from '../assets/checkout/wrap3.png';
import netBankingIcon from '../assets/checkout/noto_bank.png';
import debitCardIcon from '../assets/checkout/twemoji_credit-card (1).png';
import creditCardIcon from '../assets/checkout/twemoji_credit-card.png';
import upiIcon from '../assets/checkout/upi-id 1.png';
import axisLogo from '../assets/checkout/bank-logo/axis.png';
import hdfcLogo from '../assets/checkout/bank-logo/hdfc.png';
import hsbcLogo from '../assets/checkout/bank-logo/hsbc.png';
import iciciLogo from '../assets/checkout/bank-logo/icici.png';
import iobLogo from '../assets/checkout/bank-logo/iob.png';
import kotakLogo from '../assets/checkout/bank-logo/kotak.png';
import sbiLogo from '../assets/checkout/bank-logo/sbi.png';
import arrowLeft from '../assets/product/arrow-l.png';
import arrowRight from '../assets/product/arrow-r.png';
import { gridItems } from './Shop';
import location from '../assets/cart/location.png';
import visa from '../assets/checkout/visa.png';
import mastercard from '../assets/checkout/mastercard.png';
import rupay from '../assets/checkout/rupay.png';
import check from '../assets/checkout/check.png';
import gpayLogo from '../assets/checkout/bank-logo/g-pay.png';
import phonepeLogo from '../assets/checkout/bank-logo/p-pay.png';
import paytmLogo from '../assets/checkout/bank-logo/paytm.png';
import paypalLogo from '../assets/checkout/bank-logo/pay-pal.png';



const Checkout = ({ cartItems = [], updateQuantity, addToCart, placeOrder }) => {
  const dispatch = useDispatch();
  const [checkoutStep, setCheckoutStep] = useState('address');
  const [selectedPayment, setSelectedPayment] = useState('netbanking');
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryMM, setCardExpiryMM] = useState('');
  const [cardExpiryYYYY, setCardExpiryYYYY] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [selectedBankId, setSelectedBankId] = useState('');
  const [dropdownBankId, setDropdownBankId] = useState('');
  const [bankSearchQuery, setBankSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const [allBanks, setAllBanks] = useState([]);

  useEffect(() => {
    fetch('/banks.json')
      .then(res => res.json())
      .then(data => setAllBanks(data))
      .catch(err => console.error("Error fetching banks:", err));
  }, []);

  const filteredBanks = allBanks.filter(bank => bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase()));

  const popularBanks = [
    { id: 'axis', name: 'Axis', logo: axisLogo },
    { id: 'icici', name: 'ICICI', logo: iciciLogo },
    { id: 'iob', name: 'IOB', logo: iobLogo },
    { id: 'hdfc', name: 'HDFC', logo: hdfcLogo },
    { id: 'kotak', name: 'Kotak', logo: kotakLogo },
    { id: 'sbi', name: 'SBI', logo: sbiLogo },
    { id: 'hsbc', name: 'HSBC', logo: hsbcLogo },
  ];

  const PaymentOption = ({ id, icon, title, subtitle }) => {
    const isSelected = selectedPayment === id;
    return (
      <div
        onClick={() => setSelectedPayment(id)}
        className="flex items-center gap-4 py-2 cursor-pointer group"
      >
        <div className="w-[45px] h-[45px] rounded-[10px] bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
          {typeof icon === 'string' ? (
            <img src={icon} alt={title} className="w-[28px] h-[28px] object-contain" />
          ) : (
            icon
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-black text-[22px] text-gray-900">{title}</h4>
          <p className="font-extrabold text-[11px] text-gray-400 mt-1 leading-none">{subtitle}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center transition-colors ${isSelected ? 'border-[#F96E8F]' : 'border-gray-300'}`}>
          {isSelected && <div className="w-2.5 h-2.5 bg-[#F96E8F] rounded-full"></div>}
        </div>
      </div>
    );
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
      paymentMethod: selectedPayment === 'cod'
        ? 'Cash On Delivery'
        : selectedPayment === 'netbanking'
        ? `Net Banking${selectedBankId ? ` (${selectedBankId.toUpperCase()})` : ''}`
        : selectedPayment === 'debit'
        ? 'Debit Card'
        : selectedPayment === 'credit'
        ? 'Credit Card'
        : 'UPI',
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

    setShowBankModal(false);
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

  const giftWraps = [
    { id: 'wrap1', name: 'Warm Hugs', image: giftWrap1 },
    { id: 'wrap2', name: 'Purple Sun', image: giftWrap2 },
    { id: 'wrap3', name: 'Fairy Tales', image: giftWrap3 },
  ];

  const renderAddressCard = (addr, selectedId, onSelect) => {
    const isSelected = selectedId === addr.id;
    return (
      <div
        key={addr.id}
        onClick={() => onSelect(addr.id)}
        className={`rounded-[12px] border cursor-pointer overflow-hidden transition-all duration-200 ${isSelected ? 'border-[#F96E8F]' : 'border-gray-200'} bg-white flex flex-col`}
      >
        <div className={`flex justify-between items-center p-3 font-['Baloo_2'] font-bold ${isSelected ? 'bg-[#F96E8F] text-white' : 'bg-white text-gray-800 border-b border-gray-100'}`}>
          <span className="text-[14px] font-extrabold">{addr.name}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={(e) => handleEditAddress(e, addr)} className={`hover:opacity-70 cursor-pointer ${isSelected ? 'text-white' : 'text-blue-500'}`} title="Edit">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <button type="button" onClick={(e) => handleDeleteAddress(e, addr.id)} className={`hover:opacity-70 cursor-pointer ${isSelected ? 'text-white' : 'text-red-500'}`} title="Delete">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            <svg className={`w-4 h-4 ml-1 ${isSelected ? 'text-white' : 'text-[#F96E8F]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
        <div className={`p-4 font-['Baloo_2'] text-[13px] text-gray-600 flex-1 relative`}>
          {isSelected && (
            <div className="absolute inset-0 border-[2px] border-dashed border-[#F96E8F] pointer-events-none" style={{ borderTop: 'none', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}></div>
          )}
          <div className="relative z-10">
            <p className="font-extrabold text-[15px] text-gray-900 mb-1">{addr.username}</p>
            <p>{addr.line1}</p>
            <p>{addr.line2}</p>
            <p className="mt-1">Phone Number : {addr.phone}</p>
            <p>Address Type : {addr.type}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white font-['Baloo_2'] flex flex-col">
      <Header cartItems={cartItems} />

      <main className="w-full flex-grow relative pt-8 pb-20 lg:pb-0">
        {/* Bank Popup Modal */}
        {showBankModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[8px] p-8 w-full max-w-lg shadow-xl font-['Baloo_2'] relative">
              <button onClick={() => setShowBankModal(false)} className="absolute top-6 right-6 text-[#F96E8F] hover:text-[#E44971] cursor-pointer">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gray-800">Select & Pay via your bank</h3>
                <p className="text-gray-400 font-bold text-[14px]">Payment will be completed on your bank's website</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 px-10">
                {popularBanks.map(bank => (
                  <div
                    key={bank.id}
                    onClick={() => { setSelectedBankId(bank.id); setDropdownBankId(bank.id); }}
                    className={`flex flex-col items-center justify-center p-4 rounded-[12px] cursor-pointer transition-all w-[110px] h-[110px] border-2 ${selectedBankId === bank.id ? 'border-[#F96E8F] bg-[#FFF0F4]' : 'border-transparent hover:bg-gray-50'}`}
                  >
                    <img src={bank.logo} alt={bank.name} className="h-12 object-contain mb-2" />
                    <span className="font-bold text-gray-700 text-sm">{bank.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center my-6 max-w-lg mx-auto">
                <hr className="flex-1 border-gray-400" />
                <span className="mx-4 font-black text-gray-800 text-[16px]">Or</span>
                <hr className="flex-1 border-gray-400" />
              </div>

              <div className="max-w-lg mx-auto">
                <label className="block text-gray-600 font-bold text-sm mb-2">Select Your Bank</label>
                <div className="relative">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full border border-gray-200 rounded-[12px] p-4 font-bold text-gray-700 outline-none focus:border-[#F96E8F] bg-white cursor-pointer flex justify-between items-center"
                  >
                    <span>{dropdownBankId ? allBanks.find(b => b.id === dropdownBankId)?.name || popularBanks.find(b => b.id === dropdownBankId)?.name : 'Select from all banks'}</span>
                    <svg className={`w-6 h-6 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                      <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search your bank..."
                            value={bankSearchQuery}
                            onChange={(e) => setBankSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#F96E8F] text-sm"
                            autoFocus
                          />
                          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="max-h-[200px] overflow-y-auto">
                        {filteredBanks.length > 0 ? (
                          filteredBanks.map(bank => (
                            <div
                              key={bank.id}
                              onClick={() => {
                                setDropdownBankId(bank.id);
                                setSelectedBankId(bank.id);
                                setIsDropdownOpen(false);
                                setBankSearchQuery('');
                              }}
                              className={`px-4 py-3 cursor-pointer text-sm font-bold transition-colors ${dropdownBankId === bank.id ? 'bg-[#FFF0F4] text-[#F96E8F]' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                              {bank.name}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center font-bold">
                            No banks found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-8">
                  <button 
                    onClick={() => {
                      if (selectedBankId) {
                        handleCompletePayment();
                      }
                    }}
                    className={`w-[260px] text-white font-extrabold py-3.5 rounded-[12px] text-[18px] shadow-sm transition-colors ${selectedBankId ? 'bg-[#F96E8F] hover:bg-[#E44971] cursor-pointer' : 'bg-pink-300 cursor-not-allowed'}`}
                    disabled={!selectedBankId}
                  >
                    Submit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Details Modal */}
        {showCardModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[8px] p-8 w-full max-w-lg shadow-xl font-['Baloo_2'] relative">
              <button onClick={() => setShowCardModal(false)} className="absolute top-6 right-6 text-[#F96E8F] hover:text-[#E44971] cursor-pointer">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <h3 className="text-[24px] font-['Nunito'] text-gray-800">Add New Card</h3>
                <p className="text-gray-400 font-['Nunito'] text-[14px]">Save & Pay via Cards</p>
              </div>

              {/* We Accept badges */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['Nunito'] text-gray-800 text-[18px]">We Accept :</span>
                <div className="flex items-center gap-2">
                  <img src={visa} alt="visa" className='w-[23px] h-[10px] object-contain'/>
                  <img src={mastercard} alt="mastercard" className='w-[23px] h-[10px] object-contain'/>
                  <img src={rupay} alt="rupay" className='w-[23px] h-[10px] object-contain'/>
                </div>
              </div>

              {/* Card Holders Name */}
              <div className="mb-5">
                <label className="block text-gray-800 font-['Nunito'] text-[14px] mb-2">Card Holders Name</label>
                <input
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="Enter card holder's name"
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors"
                />
              </div>

              {/* Card Number */}
              <div className="mb-5">
                <label className="block text-gray-800 font-['Nunito'] text-[14px] mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setCardNumber(formatted);
                  }}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors tracking-widest"
                />
              </div>

              {/* Expiry + CVV Row */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-gray-800 font-['Nunito'] text-[14px] mb-2">Expiry Details</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cardExpiryMM}
                      onChange={(e) => setCardExpiryMM(e.target.value.replace(/\D/g, '').slice(0, 2))}
                      placeholder="MM"
                      maxLength={2}
                      className="w-[70px] border border-gray-200 rounded-[10px] px-3 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors text-center"
                    />
                    <input
                      type="text"
                      value={cardExpiryYYYY}
                      onChange={(e) => setCardExpiryYYYY(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="YYYY"
                      maxLength={4}
                      className="w-[80px] border border-gray-200 rounded-[10px] px-3 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors text-center"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-800 font-['Nunito'] text-[14px] mb-2">CVV</label>
                  <input
                    type="password"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="•••"
                    maxLength={4}
                    className="w-[100px] border border-gray-200 rounded-[10px] px-3 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors text-center tracking-[0.3em]"
                  />
                </div>
              </div>

              {/* Save Card Checkbox */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  onClick={() => setSaveCard(!saveCard)}
                  className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors border-2 ${
                    saveCard ? 'border-[#F96E8F]' : 'bg-white border-gray-300'
                  }`}
                >
                  {saveCard && (
                    <img src={check} alt="checkmark" className='w-[10px] h-[10px] object-contain'/>
                  )}
                </div>
                <span className="font-['Nunito'] text-gray-700 text-[14px]">Save Card With RBI Guidelines</span>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (cardHolderName && cardNumber && cardExpiryMM && cardExpiryYYYY && cardCVV) {
                      setShowCardModal(false);
                      handleCompletePayment();
                    }
                  }}
                  className={`w-[280px] text-white font-extrabold py-3.5 rounded-full text-[18px] shadow-md transition-colors ${
                    cardHolderName && cardNumber.replace(/\s/g, '').length >= 15 && cardExpiryMM && cardExpiryYYYY.length === 4 && cardCVV.length >= 3
                      ? 'bg-[#F96E8F] hover:bg-[#E44971] cursor-pointer'
                      : 'bg-pink-300 cursor-not-allowed'
                  }`}
                  disabled={!(cardHolderName && cardNumber.replace(/\s/g, '').length >= 15 && cardExpiryMM && cardExpiryYYYY.length === 4 && cardCVV.length >= 3)}
                >
                  Submit Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPI Payment Modal */}
        {showUpiModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[8px] p-8 w-full max-w-lg shadow-xl font-['Baloo_2'] relative">
              <button onClick={() => setShowUpiModal(false)} className="absolute top-6 right-6 text-[#F96E8F] hover:text-[#E44971] cursor-pointer">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-8">
                <h3 className="text-[24px] font-['Nunito'] text-gray-800">Select & Pay via UPI payment</h3>
                <p className="text-gray-400 font-['Nunito'] text-[14px]">Pay via your Preffered UPI method</p>
              </div>

              {/* UPI ID Input */}
              <div className="mb-6">
                <label className="block text-gray-800 font-['Nunito'] text-[14px] mb-2">UPI ID</label>
                <div className="flex items-stretch h-12">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="flex-1 border border-gray-200 border-r-0 rounded-l-[10px] px-4 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors"
                  />
                  <button
                    className="px-6 border border-gray-200 border-l-0 rounded-r-[10px] text-gray-500 font-['Nunito'] font-bold text-[14px] hover:text-[#F96E8F] transition-colors cursor-pointer bg-white"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {/* Or Divider */}
              <div className="flex items-center my-6 max-w-lg mx-auto">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-4 font-black text-gray-800 text-[16px]">Or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              {/* UPI App Options */}
              <div className="flex justify-center gap-6 mb-8">
                {[
                  { id: 'gpay', name: 'Google Pay', logo: gpayLogo },
                  { id: 'phonepe', name: 'PhonePe', logo: phonepeLogo },
                  { id: 'paytm', name: 'Paytm', logo: paytmLogo },
                  { id: 'paypal', name: 'PayPal', logo: paypalLogo },
                ].map(app => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedUpiApp(app.id);
                      const urls = {
                        gpay: 'https://pay.google.com',
                        phonepe: 'https://www.phonepe.com',
                        paytm: 'https://paytm.com',
                        paypal: 'https://www.paypal.com'
                      };
                      if (urls[app.id]) {
                        window.open(urls[app.id], '_blank');
                      }
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-[12px] cursor-pointer transition-all w-[100px] h-[100px] border-2 ${
                      selectedUpiApp === app.id ? 'border-[#F96E8F] bg-[#FFF0F4]' : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <img src={app.logo} alt={app.name} className="h-12 w-12 object-contain mb-2" />
                    <span className="font-bold text-gray-700 text-[12px] font-['Nunito']">{app.name}</span>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (upiId || selectedUpiApp) {
                      setShowUpiModal(false);
                      handleCompletePayment();
                    }
                  }}
                  className={`w-[280px] text-[#ffffff] font-[Nunito] py-3.5 rounded-[18px] text-[18px] shadow-md transition-colors ${
                    upiId || selectedUpiApp
                      ? 'bg-[#F96E8F] hover:bg-[#E44971] cursor-pointer'
                      : 'bg-pink-300 cursor-not-allowed'
                  }`}
                  disabled={!(upiId || selectedUpiApp)}
                >
                  Submit Details
                </button>
              </div>
            </div>
          </div>
        )}

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
              <>
                {/* Billing Addresses */}
                <div>
                  <h2 className="text-[20px] font-black text-gray-900 mb-4 tracking-wide">
                    Select Billing <span className="text-[#F96E8F]">Addresses</span>
                  </h2>
                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addresses.map(addr => renderAddressCard(addr, billingAddressId, setBillingAddressId))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-[16px] p-6 border-2 border-dashed border-gray-200 text-center text-gray-500 font-bold">
                      <p className="text-[16px] text-gray-700 mb-1">No address added yet</p>
                      <p className="text-[13px] text-gray-400">Please click below to add your billing & delivery address.</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-center">
                    <button onClick={() => setShowAddressForm(true)} className="flex items-center justify-center gap-2 border-[2px] border-dashed border-[#F96E8F] text-[#F96E8F] font-bold py-2 px-12 rounded-[12px] hover:bg-[#FFF0F4] transition-colors w-full sm:w-[50%] cursor-pointer">
                      <span className="text-[24px] leading-none mb-1">+</span> Add New Address
                    </button>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 my-4 cursor-pointer" onClick={() => setSameAsBilling(!sameAsBilling)}>
                  <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 ${sameAsBilling ? 'border-transparent' : 'border-gray-300 bg-white'}`}>
                    {sameAsBilling && (
                      <svg className="w-6 h-6 text-[#F96E8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-black text-[15px] text-gray-800">Use Shipping Address as Billing Address</span>
                </div>

                {/* Shipping Addresses */}
                <div className={`transition-opacity duration-300 ${sameAsBilling ? 'opacity-50 pointer-events-none hidden' : 'opacity-100 block'}`}>
                  <h2 className="text-[20px] font-black text-gray-900 mb-4 tracking-wide">
                    Select shipping <span className="text-[#F96E8F]">Addresses</span>
                  </h2>
                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addresses.map(addr => renderAddressCard(addr, shippingAddressId, setShippingAddressId))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-[16px] p-6 border-2 border-dashed border-gray-200 text-center text-gray-500 font-bold">
                      <p className="text-[16px] text-gray-700 mb-1">No address added yet</p>
                      <p className="text-[13px] text-gray-400">Please click below to add a shipping address.</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-center">
                    <button onClick={() => setShowAddressForm(true)} className="flex items-center justify-center gap-2 border-[2px] border-dashed border-[#F96E8F] text-[#F96E8F] font-bold py-2 px-12 rounded-[12px] hover:bg-[#FFF0F4] transition-colors w-full sm:w-[50%] cursor-pointer">
                      <span className="text-[24px] leading-none mb-1">+</span> Add New Address
                    </button>
                  </div>
                </div>

                {/* Gift Wrap Section */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm mt-2 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-black text-[16px] text-gray-900">Want to make it special</h3>
                      <p className="text-gray-500 text-[11px] font-extrabold mt-1 leading-snug max-w-[90%]">
                        Make your order extra special with our elegant gift wrapping and a personalized message perfect for any occasion. Because thoughtful details turn a simple purchase into a memorable gift.
                      </p>
                    </div>
                    {/* Toggle Switch */}
                    <div
                      className={`w-20 h-5 rounded-full flex items-center cursor-pointer px-1 mt-1 transition-colors ${isGift ? 'bg-[#F96E8F]' : 'bg-gray-300'}`}
                      onClick={() => setIsGift(!isGift)}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${isGift ? 'translate-x-7' : 'translate-x-0'}`}></div>
                    </div>
                  </div>

                  {isGift && (
                    <div className="mt-6 animate-fade-in">
                      <h4 className="font-black text-[15px] text-gray-900 mb-4">Choose a Gift Wrap</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {giftWraps.map(wrap => (
                          <div
                            key={wrap.id}
                            onClick={() => setSelectedGiftWrap(wrap.id)}
                            className={`rounded-[16px] overflow-hidden cursor-pointer border-2 transition-all flex flex-col ${selectedGiftWrap === wrap.id ? 'border-[#F96E8F] scale-[1.02] shadow-xl' : 'border-transparent shadow-md'}`}
                          >
                            <div className="h-[200px] w-full bg-gray-100">
                              <img src={wrap.image} alt={wrap.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-[#F96E8F] text-white text-center py-2 font-bold text-[14px]">
                              {wrap.name}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h4 className="font-black text-[15px] text-gray-900 mb-2">Add a Gift Message (optional)</h4>
                        <textarea
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="You can add a personal note With Your Gift"
                          className="w-full border border-gray-200 rounded-[12px] p-4 text-[13px] text-gray-700 outline-none focus:border-[#F96E8F] min-h-[100px] resize-none font-bold shadow-xs"
                        />
                        <button className="mt-3 bg-[#F96E8F] text-white px-8 py-2 rounded-lg font-bold text-[14px] hover:bg-[#E44971] transition-colors shadow-sm">
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block mt-8 mb-2">
                  <button
                    disabled={addresses.length === 0 || !billingAddressId}
                    onClick={() => {
                      if (addresses.length > 0 && billingAddressId) {
                        setCheckoutStep('payment');
                      }
                    }}
                    className={`w-full font-extrabold py-4 rounded-[12px] text-[18px] transition-all tracking-wide shadow-md ${
                      addresses.length > 0 && billingAddressId
                        ? 'bg-[#F96E8F] text-white hover:bg-[#E44971] cursor-pointer active:scale-[0.99]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    Deliver To this Address
                  </button>
                  {addresses.length === 0 && (
                    <p className="text-center text-[#F96E8F] font-bold text-[13px] mt-2.5">
                      * Please add an address to proceed with your order
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="animate-fade-in font-['Baloo_2']">
                <h2 className="text-[28px] font-black text-gray-900 mb-8 tracking-wide">
                  Select <span className="text-[#F96E8F]">Payment Method</span>
                </h2>

                <div className="flex flex-col bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                  <PaymentOption
                    id="netbanking"
                    icon={netBankingIcon}
                    title="Net Banking"
                    subtitle="Select from a list of Banks"
                  />
                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <PaymentOption
                    id="debit"
                    icon={debitCardIcon}
                    title="Debit Card"
                    subtitle="Save & Pay via Debit Cards"
                  />
                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <PaymentOption
                    id="credit"
                    icon={creditCardIcon}
                    title="Credit Card"
                    subtitle="Save & Pay via Credit Cards"
                  />
                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <PaymentOption
                    id="upi"
                    icon={upiIcon}
                    title="UPI"
                    subtitle="Paytm, Phonepe, Google Pay, & more"
                  />
                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <PaymentOption
                    id="cod"
                    icon={<span className="text-[24px]">💰</span>}
                    title="Cash On Delivery"
                    subtitle="Payment will be made on delivery by cash"
                  />
                </div>

                <div className="hidden lg:flex mt-10 justify-end">
                  <button
                    onClick={() => {
                      if (selectedPayment === 'netbanking') {
                        setShowBankModal(true);
                      } else if (selectedPayment === 'credit' || selectedPayment === 'debit') {
                        setShowCardModal(true);
                      } else if (selectedPayment === 'upi') {
                        setShowUpiModal(true);
                      } else {
                        handleCompletePayment();
                      }
                    }}
                    className="bg-[#F96E8F] text-white font-black py-3 px-12 rounded-[10px] text-[21px] hover:bg-[#E44971] transition-colors shadow-md cursor-pointer"
                  >
                    {selectedPayment === 'netbanking' ? 'Continue' : selectedPayment === 'cod' ? 'Place Order' : 'Pay Now'}
                  </button>
                </div>
              </div>
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
              className="rounded-xl flex bg-white shadow-xs"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'12\' ry=\'12\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'14%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
            >
              <div
                className="flex items-center gap-4 p-4 flex-1"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cline x1=\'100%25\' y1=\'15%25\' x2=\'100%25\' y2=\'85%25\' stroke=\'%23F96E8F\' stroke-width=\'2\' stroke-dasharray=\'8%2c 8\' /%3e%3c/svg%3e")' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] text-white flex items-center justify-center font-black shadow-sm">
                  <img src={discount} alt="" className='h-[30px] w-[30px]' />
                </div>
                <span className="text-[#F96E8F] font-black text-[21px] tracking-wide">
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
                className="text-[#F96E8F] font-black text-[16px] px-6 hover:underline cursor-pointer"
              >
                {appliedCoupon ? 'Remove' : 'Apply'}
              </button>
            </div>

            {/* Specific Offer Card */}
            <div className={`border rounded-[12px] p-4 bg-white flex justify-between items-center shadow-xs transition-colors ${appliedCoupon ? 'border-green-400 bg-green-50/20' : 'border-[#F96E8F]'}`}>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black shadow-xs">
                  <img src={discount} alt="" className='h-[20px] w-[20px]' />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-[13px] uppercase">FLAT ₹1000</h4>
                  <p className="text-gray-600 font-bold text-[12px]">Flat 1000 off on Preset jewellery</p>
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
                className={`font-extrabold text-[12px] px-4 hover:underline cursor-pointer ${appliedCoupon && appliedCouponCode === 'FLAT1000' ? 'text-green-600 font-black' : 'text-gray-400'}`}
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
              onClick={() => setShowCouponInput(!showCouponInput)}
              className="w-full bg-[#F96E8F] hover:bg-[#E44971] text-white font-medium py-3 rounded-b-xl text-[12px] font-[Nunito] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
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

        {/* You May Also Like Section */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 mt-6 sm:mt-10 mb-0">
          <div className="bg-[#F4FCFF] rounded-[2rem] p-4 pb-4 sm:p-6 sm:pb-6 md:p-8 md:pb-6 shadow-xs border border-blue-50">
            <h2 className="text-[24px] md:text-[41px] font-black text-gray-900 mb-6 sm:mb-8 font-['Baloo_2']">
              You May <span className="text-[#F96E8F]">Also Like</span>
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.slice(carouselIndex, carouselIndex + itemsPerPage).map((product, idx) => {
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

                      {/* Best Selling Badge */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="bg-[#00D0CC] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                            <path d="m8.21 13.89-3 4.1c-.26.36-.02.85.43.85h3.6l1.26 3.16c.16.4.74.4 1 0L12.76 18.84h3.6c.45 0 .69-.49.43-.85l-3-4.1" />
                          </svg>
                          <span className="text-[12px] font-extrabold tracking-wide">Best Selling</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button className="w-9 h-9 bg-[#00D0CC] hover:bg-[#00b3b0] text-white rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </button>
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
                      <span className="text-gray-400 text-[11px] font-[Nunito] uppercase mb-1">
                        {product.category}
                      </span>

                      <h4 className="text-gray-900 font-bold text-[24px] sm:text-[20px] leading-tight mb-1 tracking-wide font-['Nunito'] group-hover:text-[#F96E8F] transition-colors">
                        {product.title}
                      </h4>

                      <div className="flex justify-center items-center gap-2">
                        <del className="text-gray-400 font-bold text-[19px] font-[Nunito]">₹ {product.oldPrice}</del>
                        <span className="text-[#F96E8F] font-bold text-[33px] font-['Nunito']">₹ {product.price}</span>
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
            <div className="flex items-center justify-between mt-4 sm:mt-6">
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
          </div>
        </section>

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
            onClick={() => {
              if (selectedPayment === 'netbanking') {
                setShowBankModal(true);
              } else if (selectedPayment === 'credit' || selectedPayment === 'debit') {
                setShowCardModal(true);
              } else if (selectedPayment === 'upi') {
                setShowUpiModal(true);
              } else {
                handleCompletePayment();
              }
            }}
            className="bg-[#F96E8F] hover:bg-[#E44971] text-white px-6 py-3 rounded-[12px] font-bold text-[15px] shadow-sm transition-all tracking-wide active:scale-[0.98] cursor-pointer"
          >
            {selectedPayment === 'netbanking' ? 'Continue' : selectedPayment === 'cod' ? 'Place Order' : 'Pay Now'}
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
