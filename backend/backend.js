const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { number } = require("yargs");

//===== IMPORT SCHEMA PARA NAO CHAMAR DUAS VEZES

const Testes = require('./schemas/Testes_schema'); // Importe o modelo Teste aqui
const Resultados=require("./schemas/Resultados_schema")// Importe o modelo Resultado aqui


app.use(
  cors({
    origin: "http://localhost:3000", // URL do React
  })
);
app.use(express.json());

// Rota de login
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  try {
    // Verificar as credenciais do usuário
    const user = authenticateUser(email, password);

    // Gerar um token de autenticação
    const token = jwt.sign({ userId: user.id }, "seuSegredoDoToken");

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

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
    await mongoose.connect(
      "mongodb+srv://murilloaqw:quW5gfJolEvMLDx4@rentspot.hmyt9cq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
     console.log('Conectado ao servidor MongoDB');

    const data = req.body; // Supondo que os dados a serem salvos estão no corpo da requisição

    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
    });
    // Definir o modelo para a coleção "user"
    const User = mongoose.model("resultados", userSchema, "resultados");

    // Realizar a leitura de todos os documentos na coleção "user"
    const users = await User.find().exec();

    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
  
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Senha incorreta");
    }
  
  
 
    // Feche a conexão com o servidor MongoDB
    mongoose.connection.close();

    res.status(200).json({
      message: "Conexão estabelecida e operações realizadas com sucesso.", 
    }); 
    return user;
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
app.post("/inserirUsuario",async(req,res)=>{
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
    await mongoose.connection.db.collection('users').insertOne(data);

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



app.listen(2000, () => {
  console.log("Servidor ouvindo na porta 2000");
});
