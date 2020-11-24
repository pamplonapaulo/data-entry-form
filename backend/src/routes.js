const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(10).max(11),
    gender: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    comments: Joi.string().required(),
  })
}), UserController.create);

module.exports = routes;
