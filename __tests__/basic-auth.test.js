'use strict';

const basicAuth = require('../src/auth/middleware/basic');
const { sequelize, Users } = require('../src/auth/models');

let user = {
  username: 'tester',
  password: 'pass123',
};

beforeAll(async () => {
  await sequelize.sync();
  await Users.create(user);
});

afterAll(async () => {
  await sequelize.drop();
  await sequelize.close();
});

describe('Basic auth middleware', () => {

  it('fails on signin as expected', () => {
    let req = {
      headers: {
        authorization: 'Basic fail',
      },
    };
    let res = {};
    let next = jest.fn();

    basicAuth(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalled();
      });
  });

});