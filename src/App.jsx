import { useState } from "react";
import FormLancamento from "./components/FormLancamento";

export default function App() {
  const [lancamentos, setLancamentos] = useState([]);

  function adicionar(novo) {
    setLancamentos([...lancamentos, novo]);
  }

  return (
    <div>
      <h1>Meu assistente financeiro</h1>

      <FormLancamento aoAdicionar={adicionar} />

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