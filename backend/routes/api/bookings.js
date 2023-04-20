const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            { model: Spot, include: [{ model: SpotImage }] },
        ]
    })

    let normalizedBookings = []
    bookings.forEach(booking => {
        normalizedBookings.push(booking.toJSON())
    });

    normalizedBookings.forEach(booking => {

        const images = booking.Spot.SpotImages

        images.forEach(image => {
            booking.Spot.previewImage = image.url
        })

        delete booking.Spot.SpotImages
        // delete review.Spot.SpotImages
        delete booking.Spot.createdAt;
        delete booking.Spot.updatedAt;
        delete booking.Spot.description;

        // const reviewImages = review.ReviewImages

        // reviewImages.forEach(image => {

        //     delete image.reviewId
        //     delete image.createdAt
        //     delete image.updatedAt

        // });
    });




    res.json({"Bookings":normalizedBookings})
})









module.exports = router;
