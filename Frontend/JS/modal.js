const showModal = (success, message) => {
    const modal = document.getElementById('notification-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.getElementById('modal-icon');

    if (success) {
        modalIcon.innerHTML = '✓';
        modalIcon.className = 'success-icon';
        modalTitle.textContent = 'Success!';
    } else {
        modalIcon.innerHTML = '✕';
        modalIcon.className = 'error-icon';
        modalTitle.textContent = 'Error';
    }

    modalMessage.textContent = message;
    modal.style.display = 'block';

    // Auto close after 3 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
};

// Close modal when clicking the X
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('notification-modal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('notification-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
