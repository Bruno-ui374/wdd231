// Wait for initial DOM load
document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav");

    // Large‑screen menu toggle (existing)
    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    // Footer dynamic text
    document.getElementById("currentyear").textContent =
        new Date().getFullYear();
    document.getElementById(
        "lastModified"
    ).textContent = `Last Modified: ${document.lastModified}`;

    // Initial courses array
    const courses = [
        {
            subject: "CSE",
            number: 110,
            title: "Introduction to Programming",
            credits: 2,
            certificate: "Web and Computer Programming",
            description:
                "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
            technology: ["Python"],
            completed: true,
        },
        {
            subject: "WDD",
            number: 130,
            title: "Web Fundamentals",
            credits: 2,
            certificate: "Web and Computer Programming",
            description:
                "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.",
            technology: ["HTML", "CSS"],
            completed: true,
        },
        {
            subject: "CSE",
            number: 111,
            title: "Programming with Functions",
            credits: 2,
            certificate: "Web and Computer Programming",
            description:
                "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.",
            technology: ["Python"],
            completed: true,
        },
        {
            subject: "CSE",
            number: 210,
            title: "Programming with Classes",
            credits: 2,
            certificate: "Web and Computer Programming",
            description:
                "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
            technology: ["C#"],
            completed: true,
        },
        {
            subject: "WDD",
            number: 131,
            title: "Dynamic Web Fundamentals",
            credits: 2,
            certificate: "Web and Computer Programming",
            description:
                "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
            technology: ["HTML", "CSS", "JavaScript"],
            completed: true,
        },
        {
            subject: "WDD",
            number: 231,
            title: "Frontend Web Development I",
            credits: 2,
            certificate: "Web and Computer Programming",
            description:
                "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
            technology: ["HTML", "CSS", "JavaScript"],
            completed: true,
        },
    ];

    // Output all courses into the dialog container and credit totals
    function output(courses) {
        const certificates = {
            "Web and Computer Programming": {
                container: document.querySelector(".boxcertificate01"),
                totalCreditsElement: document.getElementById("totalCreditsCert01"),
            },
        };

        // clear container
        certificates["Web and Computer Programming"].container.innerHTML = "";

        courses.forEach((course) => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add(
                "course",
                course.completed ? "courseComplete" : "courseNoComplete"
            );
            courseDiv.setAttribute("data-subject", course.subject);
            courseDiv.setAttribute("data-credits", course.credits);

            const courseTitle = document.createElement("h3");
            courseTitle.textContent = `${course.subject} ${course.number}`;
            courseDiv.appendChild(courseTitle);

            certificates[course.certificate].container.appendChild(courseDiv);

            courseDiv.addEventListener("click", () => {
                displayCourseDetails(course);
            });
        });

        // initialize filter to “all”
        document.querySelector('.boxButton button[value="all"]').click();
    }

    // Update credit count based on visible courses
    function updateCredits(filter) {
        let totalCredits = 0;
        document.querySelectorAll(".course").forEach((courseEl) => {
            const credits = parseInt(courseEl.getAttribute("data-credits"), 10);
            const subject = courseEl
                .getAttribute("data-subject")
                .toUpperCase();
            if (filter === "ALL" || filter === subject) {
                totalCredits += credits;
            }
        });
        document.getElementById(
            "totalCreditsCert01"
        ).innerHTML = `<strong>Total Credits:</strong> ${totalCredits}`;
    }

    // Filter buttons logic
    const boxButtons = document.querySelectorAll(".boxButton button");
    boxButtons.forEach((button) => {
        button.addEventListener("click", (evt) => {
            const filter = button.value.toUpperCase();
            boxButtons.forEach((b) => b.classList.remove("active"));
            evt.currentTarget.classList.add("active");

            document.querySelectorAll(".course").forEach((courseEl) => {
                const subject = courseEl
                    .getAttribute("data-subject")
                    .toUpperCase();
                courseEl.style.display =
                    filter === "ALL" || filter === subject ? "block" : "none";
            });

            updateCredits(filter);
        });
    });

    // Auto‑trigger “All” on load
    document.querySelector('.boxButton button[value="all"]').click();

    // Course details dialog
    const courseDetails = document.getElementById("courses-details");
    function displayCourseDetails(course) {
        courseDetails.innerHTML = `
      <button id="closeModal">X</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p>${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;
        courseDetails.showModal();
        document.getElementById("closeModal").addEventListener("click", () => {
            courseDetails.close();
        });
    }

    // Render all courses initially
    output(courses);
});

// ─────── Improved small‑screen menu toggle ───────
function toggleMobileMenu() {
    const menu = document.getElementById("navMenu");
    const hamButton = document.getElementById("menu");

    // toggle list visibility
    menu.classList.toggle("show");
    // toggle icon to X
    hamButton.classList.toggle("open");
}
