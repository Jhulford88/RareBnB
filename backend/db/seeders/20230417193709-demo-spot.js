'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let options = {};
options.tableName = 'Spots';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '123 Sample Lane',
      city: 'Denver',
      state: 'CO',
      lat: 39.7392,
      lng: 104.9903,
      name: 'Holly House',
      description: 'Haunted mansion',
      price: 99.97
    },
    {
      ownerId: 2,
      address: '321 Tester Road',
      city: 'Philadelphia',
      state: 'PA',
      lat: 89.4581,
      lng: 101.3471,
      name: 'Peter Nincompoop Mansion',
      description: 'Mansion (not haunted)',
      price: 199.99
    },
    {
      ownerId: 3,
      address: '87 Raspberry Lane',
      city: 'Miami',
      state: 'FL',
      lat: 45.8112,
      lng: 33.7239,
      name: 'Bali Mobile',
      description: 'Off-grid van',
      price: 249.00
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Holly House', 'Peter Nincompoop Mansion', 'Bali Mobile'] }
    }, {})
  }
};
