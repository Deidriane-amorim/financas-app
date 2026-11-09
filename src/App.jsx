import { useState, useEffect } from "react";
import FormLancamento from "./components/FormLancamento";
import Dashboard from "./components/Dashboard";
import Logo from "./components/Logo";
import { formatarMoeda } from "./utils/formatar";

const nomesTipo = {
  receita: "Receita",
  despesa: "Despesa",
  variavel: "Variável",
};

export default function App() {
  const [lancamentos, setLancamentos] = useState(() => {
    try {
      const salvo = localStorage.getItem("lancamentos");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
  }, [lancamentos]);

  function adicionar(novo) {
    setLancamentos([...lancamentos, novo]);
  }

  function remover(id) {
    setLancamentos(lancamentos.filter((l) => l.id !== id));
  }

  return (
    <main>
      <header className="topo">
        <Logo />
        <div>
          <h1>Meu assistente financeiro</h1>
          <p>Acompanhe o que entra, o que sai e como o seu saldo vai evoluir.</p>
        </div>
      </header>

      <Dashboard lancamentos={lancamentos} />

      <div className="colunas">
        <section className="card">
          <h2>Novo lançamento</h2>
          <FormLancamento aoAdicionar={adicionar} />
        </section>

        <section className="card">
          <h2>Lançamentos</h2>

          {lancamentos.length === 0 ? (
            <p className="vazio">Nenhum lançamento ainda.</p>
          ) : (
            <ul className="lista">
              {lancamentos.map((l) => (
                <li key={l.id} className="item">
                  <span className={`etiqueta ${l.tipo}`}>{nomesTipo[l.tipo]}</span>

                  <div className="item-info">
                    <strong>{l.nome}</strong>
                    <small>
                      {l.tipo === "variavel"
                        ? `gasto de ${l.mesInicio}`
                        :  `${l.mesInicio} ${
                            l.mesFim ? `até ${l.mesFim}` : "sem data final"
                          }`}
                    </small>  
                  </div>

                  <span className={`valor ${l.tipo}`}>{formatarMoeda(l.valor)}</span>

                  <button className="botao-excluir" onClick={() => remover(l.id)}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}