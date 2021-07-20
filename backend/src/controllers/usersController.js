/* eslint-disable no-underscore-dangle */
const debug = require('debug')('server:usersController');
const User = require('../models/user.model');

function usersController() {
  async function getAll(req, res) {
    debug('enter to function getAll');
    try {
      const users = await User.find({}).populate('cart').populate('wishlist');
      res.status(200);
      res.json(users);
    } catch (error) {
      debug(error);
      res.send(error);
    }
  }

  async function getUserById(req, res) {
    const { userId } = req.params;
    debug(req.body);
    try {
      const user = await User.findById(userId).populate('cart').populate('wishlist');
      res.status(200);
      res.json(user);
    } catch (error) {
      debug(error);
      res.send(error);
    }
  }

  async function addUser(req, res) {
    const newUser = new User(req.body);
    debug(req.body);
    debug(newUser);
    try {
      await newUser.save();
      res.status(200);
      res.json(newUser);
    } catch (error) {
      debug(error);
      res.send(error);
    }
  }

  async function deleteUserById(req, res) {
    const { userId } = req.params;
    try {
      await User.findByIdAndDelete(userId);
      res.status(204);
      res.json();
    } catch (error) {
      debug(error);
      res.send(error);
    }
  }

  async function updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.body._id,
        req.body,
        { new: true });
      return res.json({
        updatedUser,
      });
    } catch (error) {
      return res.status(404);
    }
  }

  async function updateUserById(req, res) {
    const { userId } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(userId,
        { ...req.body },
        { new: true });
      return res.json({
        updatedUser,
      });
    } catch (error) {
      return res.status(404);
    }
  }

  return {
    getAll, getUserById, addUser, deleteUserById, updateUser, updateUserById,
  };
}
module.exports = usersController;
