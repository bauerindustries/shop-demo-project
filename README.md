# Shopping site demo

A simple demonstration shopping site with the following functionality:
* User:
 ** User registration
 ** Sign-in/authentication
 ** Product browsing
 ** Add products to shopping cart 
 ** View shopping cart
 ** Checkout, with 3rd-party payment processing (Stripe)
 ** View previous orders
 ** Automatic order status updating (post-payement)
* Administrator:
 ** Sign-in/authorisation
 ** Inventory management
 ** Manual order status updating

## Technologies used:
* Node.js
* Express.js
* MongoDB
* HTML
* CSS
* Javascript

* API integration
* Sessions/Cookies
* Route security
* CSRF tokens
* Deployment
* Environmental variables

## Operations:
GUI input sends request methods and data to the [API](https://github.com/bauerindustries/todos-rest-api) endpoints, to achieve the following:
* Read existing to-do items
* Create new to-do item/s
* Update existing to-do item/s
* Delete to-do item/s

## Hosting:
You can see the site running [here](https://shop-demo-node-js-express-mondodb.onrender.com) on Render.

The MongoDB database is hosted on MongoDB's Atlas Database.

## Notes
This project was built as the major module project on [100 Days of Code - Web Development Bootcamp](https://www.udemy.com/course/100-days-of-code-web-development-bootcamp/).
