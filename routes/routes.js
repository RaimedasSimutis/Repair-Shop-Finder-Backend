const router = require("express").Router();
const userController = require('../user/userController.js');
const repairShopController = require('../repairShop/repairShopController')
const middleware = require('../middleware/middleware.js');


router.get('/', (req, res) => {
    res.json('API is working')
})

//user routes
router.post('/user/register', userController.register); 
router.get('/user/getAllUsers', userController.getAll);
router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.post('/user/login', userController.login);
router.get('/user/logout', middleware.authenticate, userController.logout)

//repair shops routes
router.get('/repairShops/getAll/:city', repairShopController.getAll);


module.exports = router;