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

function showAddWorkoutModal() {
    const modal = document.getElementById('addWorkoutModal');
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Fechar modal clicando fora
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// === PERFIL DO USUÁRIO ===
document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.querySelector(".btn-action.edit");
    const profileForm = document.querySelector(".profile-details form");

    if (editBtn && profileForm) {
        editBtn.addEventListener("click", function (e) {
            e.preventDefault();
            profileForm.classList.add("editing");
        });
    }

    const cancelBtn = document.querySelector(".cancel-edit");
    if (cancelBtn && profileForm) {
        cancelBtn.addEventListener("click", function () {
            profileForm.classList.remove("editing");
        });
    }
});

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

// === FORMULÁRIO DE TREINO (envio real) ===
document.addEventListener("DOMContentLoaded", function () {
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
                closeModal("addWorkoutModal");
                location.reload(); // Recarrega pra mostrar o novo treino
            } else {
                alert("Erro ao salvar treino!");
            }
        });
    }
});

// === ADICIONAR NOVO EXERCÍCIO ===
document.addEventListener('DOMContentLoaded', function () {
    const addExerciseBtn = document.getElementById('add-exercise-btn');

    if (addExerciseBtn) {
        addExerciseBtn.addEventListener('click', function () {
            const container = document.getElementById('exercise-container');
            if (!container) return;

            const newForm = container.children[0].cloneNode(true);
            newForm.querySelectorAll('input').forEach(input => input.value = '');
            container.appendChild(newForm);
        });
    }
});