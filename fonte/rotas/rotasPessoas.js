const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Pessoa = require('../esquemas/esquemaPessoa');

// get para /pessoas 
router.get('/', (req, res) => {
    res.status(300).json({
        message: "It works!"
    });
});

// GET pessoa por id
router.get('/carregar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id;
    Pessoa.findOne({idProprietario: idProprietario, _id: id})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// GET LISTAR
router.get('/listar/:idProprietario', (req, res) => {
    const idProprietario = req.params.idProprietario;
    Pessoa.find({idProprietario: idProprietario})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// POST para /pessoas/adicionar
router.post('/adicionar', (req, res) => {
   const pessoa = new Pessoa({
        _id: mongoose.Types.ObjectId(),
        idProprietario: req.body.idProprietario,
        idUsuario: req.body.idUsuario,
        tipo: req.body.tipo,
        nome: req.body.nome,
        email: req.body.email,
        enderecos: req.body.enderecos,
        telefones: req.body.telefones,
        documentosPf: req.body.documentosPf
    });

    pessoa
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// DELETE por id proprietario e id produto
router.delete('/deletar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id;
    Pessoa.deleteOne(
        {
            idProprietario: idProprietario,
            _id: id
        }
    )
    .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// UPDATE por id_proprietario e id pessoa
router.patch('/alterar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id; 
    const alteracoes = {};

    for(const [chave, valor] of Object.entries(req.body)){
        alteracoes[chave] = valor;
    }

    Pessoa.update({idProprietario: idProprietario, _id: id}, { $set: alteracoes})
    .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

module.exports = router;