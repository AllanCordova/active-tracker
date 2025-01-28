document.getElementById('formTrainings').addEventListener('submit', function (event) {
    event.preventDefault();

    let nomeTraining = document.getElementById('nameTraining').value;

    if (nomeTraining.trim() === '' || nomeTraining == null) {
        return false;
    }

    const trainingData = {
        id: makeKey(),
        name: nomeTraining
    };

    renderTraining(trainingData);
    saveTraining(trainingData);

    document.getElementById('nameTraining').value = '';
});

function makeKey() {
    return Date.now();
}

function saveTraining(training) {
    let trainings = JSON.parse(localStorage.getItem('trainings')) || [];
    trainings.push(training);
    localStorage.setItem('trainings', JSON.stringify(trainings));
}

function renderTraining(training) {
    let trainingElement = document.createElement('a');
    let buttonAdd = document.createElement('a');
    let buttonDel = document.createElement('button');
    let iconPlus = document.createElement('i');
    let iconTrash = document.createElement('i');

    const container = document.createElement('div');

    trainingElement.textContent = training.name;
    trainingElement.classList.add('training', 'poppins-medium', 'text-light');
    trainingElement.href = 'exercise.html';

    iconPlus.classList.add('bi', 'bi-plus-square');
    buttonAdd.appendChild(iconPlus);
    buttonAdd.classList.add('btn', 'fs-3', 'text-white');
    buttonAdd.href = 'exercise.html';

    iconTrash.classList.add('bi', 'bi-trash');
    buttonDel.appendChild(iconTrash);
    buttonDel.classList.add('btn', 'fs-3', 'text-red');

    container.classList.add(
        'd-flex',
        'justify-content-around',
        'align-items-center',
        'border',
        'p-3',
        'rounded',
        'w-100',
        'training-container'
    );
    container.dataset.id = training.id;

    container.appendChild(buttonDel);
    container.appendChild(trainingElement);
    container.appendChild(buttonAdd);

    const trainings = document.getElementById('meWorkouts');
    trainings.appendChild(container);

    // Adiciona uma animação de visibilidade com transição
    setTimeout(() => {
        container.classList.add('visible');
    }, 100);

    // Salva o treino selecionado ao clicar
    trainingElement.addEventListener('click', () => {
        localStorage.setItem('selectedTraining', training.name);
    });

    buttonAdd.addEventListener('click', () => {
        localStorage.setItem('selectedTraining', training.name);
    });

    // Remove o treino ao clicar no botão de exclusão
    buttonDel.addEventListener('click', () => {
        removeTraining(training.id, container);
    });
}

function removeTraining(trainingId, container) {
    // Remove o elemento do DOM
    container.classList.remove('visible'); // Adiciona uma transição de saída
    container.addEventListener('transitionend', () => {
        container.remove();
    });

    // Remove o treino do localStorage
    let trainings = JSON.parse(localStorage.getItem('trainings')) || [];
    trainings = trainings.filter(t => t.id !== trainingId); // Filtra o treino a ser removido
    localStorage.setItem('trainings', JSON.stringify(trainings));
}

function renderSavedTrainings() {
    const savedTrainings = JSON.parse(localStorage.getItem('trainings')) || [];
    savedTrainings.forEach(training => renderTraining(training));
}

// Renderizar os treinos salvos ao carregar a página
document.addEventListener('DOMContentLoaded', renderSavedTrainings);