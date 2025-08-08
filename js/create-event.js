// js/create-event.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("createEventForm") || document.querySelector("form");
    if (!form) return;

    const getVal = (id, name) => {
        const el = document.getElementById(id) || form.querySelector(`[name="${name}"]`);
        return el ? el.value.trim() : "";
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = getVal("eventTitle", "title");
        const startDate = getVal("startDate", "startDate");
        const endDate = getVal("endDate", "endDate");
        const venue = getVal("venue", "venue");
        const visibility = getVal("visibility", "visibility");
        const description = getVal("description", "description");
        const tagsRaw = getVal("tags", "tags");
        const category = getVal("category", "category");
        const capacity = getVal("capacity", "capacity");
        const cost = getVal("cost", "cost");
        const image = getVal("imageUrl", "image");   // optional URL or relative path
        const imageAlt = getVal("imageAlt", "imageAlt") || `${title} image`;

        if (!title || !startDate || !venue) {
            alert("Please complete Title, Start Date, and Venue.");
            return;
        }

        const evt = {
            title,
            startDate,
            endDate: endDate || startDate,
            venue,
            visibility,
            description,
            tags: tagsRaw ? tagsRaw.split(",").map(s => s.trim()).filter(Boolean) : [],
            category,
            capacity,
            cost,
            image: image || null,
            imageAlt
        };

        EventStorage.save(evt);

        // Send creator back to the creator home page
        // Adjust path if your file is not /pages/create-event.html
        window.location.replace("home-creator.html");
    });
});
