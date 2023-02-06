const{Router}= require('express')
const{getEvents,createEvents,updateEvents,deleteEvent}=require('../controllers/events')
const{ validarJWT } = require('../middlewares/validar-jwt')
const{validarCampos}= require('../middlewares/validar-campos')
const{check}= require('express-validator')
const{isDate}= require('../helpers/isDate')

const router = Router()
//Todas las rutas tienen q pasar por este middleware
router.use(validarJWT)

router.get('/', getEvents)

router.post(
'/',
[
   check('title',"this field is obligatory").not().isEmpty(),
   check('start',"start date is obligatory field").custom(isDate),
   check('end',"start date is obligatory field").custom(isDate),
   validarCampos
]
, 
createEvents)

router.put('/:id', updateEvents)

router.delete('/:id', deleteEvent)
module.exports = router;