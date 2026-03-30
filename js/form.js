/* ========== FORM.JS - Multi-step Form Logic ========== */

let currentStep = 1;
const totalSteps = 7;

document.addEventListener('DOMContentLoaded', () => {
    initFormNavigation();
    initAddEntryButtons();
    initProgressStepClicks();
    loadSavedFormData();
});

// ========== FORM NAVIGATION ==========
function initFormNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');

    if (prevBtn) prevBtn.addEventListener('click', goToPrevStep);
    if (nextBtn) nextBtn.addEventListener('click', goToNextStep);
    if (generateBtn) generateBtn.addEventListener('click', handleGenerate);
}

function goToNextStep() {
    if (currentStep < totalSteps) {
        setStep(currentStep + 1);
    }
}

function goToPrevStep() {
    if (currentStep > 1) {
        setStep(currentStep - 1);
    }
}

function setStep(step) {
    // Hide current step
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach(s => {
        s.classList.remove('active');
        const stepNum = parseInt(s.getAttribute('data-step'));
        if (stepNum < step) s.classList.add('completed');
        else s.classList.remove('completed');
    });

    // Show target step
    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) targetStep.classList.add('active');

    const targetProgress = document.querySelector(`.progress-step[data-step="${step}"]`);
    if (targetProgress) targetProgress.classList.add('active');

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${(step / totalSteps) * 100}%`;
    }

    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');

    if (prevBtn) prevBtn.disabled = step === 1;
    
    if (step === totalSteps) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (generateBtn) generateBtn.style.display = 'inline-flex';
    } else {
        if (nextBtn) nextBtn.style.display = 'inline-flex';
        if (generateBtn) generateBtn.style.display = 'none';
    }

    currentStep = step;
}

// ========== PROGRESS STEP CLICKS ==========
function initProgressStepClicks() {
    document.querySelectorAll('.progress-step').forEach(step => {
        step.addEventListener('click', () => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            setStep(stepNum);
        });
    });
}

// ========== ADD ENTRY BUTTONS ==========
function initAddEntryButtons() {
    document.querySelectorAll('.add-entry-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const type = btn.getAttribute('data-type');
            addEntry(targetId, type);
        });
    });
}

function addEntry(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const templates = {
        education: `
            <div class="form-grid">
                <div class="form-group">
                    <label>Degree / Qualification *</label>
                    <input type="text" name="edu-degree" placeholder="e.g., Bachelor of Science in Computer Science">
                </div>
                <div class="form-group">
                    <label>Institution *</label>
                    <input type="text" name="edu-institution" placeholder="e.g., MIT">
                </div>
                <div class="form-group">
                    <label>Start Year</label>
                    <input type="text" name="edu-start" placeholder="e.g., 2018">
                </div>
                <div class="form-group">
                    <label>End Year</label>
                    <input type="text" name="edu-end" placeholder="e.g., 2022 or Present">
                </div>
                <div class="form-group">
                    <label>GPA / Grade</label>
                    <input type="text" name="edu-gpa" placeholder="e.g., 3.8/4.0">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea name="edu-description" rows="3" placeholder="Relevant coursework, honors, activities..."></textarea>
                </div>
            </div>`,
        experience: `
            <div class="form-grid">
                <div class="form-group">
                    <label>Job Title *</label>
                    <input type="text" name="exp-title" placeholder="e.g., Senior Software Engineer">
                </div>
                <div class="form-group">
                    <label>Company *</label>
                    <input type="text" name="exp-company" placeholder="e.g., Google">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" name="exp-start" placeholder="e.g., Jan 2020">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="text" name="exp-end" placeholder="e.g., Present">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="exp-location" placeholder="e.g., Mountain View, CA">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea name="exp-description" rows="4" placeholder="Describe your responsibilities and achievements..."></textarea>
                </div>
            </div>`,
        project: `
            <div class="form-grid">
                <div class="form-group">
                    <label>Project Name *</label>
                    <input type="text" name="proj-name" placeholder="e.g., E-commerce Platform">
                </div>
                <div class="form-group">
                    <label>Tech Stack</label>
                    <input type="text" name="proj-tech" placeholder="e.g., React, Node.js, MongoDB">
                </div>
                <div class="form-group">
                    <label>Project URL</label>
                    <input type="url" name="proj-url" placeholder="e.g., github.com/john/project">
                </div>
                <div class="form-group">
                    <label>Live Demo URL</label>
                    <input type="url" name="proj-demo" placeholder="e.g., myproject.com">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea name="proj-description" rows="4" placeholder="Describe the project..."></textarea>
                </div>
            </div>`,
        cert: `
            <div class="form-grid">
                <div class="form-group">
                    <label>Certification Name *</label>
                    <input type="text" name="cert-name" placeholder="e.g., AWS Solutions Architect">
                </div>
                <div class="form-group">
                    <label>Issuing Organization</label>
                    <input type="text" name="cert-org" placeholder="e.g., Amazon Web Services">
                </div>
                <div class="form-group">
                    <label>Date Obtained</label>
                    <input type="text" name="cert-date" placeholder="e.g., March 2023">
                </div>
                <div class="form-group">
                    <label>Credential URL</label>
                    <input type="url" name="cert-url" placeholder="e.g., credential link">
                </div>
            </div>`,
        achievement: `
            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Achievement *</label>
                    <input type="text" name="ach-title" placeholder="e.g., Won 1st place in National Hackathon 2023">
                </div>
                <div class="form-group full-width">
                    <label>Description (optional)</label>
                    <textarea name="ach-description" rows="2" placeholder="Brief description of the achievement..."></textarea>
                </div>
            </div>`
    };

    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-card';
    entryDiv.setAttribute('data-entry', type);
    entryDiv.innerHTML = `
        <button class="remove-entry" onclick="removeEntry(this)" type="button">&times;</button>
        ${templates[type] || ''}
    `;

    container.appendChild(entryDiv);
    
    // Animate in
    entryDiv.style.opacity = '0';
    entryDiv.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => {
        entryDiv.style.transition = 'all 0.3s ease';
        entryDiv.style.opacity = '1';
        entryDiv.style.transform = 'translateY(0)';
    });
}

function removeEntry(btn) {
    const card = btn.closest('.entry-card');
    const container = card.parentElement;
    
    // Don't remove if it's the only entry
    if (container.querySelectorAll('.entry-card').length <= 1) {
        showToast('You need at least one entry', 'error');
        return;
    }

    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(-10px)';
    setTimeout(() => card.remove(), 300);
}

// ========== COLLECT FORM DATA ==========
function getFormData() {
    const data = {
        // Personal
        fullName: document.getElementById('fullName')?.value || '',
        jobTitle: document.getElementById('jobTitle')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        location: document.getElementById('location')?.value || '',
        linkedin: document.getElementById('linkedin')?.value || '',
        github: document.getElementById('github')?.value || '',
        website: document.getElementById('website')?.value || '',
        summary: document.getElementById('summary')?.value || '',

        // Skills
        technicalSkills: document.getElementById('technicalSkills')?.value || '',
        softSkills: document.getElementById('softSkills')?.value || '',
        languages: document.getElementById('languages')?.value || '',
        tools: document.getElementById('tools')?.value || '',

        // Dynamic entries
        education: collectEntries('educationEntries', 'education'),
        experience: collectEntries('experienceEntries', 'experience'),
        projects: collectEntries('projectEntries', 'project'),
        certifications: collectEntries('certEntries', 'cert'),
        achievements: collectEntries('achievementEntries', 'achievement')
    };

    return data;
}

function collectEntries(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return [];

    const entries = [];
    const cards = container.querySelectorAll('.entry-card');

    cards.forEach(card => {
        const entry = {};
        const inputs = card.querySelectorAll('input, textarea');
        let hasData = false;

        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                entry[name] = input.value;
                if (input.value.trim()) hasData = true;
            }
        });

        if (hasData) entries.push(entry);
    });

    return entries;
}

// ========== GENERATE HANDLER ==========
function handleGenerate() {
    const data = getFormData();

    if (!data.fullName.trim()) {
        showToast('Please enter your full name', 'error');
        setStep(1);
        return;
    }

    showLoading('Generating your resume & portfolio...');
    
    // Save data
    saveFormData(data);

    // Simulate AI processing
    setTimeout(() => {
        generateResume(data);
        hideLoading();
        showToast('Resume generated successfully!', 'success');
        navigateTo('resume');
    }, 1500);
}

// ========== SAVE / LOAD FORM DATA ==========
function loadSavedFormData() {
    const saved = loadFormData();
    if (!saved) return;

    // Populate personal fields
    const fields = ['fullName', 'jobTitle', 'email', 'phone', 'location', 'linkedin', 'github', 'website', 'summary', 'technicalSkills', 'softSkills', 'languages', 'tools'];
    fields.forEach(field => {
        const el = document.getElementById(field);
        if (el && saved[field]) {
            el.value = saved[field];
        }
    });
}
