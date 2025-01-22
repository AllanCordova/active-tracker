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
    let button = document.createElement('a');
    let icon = document.createElement('i');

    const container = document.createElement('div');

    trainingElement.textContent = training.name;
    trainingElement.classList.add('training', 'poppins-medium', 'text-light');
    trainingElement.href = 'exercise.html';

    icon.classList.add('bi', 'bi-plus-square');
    button.appendChild(icon);
    button.classList.add('btn', 'fs-2', 'text-white');
    button.href = 'exercise.html';

    container.classList.add(
        'd-flex',
        'justify-content-around',
        'align-items-center',
        'border',
        'p-3',
        'rounded',
        'w-100',
        'training-container' // Classe com transição inicial
    );
    container.dataset.id = training.id;

    container.appendChild(trainingElement);
    container.appendChild(button);

    const trainings = document.getElementById('meWorkouts');
    trainings.appendChild(container);

    // Adiciona a classe visível após uma pequena espera
    setTimeout(() => {
        container.classList.add('visible');
    }, 100); // Pequeno delay para permitir que a transição seja renderizada
}


function renderSavedTrainings() {
    const savedTrainings = JSON.parse(localStorage.getItem('trainings')) || [];
    savedTrainings.forEach(training => renderTraining(training));
}

// Renderizar os treinos salvos ao carregar a página
document.addEventListener('DOMContentLoaded', renderSavedTrainings);
