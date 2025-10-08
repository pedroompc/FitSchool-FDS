// === LOGIN / DASHBOARD ===
function login() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    closeAllModals();
}

// === MODAIS ===
function showRegister() {
    document.getElementById('registerModal').style.display = 'flex';
}

function showAddWorkout() {
    document.getElementById('addWorkoutModal').style.display = 'flex';
}

function showAddWorkoutModal() {
    document.getElementById('addWorkoutModal').style.display = 'flex';
}

function showEditWorkoutModal() {
    document.getElementById('workout-name').value = 'Superiores A';
    document.getElementById('workout-type-modal').value = 'strength';
    document.getElementById('workout-day-modal').value = 'monday';
    document.getElementById('workout-duration').value = '60';
    document.getElementById('workout-notes').value = 'Treino de peito e costas';

    document.getElementById('addWorkoutModal').style.display = 'flex';
    document.querySelector('.modal-title').textContent = 'Editar Treino';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// === FORMULÁRIOS FAKE ===
function register() {
    closeModal('registerModal');
    alert('Conta criada com sucesso! Faça login para continuar.');
    document.getElementById('loginForm').style.display = 'block';
}

function addWorkout() {
    closeModal('addWorkoutModal');
    alert('Treino adicionado com sucesso!');
}

// Prevenir envio fake do workout form
const workoutForm = document.getElementById('workoutForm');
if (workoutForm) {
    workoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Treino salvo com sucesso!');
        closeModal('addWorkoutModal');
    });
}

// Prevenir envio fake do athlete form
const athleteForm = document.getElementById('athlete-form');
if (athleteForm) {
    athleteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Atleta cadastrado com sucesso! (Funcionalidade de envio precisa ser implementada)');
    });
}

// === CALENDÁRIO (simulação) ===
document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', function () {
        if (this.classList.contains('present')) {
            this.classList.remove('present');
            this.classList.add('absent');
            this.querySelector('.day-status').textContent = 'Ausente';
        } else if (this.classList.contains('absent')) {
            this.classList.remove('absent');
            this.classList.add('present');
            this.querySelector('.day-status').textContent = 'Presente';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.querySelector(".btn-action.edit");
    const profileForm = document.querySelector(".profile-details form");

    if (editBtn && profileForm) {
        editBtn.addEventListener("click", function (e) {
            e.preventDefault();
            profileForm.classList.add("editing");
        });
    }

    // só adiciona se existir o botão cancelar
    const cancelBtn = document.querySelector(".cancel-edit");
    if (cancelBtn && profileForm) {
        cancelBtn.addEventListener("click", function () {
            profileForm.classList.remove("editing");
        });
    }
});


function showAddWorkoutModal() {
  document.getElementById("addWorkoutModal").style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  // Intercepta o envio do formulário do treino
  const workoutForm = document.querySelector("#addWorkoutModal form");
  if (workoutForm) {
    workoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(workoutForm);
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Fecha modal
        closeModal("addWorkoutModal");
        // Recarrega a página pra mostrar o novo treino (ou poderíamos atualizar o DOM direto)
        location.reload();
      } else {
        alert("Erro ao salvar treino!");
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const addExerciseBtn = document.getElementById('add-exercise-btn');

  if (addExerciseBtn) {
    addExerciseBtn.addEventListener('click', function () {
      const container = document.getElementById('exercise-container');
      if (!container) return;

      const newForm = container.children[0].cloneNode(true);

      // Limpa os campos do novo formulário
      newForm.querySelectorAll('input').forEach(input => input.value = '');

      // Adiciona o novo bloco de exercício
      container.appendChild(newForm);
    });
  }
});
