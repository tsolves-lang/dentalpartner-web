document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Parallax Bakgrund ---
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', function() {
        if (parallaxBg) {
            let scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = 'translateY(' + (scrollPosition * 0.4) + 'px)';
        }
    });

    // --- 2. Fade-in effekter ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => { appearOnScroll.observe(fader); });

    // --- 3. Hamburgermeny ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // --- 4. Kinetisk Reveal ---
    const kineticBox = document.querySelector('.kinetic-wrapper');
    if (kineticBox) {
        const kineticObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-open');
                else entry.target.classList.remove('is-open');
            });
        }, { threshold: 0.5 });
        kineticObserver.observe(kineticBox);
    }

    // --- 5. Dynamisk Ruttspårning ---
    const routeSection = document.querySelector('.dynamic-route-section');
    const pathActive = document.getElementById('route-path-active');
    const vanIcon = document.getElementById('van-icon');

    if (routeSection && pathActive && vanIcon) {
        const pathLength = pathActive.getTotalLength();
        pathActive.style.strokeDasharray = pathLength;
        pathActive.style.strokeDashoffset = pathLength;
        
        window.addEventListener('scroll', () => {
            const rect = routeSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                let progress = (windowHeight - rect.top) / (rect.height + windowHeight * 0.5);
                progress = Math.max(0, Math.min(1, progress));
                pathActive.style.strokeDashoffset = pathLength - (progress * pathLength);
                
                if (progress > 0.05 && progress < 0.95) {
                    vanIcon.classList.add('visible');
                    const point = pathActive.getPointAtLength(progress * pathLength);
                    const svgRect = document.querySelector('.route-svg').getBoundingClientRect();
                    vanIcon.style.left = (40 + point.x * (svgRect.width / 800)) + 'px';
                    vanIcon.style.top = (40 + point.y * (svgRect.height / 400)) + 'px';
                } else {
                    vanIcon.classList.remove('visible');
                }
            }
        });
    }

    // --- 6. Horisontell Scroll ---
    const horizontalTrack = document.getElementById('horizontal-track');
    const horizontalSection = document.getElementById('horizontal-section');
    if (horizontalTrack && horizontalSection) {
        window.addEventListener('scroll', () => {
            const rect = horizontalSection.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
                const trackWidth = horizontalTrack.scrollWidth - window.innerWidth + 50;
                horizontalTrack.style.transform = `translateX(-${progress * trackWidth}px)`;
            }
        });
    }
});