let dados = {
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

function carregarDados() {
  const dadosSalvos = localStorage.getItem("bancoAlimentosDados");
  if (dadosSalvos) {
    dados = JSON.parse(dadosSalvos);
    atualizarDashboard();
    atualizarTodasListagens();
  }
}

function salvarDados() {
  localStorage.setItem("bancoAlimentosDados", JSON.stringify(dados));
}

function toggleSubmenu(id) {
  const submenu = document.getElementById("submenu-" + id);
  const arrow = event.currentTarget.querySelector(".menu-arrow");

  submenu.classList.toggle("open");
  arrow.classList.toggle("open");
}

function showSection(sectionId, event) {
  if (event) event.stopPropagation();

  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".menu-item")
    .forEach((m) => m.classList.remove("active"));
  document
    .querySelectorAll(".submenu-item")
    .forEach((m) => m.classList.remove("active"));

  document.getElementById(sectionId).classList.add("active");
  if (event) {
    event.currentTarget.classList.add("active");
  } else {
    document
      .querySelector(`[onclick="showSection('${sectionId}')"]`)
      ?.classList.add("active");
  }
}

function cadastrarDoador(e) {
  e.preventDefault();
  const form = e.target;

  const nome = form.nome.value.trim();
  const cpf = form.cpf.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const endereco = form.endereco.value.trim();

  // ============================
  // 🔍 1. Valida campos obrigatórios
  // ============================
  if (!nome || !cpf || !email || !telefone || !endereco) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // ============================
  // 🔍 2. Validação de CPF
  // ============================
  if (!validarCPF(cpf)) {
    alert("CPF inválido!");
    return;
  }

  // ============================
  // 🔍 3. Verificar CPF duplicado
  // ============================
  const cpfJaExiste = dados.doadores.some((d) => d.cpf === cpf);
  if (cpfJaExiste) {
    alert("Já existe um doador cadastrado com esse CPF!");
    return;
  }

  // ============================
  // 🔍 4. Validação de e-mail
  // ============================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("E-mail inválido!");
    return;
  }

  // ============================
  // 🔍 5. Validação de telefone
  // Formato básico: (99) 99999-9999 ou 99999999999
  // ============================
  const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    alert("Telefone inválido! Use o formato (XX) XXXXX-XXXX");
    return;
  }

  // ============================
  // ✅ Tudo válido → cadastrar
  // ============================
  const doador = {
    id: Date.now(),
    nome,
    cpf,
    email,
    telefone,
    endereco,
  };

  dados.doadores.push(doador);
  salvarDados();
  form.reset();
  atualizarListaDoadores();
  atualizarDashboard();
  atualizarSelects();
  alert("Doador cadastrado com sucesso!");
}
// Validação do CPF

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function cadastrarInstituicao(e) {
  e.preventDefault();
  const form = e.target;
  const instituicao = {
    id: Date.now(),
    nome: form.nome.value,
    cnpj: form.cnpj.value,
    email: form.email.value,
    telefone: form.telefone.value,
    endereco: form.endereco.value,
  };

  dados.instituicoes.push(instituicao);
  salvarDados();
  form.reset();
  atualizarListaInstituicoes();
  atualizarDashboard();
  atualizarSelects();
  alert("[translate:Instituição cadastrada com sucesso!]");
}

function cadastrarVoluntario(e) {
  e.preventDefault();
  const form = e.target;
  const voluntario = {
    id: Date.now(),
    nome: form.nome.value,
    cpf: form.cpf.value,
    email: form.email.value,
    telefone: form.telefone.value,
  };

  dados.voluntarios.push(voluntario);
  salvarDados();
  form.reset();
  atualizarListaVoluntarios();
  alert("[translate:Voluntário cadastrado com sucesso!]");
}

function registrarDoacao(e) {
  e.preventDefault();
  const form = e.target;
  const doacao = {
    id: Date.now(),
    id_doador: form.id_doador.value,
    id_instituicao: form.id_instituicao.value,
    tipo: form.tipo.value,
    quantidade: form.quantidade.value,
    data_doacao: form.data_doacao.value,
  };

  dados.doacoes.push(doacao);
  salvarDados();
  form.reset();
  atualizarListaDoacoes();
  atualizarDashboard();
  alert("[translate:Doação registrada com sucesso!]");
}

function cadastrarAlimento(e) {
  e.preventDefault();
  const form = e.target;
  const alimento = {
    id: Date.now(),
    nome: form.nome.value,
    categoria: form.categoria.value,
    quantidade: form.quantidade.value,
    unidade: form.unidade.value,
    validade: form.validade.value,
  };

  dados.alimentos.push(alimento);
  salvarDados();
  form.reset();
  atualizarListaAlimentos();
  atualizarDashboard();
  alert("[translate:Alimento cadastrado com sucesso!]");
}

function registrarColeta(e) {
  e.preventDefault();
  const form = e.target;
  const coleta = {
    id: Date.now(),
    id_doador: form.id_doador.value,
    data_coleta: form.data_coleta.value,
    responsavel: form.responsavel.value,
    observacoes: form.observacoes.value,
  };

  dados.coletas.push(coleta);
  salvarDados();
  form.reset();
  atualizarListaColetas();
  alert("[translate:Coleta registrada com sucesso!]");
}

function registrarDistribuicao(e) {
  e.preventDefault();
  const form = e.target;
  const distribuicao = {
    id: Date.now(),
    id_instituicao: form.id_instituicao.value,
    data_distribuicao: form.data_distribuicao.value,
    responsavel: form.responsavel.value,
    observacoes: form.observacoes.value,
  };

  dados.distribuicoes.push(distribuicao);
  salvarDados();
  form.reset();
  atualizarListaDistribuicoes();
  alert("[translate:Distribuição registrada com sucesso!]");
}

function cadastrarCategoria(e) {
  e.preventDefault();
  const form = e.target;
  const categoria = {
    id: Date.now(),
    nome_categoria: form.nome_categoria.value,
  };

  dados.categorias.push(categoria);
  salvarDados();
  form.reset();
  atualizarListaCategorias();
  alert("[translate:Categoria cadastrada com sucesso!]");
}

function cadastrarCampanha(e) {
  e.preventDefault();
  const form = e.target;
  const campanha = {
    id: Date.now(),
    nome: form.nome.value,
    descricao: form.descricao.value,
    data_inicio: form.data_inicio.value,
    data_fim: form.data_fim.value,
  };

  dados.campanhas.push(campanha);
  salvarDados();
  form.reset();
  atualizarListaCampanhas();
  alert("[translate:Campanha criada com sucesso!]");
}

function atualizarDashboard() {
  document.getElementById("total-doadores").textContent = dados.doadores.length;
  document.getElementById("total-doacoes").textContent = dados.doacoes.length;
  document.getElementById("total-alimentos").textContent =
    dados.alimentos.length;
  document.getElementById("total-instituicoes").textContent =
    dados.instituicoes.length;
}

function atualizarListaDoadores() {
  const tbody = document.getElementById("lista-doadores");
  if (dados.doadores.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">[translate:Nenhum doador cadastrado]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.doadores
    .map(
      (d) => `<tr>
                <td>${d.nome}</td>
                <td>${d.cpf}</td>
                <td>${d.email || "-"}</td>
                <td>${d.telefone || "-"}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirDoador(${
        d.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`
    )
    .join("");
}

function atualizarListaInstituicoes() {
  const tbody = document.getElementById("lista-instituicoes");
  if (dados.instituicoes.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">[translate:Nenhuma instituição cadastrada]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.instituicoes
    .map(
      (i) => `<tr>
                <td>${i.nome}</td>
                <td>${i.cnpj}</td>
                <td>${i.email || "-"}</td>
                <td>${i.telefone || "-"}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirInstituicao(${
        i.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`
    )
    .join("");
}

function atualizarListaVoluntarios() {
  const tbody = document.getElementById("lista-voluntarios");
  if (dados.voluntarios.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">[translate:Nenhum voluntário cadastrado]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.voluntarios
    .map(
      (v) => `<tr>
                <td>${v.nome}</td>
                <td>${v.cpf}</td>
                <td>${v.email || "-"}</td>
                <td>${v.telefone || "-"}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirVoluntario(${
        v.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`
    )
    .join("");
}

function atualizarListaDoacoes() {
  const tbody = document.getElementById("lista-doacoes");
  if (dados.doacoes.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">[translate:Nenhuma doação registrada]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.doacoes
    .map((d) => {
      const doador = dados.doadores.find((x) => x.id == d.id_doador);
      const instituicao = dados.instituicoes.find(
        (x) => x.id == d.id_instituicao
      );
      return `<tr>
            <td>${new Date(d.data_doacao).toLocaleDateString("pt-BR")}</td>
            <td>${doador ? doador.nome : "[translate:N/A]"}</td>
            <td>${instituicao ? instituicao.nome : "[translate:N/A]"}</td>
            <td>${d.tipo}</td>
            <td>${d.quantidade}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-danger btn-small" onclick="excluirDoacao(${
        d.id
      })">[translate:Excluir]</button>
                </div>
            </td>
        </tr>`;
    })
    .join("");
}

function atualizarListaAlimentos() {
  const tbody = document.getElementById("lista-alimentos");
  if (dados.alimentos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">[translate:Nenhum alimento cadastrado]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.alimentos
    .map(
      (a) => `<tr>
                <td>${a.nome}</td>
                <td>${a.categoria}</td>
                <td>${a.quantidade}</td>
                <td>${a.unidade}</td>
                <td>${
        a.validade ? new Date(a.validade).toLocaleDateString("pt-BR") : "-"
      }</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirAlimento(${
        a.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`
    )
    .join("");
}

function atualizarListaColetas() {
  const tbody = document.getElementById("lista-coletas");
  if (dados.coletas.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">[translate:Nenhuma coleta registrada]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.coletas
    .map((c) => {
      const doador = dados.doadores.find((x) => x.id == c.id_doador);
      return `<tr>
                <td>${new Date(c.data_coleta).toLocaleDateString("pt-BR")}</td>
                <td>${doador ? doador.nome : "[translate:N/A]"}</td>
                <td>${c.responsavel}</td>
                <td>${c.observacoes || "-"}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirColeta(${
        c.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`;
    })
    .join("");
}

function atualizarListaDistribuicoes() {
  const tbody = document.getElementById("lista-distribuicoes");
  if (dados.distribuicoes.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">[translate:Nenhuma distribuição registrada]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.distribuicoes
    .map((d) => {
      const instituicao = dados.instituicoes.find(
        (x) => x.id == d.id_instituicao
      );
      return `<tr>
                <td>${new Date(d.data_distribuicao).toLocaleDateString(
        "pt-BR"
      )}</td>
                <td>${instituicao ? instituicao.nome : "[translate:N/A]"}</td>
                <td>${d.responsavel}</td>
                <td>${d.observacoes || "-"}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirDistribuicao(${
        d.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`;
    })
    .join("");
}

function atualizarListaCategorias() {
  const tbody = document.getElementById("lista-categorias");
  if (dados.categorias.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="2" style="text-align: center; color: #7f8c8d;">[translate:Nenhuma categoria cadastrada]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.categorias
    .map(
      (c) => `<tr>
                <td>${c.nome_categoria}</td>
                <td>
                    <div class="action-buttons">
                            <button class="btn btn-danger btn-small" onclick="excluirCategoria(${c.id})">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`
    )
    .join("");
}

function atualizarListaCampanhas() {
  const tbody = document.getElementById("lista-campanhas");
  if (dados.campanhas.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">[translate:Nenhuma campanha cadastrada]</td></tr>';
    return;
  }

  tbody.innerHTML = dados.campanhas
    .map((c) => {
      const hoje = new Date();
      const inicio = new Date(c.data_inicio);
      const fim = c.data_fim ? new Date(c.data_fim) : null;
      let status = "[translate:Ativa]";

      if (fim && hoje > fim) status = "[translate:Encerrada]";
      else if (hoje < inicio) status = "[translate:Aguardando]";

      return `<tr>
                <td>${c.nome}</td>
                <td>${c.descricao || "-"}</td>
                <td>${new Date(c.data_inicio).toLocaleDateString("pt-BR")}</td>
                <td>${
        c.data_fim ? new Date(c.data_fim).toLocaleDateString("pt-BR") : "-"
      }</td>
                <td><span style="padding: 4px 8px; background: ${
        status === "[translate:Ativa]" ? "#27ae60" : "#95a5a6"
      }; color: white; border-radius: 4px; font-size: 12px;">${status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="excluirCampanha(${
        c.id
      })">[translate:Excluir]</button>
                    </div>
                </td>
            </tr>`;
    })
    .join("");
}

function excluirDoador(id) {
  if (confirm("[translate:Deseja realmente excluir este doador?]")) {
    dados.doadores = dados.doadores.filter((d) => d.id !== id);
    salvarDados();
    atualizarListaDoadores();
    atualizarDashboard();
    atualizarSelects();
  }
}

function excluirInstituicao(id) {
  if (confirm("[translate:Deseja realmente excluir esta instituição?]")) {
    dados.instituicoes = dados.instituicoes.filter((i) => i.id !== id);
    salvarDados();
    atualizarListaInstituicoes();
    atualizarDashboard();
    atualizarSelects();
  }
}

function excluirVoluntario(id) {
  if (confirm("[translate:Deseja realmente excluir este voluntário?]")) {
    dados.voluntarios = dados.voluntarios.filter((v) => v.id !== id);
    salvarDados();
    atualizarListaVoluntarios();
  }
}

function excluirDoacao(id) {
  if (confirm("[translate:Deseja realmente excluir esta doação?]")) {
    dados.doacoes = dados.doacoes.filter((d) => d.id !== id);
    salvarDados();
    atualizarListaDoacoes();
    atualizarDashboard();
  }
}

function excluirAlimento(id) {
  if (confirm("[translate:Deseja realmente excluir este alimento?]")) {
    dados.alimentos = dados.alimentos.filter((a) => a.id !== id);
    salvarDados();
    atualizarListaAlimentos();
    atualizarDashboard();
  }
}

function excluirColeta(id) {
  if (confirm("[translate:Deseja realmente excluir esta coleta?]")) {
    dados.coletas = dados.coletas.filter((c) => c.id !== id);
    salvarDados();
    atualizarListaColetas();
  }
}

function excluirDistribuicao(id) {
  if (confirm("[translate:Deseja realmente excluir esta distribuição?]")) {
    dados.distribuicoes = dados.distribuicoes.filter((d) => d.id !== id);
    salvarDados();
    atualizarListaDistribuicoes();
  }
}

function excluirCategoria(id) {
  if (confirm("[translate:Deseja realmente excluir esta categoria?]")) {
    dados.categorias = dados.categorias.filter((c) => c.id !== id);
    salvarDados();
    atualizarListaCategorias();
  }
}

function excluirCampanha(id) {
  if (confirm("[translate:Deseja realmente excluir esta campanha?]")) {
    dados.campanhas = dados.campanhas.filter((c) => c.id !== id);
    salvarDados();
    atualizarListaCampanhas();
  }
}

function atualizarSelects() {
  const selectsDoador = document.querySelectorAll(
    "#select-doador, #select-doador-coleta"
  );
  selectsDoador.forEach((select) => {
    const valorAtual = select.value;
    select.innerHTML =
      '<option value="">[translate:Selecione um doador]</option>' +
      dados.doadores
        .map((d) => `<option value="${d.id}">${d.nome}</option>`)
        .join("");
    select.value = valorAtual;
  });

  const selectsInstituicao = document.querySelectorAll(
    "#select-instituicao, #select-instituicao-dist"
  );
  selectsInstituicao.forEach((select) => {
    const valorAtual = select.value;
    select.innerHTML =
      '<option value="">[translate:Selecione uma instituição]</option>' +
      dados.instituicoes
        .map((i) => `<option value="${i.id}">${i.nome}</option>`)
        .join("");
    select.value = valorAtual;
  });
}

function atualizarTodasListagens() {
  atualizarListaDoadores();
  atualizarListaInstituicoes();
  atualizarListaVoluntarios();
  atualizarListaDoacoes();
  atualizarListaAlimentos();
  atualizarListaColetas();
  atualizarListaDistribuicoes();
  atualizarListaCategorias();
  atualizarListaCampanhas();
  atualizarSelects();
}

function gerarRelatorioGeral() {
  const dataInicio = document.getElementById("rel-data-inicio").value;
  const dataFim = document.getElementById("rel-data-fim").value;

  if (!dataInicio || !dataFim) {
    alert("[translate:Por favor, selecione o período para gerar o relatório]");
    return;
  }

  const doacoesFiltradas = dados.doacoes.filter((d) => {
    return d.data_doacao >= dataInicio && d.data_doacao <= dataFim;
  });

  const resultado = document.getElementById("relatorio-resultado");
  resultado.innerHTML = `<div style="padding: 20px;">
            <h4>[translate:Relatório de Doações - Período:] 
                ${new Date(dataInicio).toLocaleDateString(
    "pt-BR"
  )} a ${new Date(dataFim).toLocaleDateString("pt-BR")}
            </h4>
            <div style="margin-top: 20px;">
                <p><strong>[translate:Total de Doações:]</strong> 
                    ${doacoesFiltradas.length}
                </p>
                        
                <p><strong>[translate:Quantidade Total Doada:]</strong> 
                    ${doacoesFiltradas.reduce(
    (acc, d) => acc + parseInt(d.quantidade),
    0
  )} [translate:unidades]
                </p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                <h5>[translate:Detalhamento:]</h5>
                <ul style="list-style: none; padding: 0;">
                    ${doacoesFiltradas
    .map((d) => {
      const doador = dados.doadores.find((x) => x.id == d.id_doador);
      const instituicao = dados.instituicoes.find(
        (x) => x.id == d.id_instituicao
      );
      return `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                            ${new Date(d.data_doacao).toLocaleDateString(
        "pt-BR"
      )} - 
                            ${doador?.nome || "[translate:N/A]"} → 
                            ${instituicao?.nome || "[translate:N/A]"} - 
                            ${d.quantidade} ${d.tipo}
                        </li>`;
    })
    .join("")}
                </ul>
            </div>
        </div>`;
}

function gerarRelatorioDoadores() {
  const doadoresComTotal = dados.doadores
    .map((doador) => {
      const totalDoacoes = dados.doacoes.filter(
        (d) => d.id_doador == doador.id
      ).length;
      const quantidadeTotal = dados.doacoes
        .filter((d) => d.id_doador == doador.id)
        .reduce((acc, d) => acc + parseInt(d.quantidade), 0);
      return { ...doador, totalDoacoes, quantidadeTotal };
    })
    .sort((a, b) => b.totalDoacoes - a.totalDoacoes);

  const resultado = document.getElementById("relatorio-resultado");
  resultado.innerHTML = `<div style="padding: 20px;">
            <h4>[translate:Top Doadores]</h4>
                <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Posição]</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Nome]</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Total de Doações]</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Quantidade Total]</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${doadoresComTotal
    .slice(0, 10)
    .map(
      (d, i) => `<tr>
                                <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${
        i + 1
      }º</td>
                                <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${
        d.nome
      }</td>
                                <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${
        d.totalDoacoes
      }</td>
                                <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${
        d.quantidadeTotal
      } [translate:unidades]</td>
                            </tr>`
    )
    .join("")}
                    </tbody>
                </table>
        </div>`;
}

function gerarRelatorioInstituicoes() {
  const instituicoesComTotal = dados.instituicoes
    .map((inst) => {
      const totalRecebimentos = dados.doacoes.filter(
        (d) => d.id_instituicao == inst.id
      ).length;
      const quantidadeTotal = dados.doacoes
        .filter((d) => d.id_instituicao == inst.id)
        .reduce((acc, d) => acc + parseInt(d.quantidade), 0);
      return { ...inst, totalRecebimentos, quantidadeTotal };
    })
    .sort((a, b) => b.totalRecebimentos - a.totalRecebimentos);

  const resultado = document.getElementById("relatorio-resultado");
  resultado.innerHTML = `<div style="padding: 20px;">
            <h4>[translate:Instituições Atendidas]</h4>
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Instituição]</th>
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">CNPJ</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Total Recebido]</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Quantidade]</th>
                    </tr>
                </thead>
                <tbody>
                    ${instituicoesComTotal
    .map(
      (i) => `<tr>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${i.nome}</td>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${i.cnpj}</td>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${i.totalRecebimentos} [translate:doações]</td>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${i.quantidadeTotal} [translate:unidades]</td>
                        </tr>`
    )
    .join("")}
                </tbody>
            </table>
        </div>`;
}

function gerarRelatorioEstoque() {
  const alimentosPorCategoria = {};
  dados.alimentos.forEach((a) => {
    if (!alimentosPorCategoria[a.categoria]) {
      alimentosPorCategoria[a.categoria] = [];
    }
    alimentosPorCategoria[a.categoria].push(a);
  });

  const resultado = document.getElementById("relatorio-resultado");
  resultado.innerHTML = `<div style="padding: 20px;">
                <h4>[translate:Relatório de Estoque]</h4>
                <p><strong>[translate:Total de Itens:]</strong> ${
    dados.alimentos.length
  }
                </p>
            <div style="margin-top: 20px;">
                ${Object.keys(alimentosPorCategoria)
    .map(
      (categoria) => `<div style="margin-bottom: 20px;">
                        <h5 style="background: #f8f9fa; padding: 10px; border-radius: 4px;">${categoria}</h5>
                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <thead>
                                    <tr style="background: #f8f9fa;">
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Alimento]</th>
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Quantidade]</th>
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">[translate:Validade]</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${alimentosPorCategoria[categoria]
        .map(
          (a) => `<tr>
                                            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${
            a.nome
          }</td>
                                            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${
            a.quantidade
          } ${a.unidade}</td>
                                            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${
            a.validade
              ? new Date(a.validade).toLocaleDateString("pt-BR")
              : "[translate:Não informado]"
          }</td>
                                            </tr>`
        )
        .join("")}
                                </tbody>
                            </table>
                    </div>
                    `
    )
    .join("")}
            </div>
        </div>`;
}

window.addEventListener("DOMContentLoaded", () => {
  carregarDados();
});

