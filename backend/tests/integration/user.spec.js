const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('USER', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new USER', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: "Carlos",
        surname: "Marques Pamplona",
        email: "carlos@father.com.br",
        phone: "07141341741",
        gender: "Male",
        dateOfBirth: "15/11/1978",
        comments: "no comments"        
      });

      console.log(response.body);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});