const { login, signup } = require('../Controllers/AuthController');
const { loginValidation, signUpValidation } = require('../Middlewares/AuthValidaton');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signUpValidation, signup);

module.exports = router;