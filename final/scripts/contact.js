document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('main-menu');
    const contactForm = document.getElementById('contact-form');

    // --- Sticky Header ---
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // --- Active Nav Link ---
    if (menu) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        menu.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    // --- Hamburger Menu Logic ---
    if (hamburger && menu) {
        const closeMenu = () => {
            menu.classList.remove('show');
            hamburger.classList.remove('open');
        };
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
            hamburger.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('show') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // --- Form Submission to Thank You Page ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Get data from the form
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Store data in sessionStorage to pass to the next page
            sessionStorage.setItem('contactFormData', JSON.stringify(formData));

            // Redirect to the thank you page
            window.location.href = 'thankyou.html';
        });
    }

    // --- Continuous Testimonial Slider ---
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let testimonials = [];
        let currentIndex = 0;
        let slideInterval;

        const showTestimonial = (index) => {
            // Remove active class from current testimonial
            const currentActive = testimonialContainer.querySelector('.testimonial.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // Create and show the new testimonial after a short delay for fade-out
            setTimeout(() => {
                const testimonial = testimonials[index];
                testimonialContainer.innerHTML = `
                    <div class="testimonial active">
                        <p class="testimonial-quote">"${testimonial.quote}"</p>
                        <p class="testimonial-author">
                            ${testimonial.author}
                            <span>${testimonial.title}</span>
                        </p>
                    </div>
                `;
            }, 100); // Small delay to allow fade out
        };

        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        };

        const prevTestimonial = () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        };

        const startSlider = () => {
            clearInterval(slideInterval); // Clear any existing interval
            slideInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
        };

        // Fetch testimonials from JSON file
        fetch('data/testimonials.json')
            .then(response => response.json())
            .then(data => {
                testimonials = data;
                if (testimonials.length > 0) {
                    showTestimonial(currentIndex);
                    startSlider();

                    // Add event listeners for manual controls
                    const prevBtn = document.getElementById('prev-btn');
                    const nextBtn = document.getElementById('next-btn');

                    if (prevBtn && nextBtn) {
                        prevBtn.addEventListener('click', () => {
                            prevTestimonial();
                            startSlider(); // Reset interval on manual change
                        });
                        nextBtn.addEventListener('click', () => {
                            nextTestimonial();
                            startSlider(); // Reset interval on manual change
                        });
                    }
                }
            })
            .catch(error => console.error('Error fetching testimonials:', error));
    }

    // --- Footer Year & Fade-in ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    faders.forEach(fader => appearOnScroll.observe(fader));
});