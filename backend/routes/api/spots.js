const express = require('express');
const { Spot, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

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