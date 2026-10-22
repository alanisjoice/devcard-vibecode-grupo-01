import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function App() {
  const [curtidas, setCurtidas] = useState(0);
  const [particulas, setParticulas] = useState([]);
  const [animandoFrase, setAnimandoFrase] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [frase, setFrase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [contato, setContato] = useState(null);
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return localStorage.getItem("tema") !== "claro";
  });

  useEffect(() => {
    localStorage.setItem("tema", temaEscuro ? "escuro" : "claro");
    document.body.classList.toggle("light-theme", !temaEscuro);
  }, [temaEscuro]);

  async function gerarNovaFrase() {
    try {
      setAnimandoFrase(true);
      setErro("");
      await new Promise((r) => setTimeout(r, 300));
      const resposta = await fetch(`${API_URL}/api/frase`);
      const dados = await resposta.json();
      setFrase(dados.frase);
      setAnimandoFrase(false);
    } catch {
      setErro("Erro ao buscar nova frase.");
      setAnimandoFrase(false);
    }
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [respostaDevcard, respostaFrase] = await Promise.all([
          fetch(`${API_URL}/api/devcard`),
          fetch(`${API_URL}/api/frase`),
        ]);

        const dadosDevcard = await respostaDevcard.json();
        const dadosFrase = await respostaFrase.json();

        setPerfil(dadosDevcard.perfil);
        setHabilidades(dadosDevcard.habilidades);
        setContato(dadosDevcard.contato);
        setFrase(dadosFrase.frase);
      } catch {
        setErro(
          "Nao foi possivel conectar com a API. Verifique se o back-end esta rodando."
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  const inicial = perfil ? perfil.nome.charAt(0).toUpperCase() : "?";

  function handleCurtir() {
    setCurtidas((c) => c + 1);
    const id = Date.now();
    const offset = Math.floor(Math.random() * 30) - 15;
    setParticulas((p) => [...p, { id, offset }]);
    setTimeout(() => {
      setParticulas((p) => p.filter((part) => part.id !== id));
    }, 800);
  }

  return (
    <main className="pagina">
      <button
        className="toggle-tema"
        onClick={() => setTemaEscuro(!temaEscuro)}
        aria-label="Alternar tema"
      >
        {temaEscuro ? "\u2600\uFE0F" : "\uD83C\uDF19"}
      </button>

      <section className="devcard">
        <div className="topo">
          <div>
            <p className="etiqueta">DevLab Fundamentos</p>
            <h1>&#127890; {perfil ? perfil.nome : "Carregando perfil..."}</h1>
          </div>

          <div className="avatar">{inicial}</div>
        </div>

        {perfil && (
          <div className="info-grid">
            <div>
              <span>Turma</span>
              <strong>{perfil.turma}</strong>
            </div>
            <div>
              <span>Area</span>
              <strong>{perfil.area}</strong>
            </div>
            <div>
              <span>Objetivo</span>
              <strong>{perfil.objetivo}</strong>
            </div>
          </div>
        )}

        <div className="bloco destaque">
          <div className="cabecalho-bloco">
            <h2>Frase motivacional</h2>
          </div>

          {carregando ? (
            <p className="status">Buscando dados...</p>
          ) : (
            <p className={`frase ${animandoFrase ? "frase-saindo" : "frase-entrando"}`}>
              {frase}
            </p>
          )}

          <div className="acoes">
            <button className="botao-primario" onClick={gerarNovaFrase}>
              Gerar nova frase
            </button>
          </div>
        </div>

        <div className="bloco">
          <div className="cabecalho-bloco">
            <h2>Habilidades da etapa</h2>
          </div>

          <div className="habilidades">
            {habilidades.map((habilidade, index) => (
              <div className="habilidade" key={index}>
                <div>
                  <h3>{habilidade}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bloco contato-bloco">
          <div className="cabecalho-bloco">
            <h2>Contato</h2>
          </div>

          {contato ? (
            <a
              className="contato-github"
              href={contato.github}
              target="_blank"
              rel="noreferrer"
            >
              <span className="github-logo" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="38"
                  height="38"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6.01 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.65.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.61-.02 2.9-.02 3.29 0 .32.22.7.83.58C20.57 22.29 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z" />
                </svg>
              </span>
              <span>
                <strong>GitHub: @{contato.usuarioGithub}</strong>
                <small>Visite meu perfil</small>
              </span>
              <span className="seta">&rarr;</span>
            </a>
          ) : (
            <p className="status">Carregando contato...</p>
          )}
        </div>

        <div className="bloco projeto-destaque">
          <div className="cabecalho-bloco">
            <h2>Meus Projetos</h2>
          </div>

          <div className="projetos-grid">
            <a
              className="projeto-card"
              href="/lista-de-compras/login.html"
              target="_blank"
              rel="noreferrer"
            >
              <div className="projeto-icone">&#128722;</div>
              <div>
                <strong>Lista de Compras</strong>
                <small>App PWA com Supabase</small>
              </div>
              <span className="seta">&rarr;</span>
            </a>

            <a
              className="projeto-card"
              href="/catalogo-filmes/index.html"
              target="_blank"
              rel="noreferrer"
            >
              <div className="projeto-icone">&#127909;</div>
              <div>
                <strong>Catálogo de Filmes</strong>
                <small>Busca com API OMDB</small>
              </div>
              <span className="seta">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="acoes curtir-area">
          <button onClick={handleCurtir}>
            Curtir projeto
          </button>

          <div className="curtidas">
            <span>Curtidas no projeto</span>
            <strong key={curtidas} className="curtidas-numero">
              {curtidas}
            </strong>
          </div>

          {particulas.map((p) => (
            <span
              key={p.id}
              className="particula"
              style={{ "--offset": `${p.offset}px` }}
            >
              &#10084;&#65039;
            </span>
          ))}
        </div>

        {erro && <p className="erro">{erro}</p>}
      </section>
    </main>
  );
}

export default App;
