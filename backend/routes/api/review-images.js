const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Delete spot image
router.delete('/:imageId', requireAuth, async (req, res) => {

    //find review image by imageId
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    });

    //check that review image exists
    if (!reviewImage) {
        return res.status(404).json({ "message": "Review Image couldn't be found"});
    };

    //check authorization of user
    const {user} = req;
    const normalizedUser = user.toJSON();
    if (reviewImage.Review.userId !== normalizedUser.id) {
        return res.status(403).json({"message": "Forbidden"});
    };

    //delete review image
    await reviewImage.destroy();
    res.json({ "message": "Successfully deleted"})
});
















module.exports = router;
