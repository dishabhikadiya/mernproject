const mongoose = require("mongoose");
const Product = require("../Model/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apifeatures = require("../utils/apifeatures");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/userModel");
// create Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultperpage = 5;
  const productcount = await Product.countDocuments();
  const apifeature = new apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});
//  update product --admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    product,
    productcount,
  });
});
// get all product details
exports.getProductdetails = catchAsyncErrors(async (req, res, next) => {
  console.log("getProductdetails");
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    // productcount,
  });
});
// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findByIdAndDelete({
    _id: req.params.id,
  });
  console.log("id ===", req.params.id, product);

  await product.remove();

  res.status(200).json({
    success: true,
    message: product ? "delete" : "notdelete",
  });
});
// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});