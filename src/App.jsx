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

function App() {
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Intercept pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const isProductPage = currentPath.includes('/product');
  const isCartPage = currentPath.includes('/cart');
  const isCheckoutPage = currentPath.includes('/checkout');
  const isOrderDetailsPage = currentPath.includes('/order-details') || currentPath.includes('/orderdetails');
  const isAccountPage = currentPath.includes('/account');
  const isLoginPage = currentPath.includes('/login');

  return (
    <section>
      {isLoginPage ? (
        <Login />
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
        <Checkout cartItems={cartItems} updateQuantity={updateQuantity} placeOrder={placeOrder} />
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
