let RolesController, express, router;

express = require('express');

router = express.Router();

RolesController = require('../app/controllers/RolesController');

router.get('/', RolesController.index);

module.exports = router;
