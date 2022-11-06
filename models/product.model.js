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
  static async findAll() {
    const allProducts = await db
      .getDb()
      .collection('products')
      .find()
      .toArray();

    // map all returned products onto instances of the Product constructor object (which helps with imagepaths etc)
    return allProducts.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  // static to enable direct call without using contructor
  static async findById(id) {
    let productId;
    try {
      productId = new mongodb.ObjectId(id);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db.getDb().collection('products').findOne({
      _id: productId,
    });

    if (!product) {
      const error = new Error('Could not find requested product ID');
      error.code = 404;
      throw error;
    }

    // map all returned products onto instances of the Product constructor object (which helps with imagepaths etc)
    return new Product(product);
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

      await db.getDb().collection('products').updateOne(
        {_id: productId},
        {$set: productData}, 
      );
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }
}

module.exports = Product;
