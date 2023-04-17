'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let options = {};
options.tableName = 'Bookings';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      startDate: new Date(Date.UTC(2023, 4, 1)),
      endDate: new Date(Date.UTC(2023, 4, 3))
    },
    {
      spotId: 2,
      userId: 1,
      startDate: new Date(Date.UTC(2023, 6, 1)),
      endDate: new Date(Date.UTC(2023, 6, 3))
    },
    {
      spotId: 3,
      userId: 2,
      startDate: new Date(Date.UTC(2023, 8, 1)),
      endDate: new Date(Date.UTC(2023, 8, 3))
    }
   ], options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
