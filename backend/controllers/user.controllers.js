const User = require("../models/User");
const usersControllers = {};

const jwt = require("jsonwebtoken");

usersControllers.sayHi = async (req, res) => {
  //console.log(req.decoded);
  res
    .status(200)
    .json({ message: "Tienes permiso de acceder a la informacion." });
};

usersControllers.signup = async (req, res) => {
  const { names, lastNames, address, email, password, role, file } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400).json({ message: "El usuario ya existe!" });
  } else {
    //console.log(role);
    const newUser = new User({
      names,
      lastNames,
      address,
      email,
      password,
      role,
      file,
    });
    await newUser.save();

    const token = jwt.sign({_id: newUser._id, email: newUser.email}, "patoa")

    res.status(201).json({message:"Usuario creado", token});
  }
};

usersControllers.signin = async (req, res) => {
  //escribimos en el formulario
  const { email, password } = req.body;

  //lo que me devuelve la base de datos
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Usuario no existe" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "La contraseña es incorrecta!" });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    "patoa"
  );

  res.status(200).json({ message: "Tu estas logueado correctamente", token });
};

usersControllers.getUsers = async (req, res) => {
  try {
    if (req.decoded.role !== 1) {
      res.status(401).send({ message: "No tienes permitida esta accion!" });
    } else {
      const Users = await User.find();
      res.status(200).send(Users);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Hubo un error" });
  }
};

usersControllers.actualizarUsuario = async (req, res) => {
  try {
    if (req.decoded.role !== 1) {
      res.status(401).send({ message: "No tienes permitida esta accion!" });
    } else {
      const { names, lastNames, address, email, password, role, file } =
        req.body;
      let user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "No existe el usuario" });
      } else {
        user.names = names;
        user.lastNames = lastNames;
        user.address = address;
        user.email = email;
        user.password = password;
        user.role = role;
        user.file = file;
        user = await User.findOneAndUpdate({ _id: req.params.id }, user, {
          new: true,
        });
        res.status(200).send(user);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

usersControllers.obtenerUsuario = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(401).send("El usuario no existe.");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send("Hubo un error");
  }
};

usersControllers.eliminarUsuario = async (req, res) => {
  try {
    if (req.decoded.role !== 1) {
      res.status(401).send({ message: "No tienes permitida esta accion!" });
    } else {
      let user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "No existe el juego" });
      }
      await User.findOneAndRemove({ _id: req.params.id });
      res.json({ message: "Usuario eliminado con éxito" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

module.exports = usersControllers;
