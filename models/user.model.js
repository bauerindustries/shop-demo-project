// convention: third-party imports first
const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
  constructor(email, password, fullname, street, city, postcode) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      city: city,
      postcode: postcode,
    };
  }

  // create/store user data in db
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      fullname: this.name,
      address: this.address,
    });
  }

  getUserWithSameEmail() {
    // don't need await, as return deals with the promise
    return db.getDb().collection('users').findOne({
      email: this.email,
    });
  }

  async userExistsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  hasMatchingPassword(hashedPassword) {
    // don't need await, as return deals with the promise
    return bcrypt.compare(this.password, hashedPassword);
  }

  deleteUser() {}
}

module.exports = User;
