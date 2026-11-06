// Transforma um número em texto de moeda. Ex.: 2800 -> "R$2.800,00"
export function formatarMoeda(valor) {
  const numero = Number(valor) || 0;
  const sinal = numero < 0 ? "-" : "";

  return `${sinal}R$${Math.abs(numero).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// Transforma o que a pessoa digitou em número. Ex.: "2800,5" -> 2800.5
export function textoParaNumero(texto) {
  const numero = Number(texto.replace(",", "."));
  return Number.isNaN(numero) ? 0 : numero;
}