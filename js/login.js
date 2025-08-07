document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const signupLink = document.getElementById("openSignupLink");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

            if (!user || !pass) {
                alert("Please enter both username and password.");
            } else {
                alert("Logging in...");
            }
        });
    }

    if (signupLink) {
        signupLink.addEventListener("click", function (e) {
            e.preventDefault(); // ✅ always stop the default '#' behavior

            const modal = document.getElementById("roleModal");
            if (modal) {
                modal.classList.add("show");
                document.body.classList.add("modal-open");
            } else {
                console.warn("Modal not found");
            }
        });
    }

    const modal = document.getElementById("roleModal");

    if (modal) {
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.classList.remove("show");
                document.body.classList.remove("modal-open");
            }
        };

        window.closeModal = function () {
            modal.classList.remove("show");
            document.body.classList.remove("modal-open");
        };
    }
});
