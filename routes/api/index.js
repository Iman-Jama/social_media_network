const router = require('express').Router();
const userRoutes = require('./userController');
const thoughtRoutes = require('./thoughtsController');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
