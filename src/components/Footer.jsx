/*
  Footer 组件 - 所有页面共用的底部
  点击 Back to Top 会滚动到页面顶部
*/

function Footer() {
  // 点击回到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Bakery & Sweets</h3>
            <a href="#">Breads & Rusk</a>
            <a href="#">Cakes</a>
            <a href="#">Candy</a>
            <a href="#">Cookies</a>
          </div>
          <div className="footer-section">
            <h3>Savoury Foods</h3>
            <a href="#">Meats</a>
            <a href="#">Fish</a>
            <a href="#">Vegetables</a>
            <a href="#">Soups & Seasonings</a>
          </div>
          <div className="footer-section">
            <h3>Snacks & Toppings</h3>
            <a href="#">Crackers & Snacks</a>
            <a href="#">Bread Toppings</a>
            <a href="#">Condiments</a>
            <a href="#">Cheese</a>
          </div>
          <div className="footer-section">
            <h3>Beverages</h3>
            <a href="#">Cocoa</a>
            <a href="#">Coffee</a>
            <a href="#">Tea</a>
            <a href="#">Cold Drinks</a>
          </div>
        </div>
        <div className="footer-bottom">
          <button className="back-to-top" onClick={scrollToTop}>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
