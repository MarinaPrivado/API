//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

//configurações para o servidor
app.use(bodyParser.json());
app.use(cors());

//rota para criar um item
app.post("/item", async (req, res) => {
  const dados = req.body;
  await prisma.item.create({
    data: {
      nome: dados.nome,
    },
  });
  return res.sendStatus(201);
});

//rota para listar todos os usuários
app.get("/users", async (req, res) => {
});

//rota para buscar um usuário pelo nome
app.get("/user/:nome", async (req, res) => {
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});