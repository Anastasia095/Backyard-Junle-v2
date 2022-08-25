const router = require('express').Router()
const { Comment, User, Post, Collection, Plants } = require('../../models')
const withAuth = require('../../utils/auth')

///THIS IS GETTING THE POSTS
router.get('/', withAuth, async (req, res,) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.session.user_id
          }
        }
      ]
    })

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    })

    const user = userData.get({ plain: true })
    // Serialize data so the template can read it
    const post = postData.map((post) => post.get({ plain: true }));
    const collectionData = await Collection.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Plants,
        }
      ]
    });

    // Serialize data so the template can read it
    const collection = collectionData.map((collection) => collection.get({ plain: true }));
    let cplants = [];
    let uID = req.session.user_id;
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].user_id == uID) {
        cplants[i] = collection[i].plant;
      }
    }
    if (cplants.length == 0) {
      res.render('profile-dashboard', {
        layout: 'main',
        post,
        ...user,
        logged_in: req.session.logged_in
      });
    } else {
      res.render('profile-dashboard', {
        layout: 'main',
        post,
        ...user,
        cplants,
        logged_in: req.session.logged_in
      });
    }

  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("weird redirect test!")
  if (req.session.logged_in) {
    res.redirect('/api/profile')
    return
  }
  res.status(200)

})

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id)
    if (!userData) {
      res.status(404).json({ message: 'No user with this username!' })
      return
    }
    const user = userData.get({ plain: true })
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router