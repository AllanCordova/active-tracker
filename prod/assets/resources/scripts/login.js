document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const nome = document.getElementById('name').value.trim();
    const erro = document.getElementById('loginMessage');

    // Validação de campos obrigatórios
    if (!email || !password || !nome) {
        showError(erro, 'Por favor, preencha todos os campos.');
        return;
    }

    // Validação da senha
    if (password !== 'utfpr') {
        showError(erro, 'Senha incorreta.');
        return;
    }

    // Esconde mensagem de erro caso validação seja bem-sucedida
    hideError(erro);

    // Gerar uma chave única e armazenar informações do usuário
    const key = makeUniqueKey();
    storeUserData(key, { email, nome });

    // Atualizar o modal com mensagem de boas-vindas
    updateModal(nome);
});

function makeUniqueKey() {
    return `user_${Date.now()}`;
}

function storeUserData(key, data) {
    // Armazena os dados como uma string JSON
    sessionStorage.setItem(key, JSON.stringify(data));
}

function showError(element, message) {
    element.style.display = 'block';
    element.textContent = message;
}

function hideError(element) {
    element.style.display = 'none';
    element.textContent = '';
}

function updateModal(nome) {
    const modalElement = document.getElementById('exampleModal');
    const modal = bootstrap.Modal.getInstance(modalElement);

    // Remove o foco antes de esconder o modal
    const body = document.querySelector('body');
    body.focus();

    // Fecha o modal atual
    modal.hide();

    // Atualiza o conteúdo do modal e reabre com a mensagem de boas-vindas
    setTimeout(() => {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="text-center">
                <h3 class="poppins-medium success p-2">Welcome back!</h3>
                <p class="poppins-medium">${nome}</p>
            </div>
        `;
        modal.show();
    }, 500);
}


function isLogin() {
    // Recupera todos os dados do sessionStorage
    const keys = Object.keys(sessionStorage).filter(key => key.startsWith('user_'));

    if (keys.length > 0) {
        const lastUserKey = keys[keys.length - 1]; // Recupera o último usuário logado
        const userData = JSON.parse(sessionStorage.getItem(lastUserKey));

        if (userData && userData.nome) {
            updateModal(userData.nome);
        }
    } else {
        console.log('Nenhum login encontrado.');
    }
}
