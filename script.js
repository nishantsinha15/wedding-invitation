// ============================================
// WEDDING INVITATION - Interactive Features
// Nishant & Sharmistha | May 2026
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. FLOATING DIYAS (Hero section)
    // ============================================
    const floatingContainer = document.getElementById('floatingElements');
    
    function createDiya() {
        const diya = document.createElement('div');
        diya.classList.add('diya');
        
        const size = Math.random() * 15 + 8; // 8-23px
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 10; // 10-18s
        const delay = Math.random() * 5;
        
        diya.style.width = size + 'px';
        diya.style.height = size + 'px';
        diya.style.left = left + '%';
        diya.style.animationDuration = duration + 's';
        diya.style.animationDelay = delay + 's';
        
        floatingContainer.appendChild(diya);
        
        setTimeout(() => {
            if (diya.parentNode) {
                diya.parentNode.removeChild(diya);
            }
            createDiya();
        }, (duration + delay) * 1000);
    }
    
    if (floatingContainer) {
        for (let i = 0; i < 15; i++) {
            createDiya();
        }
    }

    // ============================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // 3. COUNTDOWN TIMER
    // ============================================
    const weddingDate = new Date('May 7, 2026 19:00:00 GMT+0530').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance <= 0) {
            if (daysEl) daysEl.textContent = '🎉';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================================
    // 4. MUSIC TOGGLE
    // ============================================
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    if (musicToggle && bgMusic) {
        bgMusic.volume = 0.4;
        
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    isPlaying = true;
                }).catch(err => {
                    console.log('Audio play failed:', err);
                });
            }
        });
        
        bgMusic.addEventListener('ended', () => {
            musicToggle.classList.remove('playing');
            isPlaying = false;
        });
    }

    // ============================================
    // 5. SMOOTH SCROLL ENHANCEMENT
    // ============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let hasScrolled = false;
    
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            }
        }
    }, { passive: true });

    // ============================================
    // 6. PARALLAX-LIKE SUBTLE MOVEMENT ON HERO
    // ============================================
    const heroContent = document.querySelector('.hero-content');
    const heroCorners = document.querySelectorAll('.hero-corner');
    
    if (window.matchMedia('(hover: hover)').matches && heroContent) {
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            heroContent.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
            
            heroCorners.forEach((corner, i) => {
                const factor = (i + 1) * 3;
                const baseTransform = corner.className.includes('top-right') ? 'scaleX(-1)' :
                    corner.className.includes('bottom-left') ? 'scaleY(-1)' :
                    corner.className.includes('bottom-right') ? 'scale(-1)' : '';
                corner.style.transform = `${baseTransform} translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    }

    // ============================================
    // 7. MUSIC BUTTON PULSE
    // ============================================
    let pulseCount = 0;
    const pulseInterval = setInterval(() => {
        if (musicToggle && !isPlaying && pulseCount < 5) {
            musicToggle.style.transform = 'scale(1.15)';
            setTimeout(() => {
                musicToggle.style.transform = 'scale(1)';
            }, 300);
            pulseCount++;
        } else {
            clearInterval(pulseInterval);
        }
    }, 3000);

});