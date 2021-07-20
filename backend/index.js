const express = require('express');
const debug = require('debug')('server');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

require('dotenv').config();
require('./src/database/mongoose.config');
require('./src/auth/auth');

const server = express();
const authRoutes = require('./src/routes/auth.routes');
const userProtectedRoutes = require('./src/routes/user.routes');
const productsRoutes = require('./src/routes/products.routes');

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use('/api/auth/', authRoutes);
server.use('/api/users/', passport.authenticate('jwt', { session: false }), userProtectedRoutes);
server.use('/api/products/', productsRoutes);

server.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

server.listen(PORT, debug(`server is running on port ${PORT}`));
