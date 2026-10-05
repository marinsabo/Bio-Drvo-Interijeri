document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!carousel || !prevBtn || !nextBtn) return;

    // Scroll amount = width of a card + gap
    const getScrollAmount = () => {
        const card = carousel.querySelector('.testimonial-card');
        return card.offsetWidth + 30; // 30 is the gap defined in CSS
    };

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
});

/* Stats Counter Animation */
const statsSection = document.querySelector('.stats-section');
const statNumbers = document.querySelectorAll('.stat-number');
let started = false; // Function started ? No

function startCount(el) {
    const goal = parseInt(el.innerText.replace(/\D/g, '')); // Remove non-digits like + or %
    const suffix = el.innerText.replace(/[0-9]/g, ''); // Keep suffix like + or %
    let count = 0;
    // Calculate increment and interval to finish in 2 seconds (2000ms)
    // For smaller numbers (e.g. 30), increment is small, delay is bigger.
    // For large numbers (e.g. 1000), increment is bigger.
    const duration = 2000;
    const increment = Math.ceil(goal / (duration / 20)); // Updates every 20ms

    const counter = setInterval(() => {
        count += increment;
        if (count >= goal) {
            el.innerText = goal + suffix;
            clearInterval(counter);
        } else {
            el.innerText = count + suffix;
        }
    }, 20);
}

if (statsSection && statNumbers) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach((stat) => startCount(stat));
            started = true;
        }
    });
    observer.observe(statsSection);
}
