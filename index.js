const express = require('express');
const cors = require('cors');
const mongodbConnection = require('./src/connectionDB/mongodbConnection');
const { createUser, getAllusers, updateUser, deleteuser, userIsDelete, userInactive } = require('./src/controller/users/users');
const { createProduct, getAllProducts, getProductById, getUserProductDetails,updateProduct } = require('./src/controller/products/product');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

const Router = express.Router();

// User Routes
Router.post('/users-create', createUser);
Router.get('/users-getall', getAllusers);
Router.put('/users-update/:id', updateUser);
Router.delete('/users-delete/:id', deleteuser);
Router.patch('/users-inactive/:id', userInactive);
Router.patch('/users-isdelete/:id', userIsDelete);

// Product Routes
Router.post('/products-create', createProduct);
Router.get('/products-getall', getAllProducts);
Router.get('/products-getbyid/:id', getProductById);
Router.get('/products-userdetails', getUserProductDetails);
Router.put('/products-update/:id', updateProduct);
// Mount all routes under /api
app.use('/api', Router);

// Optional: Add a simple root route to test
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running on Vercel!' });
});



// Export the Express app for Vercel
module.exports = app;