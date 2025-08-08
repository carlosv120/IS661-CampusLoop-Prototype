// js/storage.js
window.EventStorage = {
    key: "cl_events",

    getAll() {
        try { return JSON.parse(localStorage.getItem(this.key)) || []; }
        catch { return []; }
    },

    save(evt) {
        const items = this.getAll();
        if (!evt.id) evt.id = "evt_" + Date.now();
        items.push(evt);
        localStorage.setItem(this.key, JSON.stringify(items));
        return evt.id;
    }
};
