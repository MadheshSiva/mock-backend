const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const mongodbConnection = require('../src/connectionDB/mongodbConnection');

const {
  createUser,
  getAllusers,
  updateUser,
  deleteuser,
  userIsDelete,
  userInactive
} = require('../src/controller/users/users');

const {
  createProduct,
  getAllProducts,
  getProductById,
  getUserProductDetails
} = require('../src/controller/products/product');

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

app.use('/api', Router);

// Connect DB once
let isConnected = false;
const connectDB = async () => {
  if (!isConnected) {
    await mongodbConnection();
    isConnected = true;
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports = serverless(app);
