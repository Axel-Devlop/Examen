const { body } = require('express-validator')

exports.checkNewEntrie = [
    body('movieId').notEmpty().withMessage('Ne doit pas être vide'),
    // body("dateDay").isArray({min : 2 , max : 2}).withMessage('Format de date incorrect')
    
]