function mountHeader() {
  const el = document.getElementById("header");
  const nome = el.dataset.nome || "Usuário";
  const iniciais = el.dataset.iniciais || "?";
  const botaoLabel = el.dataset.botaoLabel || nome;
  const botaoHref = el.dataset.botaoHref || "perfil.html";

  const paginaAtual = window.location.pathname.split("/").pop();

  const itens = [
    { label: "Início",         href: "#" },
    { label: "Portal do Aluno", href: "portal_aluno.html" },
    { label: "Biblioteca",     href: "biblioteca.html" },
    { label: "Horários",       href: "horarios.html" },
    { label: "Ticket RU",      href: "https://sistemas.ufac.br/eticket/login/", externo: true },
    { label: "Notícias",       href: "noticias.html" },
  ];

  const menuHTML = itens.map(item => {
    const ativo = item.href !== "#" && item.href.endsWith(paginaAtual) ? ' class="ativo"' : "";
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
    <img src="../assets/ícones/portal/modo-escuro.png" alt="Modo Escuro" class="icone-modo-escuro">
    <img src="../assets/ícones/portal/sino.png" alt="Notificações" class="icone-notificacao">

    <a href="${botaoHref}" class="botao-perfil">
      <span class="avatar-iniciais">${iniciais}</span>
      <strong>${botaoLabel}</strong>
    </a>
  </div>

</nav>
`;

  document.getElementById("menu-hamburger").addEventListener("click", function () {
    const menu = document.getElementById("menu-topo");
    const aberto = menu.classList.toggle("aberto");
    this.setAttribute("aria-expanded", aberto);
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
      <p>Portal do Aluno</p>
      <p>Biblioteca</p>
      <a href="https://sistemas.ufac.br/eticket/login/" target="_blank" rel="noopener noreferrer"><p>Ticket RU</p></a>
      <p>Horários</p>
    </div>

    <div class="rodape-coluna">
      <h3>Institucional</h3>
      <a href="#"><p>Reitoria</p></a>
      <a href="#"><p>Extensão e Cultura</p></a>
      <a href="#"><p>Cursos de Graduação</p></a>
      <a href="#"><p>Cursos de Pós-Graduação</p></a>
    </div>

    <div class="rodape-coluna">
      <h3>Serviços</h3>
      <a href="#"><p>Acesso aos Sistemas</p></a>
      <a href="#"><p>E-mail Institucional</p></a>
      <a href="#"><p>Biblioteca Central</p></a>
      <a href="#"><p>Serviços de Informação ao Cidadão - SIC</p></a>
    </div>

    <div class="rodape-coluna">
      <h3>Contato</h3>
      <a href="#"><p>Ouvidoria</p></a>
      <a href="#"><p>Telefones da Ufac</p></a>
      <a href="#"><p>Núcleo de Tecnologia da Informação - NTI</p></a>
      <a href="#"><p>Mapa do Campus</p></a>
    </div>

  </div>

  <div class="rodape-baixo">
    <p>© 2026 Universidade Federal do Acre · UFAC</p>
  </div>
</footer>
`;

mountHeader();
document.getElementById("footer").innerHTML = footer;
