const Planet = require('../models/Planet');

const planetServices = {
    createPlanet(planetData) {
        return Planet.create(planetData);
    },
    getAll() {
        return Planet.find();
    },
    getById(planetId) {
        return Planet.findById(planetId);
    },
    updatePlanet(planetId, updateData) {
        return Planet.findByIdAndUpdate(planetId, updateData, { runValidators: true });
    },
    deletePlanet(planetId) {
        return Planet.findByIdAndDelete(planetId);
    }
}

module.exports = planetServices;