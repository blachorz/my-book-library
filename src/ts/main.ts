// Main entry point for TypeScript
console.log("My Book Library");

document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality for book pages
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const header = card.querySelector('.card-header');
        if (header) {
            header.addEventListener('click', () => {
                card.classList.toggle('open');
            });
        }
    });

    // Tab functionality for book pages
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            tabLinks.forEach(item => {
                item.classList.remove('text-primary', 'border-primary');
                item.classList.add('text-secondary-text', 'border-transparent');
            });
            link.classList.add('text-primary', 'border-primary');
            link.classList.remove('text-secondary-text', 'border-transparent');

            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

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
