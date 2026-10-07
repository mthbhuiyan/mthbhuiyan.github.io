document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    // ----- Theme -----
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = () => root.dataset.theme
        ? root.dataset.theme === 'dark'
        : systemDark.matches;

    const syncIcon = () => {
        themeIcon.className = isDark() ? 'fas fa-sun' : 'fas fa-moon';
    };

    themeToggle.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        syncIcon();
    });
    systemDark.addEventListener('change', syncIcon);
    syncIcon();

    // ----- Mobile menu -----
    menuToggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', open);
    });
    navLinks.forEach(link => link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }));

    // ----- BibTeX toggles -----
    document.querySelectorAll('.bib-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const bib = btn.closest('.pub-body').querySelector('.bibtex');
            const open = bib.hidden;
            bib.hidden = !open;
            btn.setAttribute('aria-expanded', open);
        });
    });

    // ----- Highlight current section in nav -----
    const sections = [...navLinks]
        .map(a => a.getAttribute('href'))
        .filter(h => h.startsWith('#'))
        .map(h => document.querySelector(h))
        .filter(Boolean);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(a => a.classList.toggle(
                'active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));

    // ----- Footer year -----
    document.getElementById('year').textContent = new Date().getFullYear();
});
