import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 border-0 shadow-sm product-card" 
                    style={{cursor : "pointer"}}    
                    onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={product.images?.[0]}
        className="card-img-top p-3"
        alt={product.name}
        style={{ height: "200px", objectFit: "contain" }}
      />

      <div className="card-body">
        <h6 className="card-title text-truncate">{product.name}</h6>

        <p className="mb-1 fw-bold text-success">
          ₹{product.price}
        </p>

        <small className="text-muted">
          {product.category}
        </small>
      </div>

      <div className="card-footer bg-white border-0">
        <Link to={`/product/${product._id}`} className="btn btn-primary w-100 btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
