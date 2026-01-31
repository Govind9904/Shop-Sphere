import React from 'react'
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="fk-navbar w-100 bg-primary">
    {/* Top Bar */}
    <div className="container-fluid w-75 text-white">
        <div className="row  align-items-center py-3 gx-2">

        {/* Logo */}
        <div className="col-auto">
            <div className="fk-logo fw-bold fs-5">ShopSphere</div>
        </div>

        {/* Search */}
        <div className="col">
            <input
            type="text"
            className="form-control"
            placeholder="Search for products, brands and more"
            />
        </div>

        {/* Login */}
        <div className="col-auto">
            <button className="btn btn-light fw-semibold">
            Login
            </button>
        </div>

        {/* Cart */}
        <div className="col-auto">
            <div className="fk-cart fw-semibold">
            🛒 Cart
            </div>
        </div>

        </div>
    </div>

    {/* Categories */}
    <div className="container-fluid bg-white border-top">
        <div className="row text-center py-2 gx-0">

        {["Mobiles", "Fashion", "Electronics", "Home", "Appliances", "Beauty"].map(
            (item) => (
            <div key={item} className="col">
                <span className="fw-semibold">{item}</span>
            </div>
            )
        )}

        </div>
    </div>
    </header>

  );
};


export default Navbar