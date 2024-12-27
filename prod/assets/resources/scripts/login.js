function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Simula o sucesso do envio
    alert('Login enviado com sucesso!');
}
