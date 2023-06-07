const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  nomeTeste: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  quantidadeAcertos: {
    type: Number,
    required: true,
  },
});

const Resultado = mongoose.model("Resultado", resultadoSchema);

module.exports = Resultado;
