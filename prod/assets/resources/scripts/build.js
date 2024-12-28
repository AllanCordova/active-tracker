let isInputCreated = false;
let erro = document.getElementById('msg-error');

function makeTraining(event) {
    event.preventDefault();

    // validando campos input
    if (isInputCreated) {
        erro.style.display = 'block';
        return;
    }

    const area = document.getElementById('trainings');

    // criando campo input
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'name';
    input.classList.add('form-control', 'w-100', 'poppins-light', 'transition');
    input.style.borderRadius = '4px';

    // criando espaçamento
    let div = document.createElement('div');
    div.classList.add('p-2')

    // criando campo para salvar
    let btn = document.createElement('button');
    btn.type = 'submit'
    btn.innerHTML = 'save';
    btn.classList.add('btn', 'btn-success', 'w-50', 'poppins-light');
    btn.style.borderRadius = '4px';

    // adicionando no dom
    area.appendChild(input);
    area.appendChild(div);
    area.appendChild(btn);
    
    isInputCreated = true;

    // removendo msg de criar novo treino
    const trainingMsg = document.getElementById('none-training');
    trainingMsg.style.display = 'none';

    // reniciando transição
    requestAnimationFrame(() => {
        input.classList.add("show");
    });

    // adicionando treino criado
    btn.addEventListener('click', function(event) {
        event.preventDefault();

        if (!(input.value.trim())) {
            input.placeholder = 'your workout needs a name';
            input.classList.add('placeholder-changed');
            return
        }

        erro.style.display = 'none';
        isInputCreated = false;
    })
}