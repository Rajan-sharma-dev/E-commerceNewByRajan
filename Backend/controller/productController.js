const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures")


exports.createProduct = catchAsyncErrors(async (req,res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    });
});

exports.getAllProducts = catchAsyncErrors(async (req,res) => {
    const product =  Product.find();
    const apiFeatures = new ApiFeatures(product, req.query).search().filter().pagination(5)
    const products = await apiFeatures.query
    const productCount = await Product.countDocuments()
    res.status(200).json({message: "Route is working fine",
        success: true,
        products,
        productCount
    });
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
      success: true,
      product
    });
})


exports.updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body, {new: true, useFindAndModify: false, runValidators: true})
    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
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
  })