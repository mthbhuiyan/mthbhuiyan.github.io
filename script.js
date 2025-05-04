document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    const menuToggle = document.querySelector('.menu-toggle'); // Select the menu toggle button
    const navLinks = document.querySelector('.nav-links'); // Select the container for links

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
             icon.classList.remove('fa-sun');
             icon.classList.add('fa-moon');
        }
    } else {
        // Default to light mode if no preference is saved
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update icon based on current mode
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark-mode'); // Save preference
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light-mode'); // Save preference
        }
    });

    // Mobile menu toggle functionality
    menuToggle.addEventListener('click', () => {
        body.classList.toggle('menu-open'); // Toggle class on body to show/hide menu
    });

    // Close menu when a link is clicked (optional, but good for user experience)
    // This ensures the menu closes after navigating to a section
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('menu-open');
        });
    });
});
