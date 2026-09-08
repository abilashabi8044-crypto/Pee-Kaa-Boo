import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart as addToCartAction, updateQuantity as updateQuantityAction, selectCartItems, clearCart } from './redux/cartSlice';
import { toggleWishlist as toggleWishlistAction, selectWishlistItems } from './redux/wishlistSlice';
import { addOrders as addOrdersAction, selectOrders } from './redux/ordersSlice';
import Header from './components/Header';
import Login from './Pages/login';
import Forgotpassword from './Pages/Forgotpassword';
import Footer from './components/Footer';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Account from './Pages/Account';
import Orderdetails from './Pages/Orderdetails';
import Returnpolicy from './Pages/Returnpolicy';
import Aboutus from './Pages/Aboutus';
import Privacypolicy from './Pages/Privacypolicy';
import Termsandconditions from './Pages/Termsandconditions';
import Faq from './Pages/Faq';
import Certifiedjewllery from './Pages/Certifiedjewllery';
import Dgrp from './Pages/Dgrp';
import Offers from './Pages/Offers';
import Homepage from './Pages/Homepage';

function App() {
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try {
      const saved = localStorage.getItem('pkb_selected_product');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const cartItems = useSelector(selectCartItems);
  const wishlist = useSelector(selectWishlistItems);
  const orders = useSelector(selectOrders);
  const [cartToast, setCartToast] = useState(null);

  useEffect(() => {
    if (cartToast) {
      const timer = setTimeout(() => {
        setCartToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [cartToast]);

  const addToWishlist = (product) => {
    dispatch(toggleWishlistAction(product));
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    dispatch(addOrdersAction(cartItems));
    dispatch(clearCart());
  };

  const addToCart = (product, quantity = 1, size = '24', color = 'Gold') => {
    dispatch(addToCartAction({ product, quantity, size, color }));

    const existingItem = cartItems.find(item =>
      (item.id && product.id ? item.id === product.id : item.title === product.title) &&
      item.size === size &&
      item.color === color
    );
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQtyInCart + quantity;

    setCartToast({
      product,
      quantity: newQuantity,
      size,
      color,
      id: Date.now()
    });
  };

  const updateQuantity = (itemToUpdate, delta) => {
    dispatch(updateQuantityAction({ itemToUpdate, delta }));
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProductSelectEvent = (e) => {
      if (e.detail) {
        setSelectedProduct(e.detail);
        try {
          localStorage.setItem('pkb_selected_product', JSON.stringify(e.detail));
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pkb_select_product', handleProductSelectEvent);

    // Intercept pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pkb_select_product', handleProductSelectEvent);
      window.history.pushState = originalPushState;
    };
  }, []);

  const isProductPage = currentPath.includes('/product');
  const isCartPage = currentPath.includes('/cart');
  const isCheckoutPage = currentPath.includes('/checkout');
  const isOrderDetailsPage = currentPath.includes('/order-details') || currentPath.includes('/orderdetails');
  const isAccountPage = currentPath.includes('/account');
  const isLoginPage = currentPath.includes('/login');
  const isForgotPasswordPage = currentPath.includes('/forgotpassword') || currentPath.includes('/forgot-password');
  const isReturnPolicyPage = currentPath.includes('/return-policy') || currentPath.includes('/returnpolicy');
  const isAboutUsPage = currentPath.includes('/about-us') || currentPath.includes('/aboutus');
  const isPrivacyPolicyPage = currentPath.includes('/privacy-policy') || currentPath.includes('/privacypolicy');
  const isTermsAndConditionsPage = currentPath.includes('/terms-and-conditions') || currentPath.includes('/termsandconditions');
  const isFaqPage = currentPath.includes('/faq') || currentPath.includes('/faqs');
  const isCertifiedJewelleryPage = currentPath.includes('/certified-jewellery') || currentPath.includes('/certifiedjewllery');
  const isDgrpPage = currentPath.includes('/dgrp');
  const isOffersPage = currentPath.includes('/offers');
  const isShopPage = currentPath.includes('/shop');
  const isHomePage = currentPath === '/' || currentPath === '';

  return (
    <section>
      {isLoginPage ? (
        <Login />
      ) : isForgotPasswordPage ? (
        <Forgotpassword />
      ) : isReturnPolicyPage ? (
        <Returnpolicy cartItems={cartItems} />
      ) : isAboutUsPage ? (
        <Aboutus cartItems={cartItems} />
      ) : isPrivacyPolicyPage ? (
        <Privacypolicy cartItems={cartItems} />
      ) : isTermsAndConditionsPage ? (
        <Termsandconditions cartItems={cartItems} />
      ) : isFaqPage ? (
        <Faq cartItems={cartItems} />
      ) : isCertifiedJewelleryPage ? (
        <Certifiedjewllery cartItems={cartItems} />
      ) : isDgrpPage ? (
        <Dgrp cartItems={cartItems} />
      ) : isOffersPage ? (
        <Offers cartItems={cartItems} />
      ) : isOrderDetailsPage ? (
        <Orderdetails cartItems={cartItems} wishlist={wishlist} />
      ) : isAccountPage ? (
        <Account
          cartItems={cartItems}
          addToCart={addToCart}
          orders={orders}
          wishlist={wishlist}
          addToWishlist={addToWishlist}
        />
      ) : isCheckoutPage ? (
        <Checkout cartItems={cartItems} updateQuantity={updateQuantity} addToCart={addToCart} placeOrder={placeOrder} />
      ) : isCartPage ? (
        <Cart cartItems={cartItems} updateQuantity={updateQuantity} addToCart={addToCart} />
      ) : isProductPage ? (
        <Product product={selectedProduct} addToCart={addToCart} cartItems={cartItems} wishlist={wishlist} onAddToWishlist={addToWishlist} />
      ) : isHomePage ? (
        <Homepage cartItems={cartItems} wishlistCount={wishlist.length} />
      ) : (
        <>
          <Header cartItems={cartItems} wishlistCount={wishlist.length} />
          <Shop
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              try {
                localStorage.setItem('pkb_selected_product', JSON.stringify(prod));
              } catch (err) {}
              window.history.pushState({}, '', '/product');
              setCurrentPath('/product');
            }}
            addToCart={addToCart}
            wishlist={wishlist}
            onAddToWishlist={addToWishlist}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
          />
        </>
      )}

      {cartToast && (
        <CartToast toast={cartToast} onClose={() => setCartToast(null)} />
      )}
    </section>
  )
}

function CartToast({ toast, onClose }) {
  const { product, quantity, size, color } = toast;
  const image = product.image || (product.images && product.images[0]) || '';
  
  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[calc(100%-3rem)] sm:w-[360px] animate-toast-up bg-white rounded-[20px] shadow-[0_12px_40px_rgba(249,110,143,0.18)] border border-[#F96E8F]/20 p-4 font-['Nunito'] flex flex-col gap-3">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="text-[#F96E8F] text-[13px] font-black uppercase tracking-wider font-['Baloo_2']">Added to Cart!</span>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-50 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content Row */}
      <div className="flex gap-3 items-center">
        {image && (
          <img 
            src={image} 
            alt={product.title} 
            className="w-14 h-14 object-cover rounded-xl border border-gray-100 shadow-xs flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 font-bold text-sm leading-snug truncate font-['Nunito']">{product.title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Size: <span className="font-semibold text-gray-700">{size}</span> | Color: <span className="font-semibold text-gray-700">{color}</span>
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] font-bold text-gray-400">Total in Cart</span>
            <span className="bg-[#F96E8F]/10 text-[#F96E8F] text-xs font-black px-2.5 py-0.5 rounded-full">
              {quantity} {quantity > 1 ? 'items' : 'item'}
            </span>
          </div>
        </div>
      </div>

      {/* Button Row */}
      <button
        onClick={() => {
          onClose();
          window.history.pushState({}, '', '/cart');
        }}
        className="w-full bg-[#F96E8F] hover:bg-[#E44971] text-white font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 uppercase tracking-wider active:scale-95 cursor-pointer mt-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        View Cart & Checkout
      </button>
    </div>
  );
}

export default App;
