const Product = require('../models/product.model');

async function getProducts(req, res) {
  try {
    const allProducts = await Product.findAll();
    res.render('admin/products/all-products', { products: allProducts });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render('admin/products/new-product', { product: {
    title: '',
    summary: '',
    price: '',
    description: ''
  } });
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/admin/products');
  // res.render('admin/products/');
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/update-product', { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if(req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
    res.redirect('/admin/products');
  } catch (error) {
    next(error);
    return;
  }
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.delete();
  } catch (error) {
    return next(error);
  }

  res.json({message: 'Deleted product'});
  // redirecting would cause error on this async deleting
  // res.redirect('/admin/products');
}

function getOrders(req, res, next) {
  res.render('admin/orders');
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
};
