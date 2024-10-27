const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const planetController = require('./controllers/planetController');

router.use(planetController)
router.use(homeController);
router.use(authController);

router.all('*', (req, res) => {
    res.redirect('/404');
})
module.exports = router;