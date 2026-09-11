import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Certifiedjewllery({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        CERTIFIED <span className="text-[#F96E8F]">JEWELLERY</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Learn about our certification and authenticity standards.
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-sm leading-relaxed space-y-6">
                        <p className="text-base font-bold text-gray-900 mb-4 text-center">
                            At Pee-kaa-boo, we ensure that every jewellery piece we offer is a testament to purity, authenticity, and premium craftsmanship.
                        </p>

                        <p>
                            All our jewelry pieces come with proper certification and authentication. We work with trusted laboratories to ensure every piece meets international quality standards and purity requirements.
                        </p>

                        <p>
                            Our sterling silver collections are made using 92.5% pure silver (Sterling Silver), marked with the hallmark certification to guarantee its composition. Every gemstone, pearl, and element used is ethically sourced and rigorously authenticated.
                        </p>

                        <p className="font-extrabold text-base text-gray-900 border-l-4 border-[#F96E8F] pl-4 my-6">
                            Purity You Can Trust
                        </p>

                        <p>
                            When you purchase from Pee-kaa-boo, you receive an official authenticity card specifying the design details, metal purity, and certification standard. We stand behind our quality promises to offer you peace of mind with every purchase.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
