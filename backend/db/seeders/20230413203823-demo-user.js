"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
let options = {};
options.tableName = "Users";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Mikhail",
          lastName: "Bulgakov",
          image:
            "https://cdn.britannica.com/35/31135-004-2A7DD661/Bulgakov-1932.jpg",
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "Edward",
          lastName: "Albee",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC959sgCBASf-tf9BBGNvPhXABczTTWi920w&usqp=CAU",
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "Brendan",
          lastName: "Eich",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnwDo_yE1sSTzI1lWgpoNhdfoVVRot3T_kqw&usqp=CAU",
        },
        {
          email: "IownNothingOne@user.io",
          username: "IownNothingOne",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "W.B.",
          lastName: "Yeats",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5D_8LU2jt6ufKGmXqX01HqNtx8Cnjq277g&usqp=CAU",
        },
        {
          email: "IownNothingTwo@user.io",
          username: "IownNothingTwo",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Albert",
          lastName: "Camus",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUj2B3e6GON2nmw8A57QTDAv5Ek9GVQWpQVA&usqp=CAU",
        },
        {
          email: "IownNothingThree@user.io",
          username: "IownNothingThree",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Tom",
          lastName: "Robbins",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTBCe1IlHubZeMqC6qN4AsAaoYPTlGWXfAsw&usqp=CAU",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
