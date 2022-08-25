const router = require('express').Router();
const { Post, User, Category, Plants } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require('node-fetch');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("a508546002aaddab686e3ca16a67b774e423d7c4721da73a71d89bd8effaf696");

//added localStorage package to keep track of days
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function hasOneDayPassed() {
  var date = new Date().toLocaleDateString();
  console.log(date)
  if (localStorage.getItem("app_date") == date)
    return false;

  localStorage.setItem("app_date", date);
  localStorage.setItem("id", getRandomIntInclusive(1, 43776));
  return true;
}

function runOncePerDay() {
  if (!hasOneDayPassed()) {
    return localStorage.getItem("id");
  }
  return localStorage.getItem("id")
}



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
  try {
    runOncePerDay()
    const categoryData = await Category.findAll(
      {
        where: { title: req.query.title },
        include: [
          {
            model: Post,
            include: User
          },
        ]
      },
    )
    const categories = categoryData.map((category) => category.get({ plain: true }))
    let cposts = categories[0].posts;
    console.log(cposts);


    const randomPlantData = await Plants.findAll(
      {
        where: {
          id: runOncePerDay()
        }
      }
    );

    const randomPlant = randomPlantData.map((randomPlant) => randomPlant.get({ plain: true }));
    if (randomPlant[0].img_url == "") {
      const params = {
        engine: "yandex_images",
        text: randomPlant[0].Common_Name,
        yandex_domain: "yandex.ru"
      }
      const callback = function (data) {
        randomPlant[0]['img_url'] = data["images_results"][0].thumbnail;
        Plants.update(
          { img_url: data["images_results"][0].thumbnail },
          { where: { id: randomPlant[0].id } }
        )
        res.render('specific-forum', { layout: 'main', categories, cposts, randomPlant, logged_in: req.session.logged_in })
      };
      // Show result as JSON
      search.json(params, callback);
    } else {
      res.render('specific-forum', { layout: 'main', categories, cposts, randomPlant })
    }

  } catch (err) {
    res.status(500).json(err)
  }

});


module.exports = router;