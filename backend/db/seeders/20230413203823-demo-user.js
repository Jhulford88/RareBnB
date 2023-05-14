'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require('sequelize');
let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options, [
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: bcrypt.hashSync('password'),
      firstName: 'Mikhail',
      lastName: 'Bulgakov'
    },
    {
      email: 'user1@user.io',
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync('password2'),
      firstName: 'Edward',
      lastName: 'Albee'
    },
    {
      email: 'user2@user.io',
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync('password3'),
      firstName: 'Brendan',
      lastName: 'Eich'
    },
    {
      email: 'IownNothingOne@user.io',
      username: 'IownNothingOne',
      hashedPassword: bcrypt.hashSync('password'),
      firstName: 'W.B.',
      lastName: 'Yeats'
    },
    {
      email: 'IownNothingTwo@user.io',
      username: 'IownNothingTwo',
      hashedPassword: bcrypt.hashSync('password'),
      firstName: 'Albert',
      lastName: 'Camus'
    },
    {
      email: 'IownNothingThree@user.io',
      username: 'IownNothingThree',
      hashedPassword: bcrypt.hashSync('password'),
      firstName: 'Tom',
      lastName: 'Robbins'
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
