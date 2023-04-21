const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//New review validator
const validateNewReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),
      handleValidationErrors
];


//get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;
    let normalizedUser = user.toJSON();

    const reviews = await Review.findAll({
        where: {
            userId: normalizedUser.id
        },
        include: [
            { model: User },
            { model: Spot, include: [{ model: SpotImage }] },
            { model: ReviewImage }
        ]
    });

    let reviewList = [];

    reviews.forEach(review => {
        reviewList.push(review.toJSON())
    });

    reviewList.forEach(review => {

        const images = review.Spot.SpotImages

        images.forEach(image => {
            review.Spot.previewImage = image.url
        })

        delete review.Spot.SpotImages
        delete review.Spot.createdAt
        delete review.Spot.updatedAt
        delete review.User.username

        const reviewImages = review.ReviewImages

        reviewImages.forEach(image => {

            delete image.reviewId
            delete image.createdAt
            delete image.updatedAt

        });
    });

    res.json({"Reviews": reviewList})

});


//Add an Image to a review based on the review's ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {


    let newImg = await ReviewImage.build(req.body);
    const existingReview = await Review.findByPk(req.params.reviewId);
    const existingImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    });

    if(!existingReview) {
        res.status(404).json({"message": "Review couldn't be found"})
    }
    newImg.toJSON();
    newImg.reviewId = req.params.reviewId;
    await newImg.save();


    const { user } = req;
    const normalizedUser = user.toJSON();
    if (existingReview.userId !== normalizedUser.id) {
        res.status(403).json({"message": "Forbidden"});
    }


    const normalizedImages = [];
    existingImages.forEach(image => {
        normalizedImages.push(image.toJSON());
    });
    if(normalizedImages.length >= 10) {
        res.status(403).json({"message": "Maximum number of images for this resource was reached"})
    }

    const resObj = {};
    resObj.id = newImg.id;
    resObj.url = newImg.url;


    res.json(resObj);

});


//Edit a review
router.put('/:reviewId', requireAuth, validateNewReview, async (req, res) => {
    const {review, stars} = req.body;
    const newReview = await Review.findByPk(req.params.reviewId);

    if(!newReview) {
        res.status(404).json({"message": "Review couldn't be found"})
    }

    newReview.review = review;
    newReview.stars = stars;

    res.json(newReview);
});


//Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const normalizedUser = user.toJSON();
    const review = await Review.findByPk(req.params.reviewId)

    if(!review) {
        res.statusCode(404);
        res.json({"message": "Review couldn't be found"});
    }

    if (review.userId !== normalizedUser.id) {
        res.statusCode(403);
        res.json({"message": "Forbidden"});
    }

    await review.destroy()


    res.json({"message": "Successfully deleted"})

})



module.exports = router;
