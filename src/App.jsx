/*
  App 组件 - 整个应用的"总管"
  
  职责:
  1. 管理购物车数据（cart state）- 所有页面共享
  2. 提供添加/修改/删除购物车的函数
  3. 设置页面路由（哪个URL显示哪个页面）
  4. 所有页面共用 Header 和 Footer
  
  React知识点:
  - useState: 用来存储购物车数据
  - props: 把购物车数据和函数传给子组件
  - React Router: 用来实现页面切换
*/

import { useState } from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import products from "./data/products";

function App() {
  // ========== 购物车 State ==========
  // cart 是一个数组，每个元素是 { id, name, price, image, quantity }
  const [cart, setCart] = useState([]);

  // ========== 添加商品到购物车 ==========
  // 和JS版的 addToCart 逻辑完全一样
  const addToCart = (productId, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      // 检查购物车里是否已经有这个商品
      const existingItem = prevCart.find((item) => item.id === productId);

      if (existingItem) {
        // 已存在 → 增加数量
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 不存在 → 添加新商品
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
          },
        ];
      }
    });

    alert(`${product.name} added to cart!`);
  };

  // ========== 修改购物车商品数量 ==========
  const updateCartQuantity = (productId, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // 数量为0时自动删除
    });
  };

  // ========== 删除购物车商品 ==========
  const removeCartItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // ========== 计算购物车总数量（显示在Header上）==========
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <HashRouter>
      {/* Header 所有页面共用 */}
      <Header cartCount={cartCount} />

      {/* 路由：根据URL显示不同页面 */}
      <Routes>
        {/* 主页 */}
        <Route
          path="/"
          element={<HomePage onAddToCart={addToCart} />}
        />

        {/* 商品详情页 - :id 是动态参数 */}
        <Route
          path="/product/:id"
          element={<ProductDetailPage onAddToCart={addToCart} />}
        />

        {/* 购物车页 */}
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeCartItem}
              onAddToCart={addToCart}
            />
          }
        />
      </Routes>

      {/* Footer 所有页面共用 */}
      <Footer />
    </HashRouter>
  );
}

export default App;
