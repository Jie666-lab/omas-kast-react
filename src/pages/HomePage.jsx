/*
  HomePage 主页组件
  
  包含的区域（对照你的设计稿）:
  1. Hero Banner - 大横幅
  2. Weekly Specials - 每周特价（前4个商品）
  3. Today's Top Picks - 今日推荐（第5-8个商品）
  4. Promo Banner - 促销横幅
  5. Categories - 分类筛选 + 所有商品
*/

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function HomePage({ onAddToCart }) {
  // ========== 分类筛选功能 ==========
  // activeCategory 记录当前选中的分类
  const [activeCategory, setActiveCategory] = useState("All");

  // 所有分类按钮
  const categories = [
    "All",
    "Cooking",
    "Snacks",
    "Bakery",
    "Drinks",
  ];

  // 根据选中的分类过滤商品
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* ========== 1. Hero Banner ========== */}
      <section className="hero">
        <div className="hero-content">
          <h2>
            Simple Pleasures from
            <br />
            Our Cupboard to Yours!
          </h2>
          <p>
            Get great produce and sustainably sourced groceries delivered
            straight to your door.
          </p>
          <button className="btn-primary">Shop Now</button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop"
            alt="Dutch cupboard"
          />
        </div>
      </section>

      {/* ========== 2. Weekly Specials（前4个商品）========== */}
      <section className="section">
        <div className="container">
          <h2>Weekly Specials</h2>
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. Today's Top Picks（第5-8个商品）========== */}
      <section className="section">
        <div className="container">
          <h2>Today's Top Picks</h2>
          <div className="product-grid">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. Promo Banner ========== */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Delicious food, for an even better price!</h2>
          <button className="btn-primary">Buy Now</button>
        </div>
        <div className="promo-images">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=150&h=150&fit=crop"
            alt="Food 1"
          />
          <img
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=150&h=150&fit=crop"
            alt="Food 2"
          />
          <img
            src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=150&h=150&fit=crop"
            alt="Food 3"
          />
        </div>
      </section>

      {/* ========== 5. Categories + All Products ========== */}
      <section className="section">
        <div className="container">
          <h2>Categories</h2>

          {/* 分类按钮 */}
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={
                  "category-btn" + (activeCategory === cat ? " active" : "")
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 根据分类显示商品 */}
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
