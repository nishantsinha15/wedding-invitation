// ============================================
// WEDDING INVITATION — Complete Interactive System
// Nishant & Sharmistha | May 2026
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. ENTRANCE OVERLAY
    // ============================================
    const entranceOverlay = document.getElementById('entranceOverlay');
    const enterWithMusic = document.getElementById('enterWithMusic');
    const enterQuiet = document.getElementById('enterQuiet');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Lock body scroll
    document.body.classList.add('entrance-active');

    function openInvitation(withMusic) {
        // Hide overlay
        entranceOverlay.classList.add('hidden');
        document.body.classList.remove('entrance-active');

        // Show music toggle
        setTimeout(() => {
            musicToggle.classList.add('visible');
        }, 500);

        // Remove overlay from DOM after transition
        setTimeout(() => {
            entranceOverlay.style.display = 'none';
        }, 1000);

        // Start music if requested
        if (withMusic && bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                isPlaying = true;
            }).catch(err => {
                console.log('Audio play failed:', err);
            });
        }

        // Trigger blessings (first section) animations after overlay fades
        setTimeout(() => {
            animateBlessings();
        }, 600);
    }

    if (enterWithMusic) {
        enterWithMusic.addEventListener('click', () => openInvitation(true));
    }
    if (enterQuiet) {
        enterQuiet.addEventListener('click', () => openInvitation(false));
    }

    // ============================================
    // 2. MUSIC TOGGLE
    // ============================================
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
    // 3. BLESSINGS ANIMATIONS (triggered after entrance)
    // ============================================
    function animateBlessings() {
        const blessingsSection = document.querySelector('.blessings');
        if (!blessingsSection) return;

        // Animate elements inside blessings with staggered delays
        const blessingsElements = blessingsSection.querySelectorAll('[data-animate]');
        blessingsElements.forEach((el, i) => {
            const delay = i * 300;
            setTimeout(() => {
                triggerAnimation(el);
            }, delay);
        });
    }

    // ============================================
    // 4. CHARACTER-BY-CHARACTER ANIMATION SETUP
    // ============================================
    function setupCharAnimations() {
        const charElements = document.querySelectorAll('[data-animate="chars"]');
        charElements.forEach(el => {
            const text = el.textContent.trim();
            el.textContent = '';
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.classList.add('char');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${i * 50}ms`;
                el.appendChild(span);
            });
        });
    }

    setupCharAnimations();

    // ============================================
    // 5. SCROLL ANIMATION SYSTEM
    // ============================================
    function triggerAnimation(el) {
        // Apply custom delay from data-delay
        const delay = el.getAttribute('data-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }

        el.classList.add('animated');
    }

    // Observe all [data-animate] elements except those in blessings (blessings is manual)
    const animatedElements = document.querySelectorAll('[data-animate]');
    const blessingsSection = document.querySelector('.blessings');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Special handler for story-sequence
                if (el.getAttribute('data-animate') === 'story-sequence') {
                    animateStorySequence(el);
                } else {
                    triggerAnimation(el);
                }

                scrollObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach(el => {
        // Skip blessings elements — they animate on entrance
        if (blessingsSection && blessingsSection.contains(el)) return;
        scrollObserver.observe(el);
    });

    // ============================================
    // 6. STORY SEQUENCE ANIMATION
    // ============================================
    function animateStorySequence(container) {
        container.classList.add('animated');

        const states = container.querySelectorAll('.journey-state');
        const connectors = container.querySelectorAll('.journey-connector');

        const timeline = [];

        // Build timeline: state1 → connector1 → state2 → connector2 → state3
        states.forEach((state, i) => {
            timeline.push({ el: state, type: 'state' });
            if (connectors[i]) {
                timeline.push({ el: connectors[i], type: 'connector' });
            }
        });

        let delay = 0;
        timeline.forEach((item) => {
            setTimeout(() => {
                item.el.classList.add('visible');
            }, delay);
            delay += item.type === 'state' ? 500 : 300;
        });
    }

    // ============================================
    // 7. FLOATING DIYAS (Invitation section)
    // ============================================
    const floatingContainer = document.getElementById('floatingElements');

    function createDiya() {
        const diya = document.createElement('div');
        diya.classList.add('diya');

        const size = Math.random() * 12 + 6;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 12;
        const delay = Math.random() * 6;

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
        for (let i = 0; i < 12; i++) {
            createDiya();
        }
    }

    // ============================================
    // 8. COUNTDOWN TIMER
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
    // 9. PHOTO SLIDESHOW — Enhanced with swipe & cinematic transitions
    // ============================================
    const slideshowTrack = document.getElementById('slideshowTrack');
    const slideshowDots = document.getElementById('slideshowDots');
    const gallerySection = document.getElementById('gallery');

    if (slideshowTrack && slideshowDots) {
        const slides = slideshowTrack.querySelectorAll('.slide');
        let currentSlide = 0;
        let slideInterval;
        let slideshowStarted = false;
        const SLIDE_DURATION = 5000;

        function getDots() {
            return slideshowDots.querySelectorAll('.dot');
        }

        function goToSlide(index) {
            // Add exiting class to current slide for smooth out-transition
            const currentEl = slides[currentSlide];
            if (currentEl && currentSlide !== index) {
                currentEl.classList.add('exiting');
                currentEl.classList.remove('active');
                setTimeout(() => {
                    currentEl.classList.remove('exiting');
                }, 1200);
            }

            // Reset all dots — use reflow trick to restart CSS animation (no cloning)
            const allDots = getDots();
            allDots.forEach(d => {
                d.classList.remove('active');
            });

            // Activate new slide
            slides[index].classList.remove('exiting');
            slides[index].classList.add('active');

            // Force reflow before adding active to restart ::after animation
            void allDots[index].offsetWidth;
            allDots[index].classList.add('active');

            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }

        function startSlideshow() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, SLIDE_DURATION);
        }

        function stopSlideshow() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        // Dot click (use getDots() to always get live DOM references)
        getDots().forEach(dot => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                goToSlide(parseInt(dot.getAttribute('data-index')));
                startSlideshow();
            });
        });

        // ---- SWIPE GESTURE SUPPORT ----
        const slideshowFrame = slideshowTrack.closest('.slideshow-frame');
        if (slideshowFrame) {
            let touchStartX = 0;
            let touchStartY = 0;
            let touchEndX = 0;
            let isSwiping = false;

            slideshowFrame.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
                isSwiping = true;
            }, { passive: true });

            slideshowFrame.addEventListener('touchmove', (e) => {
                if (!isSwiping) return;
                touchEndX = e.changedTouches[0].screenX;
            }, { passive: true });

            slideshowFrame.addEventListener('touchend', (e) => {
                if (!isSwiping) return;
                isSwiping = false;
                touchEndX = e.changedTouches[0].screenX;
                const deltaX = touchEndX - touchStartX;
                const deltaY = Math.abs(e.changedTouches[0].screenY - touchStartY);

                // Only trigger if horizontal swipe is dominant and > 50px
                if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
                    stopSlideshow();
                    if (deltaX < 0) {
                        nextSlide(); // Swipe left → next
                    } else {
                        prevSlide(); // Swipe right → previous
                    }
                    startSlideshow();
                }
            }, { passive: true });

            // Mouse drag support (desktop)
            let mouseStartX = 0;
            let isDragging = false;

            slideshowFrame.addEventListener('mousedown', (e) => {
                mouseStartX = e.clientX;
                isDragging = true;
                e.preventDefault();
            });

            slideshowFrame.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                // Optional: could add visual drag feedback here
            });

            slideshowFrame.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                const deltaX = e.clientX - mouseStartX;

                if (Math.abs(deltaX) > 50) {
                    stopSlideshow();
                    if (deltaX < 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    startSlideshow();
                }
            });

            slideshowFrame.addEventListener('mouseleave', () => {
                isDragging = false;
            });
        }

        // Only start slideshow when gallery section is in view
        if (gallerySection) {
            const galleryObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!slideshowStarted) {
                            slideshowStarted = true;
                            startSlideshow();
                        }
                    } else {
                        stopSlideshow();
                        slideshowStarted = false;
                    }
                });
            }, { threshold: 0.2 });

            galleryObserver.observe(gallerySection);
        }
    }

    // ============================================
    // 10. RSVP FORM
    // ============================================
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');
    const rsvpSubmit = document.getElementById('rsvpSubmit');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const arrivalGroup = document.getElementById('arrivalGroup');

    // Show/hide conditional fields based on attending choice
    if (rsvpForm) {
        const attendingRadios = rsvpForm.querySelectorAll('input[name="attending"]');
        attendingRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const isAttending = radio.value === 'yes';
                if (guestCountGroup) {
                    guestCountGroup.style.display = isAttending ? 'block' : 'none';
                }
                if (arrivalGroup) {
                    arrivalGroup.style.display = isAttending ? 'block' : 'none';
                }
            });
        });

        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitText = rsvpSubmit.querySelector('.submit-text');
            const submitLoading = rsvpSubmit.querySelector('.submit-loading');

            // Show loading state
            rsvpSubmit.disabled = true;
            if (submitText) submitText.style.display = 'none';
            if (submitLoading) submitLoading.style.display = 'inline';

            // Collect form data
            const formData = {
                name: document.getElementById('guestName')?.value || '',
                attending: rsvpForm.querySelector('input[name="attending"]:checked')?.value || '',
                guests: document.getElementById('guestCount')?.value || '',
                arrival: document.getElementById('arrivalDate')?.value || '',
                message: document.getElementById('guestMessage')?.value || '',
                timestamp: new Date().toISOString()
            };

            // =============================================
            // GOOGLE SHEETS INTEGRATION
            // =============================================
            // To connect this to Google Sheets:
            //
            // 1. Create a new Google Sheet
            // 2. Go to Extensions → Apps Script
            // 3. Paste this code in the Apps Script editor:
            //
            //    function doPost(e) {
            //      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
            //      var data = JSON.parse(e.postData.contents);
            //      sheet.appendRow([
            //        data.timestamp,
            //        data.name,
            //        data.attending,
            //        data.guests,
            //        data.arrival,
            //        data.message
            //      ]);
            //      return ContentService
            //        .createTextOutput(JSON.stringify({status: 'success'}))
            //        .setMimeType(ContentService.MimeType.JSON);
            //    }
            //
            // 4. Deploy → New deployment → Web app
            //    - Execute as: Me
            //    - Who has access: Anyone
            // 5. Copy the deployment URL and replace the URL below
            // =============================================

            const GOOGLE_SCRIPT_URL = ''; // ← Paste your Google Apps Script URL here

            try {
                if (GOOGLE_SCRIPT_URL) {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                } else {
                    // No URL configured — just log to console
                    console.log('RSVP Data (configure Google Script URL to send):', formData);
                    // Simulate network delay
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                // Show success
                rsvpForm.style.display = 'none';
                if (rsvpSuccess) rsvpSuccess.style.display = 'block';

            } catch (error) {
                console.error('RSVP submission error:', error);
                // Still show success (no-cors won't return status)
                rsvpForm.style.display = 'none';
                if (rsvpSuccess) rsvpSuccess.style.display = 'block';
            }
        });
    }

    // ============================================
    // 11. SCROLL INDICATOR HIDE
    // ============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let hasScrolled = false;

    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.6s ease';
            }
        }
    }, { passive: true });

    // ============================================
    // 12. PARALLAX ON INVITATION (Desktop only)
    // ============================================
    const invitationContent = document.querySelector('.invitation-content');
    const invitationCorners = document.querySelectorAll('.invitation-corner');
    const invitationSection = document.querySelector('.invitation');

    if (window.matchMedia('(hover: hover)').matches && invitationContent && invitationSection) {
        invitationSection.addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            invitationContent.style.transform = `translate(${x * 6}px, ${y * 4}px)`;

            invitationCorners.forEach((corner, i) => {
                const factor = (i + 1) * 2.5;
                const base = corner.className.includes('top-right') ? 'scaleX(-1)' :
                    corner.className.includes('bottom-left') ? 'scaleY(-1)' :
                    corner.className.includes('bottom-right') ? 'scale(-1)' : '';
                corner.style.transform = `${base} translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    }

});
