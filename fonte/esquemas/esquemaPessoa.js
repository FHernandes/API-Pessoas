mongoose = require('mongoose')

const EsquemaPessoa = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    idProprietario: String,
    idUsuario: String,
    tipo: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Tipo'
        }
    ],
    nome: String,
    email: String,
    dataNascimento: String,
    enderecos: [
        {
            descricao: String,
            rua: String,
            numero: String,
            referencia: String,
            bairro: String,
            cidade: String,
            estado: String,
            cep: String,
            latitudeLongitude: String,
            principal: Boolean
        }
    ],
    telefones: [
        {
            tipo: String,
            ddd: String,
            numero: String
        }
    ],
    documentosPf: [
        {
            cpf: String,
            rg: String
        }
    ]
});

module.exports = mongoose.model('Pessoa', EsquemaPessoa);
