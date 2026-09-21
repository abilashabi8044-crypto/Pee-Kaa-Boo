import React from 'react';

// Icons & Assets
import giftWrap1 from '../assets/checkout/wrap1.png';
import giftWrap2 from '../assets/checkout/wrap2.png';
import giftWrap3 from '../assets/checkout/wrap3.png';

export default function CheckoutAddress({
  addresses,
  billingAddressId,
  setBillingAddressId,
  shippingAddressId,
  setShippingAddressId,
  sameAsBilling,
  setSameAsBilling,
  showAddressForm,
  setShowAddressForm,
  isGift,
  setIsGift,
  selectedGiftWrap,
  setSelectedGiftWrap,
  giftMessage,
  setGiftMessage,
  handleEditAddress,
  handleDeleteAddress,
  setCheckoutStep,
}) {
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
          <span className="text-sm font-extrabold">{addr.name}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={(e) => handleEditAddress(e, addr)} className={`hover:opacity-70 cursor-pointer ${isSelected ? 'text-white' : 'text-blue-500'}`} title="Edit">
            <svg className={`w-4 h-4 ml-1 ${isSelected ? 'text-white' : 'text-[#F96E8F]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            </button>
            <button type="button" onClick={(e) => handleDeleteAddress(e, addr.id)} className={`hover:opacity-70 cursor-pointer ${isSelected ? 'text-white' : 'text-red-500'}`} title="Delete">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            
          </div>
        </div>
        <div className={`p-4 font-['Baloo_2'] text-xs text-gray-600 flex-1 relative`}>
          {isSelected && (
            <div className="absolute inset-0 border-[2px] border-dashed border-[#F96E8F] pointer-events-none" style={{ borderTop: 'none', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}></div>
          )}
          <div className="relative z-10 text-left">
            <p className="font-extrabold text-sm text-gray-900 mb-1">{addr.username}</p>
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
    <>
      {/* Billing Addresses */}
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-4 tracking-wide text-left">
          Select Billing <span className="text-[#F96E8F]">Addresses</span>
        </h2>
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map(addr => renderAddressCard(addr, billingAddressId, setBillingAddressId))}
          </div>
        ) : (
          <div className="bg-white rounded-[16px] p-6 border-2 border-dashed border-gray-200 text-center text-gray-500 font-bold">
            <p className="text-base text-gray-700 mb-1">No address added yet</p>
            <p className="text-xs text-gray-400">Please click below to add your billing & delivery address.</p>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <button onClick={() => setShowAddressForm(true)} className="flex items-center justify-center gap-2 border-[2px] border-dashed border-[#F96E8F] text-[#F96E8F] font-bold py-2 px-12 rounded-[12px] hover:bg-[#FFF0F4] transition-colors w-full sm:w-[50%] cursor-pointer">
            <span className="text-2xl leading-none mb-1">+</span> Add New Address
          </button>
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-3 my-4 cursor-pointer select-none text-left" onClick={() => setSameAsBilling(!sameAsBilling)}>
        <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 ${sameAsBilling ? 'border-transparent' : 'border-gray-300 bg-white'}`}>
          {sameAsBilling && (
            <svg className="w-6 h-6 text-[#F96E8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="font-black text-sm text-gray-800">Use Shipping Address as Billing Address</span>
      </div>

      {/* Shipping Addresses */}
      <div className={`transition-opacity duration-300 ${sameAsBilling ? 'opacity-50 pointer-events-none hidden' : 'opacity-100 block'}`}>
        <h2 className="text-xl font-black text-gray-900 mb-4 tracking-wide text-left">
          Select shipping <span className="text-[#F96E8F]">Addresses</span>
        </h2>
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map(addr => renderAddressCard(addr, shippingAddressId, setShippingAddressId))}
          </div>
        ) : (
          <div className="bg-white rounded-[16px] p-6 border-2 border-dashed border-gray-200 text-center text-gray-500 font-bold">
            <p className="text-base text-gray-700 mb-1">No address added yet</p>
            <p className="text-xs text-gray-400">Please click below to add a shipping address.</p>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <button onClick={() => setShowAddressForm(true)} className="flex items-center justify-center gap-2 border-[2px] border-dashed border-[#F96E8F] text-[#F96E8F] font-bold py-2 px-12 rounded-[12px] hover:bg-[#FFF0F4] transition-colors w-full sm:w-[50%] cursor-pointer">
            <span className="text-2xl leading-none mb-1">+</span> Add New Address
          </button>
        </div>
      </div>

      {/* Gift Wrap Section */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm mt-2 border border-gray-100 text-left">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-base text-gray-900 font-['Baloo_2']">Want to make it special</h3>
            <p className="text-gray-500 text-xs font-extrabold mt-1 leading-snug">
              Make your order extra special with our elegant gift wrapping and a personalized message perfect for any occasion. Because thoughtful details turn a simple purchase into a memorable gift.
            </p>
          </div>
          {/* Toggle Switch */}
          <div
            className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 mt-1 transition-colors flex-shrink-0 ${isGift ? 'bg-[#F96E8F]' : 'bg-gray-300'}`}
            onClick={() => setIsGift(!isGift)}
          >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${isGift ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {isGift && (
          <div className="mt-6 animate-fade-in">
            <h4 className="font-black text-sm text-gray-900 mb-4 font-['Baloo_2']">Choose a Gift Wrap</h4>
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-4 py-2 px-1 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {giftWraps.map(wrap => (
                <div
                  key={wrap.id}
                  onClick={() => setSelectedGiftWrap(wrap.id)}
                  className={`rounded-[16px] overflow-hidden cursor-pointer border-2 transition-all flex flex-col w-[calc(50%-8px)] sm:w-full flex-shrink-0 sm:flex-shrink snap-start ${selectedGiftWrap === wrap.id ? 'border-[#F96E8F] scale-[1.02] shadow-xl relative z-10' : 'border-transparent shadow-md'}`}
                >
                  <div className="h-[200px] w-full bg-gray-100">
                    <img src={wrap.image} alt={wrap.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-[#F96E8F] text-white text-center py-2 font-bold text-sm">
                    {wrap.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="font-black text-sm text-gray-900 mb-2 font-['Baloo_2']">Add a Gift Message (optional)</h4>
              <textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="You can add a personal note With Your Gift"
                className="w-full border border-gray-200 rounded-[12px] p-4 text-xs text-gray-700 outline-none focus:border-[#F96E8F] min-h-[100px] resize-none font-bold shadow-xs"
              />
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
          className={`w-full font-extrabold py-4 rounded-[12px] text-lg transition-all tracking-wide shadow-md ${
            addresses.length > 0 && billingAddressId
              ? 'bg-[#F96E8F] text-white hover:bg-[#E44971] cursor-pointer active:scale-[0.99]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
          }`}
        >
          Deliver To this Address
        </button>
        {addresses.length === 0 && (
          <p className="text-center text-[#F96E8F] font-bold text-xs mt-2.5">
            * Please add an address to proceed with your order
          </p>
        )}
      </div>
    </>
  );
}
