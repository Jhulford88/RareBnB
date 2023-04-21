const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();




















module.exports = router;
