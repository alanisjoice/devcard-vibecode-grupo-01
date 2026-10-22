const express = require("express");
const path = require("node:path");

const app = express();
const porta = process.env.PORT || 3000;

const pastaDist = path.join(__dirname, "..", "frontend", "dist");

app.use(express.json());

const perfil = {
    nome: "Estudante Dev",
    turma: "3º SIS",
    area: "Programacao Mobile e Back-End",
    objetivo: "Aprender a criar aplicacoes conectadas com apoio da IA",
};

const contato = {
    github: "https://github.com/alanisjoice",
    usuarioGithub: "alanisjoice",
};

const habilidades = [
    "Entender componentes React",
    "Criar rotas com Express",
    "Ler dados em formato JSON",
    "Testar uma API no navegador",
    "Usar prompts para estudar codigo",
];

const frases = [
    "Programar e transformar problemas em passos menores.",
    "A IA pode ajudar, mas quem precisa entender o projeto e voce.",
    "Codigo bom e codigo que funciona, e legivel e pode ser melhorado.",
    "Antes de pedir para a IA criar, descreva bem o que voce quer.",
    "Toda aplicacao moderna conversa com dados em algum momento.",
];

app.get("/api", (req, res) => {
    res.json({
        mensagem: "API do DevLab Fundamentos esta funcionando.",
        rotas: [
            "/api/devcard",
            "/api/perfil",
            "/api/habilidades",
            "/api/frase",
            "/api/contato",
        ],
    });
});

app.get("/api/devcard", (req, res) => {
    res.json({
        perfil,
        habilidades,
        contato,
    });
});

app.get("/api/perfil", (req, res) => {
    res.json(perfil);
});

app.get("/api/habilidades", (req, res) => {
    res.json(habilidades);
});

app.get("/api/frase", (req, res) => {
    const indice = Math.floor(Math.random() * frases.length);
    const fraseSelecionada = frases[indice];

    res.json({
        frase: fraseSelecionada,
    });
});

app.get("/api/contato", (req, res) => {
    res.json(contato);
});

app.use("/api", (req, res) => {
    res.status(404).json({
        erro: "Rota de API nao encontrada.",
        dica: "Confira o endereco e o metodo usado.",
    });
});

app.use(express.static(pastaDist));

app.get("*", (req, res) => {
    res.sendFile(path.join(pastaDist, "index.html"), (erro) => {
        if (erro) {
            res.status(404).json({
                erro: "Pagina nao encontrada.",
                dica: "Rode 'npm run build' no frontend antes de iniciar o servidor.",
            });
        }
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
