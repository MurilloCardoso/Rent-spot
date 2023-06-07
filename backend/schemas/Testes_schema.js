const mongoose = require('mongoose');

const TesteSchema = new mongoose.Schema({
  nomeTeste: String,
  autor: String,
  perguntas: [{
    pergunta: String,
    opcaoA: String,
    opcaoB: String,
    opcaoC: String,
    opcaoD: String,
    opcaoE: String,
    respostaCerta: String
  }]
});

const Teste = mongoose.model('Teste', TesteSchema);

module.exports = Teste;
