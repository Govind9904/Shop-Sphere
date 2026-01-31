import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:2000/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = () =>{
    // console.log("Add To Cart");
   axios.post(
    "http://127.0.0.1:2000/api/cart/add",
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })

  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row bg-white p-4 shadow-sm">

        {/* IMAGE */}
        <div className="col-md-5 text-center">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/300"}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "350px" }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-7">
          <h4>{product.name}</h4>
          <h3 className="text-success mt-2">₹{product.price}</h3>

          <p className="text-muted mt-3">{product.description}</p>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <button className="btn btn-warning me-3" onClick={addToCart}>
            Add to Cart
          </button>

          <button className="btn btn-success">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
