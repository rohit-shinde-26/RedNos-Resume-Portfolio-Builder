/* ========== TEMPLATES.JS - Template Selection Logic ========== */

let selectedTemplate = 'modern';

document.addEventListener('DOMContentLoaded', () => {
    initTemplateSelection();
    initTemplateSelector();
    initApplyTemplateBtn();
});

function initTemplateSelection() {
    const grid = document.getElementById('templatesGrid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.template-card');
        if (!card) return;

        // Update selection
        grid.querySelectorAll('.template-card').forEach(c => {
            c.classList.remove('active');
            c.querySelector('.template-badge').textContent = 'Select';
            c.querySelector('.template-badge').classList.remove('selected-badge');
        });

        card.classList.add('active');
        card.querySelector('.template-badge').textContent = 'Selected';
        card.querySelector('.template-badge').classList.add('selected-badge');

        selectedTemplate = card.getAttribute('data-template');

        // Update dropdown too
        const selector = document.getElementById('templateSelector');
        if (selector) selector.value = selectedTemplate;
    });
}

function initTemplateSelector() {
    const selector = document.getElementById('templateSelector');
    if (!selector) return;

    selector.addEventListener('change', () => {
        selectedTemplate = selector.value;
        const data = getFormData();
        if (data && data.fullName) {
            generateResume(data);
        }

        // Update template grid selection
        const grid = document.getElementById('templatesGrid');
        if (grid) {
            grid.querySelectorAll('.template-card').forEach(c => {
                const isActive = c.getAttribute('data-template') === selectedTemplate;
                c.classList.toggle('active', isActive);
                c.querySelector('.template-badge').textContent = isActive ? 'Selected' : 'Select';
                c.querySelector('.template-badge').classList.toggle('selected-badge', isActive);
            });
        }
    });
}

function initApplyTemplateBtn() {
    const btn = document.getElementById('applyTemplateBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const data = getFormData();
        if (data && data.fullName) {
            generateResume(data);
            showToast(`${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} template applied!`, 'success');
            navigateTo('resume');
        } else {
            showToast('Please fill out the builder form first', 'error');
            navigateTo('builder');
        }
    });
}

function getSelectedTemplate() {
    return selectedTemplate;
}
