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

  // ... o return continua igual
  return (
    <div>
      <h1>Meu assistente financeiro</h1>

      <FormLancamento aoAdicionar={adicionar} />

      <Dashboard lancamentos={lancamentos} />

      <h2>Lançamentos</h2>
      <ul>
        {lancamentos.map((l) => (
          <li key={l.id}>
            {l.nome} ({l.tipo}): R$ {l.valor.toFixed(2)} de {l.mesInicio}{" "}
            {l.mesFim ? `até ${l.mesFim}` : "sem data final"}
          </li>
        ))}
      </ul>
    </div>
  );
}