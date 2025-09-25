// Função para simular o login
function login() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Função para mostrar o formulário de login
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    closeAllModals();
}

// Função para mostrar modal de registro
function showRegister() {
    document.getElementById('registerModal').style.display = 'flex';
}

// Função para mostrar modal de adicionar treino
function showAddWorkout() {
    document.getElementById('addWorkoutModal').style.display = 'flex';
}

// Função para fechar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fechar todos os modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Função para simular registro
function register() {
    closeModal('registerModal');
    alert('Conta criada com sucesso! Faça login para continuar.');
    document.getElementById('loginForm').style.display = 'block';
}

// Função para adicionar treino
function addWorkout() {
    closeModal('addWorkoutModal');
    alert('Treino adicionado com sucesso!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    closeAllModals();
});

// Simulação de interação com o calendário
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

// Simulação de interatividade básica
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento de clique aos itens do menu
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("perfilSidebar");
    const main = document.getElementById("perfilMain");
    const toggleBtn = document.getElementById("toggleSidebar");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("expanded");
    });
});