const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const ckeckAuth = require('../middleware/check-auth');


router.post('/signup', UserController.sign_up);

router.post('/login', UserController.sign_in);

router.delete('/:userId', ckeckAuth, UserController.delete_user_by_id);

module.exports = router;