const express = require('express');
const router = express.Router();
const { SmoothieController } = require('../controller/index');

// router.get('/', () => {
//     smoothieController.Controller.getAll('BalancedFusions')
// });

router.get('/', (req, res, next) => {
    let controller = new SmoothieController('BalancedFusions')
    controller.getAllSmoothies(req, res, next)
});

router.get('/:id', (req, res, next) => {
    let controller = new SmoothieController('BalancedFusions')
    controller.getSingleSmoothie(req, res, next)
});

router.post('/', (req, res, next) => {
    let controller = new SmoothieController('BalancedFusions')
    controller.createSmoothie(req, res, next)
});

router.put('/:id', (req, res, next) => {
    let controller = new SmoothieController('BalancedFusions')
    controller.updateSmoothie(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    let controller = new SmoothieController('BalancedFusions')
    controller.deleteSmoothie(req, res, next)
});


module.exports = router;