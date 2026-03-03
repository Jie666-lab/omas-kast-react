/*
  ProductCard 组件 - 商品卡片，在主页、详情页、购物车页都会用到
  
  props:
    product  - 商品对象 { id, name, price, image, rating, reviews }
    onAddToCart - 点击"Add to Cart"时调用的函数
  
  功能:
    1. 点击卡片 → 跳转到商品详情页
    2. 点击按钮 → 添加到购物车（不跳转）
*/

import { useNavigate } from "react-router-dom";

// 生成星级评分（和JS版逻辑一样）
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += "⭐";
  }
  if (halfStar) {
    stars += "⭐";
  }
  return stars;
}

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  // 点击卡片跳转到详情页
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // 点击Add to Cart按钮（阻止冒泡，不然会同时触发卡片的点击）
  const handleAddToCart = (e) => {
    e.stopPropagation(); // 这就是JS版里的 event.stopPropagation()
    onAddToCart(product.id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img src={product.image} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-rating">{generateStars(product.rating)}</div>
      <div className="product-price">Total €{product.price.toFixed(2)}</div>
      <button className="btn-add-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
export { generateStars };
