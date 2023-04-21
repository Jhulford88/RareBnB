const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();




//Delete spot image
router.delete('/:imageId', requireAuth, async (req, res) => {

    //find spot image by imageId
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot
        }
    });

    //check that spot image exists
    if (!spotImage) {
        return res.status(404).json({ "message": "Spot Image couldn't be found"});
    };

    //check authorization of user
    const {user} = req;
    const normalizedUser = user.toJSON();
    if (spotImage.Spot.ownerId !== normalizedUser.id) {
        return res.status(403).json({"message": "Forbidden"});
    };

    //delete spot image
    await spotImage.destroy();
    res.json({ "message": "Successfully deleted"})
});














module.exports = router;
