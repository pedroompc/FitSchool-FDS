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

// === SIDEBAR / MENU ===
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu a');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Só bloqueia se for "#" (ex.: botões fake de modal)
            if (this.getAttribute("href") === "#") {
                e.preventDefault();
            }

            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Toggle sidebar (se existir botão)
    const sidebar = document.getElementById("perfilSidebar");
    const main = document.getElementById("perfilMain");
    const toggleBtn = document.getElementById("toggleSidebar");

    if (sidebar && main && toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
            main.classList.toggle("expanded");
        });
    }

    // Inicialização básica
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    if (dashboard && loginForm) {
        dashboard.style.display = 'none';
        loginForm.style.display = 'block';
    }
    closeAllModals();
});
