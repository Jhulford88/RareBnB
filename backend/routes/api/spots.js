const express = require('express');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

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

})

//get all spots and include preview images and average ratings
router.get('', async (req, res) => {

    const spots = await Spot.findAll({
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










module.exports = router;



// const normalizeSpots = (spots) => {
//     let spotsList = [];

//     spots.forEach(spot => {
//         spotsList.push(spot.toJSON())
//     })

//     spotsList.forEach(spot => {
//         let sum = 0;
//         spot.Reviews.forEach(review => {
//             sum += review.stars
//         })
//         spot.avgRating = sum / spot.Reviews.length

//         delete spot.Reviews
//     })

//     spotsList.forEach(spot => {
//         spot.SpotImages.forEach(image => {
//             if (image.preview === true) {
//                 spot.previewImage = image.url
//             }
//         })
//         if (!spot.previewImage) {
//             spot.previewImage = 'No preview image found'
//         }

//         delete spot.SpotImages
//     })

//     return spotsList
// }
