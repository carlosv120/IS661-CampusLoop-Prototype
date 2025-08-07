document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("creatorPastEventsList");
    if (!list) return;

    var pastEvents = [
        {
            title: "Open Mic Night",
            startDate: "04/15/2025",
            endDate: "04/15/2025",
            venue: "Student Union Stage",
            visibility: "Public",
            description: "An evening of performances from local students.",
            tags: ["Music", "Comedy", "Poetry"],
            category: "Arts and Culture",
            capacity: "100",
            cost: "$3",
            image: "../images/pastevent1.png",
            imageAlt: "Small stage with microphone and audience."
        },
        {
            title: "Campus Food Fair",
            startDate: "03/22/2025",
            endDate: "03/22/2025",
            venue: "Main Quad",
            visibility: "Public",
            description: "A showcase of food vendors with special student discounts.",
            tags: ["Food", "Discounts"],
            category: "Local Business",
            capacity: "400",
            cost: "$5",
            image: "../images/pastevent2.png",
            imageAlt: "Food stalls and students enjoying snacks."
        },
        {
            title: "Charity Fun Run",
            startDate: "02/10/2025",
            endDate: "02/10/2025",
            venue: "Rec Center Track",
            visibility: "Public",
            description: "A community 5K run to raise funds for local charities.",
            tags: ["Sports", "Charity"],
            category: "Recreation",
            capacity: "150",
            cost: "$10",
            image: "../images/pastevent3.png",
            imageAlt: "Runners crossing the finish line."
        }
    ];

    function renderEventCard(e) {
        var dateText = e.startDate === e.endDate ? e.startDate : e.startDate + " to " + e.endDate;
        var tagsText = e.tags && e.tags.length ? e.tags.join(", ") : "None";

        var imgBlock = e.image
            ? '<img class="event-img" src="' + e.image + '" alt="' + (e.imageAlt || e.title) + '" style="width:120px;height:auto;border-radius:8px;">'
            : '<div class="event-img" aria-label="Event image description" style="width:120px;min-height:80px;border-radius:8px;background:#f3f6ff;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;">'
            + '<small>' + (e.imageAlt || "No image available") + '</small>'
            + '</div>';

        return (
            '<div class="card" style="display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;">' +
            imgBlock +
            '<div class="event-body" style="flex:1;">' +
            '<h4 style="margin:0 0 8px 0;color:#0047ab;">' + e.title + '</h4>' +
            '<p style="margin:0 0 12px 0;">' + e.description + '</p>' +
            '<div class="event-fields" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;">' +
            '<div><strong>Date</strong> ' + dateText + '</div>' +
            '<div><strong>Venue</strong> ' + e.venue + '</div>' +
            '<div><strong>Visibility</strong> ' + e.visibility + '</div>' +
            '<div><strong>Tags</strong> ' + tagsText + '</div>' +
            '<div><strong>Category</strong> ' + e.category + '</div>' +
            '<div><strong>Capacity or Attendance</strong> ' + e.capacity + '</div>' +
            '<div><strong>Cost</strong> ' + e.cost + '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    list.innerHTML = pastEvents.map(renderEventCard).join("");
});
