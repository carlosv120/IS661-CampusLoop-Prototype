// js/auto-open-modal.js  (full file)
(async () => {
    const container = document.getElementById("modal-container");
    if (!container) return;           // page doesn’t need the modal

    // If the current page URL contains “/pages/” we are already inside that folder.
    // Go up one level, then back into pages/ to fetch modal.html.
    const inPagesFolder = location.pathname.includes("/pages/");
    const modalPath = inPagesFolder ? "../pages/modal.html" : "pages/modal.html";

    try {
        const response = await fetch(modalPath);
        if (!response.ok) throw new Error(response.statusText);
        container.innerHTML = await response.text();
    } catch (err) {
        console.error("Could not load modal:", err);
        return; // bail out if fetch failed
    }

    // === Wire up helpers after injection ===
    window.openModal = () => {
        document.getElementById("roleModal").classList.add("show");
        document.body.classList.add("modal-open");
    };

    window.closeModal = () => {
        document.getElementById("roleModal").classList.remove("show");
        document.body.classList.remove("modal-open");
    };

    // click outside to close
    window.addEventListener("click", (e) => {
        const modal = document.getElementById("roleModal");
        if (e.target === modal) closeModal();
    });
})();
