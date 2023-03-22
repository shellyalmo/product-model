import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";

//@desc Get all Products
//@route GET /api/v1/Products
//@access Public
export const getProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find({});
  res.status(200).json({
    success: true,
    data: product,
  });
});

//@desc Create a product
//@route POST /api/v1/products
//@access Private
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    data: product,
  });
});

//@desc Get a product
//@route GET /api/v1/products/:id
//@access Private
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Error(`Product with id: ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

//@desc Update a product
//@route PUT /api/v1/products/:id
//@access Private
export const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new Error(`Product with id: ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Error(`Product with ID ${req.params.id} not found`));
  }

  product.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc Get active Products
//@route GET /api/v1/Products
//@access Public
export const getActiveProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find({ isActive: true });
  res.status(200).json({
    success: true,
    data: product,
  });
});

//@desc Get products by price range
//@route GET /api/v1/Products
//@access Public
export const getProductsByRange = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const product = await Product.find({
    "details.price": { $gt: query.min, $lt: query.max },
  });
  res.status(200).json({
    success: true,
    data: product,
  });
});
