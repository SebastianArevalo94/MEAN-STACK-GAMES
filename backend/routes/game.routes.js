const { Router } = require('express');
const gameController = require('../controllers/game.controllers');
const router = Router();
const tokenFunctions = require('../middlewares/verifyToken')

router.post("/crear", tokenFunctions.verifyToken, gameController.crearJuego);
router.get('/getAll', tokenFunctions.verifyToken, gameController.obtenerJuegos);
router.put('/editar:id', tokenFunctions.verifyToken, gameController.actualizarJuego);
router.get('/:id', tokenFunctions.verifyToken, gameController.obtenerJuego);
router.delete('/:id', tokenFunctions.verifyToken, gameController.eliminarJuego);


module.exports = router;