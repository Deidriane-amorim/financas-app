import { calcularProjecao } from "./calculos.js";

const lancamentos = [
  { id: 1, nome: "Salário", tipo: "receita", valor: 3000, mesInicio: "2026-08", mesFim: null },
  { id: 2, nome: "Aluguel", tipo: "despesa", valor: 1200, mesInicio: "2026-08", mesFim: null },
  { id: 3, nome: "Mercado", tipo: "variavel", valor: 600, mesInicio: "2026-08", mesFim: "2026-08" },
  { id: 4, nome: "Mercado", tipo: "variavel", valor: 700, mesInicio: "2026-09", mesFim: "2026-09" },
  { id: 5, nome: "Mercado", tipo: "variavel", valor: 800, mesInicio: "2026-10", mesFim: "2026-10" },
];

console.table(calcularProjecao(lancamentos, "2026-08", 6));