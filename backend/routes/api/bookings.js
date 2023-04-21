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
        delete booking.Spot.createdAt;
        delete booking.Spot.updatedAt;
        delete booking.Spot.description;

    });

    res.json({"Bookings":normalizedBookings})
});

//Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    };

    const { user } = req;
    const normalizedUser = user.toJSON();
    if (booking.userId !== normalizedUser.id) {
        res.status(403).json({"message": "Forbidden"});
    };

    let allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    });


    let currentEnd = booking.endDate.toDateString();
    let currentEndObj = new Date(currentEnd);
    let currentEndEpoch = currentEndObj.getTime();

    if (currentEndEpoch < Date.now()) {
        return res.status(404).json({"message": "Past bookings can't be modified"})
    };

    let { startDate, endDate } = req.body;

    let reqStartObj = new Date(startDate);
    let reqEndObj = new Date(endDate);
    let reqStartTime = reqStartObj.getTime();
    let reqEndTime = reqEndObj.getTime();

    if (reqStartTime >= reqEndTime) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        });
    };

    let bookingsList = [];

    allBookings.forEach(booking => {
        bookingsList.push(booking.toJSON())

    });

    for (let booking of bookingsList) {
        let start = booking.startDate.toDateString();
        let end = booking.endDate.toDateString();
        let startD = new Date(start);
        let endD = new Date(end);
        let startBookedTime = startD.getTime();
        let endBookedTime = endD.getTime();

        if (reqStartTime >= startBookedTime && reqStartTime <= endBookedTime) {

            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "startDate": "Start date conflicts with an existing booking"
                }
            });

        };

        if (reqEndTime >= startBookedTime && reqEndTime <= endBookedTime) {

            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "endDate": "End date conflicts with an existing booking"
                }
            });
        };
    };

    const editedBooking = await booking.update({
                startDate,
                endDate
            });

            res.json(editedBooking);

});





module.exports = router;
