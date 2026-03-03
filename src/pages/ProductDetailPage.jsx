/*
  ProductDetailPage 商品详情页
  
  功能（和JS版一样）:
  1. 从URL读取商品ID → 显示对应商品信息
  2. 点击缩略图 → 切换主图
  3. 数量选择器 → +/- 按钮
  4. Add to Cart → 加入购物车
  5. Similar Products → 显示同分类的其他商品
  6. Customer Reviews → 评论区
*/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { generateStars } from "../components/ProductCard";

function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams(); // 从URL获取商品ID，比如 /product/3 → id = "3"
  const navigate = useNavigate();

  // 找到对应商品
  const product = products.find((p) => p.id === parseInt(id));

  // ========== State ==========
  const [mainImage, setMainImage] = useState(
    product ? product.images[0] : ""
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // 如果商品不存在，显示提示
  if (!product) {
    return (
      <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Product not found!</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/")}
          style={{ marginTop: "20px" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // 点击缩略图切换主图
  const handleThumbnailClick = (index) => {
    setMainImage(product.images[index]);
    setActiveThumb(index);
  };

  // 数量 - 减少
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 数量 - 增加
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  // 添加到购物车
  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  // 找到相似商品（同分类、排除自己）
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-container">
      {/* ========== 商品主信息 ========== */}
      <div className="product-detail-main">
        {/* 左边：图片区 */}
        <div className="product-images">
          <img src={mainImage} alt={product.name} className="main-image" />
          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={
                  "thumbnail" + (activeThumb === index ? " active" : "")
                }
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        {/* 右边：商品信息 */}
        <div className="product-info">
          <h1>{product.name}</h1>

          <div className="product-rating-detail">
            <span className="stars">{generateStars(product.rating)}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-large">
            €{product.price.toFixed(2)}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <p>{product.ingredients}</p>
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={handleMinus}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={handlePlus}>
                +
              </button>
            </div>
          </div>

          <button
            className="btn-add-to-cart-large"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ========== Similar Products ========== */}
      {similarProducts.length > 0 && (
        <div className="similar-products">
          <h2>Similar Items You Might Like</h2>
          <div className="product-grid">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(productId) => onAddToCart(productId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========== Customer Reviews ========== */}
      <div className="reviews-section">
        <h2>Customer Ratings & Reviews</h2>

        <div className="review-summary">
          <div className="review-score">4.2</div>
          <div className="review-bars">
            {[
              { label: "5 stars", width: "60%", pct: "60%" },
              { label: "4 stars", width: "25%", pct: "25%" },
              { label: "3 stars", width: "10%", pct: "10%" },
              { label: "2 stars", width: "3%", pct: "3%" },
              { label: "1 star", width: "2%", pct: "2%" },
            ].map((bar) => (
              <div className="review-bar" key={bar.label}>
                <span>{bar.label}</span>
                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{ width: bar.width }}
                  ></div>
                </div>
                <span>{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 评论列表 */}
        <div className="review-item">
          <div className="review-header">
            <div>
              <div className="reviewer-name">steffiesloane</div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="review-date">May 16, 2025</div>
          </div>
          <p className="review-text">
            Great bread, better than most groceries! Fresh and tasty. Perfect
            for breakfast sandwiches and toast.
          </p>
        </div>

        <div className="review-item">
          <div className="review-header">
            <div>
              <div className="reviewer-name">markvanhouten</div>
              <div className="stars">⭐⭐⭐⭐</div>
            </div>
            <div className="review-date">May 10, 2025</div>
          </div>
          <p className="review-text">
            Good quality bread. Stays fresh for several days. Would recommend!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
