import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const ProductSection = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       await axios.get(
          `http://127.0.0.1:2000/api/product?category=${category}&limit=5`
        ).then((res)=>{
            setProducts(res.data.products)
        }).catch((err)=>{
            console.log(err);
        });
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container-fluid bg-white my-3 p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>{title}</h5>
        <button className="btn btn-primary btn-sm">View All</button>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <div className="row g-3">
          {products.map((product) => (
            <div key={product._id} className="col-6 col-md-3 col-lg-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
