const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const validations = require('../../../shared/formValidation');

module.exports = {
  async index(request, response) {
      const users = await connection('users').select('*');
    
      return response.json(users);
  },

  async create(request, response) {
    const { 
      firstName,
      surname,
      email,
      phone,
      gender,
      dateOfBirth,
      comments } = request.body;

    const id = generateUniqueId();

    if (
      validations.isTextValid(surname, 100) &&
      validations.isEmailValid(email) &&
      validations.isPhoneValid(phone) &&
      validations.isGenderValid(gender) &&
      validations.isDateValid(dateOfBirth) &&
      validations.isTextValid(comments, 5000) &&
      validations.isTextValid(firstName, 100)
    ) {
      console.log(' Form fields validated with success! ')
    } else {
      console.log(' Validation error! Register aborted.')
      return
    }

    await connection('users').insert({
      id,
      firstName,
      surname,
      email,
      phone,
      gender,
      dateOfBirth,
      comments
    })
    
    return response.json({ id });
  }
};