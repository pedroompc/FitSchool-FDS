document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('presence-modal');
    const openModalBtn = document.getElementById('register-presence-btn');
    const closeModalBtn = document.querySelector('.close-button');
    const presenceForm = document.getElementById('presence-form');
    const dateInput = document.getElementById('date-input');

    openModalBtn.addEventListener('click', () => {
        dateInput.value = new Date().toISOString().split('T')[0];
        modal.style.display = 'block';
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });


    presenceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedDate = dateInput.value;
        const selectedStatus = document.querySelector('input[name="status"]:checked').value;
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch('/user/menu/registrar-presenca/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                date: selectedDate,
                status: selectedStatus
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.message);
                
                closeModal();
                
                const dayCell = document.querySelector(`.calendar-day[data-date="${selectedDate}"]`);
                if (dayCell) {
                    dayCell.classList.remove('presente', 'ausente', 'folga');
                    dayCell.classList.add(selectedStatus.toLowerCase());
                    dayCell.innerHTML = `<span class="day-number">${new Date(selectedDate.replace(/-/g, '\/')).getDate()}</span> <span class="status-text">${selectedStatus}</span>`;
                }

                document.getElementById('dias-presentes').textContent = data.updated_stats.dias_presentes;
                document.getElementById('dias-ausentes').textContent = data.updated_stats.dias_ausentes;
                document.getElementById('taxa-frequencia').textContent = data.updated_stats.taxa_frequencia;
                
                alert('Frequência registrada com sucesso!');
            } else {
                console.error('Erro:', data.message);
                alert('Ocorreu um erro: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro de comunicação com o servidor.');
        });
    });
});