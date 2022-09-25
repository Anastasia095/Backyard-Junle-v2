const router = require('express').Router();
const { Plants, Collection } = require('../../models');
const withAuth = require('../../utils/auth')
const { Op } = require("sequelize");
const fetch = require('node-fetch');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("a508546002aaddab686e3ca16a67b774e423d7c4721da73a71d89bd8effaf696");

//options for image api
const apiKey = 'AIzaSyAOMapkVritaEyTjG9qlmwvX5q_CjvsrX4';
const searchEID = '41f8fc9ff288c4c86';

//figure out in what format to pass in data and test if teh query actually works, also need || && separate properties one of the names might not match the search string
// router.get('/', withAuth, async (req, res) => {
router.get('/', withAuth, async (req, res) => {
  try {
    const plantData = await Plants.findAll({
      where: {
        [Op.or]: [{
          Scientific_Name: {
            [Op.like]: `%${req.query.plant}`
          }
        },

        {
          Common_Name: {
            [Op.like]: `%${req.query.plant}`
          }
        }

        ]
      },
      limit: 15
    });
    // Serialize data so the template can read it
    const plants = plantData.map((plant) => plant.get({ plain: true }));
    if (plants.length == 0) {
      res.status(400).json(err);
    }
    else if (plants[0].img_url == "") {
      const params = {
        engine: "yandex_images",
        text: plants[0].Common_Name,
        yandex_domain: "yandex.ru"
      };

      const callback = function (data) {
        plants[0]['img_url'] = data["images_results"][0].thumbnail;
        Plants.update(
          { img_url: data["images_results"][0].thumbnail },
          { where: { id: plants[0].id } }
        )
        res.render('profile-dashboard', { layout: 'main', plants, logged_in: req.session.logged_in });
      };

      // Show result as JSON
      search.json(params, callback);
    }
    else {
      res.render('profile-dashboard', { layout: 'main', plants, logged_in: req.session.logged_in });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/add', withAuth, async (req, res) => {
  try {
    const collectionAdd = await Collection.create({
      plant_id: req.body.plant_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(collectionAdd);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/remove',  async (req, res) => {
  console.log("receiveed");
  console.log(req.body.plant_id);
  try {
    const collectionRemove = await Collection.destroy({
      where: {
        plant_id: req.body.plant_id
      }
    });

    res.status(200).json(collectionRemove);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;