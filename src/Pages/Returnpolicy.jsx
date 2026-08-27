import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Returnpolicy({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200">
                    <h1 className="text-[32px] md:text-[42px] font-black text-gray-900 mb-2 leading-none text-center">
                        RETURN <span className="text-[#F96E8F]">POLICY</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-[14px] text-center mb-10 tracking-wide font-['Nunito']">
                        Learn how we protect your personal information and handle product returns.
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-[15px] leading-relaxed space-y-8">
                        <div>
                            <h2 className="text-[20px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                Returns, Refunds & Exchange Policy
                            </h2>
                            <p>
                                At <span className="font-extrabold text-[#F96E8F]">Pee-kaa-boo</span>, we aim to provide a seamless and trustworthy shopping experience. Please read the following policy carefully to understand our return, refund, and exchange process.
                            </p>
                        </div>

                        {/* Sections */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                1. Return Policy
                            </h3>
                            <p className="mb-3">
                                We offer a 15-day return window from the date of delivery for all unused and unworn Pee-kaa-boo products — no questions asked.
                            </p>
                            <p className="mb-3 font-bold text-gray-800">
                                The 15-day return policy does not apply to the following items, except in cases of manufacturing defects or spurious products:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Personalized jewellery</li>
                                <li>Silver coins</li>
                                <li>Utensils</li>
                                <li>Divine idols</li>
                                <li>Made-to-order items</li>
                                <li>Products bought on sale days are not returnable</li>
                            </ul>
                            <p className="mt-3">
                                Returns are accepted only after the product reaches our warehouse and successfully passes our quality inspection.
                            </p>
                            <p className="mt-2">
                                Shipping charges paid at the time of placing the order are non-refundable in case of returns.
                            </p>
                            <p className="mt-2">
                                Products purchased from third-party platforms (marketplaces or resellers) will be governed by the return and refund policy of the respective platform.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                2. Important Unboxing Requirement
                            </h3>
                            <p className="mb-3">
                                To ensure transparency and avoid disputes:
                            </p>
                            <p className="mb-3 font-bold text-gray-800">
                                Customers are strongly advised to record a clear, continuous unboxing video from the moment the package is opened.
                            </p>
                            <p className="mb-2">
                                The video should clearly show:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>The sealed package</li>
                                <li>The opening process</li>
                                <li>The product received</li>
                            </ul>
                            <p className="mt-3">
                                Claims raised without an unboxing video may not be eligible for return, replacement, or refund in case of missing items, damaged products, or incorrect product delivery.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                3. Product Condition Guidelines
                            </h3>
                            <p className="mb-3">
                                To qualify for a return or exchange, the product must be:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Unused and unworn</li>
                                <li>In original condition</li>
                                <li>With original packaging, tags, invoice, and certificates (if applicable)</li>
                            </ul>
                            <p className="mt-3">
                                Products that show signs of usage, wear, damage, alteration, or tampering may not be approved for return or refund after inspection.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                4. Missing or Incomplete Returns
                            </h3>
                            <p>
                                If multiple products were ordered, all items must be returned together, including any complimentary products, free gifts, or promotional silver coins. If any item is missing from the return shipment, Pee-kaa-boo reserves the right to deduct the full MRP of the missing item from the refund amount.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                5. Refund Policy
                            </h3>
                            <p className="mb-3">
                                Refunds are initiated only after the returned item reaches our warehouse and passes quality checks.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><span className="font-bold text-gray-800">Prepaid orders:</span> Amount will be credited to the original bank account or payment source.</li>
                                <li><span className="font-bold text-gray-800">Cash on Delivery (COD) orders:</span> Refund will be issued as Pee-kaa-boo Wallet credit or coupon code.</li>
                            </ul>
                            <p className="mt-3">
                                Refund timelines may vary depending on banks or payment gateways. Pee-kaa-boo is not responsible for delays caused by third-party financial institutions.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                6. Replacement & Exchange
                            </h3>
                            <p className="mb-2">
                                Customers may opt for a replacement or exchange, subject to product eligibility.
                            </p>
                            <p className="mb-2">
                                Replacement dispatch will occur only after the originally purchased item is successfully picked up or delivered back to us.
                            </p>
                            <p>
                                For gold-plated or high-value items, additional verification may be required to ensure product authenticity and condition.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                7. Return Process
                            </h3>
                            <p className="mb-3">
                                Returns can be initiated directly through the Pee-kaa-boo website or mobile app. Our Customer Support team is also available to assist you throughout the process.
                            </p>
                            <p>
                                Once a return pickup is scheduled, customer availability and cooperation with our delivery partner is required. If pickup attempts fail due to unavailability, the pickup may be cancelled and will need to be rescheduled.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                8. Reverse Pickup Limitations
                            </h3>
                            <p>
                                In rare cases where a location is forward-serviceable but not reverse-serviceable, customers may be requested to ship the item back using an alternate courier service (such as India Post). In such cases, Pee-kaa-boo will reimburse shipping charges up to ₹70, upon submission of valid proof.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                9. Fair Usage & Fraud Prevention
                            </h3>
                            <p>
                                Pee-kaa-boo reserves the right to review and monitor return patterns. Repeated or excessive return requests may lead to restricted return eligibility. Any attempt to return used, altered, swapped, or incorrect products will be treated as a violation of our return policy.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-6">
                            <h3 className="text-[18px] font-black text-gray-900 mb-3 font-['Baloo_2']">
                                10. Policy Updates
                            </h3>
                            <p>
                                Pee-kaa-boo reserves the right to modify or update this policy at any time without prior notice. The policy applicable at the time of purchase shall be considered final.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
