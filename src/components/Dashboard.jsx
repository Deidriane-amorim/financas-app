import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { calcularProjecao } from "../utils/calculos";
import { formatarMoeda } from "../utils/formatar";

export default function Dashboard({ lancamentos }) {
  const [quantidade, setQuantidade] = useState(12);

  if (lancamentos.length === 0) {
    return (
      <p className="card vazio">Cadastre um lançamento para ver o dashboard.</p>
    );
  }

  const mesInicial = lancamentos.map((l) => l.mesInicio).sort()[0];
  const calculado = calcularProjecao(lancamentos, mesInicial, quantidade);

  // Divide o saldo acumulado em duas linhas: a real e a prevista
  const dados = calculado.map((d, i) => {
    const proximoEhPrevisao = calculado[i + 1]?.projetado;

    return {
      ...d,
      real: d.projetado ? null : d.acumulado,
      previsto: d.projetado || proximoEhPrevisao ? d.acumulado : null,
    };
  });

  const moeda = (valor) =>
    typeof valor === "number" ? `R$ ${valor.toFixed(2)}` : valor;

  return (
    <section className="card">
      <h2>Dashboard</h2>

      <label className="filtro">
        Meses exibidos:{" "}
        <select
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </label>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={moeda} />
          <Legend />
          <Bar dataKey="recebido" name="Recebido" fill="#2e9e5b" />
          <Bar dataKey="pago" name="Pago" fill="#d64545" />
          <Line
            type="monotone"
            dataKey="real"
            name="Saldo acumulado"
            stroke="#3b6fd6"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="previsto"
            name="Previsão"
            stroke="#3b6fd6"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
}