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

function mesAtual() {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, "0");
  return `${hoje.getFullYear()}-${mm}`;
}

export default function Dashboard({ lancamentos }) {
  const [quantidade, setQuantidade] = useState(12);

  if (lancamentos.length === 0) {
    return <p>Cadastre um lançamento para ver o dashboard.</p>;
  }

  const mesInicial = lancamentos.map((l) => l.mesInicio).sort()[0];
  const dados = calcularProjecao(lancamentos, mesInicial, quantidade);

  const moeda = (valor) => `R$ ${valor.toFixed(2)}`;

  return (
    <section>
      <h2>Dashboard</h2>

      <label>
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
            dataKey="acumulado"
            name="Saldo acumulado"
            stroke="#3b6fd6"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
}