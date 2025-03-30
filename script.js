document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
    } else {
        console.warn("AOS library not loaded");
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Create nav links for mobile
                const navLinksClone = document.querySelector('.nav-links').cloneNode(true);
                const navButtonsClone = document.querySelector('.nav-buttons').cloneNode(true);
                
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(navButtonsClone);
                
                // Insert after header
                const header = document.querySelector('header');
                header.parentNode.insertBefore(mobileMenu, header.nextSibling);
            }
            
            // Toggle mobile menu visibility
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                if (this.classList.contains('active')) {
                    mobileMenu.style.display = 'block';
                    setTimeout(() => {
                        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                        mobileMenu.style.opacity = '1';
                    }, 10);
                } else {
                    mobileMenu.style.maxHeight = '0';
                    mobileMenu.style.opacity = '0';
                    setTimeout(() => {
                        mobileMenu.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.style.display === 'block') {
                        document.querySelector('.mobile-menu-btn').click();
                    }
                }
            }
        });
    });

    // Articles Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const articleCards = document.querySelectorAll('.article-card');

    if (tabBtns.length > 0 && articleCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Filter articles
                const category = btn.dataset.category;
                
                articleCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.dataset.category === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Testimonial slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialsSlider && testimonialCards.length > 0) {
        let currentIndex = 0;
        const totalSlides = Math.ceil(testimonialCards.length / 3);
        
        // Initialize dots
        updateDots(0);
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            });
        }
        
        // Dot click
        if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
            });
        }
        
        function updateSlider() {
            const offset = currentIndex * -100;
            testimonialsSlider.style.transform = `translateX(${offset}%)`;
            updateDots(currentIndex);
        }
        
        function updateDots(index) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    // Chatbot input functionality
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatButton = document.querySelector('.action-buttons .btn-primary');
    
    if (chatbotInput && chatButton) {
        chatButton.addEventListener('click', function() {
            handleChatSubmit();
        });
        
        chatbotInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                handleChatSubmit();
            }
        });
        
        function handleChatSubmit() {
            const message = chatbotInput.value.trim();
            if (message) {
                alert('Your message has been submitted: ' + message);
                chatbotInput.value = '';
            } else {
                chatbotInput.placeholder = 'Please enter your message...';
                chatbotInput.focus();
            }
        }
    }
});
// Enhanced hero section animations
function initHeroEffects() {
    // Parallax effect for floating particles
    window.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.floating-particle');
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        particles.forEach(function(particle, index) {
            // Create different movement amounts for each particle
            const factor = (index + 1) * 0.2;
            particle.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });
    
    // Header transparency effect
    const header = document.querySelector('header');
    const heroTitle = document.querySelector('.hero-title');
    
    if (header && heroTitle) {
        const titlePosition = heroTitle.getBoundingClientRect().bottom;
        
        window.addEventListener('scroll', function() {
            // Make header more transparent at top, more solid as you scroll
            if (window.scrollY < 50) {
                header.classList.add('transparent-header');
            } else {
                header.classList.remove('transparent-header');
            }
            
            // Ensure header doesn't overlap with title
            if (window.scrollY > titlePosition - 100) {
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            }
        });
    }
    
    // Image reveal animation
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.9) translateY(30px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1.05) translateY(0)';
        }, 300);
    }
}

// Initialize effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (existing code)
    
    // Initialize hero effects
    initHeroEffects();
});
