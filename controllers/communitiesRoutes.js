const router = require('express').Router();
const { Plants, Category } = require('../models');

router.get('/', async (req, res) => {
    const categoryData = await Category.findAll();
        const categories = categoryData.map((category) => category.get({ plain: true }));
        console.log(categories)
        res.render('communities', { layout: 'main', categories });
      });

module.exports = router;