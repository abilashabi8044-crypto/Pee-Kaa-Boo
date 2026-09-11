import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacypolicy({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        PRIVACY <span className="text-[#F96E8F]">POLICY</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Learn about our PRIVACY POLICY and how we protect your personal information.
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-sm leading-relaxed space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-3 font-['Baloo_2']">
                                Privacy Policy – PEE KAA BOO
                            </h2>
                            <p>
                                Pee-kaa-boo Lifestyles Pvt. Ltd. ("Pee-kaa-boo," "We," "Us") is committed to safeguarding your personal data and complying with applicable privacy and data protection laws across all regions where we operate.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                1. Information We Collect
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-gray-800">a. Directly Provided by You:</p>
                                    <p>When using our web/app or services, we may collect personal details such as your name, contact number, email, date of birth, anniversary, postal address, username, and password.</p>
                                </div>

                                <div>
                                    <p className="font-bold text-gray-800">b. Automatically Collected:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>IP address</li>
                                        <li>Device/browser type and OS</li>
                                        <li>Pages visited, links clicked, ads viewed</li>
                                        <li>Bandwidth and installed software</li>
                                        <li>Geo-location (used for personalized experiences)</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold text-gray-800">c. From Third-Party Sources:</p>
                                    <p>We may obtain information from public or permitted third-party sources (e.g., social networks), which may be combined with data you've already shared.</p>
                                </div>

                                <div>
                                    <p className="font-bold text-gray-800">Order Information:</p>
                                    <p>Includes name, billing/shipping address, email, phone number, and payment details (note: we do not store credit card data).</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                2. How We Use Your Information
                            </h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><span className="font-bold text-gray-800">Service Delivery:</span> To register your device, enable requested features, and personalize your app experience.</li>
                                <li><span className="font-bold text-gray-800">Marketing (with consent):</span> To send newsletters, product updates, or offers via SMS, email, or in-app communication.</li>
                                <li><span className="font-bold text-gray-800">Analytics & Improvement:</span> To analyze trends, enhance user experience, develop new features, and create anonymized insights.</li>
                                <li><span className="font-bold text-gray-800">User Content:</span> Public reviews or content shared through the app may be featured in promotional materials.</li>
                                <li>To detect fraud or security threats.</li>
                                <li>To analyze and improve website performance and user experience.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                3. Information Sharing
                            </h3>
                            <p className="mb-3">We may share your data with:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Trusted third-party partners (e.g., marketing, maintenance, analytics), strictly under confidentiality and data protection agreements.</li>
                                <li>Legal or safety purposes, if required to comply with law, respond to legal requests, or protect Pee-kaa-boo Lifestyles Pvt. Ltd rights or users.</li>
                            </ul>
                            <p className="mb-2 font-bold text-gray-800">We share your data with trusted partners like:</p>
                            <ul className="list-disc pl-5 space-y-1 mb-4">
                                <li>Shopify (store host)</li>
                                <li>Delhivery/Shiprocket (logistics)</li>
                                <li>Google Analytics (site analytics)</li>
                            </ul>
                            <p className="mb-2">We may also share data to comply with laws or protect our rights.</p>
                            <p><span className="font-bold text-gray-800">Data Retention:</span> We retain your order information unless you request its deletion.</p>
                        </div>

                        {/* Section 4 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                4. Your Rights & Choices
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><span className="font-bold text-gray-800">Opt-Out:</span> You may unsubscribe from promotional communications at any time.</li>
                                <li><span className="font-bold text-gray-800">Manage Preferences:</span> Adjust settings in your profile or within app features.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                5. Data Security
                            </h3>
                            <p>
                                We use appropriate physical and technical measures to protect your data. However, no system or online transmission is 100% secure.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                6. External Links
                            </h3>
                            <p>
                                PEE KAA BOO may contain links to third-party websites or apps. We are not responsible for their privacy practices. Always review their policies before sharing any personal information.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-lg font-black text-gray-900 mb-3 font-['Baloo_2']">
                                7. Policy Updates
                            </h3>
                            <p>
                                This Privacy Policy may be updated periodically. Continued use of our services constitutes acceptance of any changes. Please check this page regularly for the latest version.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
