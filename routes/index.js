var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Lab4. Oleksandr Popov. IT-z01. Variant 24 (4)'});
});

module.exports = router;
