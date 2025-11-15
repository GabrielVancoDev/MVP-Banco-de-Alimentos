// =====================
// SERVIÇO DOADORES
// =====================

import { dados, salvarDados } from "./storage.js";
import {
  validarCPF,
  validarEmail,
  validarTelefone,
  validarCampoVazio,
} from "../validacoes.js";

export function cadastrarDoadorService(form) {
  const doador = {
    id: Date.now(),
    nome: form.nome.value.trim(),
    cpf: form.cpf.value.trim(),
    email: form.email.value.trim(),
    telefone: form.telefone.value.trim(),
    endereco: form.endereco.value.trim(),
  };

  // -------- VALIDAR --------
  if (!validarCampoVazio(doador.nome, 3)) {
    return { erro: "Nome inválido. Digite pelo menos 3 caracteres." };
  }

  if (!validarCPF(doador.cpf)) {
    return { erro: "CPF inválido." };
  }

  if (doador.email && !validarEmail(doador.email)) {
    return { erro: "E-mail inválido." };
  }

  if (!validarTelefone(doador.telefone)) {
    return { erro: "Telefone inválido." };
  }

  if (!validarCampoVazio(doador.endereco, 5)) {
    return { erro: "Endereço inválido." };
  }

  // Evitar CPF duplicado
  const cpfExiste = dados.doadores.some((d) => d.cpf === doador.cpf);
  if (cpfExiste) {
    return { erro: "Já existe um doador cadastrado com esse CPF." };
  }

  // -------- SALVAR --------
  dados.doadores.push(doador);
  salvarDados();

  return { sucesso: true };
}

export function listarDoadores() {
  return dados.doadores;
}
