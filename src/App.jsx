import { useState, useEffect } from "react";
import FormLancamento from "./components/FormLancamento";
import Dashboard from "./components/Dashboard";

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

  // ... o return continua igual
    return (
  <main>
    <h1>Meu assistente financeiro</h1>

    <section className="card">
      <h2>Novo lançamento</h2>
      <FormLancamento aoAdicionar={adicionar} />
    </section>

    <Dashboard lancamentos={lancamentos} />

    <section className="card">
      <h2>Lançamentos</h2>

      {lancamentos.length === 0 ? (
        <p className="vazio">Nenhum lançamento ainda.</p>
      ) : (
        <ul className="lista">
          {lancamentos.map((l) => (
            <li key={l.id} className="item">
              <span className={`etiqueta ${l.tipo}`}>{l.tipo}</span>

              <div className="item-info">
                <strong>{l.nome}</strong>
                <small>
                  {l.mesInicio}{" "}
                  {l.mesFim ? `até ${l.mesFim}` : "sem data final"}
                </small>
              </div>

              <span className={`valor ${l.tipo}`}>
                R$ {l.valor.toFixed(2)}
              </span>

              <button
                className="botao-excluir"
                onClick={() => remover(l.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  </main>
  );
}