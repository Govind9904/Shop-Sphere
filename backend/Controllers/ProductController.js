const Product = require("../Model/Product");

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {

    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit,
    } = req.query;

    let query = {};
    let sortOptions = {};
    // Search
    if(keyword){
      query.name = { $regex : keyword , $options : "i" }
    }

    // Category Filter
    if(category){
      query.category = category;
    }

    // Price Filter 
    if(minPrice || maxPrice){
      query.price = {};
      if(minPrice) query.price.$gte = Number(minPrice);
      if(maxPrice) query.price.$lte = Number(maxPrice);

      // Sorting
      
      if(sort === "price") sortOptions.price = 1;
      if(sort === "latest") sortOptions.createdAt = -1;
    }

    // Pagenation
    const skip = (page - 1) * limit;


    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(query);
    res.json({
      total,
      page : Number(page),
      pages : Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// update Product

const updateProduct = async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update Oblects 
    Object.assign(product , req.body);

    await product.save();

    res.json({ message: "Product updated successfully", product });
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { addProduct, getProducts , getProductById , deleteProduct , updateProduct };
