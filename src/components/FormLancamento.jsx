import { useState } from "react";
import { formatarMoeda, textoParaNumero } from "../utils/formatar";

export default function FormLancamento({ aoAdicionar }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [valorTexto, setValorTexto] = useState("");
  const [valorFocado, setValorFocado] = useState(false);
  const [mesInicio, setMesInicio] = useState("");
  const [mesFim, setMesFim] = useState("");

  const ehVariavel = tipo === "variavel";

  // Em edição mostra o que foi digitado; fora dela, mostra formatado
  const valorExibido =
    valorFocado || valorTexto === ""
      ? valorTexto
      : formatarMoeda(textoParaNumero(valorTexto));

  function aoDigitarValor(evento) {
    let texto = evento.target.value.replace(/[^\d,]/g, "");

    if (texto.includes(",")) {
      const [inteiro, decimais] = texto.split(",");
      texto = `${inteiro},${decimais.slice(0, 2)}`;
    }

    setValorTexto(texto);
  }

  function enviar(evento) {
    evento.preventDefault();

    const valor = textoParaNumero(valorTexto);
    if (valor <= 0) {
      alert("Digite um valor maior que zero.");
      return;
    }

    aoAdicionar({
      id: Date.now(),
      nome,
      tipo,
      valor,
      mesInicio,
      mesFim: ehVariavel ? mesInicio : mesFim || null,
    });

    setNome("");
    setValorTexto("");
    setMesInicio("");
    setMesFim("");
  }

  return (
    <form onSubmit={enviar} className="form">
      <input
        type="text"
        placeholder="Nome (ex.: Aluguel)"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="despesa">Despesa fixa</option>
        <option value="variavel">Gasto variável</option>
        <option value="receita">Receita</option>
      </select>

      <input
        type="text"
        inputMode="decimal"
        placeholder="Valor"
        value={valorExibido}
        onChange={aoDigitarValor}
        onFocus={() => setValorFocado(true)}
        onBlur={() => setValorFocado(false)}
        required
      />

      <label>
        {ehVariavel ? "Mês do gasto" : "Mês inicial"}
        <input
          type="month"
          value={mesInicio}
          onChange={(e) => setMesInicio(e.target.value)}
          required
        />
      </label>

      {!ehVariavel && (
        <label>
          Mês final (opcional)
          <input
            type="month"
            value={mesFim}
            onChange={(e) => setMesFim(e.target.value)}
          />
        </label>
      )}

      <button type="submit">Adicionar</button>
    </form>
  );
}