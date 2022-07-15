const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth-routes");
const noAuthRoutes = require("./no-auth-routes");

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/', noAuthRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;