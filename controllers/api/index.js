const router = require('express').Router();
const XRoutes = require('./XRoutes');
const YRoutes = require('./YrojectRoutes');

router.use('/X', XRoutes);
router.use('/Y', YRoutes);

module.exports = router;
