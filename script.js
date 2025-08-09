// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    const slideButtons = document.querySelectorAll('.slide-btn');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    function showSlide(index) {
        // Remove active class from all slides and buttons
        slides.forEach(slide => slide.classList.remove('active'));
        slideButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to current slide and button
        slides[index].classList.add('active');
        slideButtons[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }

    // Slideshow Navigation
    slideButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Update slide content dynamically
    const slideContents = [
        {
            title: 'فلزکاری و جوشکاری تخصصی',
            description: 'با سال‌ها تجربه در زمینه فلزکاری، بهترین کیفیت را ارائه می‌دهیم',
            buttonText: 'مشاوره رایگان',
            buttonLink: '#contact'
        },
        {
            title: 'سفت‌کاری حرفه‌ای',
            description: 'انجام کلیه کارهای سفت‌کاری و دیوارچینی با بالاترین استانداردها',
            buttonText: 'نمونه کارها',
            buttonLink: '#projects'
        },
        {
            title: 'پیمانکاری ساختمانی',
            description: 'مجری پروژه‌های ساختمانی از کوچک تا بزرگ با ضمانت کیفیت',
            buttonText: 'تماس فوری',
            buttonLink: 'tel:09173580068'
        }
    ];

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 100;
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounters();

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `سلام! 
نام: ${name}
تلفن: ${phone}
خدمات مورد نیاز: ${service}
پیام: ${message}`;
            
            const whatsappURL = `https://wa.me/989173580068?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message (optional)
            alert('پیام شما ارسال شد! به زودی با شما تماس خواهیم گرفت.');
        });
    }

    // Phone Number Formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('0')) {
                value = value.substring(1);
            }
            
            if (value.length > 0 && !value.startsWith('9')) {
                value = '9' + value;
            }
            
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            // Format as: 09XX XXX XXXX
            if (value.length >= 10) {
                value = '0' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
            } else if (value.length >= 6) {
                value = '0' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else if (value.length >= 3) {
                value = '0' + value.substring(0, 3) + ' ' + value.substring(3);
            } else if (value.length > 0) {
                value = '0' + value;
            }
            
            e.target.value = value;
        });
    });

    // Update phone link formatting
    const phoneLink = document.getElementById('phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('tel:09173580068', '_self');
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Service Worker Registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .stat-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Prevent body scroll when mobile menu is open
    const body = document.body;
    
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Reset body scroll when menu closes
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.style.overflow = 'auto';
        });
    });

    console.log('🎉 سایت ستونگر جنوب با موفقیت لود شد!');
});

// Error Handling for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, hide it or show placeholder
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    highlightActiveLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
