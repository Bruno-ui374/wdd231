// Select buttons for switching views
const myBtns = document.querySelectorAll(".button-box button");

window.onload = function () {
    buttonView(0); // Default to list view
};

function buttonView(n) {
    currentShowButton(n);
    const view = n === 0 ? "list" : "grid";
    toggleView(view);
    loadData(view);
}

function currentShowButton(n) {
    myBtns.forEach((btn) => btn.classList.remove("activebtn"));
    myBtns[n].classList.add("activebtn");
}

// Button click event listeners
myBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        buttonView(index);
    });
});

function toggleView(view) {
    const boxDirectory = document.getElementById("directory-box");

    if (view === "grid") {
        boxDirectory.classList.add("grid-view");
        boxDirectory.classList.remove("list-view");
    } else {
        boxDirectory.classList.add("list-view");
        boxDirectory.classList.remove("grid-view");
    }
}

async function loadData(view) {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const container = document.getElementById("directory-box");

        let cards = "";

        if (view === "list") {
            // TABLE VIEW
            cards = `
                <table>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Website</th>
                            <th>Office Phone</th>
                            <th>Membership</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

            data.forEach((company) => {
                cards += `
                        <tr>
                            <td><img class="logo" loading="lazy" src="images/members/${company.icon}" alt="${company.name} logo" width="100" height="100"></td>
                            <td>${company.name}</td>
                            <td>${company.description || "-"}</td>
                            <td>${company.address}</td>
                            <td><a href="${company.website}" target="_blank">${company.website}</a></td>
                            <td>${company.phone}</td>
                            <td>${company.membership}</td>
                        </tr>
                    `;
            });

            cards += `
                    </tbody>
                </table>
                `;
        } else {
            // GRID VIEW
            cards = "";
            data.forEach((company) => {
                cards += `
                        <div class="card-box">
                            <img class="logo" loading="lazy" src="images/members/${company.icon}" alt="${company.name} logo" width="200" height="200" >
                            <h3>${company.name}</h3>
                            <p><strong>Description:</strong> ${company.description || "-"}</p>
                            <p><strong>Address:</strong> ${company.address}</p>
                            <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                            <p><strong>Office Phone:</strong> ${company.phone}</p>
                            <p><strong>Membership:</strong> ${company.membership}</p>
                        </div>
                    `;
            });
        }

        container.innerHTML = cards;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadData("list");
});
