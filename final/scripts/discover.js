document.addEventListener('DOMContentLoaded', () => {
    // --- SHARED LOGIC (HEADER, FOOTER, ETC.) ---
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('main-menu');
    const yearSpan = document.getElementById('year');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    if (menu) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        menu.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    if (hamburger && menu) {
        const closeMenu = () => {
            menu.classList.remove('show');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        };
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.toggle('show');
            hamburger.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('show') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- DISCOVER PAGE CAROUSEL LOGIC ---
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let nextButton = document.getElementById('next');
        let prevButton = document.getElementById('prev');
        let listHTML = document.querySelector('.carousel .list');
        let seeMoreButtons = document.querySelectorAll('.seeMore');
        let backButton = document.getElementById('back');

        nextButton.onclick = function () {
            showSlider('next');
        }
        prevButton.onclick = function () {
            showSlider('prev');
        }

        let unAcceptClick;
        const showSlider = (type) => {
            nextButton.style.pointerEvents = 'none';
            prevButton.style.pointerEvents = 'none';

            carousel.classList.remove('next', 'prev');
            let items = document.querySelectorAll('.carousel .list .item');
            if (type === 'next') {
                listHTML.appendChild(items[0]);
                carousel.classList.add('next');
            } else {
                listHTML.prepend(items[items.length - 1]);
                carousel.classList.add('prev');
            }
            clearTimeout(unAcceptClick);
            unAcceptClick = setTimeout(() => {
                nextButton.style.pointerEvents = 'auto';
                prevButton.style.pointerEvents = 'auto';
            }, 1500);
        }

        seeMoreButtons.forEach((button) => {
            button.onclick = function () {
                carousel.classList.remove('next', 'prev');
                carousel.classList.add('showDetail');
            }
        });

        backButton.onclick = function () {
            carousel.classList.remove('showDetail');
        }
    }
});