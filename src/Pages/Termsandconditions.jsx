import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Termsandconditions({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        TERMS & <span className="text-[#F96E8F]">CONDITIONS</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Read our terms of service and usage policies carefully.
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-sm leading-relaxed space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-3 font-['Baloo_2']">
                                PEE KAA BOO – TERMS & CONDITIONS
                            </h2>
                        </div>

                        {/* Section 1 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                1. Introduction
                            </h3>
                            <p className="mb-3">
                                Welcome to Pee-kaa-boo. These Terms and Conditions govern your use of our website, services, and purchase of products from Pee-kaa-boo. By accessing or purchasing from our platform, you agree to be legally bound by these terms.
                            </p>
                            <p className="mb-3">
                                If you do not agree with any part of these terms, please refrain from using our services.
                            </p>
                            <p>
                                Pee-kaa-boo reserves the right to modify these Terms & Conditions at any time without prior notice. Continued use of the platform constitutes acceptance of updated terms.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                2. Eligibility
                            </h3>
                            <p className="mb-3">By using this website you confirm that:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>You are at least 18 years of age.</li>
                                <li>You are legally capable of entering binding contracts.</li>
                                <li>All information provided by you is accurate and complete.</li>
                            </ul>
                            <p className="mt-3">
                                Pee-kaa-boo reserves the right to cancel accounts or refuse service if false information is detected.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                3. Product Information
                            </h3>
                            <p className="mb-3">
                                Pee-kaa-boo specializes in 92.5 sterling silver jewelry with premium finishes such as anti-tarnish, oxidised, or gold plating.
                            </p>
                            <p>
                                While we strive for accuracy: product images may vary slightly due to lighting, screen resolution, or photography. Slight variations in color, stone placement, and finishing may occur as many pieces involve handcrafted elements. These variations do not qualify as defects.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                4. Pricing Policy
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>All prices listed are in Indian Rupees (INR) unless otherwise stated.</li>
                                <li>Prices may change without prior notice.</li>
                                <li>In the event of a technical pricing error, Pee-kaa-boo reserves the right to cancel the order and refund the payment.</li>
                                <li>Taxes and shipping charges may be applied at checkout where applicable.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                5. Order Acceptance & Cancellation
                            </h3>
                            <p className="mb-3">Pee-kaa-boo reserves the right to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Cancel orders due to pricing errors, stock unavailability, payment issues, or suspected fraudulent activity.</li>
                                <li>Limit quantities purchased per customer.</li>
                                <li>Orders once placed cannot be modified after dispatch.</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                6. Payment
                            </h3>
                            <p className="mb-3">We accept secure payments through authorized payment gateways. By completing a purchase you confirm:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>You are authorized to use the payment method.</li>
                                <li>All payment details are correct.</li>
                            </ul>
                            <p className="mt-3">
                                Pee-kaa-boo is not responsible for payment gateway failures, delays, or bank authorization issues.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                7. Shipping & Delivery
                            </h3>
                            <p className="mb-3">Pee-kaa-boo ships across India and selected international locations.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Delivery timelines are estimated and not guaranteed.</li>
                                <li>Delays due to logistics partners, weather, customs, or unforeseen circumstances are outside Pee-kaa-boo's control.</li>
                                <li>Risk of loss transfers to the customer once the order is handed over to the courier partner.</li>
                                <li>Customers must ensure accurate shipping details during checkout.</li>
                            </ul>
                        </div>

                        {/* Section 8 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                8. Returns & Exchanges
                            </h3>
                            <p className="mb-3">
                                To maintain hygiene and quality standards: returns or exchanges are accepted only in case of manufacturing defects or damaged items upon delivery. Requests must be raised within 48 hours of delivery with unboxing proof where applicable. Products must be unused, unworn, and in original packaging.
                            </p>
                            <p className="mb-2 font-bold text-gray-850">Items not eligible for return:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Customized jewellery</li>
                                <li>Clearance or sale items</li>
                                <li>Items damaged due to misuse</li>
                            </ul>
                            <p className="mt-3">
                                Pee-kaa-boo reserves the final right to determine product eligibility for return or exchange.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                9. Warranty
                            </h3>
                            <p>
                                Pee-kaa-boo jewelry is crafted from 92.5 sterling silver, however: natural wear and tear, tarnishing due to exposure to chemicals, perfumes, sweat, or moisture, and improper storage are not considered manufacturing defects. Care instructions must be followed to maintain product longevity.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                10. Intellectual Property
                            </h3>
                            <p>
                                All content on this website including product designs, logos, brand name, images, descriptions, and website content are the exclusive intellectual property of Pee-kaa-boo. Unauthorized copying, reproduction, resale, or distribution is strictly prohibited and may result in legal action.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                11. Limitation of Liability
                            </h3>
                            <p>
                                Pee-kaa-boo shall not be liable for indirect, incidental, or consequential damages; loss of profits, revenue, or business; delays caused by logistics providers or external services. Total liability shall not exceed the amount paid for the product purchased.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                12. Fraud Prevention
                            </h3>
                            <p>
                                Pee-kaa-boo actively monitors transactions for fraudulent activity. We reserve the right to cancel suspicious orders, request identity verification, and suspend accounts involved in fraudulent behavior. Legal action may be pursued where necessary.
                            </p>
                        </div>

                        {/* Section 13 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                13. Privacy
                            </h3>
                            <p>
                                Customer data is handled in accordance with our Privacy Policy. Personal information is used solely for order processing, customer support, and communication regarding purchases. Pee-kaa-boo does not sell customer data to third parties.
                            </p>
                        </div>

                        {/* Section 14 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                14. Force Majeure
                            </h3>
                            <p>
                                Pee-kaa-boo shall not be held responsible for failure or delay in fulfilling obligations due to events beyond reasonable control including natural disasters, war, government restrictions, pandemics, or logistics disruptions.
                            </p>
                        </div>

                        {/* Section 15 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                15. Governing Law
                            </h3>
                            <p>
                                These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
