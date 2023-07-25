"use strict";

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let options = {};
options.tableName = "SpotImages";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/f906fe29-49de-4375-a485-a8148c5e0de0.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/fedfd719-db8e-4c1c-aef6-f89ae0703cbb.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/c7d54e7b-4ff2-4c1f-8cd4-2459f71bc819.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/08353c1f-b28d-4d3d-8a4e-f92495f1df26.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/9a292ef6-01c0-4085-a5d3-6e29dfb7a675.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51131248/original/2791e195-35fc-4d6e-9de2-6c43db1536a2.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51131248/original/8a12d2e1-d27b-44c7-b33f-1bc18918db5f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51131248/original/0feaccc1-b90d-4a9d-8b20-7eceb5781512.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/73dd521b-d947-4501-aa46-fe2a72c8e8b3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/efb53edb-e8a2-4ace-84ff-f1315db65ee4.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/38794512-d935-4268-837e-246d470bde04.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/bec15006-6714-486c-8997-dbe409d176f3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/f405147e-dc8d-4c53-a127-50e17ef729c3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-27627590/original/524b294c-4a15-49be-ba28-eefb60dba43f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/6fc231cc-ded8-43f1-854e-844e33f0dfe0.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53061925/original/84655542-0400-485c-b8f8-f975015c2922.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53061925/original/068a0fb2-afaa-4fe3-878c-dd0b60c3282b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53061925/original/d7412762-dc26-48bd-8137-ca6f316cb2df.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53061925/original/09e751a8-57be-45a5-b39f-84e14993677e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53061925/original/fb1dc5be-4f29-4048-a27f-c4530acf7c82.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/5d4c4214-4d3c-4aaf-a492-9acd6e0ebe73.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/da6c0ca7-6541-4a0c-9639-2f9745503962.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39663644/original/a80e270f-e366-49c4-8fff-ea5da49de54f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/2215423b-d2b1-4c5d-86d1-9aa65138e288.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/9a7888a5-bdbd-4d46-8e5b-ec501c0abe96.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52441780/original/0100c4e0-04f1-4c34-86b2-c25d75e79de6.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52441780/original/8fd535c8-2249-4bc0-b8b8-4b21363a1dc0.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52441780/original/96ab9dd1-568e-45ee-9d86-21926adfc4f1.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52441780/original/8d44118a-a5e6-48c7-97fb-a260efee16d2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52441780/original/66f36259-46a4-4466-a5eb-9418def1e593.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/6317ae43-0a54-4853-be68-9192b8c43790.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/1d9cb41d-8f50-44ad-a0bc-bff9d6f249f0.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/bb31d203-8ec6-48fe-b348-35ad54040e38.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-32302794/original/41a1d6a4-0c21-43ce-b31d-c522c7ccb3de.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-32302794/original/92316e7e-5098-402f-b664-6c30eb985028.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52904382/original/4d769e69-bffb-423d-b069-ac5738f72d1f.png?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52904382/original/5044b7ab-9d49-4e06-bf59-5a1fcc261598.png?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52904382/original/0513391e-8965-409c-8363-8aef57b7173d.png?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52904382/original/c6364010-6399-4a22-99d9-bec190f416cc.png?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52904382/original/0772dd51-dcfc-4af4-8866-172995631434.png?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/058b72bc-d074-4034-9783-b09e768b3914.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/058b72bc-d074-4034-9783-b09e768b3914.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/1202f2be-1e1c-4fa1-8d7e-b6da558b8dc3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/25efcb07-2ac7-4b37-8208-499164e486c8.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/2b2aa201-7f6f-4e98-9e4b-19237fb99bf0.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/56467892-0d23-4ab1-8302-9c3d0d5e52cd.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/e973414d-670a-495c-9c10-9c5b7c50d46c.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/6342fa90-e175-442a-abd3-79d0b2e89f10.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/de1a5925-d8f6-4f31-8008-967c0a19562a.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/79982256-5f9e-4aa7-8bab-cab61a042369.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-675570005231381858/original/1d65a420-e700-4219-9b29-3a02bd142e25.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-675570005231381858/original/45d529d8-f6dd-4396-8d1e-980e94805d48.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-675570005231381858/original/a9665e56-9019-4ef5-b6f2-4141e1aad69b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-675570005231381858/original/7d97f2b6-337f-44c3-8260-843e9b13c9d0.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-675570005231381858/original/60a25a7f-eae0-4b01-af6c-d5648fe410d3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-36767861/original/ffcc6215-0b1c-4e8c-b2e0-473b3c801014.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-36767861/original/3c56533f-5eee-4ac5-b9f2-bf4552ace4bf.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/c278171f-45be-4ff6-803a-7aa6a76c373b.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/b0a6016f-ca09-4b4e-a2a3-de9a4bb8faa7.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/151debe0-c41a-4d2b-8bae-0a6ee23e470c.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/49732403/06cb9f75_original.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/49732535/7a435002_original.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/a24cdd11-174c-4cd1-8559-fd1dbaae2bd6.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/bd26c971-a149-41d7-9a51-53962cb89d52.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/90b99fe5-8132-4dd6-a2ad-308b2dee7458.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33550216/original/cb01ffca-2f89-46c4-b561-588666f89115.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33550216/original/88930db1-c1e0-4518-b31c-d2fc98e367a3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33550216/original/882d8fd0-b841-47fe-b48a-36f8824aa72e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33550216/original/67f6040a-7dea-4338-b8c6-20555485ecff.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33550216/original/2d5855db-d6bc-4a03-80a9-1dc4c5eeb4a6.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/2e0cef39-e4dc-4c40-b221-516e4a3ce6a1.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51767001/original/51a7363f-02fa-4bc2-8abd-d624859f15af.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51767001/original/e420eab1-a2af-4fe6-9599-03ccc759bf6c.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51767001/original/21ad6950-389f-4ec4-be0d-bebcdb13c08e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51767001/original/8beb9079-2685-458b-a663-10585be4e809.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49361427/original/ee8f70b8-e88a-4ac9-8514-9e2acedae588.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49361427/original/5c043e4f-ceda-41aa-b8f8-02d89d897ac5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49361427/original/31aa4c55-7d2e-48c8-919e-6da38c847316.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49361427/original/a8e7f8a8-ccdf-465b-89cc-63bb27f9b322.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49361427/original/7b9cf16b-86f6-4485-9b9a-5b9ddd6642e0.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/4f644801-8d9c-416c-a9b4-db2abe329435.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/1b8c63da-b4bf-4b09-8b64-6c3bedbcd85e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/d29f6d68-fb0d-433d-bf16-f3e94d57e88e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/baeb8ab4-8d54-4c10-8fe5-cb74172cfa48.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/3e8c9c68-1549-454e-acbf-46d20680699c.jpg?im_w=720",
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
