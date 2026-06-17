// Väntar på att sidan ska laddas helt
document.addEventListener("DOMContentLoaded", function() {
    
    // Hittar vår parallax-bakgrund
    const parallaxBg = document.querySelector('.parallax-bg');

    // Lyssnar på scroll-händelser
    window.addEventListener('scroll', function() {
        if (parallaxBg) {
            // Hämtar hur många pixlar vi scrollat neråt
            let scrollPosition = window.pageYOffset;
            
            // Flyttar bakgrunden med 40% av scroll-hastigheten (0.4)
            // Detta skapar det "djupa" djupet!
            parallaxBg.style.transform = 'translateY(' + (scrollPosition * 0.4) + 'px)';
        }
    });
});