import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dgrp({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200 font-['Baloo_2']">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        DOUBLE GOLD RATE <span className="text-[#F96E8F]">PROTECTION (DGRP)</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Protect your gold purchase from price fluctuations. Always pay the lowest rate!
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-sm leading-relaxed space-y-8">
                        <div>
                            <p className="text-base font-bold text-gray-900 mb-4 text-center">
                                At Pee-kaa-boo, we believe that buying gold should be a joyous occasion, not a stressful gamble on market prices. With our Double Gold Rate Protection (DGRP) plan, you can book your favourite jewellery today and stay protected from tomorrow's price hikes.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                What is Double Gold Rate Protection?
                            </h3>
                            <p className="mb-3">
                                DGRP is a special booking scheme that lets you lock in today's gold rate by paying a small advance. When you are ready to make your final purchase, we compare your booked rate with the gold rate on the day of purchase. You will always pay whichever rate is lower.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 font-semibold">
                                <li><span className="font-black text-gray-800">If the Gold Rate Increases:</span> You are completely protected. You only pay the lower rate that you booked at.</li>
                                <li><span className="font-black text-gray-800">If the Gold Rate Decreases:</span> You get the benefit of the drop! You pay the new, lower rate on your purchase day.</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                How It Works
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="font-black text-gray-805">Step 1: Book Your Rate</p>
                                    <p className="font-semibold text-gray-600">Select your desired gold jewellery and lock in today's gold rate by paying an advance of just 10% of the total value.</p>
                                </div>

                                <div>
                                    <p className="font-black text-gray-805">Step 2: Stay Protected</p>
                                    <p className="font-semibold text-gray-600">Relax as market prices fluctuate. Your booked rate is valid for up to 180 days from the date of booking.</p>
                                </div>

                                <div>
                                    <p className="font-black text-gray-805">Step 3: Buy at the Lowest Price</p>
                                    <p className="font-semibold text-gray-600">Visit our store or complete your purchase online. If today's rate is higher, you pay your booked rate. If today's rate is lower, you pay the new lower rate. It’s a win-win!</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                Key Benefits
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 font-semibold text-gray-600">
                                <li><span className="font-black text-gray-800">Zero Risk:</span> 100% protection against rising gold prices.</li>
                                <li><span className="font-black text-gray-800">Guaranteed Savings:</span> Benefit immediately if the gold price falls.</li>
                                <li><span className="font-black text-gray-800">Flexible Planning:</span> Perfect for upcoming weddings, anniversaries, and festive purchases.</li>
                                <li><span className="font-black text-gray-800">Easy Booking:</span> Secure your rate from the comfort of your home through our web app.</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                Terms and Conditions
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 font-semibold text-gray-600">
                                <li>The DGRP scheme is valid for a maximum of 180 days from the date of the advance payment.</li>
                                <li>A minimum advance payment of 10% of the estimated jewellery value is required to lock in the gold rate.</li>
                                <li>If the purchase is not completed within the validity period, the booking rate will expire, and the prevailing gold rate on the day of purchase will apply.</li>
                                <li>The advance amount cannot be refunded as cash but can be redeemed against any jewellery purchase at Pee-kaa-boo.</li>
                                <li>This scheme applies only to gold jewellery and does not cover making charges, stones, or taxes.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
