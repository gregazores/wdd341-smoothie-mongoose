const express = require('express');
const router = express.Router();
const { OrderController } = require('../controller/index');

// router.get('/', () => {
//     smoothieController.Controller.getAll('BalancedFusions')
// });




router.post('/', (req, res, next) => {
    if (req.isAuthenticated()){
        let controller = new OrderController('orders')
        controller.createOrder(req, res, next)
      } else {
        res.status(400).json("Sorry you must be logged in! No authorization");
      }

});

router.get('/:id', (req, res, next) => {
    if (req.isAuthenticated()){
      let controller = new OrderController('orders')
      controller.getOrder(req, res, next)
    } else {
      res.status(400).json("Sorry you must be logged in! No authorization");
    }


});




module.exports = router;