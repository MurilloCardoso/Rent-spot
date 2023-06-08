const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var localStorage = require('web-storage')().localStorage;
const { number } = require("yargs");

//===== IMPORT SCHEMA PARA NAO CHAMAR DUAS VEZES

const Testes = require('./schemas/Testes_schema'); // Importe o modelo Teste aqui
const Resultados=require("./schemas/Resultados_schema")// Importe o modelo Resultado aqui
const Users=require("./schemas/User_schema")// Importe o modelo Resultado aqui


app.use(
  cors({
    origin: "http://localhost:3000", // URL do React
  })
);
app.use(express.json());



// Middleware de autenticação
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, "seuSegredoDoToken", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Rota protegida
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acesso permitido" });
});

app.post("/login", async (req, res) => {
  try {
    await mongoose.connect("mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao servidor MongoDB");

    const {name, password } = req.body;

    let user = await Users.findOne({ name });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    var  isPasswordValid=false;
   if(password.toString() == user.password.toString()){
    isPasswordValid=true;
   }

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }
    const token = jwt.sign({ userId: user._id }, "seuSegredoDoToken");



    mongoose.connection.close();

    res.status(200).json({ message: "Login realizado com sucesso", token, nome: user.name });
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});


app.post("/inserirTeste",async(req,res)=>{
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado ao servidor MongoDB');

    const data = req.body; // Supondo que os dados a serem salvos estão no corpo da requisição

    // Salve os dados diretamente no banco de dados
    await mongoose.connection.db.collection('testes').insertOne(data);

    // Feche a conexão com o servidor MongoDB
    mongoose.connection.close();

    res.status(200).json({
      message: "Conexão estabelecida e operações realizadas com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});

app.post("/inserirUsuario", async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao servidor MongoDB");

    const { name, password } = req.body;

    const user = await Users.findOne({ name });

    if (user) {
      throw new Error("Usuário já existe");
    }

    // Crie um novo objeto User com os dados recebidos
    const newUser = new Users({ name, password });

    // Salve o novo usuário no banco de dados
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "seuSegredoDoToken");

    // Feche a conexão com o servidor MongoDB
    mongoose.connection.close();

    res
      .status(200)
      .json({ message: "Usuário cadastrado com sucesso", token, nome: name });
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});


app.post("/inserirResposta",async(req,res)=>{
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado ao servidor MongoDB');

    const data = req.body; // Supondo que os dados a serem salvos estão no corpo da requisição

    // Salve os dados diretamente no banco de dados
    await mongoose.connection.db.collection('resultados').insertOne(data);

    // Feche a conexão com o servidor MongoDB
    mongoose.connection.close();

    res.status(200).json({
      message: "Conexão estabelecida e operações realizadas com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});


app.get("/lerResultados", async (req, res) => {

  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("conectado banco");
    // Definir o esquema do documento
  
    // Realizar a leitura de todos os documentos na coleção "user"
    const users = await Resultados.find().exec();

    console.log("Documentos encontrados:", users);
    res.status(200).json(users); // Retornar os documentos como resposta

    // Fechar a conexão com o banco de dados após a leitura
    mongoose.connection.close();
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});
app.get("/lerTestesCriados", async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao banco de dados");
  
    // Realizar a leitura de todos os documentos na coleção "resultados"
    const users = await Testes.find().exec();

    console.log("Documentos encontrados:", users);
    res.status(200).json(users); // Retornar os documentos como resposta

    // Fechar a conexão com o banco de dados após a leitura
    mongoose.connection.close();
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});
app.get("/lerTeste/:id", async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao banco de dados");
   const id = req.params.id;
    // Realizar a leitura de todos os documentos na coleção "resultados"
    const teste = await Testes.findById(id);
    if (teste) {
      console.log("Documento encontrado:", teste);
      res.status(200).json(teste);
    } else {
      console.log("Nenhum documento encontrado com o ID fornecido.");
      res
        .status(404)
        .json({ error: "Nenhum documento encontrado com o ID fornecido." });
    }
    // Fechar a conexão com o banco de dados após a leitura
    mongoose.connection.close();
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});
app.delete("/deletarTeste/:id",async (req,res)=>{

  
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao banco de dados");
   const id = req.params.id;
    // Realizar a leitura de todos os documentos na coleção "resultados"
    const result = await Testes.deleteOne({ _id: id });
   if (result.deletedCount === 1) {
    console.log("Documento excluído com sucesso.");
    res.status(200).json({ message: "Documento excluído com sucesso." });
  } else {
    console.log("Nenhum documento encontrado com o ID fornecido.");
    res
      .status(404)
      .json({ error: "Nenhum documento encontrado com o ID fornecido." });
  }
    // Fechar a conexão com o banco de dados após a leitura
    mongoose.connection.close();
  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
})
app.put("/updateTeste/:id",async(req,res)=>{
  try {
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ); console.log("Conectado ao banco de dados");
    const id = req.params.id;
    const atualizacao = req.body; // Dados de atualização enviados no corpo da requisição
console.log(atualizacao)
    // Realizar a conexão com o banco de dados usando o Mongoose

    const teste = await Testes.findByIdAndUpdate(id, atualizacao, {
      new: true, // Retorna o documento atualizado em vez do documento original
    });

    if (teste) {
      console.log("Documento atualizado:", teste);
      res.status(200).json(teste);
    } else {
      console.log("Nenhum documento encontrado com o ID fornecido.");
      res
        .status(404)
        .json({ error: "Nenhum documento encontrado com o ID fornecido." });
    }

    // Fechar a conexão com o banco de dados após a atualização

  } catch (error) {
    console.error("Erro ao conectar ao servidor MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor MongoDB" });
  }
});

app.listen(2000, () => {
  console.log("Servidor ouvindo na porta 2000");
});
