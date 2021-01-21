const express = require('express');
const router = express.Router();
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const playerController = require('../controller/playerController');
const playerSchema = require('../apiSchema/playerSchema');

module.exports = router;

router.post('/Login', joiSchemaValidation.validateBody(playerSchema.Login),
playerController.Login
);

