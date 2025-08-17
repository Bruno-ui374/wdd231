// scripts/thankyou.js
// This file contains all JavaScript for the thankyou.html page.

document.addEventListener('DOMContentLoaded', () => {
    // --- Code for Header and Menu (Copied from contact.js) ---
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('main-menu');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    if (menu) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        menu.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    if (hamburger && menu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
            hamburger.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (menu.classList.contains('show') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
                menu.classList.remove('show');
                hamburger.classList.remove('open');
            }
        });
    }

    // --- Code to Display Form Data ---
    const detailsContainer = document.getElementById('submission-details');
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('name') || urlParams.has('email')) {
        const name = urlParams.get('name');
        const email = urlParams.get('email');
        const phone = urlParams.get('phone');
        const location = urlParams.get('location');
        const message = urlParams.get('message');

        document.getElementById('submitted-date').textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById('submitted-name').textContent = name;
        document.getElementById('submitted-email').textContent = email;
        document.getElementById('submitted-phone').textContent = phone;
        document.getElementById('submitted-location').textContent = location;
        document.getElementById('submitted-message').textContent = message;

    } else if (detailsContainer) {
        detailsContainer.style.display = 'none';
    }
});