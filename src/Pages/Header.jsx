import logo from '../assets/Header/peekaaboo.png';
import profile from '../assets/Header/profile.png';
import heart from '../assets/Header/heart.png';
import cart from '../assets/Header/cart.png';
import search from '../assets/Header/search.png';
import searchbarBg from '../assets/Header/searchbar.png';
import searchbar1Bg from '../assets/Header/searchbar1.png';
import headerBg from '../assets/cart/header-bg.png';

const navData = ["Boys", "Girls", "Just Born"];
const actionIcons = [
    { name: 'profile', icon: profile },
    { name: 'heart', icon: heart },
    { name: 'cart', icon: cart },
];

export default function Header({ cartItems = [] }) {
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return (

        <header className="w-full font-['Baloo_2'] relative overflow-hidden" >
            {/* Top Bar */}
            <div className="w-full bg-[#FFCD4E] text-gray-800 text-[13px] py-2 px-4 md:px-10 flex flex-col sm:flex-row justify-between items-center font-bold relative z-30">
                <div className="ml-24 mb-2 sm:mb-0">Free Returns and Free Shipping</div>
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.846-6.846l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <span>+00 123 456 789</span>
                    </div>
                    <div className="w-[1.5px] h-4 bg-gray-600/30"></div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span>demo@example.com</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation Row */}
            <div className="w-full px-4 md:px-10 py-5 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 max-w-[1920px] mx-auto relative z-30 bg-transparent">
                {/* Logo */}
                <div className="flex-shrink-0 cursor-pointer flex items-center">
                    {/* <img src={logo0} alt="cloud" className="w-[350px]  absolute top-0 left-0" /> */}
                    <img src={logo} alt="PEE KAA BOO" className="w-[80px] ml-24 object-contain" />
                </div>

                {/* Right Side: Nav + Actions */}
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
                    {/* Navigation Links */}
                    <nav className=" flex items-center gap-8 text-gray-800 font-extrabold text-[16px] tracking-wide">
                        {navData.map((item, index) => (
                            <a
                                key={index}
                                href={`/${item.toLowerCase().replace(' ', '-')}`}
                                className="hover:text-[#F96E8F] transition-colors uppercase"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        {/* Search Bar */}
                        <div
                            className="flex items-center w-[280px] h-[42px] transition-colors bg-no-repeat bg-center bg-transparent"
                            style={{ backgroundImage: `url(${searchbarBg})`, backgroundSize: '100% 100%' }}
                        >
                            <input
                                type="text"
                                placeholder="Search Everything"
                                className="flex-1 pl-6 pr-3 h-full outline-none text-[13px] text-gray-500 font-extrabold bg-transparent border-none"
                            />
                            <button
                                className="w-[65px] h-full flex items-center justify-center transition-colors cursor-pointer bg-transparent bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${searchbar1Bg})`, backgroundSize: '100% 100%' }}
                            >
                                <img src={search} alt="search" className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-6 ml-2">
                            {actionIcons.map((action, index) => (
                                <button key={index} onClick={(e) => {
                                    if (action.name === 'cart') {
                                        e.preventDefault();
                                        window.history.pushState({}, '', '/cart');
                                        window.dispatchEvent(new Event('popstate'));
                                    } else if (action.name === 'profile') {
                                        e.preventDefault();
                                        window.history.pushState({}, '', '/login');
                                        window.dispatchEvent(new Event('popstate'));
                                    } else if (action.name === 'heart') {
                                        e.preventDefault();
                                        window.history.pushState({}, '', '/account?tab=wishlist');
                                        window.dispatchEvent(new Event('popstate'));
                                    }
                                }} className="relative text-gray-800 hover:text-[#F96E8F] transition-colors cursor-pointer">
                                    <img src={action.icon} alt={action.name} className="w-6 h-6" />
                                    {action.name === 'cart' && cartCount > 0 && (
                                        <div className="absolute -top-2 -right-2 bg-[#F96E8F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                            {cartCount}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Content Section */}
            {/* <div className="w-full pt-10 pb-36 relative flex justify-center items-center z-20">
                <div className="text-center">
                    <h1 className="text-[40px] md:text-[50px] font-black text-gray-900 leading-tight tracking-wide">
                        Boys <span className="text-[#F96E8F]">Collections</span>
                    </h1>
                    <p className="text-[14px] text-gray-800 font-extrabold mt-1 tracking-wide">
                        Home &gt; shop &gt; <span className="text-[#F96E8F]">Boys Collections</span>
                    </p>
                </div> */}

            {/* Left Decoration (Car) */}
            {/* <img src={baby1} alt="Car" className="hidden lg:block absolute bottom-[50px] left-[10%] w-[120px] object-contain pointer-events-none" /> */}

            {/* Right Decoration (Bunny) */}
            {/* <img src={headerBunny} alt="Bunny" className="hidden lg:block absolute bottom-[-10px] right-[5%] w-[140px] object-contain pointer-events-none z-30" /> */}
            {/* </div> */}

        </header>
    );
}
