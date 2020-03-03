const express = require('express');
const router = express.Router();

const ckeckAuth = require('../middleware/check-auth');
const OrderController = require('../controllers/order');


router.get('/', ckeckAuth, OrderController.get_all_orders);
router.post('/', ckeckAuth, OrderController.create_new_order);
router.get('/:orderId', ckeckAuth, OrderController.get_order_by_id);
router.delete('/:orderId', ckeckAuth, OrderController.remove_order_by_id);

module.exports = router;