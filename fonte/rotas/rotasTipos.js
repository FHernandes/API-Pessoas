const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Tipo = require('../esquemas/esquemaTipo');

// get para /tipos 
router.get('/', (req, res) => {
    res.status(300).json({
        message: "It works!"
    });
});

// GET tipo por id
router.get('/carregar/:id', (req, res) => {
    const id = req.params.id;
    Tipo.findOne({_id: id})
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

// POST para /tipos/adicionar
router.post('/adicionar', (req, res) => {
   const tipo = new Tipo({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome
    });

    tipo
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// DELETE por id proprietario e id produto
router.delete('/deletar/:id', (req, res) => {
    const id = req.params.id;
    Tipo.deleteOne(
        {
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

// PATCH por id do produto
router.patch('/alterar/:id', (req, res) => {
    const id = req.params.id; 
    const nome = req.body.nome;
    Tipo.update({_id: id}, { $set: {nome: nome}})
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