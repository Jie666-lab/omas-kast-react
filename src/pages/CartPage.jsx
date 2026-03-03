/*
  CartPage 购物车页
  
  功能:
  1. 显示购物车中所有商品
  2. +/- 修改数量
  3. Remove 删除商品
  4. 右侧总价汇总（这次修复了！Subtotal/Discount/Shipping/Total 都会正确计算）
  5. 空购物车提示
  6. 底部推荐商品
*/

import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function CartPage({ cart, onUpdateQuantity, onRemoveItem, onAddToCart }) {
  // ========== 计算价格（这次不会是0了！）==========
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  // 推荐商品（取前4个）
  const recommended = products.slice(0, 4);

  // ========== 购物车为空 ==========
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart" style={{ display: "block" }}>
          <h2>Your cart is empty</h2>
          <p>Add some delicious Dutch food to your cart!</p>
          <Link to="/" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>

        {/* 即使购物车空了也显示推荐 */}
        <div className="recommendations">
          <h2>Others Also Bought</h2>
          <div className="product-grid">
            {recommended.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========== 购物车有商品 ==========
  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        {/* 左边：购物车商品列表 */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">
                  €{item.price.toFixed(2)}
                </p>
                <div className="cart-item-controls">
                  <button onClick={() => onUpdateQuantity(item.id, -1)}>
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={() => onUpdateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-total">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn-remove"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 右边：价格汇总 */}
        <div className="cart-summary">
          <h2>Ready to order?</h2>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Discount:</span>
            <span>€{discount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping costs:</span>
            <span>{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total ({cart.reduce((s, i) => s + i.quantity, 0)} items):</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <button
            className="btn-checkout"
            onClick={() => alert("Checkout coming soon!")}
          >
            Purchase Product
          </button>

          <div className="delivery-info">
            🚚 Ordered today, delivered no later than tomorrow
          </div>

          <div className="payment-options">
            <h3>We accept:</h3>
            <div className="payment-icons">
              <span style={{ fontSize: "28px" }}>💳</span>
              <span style={{ fontSize: "28px" }}>🏦</span>
              <span style={{ fontSize: "28px" }}>📱</span>
            </div>
          </div>
        </div>
      </div>

      {/* 推荐商品 */}
      <div className="recommendations">
        <h2>Others Also Bought</h2>
        <div className="product-grid">
          {recommended.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
