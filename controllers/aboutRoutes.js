const router = require('express').Router();
const { Plants } = require('../models');

router.get('/', async (req, res) => {
    res.render('about', {layout: 'main'});
})

module.exports = router;