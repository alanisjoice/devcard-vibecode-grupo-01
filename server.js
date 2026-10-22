const express = require("express");
const cors = require("cors");

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

const perfil = {
  nome: "Dev em Formação",
  apelido: "Code Student",
  turma: "3º SIS",
  area: "Programação Mobile e Back-End",
  status: "Aprendendo a criar projetos reais com apoio da IA",
  bio: "Estudante de Desenvolvimento de Sistemas explorando React, Node, Express e boas práticas de vibecoding.",
};

const habilidades = [
  {
    nome: "React",
    nivel: "iniciante",
    descricao: "Criar interfaces usando componentes, estado e eventos.",
  },
  {
    nome: "Node.js",
    nivel: "iniciante",
    descricao: "Executar JavaScript fora do navegador.",
  },
  {
    nome: "Express",
    nivel: "iniciante",
    descricao: "Criar rotas e APIs simples.",
  },
  {
    nome: "API REST",
    nivel: "iniciante",
    descricao: "Fazer sistemas conversarem usando rotas e JSON.",
  },
  {
    nome: "Vibecoding",
    nivel: "em evolução",
    descricao: "Usar IA para acelerar a criação, sem deixar de entender o código.",
  },
];

const projetos = [
  {
    nome: "DevLab Fundamentos",
    tipo: "Projeto de estudo",
    descricao: "Miniapp criado para entender React, estado, eventos, API e JSON.",
  },
  {
    nome: "DevCard VibeCode",
    tipo: "Projeto prático",
    descricao: "Cartão digital de desenvolvedor conectado a uma API Express.",
  },
  {
    nome: "API de Frases Dev",
    tipo: "Back-end",
    descricao: "Rota que retorna frases aleatórias para motivar estudantes de programação.",
  },
];

const frases = [
  "A IA acelera, mas o entendimento guia.",
  "Programar é transformar problemas grandes em passos pequenos.",
  "Código bom é aquele que funciona, pode ser lido e pode ser melhorado.",
  "Antes de pedir para a IA criar, descreva bem o que você quer.",
  "Vibecoding não é parar de programar: é aprender a orientar melhor a máquina.",
  "Quem entende a lógica consegue revisar melhor o que a IA entrega.",
];

function sortearFrase() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

app.get("/", (req, res) => {
  res.json({
    mensagem: "API do DevCard VibeCode está funcionando.",
    rotas: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/frase",
      "/api/devcard",
    ],
  });
});

app.get("/api/perfil", (req, res) => {
  res.json(perfil);
});

app.get("/api/habilidades", (req, res) => {
  res.json(habilidades);
});

app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

app.get("/api/frase", (req, res) => {
  res.json({
    frase: sortearFrase(),
  });
});

app.get("/api/devcard", (req, res) => {
  res.json({
    perfil,
    habilidades,
    projetos,
    fraseInicial: sortearFrase(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada.",
    dica: "Confira se o endereço foi digitado corretamente.",
    rotasDisponiveis: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/frase",
      "/api/devcard",
    ],
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});

