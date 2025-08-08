// js/creator-events.js
$(function () {
    var $list = $("#creatorEventsList");
    if (!$list.length) return;

    /* ---------- Delete modal (existing) ---------- */
    var $delModal = $("#deleteModal");
    var $delConfirm = $("#confirmDeleteBtn");
    var $delCancel = $("#cancelDeleteBtn");
    var pendingDeleteId = null;

    function openDeleteModal(id) {
        pendingDeleteId = id;
        $delModal.addClass("open").attr("aria-hidden", "false");
        setTimeout(function () { $delConfirm.trigger("focus"); }, 0);
    }
    function closeDeleteModal() {
        pendingDeleteId = null;
        $delModal.removeClass("open").attr("aria-hidden", "true");
    }
    $delModal.on("click", function (e) { if (e.target === this) closeDeleteModal(); });
    $(document).on("keydown", function (e) { if (e.key === "Escape" && $delModal.hasClass("open")) closeDeleteModal(); });
    $delCancel.on("click", closeDeleteModal);
    $delConfirm.on("click", function () {
        if (!pendingDeleteId) return;
        EventStorage.remove(pendingDeleteId);
        closeDeleteModal();
        render();
    });

    function getSaved() {
        return (window.EventStorage && EventStorage.getAll()) || [];
    }

    /* ---------- Seed events (non-deletable) ---------- */
    var seedEvents = [
        { title: "Campus Club Fair", startDate: "10/03/2025", endDate: "10/03/2025", venue: "Main Quad", visibility: "Public", description: "Meet student orgs, grab swag, and sign up for clubs.", tags: ["Clubs", "Freebies", "Outdoors"], category: "Student Life", capacity: "500", cost: "$0", image: "../images/event1.jpg", imageAlt: "Tables across the quad with balloons and students browsing.", createdAt: 0 },
        { title: "Local Bites Pop Up", startDate: "10/10/2025", endDate: "10/10/2025", venue: "Campus Center Plaza", visibility: "Public", description: "Food trucks and samples from local restaurants.", tags: ["Food", "Discounts"], category: "Local Business", capacity: "300", cost: "$5", image: "../images/event2.png", imageAlt: "Colorful food trucks and a short line of students.", createdAt: 0 },
        { title: "Study Jam with the Library", startDate: "10/15/2025", endDate: "10/15/2025", venue: "Library Makerspace", visibility: "Private", description: "Group study session with coffee and tutoring drop ins.", tags: ["Academics", "Tutoring", "Coffee"], category: "Academics", capacity: "50", cost: "$0", image: "../images/event3.png", imageAlt: "Quiet room with laptops and a whiteboard of practice problems.", createdAt: 0 },
        { title: "Open Mic Night", startDate: "10/18/2025", endDate: "10/18/2025", venue: "Student Union Stage", visibility: "Public", description: "Poetry, comedy, and live music. Sign ups at the door.", tags: ["Music", "Comedy", "Poetry"], category: "Arts and Culture", capacity: "120", cost: "$3", image: "../images/event4.png", imageAlt: "Small stage with a microphone and soft lights.", createdAt: 0 },
        { title: "Esports Tournament", startDate: "10/25/2025", endDate: "10/26/2025", venue: "Rec Center Arena", visibility: "Public", description: "Two day bracket with prizes for the top teams.", tags: ["Gaming", "Competition"], category: "Recreation", capacity: "200", cost: "$10", image: "../images/event5.png", imageAlt: "Teams at PCs with headsets and a scoreboard on a projector.", createdAt: 0 }
    ];

    /* ---------- Publish state (IN-MEMORY ONLY) ---------- */
    // This object lives only for the life of the page. Reload = cleared.
    var publishMap = Object.create(null);

    function keyFor(e) {
        return e.id ? ("id:" + e.id) : ("seed:" + (e.title || "") + "|" + (e.startDate || ""));
    }
    function isPublished(e) {
        return !!publishMap[keyFor(e)];
    }
    function markPublished(e) {
        publishMap[keyFor(e)] = true;
    }

    /* ---------- Publish confirmation modal ---------- */
    var $pubModal = $("#publishModal");
    var $pubConfirm = $("#confirmPublishBtn");
    var $pubCancel = $("#cancelPublishBtn");
    var pendingPubKey = null;

    function openPublishModal(pubkey) {
        pendingPubKey = pubkey;
        $pubModal.addClass("open").attr("aria-hidden", "false");
        setTimeout(function () { $pubConfirm.trigger("focus"); }, 0);
    }
    function closePublishModal() {
        pendingPubKey = null;
        $pubModal.removeClass("open").attr("aria-hidden", "true");
    }
    $pubModal.on("click", function (e) { if (e.target === this) closePublishModal(); });
    $(document).on("keydown", function (e) { if (e.key === "Escape" && $pubModal.hasClass("open")) closePublishModal(); });
    $pubCancel.on("click", closePublishModal);
    $pubConfirm.on("click", function () {
        if (!pendingPubKey) return;
        var all = getSaved().concat(seedEvents);
        var ev = all.find(function (e) { return keyFor(e) === pendingPubKey; });
        if (ev) markPublished(ev);
        closePublishModal();
        render();
    });

    /* ---------- Render ---------- */
    function render() {
        var saved = getSaved();
        var events = saved.concat(seedEvents).sort(function (a, b) {
            return (b.createdAt || 0) - (a.createdAt || 0);
        });

        function renderEventCard(e) {
            var start = e.startDate || "";
            var end = e.endDate || start;
            var dateText = start === end ? start : start + " to " + end;
            var tagsText = e.tags && e.tags.length ? e.tags.join(", ") : "None";

            var imgBlock = e.image
                ? '<img class="event-img" src="' + e.image + '" alt="' + (e.imageAlt || e.title || "Event image") + '" style="width:120px;height:auto;border-radius:8px;">'
                : '<div class="event-img" aria-label="Event image description" style="width:120px;min-height:80px;border-radius:8px;background:#f3f6ff;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;"><small>' + (e.imageAlt || "Event image") + '</small></div>';

            var canDelete = !!e.id;
            var delBtn =
                '<button class="btn-delete" ' +
                (canDelete ? 'data-id="' + e.id + '"' : 'disabled title="Sample event cannot be deleted"') +
                ' style="margin-top:10px;padding:.5rem .75rem;border:1px solid #d0d7de;border-radius:8px;background:#fff;cursor:' +
                (canDelete ? 'pointer' : 'not-allowed') +
                ';color:#cf222e;">Delete</button>';

            var published = isPublished(e);
            var pubKey = keyFor(e);
            var publishHTML = published
                ? '<span class="badge-published">✅ Published</span> <a class="btn-stats" href="event-stats.html">Check statistics</a>'
                : '<button class="btn-publish" data-pubkey="' + pubKey + '">Publish</button>';

            return '' +
                '<div class="card" style="display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;">' +
                imgBlock +
                '<div class="event-body" style="flex:1;">' +
                '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between">' +
                '<h4 style="margin:0 0 8px 0;color:#0047ab;flex:1 1 auto">' + (e.title || "Untitled event") + '</h4>' +
                '<div class="publish-row">' + publishHTML + '</div>' +
                '</div>' +
                '<p style="margin:0 0 12px 0;">' + (e.description || "") + '</p>' +
                '<div class="event-fields" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;">' +
                '<div><strong>Date</strong> ' + dateText + '</div>' +
                '<div><strong>Venue</strong> ' + (e.venue || "") + '</div>' +
                '<div><strong>Visibility</strong> ' + (e.visibility || "") + '</div>' +
                '<div><strong>Tags</strong> ' + tagsText + '</div>' +
                '<div><strong>Category</strong> ' + (e.category || "") + '</div>' +
                '<div><strong>Capacity or Attendance</strong> ' + (e.capacity || "") + '</div>' +
                '<div><strong>Cost</strong> ' + (e.cost || "") + '</div>' +
                '</div>' +
                delBtn +
                '</div>' +
                '</div>';
        }

        $list.html(events.map(renderEventCard).join(""));
    }

    /* ---------- Interactions ---------- */

    $list.on("click", ".btn-delete", function () {
        var id = $(this).data("id");
        if (!id) return; // sample item
        openDeleteModal(id);
    });

    // Publish -> open confirmation modal (no persistence after reload)
    $list.on("click", ".btn-publish", function () {
        var pubkey = $(this).data("pubkey");
        if (!pubkey) return;
        openPublishModal(pubkey);
    });

    render();
});
