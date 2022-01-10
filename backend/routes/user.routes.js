const { Router } = require('express')
const usersControllers = require('../controllers/user.controllers')
const router = Router();
const tokenFunctions = require('../middlewares/verifyToken')

router.get('/', tokenFunctions.verifyToken, usersControllers.sayHi)
router.get('/getAll', tokenFunctions.verifyToken, usersControllers.getUsers)
router.get('/getOne:id', tokenFunctions.verifyToken, usersControllers.obtenerUsuario)
router.put('/update:id', tokenFunctions.verifyToken, usersControllers.actualizarUsuario)
router.post('/signup', usersControllers.signup)
router.post('/signin', usersControllers.signin)
router.delete('/delete:id', tokenFunctions.verifyToken, usersControllers.eliminarUsuario)

module.exports = router