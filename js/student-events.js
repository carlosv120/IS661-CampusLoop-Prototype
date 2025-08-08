// js/student-events.js
document.addEventListener("DOMContentLoaded", function () {
    /* =========================
       Student Profile / Welcome
       ========================= */
    // You can hydrate this from your auth/user service later.
    const studentProfile = {
        name: "Evan Garvey",
        age: 27,
        year: "Graduate Student",
        major: "Software Engineering",
        minor: "Data Analytics",
        email: "evan.garvey@example.com",
        phone: "(973) 555-0199",
        languages: ["English (native)", "Spanish (fluent)"],
        residenceHall: "Maple Hall",
        hometown: "New York, New York",
        commuteMode: "On-campus",
        favoriteSpots: ["Main Quad", "Campus Library", "Rec Center"],
        interests: ["Tech events", "Free food", "Live music", "Career fairs"],
        hobbies: ["Guitar", "Soccer", "Photography"],
        clubs: ["ACM", "Photography Club", "Latinx Student Assoc."],
        dietary: "Vegetarian",
        availability: "Evenings & Weekends",
        lookingFor: ["Study groups", "Hackathons", "Volunteer gigs"],
        profileImage: "../images/profile.png"
    };

    function pillList(items) {
        if (!items || !items.length) return "";
        return (
            '<div style="display:flex;flex-wrap:wrap;gap:8px;">' +
            items
                .map(function (t) {
                    return (
                        '<span style="display:inline-block;padding:.3rem .6rem;border:1px solid #d0d7de;border-radius:999px;background:#fff;font-size:12.5px;line-height:1;color:#0b2e7a;">' +
                        t +
                        "</span>"
                    );
                })
                .join("") +
            "</div>"
        );
    }

    function infoRow(label, value) {
        if (!value) return "";
        return (
            '<div style="display:flex;gap:8px;"><strong style="min-width:140px;color:#334;">' +
            label +
            ":</strong><span>" +
            value +
            "</span></div>"
        );
    }

    function renderStudentProfile(s) {
        const el = document.getElementById("studentProfileCard");
        if (!el) return;

        el.innerHTML =
            '<div style="display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap;">' +
            // Left: photo
            '<div><img src="' +
            s.profileImage +
            '" alt="Student photo" style="width:120px;height:120px;border-radius:50%;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,.08);" /></div>' +

            // Right: details
            '<div style="flex:1;min-width:280px;">' +
            '<h3 style="margin:0 0 4px 0;color:#0047ab;">Welcome, ' +
            s.name +
            "!</h3>" +
            '<p style="margin:0 0 14px 0;color:#333;">Browse campus events, RSVP, and discover things you’ll love.</p>' +

            // Two-column details grid
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px 20px;">' +
            // Column A
            '<div>' +
            infoRow("Age", s.age) +
            infoRow("Year", s.year) +
            infoRow("Major", s.major) +
            infoRow("Minor", s.minor) +
            infoRow("Email", s.email) +
            infoRow("Phone", s.phone) +
            infoRow("Preferred Language", s.preferredLanguage) +
            infoRow("Languages", (s.languages || []).join(", ")) +
            "</div>" +
            // Column B
            '<div>' +
            infoRow("Residence", s.residenceHall) +
            infoRow("Hometown", s.hometown) +
            infoRow("Commute", s.commuteMode) +
            infoRow("Dietary", s.dietary) +
            infoRow("Availability", s.availability) +
            "</div>" +
            "</div>" +

            // Pill groups (favorites / interests / hobbies / clubs / goals)
            '<div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px 20px;">' +
            '<div><div style="font-weight:700;color:#0047ab;margin-bottom:6px;">Favorite Spots</div>' +
            pillList(s.favoriteSpots) +
            "</div>" +
            '<div><div style="font-weight:700;color:#0047ab;margin-bottom:6px;">Interests</div>' +
            pillList(s.interests) +
            "</div>" +
            '<div><div style="font-weight:700;color:#0047ab;margin-bottom:6px;">Hobbies</div>' +
            pillList(s.hobbies) +
            "</div>" +
            '<div><div style="font-weight:700;color:#0047ab;margin-bottom:6px;">Clubs</div>' +
            pillList(s.clubs) +
            "</div>" +
            '<div><div style="font-weight:700;color:#0047ab;margin-bottom:6px;">Looking For</div>' +
            pillList(s.lookingFor) +
            "</div>" +
            "</div>" +
            "</div>" + // end right
            "</div>";
    }

    renderStudentProfile(studentProfile);

    /* =========================
       Event card helpers
       ========================= */
    function cardHTML(e, imgFallbackAlt) {
        var start = e.startDate || "";
        var end = e.endDate || start;
        var dateText = start && (start === end ? start : start + " to " + end);
        var tagsText = e.tags && e.tags.length ? e.tags.join(", ") : "—";

        var imgBlock = e.image
            ? '<img class="event-img" src="' +
            e.image +
            '" alt="' +
            (e.imageAlt || e.title || imgFallbackAlt) +
            '" style="width:120px;height:auto;border-radius:8px;">'
            : '<div class="event-img" aria-label="Event image" style="width:120px;min-height:80px;border-radius:8px;background:#f3f6ff;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;"><small>' +
            (e.imageAlt || imgFallbackAlt) +
            "</small></div>";

        return (
            '<div class="card" style="display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;">' +
            imgBlock +
            '<div class="event-body" style="flex:1;">' +
            '<h4 style="margin:0 0 8px 0;color:#0047ab;">' +
            (e.title || "Event") +
            "</h4>" +
            (e.description ? '<p style="margin:0 0 12px 0;">' + e.description + "</p>" : "") +
            '<div class="event-fields" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;">' +
            (dateText ? "<div><strong>Date</strong> " + dateText + "</div>" : "") +
            (e.venue ? "<div><strong>Venue</strong> " + e.venue + "</div>" : "") +
            (e.visibility ? "<div><strong>Visibility</strong> " + e.visibility + "</div>" : "") +
            "<div><strong>Tags</strong> " +
            tagsText +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
    }

    function renderInto(id, events, imgAlt) {
        var mount = document.getElementById(id);
        if (!mount) return;
        mount.innerHTML = events.map(function (e) { return cardHTML(e, imgAlt); }).join("");
    }

    /* =========================
       Seed data for sections
       ========================= */
    // (No changes to your event data below—same as before)
    var upcoming = [
        { title: "Welcome Back Bash", startDate: "09/05/2025", venue: "Main Quad", visibility: "Public", description: "Kick off the semester with live music and giveaways.", tags: ["Music", "Giveaways", "Outdoor"], image: "../images/student1.png", imageAlt: "Students at a welcome event" },
        { title: "Library Late Night", startDate: "09/08/2025", venue: "Campus Library", visibility: "Public", description: "Snacks, study rooms, and de-stress activities.", tags: ["Study", "Snacks", "Quiet"], image: "../images/student2.png", imageAlt: "Library study night" },
        { title: "Rec Center Open House", startDate: "09/10/2025", venue: "Rec Center", visibility: "Public", description: "Tour facilities, try classes, and meet trainers.", tags: ["Fitness", "Tour"], image: "../images/student3.png", imageAlt: "Rec center tour" }
    ];

    var nearMe = [
        { title: "Coffee & Cram", startDate: "09/06/2025", venue: "Student Commons (0.2 mi)", visibility: "Public", description: "Free coffee and peer study circles near you.", tags: ["Coffee", "Study"], image: "../images/student4.png", imageAlt: "Coffee and study session" },
        { title: "Local Bites Pop-Up", startDate: "09/07/2025", venue: "Center Plaza (0.3 mi)", visibility: "Public", description: "Sample food from nearby favorites.", tags: ["Food", "Discounts"], image: "../images/student5.png", imageAlt: "Food pop-up" },
        { title: "Sunset Yoga", startDate: "09/07/2025", venue: "East Lawn (0.4 mi)", visibility: "Public", description: "Bring a mat. Beginners welcome.", tags: ["Wellness", "Outdoors"], image: "../images/student6.png", imageAlt: "Yoga at sunset" }
    ];

    var forYou = [
        { title: "Indie Film Night", startDate: "09/09/2025", venue: "Student Theater", visibility: "Public", description: "Curated films + post-screening discussion.", tags: ["Film", "Discussion"], image: "../images/student7.png", imageAlt: "Indie film" },
        { title: "Board Game Social", startDate: "09/11/2025", venue: "Union Lounge", visibility: "Public", description: "Meet new people, try new games.", tags: ["Social", "Games"], image: "../images/student8.png", imageAlt: "Board games" },
        { title: "Beginner Coding Jam", startDate: "09/12/2025", venue: "Tech Lab", visibility: "Public", description: "No experience required. Bring a laptop.", tags: ["Coding", "Workshop"], image: "../images/student9.png", imageAlt: "Coding jam" }
    ];

    var spanish = [
        { title: "Cine en Español", startDate: "09/06/2025", venue: "Teatro Estudiantil", visibility: "Público", description: "Proyección con subtítulos y charla después.", tags: ["Cine", "Español"], image: "../images/student10.png", imageAlt: "Cine en español" },
        { title: "Club de Conversación", startDate: "09/08/2025", venue: "Sala de Idiomas", visibility: "Público", description: "Práctica de conversación en español para todos los niveles.", tags: ["Idiomas", "Conversación"], image: "../images/student11.png", imageAlt: "Conversación en español" },
        { title: "Noche de Música Latina", startDate: "09/13/2025", venue: "Patio Central", visibility: "Público", description: "Baile, ritmos latinos y buen ambiente.", tags: ["Música", "Baile"], image: "../images/student12.png", imageAlt: "Música latina" }
    ];

    var trending = [
        { title: "Esports Watch Party", startDate: "09/09/2025", venue: "Media Hub", visibility: "Public", description: "Live finals stream + snacks.", tags: ["Esports", "Watch Party"], image: "../images/student13.png", imageAlt: "Esports viewing" },
        { title: "Open Mic Night", startDate: "09/12/2025", venue: "Union Stage", visibility: "Public", description: "Comedy, poetry, and live music.", tags: ["Mic", "Comedy", "Poetry"], image: "../images/student14.png", imageAlt: "Open mic" },
        { title: "Maker Lab Demo Day", startDate: "09/14/2025", venue: "Maker Lab", visibility: "Public", description: "3D prints, robotics, and projects on display.", tags: ["Tech", "Showcase"], image: "../images/student15.png", imageAlt: "Maker demo" }
    ];

    var freebies = [
        { title: "Club Fair Swag Run", startDate: "09/10/2025", venue: "Main Quad", visibility: "Public", description: "Stickers, shirts, and snacks.", tags: ["Freebies", "Clubs"], image: "../images/student16.png", imageAlt: "Swag tables" },
        { title: "Career Center Free Headshots", startDate: "09/11/2025", venue: "Career Center", visibility: "Public", description: "Professional photos for your LinkedIn.", tags: ["Career", "Free"], image: "../images/student17.png", imageAlt: "Headshots" },
        { title: "Study Jam Fuel-Up", startDate: "09/13/2025", venue: "Library", visibility: "Public", description: "Coffee and snacks for study sessions.", tags: ["Study", "Coffee", "Free"], image: "../images/student18.png", imageAlt: "Coffee station" }
    ];

    /* =========================
       Render sections
       ========================= */
    renderInto("studentUpcomingList", upcoming, "Upcoming event image");
    renderInto("studentNearMeList", nearMe, "Nearby event image");
    renderInto("studentForYouList", forYou, "Suggested event image");
    renderInto("studentSpanishList", spanish, "Eventos en español");
    renderInto("studentTrendingList", trending, "Trending event image");
    renderInto("studentFreebiesList", freebies, "Freebies event image");
});
