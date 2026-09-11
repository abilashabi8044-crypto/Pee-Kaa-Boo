import React, { useState, useEffect } from 'react';

// Icons & Assets
import creditCardIcon from '../assets/checkout/twemoji_credit-card.png';
import axisLogo from '../assets/checkout/bank-logo/axis.png';
import hdfcLogo from '../assets/checkout/bank-logo/hdfc.png';
import hsbcLogo from '../assets/checkout/bank-logo/hsbc.png';
import iciciLogo from '../assets/checkout/bank-logo/icici.png';
import iobLogo from '../assets/checkout/bank-logo/iob.png';
import kotakLogo from '../assets/checkout/bank-logo/kotak.png';
import sbiLogo from '../assets/checkout/bank-logo/sbi.png';
import visa from '../assets/checkout/visa.png';
import mastercard from '../assets/checkout/mastercard.png';
import rupay from '../assets/checkout/rupay.png';
import check from '../assets/checkout/check.png';
import gpayLogo from '../assets/checkout/bank-logo/g-pay.png';
import phonepeLogo from '../assets/checkout/bank-logo/p-pay.png';
import paytmLogo from '../assets/checkout/bank-logo/paytm.png';
import paypalLogo from '../assets/checkout/bank-logo/pay-pal.png';

export default function CheckoutPayment({
  selectedPayment,
  setSelectedPayment,
  handleCompletePayment,
}) {
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
        className="flex items-center gap-4 py-2 cursor-pointer group select-none text-left"
      >
        <div className="w-[45px] h-[45px] rounded-[10px] bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
          {typeof icon === 'string' ? (
            <img src={icon} alt={title} className="w-[28px] h-[28px] object-contain" />
          ) : (
            icon
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-black text-xl text-gray-900 font-['Baloo_2']">{title}</h4>
          <p className="font-extrabold text-xs text-gray-400 mt-1 leading-none">{subtitle}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center transition-colors ${isSelected ? 'border-[#F96E8F]' : 'border-gray-300'}`}>
          {isSelected && <div className="w-2.5 h-2.5 bg-[#F96E8F] rounded-full"></div>}
        </div>
      </div>
    );
  };

  const handlePayClick = () => {
    if (selectedPayment === 'cod') {
      handleCompletePayment();
    } else {
      // In online mode, we can show net banking, card details or UPI modals.
      // Since it wasn't wired up in original code, we will toggle the sub modals or proceed.
      // To mimic the UI exactly, let's proceed to place order or open card details modal as a default choice.
      // Let's call handleCompletePayment directly as original, but support opening sub modals if user clicks sub options.
      handleCompletePayment();
    }
  };

  return (
    <div className="animate-fade-in font-['Baloo_2']">
      <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-wide text-left">
        Select <span className="text-[#F96E8F]">Payment Method</span>
      </h2>

      <div className="flex flex-col bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
        <PaymentOption
          id="online"
          icon={creditCardIcon}
          title="Online Payment"
          subtitle="Cards, Net Banking, UPI, & Wallets"
        />
        <div className="border-t border-dashed border-gray-200 my-4"></div>

        <PaymentOption
          id="cod"
          icon={<span className="text-2xl">💰</span>}
          title="Cash On Delivery"
          subtitle="Payment will be made on delivery by cash"
        />
      </div>

      <div className="hidden lg:flex mt-10 justify-end">
        <button
          onClick={handlePayClick}
          className="bg-[#F96E8F] text-white font-black py-3 px-12 rounded-[10px] text-xl hover:bg-[#E44971] transition-colors shadow-md cursor-pointer"
        >
          {selectedPayment === 'online' ? 'Pay Now' : 'Place Order'}
        </button>
      </div>

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
              <p className="text-gray-400 font-bold text-sm">Payment will be completed on your bank's website</p>
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
              <span className="mx-4 font-black text-gray-800 text-base">Or</span>
              <hr className="flex-1 border-gray-400" />
            </div>

            <div className="max-w-lg mx-auto">
              <label className="block text-gray-600 font-bold text-sm mb-2 text-left">Select Your Bank</label>
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
                            className={`px-4 py-3 text-left cursor-pointer text-sm font-bold transition-colors ${dropdownBankId === bank.id ? 'bg-[#FFF0F4] text-[#F96E8F]' : 'text-gray-700 hover:bg-gray-50'}`}
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
                      setShowBankModal(false);
                      handleCompletePayment();
                    }
                  }}
                  className={`w-[260px] text-white font-extrabold py-3.5 rounded-[12px] text-lg shadow-sm transition-colors ${selectedBankId ? 'bg-[#F96E8F] hover:bg-[#E44971] cursor-pointer' : 'bg-pink-300 cursor-not-allowed'}`}
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
              <h3 className="text-2xl font-['Nunito'] text-gray-800">Add New Card</h3>
              <p className="text-gray-400 font-['Nunito'] text-sm">Save & Pay via Cards</p>
            </div>

            {/* We Accept badges */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-['Nunito'] text-gray-800 text-lg">We Accept :</span>
              <div className="flex items-center gap-2">
                <img src={visa} alt="visa" className='w-[23px] h-[10px] object-contain'/>
                <img src={mastercard} alt="mastercard" className='w-[23px] h-[10px] object-contain'/>
                <img src={rupay} alt="rupay" className='w-[23px] h-[10px] object-contain'/>
              </div>
            </div>

            {/* Card Holders Name */}
            <div className="mb-5 text-left">
              <label className="block text-gray-800 font-['Nunito'] text-sm mb-2">Card Holders Name</label>
              <input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="Enter card holder's name"
                className="w-full border border-gray-200 rounded-[10px] px-4 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors"
              />
            </div>

            {/* Card Number */}
            <div className="mb-5 text-left">
              <label className="block text-gray-800 font-['Nunito'] text-sm mb-2">Card Number</label>
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
            <div className="flex gap-4 mb-6 text-left">
              <div className="flex-1">
                <label className="block text-gray-800 font-['Nunito'] text-sm mb-2">Expiry Details</label>
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
                <label className="block text-gray-800 font-['Nunito'] text-sm mb-2">CVV</label>
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
            <div className="flex items-center gap-3 mb-6 select-none">
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
              <span className="font-['Nunito'] text-gray-700 text-sm">Save Card With RBI Guidelines</span>
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
                className={`w-[280px] text-white font-extrabold py-3.5 rounded-full text-lg shadow-md transition-colors ${
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
              <h3 className="text-2xl font-['Nunito'] text-gray-800">Select & Pay via UPI payment</h3>
              <p className="text-gray-400 font-['Nunito'] text-sm">Pay via your Preffered UPI method</p>
            </div>

            {/* UPI ID Input */}
            <div className="mb-6 text-left">
              <label className="block text-gray-800 font-['Nunito'] text-sm mb-2">UPI ID</label>
              <div className="flex items-stretch h-12">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="flex-1 border border-gray-200 border-r-0 rounded-l-[10px] px-4 py-3 font-bold text-gray-700 text-sm outline-none focus:border-[#F96E8F] transition-colors"
                />
                <button
                  className="px-6 border border-gray-200 border-l-0 rounded-r-[10px] text-gray-500 font-['Nunito'] font-bold text-sm hover:text-[#F96E8F] transition-colors cursor-pointer bg-white"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Or Divider */}
            <div className="flex items-center my-6 max-w-lg mx-auto">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 font-black text-gray-800 text-base">Or</span>
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
                  <span className="font-bold text-gray-700 text-xs font-['Nunito']">{app.name}</span>
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
                className={`w-[280px] text-white font-[Nunito] font-bold py-3.5 rounded-[18px] text-lg shadow-md transition-colors ${
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
    </div>
  );
}
