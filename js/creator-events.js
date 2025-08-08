// js/creator-events.js
$(function () {
    var $list = $("#creatorEventsList");
    if (!$list.length) return;

    // Modal wiring
    var $modal = $("#deleteModal");
    var $confirm = $("#confirmDeleteBtn");
    var $cancel = $("#cancelDeleteBtn");
    var pendingId = null;

    function openModal(id) {
        pendingId = id;
        $modal.addClass("open").attr("aria-hidden", "false");
        setTimeout(function () { $confirm.trigger("focus"); }, 0);
    }
    function closeModal() {
        pendingId = null;
        $modal.removeClass("open").attr("aria-hidden", "true");
    }

    // Close on backdrop click or Esc
    $modal.on("click", function (e) {
        if (e.target === this) closeModal();
    });
    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $modal.hasClass("open")) closeModal();
    });
    $cancel.on("click", closeModal);

    $confirm.on("click", function () {
        if (!pendingId) return;
        EventStorage.remove(pendingId);
        closeModal();
        render();
    });

    function getSaved() {
        return (window.EventStorage && EventStorage.getAll()) || [];
    }

    // Seed events: createdAt 0 and no id so they are not deletable
    var seedEvents = [
        { title: "Campus Club Fair", startDate: "10/03/2025", endDate: "10/03/2025", venue: "Main Quad", visibility: "Public", description: "Meet student orgs, grab swag, and sign up for clubs.", tags: ["Clubs", "Freebies", "Outdoors"], category: "Student Life", capacity: "500", cost: "$0", image: "../images/event1.jpg", imageAlt: "Tables across the quad with balloons and students browsing.", createdAt: 0 },
        { title: "Local Bites Pop Up", startDate: "10/10/2025", endDate: "10/10/2025", venue: "Campus Center Plaza", visibility: "Public", description: "Food trucks and samples from local restaurants.", tags: ["Food", "Discounts"], category: "Local Business", capacity: "300", cost: "$5", image: "../images/event2.png", imageAlt: "Colorful food trucks and a short line of students.", createdAt: 0 },
        { title: "Study Jam with the Library", startDate: "10/15/2025", endDate: "10/15/2025", venue: "Library Makerspace", visibility: "Private", description: "Group study session with coffee and tutoring drop ins.", tags: ["Academics", "Tutoring", "Coffee"], category: "Academics", capacity: "50", cost: "$0", image: "../images/event3.png", imageAlt: "Quiet room with laptops and a whiteboard of practice problems.", createdAt: 0 },
        { title: "Open Mic Night", startDate: "10/18/2025", endDate: "10/18/2025", venue: "Student Union Stage", visibility: "Public", description: "Poetry, comedy, and live music. Sign ups at the door.", tags: ["Music", "Comedy", "Poetry"], category: "Arts and Culture", capacity: "120", cost: "$3", image: "../images/event4.png", imageAlt: "Small stage with a microphone and soft lights.", createdAt: 0 },
        { title: "Esports Tournament", startDate: "10/25/2025", endDate: "10/26/2025", venue: "Rec Center Arena", visibility: "Public", description: "Two day bracket with prizes for the top teams.", tags: ["Gaming", "Competition"], category: "Recreation", capacity: "200", cost: "$10", image: "../images/event5.png", imageAlt: "Teams at PCs with headsets and a scoreboard on a projector.", createdAt: 0 }
    ];

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
            var delBtn = '<button class="btn-delete" ' +
                (canDelete ? 'data-id="' + e.id + '"' : 'disabled title="Sample event cannot be deleted"') +
                ' style="margin-top:10px;padding:.5rem .75rem;border:1px solid #d0d7de;border-radius:8px;background:#fff;cursor:' +
                (canDelete ? 'pointer' : 'not-allowed') +
                ';color:#cf222e;">Delete</button>';

            return '' +
                '<div class="card" style="display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;">' +
                imgBlock +
                '<div class="event-body" style="flex:1;">' +
                '<h4 style="margin:0 0 8px 0;color:#0047ab;">' + (e.title || "Untitled event") + '</h4>' +
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

    // Delete button handler with modal
    $list.on("click", ".btn-delete", function () {
        var id = $(this).data("id");
        if (!id) return; // sample item
        openModal(id);
    });

    render();
});
