/**
 * Artist Website - Main JavaScript
 * 獨立音樂人行銷網頁互動效果
 */

// Page Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 1000);
    }
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: 'mobile',
        anchorPlacement: 'top-bottom'
    });
    
    // Refresh AOS when images load
    window.addEventListener('load', () => {
        AOS.refresh();
    });
});

/**
 * Custom Cursor Effect
 */
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .profile-img');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            cursor.style.transform = 'scale(1)';
        });
    });
}

/**
 * Mouse Move Parallax Effect
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

initParallax();

/**
 * Typewriter Effect for About Section
 */
function typewriterEffect() {
    const element = document.querySelector('.about-text');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let index = 0;
    const speed = 30;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => type(), 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(element);
}

// Enable typewriter effect
typewriterEffect();

/**
 * Lightbox for Gallery
 */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/**
 * Smooth Scroll for Navigation
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

/**
 * Parallax Effect for Hero Section
 */
const hero = document.querySelector('.hero');

if (hero) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                
                if (scrolled < window.innerHeight) {
                    hero.style.backgroundPositionY = rate + 'px';
                    
                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent) {
                        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
                        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/**
 * Smooth Scroll Progress Indicator
 */
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBarFill = document.querySelector('.scroll-progress-bar');
        if (progressBarFill) {
            progressBarFill.style.width = scrolled + '%';
        }
    });
}

createScrollProgress();

// Add CSS for progress bar
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(139, 115, 85, 0.1);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(to right, #8B7355, #C4B49A);
        width: 0%;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyle);

/**
 * Reveal Animation on Scroll (Additional to AOS)
 */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

/**
 * Platform Icon Bounce Animation
 */
const platformLinks = document.querySelectorAll('.platform-link');

platformLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const icon = link.querySelector('.platform-icon');
        if (icon) {
            icon.style.animation = 'iconBounce 0.4s ease';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        const icon = link.querySelector('.platform-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = '';
            }, 400);
        }
    });
});

// Add bounce keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes iconBounce {
        0%, 100% { transform: translateY(0) scale(1.1); }
        50% { transform: translateY(-8px) scale(1.1); }
    }
`;
document.head.appendChild(style);

/**
 * Text Reveal Animation on Scroll
 */
function initTextReveal() {
    const textElements = document.querySelectorAll('.about-text, .hero-subtitle');
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    textElements.forEach(el => observer.observe(el));
}

// Don't apply if typewriter is enabled
if (!document.querySelector('.about-text.typewriter')) {
    initTextReveal();
}

/**
 * Floating Animation for Hero Social Links
 */
function initFloatingAnimation() {
    const socialLinks = document.querySelectorAll('.hero-social-link');
    
    socialLinks.forEach((link, index) => {
        link.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
}

initFloatingAnimation();

/**
 * Image Lazy Loading with Fade Effect
 */
const images = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Console Easter Egg
 */
console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║   🎵 感謝你來到這裡                    ║
║   Welcome to my music world           ║
║                                       ║
╚═══════════════════════════════════════╝
`);
