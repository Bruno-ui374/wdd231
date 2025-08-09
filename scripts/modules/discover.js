var actual = new Date();

function showCalendar(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var firstDayOfWeek = now.getDay(); // Sunday is 0
    var lastDayOfMonth = last.getDate();
    var day = 0;
    var result = "<tr>";
    var todayDay = 0;
    console.log(lastDayOfMonth);
    var last_cell = firstDayOfWeek + lastDayOfMonth;

    // Loop until 42 (6 rows of 7 days)
    for (var i = 1; i <= 42; i++) {
        if (i == firstDayOfWeek + 1) {
            // Determine the starting day
            day = 1;
        }
        if (i <= firstDayOfWeek || i >= last_cell) {
            // Empty cell
            result += "<td>&nbsp;</td>";
        } else {
            // Show the day
            if (
                day == actual.getDate() &&
                month == actual.getMonth() + 1 &&
                year == actual.getFullYear()
            )
                result += "<td class='today'>" + day + "</td>"; // Highlight today
            else
                result +=
                    "<td style='background-color: silver;'>" + day + "</td>";
            day++;
        }
        if (i % 7 == 0) {
            if (day > lastDayOfMonth) break;
            result += "</tr><tr>\n";
        }
    }
    result += "</tr>";

    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Calculate next month and year
    var nextMonth = month + 1;
    var nextYear = year;

    if (month + 1 > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }

    // Calculate previous month and year
    var prevMonth = month - 1;
    var prevYear = year;

    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    // Update caption and tbody
    document
        .getElementById("calendar")
        .getElementsByTagName("caption")[0].innerHTML =
        "<div>" +
        months[month - 1] +
        " / " +
        year +
        "</div>" +
        "<div><a href='javascript:void(0)' onclick='showCalendar(" +
        prevYear +
        "," +
        prevMonth +
        ")'>&lt;</a> " +
        "<a href='javascript:void(0)' onclick='showCalendar(" +
        nextYear +
        "," +
        nextMonth +
        ")'>&gt;</a></div>";

    document
        .getElementById("calendar")
        .getElementsByTagName("tbody")[0].innerHTML = result;
}

// Initialize with current month
showCalendar(actual.getFullYear(), actual.getMonth() + 1);

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const article = document.querySelector("#article-02");

    if (!article) {
        console.error("Article container not found in the DOM.");
        return;
    }

    const imageContainer = document.createElement("img");
    const descriptionContainer = document.createElement("h3");

    article.appendChild(imageContainer);
    article.appendChild(descriptionContainer);

    fetch("data/discover.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((events) => {
            if (!events || events.length === 0) {
                console.error("No events found in the JSON file.");
                return;
            }

            function updateImage() {
                const event = events[currentImageIndex];
                imageContainer.src = `images/${event.image}`;
                imageContainer.alt = event.description;
                imageContainer.loading = "lazy";
                descriptionContainer.textContent = event.description;

                currentImageIndex = (currentImageIndex + 1) % events.length;
            }

            updateImage();

            setInterval(() => {
                imageContainer.classList.remove("fade-in");
                void imageContainer.offsetWidth;
                imageContainer.classList.add("fade-in");
                updateImage();
            }, 10000);
        })
        .catch((error) => {
            console.error("Error fetching the JSON file:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});
