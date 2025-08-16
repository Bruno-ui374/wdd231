document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const slider = document.getElementById('hero-slider');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('main-menu');
    const productsContainer = document.getElementById('products');
    const strengthsContainer = document.getElementById('strengths-container');

    let items = document.querySelectorAll('.slider .list .item');
    let thumbnails = document.querySelectorAll('.thumbnail .item');
    let countItem = items.length;
    let itemActive = 0;
    let refreshInterval;
    let isSliderVisible = false;

    function refreshNodes() {
        items = document.querySelectorAll('.slider .list .item');
        thumbnails = document.querySelectorAll('.thumbnail .item');
        countItem = items.length;
    }

    window.addEventListener('load', () => {
        initSlides();
    });

    // ========== Sticky Header & Active Nav Link ==========
    function handleScroll() {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        menu.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    }
    setActiveNavLink();

    // ========== Slider Logic & SCROLL BUG FIX ==========
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isSliderVisible = entry.isIntersecting;
        });
    }, { threshold: 0.5 });

    if (slider) {
        sliderObserver.observe(slider);
    }

    if (next && prev) {
        next.addEventListener('click', () => {
            itemActive = (itemActive + 1) % countItem;
            showSlider();
        });
        prev.addEventListener('click', () => {
            itemActive = (itemActive - 1 + countItem) % countItem;
            showSlider();
        });
    }

    function startAutoRun() {
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            if (next && isSliderVisible) {
                next.click();
            }
        }, 5000);
    }
    startAutoRun();

    function showSlider() {
        document.querySelector('.slider .list .item.active')?.classList.remove('active');
        document.querySelector('.thumbnail .item.active')?.classList.remove('active');
        refreshNodes();
        if (items[itemActive]) items[itemActive].classList.add('active');
        if (thumbnails[itemActive]) thumbnails[itemActive].classList.add('active');
        setPositionThumbnail();
        startAutoRun();
    }

    function setPositionThumbnail() {
        const thumbnailActive = document.querySelector('.thumbnail .item.active');
        if (thumbnailActive) {
            thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    function attachThumbnailClicks() {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                itemActive = index;
                showSlider();
            });
        });
    }

    function initSlides() {
        refreshNodes();
        if (items.length > 0) {
            items[0].classList.add('active');
            thumbnails[0].classList.add('active');
            attachThumbnailClicks();
        }
    }

    // ========== Hamburger Menu Logic ==========
    if (hamburger && menu) {
        function closeMenu() {
            menu.classList.remove('show');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
        function openMenu() {
            menu.classList.add('show');
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        // Call closeMenu on page load to ensure it's hidden
        closeMenu();

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.contains('show') ? closeMenu() : openMenu();
        });

        document.addEventListener('click', (e) => {
            if (menu.classList.contains('show') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('show')) closeMenu();
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ========== Dynamic Content Loading ==========
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/[&<>"']/g, match => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[match]));
    }

    async function fetchProductsAndRender() {
        if (!productsContainer) return;
        try {
            const res = await fetch('data/products.json');
            if (!res.ok) throw new Error('Products JSON not found');
            const data = await res.json();
            productsContainer.innerHTML = '';
            data.forEach(prod => {
                const prodEl = document.createElement('div');
                prodEl.className = 'product';
                const badgeHtml = prod.badge ? `<div class="product-badge">${escapeHtml(prod.badge)}</div>` : '';
                prodEl.innerHTML = `
                    <img src="${escapeHtml(prod.image)}" alt="${escapeHtml(prod.title)}" loading="lazy" class="product-img">
                    ${badgeHtml}
                    <div class="product-overlay">
                        <h3 class="product-title">${escapeHtml(prod.title)}</h3>
                        <p class="product-price">${escapeHtml(prod.price)}</p>
                        <a href="${escapeHtml(prod.link || 'contact.html')}" class="btn">VIEW DETAILS</a>
                    </div>`;
                productsContainer.appendChild(prodEl);
            });
        } catch (err) {
            console.error('Failed to load products:', err);
            productsContainer.innerHTML = '<p>Products could not be loaded right now.</p>';
        }
    }

    async function fetchStrengthsAndRender() {
        if (!strengthsContainer) return;

        const icons = [
            
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>`,
            // Icon 2: Transparent Pricing
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0a9 9 0 011.125-1.125A9 9 0 0111.25 3h1.5a9 9 0 019 9v1.5m-8.25-6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM18.75 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`,
            // Icon 3: Legal Assistance
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.148 1.867 1.06 1.867 2.108v3.375c0 1.048-.83 1.96-1.867 2.108-1.104.156-2.235.237-3.383.237h-1.5c-1.148 0-2.278-.08-3.383-.237C7.63 20.64 6.75 19.72 6.75 18.672V15.3c0-1.048.83-1.96 1.867-2.108 1.104-.156 2.235-.237 3.383-.237h1.5zm0-3.75a3 3 0 100-6 3 3 0 000 6z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25l1.5-1.5 1.5 1.5M21 8.25l-1.5-1.5-1.5 1.5" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 21.75a9 9 0 005.25-16.5" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 21.75a9 9 0 01-5.25-16.5" /></svg>`,
            // Icon 4: Modern Properties
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V3.75m-18 0A2.25 2.25 0 014.5 1.5h15a2.25 2.25 0 012.25 2.25v17.25m-18 0h18" /><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5h.008v.008H6.75V7.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`,
            // Icon 5: Personalized Service
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 14.818l4.493 4.493-4.493-4.493zm0 0a6.375 6.375 0 11-9.016-9.016 6.375 6.375 0 019.016 9.016z" /><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6.75v.008h.008v-.008h-.008zm.008 3.742h.008v.008h-.008v-.008zm-.008 3.75h.008v.008h-.008v-.008z" /></svg>`
        ];

        try {
            const res = await fetch('data/features.json');
            if (!res.ok) throw new Error('Features JSON not found');
            const data = await res.json();
            strengthsContainer.innerHTML = '';
            data.forEach((feature, index) => {
                const cardEl = document.createElement('div');
                cardEl.className = 'strength-card';
                cardEl.innerHTML = `
                    <div class="icon">${icons[index] || ''}</div>
                    <h4>${escapeHtml(feature.title)}</h4>
                    <p>${escapeHtml(feature.description)}</p>
                `;
                strengthsContainer.appendChild(cardEl);
            });
        } catch (err) {
            console.error('Failed to load features:', err);
            strengthsContainer.innerHTML = '<p>Our strengths could not be loaded.</p>';
        }
    }

    fetchProductsAndRender();
    fetchStrengthsAndRender();

    
    const fadeEls = document.querySelectorAll('.fade-in');
    const fadeInObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => fadeInObserver.observe(el));

    document.getElementById('year').textContent = new Date().getFullYear();
});