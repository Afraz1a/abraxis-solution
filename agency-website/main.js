// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// 3. Initialize Lucide Icons
lucide.createIcons();

// 4. Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        // Smooth follow using GSAP
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    }
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .hover-trigger, input, textarea');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hovering'));
});

// 5. Scroll Progress Bar
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});

// 6. Sticky Navbar Shrink Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('py-4', 'bg-navy/90', 'backdrop-blur-lg', 'shadow-lg', 'shadow-blue-900/10');
            nav.classList.remove('py-6', 'bg-navy/0');
        } else {
            nav.classList.add('py-6', 'bg-navy/0');
            nav.classList.remove('py-4', 'bg-navy/90', 'backdrop-blur-lg', 'shadow-lg', 'shadow-blue-900/10');
        }
    }
});

// 7. Vanta.js Network Background Initialization (if element exists)
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const vantaEl = document.getElementById('vanta-bg');
        if (vantaEl && typeof VANTA !== 'undefined') {
            VANTA.NET({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x00BFFF,
                backgroundColor: 0x0A0F1C,
                points: 12.00,
                maxDistance: 22.00,
                spacing: 18.00,
                showDots: true
            });
        }
    }, 100);
});

// 8. GSAP Animations Setup
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal Timeline
const heroTl = gsap.timeline();
heroTl.from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.5 })
    .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

// Stats Counters Trigger
const counters = document.querySelectorAll('.stat-counter');
counters.forEach(counter => {
    ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        onEnter: () => {
            let target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                innerHTML: target,
                duration: 2.5,
                snap: { innerHTML: 1 },
                ease: "power2.out"
            });
        },
        once: true
    });
});

// Parallax elements subtle effect
gsap.utils.toArray('.parallax-elem').forEach(elem => {
    gsap.to(elem, {
        y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            end: "bottom top",
            invalidateOnRefresh: true,
            scrub: 0
        }
    });
});

// 9. Initialize Swiper for Testimonials
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
});

// 10. Services Hero Mouse Glow
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('services-hero');
    const mouseGlow = document.getElementById('hero-mouse-glow');

    if (heroSection && mouseGlow) {
        // Set initial state outside screen just in case
        gsap.set(mouseGlow, { x: -1000, y: -1000, autoAlpha: 0 });

        let entered = false;

        heroSection.addEventListener('mousemove', (e) => {
            if (!entered) {
                gsap.to(mouseGlow, { autoAlpha: 1, duration: 0.5 });
                entered = true;
            }

            const rect = heroSection.getBoundingClientRect();
            // Calculate relative position within the hero section
            // We subtract half the glow width/height (250) to center it on the cursor
            const x = e.clientX - rect.left - 250;
            const y = e.clientY - rect.top - 250;

            gsap.to(mouseGlow, {
                x: x,
                y: y,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            gsap.to(mouseGlow, { autoAlpha: 0, duration: 0.5 });
            entered = false;
        });
    }
});

// 11. Custom Smooth Navigation Scroll via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, {
                duration: 1.2,
                offset: -80 // offset for the fixed navbar
            });
        }
    });
});

// Handle cross-page hash loading smooth scroll
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                lenis.scrollTo(targetElement, {
                    duration: 1.2,
                    offset: -80
                });
            }, 100);
        }
    }
});
