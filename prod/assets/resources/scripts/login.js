document.getElementById("login").addEventListener("submit", function(event) {
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;

    if (!regexEmail.test(email)) {
      let invalid = document.getElementById('emailInvalid');

      $(invalid).css("opacity", 0);
      $(invalid).fadeTo(1000, 1);

      invalid.textContent = 'O e-mail deve conter "@" seguido de algo, e "." seguido de algo'
      event.preventDefault(); // Impede o envio do formulário
    }

    if (!regexPassword.test(password)) {
        let invalid = document.getElementById('passwordInvalid');

        $(invalid).css("opacity", 0);
        $(invalid).fadeTo(1000, 1);
  
        invalid.textContent = 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo especial.'
        event.preventDefault(); // Impede o envio do formulário
    }
  });