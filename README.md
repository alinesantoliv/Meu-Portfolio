# Portfólio Pessoal — Aline Oliveira

Portfólio desenvolvido com **HTML5 semântico**, **CSS3 responsivo** e **JavaScript modular**, com foco em acessibilidade, validação robusta de formulário e apresentação de projetos acadêmicos de Desenvolvimento de Software.

- **Repositório:** https://github.com/alinesantoliv/Meu-Portifolio
- **Objetivo profissional:** Atuar na área de Tecnologia da Informação como Desenvolvedora Full Stack.

## Como executar localmente

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no VS Code (ou editor de sua preferência).
3. Inicie com a extensão **Live Server** ou abra o arquivo `index.html` diretamente em um navegador moderno.

---

## Etapa 1 | Diagnóstico Orientado a Impacto

| # | Categoria | Local | Passos para reproduzir | Comportamento atual | Comportamento esperado | Prioridade e Justificativa | Proposta de correção |
|---|---|---|---|---|---|---|---|
| **P1** | **Funcional** | `script.js` (`atualizarResumo`) | Ir até **Contato**, deixar o formulário vazio e clicar em **Enviar mensagem**. | Ocorre `ReferenceError: lista is not defined` no Console; a execução trava antes de listar os erros no resumo e antes de focar o primeiro campo inválido. | Listar todos os campos inválidos no resumo (`role="alert"`), exibir status de erro e mover o foco para o primeiro campo inválido. | **Alta** — Bloqueia o feedback geral de erro e impede o redirecionamento acessível de foco no envio inválido. | Selecionar a `<ul>` interna de `#resumo-erros`, limpar itens anteriores com `replaceChildren()` e reconstruir a lista. |
| **P2** | **Conteúdo / Integridade** | `script.js` (`window.PROJETOS`) | Acessar **Projetos** e clicar em **Ver detalhes** nos cartões *Projeto Web A*, *Sistema Backend B* e *API Rest C*. | Exibia 3 projetos fictícios com descrições genéricas e links apontando apenas para a raiz do perfil GitHub, sem problema, público ou contribuição. | Exibir projetos reais (incluindo projetos de aula identificados) com problema abordado, público, contribuição, tecnologias e repositórios reais. | **Alta** — Projetos incompletos ou genéricos comprometem a credibilidade técnica diante de recrutadores e avaliadores. | Remover os 3 placeholders e enriquecer os 3 projetos reais com contexto completo no verso dos cartões. |
| **P3** | **Acessibilidade** | `index.html` (`.contact-pills` e `.erro-msg`) e `style.css` (`[data-theme="dark"]`) | Navegar com leitor de tela nos botões de contato/erros ou ativar o tema escuro nos botões principais. | Leitores de tela anunciavam "LinkedIn LinkedIn"; erros dinâmicos não tinham `aria-live`; botões no tema escuro tinham contraste de ~3.1:1. | Ícones decorativos ocultos (`alt=""`), erros anunciados via `aria-live="polite"` e contraste mínimo WCAG AA (>= 4.5:1) no tema escuro. | **Alta** — Afeta diretamente visitantes com baixa visão ou usuários de leitores de tela. | Definir `alt=""` + `aria-hidden="true"` nos ícones redundantes, adicionar `aria-live="polite"` e ajustar `--btn-bg: #c81e4b` no tema escuro. |
| **P4** | **Responsividade** | `style.css` (`.binder-nav` e `.section-cover`) | Redimensionar a tela para `360px` de largura ou aplicar `zoom de 200%`. | A barra de navegação fixa mantinha `flex-wrap: nowrap`, comprimindo excessivamente os links em telas muito estreitas. | Permitir quebra organizada dos links da barra em telas `<= 390px` sem rolagem horizontal nem sobreposição do conteúdo inicial. | **Média** — Dificulta o clique e a leitura do menu em smartphones estreitos ou com ampliação de tela. | Adicionar media query `@media (max-width: 390px)` com `flex-wrap: wrap` e ajustar o `padding-top` da capa. |
| **P5** | **Organização do Código** | `style.css` (`:root`, `.photocard-wrapper`, `background.png`) | Inspecionar `style.css` e a aba **Network** do DevTools ao carregar a página. | Dois blocos `:root`, regras duplicadas de `.photocard-wrapper`, classe morta `.nav-tab.active` e requisição para `background.png` inexistente (`404`). | Código CSS enxuto, sem seletores duplicados/mortos e sem requisições falhas na aba Network. | **Baixa** — Não quebra o layout principal, mas gera `404` no Network e dificulta a manutenção. | Consolidar `:root`, remover seletores duplicados/inutilizados e remover referência a `background.png`. |

### Evidências de Antes e Depois (3 Problemas Corrigidos)
- **Evidência 1 (P1 — Correção do resumo de erros e foco no envio inválido):** `[Inserir aqui print do Console limpo + resumo de erros visível]`
- **Evidência 2 (P2 — Projetos completos com problema, público e contribuição):** `[Inserir aqui print do verso de um card de projeto atualizado]`
- **Evidência 3 (P4 — Responsividade em 360px / Zoom 200% sem rolagem horizontal):** `[Inserir aqui print do DevTools em 360px]`

---

## Decisões de Implementação e Refatoração

### Filtro de Projetos e Acessibilidade (Etapas 2, 3 e 4)
- Os dados dos projetos ficam isolados em `window.PROJETOS`, e as categorias do filtro são geradas dinamicamente (`["Todos", ...new Set(...)]`).
- Os botões de filtro utilizam `aria-pressed="true/false"`, contagem dinâmica em `role="status"` e tratamento de estado vazio (`#sem-resultados`).
- Nos cartões giratórios, o atributo `inert` alterna entre frente e verso para impedir que o foco do teclado (`Tab`) alcance elementos ocultos.

### Explicação da Refatoração (Etapa 5)
- **Problema anterior:** No módulo do formulário (`script.js`), a função `atualizarResumo()` referenciava uma variável inexistente (`lista`), não limpava itens antigos antes de renderizar e estava acoplada à mudança do campo condicional, além de regras CSS duplicadas no `style.css`.
- **Mudança realizada:** As funções do formulário foram separadas por responsabilidade (`selecionarElementos`, `lerDadosFormulario`, `regras`/`validarCampo`, `atualizarResumoErros`, `definirStatus` e `enviarParaServidor`/`processarEnvio`) e as regras duplicadas do CSS foram unificadas.
- **Por que facilita manutenção e testes:** Cada etapa (normalização, validação e envio) pode ser inspecionada e testada isoladamente sem efeitos colaterais na interface, e a aba **Network** e o **Console** operam sem erros ou recursos ausentes (`404`).

### Funcionamento do Contato e Contrato dos Campos (Etapa 6)
- **Critério único de contagem:** A função `contarCaracteresUteis(texto)` usa `texto.trim().length` tanto no contador em tempo real (`0 / 1000`) quanto na validação, ignorando espaços extras nas extremidades sem alterar quebras de linha internas da mensagem.
- **Integração HTML5 + JavaScript:** O formulário utiliza `novalidate` para assumir o controle acessível das mensagens de erro, mantendo os atributos nativos (`required`, `type="email"`, `minlength`, `maxlength`) e `checkValidity()` para validação de formato de e-mail.
- **Envio real:** O envio utiliza integração real assíncrona via `fetch` com o serviço **Formspree** (`https://formspree.io/f/mrpqgelp`), bloqueio de múltiplos cliques (`enviando` + `aria-busy`) e preservação dos dados em caso de falha. *Nota técnica: a validação no navegador melhora a experiência do usuário, mas não substitui a validação no servidor.*

---

## Etapa 7 | Matriz de Testes

| ID | Entrada ou ação | Resultado esperado | Resultado obtido | Situação |
|---|---|---|---|---|
| **T01** | Tentar enviar o formulário com todos os campos vazios. | Exibir erros individuais, mostrar resumo de erros e focar o campo **Nome**. | Todos os campos obrigatórios exibiram erro, o resumo listou os 4 campos e o foco foi para **Nome**. | Aprovado |
| **T02** | Digitar apenas espaços (`"   "`) no **Nome**; depois informar `"Ana-Clara d'Ávila"`. | Rejeitar espaços em branco; aceitar nome com acento, hífen e apóstrofo. | Espaços rejeitados (`< 3` úteis); `"Ana-Clara d'Ávila"` aceito sem erro. | Aprovado |
| **T03** | Informar e-mail sem `@` (`"aline.com"`); depois `"aline@exemplo.com"`. | Apontar formato inválido e remover o erro automaticamente após correção. | Mensagem de formato inválido exibida e removida assim que o formato válido foi digitado. | Aprovado |
| **T04** | Testar **Nome** com 2, 3, 80 e 81 caracteres úteis. | Rejeitar 2 caracteres; aceitar 3 e 80; bloquear ou rejeitar 81 (`maxlength="80"` + validação JS). | 2 caracteres rejeitado; 3 e 80 aceitos; 81º caractere bloqueado pelo `maxlength="80"`. | Aprovado |
| **T05** | Testar **Mensagem** com 29, 30, 1000 e 1001 caracteres úteis. | Contador e validação coerentes nos limites; rejeitar 29, aceitar 30–1000 e bloquear/rejeitar 1001. | Contador sincronizado; 29 rejeitado; 30 e 1000 aceitos; 1001º caractere bloqueado pelo `maxlength="1000"`. | Aprovado |
| **T06** | Selecionar motivo `"Outro"` e testar **Assunto adicional** vazio, com 4 e com 5 caracteres. | Exibir campo obrigatório; rejeitar vazio e 4 caracteres; aceitar 5 caracteres. | Campo exibido; vazio e 4 caracteres rejeitados; 5 caracteres aceito. | Aprovado |
| **T07** | Provocar erro em **Assunto adicional** (`"Outro"`) e trocar motivo para `"Projeto freelance"`. | Ocultar o campo, limpar o erro e permitir envio sem bloquear pelo campo oculto. | Campo ocultado e desabilitado, erro removido e formulário enviado normalmente. | Aprovado |
| **T08** | Clicar várias vezes seguidas em **Enviar mensagem** durante o envio válido. | Bloquear o botão (`Enviando...`) e executar apenas uma requisição. | Apenas uma requisição disparada; cliques extras ignorados até a conclusão. | Aprovado |
| **T09** | Simular falha de rede (DevTools Network Offline), tentar enviar, reconectar e reenviar. | Exibir mensagem de falha, manter os dados preenchidos e permitir nova tentativa com sucesso. | Dados preservados após erro de conexão; reenvio concluído com sucesso após reconexão. | Aprovado |
| **T10** | Concluir um envio com sucesso e voltar a digitar em qualquer campo. | Exibir confirmação de sucesso, limpar formulário e remover status antigo ao retomar edição. | Status de sucesso exibido após resposta HTTP 200 e limpo ao editar novamente. | Aprovado |
| **T11** | Navegar apenas com teclado (`Tab`/`Enter`), em `360px` e com `zoom de 200%`. | Manter foco visível, acesso aos filtros/cards/formulário e ausência de rolagem horizontal. | Navegação integral via teclado e layout adaptado em `360px`, `768px`, `1280px` e `zoom 200%`. | Aprovado |
| **T12** *(Extra)* | Aplicar filtro `"Back-end"`, trocar para `"Front-end/Web"` e retornar para `"Todos"`. | Atualizar contagem (`2`, `1`, `3`), estado `aria-pressed` e não duplicar cards. | Contagem e `aria-pressed` atualizados corretamente sem duplicação de elementos. | Aprovado |
| **T13** *(Extra)* | Alternar entre tema claro e escuro e recarregar a página (`F5`). | Persistir preferência no `localStorage` e manter contraste legível em botões e erros. | Tema mantido após reload e contraste adequado em todos os componentes. | Aprovado |
