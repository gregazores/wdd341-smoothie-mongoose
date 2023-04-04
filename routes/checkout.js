const express = require('express');
const router = express.Router();
const { OrderController } = require('../controller/index');

// router.get('/', () => {
//     smoothieController.Controller.getAll('BalancedFusions')
// });




router.post('/', (req, res, next) => {
    let controller = new OrderController('orders')
    controller.createOrder(req, res, next)
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