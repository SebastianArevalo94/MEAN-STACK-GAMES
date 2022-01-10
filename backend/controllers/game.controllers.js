const juegoControllers = {};
const Juego = require("../models/Game");

//Post Method -- /crear
exports.crearJuego = async (req, res) => {
  try {
    if (req.decoded.role !== 1) {
      res.status(401).send({ message: "No tienes permitida esta accion!" });
    } else {
      let juego;
      //Crear el juego
      juego = new Juego(req.body);
      await juego.save();
      res.status(201).send(juego);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Hubo un error" });
  }
};

//Get Method -- /getAll
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.status(200).send(juegos);
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

//Put Method -- /editar:id
exports.actualizarJuego = async (req, res) => {
  try {
    if (req.decoded.role !== 1) {
      res.status.send("No tienes permitida esta accion.");
    } else {
      const { nombre, clasificacion, genero, plataforma, precio, file } =
        req.body;
      let juego = await Juego.findById(req.params.id);

      if (!juego) {
        res.status(404).json({ message: "No existe el juego" });
      } else {
        juego.nombre = nombre;
        juego.clasificacion = clasificacion;
        juego.genero = genero;
        juego.plataforma = plataforma;
        juego.precio = precio;
        juego.file = file;
        juego = await Juego.findOneAndUpdate({ _id: req.params.id }, juego, {
          new: true,
        });
        res.status(201).send(juego);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Get Method -- /:id
exports.obtenerJuego = async (req, res) => {
  try {
    let juego = await Juego.findById(req.params.id);

    if (!juego) {
      res.status(404).send({ message: "No existe el juego" });
    }
    res.status(200).send(juego);
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

//Delete Method -- /:id
exports.eliminarJuego = async (req, res) => {
  try {
    if (req.decoded.role !== 1) {
      res.status(401).send({ message: "No tienes permitida esta accion!" });
    } else {
      let juego = await Juego.findById(req.params.id);

      if (!juego) {
        res.status(404).json({ message: "No existe el juego" });
      }
      await Juego.findOneAndRemove({ _id: req.params.id });
      res.status(201).send({ message: "Producto eliminado con éxito" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
