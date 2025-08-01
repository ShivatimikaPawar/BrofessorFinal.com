const ensureAuthenticated = require('../middlewares/auth');

 


const router = require('express').Router();



router.get('/',ensureAuthenticated, (req, res) => {
    res.send(200).json([
        {
            name: "mobile",
              price:1000
        },
        {
            name: "tv",
             price: 20000
        }
    ])
});

module.exports = router;