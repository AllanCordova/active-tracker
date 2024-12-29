document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const nome = document.getElementById('name').value.trim();
    let erro = document.getElementById('loginMessage');

    if (!email || !password || !nome) {
        erro.style.display = 'block';
        return;
    }
  
    if (!(password == 'utfpr')) {
        erro.style.display = 'block';
        return;
    }
  
    // esconde a senha caso escrita errada
    erro.style.display = 'none';

    // Obtém o elemento do modal
    const modalElement = document.getElementById('exampleModal');

    // Obtém a instância do modal Bootstrap
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // Simula o sucesso do login
    setTimeout(() => {
        // Altera o conteúdo do modal dinamicamente
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="text-center">
                <h3 class="poppins-medium success p-2">Welcome back!</h3>
                <p class="poppins-medium">${nome}</p>
            </div>
        `;
        modal.show();
    }, 500)

});