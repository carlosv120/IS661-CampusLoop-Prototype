function openModal() {
    const modal = document.getElementById("roleModal");
    if (modal) {
        modal.classList.add("show");
        document.body.classList.add("modal-open");
    }
}

function closeModal() {
    const modal = document.getElementById("roleModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
    }
}

window.onclick = function (event) {
    const modal = document.getElementById("roleModal");
    if (event.target === modal) {
        closeModal();
    }
};

// ✅ Fixed path: index.html is in root, modal.html is in pages/
// ✅ Corrected fetch path
fetch('../pages/modal.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('modal-container').innerHTML = html;
    });
