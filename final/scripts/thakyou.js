document.addEventListener('DOMContentLoaded', () => {
    // --- Display Submitted Data from URL (RELIABLE METHOD) ---
    const detailsContainer = document.getElementById('submission-details');

    // Get the search parameters from the current URL
    const urlParams = new URLSearchParams(window.location.search);

    // Convert parameters to a usable object
    const formData = Object.fromEntries(urlParams.entries());

    if (formData.name && detailsContainer) {
        // If data exists in the URL, populate the elements
        document.getElementById('submitted-date').textContent = formData.date;
        document.getElementById('submitted-name').textContent = formData.name;
        document.getElementById('submitted-email').textContent = formData.email;
        document.getElementById('submitted-phone').textContent = formData.phone;
        document.getElementById('submitted-location').textContent = formData.location;
        document.getElementById('submitted-message').textContent = formData.message;
    } else if (detailsContainer) {
        // If no data is found, hide the details section
        detailsContainer.style.display = 'none';
    }

    // [Basic Hamburger Menu and Footer Year logic remains the same]
    // ...
});