import "./Header.css";
import { Link } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo">
        ShopSphere
      </Link>

      {/* Search */}
      <input
        type="text"
        className="search"
        placeholder="Search for products"
      />

      {/* Right */}
      <div className="header-right">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/cart" className="cart">
          <span className="cart-count">0</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
