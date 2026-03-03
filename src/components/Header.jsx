/*
  Header 组件 - 所有页面共用的顶部导航栏
  
  props:
    cartCount - 购物车里商品的总数量，显示在购物车图标旁边
*/

import { Link } from "react-router-dom";

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">🛒</span>
          <h1>Oma's Kast</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <a href="#recipes">Recipes</a>
          <a href="#dutch-food">Dutch Food</a>
          <a href="#lifestyle">Dutch Lifestyle</a>
          <a href="#faqs">FAQs</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Search + Cart */}
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <Link to="/cart" className="cart-btn">
            🛒 <span id="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
