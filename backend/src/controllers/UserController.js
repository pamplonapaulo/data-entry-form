const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

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