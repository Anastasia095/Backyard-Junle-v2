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
  console.log(req.query.title)
  try{ 
    const categoryData = await Category.findAll(
      {where: {title: req.query.title},
      include: [{model:Post}]
     },
      )
    const categories = categoryData.map((category) => category.get({ plain: true }))
    let cposts = categories[0].posts;
  // for (var i = 0; i < categories.length; i++) {
  //     cposts[i] = categories[i].posts;
  // } 
    // console.log(categories[0].posts)
    console.log(cposts)
    // console.log(categories)
    res.render('specific-forum', { layout: 'main', categories, cposts })
    res.status(200)
  } catch (err) {
    res.status(500).json(err)
  }

});


module.exports = router;