// ── helpers for each modal ─────────────────────────────
function openValidationModal() {
    document.getElementById("validationModal").classList.add("show");
    document.body.classList.add("modal-open");
}
function closeValidationModal() {
    document.getElementById("validationModal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

function openInvalidModal() {
    document.getElementById("invalidModal").classList.add("show");
    document.body.classList.add("modal-open");
}
function closeInvalidModal() {
    document.getElementById("invalidModal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

function openModal() {               // role-select
    document.getElementById("roleModal").classList.add("show");
    document.body.classList.add("modal-open");
}
function closeModal() {
    document.getElementById("roleModal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

// ── login button logic ─────────────────────────────────
document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("username").value.trim().toLowerCase();
    const pass = document.getElementById("password").value.trim();

    // 1) empty fields → validation modal
    if (user === "" || pass === "") {
        openValidationModal();
        return;
    }

    // 2) student credentials
    if (user === "student@njit.edu" && pass === "student") {
        window.location.href = "../pages/home-student.html";
        return;
    }

    // 3) creator credentials
    if (user === "creator@gmail.com" && pass === "creator") {
        window.location.href = "../pages/home-creator.html";
        return;
    }

    // 4) otherwise → invalid credentials modal
    openInvalidModal();
});

// ── click outside any modal closes it ──────────────────
window.addEventListener("click", (e) => {
    if (e.target.id === "roleModal") closeModal();
    if (e.target.id === "validationModal") closeValidationModal();
    if (e.target.id === "invalidModal") closeInvalidModal();
});
