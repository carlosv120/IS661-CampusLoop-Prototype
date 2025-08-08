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
        if (!evt.createdAt) evt.createdAt = Date.now();
        evt.source = evt.source || "user"; // mark as user-created
        items.push(evt);
        localStorage.setItem(this.key, JSON.stringify(items));
        return evt.id;
    },

    remove(id) {
        if (!id) return false;
        const items = this.getAll();
        const next = items.filter(x => x.id !== id);
        localStorage.setItem(this.key, JSON.stringify(next));
        return next.length !== items.length;
    }
};
