import React, { useState, useEffect } from 'react';
import Header from './Pages/Header';
import Login from './Pages/login';
import Footer from './Pages/Footer';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Account from './Pages/Account';
import SmoothScroll from './Pages/Smoothscroll';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('userWishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => (item.id && product.id ? item.id === product.id : item.title === product.title));
      let next;
      if (exists) {
        next = prev.filter(item => !(item.id && product.id ? item.id === product.id : item.title === product.title));
      } else {
        next = [...prev, product];
      }
      try {
        localStorage.setItem('userWishlist', JSON.stringify(next));
        window.dispatchEvent(new Event('wishlistUpdated'));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    const newOrders = cartItems.map(item => ({
      ...item,
      id: Math.random().toString().substring(2, 11),
      status: 'active',
      date: new Date().toISOString()
    }));
    setOrders(prev => [...prev, ...newOrders]);
    setCartItems([]);
    window.history.pushState({}, '', '/account');
    setCurrentPath('/account');
  };

  const addToCart = (product, quantity = 1, size = '24', color = 'Gold') => {
    setCartItems(prev => {
      const existing = prev.find(item =>
        (item.id && product.id ? item.id === product.id : item.title === product.title) &&
        item.size === size &&
        item.color === color
      );
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, size, color }];
    });
  };

  const updateQuantity = (itemToUpdate, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        const isMatch = (item.id && itemToUpdate.id)
          ? item.id === itemToUpdate.id && item.size === itemToUpdate.size && item.color === itemToUpdate.color
          : item.title === itemToUpdate.title && item.size === itemToUpdate.size && item.color === itemToUpdate.color;
        if (isMatch) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
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
  const isAccountPage = currentPath.includes('/account');
  const isLoginPage = currentPath.includes('/login');

  return (
    <SmoothScroll>
      <section>
        {isLoginPage ? (
          <Login />
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
          <Product product={selectedProduct} addToCart={addToCart} cartItems={cartItems} />
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
    </SmoothScroll>
  )
}

export default App;
