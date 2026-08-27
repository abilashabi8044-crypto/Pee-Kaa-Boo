import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart as addToCartAction, updateQuantity as updateQuantityAction, selectCartItems, clearCart } from './redux/cartSlice';
import { toggleWishlist as toggleWishlistAction, selectWishlistItems } from './redux/wishlistSlice';
import { addOrders as addOrdersAction, selectOrders } from './redux/ordersSlice';
import Header from './Pages/Header';
import Login from './Pages/login';
import Footer from './Pages/Footer';
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
  const isReturnPolicyPage = currentPath.includes('/return-policy') || currentPath.includes('/returnpolicy');
  const isAboutUsPage = currentPath.includes('/about-us') || currentPath.includes('/aboutus');
  const isPrivacyPolicyPage = currentPath.includes('/privacy-policy') || currentPath.includes('/privacypolicy');
  const isTermsAndConditionsPage = currentPath.includes('/terms-and-conditions') || currentPath.includes('/termsandconditions');
  const isFaqPage = currentPath.includes('/faq') || currentPath.includes('/faqs');
  const isCertifiedJewelleryPage = currentPath.includes('/certified-jewellery') || currentPath.includes('/certifiedjewllery');
  const isDgrpPage = currentPath.includes('/dgrp');
  const isOffersPage = currentPath.includes('/offers');

  return (
    <section>
      {isLoginPage ? (
        <Login />
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
          />
        </>
      )}
    </section>
  )
}

export default App;
