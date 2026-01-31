import React, { useEffect, useState  } from "react";
// import ProductCard from "../components/ProductCard/ProductCard";
import ProductSection from "../components/ProducSection/ProductSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
     axios.get("http://127.0.0.1:2000/api/product")
     .then((res)=>{
      setProducts(res.data.products)
     }).catch((err)=>{
      console.log(err);
     })
    }catch(err){
      console.log("error",err);
    }
  }

  useEffect(() => {
    if(!token){
      navigate("/login")
    }else{
      fetchProducts();
    }
  }, []);

  return (
    <div className="container-fluid px-4 mt-3">
      <div className="row">

        {/* CATEGORY BAR */}
<div className="bg-white shadow-sm mb-3">
  <div className="container-fluid">
    <div className="d-flex justify-content-between text-center py-2 flex-wrap">

      {[
        { name: "Mobiles", img: "/icons/mobile.png" },
        { name: "Fashion", img: "/icons/fashion.png" },
        { name: "Electronics", img: "/icons/electronics.png" },
        { name: "Home", img: "/icons/home.png" },
        { name: "Appliances", img: "/icons/appliances.png" },
        { name: "Travel", img: "/icons/travel.png" },
        { name: "Toys", img: "/icons/toys.png" },
        { name: "Grocery", img: "/icons/grocery.png" },
      ].map((cat) => (
        <div
          key={cat.name}
          className="d-flex flex-column align-items-center px-2 category-item"
          style={{ cursor: "pointer" }}
        >
          <img
            src={cat.img}
            alt={cat.name}
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
          <small className="mt-1 fw-semibold">{cat.name}</small>
        </div>
      ))}

    </div>
  </div>
</div>


{/* FLIPKART-STYLE BANNER CAROUSEL */}
<div className="container-fluid px-0 mb-3">
  <div
    id="homeCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="2000"
  >

    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide-to="0"
        className="active"
      ></button>
      <button
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide-to="1"
      ></button>
      <button
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide-to="2"
      ></button>
    </div>

    <div className="carousel-inner">

      <div className="carousel-item active">
        <img
          src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg"
          className="d-block w-100 carousel-img"
          alt="slide1"
        />
      </div>

      <div className="carousel-item">
        <img
          src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg"
          className="d-block w-100 carousel-img"
          alt="slide2"
        />
      </div>

      <div className="carousel-item">
        <img
          src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg"
          className="d-block w-100 carousel-img"
          alt="slide3"
        />
      </div>

    </div>

    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#homeCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon"></span>
    </button>

    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#homeCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon"></span>
    </button>

  </div>
</div>

        
        
        {/* LEFT FILTER (Later) */}
        {/* <div className="col-md-2 d-none d-md-block">
          <div className="bg-white p-3 shadow-sm">
            <h6>Filters</h6>
            <hr />
            <p className="text-muted small">Coming soon</p>
          </div>
        </div> */}

        

        {/* PRODUCT GRID */}
        {/* <div className="col-md-10">
          <div className="row g-3">
            {products.map((product) => (
              <div key={product._id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div> */}

      <ProductSection title="Mobiles to Checkout" category="Mobiles" />
      <ProductSection title="Top Selection" category="Fashion" />
      <ProductSection title="Audio & Video Essentials" category="Audio%20%26%20Video%20Essentials" />
      <ProductSection title="Jewellery for You" category="Jewellery" />
      <ProductSection title="Furniture Deals" category="Furniture" />
      <ProductSection title="Top Deals on TV & Appliances" category="Appliances" />

      </div>
    </div>
  );
};

export default Home;
