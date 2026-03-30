/* ========== APP.JS - Core SPA Navigation & Initialization ========== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initScrollAnimations();
    initCounterAnimation();
    initHamburgerMenu();
});

// ========== SPA NAVIGATION ==========
function initNavigation() {
    // Handle all navigation clicks
    document.addEventListener('click', (e) => {
        const navElement = e.target.closest('[data-page]');
        if (navElement) {
            e.preventDefault();
            const page = navElement.getAttribute('data-page');
            navigateTo(page);
        }
    });
}

function navigateTo(pageId) {
    // Update pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === pageId);
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (navLinks) navLinks.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');

    // Special handling for resume page
    if (pageId === 'resume') {
        const data = getFormData();
        if (data && data.fullName) {
            generateResume(data);
        }
    }

    // Special handling for portfolio page
    if (pageId === 'portfolio-preview') {
        const data = getFormData();
        if (data && data.fullName) {
            generatePortfolio(data);
        }
    }
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========== COUNTER ANIMATION ==========
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ========== HAMBURGER MENU ==========
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========== LOADING OVERLAY ==========
function showLoading(message) {
    const overlay = document.getElementById('loadingOverlay');
    if (message) {
        overlay.querySelector('p').textContent = message;
    }
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}

// ========== LOCAL STORAGE ==========
function saveFormData(data) {
    localStorage.setItem('resumeData', JSON.stringify(data));
}

function loadFormData() {
    const data = localStorage.getItem('resumeData');
    return data ? JSON.parse(data) : null;
}

// ========== UTILITY FUNCTIONS ==========
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}
