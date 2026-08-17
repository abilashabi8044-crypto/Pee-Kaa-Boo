import React, { useState, useEffect } from 'react';
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


const Account = ({ cartItems, addToCart, orders = [] }) => {
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
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    altMobileNumber: '',
    emailId: '',
    altEmailId: '',
    gender: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});

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
    const phoneRegex = /^\d{10}$/;

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name is required (min 3 chars)';
    }
    if (!formData.mobileNumber.trim() || !phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Valid 10-digit mobile number is required';
    }
    if (formData.altMobileNumber.trim() && !phoneRegex.test(formData.altMobileNumber.trim())) {
      newErrors.altMobileNumber = 'Alternate mobile must be 10 digits';
    }
    if (!formData.emailId.trim() || !emailRegex.test(formData.emailId)) {
      newErrors.emailId = 'Valid email is required';
    }
    if (formData.altEmailId.trim() && !emailRegex.test(formData.altEmailId.trim())) {
      newErrors.altEmailId = 'Valid alternate email is required';
    }
    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Profile updated successfully!');
      // Form is valid, would typically make API call here
    }
  };

  const menuItems = [
    { name: 'My Profile', icon: <UserIcon /> },
    { name: 'My Orders', icon: <OrdersIcon /> },
    { name: 'Saved Locations', icon: <LocationIcon /> },
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
            
            {/* Sidebar (Left Column) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Profile Summary Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 flex items-center gap-5 relative overflow-hidden">
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-sm z-10 border-2 border-white">
                  <img src="https://ui-avatars.com/api/?name=Your+Name&background=333&color=fff&size=150" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col z-10">
                  <h3 className="font-extrabold text-[17px] text-gray-900 leading-tight mb-1">Your name</h3>
                  <p className="text-gray-500 font-bold text-[13px]">+91 91234 56789</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs border border-gray-100 py-3">
                <ul className="flex flex-col">
                  {menuItems.map((item, idx) => (
                    <li key={idx}>
                      <button 
                        onClick={() => {
                          if (item.name === 'Logout') {
                            window.history.pushState({}, '', '/login');
                            window.dispatchEvent(new Event('popstate'));
                          } else {
                            setActiveMenu(item.name);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-6 py-[15px] font-extrabold text-[15px] transition-all duration-200 cursor-pointer ${
                          activeMenu === item.name 
                            ? 'bg-[#FFF0F4] text-gray-900 border-l-[3px] border-l-[#F96E8F]' 
                            : 'text-gray-700 hover:bg-gray-50 border-l-[3px] border-l-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`${activeMenu === item.name ? 'text-[#F96E8F]' : 'text-gray-400'}`}>
                            {item.icon}
                          </span>
                          <span className="tracking-wide font-['Baloo_2']">{item.name}</span>
                        </div>
                        <svg className={`w-4 h-4 ${activeMenu === item.name ? 'text-[#F96E8F]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </li>
                  ))}
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

                    <div className="flex flex-col gap-2">
                      <label className="text-[18px] font-['Baloo_2'] font-black text-gray-700 tracking-wide">Date of Birth</label>
                      <div className="relative">
                        <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} className={`w-full bg-white border ${errors.dob ? 'border-red-500' : 'border-gray-200'} rounded-[12px] h-[52px] px-4 pr-10 outline-none focus:border-[#F96E8F] transition-colors shadow-sm font-bold text-[15px] text-gray-800`} />
                        <img src={date} alt="Date Icon" className="w-[24px] h-[24px] absolute right-4 top-1/2 -translate-y-1/2 object-contain" />
                      </div>
                      {errors.dob && <span className="text-red-500 text-sm font-bold">{errors.dob}</span>}
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="mt-12 flex justify-end">
                    <button type="submit" className="bg-[#F96E8F] hover:bg-[#E44971] text-white py-3 px-12 rounded-[12px] font-bold text-[20px] font-['Baloo_2'] shadow-sm transition-colors cursor-pointer tracking-wider">
                      Edit Profile
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
                                <button className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-[15px] py-2.5 px-8 rounded-[8px] transition-colors shadow-sm cursor-pointer w-[150px]">
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

              {activeMenu === 'Saved Locations' && (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                  <h2 className="text-[24px] font-black text-gray-900 mb-4 tracking-wide w-full text-left">Saved Locations</h2>
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <p className="font-bold text-lg">No locations saved.</p>
                  </div>
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
                <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                  <h2 className="text-[24px] font-black text-gray-900 mb-4 tracking-wide w-full text-left">My Wishlists</h2>
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <p className="font-bold text-lg">Your wishlist is empty.</p>
                  </div>
                </div>
              )}

            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Account;
