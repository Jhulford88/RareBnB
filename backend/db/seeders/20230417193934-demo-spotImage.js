'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let options = {};
options.tableName = 'SpotImages';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'www.test1.com',
      preview: true
    },
    {
      spotId: 2,
      url: 'www.test2.com',
      preview: false
    },
    {
      spotId: 3,
      url: 'www.test3.com',
      preview: true
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3] }
    }, {})
  }
};
