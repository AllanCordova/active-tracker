let tela = 1; // Inicia na primeira tela

function showTela(telaAtual) {
    // Seleciona todas as divs com a classe "tela"
    document.querySelectorAll('.tela').forEach((elemento) => {
        // Exibe apenas as telas correspondentes ao `telaAtual`, oculta as demais
        if (elemento.id === `tela${telaAtual}`) {
            elemento.style.display = 'block';
        } else {
            elemento.style.display = 'none';
        }
    });
}

// Inicializa a exibição da primeira tela ao carregar a página
showTela(tela);

function nextTela() {
    if (tela > 1) {
        alert('não existe mais páginas')
    } else {
        tela++;
        showTela(tela);
    }
}

function lastTela() {
    if (tela > 1) {  // Evita que tela vá para valores menores que 1
        tela--;
        showTela(tela);
    }
}
