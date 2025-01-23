// Recupera o nome do treino do Local Storage
const trainingName = localStorage.getItem('selectedTraining');
    
// Exibe o nome como título
if (trainingName) {
    document.getElementById('trainingTitle').textContent = trainingName;
} else {
    document.getElementById('trainingTitle').textContent = 'Treino não encontrado';
}

document.getElementById('filterButton').addEventListener('click', () => {
    const bodyPart = document.getElementById('bodyPartSelect').value;
    fetchExercisesByBodyPart(bodyPart);
});


async function fetchExercisesByBodyPart(bodyPart) {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a337c073b5mshbe033a6687f989ap1e31d9jsn14e66b6078c6', // Sua chave da API
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
    };

    const exerciseList = document.getElementById('exerciseList');
    exerciseList.textContent = 'Carregando exercícios...';

    try {
        const response = await fetch(url, options);
        const exercises = await response.json(); // Converta a resposta para JSON

        if (exercises.length === 0) {
            exerciseList.textContent = 'Nenhum exercício encontrado para esta parte do corpo.';
            return;
        }

        exerciseList.innerHTML = ''; // Limpa qualquer conteúdo existente

        // Cria os cards para os exercícios
        exercises.forEach((exercise) => {
            const exerciseCard = document.createElement('div');
            exerciseCard.classList.add('exercise-card', 'mb-3', 'p-3', 'border', 'rounded');

            // Adiciona o GIF
            const gif = document.createElement('img');
            gif.src = exercise.gifUrl;
            gif.alt = exercise.name;
            gif.classList.add('exercise-gif', 'mb-2', 'img-thumbnail');

            // Nome do exercício
            const exerciseName = document.createElement('h2', 'poppins-medium');
            exerciseName.textContent = exercise.name;

            // Botão para adicionar ao treino
            const addButton = document.createElement('button');
            addButton.textContent = 'save at workout';
            addButton.classList.add('btn', 'btn-success', 'poppins-light');
            addButton.addEventListener('click', () => {
                addExerciseToTraining(exercise.name);
            });

            // Adiciona tudo ao card
            exerciseCard.appendChild(gif);
            exerciseCard.appendChild(exerciseName);
            exerciseCard.appendChild(addButton);

            exerciseList.appendChild(exerciseCard);
        });
    } catch (error) {
        exerciseList.textContent = 'Erro ao carregar os exercícios. Tente novamente mais tarde.';
        console.error('Erro na requisição:', error);
    }
}

// Função para adicionar exercícios ao treino selecionado
function addExerciseToTraining(exerciseName) {
    const selectedTraining = localStorage.getItem('selectedTraining');
    if (!selectedTraining) return;

    let trainings = JSON.parse(localStorage.getItem('trainings')) || [];
    let training = trainings.find(t => t.name === selectedTraining);

    if (training) {
        if (!training.exercises) training.exercises = [];
        training.exercises.push(exerciseName);

        localStorage.setItem('trainings', JSON.stringify(trainings));

        // Exibe a mensagem de sucesso
        showSuccessMessage(`Exercício "${exerciseName}" adicionado ao treino "${selectedTraining}"`);
    }
}

// Função para exibir mensagem de sucesso
function showSuccessMessage(message) {
    // Cria o elemento da mensagem
    const messageContainer = document.createElement('div');
    messageContainer.className = 'alert alert-success alert-dismissible fade show position-fixed top-50 start-50 translate-middle';
    messageContainer.style.zIndex = '1050'; // Garante que a mensagem fique sobreposta
    messageContainer.role = 'alert';
    messageContainer.textContent = message;

    // Botão de fechar
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    messageContainer.appendChild(closeButton);

    // Adiciona a mensagem ao body
    document.body.appendChild(messageContainer);

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageContainer.classList.remove('show');
        messageContainer.addEventListener('transitionend', () => {
            messageContainer.remove();
        });
    }, 5000);
}
