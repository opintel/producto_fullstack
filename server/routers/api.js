// Import 
const express = require('express');

// Creating Router
const router = express.Router();

// Importing controller
const layer = require('../controllers/layerController')

// Get route and middleware controller function
router.get('/layers/layer', layer.getGeojson)

// Export  
module.exports = router;
