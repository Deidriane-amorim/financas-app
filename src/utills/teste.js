import { calcularProjecao } from "./calculos.js";

const lancamentos = [
  { nome: "Salário", tipo: "receita", valor: 3000, mesInicio: "2026-11", mesFim: null },
  { nome: "Aluguel", tipo: "despesa", valor: 1200, mesInicio: "2026-11", mesFim: null },
  { nome: "Curso", tipo: "despesa", valor: 300, mesInicio: "2026-11", mesFim: "2027-01" },
];

console.table(calcularProjecao(lancamentos, "2026-11", 6));