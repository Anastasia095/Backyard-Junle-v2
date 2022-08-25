const router = require('express').Router();
const { Plants } = require('../models');

router.get('/', async (req, res) => {
    res.render('contact', { layout: 'main', logged_in: req.session.logged_in });
})

module.exports = router;