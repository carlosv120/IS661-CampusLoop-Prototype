// js/creator-events.js
document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("creatorEventsList");
    if (!list) return;

    // Read locally saved events from the Create Event page
    var STORAGE_KEY = "cl_events";
    function getSavedEvents() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    // Seed events for visual purposes
    var seedEvents = [
        {
            title: "Campus Club Fair",
            startDate: "10/03/2025",
            endDate: "10/03/2025",
            venue: "Main Quad",
            visibility: "Public",
            description: "Meet student orgs, grab swag, and sign up for clubs.",
            tags: ["Clubs", "Freebies", "Outdoors"],
            category: "Student Life",
            capacity: "500",
            cost: "$0",
            image: "../images/event1.jpg",
            imageAlt: "Tables across the quad with balloons and students browsing."
        },
        {
            title: "Local Bites Pop Up",
            startDate: "10/10/2025",
            endDate: "10/10/2025",
            venue: "Campus Center Plaza",
            visibility: "Public",
            description: "Food trucks and samples from local restaurants.",
            tags: ["Food", "Discounts"],
            category: "Local Business",
            capacity: "300",
            cost: "$5",
            image: "../images/event2.png",
            imageAlt: "Colorful food trucks and a short line of students."
        },
        {
            title: "Study Jam with the Library",
            startDate: "10/15/2025",
            endDate: "10/15/2025",
            venue: "Library Makerspace",
            visibility: "Private",
            description: "Group study session with coffee and tutoring drop ins.",
            tags: ["Academics", "Tutoring", "Coffee"],
            category: "Academics",
            capacity: "50",
            cost: "$0",
            image: "../images/event3.png",
            imageAlt: "Quiet room with laptops and a whiteboard of practice problems."
        },
        {
            title: "Open Mic Night",
            startDate: "10/18/2025",
            endDate: "10/18/2025",
            venue: "Student Union Stage",
            visibility: "Public",
            description: "Poetry, comedy, and live music. Sign ups at the door.",
            tags: ["Music", "Comedy", "Poetry"],
            category: "Arts and Culture",
            capacity: "120",
            cost: "$3",
            image: "../images/event4.png",
            imageAlt: "Small stage with a microphone and soft lights."
        },
        {
            title: "Esports Tournament",
            startDate: "10/25/2025",
            endDate: "10/26/2025",
            venue: "Rec Center Arena",
            visibility: "Public",
            description: "Two day bracket with prizes for the top teams.",
            tags: ["Gaming", "Competition"],
            category: "Recreation",
            capacity: "200",
            cost: "$10",
            image: "../images/event5.png",
            imageAlt: "Teams at PCs with headsets and a scoreboard on a projector."
        }
    ];

    // Saved events first, then seeds
    var saved = getSavedEvents();
    var events = saved.length ? saved.concat(seedEvents) : seedEvents;

    function renderEventCard(e) {
        var start = e.startDate || "";
        var end = e.endDate || start;
        var dateText = start === end ? start : start + " to " + end;
        var tagsText = e.tags && e.tags.length ? e.tags.join(", ") : "None";

        var imgBlock = e.image
            ? '<img class="event-img" src="' + e.image + '" alt="' + (e.imageAlt || e.title) + '" style="width:120px;height:auto;border-radius:8px;">'
            : '<div class="event-img" aria-label="Event image description" style="width:120px;min-height:80px;border-radius:8px;background:#f3f6ff;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;">'
            + '<small>' + (e.imageAlt || "Event image") + '</small>'
            + '</div>';

        return (
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
            '</div>' +
            '</div>'
        );
    }

    list.innerHTML = events.map(renderEventCard).join("");
});
