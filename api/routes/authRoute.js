const { Router } = require('express');
const AuthContoller = require('../controllers/authController')

const router = Router();

router
    .post('/auth/login', AuthContoller.login)

    
module.exports = router;