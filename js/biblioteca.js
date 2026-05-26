
const btnPesquisa = document.getElementById('btn-pesquisa');
const inputPesquisa = document.getElementById('pesquisa');
const resultados = document.getElementById('resultados-busca');
const gridLivros = document.querySelector('.grid-livros');
const tituloResultados = document.querySelector('.titulo-resultados');


btnPesquisa.addEventListener('click', async function(event) {
    event.preventDefault(); 

    const termoBusca = inputPesquisa.value.trim();

    if (!termoBusca) {
        alert('Por favor, digite um autor, título ou assunto!');
        return;
    }

    
    resultados.classList.remove('escondido');
    tituloResultados.textContent = 'Buscando livros no acervo da Open Library...';
    gridLivros.innerHTML = ''; 

    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termoBusca)}&limit=6`;
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error('Falha na comunicação com o servidor');
        }

        const dados = await resposta.json();

        if (!dados.docs || dados.docs.length === 0) {
            tituloResultados.textContent = `Nenhum livro encontrado para: "${termoBusca}"`;
            return;
        }

        tituloResultados.textContent = `Resultados encontrados para "${termoBusca}":`;

        dados.docs.forEach(item => {
            const titulo = item.title || 'Título Indisponível';
            const autor = (item.author_name && item.author_name.length > 0) ? item.author_name[0] : 'Autor Desconhecido';
            const ano = item.first_publish_year || 'N/A';
            const linkLeitura = item.key ? `https://openlibrary.org${item.key}` : '#';

            const cardHTML = `
                <div class="livro-card">
                    <div class="livro-info">
                        <h4>${titulo}</h4>
                        <p>Autor: ${autor} | Ano: ${ano}</p>
                        <span class="badge-formato">E-BOOK</span>
                    </div>
                    <a href="${linkLeitura}" target="_blank" class="btn-baixar-livro">Acessar</a>
                </div>
            `;
            
            gridLivros.innerHTML += cardHTML;
        });

    } catch (erro) {
        tituloResultados.textContent = 'Erro ao buscar livros. Tente novamente.';
        console.error('Detalhe do erro técnico:', erro);
    }
});