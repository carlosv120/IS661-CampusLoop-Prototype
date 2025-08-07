// Show validation modal
function openValidationModal() {
    const modal = document.getElementById('validationModal');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeValidationModal() {
    const modal = document.getElementById('validationModal');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Show role modal
function openModal() {
    const modal = document.getElementById('roleModal');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeModal() {
    const modal = document.getElementById('roleModal');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Attach to Login button
document.getElementById('loginBtn').addEventListener('click', function () {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === '' || pass === '') {
        openValidationModal();
    } else {
        alert('Logging in...'); // Simulate real login here
    }
});

// Allow outside click to close modals
window.onclick = function (event) {
    const validationModal = document.getElementById('validationModal');
    const roleModal = document.getElementById('roleModal');

    if (event.target === validationModal) {
        closeValidationModal();
    } else if (event.target === roleModal) {
        closeModal();
    }
};
