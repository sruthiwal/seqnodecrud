const express = require('express')
const router = express.Router();
const controller = require('../controller/person');
router.post('/person',controller.create);
router.get('/:id',controller.findById);
router.put('/:id',controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;