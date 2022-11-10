const mongodb = require('mongodb');
const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    // + forces conversion to number
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;

    this.updateImageData();
    // only for existing products, not new ones
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  // static to enable direct call without using contructor
  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection('products')
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error('Could not find product with provided id.');
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection('products').find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    // backticks allow easy injection of variables
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    // update of existing product, or new?
    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        // removes key/value pair from productData object, preventing overwriting with null on existing
        delete productData.image;
      }

      await db
        .getDb()
        .collection('products')
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  async delete() {
    const productId = new mongodb.ObjectId(this.id);

    const deletedProduct = await db.getDb().collection('products').deleteOne({
      _id: productId,
    });

    if (!deletedProduct) {
      const error = new Error(
        'Sorry, because of problem, the selected product could not be deleted'
      );
      error.code = 404;
      throw error;
    }

    return;
  }
}

module.exports = Product;
