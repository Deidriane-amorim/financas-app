// Gera uma lista de meses a partir de um mês inicial.
// Ex.: gerarMeses("2026-11", 3) -> ["2026-11", "2026-12", "2027-01"]
export function gerarMeses(mesInicial, quantidade) {
  const [ano, mes] = mesInicial.split("-").map(Number);
  const meses = [];

  for (let i = 0; i < quantidade; i++) {
    const data = new Date(ano, mes - 1 + i, 1);
    const mm = String(data.getMonth() + 1).padStart(2, "0");
    meses.push(`${data.getFullYear()}-${mm}`);
  }

  return meses;
}

// Diz se um lançamento vale para determinado mês.
export function estaAtivo(lancamento, mes) {
  const jaComecou = lancamento.mesInicio <= mes;
  const aindaNaoTerminou = !lancamento.mesFim || mes <= lancamento.mesFim;
  return jaComecou && aindaNaoTerminou;
}

// Calcula recebido, pago, saldo e saldo acumulado de cada mês.
export function calcularProjecao(lancamentos, mesInicial, quantidade) {
  let acumulado = 0;

  return gerarMeses(mesInicial, quantidade).map((mes) => {
    const ativos = lancamentos.filter((l) => estaAtivo(l, mes));

    const recebido = ativos
      .filter((l) => l.tipo === "receita")
      .reduce((total, l) => total + l.valor, 0);

    const pago = ativos
      .filter((l) => l.tipo === "despesa")
      .reduce((total, l) => total + l.valor, 0);

    const saldo = recebido - pago;
    acumulado += saldo;

    return { mes, recebido, pago, saldo, acumulado };
  });
}