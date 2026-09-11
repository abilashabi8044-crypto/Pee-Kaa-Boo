import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Aboutus({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[1000px] mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        ABOUT <span className="text-[#F96E8F]">US</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Learn more about Pee-kaa-boo and our commitment to quality.
                    </p>

                    <div className="text-gray-700 font-['Nunito'] text-sm leading-relaxed space-y-6">
                        <p className="text-base font-bold text-gray-900 mb-4 text-center">
                            Pee-kaa-boo was born from a rare union — of experience and ambition, tradition and modernity, heart and hustle.
                        </p>

                        <p>
                            Two women from distinctly different walks of life came together to create something timeless. Both carried over 15 years of experience in the industry — but brought with them entirely different perspectives. One, a millennial with a sharp eye for design and a pulse on modern aesthetics, deeply rooted in emerging trends and innovation. The other, a graceful mother of two, whose journey through life and work shaped her understanding of craftsmanship, purity, and the quiet strength of legacy.
                        </p>

                        <p>
                            They both have spent years working closely with artisans, learning the intricacies of silver, stones, and soul — and believed jewellery should tell a story, not just follow a style. Her warmth, intuition, and lived experience added a richness that balanced the fresh, bold edge of her younger co-founder. Together, they were the perfect blend of modern creativity and timeless wisdom.
                        </p>

                        <p>
                            Though their worlds were different, their vision was one: to reimagine silver jewellery for everyone — regardless of age, gender, or style.
                        </p>

                        <p>
                            Over the years, they saw a market flooded with sameness — pieces that were either too harsh on the skin, quickly tarnished, or simply lacked soul. They knew something was missing. Silver jewellery should be more than just adornment — it should be an experience, one that feels good on the skin, lasts through time, and reflects who you truly are.
                        </p>

                        <p className="font-extrabold text-base text-gray-900 border-l-4 border-[#F96E8F] pl-4 my-6">
                            And so, Pee-kaa-boo was born.
                        </p>

                        <p>
                            A brand rooted in authenticity and excellence, built to offer silver jewellery that is not only anti-tarnish and skin-friendly, but also beautifully designed for every identity. From bold minimalism to timeless elegance, Pee-kaa-boo celebrates silver jewellery as a statement of self — not status.
                        </p>

                        <p>
                            With a deep commitment to quality and a dream they refused to let go of, these two women set out to elevate silver jewellery into something unforgettable. Pee-kaa-boo isn’t just a brand — it’s a promise. Of purity. Of purpose. Of pieces that carry your story.
                        </p>

                        <p className="text-base font-bold text-[#F96E8F] text-center mt-8">
                            Because at Pee-kaa-boo,jewellery is luxury beyond metal — it's magic, refined.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
