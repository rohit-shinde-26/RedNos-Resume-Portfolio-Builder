/* ========== RESUME.JS - Resume Generation with Multiple Templates ========== */

function generateResume(data) {
    const paper = document.getElementById('resumePaper');
    if (!paper) return;

    const template = getSelectedTemplate();

    switch (template) {
        case 'modern':
            paper.innerHTML = generateModernTemplate(data);
            break;
        case 'classic':
            paper.innerHTML = generateClassicTemplate(data);
            break;
        case 'minimal':
            paper.innerHTML = generateMinimalTemplate(data);
            break;
        case 'creative':
            paper.innerHTML = generateCreativeTemplate(data);
            break;
        default:
            paper.innerHTML = generateModernTemplate(data);
    }
}

// ========== HELPER: Parse skills from comma-separated ========== 
function parseSkills(text) {
    if (!text) return [];
    return text.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

// ========== HELPER: Format description to bullet list ==========
function formatDescription(text) {
    if (!text) return '';
    const lines = text.split(/[.\n]/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) return `<p>${escapeHtml(text)}</p>`;
    return '<ul>' + lines.map(l => `<li>${escapeHtml(l)}</li>`).join('') + '</ul>';
}

// ========== MODERN TEMPLATE ==========
function generateModernTemplate(data) {
    const techSkills = parseSkills(data.technicalSkills);
    const softSkills = parseSkills(data.softSkills);

    let sidebarHTML = `
        <div class="rm-name">${escapeHtml(data.fullName)}</div>
        <div class="rm-role">${escapeHtml(data.jobTitle)}</div>
        
        <div class="rm-sidebar-section">
            <div class="rm-sidebar-title">Contact</div>
            ${data.email ? `<div class="rm-contact-item">📧 ${escapeHtml(data.email)}</div>` : ''}
            ${data.phone ? `<div class="rm-contact-item">📱 ${escapeHtml(data.phone)}</div>` : ''}
            ${data.location ? `<div class="rm-contact-item">📍 ${escapeHtml(data.location)}</div>` : ''}
            ${data.linkedin ? `<div class="rm-contact-item">🔗 ${escapeHtml(data.linkedin)}</div>` : ''}
            ${data.github ? `<div class="rm-contact-item">💻 ${escapeHtml(data.github)}</div>` : ''}
            ${data.website ? `<div class="rm-contact-item">🌐 ${escapeHtml(data.website)}</div>` : ''}
        </div>

        ${techSkills.length ? `
        <div class="rm-sidebar-section">
            <div class="rm-sidebar-title">Technical Skills</div>
            <div class="rm-skill-tags">
                ${techSkills.map(s => `<span class="rm-skill-tag">${escapeHtml(s)}</span>`).join('')}
            </div>
        </div>` : ''}

        ${softSkills.length ? `
        <div class="rm-sidebar-section">
            <div class="rm-sidebar-title">Soft Skills</div>
            <div class="rm-skill-tags">
                ${softSkills.map(s => `<span class="rm-skill-tag">${escapeHtml(s)}</span>`).join('')}
            </div>
        </div>` : ''}

        ${data.languages ? `
        <div class="rm-sidebar-section">
            <div class="rm-sidebar-title">Languages</div>
            <div style="font-size: 0.72rem; color: rgba(255,255,255,0.8);">${escapeHtml(data.languages)}</div>
        </div>` : ''}

        ${data.certifications && data.certifications.length ? `
        <div class="rm-sidebar-section">
            <div class="rm-sidebar-title">Certifications</div>
            ${data.certifications.map(c => `
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.9);">${escapeHtml(c['cert-name'])}</div>
                    ${c['cert-org'] ? `<div style="font-size: 0.65rem; color: rgba(255,255,255,0.6);">${escapeHtml(c['cert-org'])}</div>` : ''}
                    ${c['cert-date'] ? `<div style="font-size: 0.65rem; color: rgba(255,255,255,0.5);">${escapeHtml(c['cert-date'])}</div>` : ''}
                </div>
            `).join('')}
        </div>` : ''}
    `;

    let mainHTML = '';

    // Summary
    if (data.summary) {
        mainHTML += `
            <div class="rm-section">
                <div class="rm-section-title">Professional Summary</div>
                <div class="rm-summary">${escapeHtml(data.summary)}</div>
            </div>`;
    }

    // Experience
    if (data.experience && data.experience.length) {
        mainHTML += `
            <div class="rm-section">
                <div class="rm-section-title">Work Experience</div>
                ${data.experience.map(exp => `
                    <div class="rm-entry">
                        <div class="rm-entry-header">
                            <span class="rm-entry-title">${escapeHtml(exp['exp-title'])}</span>
                            <span class="rm-entry-date">${escapeHtml(exp['exp-start'])} — ${escapeHtml(exp['exp-end'])}</span>
                        </div>
                        <div class="rm-entry-subtitle">${escapeHtml(exp['exp-company'])}${exp['exp-location'] ? ` · ${escapeHtml(exp['exp-location'])}` : ''}</div>
                        <div class="rm-entry-desc">${formatDescription(exp['exp-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Education
    if (data.education && data.education.length) {
        mainHTML += `
            <div class="rm-section">
                <div class="rm-section-title">Education</div>
                ${data.education.map(edu => `
                    <div class="rm-entry">
                        <div class="rm-entry-header">
                            <span class="rm-entry-title">${escapeHtml(edu['edu-degree'])}</span>
                            <span class="rm-entry-date">${escapeHtml(edu['edu-start'])} — ${escapeHtml(edu['edu-end'])}</span>
                        </div>
                        <div class="rm-entry-subtitle">${escapeHtml(edu['edu-institution'])}${edu['edu-gpa'] ? ` · GPA: ${escapeHtml(edu['edu-gpa'])}` : ''}</div>
                        ${edu['edu-description'] ? `<div class="rm-entry-desc">${escapeHtml(edu['edu-description'])}</div>` : ''}
                    </div>
                `).join('')}
            </div>`;
    }

    // Projects
    if (data.projects && data.projects.length) {
        mainHTML += `
            <div class="rm-section">
                <div class="rm-section-title">Projects</div>
                ${data.projects.map(proj => `
                    <div class="rm-entry">
                        <div class="rm-entry-header">
                            <span class="rm-entry-title">${escapeHtml(proj['proj-name'])}</span>
                            ${proj['proj-tech'] ? `<span class="rm-entry-date">${escapeHtml(proj['proj-tech'])}</span>` : ''}
                        </div>
                        <div class="rm-entry-desc">${formatDescription(proj['proj-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Achievements
    if (data.achievements && data.achievements.length) {
        mainHTML += `
            <div class="rm-section">
                <div class="rm-section-title">Achievements</div>
                ${data.achievements.map(ach => `
                    <div class="rm-entry">
                        <div class="rm-entry-title" style="font-size: 0.78rem;">• ${escapeHtml(ach['ach-title'])}</div>
                        ${ach['ach-description'] ? `<div class="rm-entry-desc" style="padding-left: 12px;">${escapeHtml(ach['ach-description'])}</div>` : ''}
                    </div>
                `).join('')}
            </div>`;
    }

    return `
        <div class="resume-modern">
            <div class="rm-sidebar">${sidebarHTML}</div>
            <div class="rm-main">${mainHTML}</div>
        </div>`;
}

// ========== CLASSIC TEMPLATE ==========
function generateClassicTemplate(data) {
    const techSkills = parseSkills(data.technicalSkills);
    const softSkills = parseSkills(data.softSkills);
    const tools = parseSkills(data.tools);

    let html = `<div class="resume-classic">`;

    // Header
    html += `
        <div class="rc-header">
            <div class="rc-name">${escapeHtml(data.fullName)}</div>
            <div class="rc-role">${escapeHtml(data.jobTitle)}</div>
            <div class="rc-contact">
                ${data.email ? `<span>📧 ${escapeHtml(data.email)}</span>` : ''}
                ${data.phone ? `<span>📱 ${escapeHtml(data.phone)}</span>` : ''}
                ${data.location ? `<span>📍 ${escapeHtml(data.location)}</span>` : ''}
                ${data.linkedin ? `<span>🔗 ${escapeHtml(data.linkedin)}</span>` : ''}
                ${data.github ? `<span>💻 ${escapeHtml(data.github)}</span>` : ''}
            </div>
        </div>`;

    // Summary
    if (data.summary) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Professional Summary</div>
                <div class="rc-summary">${escapeHtml(data.summary)}</div>
            </div>`;
    }

    // Experience
    if (data.experience && data.experience.length) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Professional Experience</div>
                ${data.experience.map(exp => `
                    <div class="rc-entry">
                        <div class="rc-entry-header">
                            <span class="rc-entry-title">${escapeHtml(exp['exp-title'])} — ${escapeHtml(exp['exp-company'])}</span>
                            <span class="rc-entry-date">${escapeHtml(exp['exp-start'])} – ${escapeHtml(exp['exp-end'])}</span>
                        </div>
                        ${exp['exp-location'] ? `<div class="rc-entry-subtitle">${escapeHtml(exp['exp-location'])}</div>` : ''}
                        <div class="rc-entry-desc">${formatDescription(exp['exp-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Education
    if (data.education && data.education.length) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Education</div>
                ${data.education.map(edu => `
                    <div class="rc-entry">
                        <div class="rc-entry-header">
                            <span class="rc-entry-title">${escapeHtml(edu['edu-degree'])}</span>
                            <span class="rc-entry-date">${escapeHtml(edu['edu-start'])} – ${escapeHtml(edu['edu-end'])}</span>
                        </div>
                        <div class="rc-entry-subtitle">${escapeHtml(edu['edu-institution'])}${edu['edu-gpa'] ? ` — GPA: ${escapeHtml(edu['edu-gpa'])}` : ''}</div>
                        ${edu['edu-description'] ? `<div class="rc-entry-desc">${escapeHtml(edu['edu-description'])}</div>` : ''}
                    </div>
                `).join('')}
            </div>`;
    }

    // Skills
    if (techSkills.length || softSkills.length || tools.length) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Skills</div>
                <div class="rc-skills-grid">
                    ${techSkills.length ? `<div class="rc-skill-category"><h4>Technical</h4><p>${techSkills.map(s => escapeHtml(s)).join(', ')}</p></div>` : ''}
                    ${softSkills.length ? `<div class="rc-skill-category"><h4>Soft Skills</h4><p>${softSkills.map(s => escapeHtml(s)).join(', ')}</p></div>` : ''}
                    ${tools.length ? `<div class="rc-skill-category"><h4>Tools</h4><p>${tools.map(s => escapeHtml(s)).join(', ')}</p></div>` : ''}
                    ${data.languages ? `<div class="rc-skill-category"><h4>Languages</h4><p>${escapeHtml(data.languages)}</p></div>` : ''}
                </div>
            </div>`;
    }

    // Projects
    if (data.projects && data.projects.length) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Projects</div>
                ${data.projects.map(proj => `
                    <div class="rc-entry">
                        <div class="rc-entry-header">
                            <span class="rc-entry-title">${escapeHtml(proj['proj-name'])}</span>
                            ${proj['proj-tech'] ? `<span class="rc-entry-date">${escapeHtml(proj['proj-tech'])}</span>` : ''}
                        </div>
                        <div class="rc-entry-desc">${formatDescription(proj['proj-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Certifications
    if (data.certifications && data.certifications.length) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Certifications</div>
                ${data.certifications.map(c => `
                    <div class="rc-entry">
                        <div class="rc-entry-header">
                            <span class="rc-entry-title">${escapeHtml(c['cert-name'])}</span>
                            ${c['cert-date'] ? `<span class="rc-entry-date">${escapeHtml(c['cert-date'])}</span>` : ''}
                        </div>
                        ${c['cert-org'] ? `<div class="rc-entry-subtitle">${escapeHtml(c['cert-org'])}</div>` : ''}
                    </div>
                `).join('')}
            </div>`;
    }

    // Achievements
    if (data.achievements && data.achievements.length) {
        html += `
            <div class="rc-section">
                <div class="rc-section-title">Achievements</div>
                ${data.achievements.map(ach => `
                    <div class="rc-entry">
                        <div class="rc-entry-title">• ${escapeHtml(ach['ach-title'])}</div>
                        ${ach['ach-description'] ? `<div class="rc-entry-desc">${escapeHtml(ach['ach-description'])}</div>` : ''}
                    </div>
                `).join('')}
            </div>`;
    }

    html += `</div>`;
    return html;
}

// ========== MINIMAL TEMPLATE ==========
function generateMinimalTemplate(data) {
    const techSkills = parseSkills(data.technicalSkills);
    const softSkills = parseSkills(data.softSkills);
    const allSkills = [...techSkills, ...softSkills];

    let html = `<div class="resume-minimal">`;

    // Header
    html += `
        <div class="rmin-header">
            <div class="rmin-name">${escapeHtml(data.fullName)}</div>
            <div class="rmin-role">${escapeHtml(data.jobTitle)}</div>
            <div class="rmin-contact">
                ${data.email ? `<span>${escapeHtml(data.email)}</span>` : ''}
                ${data.phone ? `<span>${escapeHtml(data.phone)}</span>` : ''}
                ${data.location ? `<span>${escapeHtml(data.location)}</span>` : ''}
                ${data.linkedin ? `<span>${escapeHtml(data.linkedin)}</span>` : ''}
            </div>
        </div>
        <div class="rmin-divider"></div>`;

    // Summary
    if (data.summary) {
        html += `
            <div class="rmin-section">
                <div class="rmin-section-title">About</div>
                <div class="rmin-summary">${escapeHtml(data.summary)}</div>
            </div>
            <div class="rmin-divider"></div>`;
    }

    // Experience
    if (data.experience && data.experience.length) {
        html += `
            <div class="rmin-section">
                <div class="rmin-section-title">Experience</div>
                ${data.experience.map(exp => `
                    <div class="rmin-entry">
                        <div class="rmin-entry-header">
                            <span class="rmin-entry-title">${escapeHtml(exp['exp-title'])} at ${escapeHtml(exp['exp-company'])}</span>
                            <span class="rmin-entry-date">${escapeHtml(exp['exp-start'])} — ${escapeHtml(exp['exp-end'])}</span>
                        </div>
                        <div class="rmin-entry-desc">${formatDescription(exp['exp-description'])}</div>
                    </div>
                `).join('')}
            </div>
            <div class="rmin-divider"></div>`;
    }

    // Education
    if (data.education && data.education.length) {
        html += `
            <div class="rmin-section">
                <div class="rmin-section-title">Education</div>
                ${data.education.map(edu => `
                    <div class="rmin-entry">
                        <div class="rmin-entry-header">
                            <span class="rmin-entry-title">${escapeHtml(edu['edu-degree'])}</span>
                            <span class="rmin-entry-date">${escapeHtml(edu['edu-start'])} — ${escapeHtml(edu['edu-end'])}</span>
                        </div>
                        <div class="rmin-entry-subtitle">${escapeHtml(edu['edu-institution'])}</div>
                    </div>
                `).join('')}
            </div>
            <div class="rmin-divider"></div>`;
    }

    // Skills
    if (allSkills.length) {
        html += `
            <div class="rmin-section">
                <div class="rmin-section-title">Skills</div>
                <div class="rmin-skills-list">
                    ${allSkills.map(s => `<span class="rmin-skill">${escapeHtml(s)}</span>`).join('')}
                </div>
            </div>
            <div class="rmin-divider"></div>`;
    }

    // Projects
    if (data.projects && data.projects.length) {
        html += `
            <div class="rmin-section">
                <div class="rmin-section-title">Projects</div>
                ${data.projects.map(proj => `
                    <div class="rmin-entry">
                        <div class="rmin-entry-header">
                            <span class="rmin-entry-title">${escapeHtml(proj['proj-name'])}</span>
                            ${proj['proj-tech'] ? `<span class="rmin-entry-date">${escapeHtml(proj['proj-tech'])}</span>` : ''}
                        </div>
                        <div class="rmin-entry-desc">${formatDescription(proj['proj-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    html += `</div>`;
    return html;
}

// ========== CREATIVE TEMPLATE ==========
function generateCreativeTemplate(data) {
    const techSkills = parseSkills(data.technicalSkills);
    const softSkills = parseSkills(data.softSkills);
    const tools = parseSkills(data.tools);

    let html = `<div class="resume-creative"><div class="rcr-accent"></div>`;

    // Header
    html += `
        <div class="rcr-header">
            <div class="rcr-name">${escapeHtml(data.fullName)}</div>
            <div class="rcr-role">${escapeHtml(data.jobTitle)}</div>
            <div class="rcr-contact">
                ${data.email ? `<span>📧 ${escapeHtml(data.email)}</span>` : ''}
                ${data.phone ? `<span>📱 ${escapeHtml(data.phone)}</span>` : ''}
                ${data.location ? `<span>📍 ${escapeHtml(data.location)}</span>` : ''}
                ${data.linkedin ? `<span>🔗 ${escapeHtml(data.linkedin)}</span>` : ''}
                ${data.github ? `<span>💻 ${escapeHtml(data.github)}</span>` : ''}
            </div>
        </div>
        <div class="rcr-body">
            <div class="rcr-main">`;

    // Summary
    if (data.summary) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Profile</div>
                <div class="rcr-summary">${escapeHtml(data.summary)}</div>
            </div>`;
    }

    // Experience
    if (data.experience && data.experience.length) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Experience</div>
                ${data.experience.map(exp => `
                    <div class="rcr-entry">
                        <div class="rcr-entry-title">${escapeHtml(exp['exp-title'])}</div>
                        <div class="rcr-entry-subtitle">${escapeHtml(exp['exp-company'])}</div>
                        <div class="rcr-entry-date">${escapeHtml(exp['exp-start'])} — ${escapeHtml(exp['exp-end'])}</div>
                        <div class="rcr-entry-desc">${formatDescription(exp['exp-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Projects
    if (data.projects && data.projects.length) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Projects</div>
                ${data.projects.map(proj => `
                    <div class="rcr-entry">
                        <div class="rcr-entry-title">${escapeHtml(proj['proj-name'])}</div>
                        ${proj['proj-tech'] ? `<div class="rcr-entry-subtitle">${escapeHtml(proj['proj-tech'])}</div>` : ''}
                        <div class="rcr-entry-desc">${formatDescription(proj['proj-description'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    html += `</div><div class="rcr-side">`;

    // Skills sidebar
    if (techSkills.length) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Technical Skills</div>
                <div>${techSkills.map(s => `<span class="rcr-skill-tag">${escapeHtml(s)}</span>`).join('')}</div>
            </div>`;
    }

    if (softSkills.length) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Soft Skills</div>
                <div>${softSkills.map(s => `<span class="rcr-skill-tag">${escapeHtml(s)}</span>`).join('')}</div>
            </div>`;
    }

    // Education sidebar
    if (data.education && data.education.length) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Education</div>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 0.78rem; font-weight: 600; color: #1a1a2e;">${escapeHtml(edu['edu-degree'])}</div>
                        <div style="font-size: 0.72rem; color: #666;">${escapeHtml(edu['edu-institution'])}</div>
                        <div style="font-size: 0.68rem; color: #999;">${escapeHtml(edu['edu-start'])} — ${escapeHtml(edu['edu-end'])}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Certifications
    if (data.certifications && data.certifications.length) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Certifications</div>
                ${data.certifications.map(c => `
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 0.72rem; font-weight: 600; color: #1a1a2e;">${escapeHtml(c['cert-name'])}</div>
                        <div style="font-size: 0.65rem; color: #888;">${escapeHtml(c['cert-org'] || '')}</div>
                    </div>
                `).join('')}
            </div>`;
    }

    // Languages
    if (data.languages) {
        html += `
            <div class="rcr-section">
                <div class="rcr-section-title">Languages</div>
                <div style="font-size: 0.72rem; color: #555;">${escapeHtml(data.languages)}</div>
            </div>`;
    }

    html += `</div></div></div>`;
    return html;
}
