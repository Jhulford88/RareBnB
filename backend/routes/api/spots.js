const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {Op} = require("sequelize");


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


const validateNewSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
];

//Get all bookings for a spot based on the spots ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
             model: User
         }
    });

    if (!spot) {
        res.status(404).json({"message": "Spot couldn't be found"})
    };

    const {user} = req;
    let normalizedUser = user.toJSON();

    let normalizedBookings = [];
    bookings.forEach(booking => {
        normalizedBookings.push(booking.toJSON());
    });

    if (spot.ownerId !== normalizedUser.id) {
        const notOwnerObj = {};
        normalizedBookings.forEach(booking => {
            notOwnerObj.spotId = booking.spotId;
            notOwnerObj.startDate = booking.startDate;
            notOwnerObj.endDate = booking.endDate;
        });
        res.json({"Bookings":notOwnerObj})
    } else {
        normalizedBookings.forEach(booking => {
            delete booking.User.username;
        });
        res.json({"Bookings":normalizedBookings})
    };

});



//Get all Reviews by a Spot's ID
router.get('/:spotId/reviews', async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: ReviewImage
            },
            {
                model: User
            }
        ]
    });

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.statusCode = 404;
        res.json({"message": "Spot couldn't be found"})
    }

    let reviewList = [];

    reviews.forEach(review => {
        reviewList.push(review.toJSON())
    });

    reviewList.forEach(review => {
        review.ReviewImages.forEach(image => {
            delete image.reviewId;
            delete image.createdAt;
            delete image.updatedAt;
        });
        delete review.User.username;
    });


    res.json({"Reviews": reviewList})
});


//get all spots owned by the current user  req.user.id
router.get('/current', requireAuth, async (req, res) => {

    const spots = await Spot.findAll({
        where: {
          ownerId: req.user.id
        },
        include: [
        { model: Review },
        { model: SpotImage }
    ]
    });

    let spotList = []

    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
        })
        spot.avgRating = sum / spot.Reviews.length

        delete spot.Reviews
    })


    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No image found'
        }
        delete spot.SpotImages
    })


    res.json(spotList)

});


//get details of a spot from an ID
router.get('/:spotId', async (req, res) =>{

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {model: Review},
            {model: SpotImage},
            {model: User, as: "Owner"}
        ]
    });

    if (!spot) {
        res.statusCode = 404;
        res.json({message: "Spot couldn't be found"})
    }

    let normalizedSpot = spot.toJSON();

    let sum = 0;
        normalizedSpot.Reviews.forEach(review => {
            sum += review.stars
        })
        normalizedSpot.avgRating = sum / normalizedSpot.Reviews.length
        normalizedSpot.numReviews = normalizedSpot.Reviews.length
        delete normalizedSpot.Reviews


        normalizedSpot.SpotImages.forEach(image => {
            delete image.spotId
            delete image.createdAt
            delete image.updatedAt
        });

        delete normalizedSpot.Owner.username



    res.json(normalizedSpot)

});


//get all spots
router.get('', async (req, res) => {
    // Parse the page and size from the request's query parameters
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;


    let query = {
        where: {},
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    }
    //Pagination
    // Set default values for the page and size if not provided
    if (!page) page = 1;
    if (!size) size = 20;
    //convert provided values to number types
    page = parseInt(page);
    size = parseInt(size);
    //assign values to query object
    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    let errors = {};
    //Search Filters
    //verify page and size constraints
    if(size >= 1 && size <= 20) {
        query.limit = size
    } else {
        errors.page = "Page must be greater than or equal to 1 and less than or equal to 20"
    }
    if(page >= 1 && page <= 10) {
        query.offset = size * (page -1)
    } else {
        errors.size = "Size must be greater than or equal to 1 and less than or equal to 10"
    }

    //verify Lat constraints
    if(minLat && !maxLat) {
        if (minLat >= -90 && minLat <= 90) {
           query.where.lat = {[Op.gte]: minLat}
        } else {
            errors.minLat = "Minimum latitude is invalid"
        }
    };
    if (maxLat && !minLat) {
        if (maxLat >= -90 && maxLat <= 90) {
            query.where.lat = {[Op.lte]: maxLat}
        } else {
            errors.maxLat = "Maximum latitude is invalid"
        }
    };
    if(maxLat && minLat){
        if((minLat >= -90 && minLat <= 90) && (maxLat >= -90 && maxLat <= 90)) {
            query.where.lat ={[Op.between]: [minLat, maxLat]}
        } else {
            errors.minLat = "Minimum latitude is invalid";
            errors.maxLat = "Maximum latitude is invalid";
        }
    };

    //verify Lng constraints
    if (minLng && !maxLng) {
        if (minLng >= -180 && minLng <= 180) {
            query.where.lng = {[Op.gte]: minLng}
        } else {
            errors.minLng = "Maximum longitude is invalid"
        }
    };
    if (maxLng && !minLng) {
        if(maxLng >= -180 && maxLng <= 180) {
            query.where.lng = {[Op.lte]: maxLng}
        } else {
            errors.maxLng = "Minimum longitude is invalid"
        }
    };
    if(maxLng && minLng){
        if ((minLng >= -180 && minLng <= 180) && (maxLng >= -180 && maxLng <= 180)) {
            query.where.lng ={[Op.between]: [minLng, maxLng]}
        } else {
            errors.minLng = "Maximum longitude is invalid"
            errors.maxLng = "Minimum longitude is invalid"
        }
    };

    //verify prices constraints
    if (minPrice && !maxPrice) {
        if (minPrice >= 0) {
            query.where.price = {[Op.gte]: minPrice}
        } else {
            errors.minPrice = "Minimum price must be greater than or equal to 0"
        }
    };
    if (maxPrice && !minPrice) {
        if (maxPrice >= 0) {
            query.where.price = {[Op.lte]: maxPrice}
        } else {
            errors.maxPrice = "Maximum price must be greater than or equal to 0"
        }
    };
    if(maxPrice && minPrice){
        if (minPrice >= 0 && maxPrice >= 0) {
            query.where.price ={[Op.between]: [minPrice, maxPrice]}
        } else {
            errors.minPrice = "Minimum price must be greater than or equal to 0"
            errors.maxPrice = "Maximum price must be greater than or equal to 0"
        }
    };


    if (Object.keys(errors).length) {
        return res.status(400).json({"message": "Bad Request", "errors": errors})
    };


    const spots = await Spot.findAll(query);

    let spotList = []

    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
        })
        spot.avgRating = sum / spot.Reviews.length

        delete spot.Reviews
    })

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No image found'
        }
        delete spot.SpotImages
    });


    res.json({"Spots":spotList, page, size});

});


//Create a Booking from Spot based on the Spot's ID
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const {user} = req;
    const spot = await Spot.findByPk(req.params.spotId);
    //check if spot exists
    if (!spot) {
        res.json({"message": "Spot couldn't be found"})
    }

    //confirm spot does not belong to user
    let normalizedUser = user.toJSON();
    if (spot.ownerId === normalizedUser.id) {
        res.statusCode = 403;
        res.json({message: "Forbidden"})
    };

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    let normalizedBookings = [];
    bookings.forEach(booking => {
        normalizedBookings.push(booking.toJSON());
    });

    const {startDate, endDate} = req.body;

    let reqStartDateObj = new Date(startDate);
    let reqEndDateObj = new Date(endDate);
    let reqStartEpoch = reqStartDateObj.getTime();
    let reqEndEpoch = reqEndDateObj.getTime();

    if(reqStartEpoch >= reqEndEpoch) {
        return res.status(400).json({"message": "Bad Request",
        "errors": {
          "endDate": "endDate cannot be on or before startDate"
        }});
    };

    for (let booking of normalizedBookings) {
        let startDateString = booking.startDate.toDateString();
        let endDateString = booking.endDate.toDateString();
        let startDateObj = new Date(startDateString);
        let endDateObj = new Date(endDateString);
        let startEpoch = startDateObj.getTime();
        let endEpoch = endDateObj.getTime();

        if (reqStartEpoch >= startEpoch && reqStartEpoch <= endEpoch) {
            return res.status(403).json({"message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
              "startDate": "Start date conflicts with an existing booking"
              }
            })
        }
        if (reqEndEpoch >= startEpoch && reqEndEpoch <= endEpoch) {
            return res.status(403).json({"message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
                "endDate": "End date conflicts with an existing booking"
              }
            })
        }
    };

    const newBooking = await Booking.build(req.body);

    newBooking.spotId = req.params.spotId;
    newBooking.userId = user.id;


    await newBooking.save()


    res.json(newBooking);

});


//Add an image to a spot based on the spots ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    const {url, preview} = req.body;
    const {user} = req;

    let normalizedUser = user.toJSON();

    if (!spot) {
        res.statusCode = 404;
        res.json({message: "Spot couldn't be found"})
    };
    if (spot.ownerId !== normalizedUser.id) {
        res.statusCode = 403;
        res.json({message: "Forbidden"})
    };
    const newSpotImage = await SpotImage.create({
        spotId: spot.id,
        url: url,
        preview: preview
    });

    newSpotImageNormalized = newSpotImage.toJSON();

    delete newSpotImageNormalized.spotId;
    delete newSpotImageNormalized.updatedAt;
    delete newSpotImageNormalized.createdAt;

    res.json(newSpotImageNormalized)
});


//Create a Review for a Spot based on the Spot's ID
router.post('/:spotId/reviews', requireAuth, validateNewReview, async (req, res) => {

    const spotId = req.params.spotId
    const review = await Review.build(req.body)
    const spot = await Spot.findByPk(spotId)
    const existingReview = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    });
    if(existingReview) {
        res.status(500).json({"message": "User already has a review for this spot"})
    }
    if (!spot) {
        res.status(404).json({"message":"Spot couldn't be found"});
    }

    review.spotId = spotId;
    review.userId = req.user.id;

    await review.save();

    res.status(201).json(review);
});


//Create a spot
router.post('', requireAuth, validateNewSpot, async (req, res) => {
    const newSpot = await Spot.build(req.body)

    newSpot.ownerId = req.user.id

    await newSpot.save()

    res.json(newSpot)
});


//Edit a spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const {user} = req;

    let normalizedUser = user.toJSON();

    if (!spot) {
        res.statusCode = 404;
        res.json({message: "Spot couldn't be found"})
    };
    if (spot.ownerId !== normalizedUser.id) {
        res.statusCode = 403;
        res.json({message: "Forbidden"})
    };

    spot.address = address,
    spot.city = city,
    spot.state = state,
    spot.country = country,
    spot.lat = lat,
    spot.lng = lng,
    spot.name = name,
    spot.description = description,
    spot.price = price

    res.json(spot);

});


//Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    const {user} = req;

    let normalizedUser = user.toJSON();

    if (!spot) {
        res.statusCode = 404;
        res.json({message: "Spot couldn't be found"})
    };
    if (spot.ownerId !== normalizedUser.id) {
        res.statusCode = 403;
        res.json({message: "Forbidden"})
    };

    spot.destroy();
    res.json({message: "Successfully deleted"});
});



module.exports = router;
