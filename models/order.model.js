const mongodb = require('mongodb');
const db = require('../data/database');

class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userData, status = 'pending', date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    // no need to check if this.date is valid, as new Date() will make it so, even if passed passed parameter is null
    this.formattedDate = this.date.toLocaleDateString('en-UK', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    // }
    this.id = orderId;
  }

  async save() {
    if (this.id) {
      //update
    } else {      
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };

      // not using async/await, as no further action required/can handle promise where Order.save() is called
      return db.getDb().collection('orders').insertOne(orderDocument);
    }
  }
}

module.exports = Order;
