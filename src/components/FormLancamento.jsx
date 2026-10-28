import { useState } from "react";

export default function FormLancamento({ aoAdicionar }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [valor, setValor] = useState("");
  const [mesInicio, setMesInicio] = useState("");
  const [mesFim, setMesFim] = useState("");

  function enviar(evento) {
    evento.preventDefault();

    aoAdicionar({
      id: Date.now(),
      nome,
      tipo,
      valor: Number(valor),
      mesInicio,
      mesFim: mesFim || null,
    });

    setNome("");
    setValor("");
    setMesInicio("");
    setMesFim("");
  }

  return (
    <form onSubmit={enviar}>
      <input
        type="text"
        placeholder="Nome (ex.: Aluguel)"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="despesa">Despesa</option>
        <option value="receita">Receita</option>
      </select>

      <input
        type="number"
        placeholder="Valor"
        min="0"
        step="0.01"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />

      <label>
        Mês inicial
        <input
          type="month"
          value={mesInicio}
          onChange={(e) => setMesInicio(e.target.value)}
          required
        />
      </label>

      <label>
        Mês final (opcional)
        <input
          type="month"
          value={mesFim}
          onChange={(e) => setMesFim(e.target.value)}
        />
      </label>

      <button type="submit">Adicionar</button>
    </form>
  );
}