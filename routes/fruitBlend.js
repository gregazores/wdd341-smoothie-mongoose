const express = require('express');
const router = express.Router();
const { SmoothieController } = require('../controller/index');

// router.get('/', () => {
//     smoothieController.Controller.getAll('BalancedFusions')
// });

router.get("/fruitblend-protected", (req, res, next) => {
    if (req.isAuthenticated()){
      res.send("This request is authenticated");
    } else {
      res.status(400).json("Sorry you must be logged in! No authorization");
    }
});


router.get('/', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.getAllSmoothies(req, res, next)
});

router.get('/:id', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.getSingleSmoothie(req, res, next)
});

router.post('/', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.createSmoothie(req, res, next)
});

router.put('/:id', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.updateSmoothie(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.deleteSmoothie(req, res, next)
});



module.exports = router;