

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('main-menu');
    const contactForm = document.getElementById('contact-form');

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
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // --- Hamburger Menu Logic ---
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

   
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const formData = new FormData(contactForm);
            const params = new URLSearchParams(formData);
            // Redirect to the thank you page with the data in the URL
            window.location.href = `thankyou.html?${params.toString()}`;
        });
    }

    // --- Continuous Testimonial Slider ---
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let testimonials = [];
        let currentIndex = 0;
        let slideInterval;

        const showTestimonial = (index) => {
            const currentActive = testimonialContainer.querySelector('.testimonial.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            setTimeout(() => {
                if (testimonials[index]) {
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
                }
            }, 100);
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
            clearInterval(slideInterval);
            slideInterval = setInterval(nextTestimonial, 5000);
        };

        fetch('data/testimonials.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for testimonials.json');
                }
                return response.json();
            })
            .then(data => {
                testimonials = data;
                if (testimonials.length > 0) {
                    showTestimonial(currentIndex);
                    startSlider();
                    const prevBtn = document.getElementById('prev-btn');
                    const nextBtn = document.getElementById('next-btn');
                    if (prevBtn && nextBtn) {
                        prevBtn.addEventListener('click', () => {
                            prevTestimonial();
                            startSlider();
                        });
                        nextBtn.addEventListener('click', () => {
                            nextTestimonial();
                            startSlider();
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