const express = require('express')
const router = express.Router()
const validator = require('../middlewares/validator')
const homeController = require('../controllers/homeController')

router.get('/films', homeController.getAllEntries)
router.post('/film',validator.checkNewEntrie, homeController.addEntrie)


module.exports = router