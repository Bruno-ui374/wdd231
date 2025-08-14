document.getElementById("year").textContent = new Date().getFullYear();

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Fetch and Display Properties
async function loadProperties() {
    try {
        const response = await fetch("data/properties.json");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const properties = await response.json();

        const container = document.getElementById("properties-container");
        container.innerHTML = properties.map(prop => `
            <div class="property-card scroll-fade">
                <img src="${prop.image}" alt="${prop.title}" loading="lazy">
                <div class="property-info">
                    <h3>${prop.title}</h3>
                    <p>${prop.location}</p>
                    <p>${prop.size} sqft · ${prop.beds} Beds · ${prop.baths} Baths</p>
                    <strong>$${prop.price}</strong>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error(error);
    }
}
loadProperties();

// Scroll Fade Effect
const scrollElements = document.querySelectorAll(".scroll-fade");

window.addEventListener("scroll", () => {
    scrollElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    });
});
