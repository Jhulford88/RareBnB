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
      review: 'I had an amazing stay at this beautiful Airbnb in Washington state. From the moment I arrived, I was struck by the stunning views of the mountains and the peaceful atmosphere. The house itself was immaculate and filled with all the amenities I needed for a comfortable stay. The hosts were incredibly welcoming and went out of their way to ensure I had everything I needed. I especially loved the cozy fireplace and the comfortable bed, which made for a great night\'s sleep. Overall, I highly recommend this Airbnb to anyone looking for a peaceful and comfortable retreat in the beautiful state of Washington.',
      stars: 5
    },
    {
      spotId: 1,
      userId: 4,
      review: 'I recently stayed at this Airbnb in Washington state and was left feeling disappointed with my experience. While the location was convenient, the accommodations themselves left much to be desired. The space was cluttered and in need of a deep clean, and the furniture was outdated and uncomfortable. Additionally, the host was difficult to reach and unresponsive to my concerns. While the price was reasonable, I ultimately felt that the quality of the Airbnb did not match the cost. Overall, I would not recommend this Airbnb to others looking for a comfortable and hassle-free stay in Washington state.',
      stars: 2
    },
    {
      spotId: 1,
      userId: 5,
      review: 'I recently stayed at this Airbnb in Washington state and found it to be a decent option for the price. While the accommodations were not luxurious, they were clean and functional, and had all the amenities I needed for a comfortable stay. The host was friendly and responsive to my questions and concerns, which I appreciated. The location was also convenient, with easy access to nearby attractions and restaurants. Overall, while this Airbnb may not be the most glamorous option, it is a solid choice for travelers looking for a comfortable and budget-friendly stay in the area.',
      stars: 4
    },
    {
      spotId: 2,
      userId: 1,
      review: 'I recently had the pleasure of staying at this incredible Airbnb in Telluride, CO and I cannot recommend it highly enough. The location was absolutely perfect, with breathtaking views of the mountains and easy access to all the local attractions. The space itself was immaculate, with all the amenities one could ask for and more. The hosts were incredibly welcoming and went out of their way to make my stay as comfortable as possible. I especially loved the cozy fireplace and the comfortable bed, which made for a great night\'s sleep. Overall, if you\'re looking for a luxurious and unforgettable stay in Telluride, this Airbnb is the perfect choice.',
      stars: 5
    },
    {
      spotId: 2,
      userId: 6,
      review: 'My experience at this Airbnb in Telluride, CO was a mixed bag. While the location was excellent, with easy access to local shops and restaurants, I found the accommodations themselves to be lacking. The space was small and cramped, with outdated furnishings and minimal amenities. Additionally, the host was difficult to reach and did not provide clear instructions for accessing the Airbnb. While the price was reasonable, I ultimately felt that the quality of the Airbnb did not match the cost. Overall, while this Airbnb may be a decent option for travelers on a tight budget, I would not recommend it for those seeking a more comfortable and hassle-free stay in Telluride.',
      stars: 3
    },
    {
      spotId: 2,
      userId: 5,
      review: 'I recently stayed at this Airbnb in Telluride, CO and found it to be a disappointing experience overall. While the location was decent, with easy access to local attractions, the space itself was in need of some serious TLC. The furnishings were outdated and worn, and the cleanliness left much to be desired. Additionally, the host was unresponsive to my concerns and did not provide clear instructions for accessing the Airbnb. While the price may be attractive to budget-conscious travelers, I would caution against booking this Airbnb unless significant improvements are made. Overall, I would not recommend this Airbnb for those seeking a comfortable and enjoyable stay in Telluride.',
      stars: 2
    },
    {
      spotId: 3,
      userId: 2,
      review: 'My stay at this Airbnb in Vermont was absolutely delightful. The location was peaceful and serene, with stunning views of the surrounding mountains and countryside. The space itself was cozy and comfortable, with all the amenities I needed for a relaxing stay. The host was incredibly friendly and accommodating, going out of their way to ensure my comfort and happiness. I especially loved the outdoor hot tub, which provided the perfect way to unwind after a long day of hiking and exploring. Overall, I highly recommend this Airbnb to anyone looking for a peaceful and rejuvenating getaway in beautiful Vermont.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 4,
      review: 'While the location of this Airbnb in Vermont was beautiful, with lovely views of the surrounding countryside, I found the accommodations themselves to be lacking. The space was cramped and cluttered, with outdated furnishings and minimal amenities. Additionally, the host was difficult to reach and did not provide clear instructions for accessing the Airbnb. While the price was reasonable, I ultimately felt that the quality of the Airbnb did not match the cost. Overall, while this Airbnb may be a decent option for travelers on a tight budget, I would not recommend it for those seeking a more comfortable and hassle-free stay in Vermont.',
      stars: 4
    },
    {
      spotId: 3,
      userId: 5,
      review: 'My experience at this Airbnb in Vermont was a bit of a mixed bag. While the location was lovely and the space was clean and functional, I found the furnishings and amenities to be somewhat lacking. The bed was uncomfortable and the kitchen was poorly equipped, making it difficult to prepare meals. Additionally, the host was unresponsive to my questions and concerns, which left me feeling frustrated and unsupported. While the price was reasonable, I ultimately felt that I did not get my money\'s worth in terms of the quality of the Airbnb. Overall, while this Airbnb may be an acceptable option for some travelers, I would recommend exploring other options before booking here.',
      stars: 1
    },
    {
      spotId: 5,
      userId: 5,
      review: 'My stay at this Airbnb in Vermont was absolutely delightful. The location was peaceful and serene, with stunning views of the surrounding mountains and countryside. The space itself was cozy and comfortable, with all the amenities I needed for a relaxing stay. The host was incredibly friendly and accommodating, going out of their way to ensure my comfort and happiness. I especially loved the outdoor hot tub, which provided the perfect way to unwind after a long day of hiking and exploring. Overall, I highly recommend this Airbnb to anyone looking for a peaceful and rejuvenating getaway in beautiful Vermont.',
      stars: 5
    },
    {
      spotId: 5,
      userId: 4,
      review: 'While the location of this Airbnb in Vermont was beautiful, with lovely views of the surrounding countryside, I found the accommodations themselves to be lacking. The space was cramped and cluttered, with outdated furnishings and minimal amenities. Additionally, the host was difficult to reach and did not provide clear instructions for accessing the Airbnb. While the price was reasonable, I ultimately felt that the quality of the Airbnb did not match the cost. Overall, while this Airbnb may be a decent option for travelers on a tight budget, I would not recommend it for those seeking a more comfortable and hassle-free stay in Vermont.',
      stars: 4
    },
    {
      spotId: 5,
      userId: 5,
      review: 'My experience at this Airbnb in Vermont was a bit of a mixed bag. While the location was lovely and the space was clean and functional, I found the furnishings and amenities to be somewhat lacking. The bed was uncomfortable and the kitchen was poorly equipped, making it difficult to prepare meals. Additionally, the host was unresponsive to my questions and concerns, which left me feeling frustrated and unsupported. While the price was reasonable, I ultimately felt that I did not get my money\'s worth in terms of the quality of the Airbnb. Overall, while this Airbnb may be an acceptable option for some travelers, I would recommend exploring other options before booking here.',
      stars: 1
    },
    {
      spotId: 6,
      userId: 4,
      review: 'My stay at this Airbnb in Vermont was absolutely delightful. The location was peaceful and serene, with stunning views of the surrounding mountains and countryside. The space itself was cozy and comfortable, with all the amenities I needed for a relaxing stay. The host was incredibly friendly and accommodating, going out of their way to ensure my comfort and happiness. I especially loved the outdoor hot tub, which provided the perfect way to unwind after a long day of hiking and exploring. Overall, I highly recommend this Airbnb to anyone looking for a peaceful and rejuvenating getaway in beautiful Vermont.',
      stars: 5
    },
    {
      spotId: 6,
      userId: 5,
      review: 'While the location of this Airbnb in Vermont was beautiful, with lovely views of the surrounding countryside, I found the accommodations themselves to be lacking. The space was cramped and cluttered, with outdated furnishings and minimal amenities. Additionally, the host was difficult to reach and did not provide clear instructions for accessing the Airbnb. While the price was reasonable, I ultimately felt that the quality of the Airbnb did not match the cost. Overall, while this Airbnb may be a decent option for travelers on a tight budget, I would not recommend it for those seeking a more comfortable and hassle-free stay in Vermont.',
      stars: 4
    },
    {
      spotId: 6,
      userId: 6,
      review: 'My experience at this Airbnb in Vermont was a bit of a mixed bag. While the location was lovely and the space was clean and functional, I found the furnishings and amenities to be somewhat lacking. The bed was uncomfortable and the kitchen was poorly equipped, making it difficult to prepare meals. Additionally, the host was unresponsive to my questions and concerns, which left me feeling frustrated and unsupported. While the price was reasonable, I ultimately felt that I did not get my money\'s worth in terms of the quality of the Airbnb. Overall, while this Airbnb may be an acceptable option for some travelers, I would recommend exploring other options before booking here.',
      stars: 1
    },
    {
      spotId: 7,
      userId: 4,
      review: 'My stay at this Airbnb in Vermont was absolutely delightful. The location was peaceful and serene, with stunning views of the surrounding mountains and countryside. The space itself was cozy and comfortable, with all the amenities I needed for a relaxing stay. The host was incredibly friendly and accommodating, going out of their way to ensure my comfort and happiness. I especially loved the outdoor hot tub, which provided the perfect way to unwind after a long day of hiking and exploring. Overall, I highly recommend this Airbnb to anyone looking for a peaceful and rejuvenating getaway in beautiful Vermont.',
      stars: 5
    },
    {
      spotId: 7,
      userId: 5,
      review: 'While the location of this Airbnb in Vermont was beautiful, with lovely views of the surrounding countryside, I found the accommodations themselves to be lacking. The space was cramped and cluttered, with outdated furnishings and minimal amenities. Additionally, the host was difficult to reach and did not provide clear instructions for accessing the Airbnb. While the price was reasonable, I ultimately felt that the quality of the Airbnb did not match the cost. Overall, while this Airbnb may be a decent option for travelers on a tight budget, I would not recommend it for those seeking a more comfortable and hassle-free stay in Vermont.',
      stars: 3
    },
    {
      spotId: 7,
      userId: 6,
      review: 'My experience at this Airbnb in Vermont was a bit of a mixed bag. While the location was lovely and the space was clean and functional, I found the furnishings and amenities to be somewhat lacking. The bed was uncomfortable and the kitchen was poorly equipped, making it difficult to prepare meals. Additionally, the host was unresponsive to my questions and concerns, which left me feeling frustrated and unsupported. While the price was reasonable, I ultimately felt that I did not get my money\'s worth in terms of the quality of the Airbnb. Overall, while this Airbnb may be an acceptable option for some travelers, I would recommend exploring other options before booking here.',
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
