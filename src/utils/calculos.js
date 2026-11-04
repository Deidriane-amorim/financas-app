// Mês atual no formato "AAAA-MM". Ex.: "2026-11"
export function mesAtual() {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, "0");
  return `${hoje.getFullYear()}-${mm}`;
}

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

// Agrupa os gastos variáveis por nome e por mês.
// Resultado: { mercado: { "2026-08": 600, "2026-09": 700 }, ... }
function agruparVariaveis(lancamentos) {
  const grupos = {};

  lancamentos
    .filter((l) => l.tipo === "variavel")
    .forEach((l) => {
      const nome = l.nome.trim().toLowerCase();
      if (!grupos[nome]) grupos[nome] = {};
      grupos[nome][l.mesInicio] = (grupos[nome][l.mesInicio] || 0) + l.valor;
    });

  return grupos;
}

// Média dos últimos N meses registrados de um gasto variável.
export function mediaUltimosMeses(totaisPorMes, quantidade = 3) {
  const ultimos = Object.keys(totaisPorMes).sort().slice(-quantidade);
  if (ultimos.length === 0) return 0;

  const soma = ultimos.reduce((total, mes) => total + totaisPorMes[mes], 0);
  return Math.round((soma / ultimos.length) * 100) / 100;
}

// Calcula recebido, pago, saldo e saldo acumulado de cada mês.
export function calcularProjecao(lancamentos, mesInicial, quantidade) {
  const variaveis = agruparVariaveis(lancamentos);
  const mesDeHoje = mesAtual();
  let acumulado = 0;

  return gerarMeses(mesInicial, quantidade).map((mes) => {
    const ativos = lancamentos.filter(
      (l) => l.tipo !== "variavel" && estaAtivo(l, mes)
    );

    const recebido = ativos
      .filter((l) => l.tipo === "receita")
      .reduce((total, l) => total + l.valor, 0);

    const fixas = ativos
      .filter((l) => l.tipo === "despesa")
      .reduce((total, l) => total + l.valor, 0);

    let variavel = 0;
    Object.values(variaveis).forEach((totaisPorMes) => {
      const meses = Object.keys(totaisPorMes).sort();
      const ultimoMes = meses[meses.length - 1];

      if (totaisPorMes[mes] !== undefined) {
        variavel += totaisPorMes[mes]; // mês registrado: usa o valor real
      } else if (mes > ultimoMes) {
        variavel += mediaUltimosMeses(totaisPorMes); // depois do último: projeta
      }
    });

    const pago = fixas + variavel;
    const saldo = recebido - pago;
    acumulado += saldo;

    return { mes, recebido, pago, saldo, acumulado, projetado: mes > mesDeHoje };
  });
}