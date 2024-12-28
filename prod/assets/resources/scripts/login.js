document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let erro = document.getElementById('loginMessage');

    if (!email || !password) {
        erro.style.display = 'block'
        return;
    }
  
    if (!(password == 'utfpr')) {
        erro.style.display = 'block'
        return
    }

    alert('Login enviado com sucesso!');
  
    // Fecha o modal após validação
    const modalElement = document.getElementById('exampleModal');
    const modal = bootstrap.Modal.getInstance(modalElement); // Obtém a instância do modal aberta no momento
    modal.hide();
});