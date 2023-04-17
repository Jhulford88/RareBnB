'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let options = {};
options.tableName = 'ReviewImages';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'www.test1.com'
    },
    {
      reviewId: 2,
      url: 'www.test2.com'
    },
    {
      reviewId: 2,
      url: 'www.test2.com'
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1,2,3] }
    }, {})
  }
};
