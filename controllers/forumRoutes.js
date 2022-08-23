const router = require('express').Router();
const { Post, User, Category } = require('../models');
const withAuth = require('../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      type: req.body.type,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/title', async (req, res) => {
  try{ 
    const categoryData = await Category.findAll(
      {where: {title: req.query.title},
      include: [{model:Post}]
     },
      )
    const categories = categoryData.map((category) => category.get({ plain: true }))
    let cposts = categories[0].posts;
    res.render('specific-forum', { layout: 'main', categories, cposts })
    res.status(200)
  } catch (err) {
    res.status(500).json(err)
  }

});


module.exports = router;