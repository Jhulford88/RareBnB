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
      address: '123 Argyle Lane',
      city: 'Peshastin',
      state: 'WA',
      country: 'USA',
      lat: 47.5707,
      lng: 120.6040,
      name: 'Hansel Creek Guest House',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 265
    },
    {
      ownerId: 2,
      address: '321 Mountain Drive',
      city: 'Telluride',
      state: 'CO',
      country: 'USA',
      lat: 37.9375,
      lng: 107.8123,
      name: 'Telluride Guest House',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 987
    },
    {
      ownerId: 3,
      address: '505 Hobbit Hill Way',
      city: 'Hardwick',
      state: 'VT',
      country: 'USA',
      lat: 44.5416,
      lng: 72.3487,
      name: 'Hardwick Tree House',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 230
    },
    {
      ownerId: 1,
      address: '42 Western Way',
      city: 'Benton',
      state: 'TN',
      country: 'USA',
      lat: 35.1742,
      lng: 84.6535,
      name: 'The Band Wagon',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 161
    },
    {
      ownerId: 2,
      address: '13 Tumbleweed Drive',
      city: 'Coconino County',
      state: 'AZ',
      country: 'USA',
      lat: 35.6648,
      lng: 111.4753,
      name: 'The Kyoob at Shash',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 293
    },
    {
      ownerId: 3,
      address: '85 Hilltop Drive',
      city: 'Big Bear Lake',
      state: 'CA',
      country: 'USA',
      lat: 34.2439,
      lng: 116.9114,
      name: 'Big Bear Getaway',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 105
    },
    {
      ownerId: 1,
      address: '75 Lox Lane',
      city: 'Vero Beach',
      state: 'FL',
      country: 'USA',
      lat: 27.6386,
      lng: 80.3973,
      name: 'Pura Vida Farm',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 97
    },
    {
      ownerId: 2,
      address: '1866 Ashurst Road',
      city: 'Copper Hill',
      state: 'VA',
      country: 'USA',
      lat: 37.0818,
      lng: 80.1342,
      name: 'Apple Ridge Caboose',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 180
    },
    {
      ownerId: 3,
      address: '0 Gulf of Mexico',
      city: 'Key West',
      state: 'FL',
      country: 'USA',
      lat: 24.5554,
      lng: 81.7842,
      name: 'The Grand Tiki',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 649
    },
    {
      ownerId: 1,
      address: '1122 Fantasy Lane',
      city: 'Cedar City',
      state: 'UT',
      country: 'USA',
      lat: 37.6775,
      lng: 113.0619,
      name: 'The Hobbit Cottage',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 107
    },
    {
      ownerId: 2,
      address: '50 Raspberry Road',
      city: 'Smithville',
      state: 'TN',
      country: 'USA',
      lat: 35.9606,
      lng: 85.8142,
      name: 'Five Meadows Dome',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 365
    },
    {
      ownerId: 3,
      address: '7 Noahs Way',
      city: 'Springfield',
      state: 'TN',
      country: 'USA',
      lat: 36.5092,
      lng: 86.8850,
      name: 'The Ark',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 195
    },
    {
      ownerId: 1,
      address: '484 Dusty Lane',
      city: 'Taos',
      state: 'NM',
      country: 'USA',
      lat: 36.4072,
      lng: 105.5734,
      name: 'Taos Mesa Earthship',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 170
    },
    {
      ownerId: 2,
      address: '215 Blue Ridge Drive',
      city: 'Woodfin',
      state: 'NC',
      country: 'USA',
      lat: 35.6334,
      lng: 82.5821,
      name: 'The Aerie',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 320
    },
    {
      ownerId: 3,
      address: '954 Lone Star Highway',
      city: 'Dripping Springs',
      state: 'TX',
      country: 'USA',
      lat: 30.1902,
      lng: 98.0867,
      name: 'Hill Country Retreat',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 2605
    },
    {
      ownerId: 1,
      address: '1306 Bourbon Street',
      city: 'New Orleans',
      state: 'LA',
      country: 'USA',
      lat: 29.9511,
      lng: 90.0715,
      name: 'The Syd',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 937
    },
    {
      ownerId: 2,
      address: '981 Bauhaus Boulevard',
      city: 'Pagosa Springs',
      state: 'CO',
      country: 'USA',
      lat: 37.2694,
      lng: 107.0098,
      name: 'Wonder Haus',
      description: 'Bacon ipsum dolor amet burgdoggen sirloin shank hamburger tri-tip picanha. Strip steak ribeye ball tip beef ribs, ham rump picanha sirloin filet mignon. Chuck venison pork chop frankfurter flank, spare ribs short loin bresaola sirloin pork loin. Flank swine doner kevin meatloaf beef ribs short loin porchetta ribeye. Boudin pork belly flank, strip steak tri-tip tongue jerky. Shankle sausage landjaeger, tenderloin flank capicola turducken beef ribs pig tongue pork belly buffalo swine kevin alcatra. Beef ribs sausage beef picanha, tenderloin shankle ham hock ball tip.',
      price: 351
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Holly House', 'Peter Nincompoop Mansion', 'Bali Mobile'] }
    }, {})
  }
};
