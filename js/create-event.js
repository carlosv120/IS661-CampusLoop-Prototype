// js/create-event.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createEventForm");
    const saveBtn = document.getElementById("saveBtn");
    if (!form) {
        console.error("[create-event] form not found");
        return;
    }

    const defaults = {
        title: "Untitled Event",
        startDate: "2025-10-01",
        endDate: "2025-10-01",
        venue: "Main Quad",
        visibility: "Public",
        description: "Event description goes here.",
        tags: "General",
        category: "Student Life",
        capacity: "100",
        cost: "0",
        image: "https://tripleseat.com/wp-content/uploads/2022/11/Corporate-Events-6-Strategies-to-Meet-Growing-Demand-and-Drive-Bookings.png",
        imageAlt: "Event image"
    };

    const q = (sel) => form.querySelector(sel);
    const $ = (id, name) => q(`${id}`) || q(`[name="${name}"]`);

    function setDefault(id, name, val) {
        const el = $(id, name);
        if (!el || el.value) return;
        if (el.type === "date") {
            el.value = /^\d{4}-\d{2}-\d{2}$/.test(val) ? val : "";
        } else {
            el.value = val;
        }
    }

    // Prefill
    setDefault("eventTitle", "title", defaults.title);
    setDefault("startDate", "startDate", defaults.startDate);
    setDefault("endDate", "endDate", defaults.endDate);
    setDefault("venue", "venue", defaults.venue);
    setDefault("visibility", "visibility", defaults.visibility);
    setDefault("description", "description", defaults.description);
    setDefault("tags", "tags", defaults.tags);
    setDefault("category", "category", defaults.category);
    setDefault("capacity", "capacity", defaults.capacity);
    setDefault("cost", "cost", defaults.cost);
    setDefault("imageUrl", "image", defaults.image);
    setDefault("imageAlt", "imageAlt", defaults.imageAlt);

    // Sync end date to start date if blank
    const startEl = $("#startDate", "startDate");
    const endEl = $("#endDate", "endDate");
    if (startEl && endEl) {
        startEl.addEventListener("change", () => {
            if (!endEl.value) endEl.value = startEl.value;
        });
    }

    // Numbers only
    const onlyInt = (e) => {
        const cleaned = (e.target.value || "").replace(/\D+/g, "");
        e.target.value = cleaned;
    };
    const capacityEl = $("#capacity", "capacity");
    const costEl = $("#cost", "cost");
    if (capacityEl) capacityEl.addEventListener("input", onlyInt);
    if (costEl) costEl.addEventListener("input", onlyInt);

    const getVal = (id, name) => {
        const el = $(id, name);
        return el ? el.value.trim() : "";
    };

    const normalizeDate = (v) => {
        if (!v) return "";
        if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
            const [mm, dd, yyyy] = v.split("/");
            return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        }
        return v;
    };

    function handleSubmit() {
        const title = getVal("eventTitle", "title");
        let startDate = getVal("startDate", "startDate");
        let endDate = getVal("endDate", "endDate");
        const venue = getVal("venue", "venue");
        const visibility = getVal("visibility", "visibility");
        const description = getVal("description", "description");
        const tagsRaw = getVal("tags", "tags");
        const category = getVal("category", "category");
        const capacity = getVal("capacity", "capacity");
        const cost = getVal("cost", "cost");
        const image = getVal("imageUrl", "image");
        const imageAlt = getVal("imageAlt", "imageAlt") || `${title} image`;

        startDate = normalizeDate(startDate);
        endDate = normalizeDate(endDate) || startDate;

        if (!title || !startDate || !venue) {
            alert("Please complete Title, Start Date, and Venue.");
            return;
        }

        const evt = {
            title,
            startDate,
            endDate,
            venue,
            visibility,
            description,
            tags: tagsRaw ? tagsRaw.split(",").map(s => s.trim()).filter(Boolean) : [],
            category,
            capacity,
            cost: cost ? `$${cost}` : "$0",
            image: image || null,
            imageAlt
        };

        try {
            if (window.EventStorage && EventStorage.save) {
                EventStorage.save(evt);
            } else {
                console.warn("[create-event] EventStorage.save not available; continuing without save");
            }
        } catch (err) {
            console.error("[create-event] saving failed:", err);
        }

        window.location.replace("home-creator.html");
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSubmit();
    });
    if (saveBtn) {
        saveBtn.addEventListener("click", (e) => {
            e.preventDefault();
            handleSubmit();
        });
    }
});
