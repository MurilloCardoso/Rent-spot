const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users= mongoose.model("users", resultadoSchema);

module.exports =Users;
