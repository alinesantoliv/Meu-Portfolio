// ==================================================================
// script.js — COMPORTAMENTO (INTERATIVIDADE) DO PORTFÓLIO
// O HTML tem o conteúdo e o CSS a aparência; este arquivo faz a página FUNCIONAR.
//
// ÍNDICE:
// 1. Dados: lista de PROJETOS e de HABILIDADES
// 2. Módulo da página: tema claro/escuro, menu, 'Ler mais', habilidades e projetos
// 3. Módulo do formulário de contato: validação e envio
// ==================================================================

// ==================================================================
// 1. DADOS (PROJETOS E HABILIDADES)
// Para mudar o que aparece nos cartões ou na grade de tecnologias, basta editar estas listas.
// ==================================================================
// Dados do projeto e hablidades
// Lista de projetos da seção Projetos. Para adicionar um novo, copie um bloco { ... } e preencha os campos:
// nome | tipo (aparece no verso) | categoria (define o filtro) | arte (trecho de código mostrado na frente do cartão) |
// problema, publico, contribuicao (textos do verso) | techs (etiquetas) | repo (link do GitHub) | demo (link opcional: se vazio, o botão some).
window.PROJETOS = [
  // Projeto 1: Portfólio Pessoal (categoria Front-end/Web).
  {
    nome: "Portfólio Pessoal",
    tipo: "Projeto de aula • Front-end",
    categoria: "Front-end/Web",
    arte: '<section class="portfolio">\n  <h1>Aline Oliveira</h1>\n  <span>HTML • CSS • JS</span>\n</section>',
    problema: "Centralizar apresentação profissional, projetos técnicos e canal de contato acessível em uma interface responsiva.",
    publico: "Recrutadores, professores e potenciais clientes de tecnologia.",
    contribuicao: "Arquitetura semântica HTML, identidade visual responsiva com tema escuro, filtro dinâmico e validação acessível.",
    techs: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/alinesantoliv/Meu-Portfolio",
    demo: ""
  },
  // Projeto 2: Spring Boot Cliente (categoria Back-end).
  {
    nome: "Spring Boot Cliente",
    tipo: "Projeto de aula • Back-end",
    categoria: "Back-end",
    arte: "@RestController\n@RequestMapping(\"/clientes\")\npublic class ClienteController {\n  // CRUD REST com Spring Boot\n}",
    problema: "Padronizar o cadastro, consulta e manutenção de dados de clientes por meio de uma API REST estruturada.",
    publico: "Sistemas comerciais e aplicações front-end que consomem dados cadastrais.",
    contribuicao: "Implementação dos endpoints REST, camadas de controle/serviço e organização do projeto Maven.",
    techs: ["Java", "Spring Boot", "Maven", "Git/GitHub"],
    repo: "https://github.com/alinesantoliv/springboot-cliente.git",
    demo: ""
  },
  // Projeto 3: House of Letters (categoria Back-end).
  {
    nome: "House of Letters",
    tipo: "Projeto de aula • Back-end",
    categoria: "Back-end",
    arte: "public class Livro {\n  private String titulo;\n  private boolean emprestado;\n}",
    problema: "Controlar acervo de livros, cadastro de leitores/funcionários e fluxo de empréstimos em bibliotecas.",
    publico: "Bibliotecas escolares e comunitárias que precisam automatizar empréstimos.",
    contribuicao: "Modelagem das classes de domínio, regras de empréstimo/devolução e aplicação de Programação Orientada a Objetos.",
    techs: ["Java", "POO", "Git/GitHub"],
    repo: "https://github.com/alinesantoliv/House-of-Letters.git",
    demo: ""
  }
];

// Endereço base dos ícones (Devicon, hospedados na CDN jsDelivr). Cada habilidade só completa o caminho: D + 'java/java-original.svg'.
const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
// Lista de tecnologias da seção Habilidades. Cada item tem: nome | contexto (frase curta abaixo do nome) | icone (endereço da imagem).
window.HABILIDADES = [
  { nome: "Java", contexto: "POO e lógica back-end", icone: D + "java/java-original.svg" },
  { nome: "HTML5", contexto: "Estruturação semântica", icone: D + "html5/html5-original.svg" },
  { nome: "CSS3", contexto: "Layouts responsivos", icone: D + "css3/css3-original.svg" },
  { nome: "JavaScript", contexto: "DOM, filtros e validação", icone: D + "javascript/javascript-original.svg" },
  { nome: "MySQL", contexto: "Modelagem e SQL", icone: D + "mysql/mysql-original.svg" },
  { nome: "Python", contexto: "Lógica e scripts", icone: D + "python/python-original.svg" },
  { nome: "Spring Boot", contexto: "APIs REST em Java", icone: D + "spring/spring-original.svg" },
  { nome: "Git & GitHub", contexto: "Versionamento de código", icone: D + "github/github-original.svg" }
];

// ==================================================================
// 2. MÓDULO DA PÁGINA
// Tema claro/escuro, menu, botão 'Ler mais', habilidades e projetos.
// ==================================================================
// Função autoexecutável (IIFE): roda sozinha e mantém as variáveis deste módulo privadas, sem poluir o resto da página.
(function () {
  // 'use strict' ativa o modo estrito do JavaScript, que ajuda a evitar erros comuns (ex.: usar variável não declarada).
  "use strict";
  // Atalho: $('nome') equivale a document.getElementById('nome'), ou seja, pega um elemento do HTML pelo id.
  const $ = (id) => document.getElementById(id);
  // Função auxiliar para criar elementos: criar('div', 'classe', 'texto') cria a tag, coloca a classe e o texto.
  // Usa textContent, que é seguro (o texto nunca é interpretado como HTML).
  const criar = (tag, cls, texto) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto !== undefined) e.textContent = texto;
    return e;
  };

  // Aplica o tema escuro/claro e salva a preferência no localStorage
  function iniciarTema() {
    // Pega o botão de tema que está no HTML.
    const botao = $("theme-btn");
    // aplicar(): coloca data-theme='dark' ou 'light' no html (o CSS troca as cores a partir disso),
    // atualiza aria-pressed e aria-label (acessibilidade) e troca o emoji entre sol e lua.
    const aplicar = (tema) => {
      document.documentElement.dataset.theme = tema;
      const escuro = tema === "dark";
      botao.setAttribute("aria-pressed", String(escuro));
      botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
      botao.firstElementChild.textContent = escuro ? "☀️" : "🌙";
    };
    // Aplica o tema inicial: o que o script do head já definiu (tema salvo ou preferência do sistema).
    aplicar(document.documentElement.dataset.theme || "light");
    // Ao clicar: alterna entre claro e escuro e salva a escolha no localStorage.
    // O try/catch evita erro caso o navegador bloqueie o armazenamento.
    botao.addEventListener("click", () => {
      const novo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      aplicar(novo);
      try { localStorage.setItem("tema", novo); } catch (e) {}
    });
  }

  // Destaca no menu superior a seção atual lida usando IntersectionObserver
  function iniciarMenu() {
    // nav é o menu; abas são todos os links dele.
    const nav = $("nav");
    const abas = nav.querySelectorAll(".nav-tab");
    // marcar(id): coloca aria-current no link da seção atual (o CSS pinta esse link de vermelho) e remove dos outros.
    const marcar = (id) => abas.forEach((a) => {
      if (a.dataset.section === id) a.setAttribute("aria-current", "location"); 
      else a.removeAttribute("aria-current");
    });
    // O IntersectionObserver avisa quando uma seção entra na faixa central da tela (rootMargin)
    // e então chama marcar() com o id dessa seção.
    const obs = new IntersectionObserver((itens) => {
      itens.forEach((i) => { if (i.isIntersecting) marcar(i.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // Passa a observar a capa (header) e todas as seções que têm id.
    document.querySelectorAll("header[id], section[id]").forEach((s) => obs.observe(s));
    // Estado inicial: o link 'Início' começa destacado.
    marcar("inicio");
  }

  // Lida com botões tipo "Ler mais" e a animação de fade-in da rolagem de tela
  function iniciarInteracoes() {
    // Pega o botão 'Ler mais' e o parágrafo extra do Sobre mim.
    const b = $("toggle-about-btn"), extra = $("about-extra");
    // Ao clicar: mostra ou esconde o texto extra (atributo hidden), atualiza o aria-expanded e troca o texto do botão.
    b.addEventListener("click", () => {
      const abrir = extra.hidden;
      extra.hidden = !abrir;
      b.setAttribute("aria-expanded", String(abrir));
      b.textContent = abrir ? "Mostrar menos" : "Ler mais";
    });
    // Animação de entrada: quando uma seção com a classe fade-in-hidden aparece na tela, recebe fade-in-visible
    // (o CSS faz ela 'subir' suavemente) e deixa de ser observada, então a animação acontece só uma vez.
    const animObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          animObs.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
    // Começa a observar todas as seções marcadas com fade-in-hidden no HTML.
    document.querySelectorAll(".fade-in-hidden").forEach((el) => animObs.observe(el));
  }

  // Cria e anexa as divs das tecnologias com base na lista de HABILIDADES
  function renderizarHabilidades() {
    // Pega a área do HTML onde os itens serão colocados.
    const grade = $("tech-grid");
    // Para cada tecnologia da lista, monta um bloco com ícone, nome e contexto.
    window.HABILIDADES.forEach((h) => {
      const item = criar("div", "tech-badge");
      const icone = criar("div", "tech-icon");
      // Imagem do ícone: o alt recebe o nome (leitores de tela) e o loading lazy carrega só quando necessário.
      const img = criar("img"); 
      img.src = h.icone; 
      img.alt = h.nome; 
      img.loading = "lazy"; 
      const nomeText = criar("span", "tech-name", h.nome);
      const contextoText = criar("span", "tech-cat", h.contexto);
      icone.appendChild(img);
      // Junta as partes do bloco e coloca na grade.
      item.append(icone, nomeText, contextoText);
      grade.appendChild(item);
    });
  }

  // Gera o HTML do card de cada projeto, incluindo o funcionamento de rotação (flip)
  function criarCartao(p, indice, total) {
    // Parâmetros: p = dados de um projeto | indice = posição (0, 1, 2...) | total = quantidade de projetos.
    // O cartão externo guarda a categoria em dataset.categoria, que o filtro usa depois.
    const card = criar("article", "photocard-wrapper");
    card.dataset.categoria = p.categoria;
    // 'inner' é a peça que gira (efeito flip). Dentro dela ficam a FRENTE e o VERSO do cartão.
    const inner = criar("div", "photocard-inner");
    // ----- FRENTE DO CARTÃO -----
    const frente = criar("div", "photocard-front");
    // Linha do topo: número do projeto (ex.: 01 / 03) e categoria.
    const meta = criar("div", "card-top-meta");
    meta.append(
      criar("span", "", String(indice + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0")),
      criar("span", "", p.categoria)
    );
    // Área central: mostra o trecho de código (p.arte) dentro de pre e code, que preservam a formatação.
    const arte = criar("div", "card-art code-art");
    const pre = criar("pre");
    pre.appendChild(criar("code", "", p.arte));
    arte.appendChild(pre);
    // Legenda: nome do projeto e botão 'Ver detalhes'.
    const legenda = criar("div", "card-caption");
    legenda.appendChild(criar("h3", "", p.nome));
    // Botão que vira o cartão. aria-expanded e aria-label ajudam os leitores de tela.
    const abrir = criar("button", "card-btn", "Ver detalhes");
    abrir.type = "button";
    abrir.setAttribute("aria-expanded", "false");
    abrir.setAttribute("aria-label", "Ver detalhes de " + p.nome);
    legenda.appendChild(abrir);
    // Junta as partes da frente.
    frente.append(meta, arte, legenda);
    // ----- VERSO DO CARTÃO -----
    const verso = criar("div", "photocard-back");
    // inert deixa o verso 'desativado' (sem foco de teclado nem cliques) enquanto está escondido.
    verso.inert = true;
    // Faixa do topo com o tipo do projeto e, abaixo, o corpo com o nome.
    const topo = criar("div", "card-back-header", p.tipo);
    const corpo = criar("div", "card-back-body");
    corpo.appendChild(criar("h3", "", p.nome));
    // Lista com Problema, Público e Contribuição.
    const detalhes = criar("ul", "card-detalhes-lista");
    // Pares [rótulo, texto]. O forEach abaixo transforma cada par em um item de lista, com o rótulo em negrito (strong).
    const itensDetalhes = [
      ["Problema: ", p.problema],
      ["Público: ", p.publico],
      ["Contribuição: ", p.contribuicao]
    ];
    itensDetalhes.forEach(([rotulo, valor]) => {
      const li = criar("li");
      li.append(criar("strong", "", rotulo), document.createTextNode(valor));
      detalhes.appendChild(li);
    });
    corpo.appendChild(detalhes);
    // Etiquetas das tecnologias usadas no projeto (p.techs).
    const techs = criar("div", "card-techs");
    p.techs.forEach((t) => techs.appendChild(criar("span", "", t)));
    // Botões de link: só são criados se o projeto tiver repositório ou demonstração.
    const acoes = criar("div", "card-acoes");
    // Botão 'Repositório': abre o GitHub em nova aba (rel noopener noreferrer por segurança).
    if (p.repo) {
      const a = criar("a", "repo-btn", "Repositório");
      a.href = p.repo;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      acoes.appendChild(a);
    }
    // Botão 'Demonstração': só aparece se o projeto tiver um link de demo.
    if (p.demo) {
      const a = criar("a", "repo-btn", "Demonstração");
      a.href = p.demo;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      acoes.appendChild(a);
    }
    // Botão 'Voltar', que desvira o cartão.
    const voltar = criar("button", "card-btn", "Voltar");
    voltar.type = "button";
    // Junta as partes do verso.
    verso.append(topo, corpo, techs, acoes, voltar);
    // alternar(virar): true mostra o verso e false volta para a frente. Adiciona ou remove a classe 'flipped' (o CSS faz o giro 3D),
    // desativa (inert) o lado escondido, atualiza o aria-expanded e leva o foco do teclado ao botão do lado visível.
    const alternar = (virar) => {
      card.classList.toggle("flipped", virar);
      frente.inert = virar;
      verso.inert = !virar;
      abrir.setAttribute("aria-expanded", String(virar));
      (virar ? voltar : abrir).focus();
    };
    // Cliques: 'Ver detalhes' vira para o verso e 'Voltar' retorna para a frente.
    abrir.addEventListener("click", () => alternar(true));
    voltar.addEventListener("click", () => alternar(false));
    // Monta o cartão completo e devolve (return) para ser inserido na página.
    inner.append(frente, verso);
    card.appendChild(inner);
    return card;
  }

  // Gera dinamicamente os botões de filtros de projetos e sua mecânica de exibição
  function iniciarProjetos() {
    // Pega no HTML: grade (onde entram os cartões), barra (onde entram os filtros), contagem (texto 'X projetos') e vazio (aviso sem resultados).
    const grade = $("grade-projetos"), barra = $("filtros"), contagem = $("contagem"), vazio = $("sem-resultados");
    // Cria um cartão para cada projeto da lista e o coloca na grade.
    const cartoes = window.PROJETOS.map((p, i) => criarCartao(p, i, window.PROJETOS.length));
    cartoes.forEach((c) => grade.appendChild(c));
    // Lista de filtros: 'Todos' + categorias dos projetos. O Set remove categorias repetidas.
    const categorias = ["Todos", ...new Set(window.PROJETOS.map((p) => p.categoria))];
    // Guarda qual filtro está ativo no momento.
    let ativo = "Todos";
    // Cria um botão para cada categoria; ao clicar, chama filtrar().
    const botoes = categorias.map((cat) => {
      const b = criar("button", "filtro-btn", cat);
      b.type = "button";
      b.addEventListener("click", () => filtrar(cat));
      barra.appendChild(b);
      return b;
    });
    // filtrar(cat): marca o botão ativo (aria-pressed e classe 'ativo'), mostra só os cartões da categoria (ou todos),
    // atualiza o texto de contagem e exibe o aviso caso nenhum projeto seja encontrado.
    function filtrar(cat) {
      ativo = cat;
      // Atualiza o visual dos botões: só o da categoria escolhida fica ativo.
      botoes.forEach((b) => {
        const on = b.textContent === cat;
        b.setAttribute("aria-pressed", String(on));
        b.classList.toggle("ativo", on);
      });
      // n conta quantos cartões ficaram visíveis.
      let n = 0;
      // Esconde (hidden) os cartões de outras categorias e conta os que continuam visíveis.
      cartoes.forEach((c) => {
        const mostra = cat === "Todos" || c.dataset.categoria === cat;
        c.hidden = !mostra;
        if (mostra) n++;
      });
      // Singular ou plural: '1 projeto encontrado' ou 'N projetos encontrados'.
      contagem.textContent = n === 1 ? "1 projeto encontrado" : n + " projetos encontrados";
      vazio.hidden = n !== 0;
    }
    // O botão 'Mostrar todos' do aviso volta para o filtro 'Todos'.
    $("limpar-filtro").addEventListener("click", () => filtrar("Todos"));
    // Aplica o filtro inicial (Todos).
    filtrar(ativo);
  }

  // EXECUÇÃO: chama cada função acima, na ordem, para 'ligar' a página.
  iniciarTema();
  iniciarMenu();
  iniciarInteracoes();
  renderizarHabilidades();
  iniciarProjetos();
})();

// ==================================================================
// 3. MÓDULO DO FORMULÁRIO DE CONTATO
// Validação dos campos, contador de caracteres, campo condicional 'Assunto' e envio real pelo Formspree.
// ==================================================================
// formulário de contato
// Função autoexecutável (IIFE): mantém as variáveis do formulário privadas.
(function () {
  "use strict";
  // Endereço do serviço Formspree, que recebe a mensagem e a encaminha para o e-mail.
  const URL_ENVIO = "https://formspree.io/f/mrpqgelp"; 
  // Tempo máximo de espera pelo envio: 10000 ms = 10 segundos.
  const TEMPO_LIMITE_MS = 10000;
  // Mesmo atalho de getElementById, agora dentro deste módulo.
  const $ = (id) => document.getElementById(id);

  // Reúne em um objeto todos os elementos do formulário (campos, contador, status, botão...), evitando repetir getElementById.
  function selecionarElementos() {
    return {
      form: $("form-contato"),
      nome: $("nome"),
      email: $("email"),
      motivo: $("motivo"),
      bloco: $("container-assunto"),
      assunto: $("assunto"),
      mensagem: $("mensagem"),
      contador: $("contador-msg"),
      status: $("status-envio"),
      botao: $("btn-enviar"),
      resumo: $("resumo-erros")
    };
  }

  // el guarda os elementos; campos é a lista dos campos que passam por validação.
  const el = selecionarElementos();
  const campos = [el.nome, el.email, el.motivo, el.assunto, el.mensagem];
  // Trava: fica true enquanto o envio acontece, para impedir cliques repetidos.
  let enviando = false;

  // Conta os caracteres ignorando espaços no começo e no fim (trim). É o mesmo critério para o contador e para a validação.
  const contarCaracteresUteis = (texto) => texto.trim().length;

  // Lê os valores dos campos (sem espaços sobrando) e monta o objeto a ser enviado.
  // O assunto só entra se o campo estiver habilitado (motivo 'Outro').
  function lerDadosFormulario() {
    const dados = {
      nome: el.nome.value.trim(),
      email: el.email.value.trim(),
      motivo: el.motivo.value,
      mensagem: el.mensagem.value.trim()
    };
    if (!el.assunto.disabled) {
      dados.assunto = el.assunto.value.trim();
    }
    return dados;
  }

  // Devolve true se o número está abaixo do mínimo ou acima do máximo.
  const foraDaFaixa = (n, min, max) => n < min || n > max;

  // Objeto centralizando as regras de validação para cada campo do form
  const regras = {
    // Cada regra devolve o texto do erro, ou '' (vazio) quando o campo é válido.
    // Nome: de 3 a 80 caracteres úteis.
    nome: () => foraDaFaixa(contarCaracteresUteis(el.nome.value), 3, 80)
      ? "O nome deve ter entre 3 e 80 caracteres úteis."
      : "",
    // E-mail: obrigatório e com formato válido (checkValidity do HTML5).
    email: () => {
      if (!el.email.value.trim()) return "Informe seu e-mail.";
      return el.email.checkValidity() ? "" : "Use um e-mail em formato válido, como nome@exemplo.com.";
    },
    // Motivo: é preciso selecionar uma opção.
    motivo: () => el.motivo.value ? "" : "Selecione um motivo.",
    // Assunto: só é validado se o campo estiver habilitado (motivo 'Outro'); de 5 a 100 caracteres.
    assunto: () => el.assunto.disabled
      ? ""
      : (foraDaFaixa(contarCaracteresUteis(el.assunto.value), 5, 100)
          ? "O assunto deve ter entre 5 e 100 caracteres úteis."
          : ""),
    // Mensagem: de 30 a 1000 caracteres úteis.
    mensagem: () => foraDaFaixa(contarCaracteresUteis(el.mensagem.value), 30, 1000)
      ? "A mensagem deve ter entre 30 e 1000 caracteres úteis."
      : ""
  };

  // CORREÇÃO DO CINZA: esconde a dica quando tem erro, mostra de novo quando corrigir
  function mostrarErroCampo(campo, msg) {
    // Escreve a mensagem no espaço de erro do campo (id 'erro-' + id do campo).
    $("erro-" + campo.id).textContent = msg;
    const dica = $("dica-" + campo.id);
    if (dica) dica.hidden = !!msg;
    // aria-invalid='true' marca o campo como inválido: o CSS pinta a borda de vermelho e leitores de tela avisam.
    if (msg) {
      campo.setAttribute("aria-invalid", "true");
    } else {
      campo.removeAttribute("aria-invalid");
    }
  }

  // Valida um campo: roda a regra, mostra ou limpa o erro e devolve true (válido) ou false (inválido).
  function validarCampo(campo) {
    const msg = regras[campo.id]();
    mostrarErroCampo(campo, msg);
    return !msg;
  }

  // Mostra a frase de resumo ('Corrija N campo(s)...') com a quantidade de campos inválidos, ou esconde o resumo se não houver erros.
  function atualizarResumoErros() {
    const invalidos = campos.filter((c) => c.getAttribute("aria-invalid") === "true");
    el.resumo.hidden = invalidos.length === 0;
    if (!invalidos.length) return;
    el.resumo.textContent = `Corrija ${invalidos.length} campo(s) antes de enviar.`;
  }

  // Mostra a mensagem de status do envio. O 'tipo' vira classe CSS (sucesso, erro ou processando) e define a cor.
  function definirStatus(texto, tipo) {
    el.status.textContent = texto;
    el.status.className = tipo || "";
  }

  // Atualiza o contador 'N / 1000' e o deixa vermelho se a mensagem tiver menos de 30 ou mais de 1000 caracteres.
  function atualizarContador() {
    const n = contarCaracteresUteis(el.mensagem.value);
    el.contador.textContent = n + " / 1000";
    el.contador.classList.toggle("contador-alerta", n > 1000 || (n > 0 && n < 30));
  }

  // Torna obrigatório ou esconde o campo de "assunto" caso a opção Outro seja escolhida
  function atualizarAssuntoCondicional() {
    const outro = el.motivo.value === "Outro";
    // Mostra o bloco do assunto só se o motivo for 'Outro', e habilita o campo e o torna obrigatório.
    el.bloco.hidden = !outro;
    el.assunto.disabled = !outro;
    el.assunto.required = outro;
    // Se não for 'Outro': limpa o texto, remove o erro e atualiza o resumo caso ele esteja visível.
    if (!outro) {
      el.assunto.value = "";
      mostrarErroCampo(el.assunto, "");
      if (!el.resumo.hidden) {
        atualizarResumoErros();
      }
    }
  }

  // Liga ou desliga o 'modo enviando': trava o botão, marca o formulário como ocupado (aria-busy) e troca o texto do botão.
  function definirEstadoEnvio(ativo) {
    enviando = ativo;
    el.botao.disabled = ativo;
    el.form.setAttribute("aria-busy", String(ativo));
    el.botao.textContent = ativo ? "Enviando..." : "Enviar mensagem";
  }

  // Processa a requisição POST na API de form com tempo limite estipulado
  async function enviarParaServidor(dados) {
    // O AbortController permite cancelar o envio se passar do tempo limite (o setTimeout logo abaixo).
    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
    // Corpo da requisição: _subject é o assunto do e-mail que o Formspree envia; os ...dados espalham os campos do formulário.
    const corpo = {
      _subject: "Portfólio: " + dados.motivo + (dados.assunto ? " - " + dados.assunto : ""),
      ...dados
    };
    try {
      // Faz o POST (envio) dos dados em formato JSON para o Formspree e aguarda a resposta.
      const resposta = await fetch(URL_ENVIO, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(corpo),
        signal: controle.signal
      });
      // Se o servidor responder com erro, gera uma exceção que será tratada no catch de processarEnvio.
      if (!resposta.ok) throw new Error("Status " + resposta.status);
    } finally {
      // Executa sempre (finally), com sucesso ou erro: cancela o cronômetro do tempo limite.
      clearTimeout(limite);
    }
  }

  // Orquestra a validação final antes do envio real, limpando o form no sucesso
  async function processarEnvio(e) {
    // Impede o comportamento padrão do navegador (recarregar a página ao enviar).
    e.preventDefault();
    // Se já está enviando, ignora novos cliques.
    if (enviando) return;
    // Limpa o status da tentativa anterior.
    definirStatus("", "");
    // Valida TODOS os campos de uma vez e atualiza o resumo de erros.
    campos.forEach((c) => validarCampo(c));
    atualizarResumoErros();
    const invalidos = campos.filter((c) => c.getAttribute("aria-invalid") === "true");
    // Se existe campo inválido: leva o foco ao primeiro deles (acessibilidade) e interrompe o envio.
    if (invalidos.length) { 
      invalidos[0].focus(); 
      return; 
    }
    // Tudo válido: trava o botão e mostra 'Enviando...'.
    definirEstadoEnvio(true);
    definirStatus("Enviando sua mensagem...", "processando");
    try {
      // Envia os dados e espera a resposta (await). Se der erro, o código pula para o catch.
      await enviarParaServidor(lerDadosFormulario());
      // Sucesso: limpa o formulário e esconde o resumo de erros.
      el.form.reset(); 
      el.resumo.hidden = true;
      // Mostra as dicas de novo depois do envio com sucesso
      ["nome","email","assunto","mensagem"].forEach((id) => {
        const d = $("dica-" + id);
        if (d) d.hidden = false;
        const c = $(id);
        if (c) c.removeAttribute("aria-invalid");
        const e2 = $("erro-" + id);
        if (e2) e2.textContent = "";
      });
      // Esconde de novo o campo de assunto e zera o contador de caracteres.
      atualizarAssuntoCondicional(); 
      atualizarContador();
      // Mostra a confirmação de sucesso.
      definirStatus("Mensagem enviada com sucesso! Responderei no e-mail informado.", "sucesso");
    } catch (err) {
      // Falha (internet, tempo esgotado ou erro do servidor): mantém os dados digitados e avisa para tentar de novo.
      definirStatus(
        "Falha no envio. Seus dados foram mantidos: tente novamente. Se persistir, use o e-mail dos canais de contato.",
        "erro"
      );
    } finally {
      // Executa sempre, com sucesso ou erro: libera o botão novamente.
      definirEstadoEnvio(false);
    }
  }

  // ATIVAÇÃO DOS EVENTOS: ligam as funções acima às ações da pessoa.
  // Ao enviar o formulário, roda processarEnvio.
  el.form.addEventListener("submit", processarEnvio);
  // Para cada campo: ao sair dele (blur) ele é validado; ao digitar (input) o status é limpo e, se o campo já estava com erro,
  // ele é revalidado na hora, para o erro sumir assim que for corrigido.
  campos.forEach((c) => {
    c.addEventListener("blur", () => validarCampo(c));
    c.addEventListener("input", () => {
      if (!enviando) definirStatus("", "");
      if (c.hasAttribute("aria-invalid")) {
        validarCampo(c);
        if (!el.resumo.hidden) atualizarResumoErros();
      }
    });
  });
  // Atualiza o contador de caracteres a cada letra digitada na mensagem.
  el.mensagem.addEventListener("input", atualizarContador);
  // Ao trocar o motivo, mostra ou esconde o campo 'Assunto adicional'.
  el.motivo.addEventListener("change", atualizarAssuntoCondicional);
})();
