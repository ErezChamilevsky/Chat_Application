const tokensController = require('../controllers/tokens');


const express = require('express');
var router = express.Router();


router.route('/').post(tokensController.creatToken);  //check if user exsist in DB and create token to login user

module.exports = router