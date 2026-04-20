/**
 * VERE Dual-Mode Website
 * Artist ⇄ Producer mode switching + all interactions
 */

/* ============================================================
 * MODE SYSTEM (the soul of the site)
 * Priority: URL ?mode= > localStorage > default 'artist'
 * ============================================================ */

const STORAGE_KEY = 'vere-mode';
const MODES = ['artist', 'producer'];

function getInitialMode() {
    const params = new URLSearchParams(location.search);
    const urlMode = params.get('mode');
    if (MODES.includes(urlMode)) return urlMode;

    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (MODES.includes(savedMode)) return savedMode;

    return 'artist';
}

function applyMode(mode, { skipTransition = false } = {}) {
    if (!MODES.includes(mode)) mode = 'artist';

    const body = document.body;

    if (!skipTransition) {
        body.classList.add('mode-transitioning');
        setTimeout(() => body.classList.remove('mode-transitioning'), 600);
    }

    body.dataset.mode = mode;
    localStorage.setItem(STORAGE_KEY, mode);

    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', mode === 'artist' ? '#FAF8F5' : '#141414');
    }

    const footerLabel = document.querySelector('.footer-mode-label');
    if (footerLabel) {
        footerLabel.textContent = mode === 'artist' ? 'ARTIST' : 'PRODUCER';
    }

    updateURLWithMode(mode);

    if (window.AOS) {
        setTimeout(() => window.AOS.refresh(), 100);
    }
}

function updateURLWithMode(mode) {
    if (!('URLSearchParams' in window)) return;
    const url = new URL(location.href);
    if (mode === 'artist') {
        url.searchParams.delete('mode');
    } else {
        url.searchParams.set('mode', mode);
    }
    history.replaceState(null, '', url.toString());
}

function toggleMode() {
    const current = document.body.dataset.mode || 'artist';
    const next = current === 'artist' ? 'producer' : 'artist';
    applyMode(next);
}

applyMode(getInitialMode(), { skipTransition: true });

/* ============================================================
 * Page Loading Animation
 * ============================================================ */
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 1000);
    }
});

/* ============================================================
 * AOS (Animate On Scroll) initialization
 * ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    if (window.AOS) {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: 'mobile',
            anchorPlacement: 'top-bottom'
        });
    }

    window.addEventListener('load', () => {
        if (window.AOS) AOS.refresh();
    });

    const toggleBtn = document.getElementById('modeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMode);
    }

    initFirstVisitTooltip();
    initSamplePlayers();
    initInquiryForm();
});

/* ============================================================
 * First-visit tooltip (3s after load, if first time)
 * ============================================================ */
function initFirstVisitTooltip() {
    const tooltip = document.getElementById('modeTooltip');
    if (!tooltip) return;

    const hasSeenTooltip = localStorage.getItem('vere-seen-tooltip');
    if (hasSeenTooltip) return;

    setTimeout(() => {
        tooltip.classList.add('visible');
        setTimeout(() => {
            tooltip.classList.remove('visible');
            localStorage.setItem('vere-seen-tooltip', 'yes');
        }, 5000);
    }, 3000);

    const toggleBtn = document.getElementById('modeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            tooltip.classList.remove('visible');
            localStorage.setItem('vere-seen-tooltip', 'yes');
        }, { once: true });
    }
}

/* ============================================================
 * Custom Cursor
 * ============================================================ */
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
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

    const interactiveSelector = 'a, button, .gallery-item, .profile-img, .mode-toggle, .track-play, .service-card, .checkbox-label, input, textarea';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            document.body.classList.add('cursor-hover');
            cursor.style.transform = 'scale(1.5)';
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            document.body.classList.remove('cursor-hover');
            cursor.style.transform = 'scale(1)';
        }
    });
}

/* ============================================================
 * Mouse Move Parallax (for [data-parallax] elements)
 * ============================================================ */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

initParallax();

/* ============================================================
 * Typewriter Effect for About Section
 * ============================================================ */
function typewriterEffect() {
    const element = document.querySelector('.about-text.typewriter');
    if (!element) return;

    const text = element.textContent.trim();
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

typewriterEffect();

/* ============================================================
 * Lightbox for Gallery
 * ============================================================ */
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

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ============================================================
 * Smooth Scroll for Navigation
 * ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================================================
 * Hero Parallax on Scroll
 * ============================================================ */
const hero = document.querySelector('.hero');
if (hero) {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                if (scrolled < window.innerHeight) {
                    const rate = scrolled * 0.5;
                    hero.style.backgroundPositionY = rate + 'px';

                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent) {
                        heroContent.style.opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
                        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ============================================================
 * Scroll Progress Bar
 * ============================================================ */
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

        const fill = document.querySelector('.scroll-progress-bar');
        if (fill) fill.style.width = scrolled + '%';
    });
}
createScrollProgress();

/* ============================================================
 * Floating Animation for Hero Social Links
 * ============================================================ */
function initFloatingAnimation() {
    const socialLinks = document.querySelectorAll('.hero-social-link');

    socialLinks.forEach((link, index) => {
        link.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });

    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
    `;
    document.head.appendChild(floatStyle);
}
initFloatingAnimation();

/* ============================================================
 * Image Lazy Loading
 * ============================================================ */
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window && lazyImages.length > 0) {
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
    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ============================================================
 * Sound Sample Players (Producer mode)
 * Only one track plays at a time; clicking another stops the previous.
 * ============================================================ */
function initSamplePlayers() {
    const tracks = document.querySelectorAll('.sample-track');
    if (tracks.length === 0) return;

    let currentPlaying = null;

    tracks.forEach(track => {
        const audio = track.querySelector('audio');
        const playBtn = track.querySelector('.track-play');
        const progressContainer = track.querySelector('.track-progress');
        const progressFill = track.querySelector('.track-progress-fill');
        const currentEl = track.querySelector('.track-current');
        const durationEl = track.querySelector('.track-duration');

        if (!audio || !playBtn) return;

        const audioSrc = audio.getAttribute('data-src');
        let isLoaded = false;

        function ensureLoaded() {
            if (isLoaded) return Promise.resolve();
            if (!audioSrc) return Promise.reject(new Error('No audio source'));
            audio.src = audioSrc;
            isLoaded = true;
            return new Promise((resolve, reject) => {
                audio.addEventListener('loadedmetadata', resolve, { once: true });
                audio.addEventListener('error', reject, { once: true });
            });
        }

        playBtn.addEventListener('click', async () => {
            if (currentPlaying && currentPlaying !== audio) {
                currentPlaying.pause();
                const prevTrack = currentPlaying.closest('.sample-track');
                if (prevTrack) prevTrack.classList.remove('playing');
            }

            if (audio.paused) {
                try {
                    await ensureLoaded();
                    await audio.play();
                    track.classList.add('playing');
                    currentPlaying = audio;
                } catch (err) {
                    track.classList.add('playing');
                    setTimeout(() => track.classList.remove('playing'), 800);
                    console.warn('[VERE] Sample audio not available yet:', audioSrc);
                }
            } else {
                audio.pause();
                track.classList.remove('playing');
                if (currentPlaying === audio) currentPlaying = null;
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (!isFinite(audio.duration) || audio.duration === 0) return;
            const pct = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = pct + '%';
            if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('loadedmetadata', () => {
            if (durationEl && isFinite(audio.duration)) {
                durationEl.textContent = formatTime(audio.duration);
            }
        });

        audio.addEventListener('ended', () => {
            track.classList.remove('playing');
            if (progressFill) progressFill.style.width = '0%';
            if (currentEl) currentEl.textContent = '0:00';
            if (currentPlaying === audio) currentPlaying = null;
        });

        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                if (!isLoaded || !isFinite(audio.duration)) return;
                const rect = progressContainer.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                audio.currentTime = pct * audio.duration;
            });
        }
    });
}

function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ============================================================
 * Inquiry Form (Producer mode) — mailto: fallback
 * ============================================================ */
function initInquiryForm() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const services = formData.getAll('service').join(', ') || '(未指定)';
        const budget = formData.get('budget') || '(未提供)';
        const message = formData.get('message') || '';

        const subject = `[VERE Work Inquiry] ${name}`;
        const body = [
            `Name / 姓名: ${name}`,
            `Email: ${email}`,
            `Service / 需求: ${services}`,
            `Budget / 預算: ${budget}`,
            '',
            'Message / 訊息:',
            message,
            '',
            '---',
            'Sent from vere.github.io inquiry form'
        ].join('\n');

        const mailtoUrl = `mailto:vere9809@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;

        setTimeout(() => {
            form.classList.add('submitted');
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `
                <h3>THANK YOU</h3>
                <p>你的 email client 應該已經開啟了。<br>若沒有，請直接寄到 <strong>vere9809@gmail.com</strong></p>
            `;
            form.appendChild(successMsg);
        }, 300);
    });
}

/* ============================================================
 * Console Easter Egg
 * ============================================================ */
console.log(`%c
╔═══════════════════════════════════════╗
║                                       ║
║   VERE — Artist × Producer            ║
║                                       ║
║   Try toggling: ?mode=producer        ║
║   or just click the switch in hero.   ║
║                                       ║
╚═══════════════════════════════════════╝
`, 'color: #FF6B35; font-family: monospace;');
