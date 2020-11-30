const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required().min(2).max(100),
    surname: Joi.string().required().min(2).max(100),
    email: Joi.string().required().email(),
    phone: Joi.string().required().length(11),
    gender: Joi.string().required(),
    dateOfBirth: Joi.string().required().length(10),
    comments: Joi.string().allow('').min(0).max(5000),
  })
}), UserController.create);

module.exports = routes;
