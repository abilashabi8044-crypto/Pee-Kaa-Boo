import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Faq({ cartItems = [] }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "What materials are your jewellery made from?",
            a: "Our jewellery is made using premium 92.5 sterling silver as the base metal, finished with high-quality coatings such as Rhodium and Rose Gold for enhanced shine and longevity. Pieces from our Heritage Collection are crafted from 92.5 sterling silver and luxuriously coated with 18K gold, ensuring exceptional durability, lasting brilliance, and skin-friendly wear."
        },
        {
            q: "Is your silver jewellery tarnish-resistant?",
            a: "Yes! Our silver jewellery is specially treated to be anti-tarnish and designed to maintain its shine for a long time with proper care."
        },
        {
            q: "Are your pieces hypoallergenic?",
            a: "Absolutely. We use skin-friendly metals and coatings to minimize the risk of allergies, making our jewellery safe for sensitive skin."
        },
        {
            q: "How should I care for my silver/gold jewellery?",
            a: "To keep your jewellery looking its best, avoid contact with water, perfumes, and harsh chemicals. Store it in a dry place, preferably in the pouch or box provided."
        },
        {
            q: "Do you offer customization or engraving?",
            a: "Not yet, we will soon be offering personalized engraving and customization on select pieces. Please contact our customer service for details."
        },
        {
            q: "What is your return and exchange policy?",
            a: "We accept returns and exchanges within 15 days of delivery if the product is unused and in original packaging. Customized items may not be eligible — please refer to our policy."
        },
        {
            q: "How long does shipping take?",
            a: "Typically, orders are processed and shipped within 3-4 business days. Delivery times depend on your location and shipping method selected at checkout. Orders get shipped the next business working day if the order was placed on a non-business working day."
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept all major credit/debit cards, net banking, UPI."
        },
        {
            q: "How do I track my order?",
            a: "Once your order is shipped, you will receive a tracking number via email or SMS or Whatsapp to monitor its progress."
        },
        {
            q: "Are your products ethically sourced?",
            a: "Yes, we prioritize responsible sourcing and ethical practices throughout our supply chain."
        },
        {
            q: "Do you provide warranty or repair services?",
            a: "We offer warranty/repair on manufacturing defects for 6 months. For repairs outside warranty, please contact us for assistance."
        },
        {
            q: "How should I know the product bought from you is authentic and does it come with a warranty?",
            a: "As this is the official online store of Pee-kaa-boo's, we unconditionally guarantee that every item we sell is 100% authentic and that the materials used are true. Please note that we are unable to comment on the authenticity of any items not purchased from Pee-kaa-boo. And also we do provide a warranty for our jewellery for a period of 6 months from the date of purchase. We will cover all types of repairs and polish issues free of cost during that period. However, if the product is scratched, crushed or completely tampered, we will not be able to help you."
        },
        {
            q: "Can I gift jewellery from your store?",
            a: "Certainly! We offer gift wrapping to make your gift extra special."
        },
        {
            q: "What if my jewellery arrives damaged?",
            a: "Please contact our customer service immediately with photos. We will assist with a replacement or refund as per our policy."
        },
        {
            q: "What are Pee-kaa-boo's hours of operation?",
            a: "10:00 am to 5:00 pm (IST), Monday to Saturday (Not available on Indian Public Holidays)"
        },
        {
            q: "Do you offer any additional discounts?",
            a: "All our prices are honest and very competitive as compared to any other online stores being a D2C. Discounts are offered only on selected products during Sales and festive seasons. Do visit on our website to keep abreast of the latest discounts and offers."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-[#ffffff] font-['Baloo_2'] flex flex-col">
            <Header cartItems={cartItems} />

            <main className="flex-grow max-w-[900px] mx-auto px-6 py-12 md:py-16 w-full">
                <div className="bg-white rounded-[24px] p-6 md:p-12 shadow-sm border border-gray-200 font-['Baloo_2']">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-none text-center">
                        FREQUENTLY ASKED <span className="text-[#F96E8F]">QUESTIONS</span>
                    </h1>
                    <p className="text-gray-400 font-extrabold text-sm text-center mb-10 tracking-wide font-['Nunito']">
                        Find answers to common questions about our products and services.
                    </p>

                    <div className="space-y-4 font-['Nunito']">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div 
                                    key={index}
                                    className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-250 bg-gray-50/50 hover:bg-gray-50"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center text-left p-5 font-black text-base text-gray-800 transition-colors duration-200 outline-none"
                                    >
                                        <span>{faq.q}</span>
                                        <svg 
                                            className={`w-5 h-5 text-[#F96E8F] transition-transform duration-250 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor" 
                                            strokeWidth={3}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <div 
                                        className={`transition-all duration-300 overflow-hidden ${
                                            isOpen ? 'max-h-[500px] opacity-100 border-t border-gray-100/50' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="p-5 text-gray-650 text-sm leading-relaxed font-semibold bg-white">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
