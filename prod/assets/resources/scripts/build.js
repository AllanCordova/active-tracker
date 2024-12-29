function makeTraining(event) {
    event.preventDefault();

    // finalizando abertura dos inputs
    const makeInput = document.getElementById('makeInput');
    makeInput.style.display = 'none';
    
    const area = document.getElementById('trainingsMake');

    // criando campo input
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'my ex: training for arms';
    input.classList.add('form-control', 'w-100', 'poppins-light', 'transition', 'opacity');
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
    
    // reniciando transição
    requestAnimationFrame(() => {
        input.classList.add("show");
    });

    let msgTraining = document.getElementById('none-training');
    msgTraining.textContent = 'give your workout a name'

    // adicionando treino criado
    btn.addEventListener('click', function(event) {
        event.preventDefault();

        if (!(input.value.trim())) {
            input.placeholder = 'your workout needs a name';
            input.classList.add('placeholder-changed');
            return
        }

        trainings(input,msgTraining);
    })
}

function trainings(input,msgTraining) {
    const area = document.getElementById('trainings');

    // adicionando treino a tela
    let item = document.createElement('li');
    item.innerHTML = input.value;
    item.classList.add('list-group-item', 'rounded','w-100', 'poppins-light', 'text-light', 'd-flex', 'align-items-center', 'justify-content-between', 'transition');

    // criando botão
    let btn = document.createElement('button');
    btn.classList.add('my-btn');
    btn.type = 'button';

    // criando icone
    let btnContent = document.createElement('i');
    btnContent.classList.add('bi', 'bi-plus', 'fs-1', 'mb-0', 'plus-icon');

    // criando espaçamento entre treinos
    let space = document.createElement('div');
    space.classList.add('p-1')

    // adicionando icone no botão
    btn.appendChild(btnContent);
    
    // zerando campo input
    input.value = '';

    area.appendChild(item);
    item.appendChild(btn);
    area.appendChild(space);

    msgTraining.textContent = 'Add exercises to your workout!'

    // animação
    requestAnimationFrame(() => {
        item.classList.add("show");
    });


} 