// =====================
// INTERFACE DOADORES
// =====================

import { cadastrarDoadorService, listarDoadores } from "./services/doadores.js";

export function configurarFormularioDoador() {
  const form = document.getElementById("formDoador");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const resultado = cadastrarDoadorService(form);

    if (resultado.erro) {
      alert(resultado.erro);
      return;
    }

    alert("Doador cadastrado com sucesso!");

    form.reset();
    atualizarListaDoadores();
    atualizarDashboard();
    atualizarSelects();
  });
}

export function atualizarListaDoadores() {
  const lista = listarDoadores();
  const tabela = document.getElementById("listaDoadores");

  tabela.innerHTML = "";

  lista.forEach((doador) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${doador.nome}</td>
            <td>${doador.cpf}</td>
            <td>${doador.telefone}</td>
            <td>${doador.email ?? "-"}</td>
            <td>${doador.endereco}</td>
        `;
    tabela.appendChild(tr);
  });
}

export function atualizarSelects() {
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.innerHTML = "";
  });
}