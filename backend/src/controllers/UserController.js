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

    let errors = []

    if (!validations.isTextValid(firstName, 2, 100))
      errors.push('First Name')

    if (!validations.isTextValid(surname, 2, 100))
      errors.push('Surname')

    if (!validations.isEmailValid(email))
      errors.push('Email')

    if (!validations.isGenderValid(gender))
      errors.push('Gender')

    if (!validations.isDateValid(dateOfBirth))
      errors.push('Date of birth')

    if (!validations.isTextValid(comments, 0, 5000) && comments.length !== 0)
      errors.push('Comments')

    if (errors.length !== 0) {
      console.log(' Aborted. Found errors: ')
      errors.forEach(err => console.log(err));
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