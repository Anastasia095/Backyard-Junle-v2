const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')


// router.post('/', withAuth, async (req, res) => {
  router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', withAuth, async (req, res) => {
  router.put('/:id', async (req, res) => {  
  try {
    const commentData = await Comment.update({ 
      title: req.body.title ,
      content: req.body.content ,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;