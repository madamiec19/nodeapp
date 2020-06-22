const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling get requesst on moves"
    });
});

router.post('/', (req, res, next) => {

});

router.get('/:moveId', (req, res, next) =>{
    const id = req.params.moveID; 
});


router.delete('/:moveID', (req, res, next) =>{

});

module.exports = router