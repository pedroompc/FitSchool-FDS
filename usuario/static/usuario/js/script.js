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
