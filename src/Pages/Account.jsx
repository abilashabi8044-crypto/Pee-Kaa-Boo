import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import userIcon from '../assets/account/profile.png';
import ordersIcon from '../assets/account/order.png';
import locationIcon from '../assets/account/location.png';
import upiIcon from '../assets/account/upi1.png';
import cardIcon from '../assets/account/card.png';
import heartIcon from '../assets/account/saved.png';
import logoutIcon from '../assets/account/log-out.png';
import date from '../assets/account/date.png';
import product1Img from '../assets/shop/product1.jpg';

// Icons
const UserIcon = () => <img src={userIcon} alt="User Icon" className="w-[24px] h-[24px] object-contain" />;
const OrdersIcon = () => <img src={ordersIcon} alt="Orders Icon" className="w-[24px] h-[24px] object-contain" />;
const LocationIcon = () => <img src={locationIcon} alt="Location Icon" className="w-[24px] h-[24px] object-contain" />;
const UPIIcon = () => <img src={upiIcon} alt="UPI Icon" className="w-[24px] h-[24px] object-contain" />;
const CardIcon = () => <img src={cardIcon} alt="Card Icon" className="w-[24px] h-[24px] object-contain" />;
const HeartIcon = () => <img src={heartIcon} alt="Heart Icon" className="w-[24px] h-[24px] object-contain" />;
const LogoutIcon = () => <img src={logoutIcon} alt="Logout Icon" className="w-[24px] h-[24px] object-contain" />;

const monthsList = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Custom Super Calendar Component
const CustomDatePicker = ({ value, onChange, onClose }) => {
  const parsedDate = value ? new Date(value) : new Date();
  const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

  const [currentYear, setCurrentYear] = useState(validDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(validDate.getMonth());
  const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'
  const [yearPage, setYearPage] = useState(Math.floor(validDate.getFullYear() / 12) * 12);

  const selectedDate = value ? new Date(value) : null;
  const isSelectedDateValid = selectedDate && !isNaN(selectedDate.getTime());
  const selectedYear = isSelectedDateValid ? selectedDate.getFullYear() : null;
  const selectedMonth = isSelectedDateValid ? selectedDate.getMonth() : null;
  const selectedDay = isSelectedDateValid ? selectedDate.getDate() : null;

  const today = new Date();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const startDay = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  const handlePrev = () => {
    if (viewMode === 'days') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    } else if (viewMode === 'years') {
      setYearPage(prev => prev - 12);
    } else if (viewMode === 'months') {
      setCurrentYear(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (viewMode === 'days') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    } else if (viewMode === 'years') {
      setYearPage(prev => prev + 12);
    } else if (viewMode === 'months') {
      setCurrentYear(prev => prev + 1);
    }
  };

  const handleSelectDay = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    onChange(dateStr);
    onClose();
  };

  const handleSelectToday = () => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
    onClose();
  };

  const years = Array.from({ length: 12 }, (_, i) => yearPage + i);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 mt-3 z-50 bg-white rounded-3xl shadow-2xl border border-pink-100 p-5 w-[310px] sm:w-[340px] font-['Nunito'] animate-in fade-in zoom-in-95 duration-150 select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-50">
        <button
          type="button"
          onClick={handlePrev}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-[#F96E8F] transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'months' ? 'days' : 'months')}
            className={`px-3 py-1 rounded-xl font-black text-[15px] transition-all cursor-pointer ${viewMode === 'months' ? 'bg-[#F96E8F] text-white' : 'text-gray-800 hover:bg-pink-50 hover:text-[#F96E8F]'
              }`}
          >
            {monthsList[currentMonth]}
          </button>
          <button
            type="button"
            onClick={() => {
              setYearPage(Math.floor(currentYear / 12) * 12);
              setViewMode(viewMode === 'years' ? 'days' : 'years');
            }}
            className={`px-3 py-1 rounded-xl font-black text-[15px] transition-all cursor-pointer ${viewMode === 'years' ? 'bg-[#F96E8F] text-white' : 'text-gray-800 hover:bg-pink-50 hover:text-[#F96E8F]'
              }`}
          >
            {currentYear}
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-[#F96E8F] transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days Grid View */}
      {viewMode === 'days' && (
        <>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className={`text-[12px] font-black ${idx === 0 || idx === 6 ? 'text-[#F96E8F]' : 'text-gray-400'}`}>
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => {
              const dayNum = prevMonthDays - startDay + i + 1;
              return (
                <div key={`prev-${i}`} className="h-9 flex items-center justify-center text-gray-300 text-[12px] font-bold">
                  {dayNum}
                </div>
              );
            })}

            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === day;
              const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-[13.5px] font-bold transition-all cursor-pointer ${isSelected
                    ? 'bg-gradient-to-tr from-[#F96E8F] to-[#FF8EAA] text-white shadow-md shadow-pink-300 scale-105 font-black'
                    : isToday
                      ? 'border-2 border-[#F96E8F] text-[#F96E8F] font-black hover:bg-pink-50'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-[#F96E8F]'
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Months Grid View */}
      {viewMode === 'months' && (
        <div className="grid grid-cols-3 gap-2 py-1">
          {monthsList.map((m, idx) => {
            const isSelected = currentMonth === idx;
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setCurrentMonth(idx);
                  setViewMode('days');
                }}
                className={`py-3 rounded-2xl font-bold text-[14px] transition-all cursor-pointer ${isSelected
                  ? 'bg-[#F96E8F] text-white shadow-md shadow-pink-200'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-[#F96E8F]'
                  }`}
              >
                {m.substring(0, 3)}
              </button>
            );
          })}
        </div>
      )}

      {/* Years Grid View */}
      {viewMode === 'years' && (
        <div className="grid grid-cols-3 gap-2 py-1">
          {years.map(y => {
            const isSelected = currentYear === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setCurrentYear(y);
                  setViewMode('months');
                }}
                className={`py-3 rounded-2xl font-bold text-[14px] transition-all cursor-pointer ${isSelected
                  ? 'bg-[#F96E8F] text-white shadow-md shadow-pink-200'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-[#F96E8F]'
                  }`}
              >
                {y}
              </button>
            );
          })}
        </div>
      )}

      {/* Footer Quick Actions */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
        <button
          type="button"
          onClick={handleSelectToday}
          className="text-[13px] font-black text-[#F96E8F] hover:underline cursor-pointer"
        >
          Today
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              onChange('');
              onClose();
            }}
            className="px-3 py-1 rounded-xl text-[12px] font-bold text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1 rounded-xl text-[12px] font-bold bg-[#F96E8F] text-white hover:bg-[#E44971] transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const WishlistItemCard = ({ item, addToCart, onRemove }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (addToCart) addToCart(item, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="border border-gray-200 rounded-[18px] p-4 bg-white shadow-sm flex flex-col items-center relative group hover:shadow-md transition-shadow">
      <img src={item.image} alt={item.title} className="w-full h-[180px] object-cover rounded-[14px] mb-3" />
      <h4 className="font-bold text-[16px] text-gray-800 text-center mb-1 font-['Nunito'] line-clamp-1">{item.title}</h4>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-400 font-semibold line-through text-sm">₹{item.oldPrice}</span>
        <span className="text-[#F96E8F] font-black text-lg">₹{item.price}</span>
      </div>
      <button
        onClick={handleAdd}
        className={`w-full py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm mb-2 font-['Nunito'] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${isAdded
          ? 'bg-[#fc148c] text-white scale-95'
          : 'bg-[#F96E8F] text-white hover:bg-[#E44971]'
          }`}
      >
        {isAdded ? (
          <span className="flex items-center gap-1.5 transform transition-transform duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
            Added
          </span>
        ) : (
          'Add to Cart'
        )}
      </button>
      <button
        onClick={onRemove}
        className="text-xs text-gray-400 hover:text-red-500 font-bold transition-colors font-['Nunito'] cursor-pointer"
      >
        Remove from Wishlist
      </button>
    </div>
  );
};

const Account = ({ cartItems, addToCart, orders = [], wishlist = [], addToWishlist }) => {
  const [wishlistToast, setWishlistToast] = useState(null);

  const handleRemoveWishlist = (item) => {
    if (addToWishlist) addToWishlist(item);
    setWishlistToast({
      ...item,
      action: 'removed'
    });
    setTimeout(() => {
      setWishlistToast(null);
    }, 2500);
  };

  const getInitialTab = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam === 'wishlist' || tabParam === 'wishlists' || window.location.hash === '#wishlist') {
      return 'My Wishlists';
    }
    return 'My Profile';
  };

  const [activeMenu, setActiveMenu] = useState(getInitialTab);

  useEffect(() => {
    const handleTabChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');
      if (tabParam === 'wishlist' || tabParam === 'wishlists' || window.location.hash === '#wishlist') {
        setActiveMenu('My Wishlists');
      }
    };

    handleTabChange();
    window.addEventListener('popstate', handleTabChange);
    return () => window.removeEventListener('popstate', handleTabChange);
  }, []);

  const getSavedProfile = () => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      fullName: 'Your name',
      mobileNumber: '',
      altMobileNumber: '',
      emailId: '',
      altEmailId: '',
      gender: '',
      dob: ''
    };
  };

  const [profile, setProfile] = useState(getSavedProfile);
  const [formData, setFormData] = useState(getSavedProfile);
  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  // Address Management State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('userAddresses');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('userAddresses', JSON.stringify(addresses));
    } catch (e) {
      console.error(e);
    }
  }, [addresses]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    name: 'Home',
    username: '',
    line1: '',
    line2: '',
    phone: '',
    type: 'HOME'
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [addressSuccessToast, setAddressSuccessToast] = useState(null);

  const validateAddressForm = () => {
    const errors = {};
    if (!addressFormData.name) {
      errors.name = 'Please select an Address Label';
    }
    if (!addressFormData.username || !addressFormData.username.trim()) {
      errors.username = 'Full Name is required';
    }
    if (!addressFormData.line1 || !addressFormData.line1.trim()) {
      errors.line1 = 'Address Line 1 is required';
    }
    if (!addressFormData.line2 || !addressFormData.line2.trim()) {
      errors.line2 = 'City, State & Pincode is required';
    }
    const cleanPhone = (addressFormData.phone || '').replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Valid 10-digit mobile number is required';
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!validateAddressForm()) return;

    if (editingAddressId) {
      setAddresses(prev => prev.map(addr => addr.id === editingAddressId ? { ...addressFormData, id: editingAddressId } : addr));
      setAddressSuccessToast('Address updated successfully!');
    } else {
      const newId = `addr${Date.now()}`;
      setAddresses(prev => [...prev, { ...addressFormData, id: newId }]);
      setAddressSuccessToast('New address added successfully!');
    }

    closeAddressModal();
    setTimeout(() => setAddressSuccessToast(null), 3000);
  };

  const handleEditAddress = (addr) => {
    setAddressFormData(addr);
    setEditingAddressId(addr.id);
    setAddressErrors({});
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      setAddressSuccessToast('Address deleted successfully.');
      setTimeout(() => setAddressSuccessToast(null), 3000);
    }
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setEditingAddressId(null);
    setAddressFormData({ name: 'Home', username: '', line1: '', line2: '', phone: '', type: 'HOME' });
    setAddressErrors({});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = 'Full Name is required';
    }
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim() || cleanPhone.length < 10) {
      newErrors.mobileNumber = 'Valid 10-digit mobile number is required';
    }
    if (formData.altMobileNumber && formData.altMobileNumber.trim()) {
      const cleanAltPhone = formData.altMobileNumber.replace(/\D/g, '');
      if (cleanAltPhone.length < 10) {
        newErrors.altMobileNumber = 'Alternate mobile must be 10 digits';
      }
    }
    if (formData.emailId && formData.emailId.trim() && !emailRegex.test(formData.emailId.trim())) {
      newErrors.emailId = 'Valid email is required';
    }
    if (formData.altEmailId && formData.altEmailId.trim() && !emailRegex.test(formData.altEmailId.trim())) {
      newErrors.altEmailId = 'Valid alternate email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setProfile({ ...formData });
      try {
        localStorage.setItem('userProfile', JSON.stringify(formData));
      } catch (err) {
        console.error(err);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      alert('Profile details saved successfully!');
    }
  };

  const menuItems = [
    { name: 'My Profile', icon: <UserIcon /> },
    { name: 'My Orders', icon: <OrdersIcon /> },
    { name: 'Manage Addresses', icon: <LocationIcon /> },
    { name: 'Saved UPI', icon: <UPIIcon /> },
    { name: 'Saved Cards', icon: <CardIcon /> },
    { name: 'My Wishlists', icon: <HeartIcon /> },
    { name: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] font-['Baloo_2'] flex flex-col">
      <Header cartItems={cartItems} />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Title */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-[36px] md:text-[72px] font-black tracking-wide text-gray-900 leading-tight">
            My <span className="text-[#F96E8F]">Account</span>
          </h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Sidebar (Left Column - Single Container) */}
          <div className="lg:col-span-4 flex flex-col bg-white rounded-[24px] overflow-hidden shadow-xs border border-gray-100">

            {/* Profile Summary Section */}
            <div className="p-6 flex items-center gap-5 relative overflow-hidden">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-sm z-10 border-2 border-white">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'User')}&background=F96E8F&color=fff&size=150`}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col z-10">
                <h3 className="font-extrabold text-[17px] text-gray-900 leading-tight mb-1">
                  {profile.fullName || 'Your name'}
                </h3>
                <p className="text-gray-500 font-bold text-[13px]">
                  {profile.mobileNumber ? (profile.mobileNumber.startsWith('+91') ? profile.mobileNumber : `+91 ${profile.mobileNumber}`) : '+91 91234 56789'}
                </p>
              </div>
            </div>

            {/* Underline / Divider line after profile details */}
            <div className="border-b border-gray-100 mx-6"></div>

            {/* Navigation Menu */}
            <div className="py-3">
              <ul className="flex flex-col">
                {menuItems.map((item, idx) => {
                  const isLogout = item.name === 'Logout';
                  const isActive = activeMenu === item.name;
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => {
                          if (isLogout) {
                            localStorage.removeItem('isLoggedIn');
                            window.history.pushState({}, '', '/login');
                            window.dispatchEvent(new Event('popstate'));
                          } else {
                            setActiveMenu(item.name);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-6 py-[15px] font-extrabold text-[15px] transition-all duration-200 cursor-pointer ${isLogout
                          ? 'text-red-500 hover:bg-red-50 hover:text-red-600 border-l-[3px] border-l-transparent'
                          : isActive
                            ? 'bg-[#FFF0F4] text-gray-900 border-l-[3px] border-l-[#F96E8F]'
                            : 'text-gray-700 hover:bg-gray-50 border-l-[3px] border-l-transparent'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`${isLogout ? 'text-red-500' : isActive ? 'text-[#F96E8F]' : 'text-gray-400'}`}>
                            {item.icon}
                          </span>
                          <span className="tracking-wide font-['Baloo_2']">{item.name}</span>
                        </div>
                        <svg className={`w-4 h-4 ${isLogout ? 'text-red-400' : isActive ? 'text-[#F96E8F]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

          {/* Content Area (Right Column) */}
          <div className="lg:col-span-8 bg-[#F4FCFF] rounded-3xl p-6 sm:p-10 shadow-xs min-h-[500px]">

            {activeMenu === 'My Profile' && (
              <form onSubmit={handleProfileSubmit}>
                <h2 className="text-[24px] font-black text-gray-900 mb-8 tracking-wide">My Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">

                  {/* Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`} />
                    {errors.fullName && <span className="text-red-500 text-sm font-bold">{errors.fullName}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Mobile Number</label>
                    <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className={`w-full bg-white border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`} />
                    {errors.mobileNumber && <span className="text-red-500 text-sm font-bold">{errors.mobileNumber}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Alternate Mobile Number</label>
                    <input type="text" name="altMobileNumber" value={formData.altMobileNumber} onChange={handleInputChange} className={`w-full bg-white border ${errors.altMobileNumber ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`} />
                    {errors.altMobileNumber && <span className="text-red-500 text-sm font-bold">{errors.altMobileNumber}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Email Id</label>
                    <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} className={`w-full bg-white border ${errors.emailId ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`} />
                    {errors.emailId && <span className="text-red-500 text-sm font-bold">{errors.emailId}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Alternate Email Id</label>
                    <input type="email" name="altEmailId" value={formData.altEmailId} onChange={handleInputChange} className={`w-full bg-white border ${errors.altEmailId ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`} />
                    {errors.altEmailId && <span className="text-red-500 text-sm font-bold">{errors.altEmailId}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full bg-white border ${errors.gender ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`}
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm font-bold">{errors.gender}</span>}
                  </div>

                  <div className="flex flex-col gap-2 relative" ref={calendarRef}>
                    <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Date of Birth</label>
                    <div
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`w-full bg-white border ${errors.dob ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 pr-12 flex items-center justify-between cursor-pointer hover:border-[#F96E8F] transition-colors shadow-sm`}
                    >
                      <span className={`font-bold text-[15px] ${formData.dob ? 'text-gray-800' : 'text-gray-400'}`}>
                        {formData.dob ? formData.dob : 'Select Date of Birth'}
                      </span>
                      <img
                        src={date}
                        alt="Date Icon"
                        className="w-[24px] h-[24px] object-contain hover:scale-110 transition-transform"
                      />
                    </div>
                    {errors.dob && <span className="text-red-500 text-sm font-bold">{errors.dob}</span>}

                    {/* Custom Super Calendar Dropdown */}
                    {showCalendar && (
                      <CustomDatePicker
                        value={formData.dob}
                        onChange={(newDate) => {
                          setFormData(prev => ({ ...prev, dob: newDate }));
                          if (errors.dob) setErrors(prev => ({ ...prev, dob: '' }));
                        }}
                        onClose={() => setShowCalendar(false)}
                      />
                    )}
                  </div>

                </div>

                {/* Submit Button */}
                <div className="mt-12 flex items-center justify-end gap-4">
                  {savedSuccess && (
                    <span className="text-green-600 font-bold text-[15px]">
                      ✓ Profile updated successfully!
                    </span>
                  )}
                  <button type="submit" className="bg-[#F96E8F] hover:bg-[#E44971] text-white py-3 px-12 rounded-[12px] font-bold text-[20px] font-['Baloo_2'] shadow-sm transition-colors cursor-pointer tracking-wider">
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeMenu === 'My Orders' && (
              <div className="flex flex-col w-full font-['Baloo_2'] min-h-[500px]">
                <h2 className="text-[24px] font-black text-gray-900 mb-6 tracking-wide w-full text-left">My Orders</h2>

                {/* Toolbar */}
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                  <div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-[8px] overflow-hidden shadow-sm">
                    <input type="text" placeholder="Search Orders" className="flex-1 px-4 py-2.5 font-bold text-[14px] text-gray-700 outline-none" />
                    <button className="bg-[#F96E8F] hover:bg-[#E44971] text-white px-6 py-2.5 font-bold text-[14px] flex items-center gap-2 cursor-pointer transition-colors h-full">
                      Search
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-[15px] text-gray-900">Sort by :</span>
                    <select className="border border-gray-300 rounded-[8px] px-3 py-2 font-bold text-[14px] text-gray-600 bg-white outline-none cursor-pointer">
                      <option>last 3 months</option>
                      <option>last 6 months</option>
                      <option>2023</option>
                      <option>2022</option>
                    </select>
                  </div>
                </div>

                {/* Orders List */}
                <div className="flex flex-col gap-6">
                  {orders.length > 0 ? (
                    orders.map(order => (
                      <div key={order.id} className="bg-white border border-gray-100 rounded-[12px] p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center relative">
                        <div className="w-full sm:w-[130px] h-[130px] rounded-[12px] overflow-hidden bg-[#F9E5E8] flex-shrink-0">
                          <img src={order.image} alt="Product" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                          <p className="font-black text-gray-900 mb-2">Order ID: <span className="text-[#F96E8F]">{order.id}</span></p>
                          <h3 className="font-black text-[20px] text-gray-800 mb-1 leading-tight">{order.name}</h3>
                          <p className="text-gray-500 font-bold text-[13px] mb-3">Product Code: {order.code}</p>
                          <p className="font-bold text-[15px] text-gray-500 mb-2">Qty: <span className="text-[#F96E8F]">{order.qty} Nos</span></p>
                          <p className="font-black text-[24px] text-[#F96E8F] mt-1">₹ {order.price}</p>
                        </div>

                        <div className="flex flex-row sm:flex-col gap-3 mt-4 sm:mt-0 self-end ml-auto">
                          {order.status === 'active' ? (
                            <>
                              <button className="font-black text-[14px] text-gray-800 hover:text-[#F96E8F] transition-colors py-2 px-4 cursor-pointer text-right">
                                Cancel Order
                              </button>
                              <button
                                onClick={() => {
                                  window.history.pushState({ orderId: order.id }, '', '/order-details');
                                  window.dispatchEvent(new Event('popstate'));
                                }}
                                className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-[15px] py-2.5 px-8 rounded-[8px] transition-colors shadow-sm cursor-pointer w-[150px]"
                              >
                                Track Order
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="border border-gray-200 text-gray-700 font-extrabold text-[15px] py-2.5 px-8 rounded-[8px] hover:bg-gray-50 transition-colors cursor-pointer w-[150px]">
                                Return Order
                              </button>
                              <button className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-[15px] py-2.5 px-8 rounded-[8px] transition-colors shadow-sm cursor-pointer w-[150px]">
                                Reorder
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 font-bold mt-10">No orders found.</div>
                  )}
                </div>
              </div>
            )}

            {(activeMenu === 'Manage Addresses' || activeMenu === 'Saved Locations') && (
              <div className="flex flex-col w-full min-h-[500px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-[24px] font-black text-gray-900 tracking-wide">Manage Addresses ({addresses.length})</h2>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5">Add, edit, or delete your delivery and billing addresses</p>
                  </div>
                  <button
                    onClick={() => {
                      setAddressFormData({ name: 'Home', username: '', line1: '', line2: '', phone: '', type: 'HOME' });
                      setEditingAddressId(null);
                      setAddressErrors({});
                      setShowAddressModal(true);
                    }}
                    className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-black py-3 px-6 rounded-[12px] text-[15px] flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    <span className="text-[20px] leading-none">+</span> Add New Address
                  </button>
                </div>

                {/* Success Toast */}
                {addressSuccessToast && (
                  <div className="bg-green-500 text-white font-extrabold px-5 py-3 rounded-[14px] shadow-md mb-6 flex items-center justify-between text-[14px] animate-fade-in">
                    <span>✓ {addressSuccessToast}</span>
                    <button onClick={() => setAddressSuccessToast(null)} className="ml-4 font-black">✕</button>
                  </div>
                )}

                {addresses.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center min-h-[320px] bg-white rounded-[20px] p-8 border-2 border-dashed border-gray-200 text-center">
                    <div className="w-16 h-16 rounded-full bg-pink-50 text-[#F96E8F] flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-[18px] text-gray-800 mb-1">No Saved Addresses Found</h3>
                    <p className="text-gray-500 font-bold text-[14px] max-w-md mb-6">You haven't saved any addresses yet. Add an address now to make checkout faster and easier.</p>
                    <button
                      onClick={() => {
                        setAddressFormData({ name: 'Home', username: '', line1: '', line2: '', phone: '', type: 'HOME' });
                        setEditingAddressId(null);
                        setAddressErrors({});
                        setShowAddressModal(true);
                      }}
                      className="border-[2px] border-dashed border-[#F96E8F] text-[#F96E8F] font-black py-2.5 px-8 rounded-[12px] hover:bg-pink-50 transition-colors cursor-pointer text-[15px]"
                    >
                      + Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white rounded-[20px] p-6 border border-gray-200 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="bg-[#F96E8F]/15 text-[#F96E8F] font-black text-[13px] px-3.5 py-1 rounded-full uppercase tracking-wider">
                              {addr.name || 'HOME'}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditAddress(addr)}
                                className="p-2 text-gray-400 hover:text-[#F96E8F] hover:bg-pink-50 rounded-full transition-colors cursor-pointer"
                                title="Edit Address"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                title="Delete Address"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <h4 className="font-extrabold text-[17px] text-gray-900 mb-1">{addr.username}</h4>
                          <p className="text-gray-600 font-bold text-[14px] leading-snug">{addr.line1}</p>
                          <p className="text-gray-600 font-bold text-[14px] leading-snug">{addr.line2}</p>
                          <p className="text-gray-500 font-extrabold text-[13px] mt-3">Mobile: <span className="text-gray-800">{addr.phone}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeMenu === 'Saved UPI' && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <h2 className="text-[24px] font-black text-gray-900 mb-4 tracking-wide w-full text-left">Saved UPI</h2>
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <p className="font-bold text-lg">No UPI IDs saved.</p>
                </div>
              </div>
            )}

            {activeMenu === 'Saved Cards' && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <h2 className="text-[24px] font-black text-gray-900 mb-4 tracking-wide w-full text-left">Saved Cards</h2>
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <p className="font-bold text-lg">No cards saved.</p>
                </div>
              </div>
            )}

            {activeMenu === 'My Wishlists' && (
              <div className="flex flex-col w-full">
                <h2 className="text-[24px] font-black text-gray-900 mb-6 tracking-wide w-full text-left">My Wishlists ({wishlist.length})</h2>
                {wishlist.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-gray-500">
                    <p className="font-bold text-lg">Your wishlist is empty.</p>
                  </div>
                ) : (
                  <div className="max-h-[640px] overflow-y-auto pr-2 custom-scrollbar transition-all">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                      {wishlist.map((item, idx) => (
                        <WishlistItemCard
                          key={item.id || idx}
                          item={item}
                          addToCart={addToCart}
                          onRemove={() => handleRemoveWishlist(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Address Form Modal */}
      {showAddressModal && (
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

            <form onSubmit={handleSaveAddress} className="flex flex-col gap-4" noValidate>
              {/* Address Label Styled Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-black text-gray-800">Address Label <span className="text-[#F96E8F]">*</span></label>
                <div className="relative">
                  <select
                    value={addressFormData.name}
                    onChange={e => {
                      const val = e.target.value;
                      setAddressFormData({ ...addressFormData, name: val, type: val.toUpperCase() });
                      if (addressErrors.name) setAddressErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className={`w-full appearance-none bg-white border ${addressErrors.name ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} rounded-[12px] py-3.5 pl-4 pr-10 font-bold text-[14px] ${addressFormData.name ? 'text-gray-900' : 'text-gray-400'} outline-none focus:border-[#F96E8F] transition-all shadow-xs cursor-pointer`}
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
                  value={addressFormData.username}
                  onChange={e => {
                    setAddressFormData({ ...addressFormData, username: e.target.value });
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
                  value={addressFormData.line1}
                  onChange={e => {
                    setAddressFormData({ ...addressFormData, line1: e.target.value });
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
                  value={addressFormData.line2}
                  onChange={e => {
                    setAddressFormData({ ...addressFormData, line2: e.target.value });
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
                  value={addressFormData.phone}
                  onChange={e => {
                    setAddressFormData({ ...addressFormData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
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

      {/* Wishlist Toast Notification */}
      {wishlistToast && (
        <div className="fixed top-8 right-8 z-50 bg-white border-[2px] border-gray-300 shadow-lg text-gray-800 px-5 py-4 rounded-[16px] flex items-center gap-3.5 min-w-[280px] max-w-[360px]">
          <div className="w-10 h-10 rounded-[12px] bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex-1 pr-2">
            <h4 className="font-black text-gray-700 text-[15px] font-['Nunito'] leading-tight">
              Wishlist removed
            </h4>
            <p className="text-gray-500 text-[12px] font-bold font-['Nunito'] line-clamp-1 mt-0.5">
              {wishlistToast.title || "Product"}
            </p>
          </div>
          <button
            onClick={() => setWishlistToast(null)}
            className="w-7 h-7 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Account;
