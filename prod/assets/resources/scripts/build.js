document
  .getElementById("formTrainings")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nomeTraining = document.getElementById("nameTraining").value;

    if (nomeTraining.trim() === "" || nomeTraining == null) {
      return false;
    }

    const trainingData = {
      id: makeKey(),
      name: nomeTraining,
    };

    renderTraining(trainingData);
    saveTraining(trainingData);

    document.getElementById("nameTraining").value = "";
  });

function makeKey() {
  return Date.now();
}

function saveTraining(training) {
  let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
  trainings.push(training);
  localStorage.setItem("trainings", JSON.stringify(trainings));
}

function renderTraining(training) {
  let trainingElement = document.createElement("button");
  let buttonAdd = document.createElement("a");
  let buttonDel = document.createElement("button");
  let iconPlus = document.createElement("i");
  let iconTrash = document.createElement("i");

  const container = document.createElement("div");

  trainingElement.textContent = training.name;
  trainingElement.classList.add(
    "training",
    "poppins-medium",
    "text-light",
    "btn",
    "btn-success"
  );

  iconPlus.classList.add("bi", "bi-plus-square");
  buttonAdd.appendChild(iconPlus);
  buttonAdd.classList.add("btn", "fs-3", "text-white");
  buttonAdd.href = "exercise.html";

  iconTrash.classList.add("bi", "bi-trash");
  buttonDel.appendChild(iconTrash);
  buttonDel.classList.add("btn", "fs-3", "text-red");

  container.classList.add(
    "d-flex",
    "justify-content-around",
    "align-items-center",
    "border",
    "p-3",
    "rounded",
    "w-100",
    "training-container"
  );
  container.dataset.id = training.id;

  container.appendChild(buttonDel);
  container.appendChild(trainingElement);
  container.appendChild(buttonAdd);

  const trainings = document.getElementById("meWorkouts");
  trainings.appendChild(container);

  // Adiciona uma animação de visibilidade com transição
  setTimeout(() => {
    container.classList.add("visible");
  }, 100);

  // Salva o treino selecionado ao clicar
  trainingElement.addEventListener("click", () => {
    renderExcercise(training.name);
  });

  buttonAdd.addEventListener("click", () => {
    localStorage.setItem("selectedTraining", training.name);
  });

  // Remove o treino ao clicar no botão de exclusão
  buttonDel.addEventListener("click", () => {
    removeTraining(training.id, container);
  });
}

function removeTraining(trainingId, container) {
  // Remove o elemento do DOM
  container.classList.remove("visible"); // Adiciona uma transição de saída
  container.addEventListener("transitionend", () => {
    container.remove();
  });

  // Remove o treino do localStorage
  let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
  trainings = trainings.filter((t) => t.id !== trainingId); // Filtra o treino a ser removido
  localStorage.setItem("trainings", JSON.stringify(trainings));
}

function renderSavedTrainings() {
  const savedTrainings = JSON.parse(localStorage.getItem("trainings")) || [];
  savedTrainings.forEach((training) => renderTraining(training));
}

function renderExcercise(nome) {
  let excercises = document.getElementById("meExcercises");
  // limpar a tela
  excercises.textContent = "";

  let titulo = document.createElement("h2");
  titulo.classList.add("h1", "poppins-semi-bold");
  titulo.textContent = nome;
  excercises.appendChild(titulo);
  $(document).ready(function () {
    // Inicialmente, o título é posicionado acima da tela
    $(titulo).css("top", "-50px").css("opacity", 0);

    // O título entra suavemente da parte superior da tela
    $(titulo).animate(
      { top: "0px", opacity: 1 }, // Desloca para a posição original e fica visível
      1000 // Duração de 1 segundo
    );
  });

  // Recupera os treinos salvos no localStorage
  let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
  let training = trainings.find((t) => t.name === nome);

  if (training && training.exercises && training.exercises.length > 0) {
    let exerciseList = document.createElement("div");

    training.exercises.forEach(async (exerciseName) => {
      const url = `https://exercisedb.p.rapidapi.com/exercises/name/${exerciseName}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "a337c073b5mshbe033a6687f989ap1e31d9jsn14e66b6078c6",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.length > 0) {
          let exerciseData = data[0]; // Pegamos o primeiro resultado

          // Criar um card para exibir o nome e GIF do exercício
          let exerciseCard = document.createElement("div");
          exerciseCard.classList.add(
            "exercise-card",
            "mb-3",
            "p-4",
            "border",
            "rounded"
          );

          // Adicionar o nome do exercício
          let exerciseTitle = document.createElement("h2");
          exerciseTitle.classList.add("h2", "poppins-medium", "mb-2");
          exerciseTitle.textContent = exerciseData.name;
          exerciseCard.appendChild(exerciseTitle);

          // Adicionar o GIF
          let exerciseGif = document.createElement("img");
          exerciseGif.src = exerciseData.gifUrl;
          exerciseGif.alt = exerciseData.name;
          exerciseGif.classList.add("exercise-gif", "img-thumbnail");
          exerciseCard.appendChild(exerciseGif);

          // Adiciona o card à lista
          exerciseList.appendChild(exerciseCard);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do exercício:", error);
      }
    });

    // Adiciona os exercícios ao elemento onde serão exibidos
    excercises.appendChild(exerciseList);
  } else {
    // Remove mensagens de erro anteriores antes de criar uma nova
    $(".bg-danger").remove();

    let error = $("<span>")
      .addClass("text-white poppins-light bg-danger p-3 rounded d-block")
      .text("Você precisa adicionar um exercício no treino selecionado!");

    // Inicialmente, o título fica invisível
    $(error).css("opacity", 0);

    $(error).fadeTo(1000, 1);

    // Adiciona ao container
    $("#meExcercises").append(error);

    // Transição suave para desaparecer
    setTimeout(() => {
      error.fadeOut(500, function () {
        $(this).remove();
      });
    }, 2500);
  }
}

// Renderizar os treinos salvos ao carregar a página
document.addEventListener("DOMContentLoaded", renderSavedTrainings);
