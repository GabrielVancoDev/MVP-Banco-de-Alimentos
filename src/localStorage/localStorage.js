// =====================
// LOCALSTORAGE
// =====================

export const dados = {
  doadores: [],
  instituicoes: [],
  voluntarios: [],
  doacoes: [],
  alimentos: [],
  coletas: [],
  distribuicoes: [],
  categorias: [],
  campanhas: [],
};

export function carregarDados() {
  const salvo = localStorage.getItem("bancoAlimentosDados");
  if (salvo) {
    const carregado = JSON.parse(salvo);
    Object.assign(dados, carregado);
  }
}

export function salvarDados() {
  localStorage.setItem("bancoAlimentosDados", JSON.stringify(dados));
}
