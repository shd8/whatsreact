const { model, Schema } = require('mongoose');

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
  address: {
    country: String,
    city: String,
    street: String,
    postalCode: String,
  },
  role: String,
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return password === this.password;
};

module.exports = model('User', userSchema);
