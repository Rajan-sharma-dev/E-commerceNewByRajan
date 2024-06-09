const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorhandler")


exports.createProduct = async (req,res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = async (req,res) => {
    const products = await Product.find();
    res.status(200).json({message: "Route is working fine",
        success: true,
        products
    })
}

exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
      success: true,
      product
    });
}


exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body, {new: true, useFindAndModify: false, runValidators: true})
    res.status(200).json({
        success: true,
        product
    })
}

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404))
    }
  
    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }
  
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  };