import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Offers({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const navigateTo = (path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16 w-full font-['Baloo_2']">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        EXCLUSIVE OFFERS & <span className="text-[#F96E8F]">SPARKLING DEALS</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Discover timeless elegance at unbeatable prices. Treat yourself or a loved one to our handcrafted collections with these exclusive, limited-time offers.
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-sm leading-relaxed space-y-8">
                        
                        {/* Section 1: Highlight Deals */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-4 font-['Baloo_2'] flex items-center gap-2">
                                <span>🌟</span> Current Highlight Deals
                            </h3>
                            <div className="space-y-4 font-['Nunito']">
                                <div className="bg-[#FFF0F4] p-5 rounded-2xl border border-pink-100">
                                    <p className="font-bold text-gray-800 text-base mb-1">The Festive Radiance Sale</p>
                                    <p className="text-gray-600">Get up to 30% OFF on all diamond and platinum collections. Use code <span className="font-black text-[#F96E8F]">SPARKLE30</span> at checkout.</p>
                                </div>

                                <div className="bg-[#FFF0F4] p-5 rounded-2xl border border-pink-100">
                                    <p className="font-bold text-gray-800 text-base mb-1">Zero Making Charges</p>
                                    <p className="text-gray-600">Enjoy 0% making charges on all 22K Gold chains and bangles this weekend only.</p>
                                </div>

                                <div className="bg-[#FFF0F4] p-5 rounded-2xl border border-pink-100">
                                    <p className="font-bold text-gray-800 text-base mb-1">Bridal Trousseau Special</p>
                                    <p className="text-gray-600">Flat 15% OFF on bridal sets on purchases over ₹15,000.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Welcome Offer */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2'] flex items-center gap-2">
                                <span>🎁</span> Welcome to the Family
                            </h3>
                            <p className="font-bold text-gray-805 text-base mb-1">Your First Purchase, Rewarded.</p>
                            <p className="mb-4">Sign up for our newsletter today and receive a flat 10% OFF your first order, plus early access to our upcoming collections.</p>
                            <button className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold px-6 py-3 rounded-full text-sm shadow-sm transition-all tracking-wide cursor-pointer font-['Nunito']">
                                Sign Up & Claim Discount
                            </button>
                        </div>

                        {/* Section 3: Category Specials */}
                        <div className="border-t border-dashed border-gray-200 pt-6 font-['Nunito']">
                            <h3 className="text-lg font-black text-gray-900 mb-4 font-['Baloo_2'] flex items-center gap-2">
                                <span>💍</span> Category Specials
                            </h3>
                            <ul className="space-y-3 pl-5 list-disc font-semibold text-gray-600">
                                <li><span className="font-bold text-gray-850">Engagement Rings:</span> Free personalized engraving on all rings.</li>
                                <li><span className="font-bold text-gray-850">Everyday Silver:</span> Buy 2, Get 1 Free on all sterling silver charms and minimalist pendants.</li>
                                <li><span className="font-bold text-gray-855">Gold Coins:</span> Flat 5% off on 24K gold coins and bars—perfect for gifting and investments.</li>
                            </ul>
                        </div>

                        {/* Section 4: Loyalty Program */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2'] flex items-center gap-2">
                                <span>✨</span> Sparkle Rewards Loyalty Program
                            </h3>
                            <p className="mb-3 font-semibold text-gray-600">Earn while you shine. Join our exclusive rewards program today:</p>
                            <ul className="space-y-2 pl-5 list-disc mb-5 font-semibold text-gray-600">
                                <li>Earn 1 point for every ₹100 spent.</li>
                                <li>Redeem 500 points for a ₹500 gift voucher.</li>
                                <li>Enjoy a special surprise gift on your birthday month!</li>
                            </ul>
                            <button className="bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold px-6 py-3 rounded-full text-sm shadow-sm transition-all tracking-wide cursor-pointer font-['Nunito']">
                                Join Sparkle Rewards
                            </button>
                        </div>

                        {/* Section 5: Terms & Conditions */}
                        <div className="border-t border-dashed border-gray-200 pt-6 font-['Nunito']">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                Terms & Conditions
                            </h3>
                            <p className="mb-3">To ensure a smooth shopping experience, please note:</p>
                            <ul className="space-y-2 pl-5 list-disc font-semibold text-gray-600">
                                <li>Offers cannot be combined with any other ongoing promotions or promo codes unless explicitly stated.</li>
                                <li>Discount codes must be applied at checkout and cannot be claimed retroactively.</li>
                                <li>Zero making charges apply only to select gold categories.</li>
                                <li>
                                    For full details on returns and exchanges for sale items, please view our{' '}
                                    <button 
                                        onClick={() => navigateTo('/return-policy')} 
                                        className="text-[#F96E8F] font-black underline hover:text-[#E44971] cursor-pointer bg-transparent border-none p-0 outline-none inline font-['Nunito']"
                                    >
                                        Return Policy
                                    </button>{' '}
                                    page.
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
