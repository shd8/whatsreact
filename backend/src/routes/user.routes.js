/* eslint-disable no-underscore-dangle */
const express = require('express');
const userController = require('../controllers/usersController')();

const routes = express.Router();

routes
  .route('/')
  .get(userController.getAll)
  .post(userController.updateUser);

routes
  .route('/:userId/')
  .get(userController.getUserById)
  .post(userController.updateUserById);

module.exports = routes;
