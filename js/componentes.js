function mountHeader() {
  const el = document.getElementById("header");
  const nome = el.dataset.nome || "Usuário";
  const iniciais = el.dataset.iniciais || "?";
  const botaoLabel = el.dataset.botaoLabel || nome;
  const botaoHref = el.dataset.botaoHref || "perfil.html";
  const modoLanding = el.dataset.nav === "landing";

  const paginaAtual = window.location.pathname.split("/").pop();

  const paginasPortal = new Set(["portal_aluno.html", "notas.html", "relatorio.html", "horarios.html"]);

  const itensPortal = [
    { label: "Portal do Aluno", href: "portal_aluno.html" },
    { label: "Biblioteca",      href: "biblioteca.html" },
    { label: "Calendário",      href: "calendario.html" },
    { label: "Ticket RU",       href: "https://sistemas.ufac.br/eticket/login/", externo: true },
    { label: "Notícias",        href: "noticias.html" },
  ];

  if (modoLanding) {
    el.innerHTML = `
<nav class="barra-principal">
  <div class="marca">
    <img src="../assets/Logo Ufac (2).svg" alt="Logo da UFAC" class="logo-ufac">
  </div>
  <div class="area-usuario">
    <a href="${botaoHref}" class="botao-perfil botao-entrar">${botaoLabel}</a>
  </div>
</nav>`;
    return;
  }

  const menuHTML = itensPortal.map(item => {
    const isAtivo = item.href === "portal_aluno.html"
      ? paginasPortal.has(paginaAtual)
      : item.href.endsWith(paginaAtual);
    const ativo = isAtivo ? ' class="ativo"' : "";
    const attrs = item.externo ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<li><a href="${item.href}"${attrs}${ativo}>${item.label}</a></li>`;
  }).join("\n    ");

  el.innerHTML = `
<nav class="barra-principal">

  <div class="marca">
    <img src="../assets/Logo Ufac (2).svg" alt="Logo da UFAC" class="logo-ufac">
  </div>

  <ul class="menu-topo" id="menu-topo">
    ${menuHTML}
  </ul>

  <button class="menu-hamburger" id="menu-hamburger" aria-label="Abrir menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="area-usuario">
    <img src="../assets/ícones/portal/sino.png" alt="Notificações" class="icone-notificacao">

    <div class="usuario-dropdown" id="usuario-dropdown">
      <button class="botao-perfil" id="botao-perfil" aria-expanded="false">
        <span class="avatar-iniciais">${iniciais}</span>
        <strong>${botaoLabel}</strong>
        <span class="dropdown-caret">▾</span>
      </button>
      <div class="dropdown-menu" id="dropdown-menu">
        <a href="perfil.html" class="dropdown-item">Ver perfil</a>
        <a href="inicio.html" class="dropdown-item dropdown-item--sair">Sair</a>
      </div>
    </div>
  </div>

</nav>
`;

  document.getElementById("menu-hamburger").addEventListener("click", function () {
    const menu = document.getElementById("menu-topo");
    const aberto = menu.classList.toggle("aberto");
    this.setAttribute("aria-expanded", aberto);
  });

  const botaoPerfil = document.getElementById("botao-perfil");
  const dropdownMenu = document.getElementById("dropdown-menu");

  botaoPerfil.addEventListener("click", function () {
    const aberto = dropdownMenu.classList.toggle("aberto");
    this.setAttribute("aria-expanded", aberto);
  });

  document.addEventListener("click", function (e) {
    if (!document.getElementById("usuario-dropdown").contains(e.target)) {
      dropdownMenu.classList.remove("aberto");
      botaoPerfil.setAttribute("aria-expanded", false);
    }
  });
}

const footer = `
<footer class="rodape">
  <div class="rodape-conteudo">

    <div class="rodape-coluna maior">
      <img src="../assets/Logo Ufac (2).svg" alt="Logo da UFAC" class="logo-rodape">
      <p>Universidade Federal do Acre — Portal Acadêmico.</p>
      <p>Rod. BR 364, Km 04, Rio Branco — AC.</p>
    </div>

    <div class="rodape-coluna">
      <h3>Sistemas</h3>
      <a href="../index.html"><p>Portal do Aluno</p></a>
      <a href="../biblioteca.html"><p>Biblioteca</p></a>
      <a href="https://sistemas.ufac.br/eticket/login/" target="_blank" rel="noopener noreferrer"><p>Ticket RU</p></a>
      <p>Horários</p>
    </div>

    <div class="rodape-coluna">
      <h3>Institucional</h3>
      <a href="https://www.ufac.br/site/ufac/institucional"><p>Reitoria</p></a>
      <a href="https://www.ufac.br/site/ufac/proex"><p>Extensão e Cultura</p></a>
      <a href="https://www.ufac.br/site/ufac/prograd/cursos"><p>Cursos de Graduação</p></a>
      <a href="https://www.ufac.br/site/academico/mestrados-e-doutorados"><p>Cursos de Pós-Graduação</p></a>
    </div>

    <div class="rodape-coluna">
      <h3>Serviços</h3>
      <a href="https://www.ufac.br/site/servicos/acesso-ao-sistemas-ufac"><p>Acesso aos Sistemas</p></a>
      <a href="https://www.ufac.br/site/servicos/e-mail-institucional"><p>E-mail Institucional</p></a>
      <a href="https://www.ufac.br/site/servicos/biblioteca-central"><p>Biblioteca Central</p></a>
      <a href="https://www.ufac.br/site/acesso-a-informacao/servico-de-informacao-ao-cidadao"><p>Serviços de Informação ao Cidadão - SIC</p></a>
    </div>

    <div class="rodape-coluna">
      <h3>Contato</h3>
      <a href="https://www.ufac.br/site/contato/ouvidoria"><p>Ouvidoria</p></a>
      <a href="https://www.ufac.br/site/contato/telefones-da-ufac"><p>Telefones da Ufac</p></a>
      <a href="https://www.ufac.br/site/unidades/nti"><p>Núcleo de Tecnologia da Informação - NTI</p></a>
      <a href="https://www.ufac.br/site/contato/mapa-do-campus"><p>Mapa do Campus</p></a>
    </div>

  </div>

  <div class="rodape-baixo">
    <p>© 2026 Universidade Federal do Acre · UFAC</p>
  </div>
</footer>
`;

function mountBreadcrumb() {
  const topo = document.querySelector('.topo');
  if (!topo) return;

  const pagina = window.location.pathname.split('/').pop() || 'inicio.html';

  const mapa = {
    'portal_aluno.html': {
      label: 'Portal do Aluno',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }]
    },
    'notas.html': {
      label: 'Notas',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }, { label: 'Portal do Aluno', href: 'portal_aluno.html' }]
    },
    'relatorio.html': {
      label: 'Relatórios',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }, { label: 'Portal do Aluno', href: 'portal_aluno.html' }]
    },
    'perfil.html': {
      label: 'Perfil',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }]
    },
    'biblioteca.html': {
      label: 'Biblioteca',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }]
    },
    'horarios.html': {
      label: 'Horários',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }]
    },
    'noticias.html': {
      label: 'Notícias',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }]
    },
    'calendario.html': {
      label: 'Calendário',
      ancestrais: [{ label: 'Início', href: 'inicio.html' }]
    },
  };

  const info = mapa[pagina];
  if (!info) return;

  const itensHTML = [
    ...info.ancestrais.map(a => `<a href="${a.href}" class="breadcrumb-link">${a.label}</a>`),
    `<span class="breadcrumb-atual">${info.label}</span>`
  ].join('<span class="breadcrumb-sep"> › </span>');

  const nav = document.createElement('nav');
  nav.className = 'breadcrumb';
  nav.setAttribute('aria-label', 'Navegação estrutural');
  nav.innerHTML = itensHTML;

  topo.insertBefore(nav, topo.firstChild);
}

function mountMenuLateral() {
  const el = document.getElementById("menu-lateral");
  if (!el) return;

  const paginaAtual = window.location.pathname.split("/").pop();

  const itens = [
    { label: "Visão Geral",      href: "portal_aluno.html", icone: "menu-principal.png",      alt: "Ícone de Visão Geral" },
    { label: "Relatórios",       href: "relatorio.html",    icone: "painel.png",               alt: "Ícone de Relatórios" },
    { label: "Horários",         href: "horarios.html",     icone: "sentido-anti-horario.png", alt: "Ícone de Horários" },
    { label: "Notas",            href: "notas.html",        icone: "nota.png",                 alt: "Ícone de Notas" },
    { label: "Calendário",       href: "calendario.html",   icone: "calendario.png",           alt: "Ícone de Calendário" },
    { label: "Links Externos",                               icone: "links.png",               alt: "Ícone de Links" },
  ];

  const itensHTML = itens.map(item => {
    const ativo = item.href && item.href === paginaAtual ? ' class="ativo"' : "";
    const iconeHTML = `<img src="../assets/ícones/portal/${item.icone}" alt="${item.alt}" class="icone-menu">`;
    if (item.href) {
      return `<li${ativo}><a href="${item.href}">${iconeHTML} ${item.label}</a></li>`;
    }
    return `<li>${iconeHTML} ${item.label}</li>`;
  }).join("\n        ");

  el.outerHTML = `<section class="menu-lateral">
      <h2>Menu</h2>
      <ul>
        ${itensHTML}
      </ul>
    </section>`;
}

mountHeader();
mountMenuLateral();
mountBreadcrumb();
document.getElementById("footer").innerHTML = footer;
