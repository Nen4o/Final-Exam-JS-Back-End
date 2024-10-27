const router = require('express').Router();
const planetServices = require('../services/planetServices');

router.route('/planet/create')
    .get((req, res) => {
        if (!res.user) {
            return res.redirect('/404');
        }

        res.render('planet/create');
    })
    .post(async (req, res) => {
        const planetData = req.body;
        planetData.owner = res.user._id;
        try {
            await planetServices.createPlanet(planetData);
            res.redirect('/planet/catalog');
        } catch (err) {
            const errorMessage = Object.values(err.errors).at(0)?.message;
            res.render('planet/create', { error: errorMessage, planetData });
        }
    })

router.get('/planet/catalog', async (req, res) => {

    try {
        const planets = await planetServices.getAll().lean();
        res.render('planet/catalog', { planets });
    } catch (err) {
        console.log(err);
    }
})

router.get('/planet/details/:planetId', async (req, res) => {
    const planetId = req.params.planetId;
    const userId = res.user?._id;
    try {
        const planet = await planetServices.getById(planetId).lean();
        const isOwner = planet.owner == userId;
        const isLiked = planet.likedList.find(usersId => usersId == userId);

        res.render('planet/details', { planet, isOwner, isLiked })
    } catch (err) {
        console.log(err);
    }
})

router.get('/planet/like/:planetId', async (req, res) => {
    if (!res.user) {
        return res.redirect('/404');
    }
    const planetId = req.params.planetId;
    const userId = res.user._id;
    try {
        const planet = await planetServices.getById(planetId);
        const isLiked = planet.likedList.find(usersId => usersId == userId);

        if (isLiked || userId == planet.owner) {
            return res.redirect('/404');
        }
        planet.likedList.push(userId);

        await planetServices.updatePlanet(planetId, planet);

        res.redirect(`/planet/details/${planetId}`);
    } catch (err) {
        console.log(err);

    }
})

router.get('/planet/delete/:planetId', async (req, res) => {
    const planetId = req.params.planetId;

    try {
        const planet = await planetServices.getById(planetId);

        if (planet.owner != res.user?._id) {
            return res.redirect('/404');
        }
        await planetServices.deletePlanet(planetId);
        res.redirect('/planet/catalog');
    } catch (err) {
        console.log(err);
    }
})

router.route('/planet/edit/:planetId')
    .get(async (req, res) => {
        const planetId = req.params.planetId;
        try {
            const planetData = await planetServices.getById(planetId).lean();
            if (planetData.owner != res.user?._id) {
                return res.redirect('/404');
            }
            res.render('planet/edit', { planetData })
        } catch (err) {
            console.log(err);
        }
    })
    .post(async (req, res) => {
        const planetId = req.params.planetId;
        const planetData = req.body;
        try {
            await planetServices.updatePlanet(planetId, planetData);
            res.redirect(`/planet/details/${planetId}`);
        } catch (err) {
            const errorMessage = Object.values(err.errors).at(0)?.message;
            res.render('planet/edit', { error: errorMessage, planetData });
        }
    })

router.get('/planet/search', async (req, res) => {
    const query = req.query;
    try {
        let planets = await planetServices.getAll().lean();


        if (query.name) {
            planets = planets.filter(planet => planet.name.toLowerCase().includes(query.name.toLowerCase()))
        }

        if (query.solarSystem) {
            planets = planets.filter(planet => planet.solarSystem.toLowerCase().includes(query.solarSystem.toLowerCase()))
        }

        res.render('planet/search', { planets, query })
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;