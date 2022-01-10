const mongoose = require('mongoose');
const JuegoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    clasificacion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    plataforma: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Juego', JuegoSchema, 'juegos');