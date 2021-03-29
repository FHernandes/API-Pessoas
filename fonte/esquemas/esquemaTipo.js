mongoose = require('mongoose')

const EsquemaTipo = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    nome: String
});

module.exports = mongoose.model('Tipo', EsquemaTipo);
