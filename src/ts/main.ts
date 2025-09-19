import 'flowbite';

// Main entry point for TypeScript
console.log("My Book Library");

document.addEventListener('DOMContentLoaded', () => {
    // Fade-in on scroll functionality
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(el => observer.observe(el));
});
