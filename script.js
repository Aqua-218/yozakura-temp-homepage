// Sakura Petals Animation
document.addEventListener('DOMContentLoaded', () => {
    createSakuraPetals();
    initSmoothScroll();
    initScrollAnimations();
    initNavHighlight();
});

// Create floating sakura petals with enhanced Japanese aesthetic
function createSakuraPetals() {
    const container = document.querySelector('.sakura-petals');
    if (!container) return;

    const petalCount = 40; // Increased petal count
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 12 + 6;
        const duration = Math.random() * 15 + 20;
        const delay = Math.random() * 8;
        
        petal.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(246, 216, 216, 0.6));
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: ${-20 + Math.random() * 20}%;
            animation: float ${duration}s ease-in-out infinite, spin ${duration * 0.3}s linear infinite;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.4 + 0.3};
            transform: rotate(${Math.random() * 360}deg);
            box-shadow: 0 0 10px rgba(246, 216, 216, 0.3);
            filter: blur(${Math.random() * 0.5}px);
        `;
        container.appendChild(petal);
    }
    
    // Add light particles for tech feel
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(205, 213, 255, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            box-shadow: 0 0 10px rgba(205, 213, 255, 0.8);
        `;
        container.appendChild(particle);
    }

    // Enhanced keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.4;
            }
            100% {
                transform: translateY(120vh) translateX(${Math.random() * 200 - 100}px) rotate(720deg);
                opacity: 0;
            }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes twinkle {
            0%, 100% { 
                opacity: 0.3; 
                transform: scale(1);
            }
            50% { 
                opacity: 1; 
                transform: scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // Observe cards for staggered animation
    document.querySelectorAll('.domain-card, .project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Highlight active navigation item on scroll
function initNavHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--color-sakura)';
            }
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Enhanced mousemove effect with Japanese wind aesthetic
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX / window.innerWidth;
    targetY = e.clientY / window.innerHeight;
});

function animatePetals() {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;
    
    const petals = document.querySelectorAll('.petal');
    const particles = document.querySelectorAll('.light-particle');
    
    petals.forEach((petal, index) => {
        const speed = (index % 5 + 1) * 0.03;
        const offsetX = (mouseX - 0.5) * 80 * speed;
        const offsetY = (mouseY - 0.5) * 80 * speed;
        const rotation = (mouseX - 0.5) * 20;
        
        petal.style.transition = 'transform 0.3s ease-out';
    });
    
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.1;
        const offsetX = (mouseX - 0.5) * 30 * speed;
        const offsetY = (mouseY - 0.5) * 30 * speed;
        
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    
    requestAnimationFrame(animatePetals);
}

animatePetals();

// Add fade effect to navigation on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    
    lastScroll = currentScroll;
});
