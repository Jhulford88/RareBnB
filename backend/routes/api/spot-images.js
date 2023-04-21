const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();





router.delete('/:imageId', requireAuth, async (req, res) => {
    const {user} = req;

    const booking = await Booking.findByPk(req.params.bookingId);

    const normalizedUser = user.toJSON();
    if (booking.userId !== normalizedUser.id) {
        return res.status(403).json({"message": "Forbidden"});
    };
})














module.exports = router;
