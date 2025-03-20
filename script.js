// JavaScript for Vakalat Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuSetup = () => {
        const header = document.querySelector('header');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Insert before nav-links
            if (navLinks) {
                navLinks.parentNode.insertBefore(mobileBtn, navLinks);
                
                // Toggle mobile menu
                mobileBtn.addEventListener('click', function() {
                    navLinks.classList.toggle('active');
                    
                    // Change icon based on menu state
                    if (navLinks.classList.contains('active')) {
                        mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(event) {
                    const isClickInside = navLinks.contains(event.target) || 
                                         mobileBtn.contains(event.target);
                    
                    if (!isClickInside && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            }
        }
    };
    
    // Initialize mobile menu
    mobileMenuSetup();
    
    // Smooth scrolling for anchor links
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Don't scroll for # links
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Smooth scroll to element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    const mobileBtn = document.querySelector('.mobile-menu-btn');
                    
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (mobileBtn) {
                            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            });
        });
    };
    
    // Initialize smooth scrolling
    smoothScroll();
    
    // Form validation and handling
    const setupForms = () => {
        // Login form validation
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const inputs = this.querySelectorAll('input');
                
                // Check all required fields
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Add error message
                        const errorMessage = input.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                            const message = document.createElement('div');
                            message.className = 'error-message';
                            message.textContent = 'This field is required';
                            input.parentNode.insertBefore(message, input.nextElementSibling);
                        }
                    } else {
                        input.classList.remove('error');
                        
                        // Remove error message if exists
                        const errorMessage = input.nextElementSibling;
                        if (errorMessage && errorMessage.classList.contains('error-message')) {
                            errorMessage.remove();
                        }
                    }
                });
                
                if (isValid) {
                    // Form is valid - you would normally send to server
                    alert('Login successful!');
                    
                    // Reset form
                    this.reset();
                }
            });
            
            // Real-time validation
            loginForm.querySelectorAll('input').forEach(input => {
                input.addEventListener('blur', function() {
                    if (!this.value.trim()) {
                        this.classList.add('error');
                        
                        // Add error message if not exists
                        const errorMessage = this.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                            const message = document.createElement('div');
                            message.className = 'error-message';
                            message.textContent = 'This field is required';
                            this.parentNode.insertBefore(message, this.nextElementSibling);
                        }
                    } else {
                        this.classList.remove('error');
                        
                        // Remove error message if exists
                        const errorMessage = this.nextElementSibling;
                        if (errorMessage && errorMessage.classList.contains('error-message')) {
                            errorMessage.remove();
                        }
                    }
                });
            });
        }
    };
    
    // Initialize forms
    setupForms();
    
    // Chatbot input functionality
    const setupChatbot = () => {
        const chatbotInput = document.querySelector('.chatbot-input input');
        const chatNowBtn = document.querySelector('.action-buttons .btn-primary');
        
        if (chatbotInput && chatNowBtn) {
            // Submit on button click
            chatNowBtn.addEventListener('click', function() {
                handleChatSubmit();
            });
            
            // Submit on Enter key
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleChatSubmit();
                }
            });
            
            // Handle chat submission
            function handleChatSubmit() {
                const query = chatbotInput.value.trim();
                
                if (query) {
                    // Here you would connect to your chatbot backend
                    // For now, show a demo response
                    alert(`Your legal query has been submitted: "${query}"`);
                    
                    // Clear input after submission
                    chatbotInput.value = '';
                } else {
                    // Empty query validation
                    alert('Please enter your legal concern first.');
                    chatbotInput.focus();
                }
            }
        }
    };
    
    // Initialize chatbot
    setupChatbot();
    
    // Scroll animations for elements
    const setupScrollAnimations = () => {
        const animateElements = document.querySelectorAll(
            '.value-card, .service-card, .testimonial-card, .welcome-image, .lawyer-image'
        );
        
        // Initial check for elements in viewport
        checkElementsInView();
        
        // Check elements on scroll
        window.addEventListener('scroll', checkElementsInView);
        
        function checkElementsInView() {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top + scrollY;
                const elementHeight = element.offsetHeight;
                
                // Element is in viewport
                if (scrollY > elementPosition - windowHeight + elementHeight / 4) {
                    element.classList.add('animated');
                }
            });
        }
    };
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Image optimization
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" for better performance
            img.setAttribute('loading', 'lazy');
            
            // Add onerror handler for image fallbacks
            img.onerror = function() {
                console.error('Image failed to load:', this.src);
                // You could set a fallback image here if needed
            };
            
            // Ensure all images have alt text for accessibility
            if (!img.alt) {
                const imgPath = img.src.split('/').pop();
                img.alt = imgPath.split('.')[0] || 'Vakalat legal services';
            }
        });
    };
    
    // Initialize image optimization
    optimizeImages();
    
    // Responsive navigation highlighting
    const highlightCurrentSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Initial check on page load
        updateActiveLink();
        
        // Update on scroll
        window.addEventListener('scroll', updateActiveLink);
        
        function updateActiveLink() {
            const scrollPosition = window.scrollY + 200; // Offset for better UX
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && 
                    scrollPosition < sectionTop + sectionHeight) {
                    
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section link
                    const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }
    };
    
    // Initialize navigation highlighting if sections have IDs
    if (document.querySelector('section[id]')) {
        highlightCurrentSection();
    }
    
    // Ensure proper styling after images load
    window.addEventListener('load', function() {
        // Re-trigger scroll animations
        window.dispatchEvent(new Event('scroll'));
    });
});
