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
app.post("/user", async (req, res) => {
  const dados = req.body;
  await prisma.user.create({
    data: {
      nome: dados.nome,
    },
  });
  return res.sendStatus(201);
});

//rota para listar todos os usuários
app.get("/users", async (req, res) => {
  try{
    const data  = await prisma.user.findMany()
    return res.json(data)
  }catch(error){
    return res.sendStatus(404)
  }

});

//rota para buscar um usuário pelo nome
app.get("/user/:nome", async (req, res) => {
  const {nome} = req.params 
  try{
    const data  = await prisma.user.findMany({
      where: {
        nome : nome
      }
    })
    if(data) {
      return res.json(data)
    }
  }catch(error){
    return res.sendStatus(404)
  }
});

app.put("/user/update", async (req, res) => {
  const {id, nome} = req.body 
  try{
    await prisma.user.updateMany({
      where: {
        id 
      },
      data: {
        nome: nome
      }
    })
    res.send("Nome alterado com sucesso!")
  }catch(error){
    return res.sendStatus(404)
  }
});

app.delete("/user/delete", async (req, res) => {
  const {id} = req.body 
  try{
     await prisma.user.deleteMany({
      where: {
        id
      }
    })

    return res.send("Usuário deletado")
  }catch(error){
    return res.sendStatus(404)
  }
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});