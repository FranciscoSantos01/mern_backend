const {Router} = require('express');
const{check} = require('express-validator')
const {validarJWT}= require('../middlewares/validar-jwt')

const router = Router()
const{createUser, loginUser,revalidationToken}= require('../controllers/auth')
const{validarCampos}= require('../middlewares/validar-campos')

router.post(
'/new',
[//midlewares
    check('name',"el campo es obligatorio").not().isEmpty(),
    check('email', "el email es obligatorio").isEmail(),
    check('password', "debe tener una longitud de 6 caracteres").isLength({min: 6}),
    validarCampos
],
createUser)
router.post(
'/',
[//midlewares
check('email', "el email es obligatorio").isEmail(),
check('password', "debe tener una longitud de 6 caracteres").isLength({min: 6}),
validarCampos
],
loginUser )
router.get('/renew', validarJWT ,revalidationToken)


module.exports = router;