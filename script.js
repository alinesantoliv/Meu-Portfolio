// Dados do projeto e hablidades
// Fonte única de dados dos projetos (separada da lógica de filtro e interface)
window.PROJETOS = [
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

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
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

// funcionalidades gerais do portfólio (tema, menu, interações, projetos e habilidades)
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const criar = (tag, cls, texto) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto !== undefined) e.textContent = texto;
    return e;
  };

  // Alternância acessível entre tema claro e escuro
  function iniciarTema() {
    const botao = $("theme-btn");
    const aplicar = (tema) => {
      document.documentElement.dataset.theme = tema;
      const escuro = tema === "dark";
      botao.setAttribute("aria-pressed", String(escuro));
      botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
      botao.firstElementChild.textContent = escuro ? "☀️" : "🌙";
    };
    aplicar(document.documentElement.dataset.theme || "light");
    botao.addEventListener("click", () => {
      const novo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      aplicar(novo);
      try { localStorage.setItem("tema", novo); } catch (e) {}
    });
  }

  // Destaca a seção visível no menu com aria-current="location"
  function iniciarMenu() {
    const nav = $("nav");
    const abas = nav.querySelectorAll(".nav-tab");
    
    const marcar = (id) => abas.forEach((a) => {
      if (a.dataset.section === id) a.setAttribute("aria-current", "location"); 
      else a.removeAttribute("aria-current");
    });
    
    const obs = new IntersectionObserver((itens) => {
      itens.forEach((i) => { if (i.isIntersecting) marcar(i.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    
    document.querySelectorAll("header[id], section[id]").forEach((s) => obs.observe(s));
    marcar("inicio");
  }

  // Expansão do texto "Sobre mim" e revelação suave das seções
  function iniciarInteracoes() {
    const b = $("toggle-about-btn"), extra = $("about-extra");
    b.addEventListener("click", () => {
      const abrir = extra.hidden;
      extra.hidden = !abrir;
      b.setAttribute("aria-expanded", String(abrir));
      b.textContent = abrir ? "Mostrar menos" : "Ler mais";
    });

    const animObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          animObs.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    document.querySelectorAll(".fade-in-hidden").forEach((el) => animObs.observe(el));
  }

  // Renderiza as habilidades com ícone, nome e contexto de aplicação
  function renderizarHabilidades() {
    const grade = $("tech-grid");
    window.HABILIDADES.forEach((h) => {
      const item = criar("div", "tech-badge");
      const icone = criar("div", "tech-icon");
      const img = criar("img"); 
      img.src = h.icone; 
      img.alt = h.nome; 
      img.loading = "lazy"; 
      
      const nomeText = criar("span", "tech-name", h.nome);
      const contextoText = criar("span", "tech-cat", h.contexto);

      icone.appendChild(img);
      item.append(icone, nomeText, contextoText);
      grade.appendChild(item);
    });
  }

  // Cria o card interativo de projeto usando textContent e inert para foco acessível
  function criarCartao(p, indice, total) {
    const card = criar("article", "photocard-wrapper");
    card.dataset.categoria = p.categoria;
    const inner = criar("div", "photocard-inner");

    const frente = criar("div", "photocard-front");
    const meta = criar("div", "card-top-meta");
    meta.append(
      criar("span", "", String(indice + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0")),
      criar("span", "", p.categoria)
    );
    const arte = criar("div", "card-art code-art");
    const pre = criar("pre");
    pre.appendChild(criar("code", "", p.arte));
    arte.appendChild(pre);

    const legenda = criar("div", "card-caption");
    legenda.appendChild(criar("h3", "", p.nome));
    const abrir = criar("button", "card-btn", "Ver detalhes");
    abrir.type = "button";
    abrir.setAttribute("aria-expanded", "false");
    abrir.setAttribute("aria-label", "Ver detalhes de " + p.nome);
    legenda.appendChild(abrir);
    frente.append(meta, arte, legenda);

    const verso = criar("div", "photocard-back");
    verso.inert = true; // Impede foco via Tab enquanto o verso estiver oculto
    const topo = criar("div", "card-back-header", p.tipo);
    const corpo = criar("div", "card-back-body");
    corpo.appendChild(criar("h3", "", p.nome));

    const detalhes = criar("ul", "card-detalhes-lista");
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
    
    const techs = criar("div", "card-techs");
    p.techs.forEach((t) => techs.appendChild(criar("span", "", t)));
    
    const acoes = criar("div", "card-acoes");
    if (p.repo) {
      const a = criar("a", "repo-btn", "Repositório");
      a.href = p.repo;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      acoes.appendChild(a);
    }
    if (p.demo) {
      const a = criar("a", "repo-btn", "Demonstração");
      a.href = p.demo;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      acoes.appendChild(a);
    }
    
    const voltar = criar("button", "card-btn", "Voltar");
    voltar.type = "button";
    verso.append(topo, corpo, techs, acoes, voltar);

    const alternar = (virar) => {
      card.classList.toggle("flipped", virar);
      frente.inert = virar;
      verso.inert = !virar;
      abrir.setAttribute("aria-expanded", String(virar));
      (virar ? voltar : abrir).focus();
    };
    abrir.addEventListener("click", () => alternar(true));
    voltar.addEventListener("click", () => alternar(false));
    
    inner.append(frente, verso);
    card.appendChild(inner);
    return card;
  }

  // Inicializa o filtro por categoria com estado programático (aria-pressed) e contagem
  function iniciarProjetos() {
    const grade = $("grade-projetos"), barra = $("filtros"), contagem = $("contagem"), vazio = $("sem-resultados");
    const cartoes = window.PROJETOS.map((p, i) => criarCartao(p, i, window.PROJETOS.length));
    cartoes.forEach((c) => grade.appendChild(c));

    // Categorias derivadas dinamicamente dos dados dos projetos
    const categorias = ["Todos", ...new Set(window.PROJETOS.map((p) => p.categoria))];
    let ativo = "Todos";
    
    const botoes = categorias.map((cat) => {
      const b = criar("button", "filtro-btn", cat);
      b.type = "button";
      b.addEventListener("click", () => filtrar(cat));
      barra.appendChild(b);
      return b;
    });

    function filtrar(cat) {
      ativo = cat;
      botoes.forEach((b) => {
        const on = b.textContent === cat;
        b.setAttribute("aria-pressed", String(on));
        b.classList.toggle("ativo", on);
      });
      let n = 0;
      cartoes.forEach((c) => {
        const mostra = cat === "Todos" || c.dataset.categoria === cat;
        c.hidden = !mostra;
        if (mostra) n++;
      });
      contagem.textContent = n === 1 ? "1 projeto encontrado" : n + " projetos encontrados";
      vazio.hidden = n !== 0;
    }

    $("limpar-filtro").addEventListener("click", () => filtrar("Todos"));
    filtrar(ativo);
  }

  iniciarTema();
  iniciarMenu();
  iniciarInteracoes();
  renderizarHabilidades();
  iniciarProjetos();
})();

// formulário de contato com validação e envio assíncrono 
(function () {
  "use strict";
  const URL_ENVIO = "https://formspree.io/f/mrpqgelp"; 
  const TEMPO_LIMITE_MS = 10000;
  const $ = (id) => document.getElementById(id);

  // Seleção dos elementos do DOM
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

  const el = selecionarElementos();
  const campos = [el.nome, el.email, el.motivo, el.assunto, el.mensagem];
  let enviando = false;

  // Leitura e normalização (mesmo critério de contagem no contador e na validação)
  const contarCaracteresUteis = (texto) => texto.trim().length;

  function lerDadosFormulario() {
    const dados = {
      nome: el.nome.value.trim(),
      email: el.email.value.trim(),
      motivo: el.motivo.value,
      mensagem: el.mensagem.value.trim()
    };
    // Só inclui assunto adicional nos dados processados quando o motivo for "Outro"
    if (!el.assunto.disabled) {
      dados.assunto = el.assunto.value.trim();
    }
    return dados;
  }

  // Regras de validação (combinam restrições nativas e regras de negócio)
  const foraDaFaixa = (n, min, max) => n < min || n > max;

  const regras = {
    nome: () => foraDaFaixa(contarCaracteresUteis(el.nome.value), 3, 80)
      ? "O nome deve ter entre 3 e 80 caracteres úteis."
      : "",
    email: () => {
      if (!el.email.value.trim()) return "Informe seu e-mail.";
      return el.email.checkValidity() ? "" : "Use um e-mail em formato válido, como nome@exemplo.com.";
    },
    motivo: () => el.motivo.value ? "" : "Selecione um motivo.",
    assunto: () => el.assunto.disabled
      ? ""
      : (foraDaFaixa(contarCaracteresUteis(el.assunto.value), 5, 100)
          ? "O assunto deve ter entre 5 e 100 caracteres úteis."
          : ""),
    mensagem: () => foraDaFaixa(contarCaracteresUteis(el.mensagem.value), 30, 1000)
      ? "A mensagem deve ter entre 30 e 1000 caracteres úteis."
      : ""
  };

  const obterRotulo = (campo) => document.querySelector('label[for="' + campo.id + '"]').textContent;

  // Apresentação de erros e feedback visual/acessível
  function mostrarErroCampo(campo, msg) {
    $("erro-" + campo.id).textContent = msg;
    if (msg) {
      campo.setAttribute("aria-invalid", "true");
    } else {
      campo.removeAttribute("aria-invalid");
    }
  }

  function validarCampo(campo) {
    const msg = regras[campo.id]();
    mostrarErroCampo(campo, msg);
    return !msg;
  }

  function atualizarResumoErros() {
    const lista = el.resumo.querySelector("ul");
    lista.replaceChildren(); // Limpa itens anteriores antes de reconstruir a lista

    const invalidos = campos.filter((c) => c.getAttribute("aria-invalid") === "true");
    el.resumo.hidden = invalidos.length === 0;
    if (!invalidos.length) return;

    el.resumo.querySelector("p").textContent =
      "Corrija " + invalidos.length + (invalidos.length === 1 ? " campo:" : " campos:");

    invalidos.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = obterRotulo(c) + ": " + regras[c.id]();
      lista.appendChild(li);
    });
  }

  function definirStatus(texto, tipo) {
    el.status.textContent = texto;
    el.status.className = tipo || "";
  }

  function atualizarContador() {
    const n = contarCaracteresUteis(el.mensagem.value);
    el.contador.textContent = n + " / 1000";
    el.contador.classList.toggle("contador-alerta", n > 1000 || (n > 0 && n < 30));
  }

  // Controla visibilidade, obrigatoriedade e limpeza do campo condicional "Assunto adicional"
  function atualizarAssuntoCondicional() {
    const outro = el.motivo.value === "Outro";
    el.bloco.hidden = !outro;
    el.assunto.disabled = !outro;
    el.assunto.required = outro;

    if (!outro) {
      el.assunto.value = "";
      mostrarErroCampo(el.assunto, "");
      if (!el.resumo.hidden) {
        atualizarResumoErros();
      }
    }
  }

  function definirEstadoEnvio(ativo) {
    enviando = ativo;
    el.botao.disabled = ativo;
    el.form.setAttribute("aria-busy", String(ativo));
    el.botao.textContent = ativo ? "Enviando..." : "Enviar mensagem";
  }

  // Processamento assíncrono do envio (integração real com Formspree)
  async function enviarParaServidor(dados) {
    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
    const corpo = {
      _subject: "Portfólio: " + dados.motivo + (dados.assunto ? " - " + dados.assunto : ""),
      ...dados
    };

    try {
      const resposta = await fetch(URL_ENVIO, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(corpo),
        signal: controle.signal
      });
      if (!resposta.ok) throw new Error("Status " + resposta.status);
    } finally {
      clearTimeout(limite);
    }
  }

  async function processarEnvio(e) {
    e.preventDefault();
    if (enviando) return; // Impede envios concorrentes por cliques rápidos
    definirStatus("", "");
    
    campos.forEach((c) => validarCampo(c));
    atualizarResumoErros();

    const invalidos = campos.filter((c) => c.getAttribute("aria-invalid") === "true");
    if (invalidos.length) { 
      definirStatus("Não enviado: há campos para corrigir.", "erro"); 
      invalidos[0].focus(); 
      return; 
    }

    definirEstadoEnvio(true);
    definirStatus("Enviando sua mensagem...", "processando");

    try {
      await enviarParaServidor(lerDadosFormulario());
      el.form.reset(); 
      el.resumo.hidden = true;
      atualizarAssuntoCondicional(); 
      atualizarContador();
      definirStatus("Mensagem enviada com sucesso! Responderei no e-mail informado.", "sucesso");
    } catch (err) {
      definirStatus(
        "Falha no envio. Seus dados foram mantidos: tente novamente. Se persistir, use o e-mail dos canais de contato.",
        "erro"
      );
    } finally {
      definirEstadoEnvio(false);
    }
  }

  el.form.addEventListener("submit", processarEnvio);
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
  el.mensagem.addEventListener("input", atualizarContador);
  el.motivo.addEventListener("change", atualizarAssuntoCondicional);
})();