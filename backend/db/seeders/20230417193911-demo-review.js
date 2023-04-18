'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let options = {};
options.tableName = 'Reviews';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      review: 'This place was the worst. Avoid at all costs.',
      stars: 3
    },
    {
      spotId: 2,
      userId: 1,
      review: 'Excellent host. Would recommend.',
      stars: 4
    },
    {
      spotId: 3,
      userId: 2,
      review: 'This was a literal van. I mean what the heck?!',
      stars: 2
    }
   ], options)
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3] }
    }, {})
  }
};
