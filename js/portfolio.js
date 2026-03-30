/* ========== PORTFOLIO.JS - Portfolio Page Generator ========== */

function generatePortfolio(data) {
    const container = document.getElementById('portfolioContent');
    if (!container) return;

    const techSkills = parseSkills(data.technicalSkills);
    const softSkills = parseSkills(data.softSkills);
    const tools = parseSkills(data.tools);
    const initials = getInitials(data.fullName);

    let html = '';

    // ========== HERO ==========
    html += `
    <div class="pf-hero">
        <div class="pf-hero-bg">
            <div class="pf-orb pf-orb-1"></div>
            <div class="pf-orb pf-orb-2"></div>
        </div>
        <div class="pf-avatar">${initials}</div>
        <h1 class="pf-name">${escapeHtml(data.fullName)}</h1>
        <p class="pf-role">${escapeHtml(data.jobTitle)}</p>
        ${data.location ? `<p class="pf-location">📍 ${escapeHtml(data.location)}</p>` : ''}
        <div class="pf-social-links">
            ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" class="pf-social-link">📧 Email</a>` : ''}
            ${data.linkedin ? `<a href="${escapeHtml(data.linkedin)}" class="pf-social-link" target="_blank">🔗 LinkedIn</a>` : ''}
            ${data.github ? `<a href="${escapeHtml(data.github)}" class="pf-social-link" target="_blank">💻 GitHub</a>` : ''}
            ${data.website ? `<a href="${escapeHtml(data.website)}" class="pf-social-link" target="_blank">🌐 Website</a>` : ''}
        </div>
    </div>`;

    // ========== ABOUT ME ==========
    if (data.summary) {
        html += `
        <div class="pf-section" id="pf-about">
            <h2 class="pf-section-title">About Me</h2>
            <p class="pf-section-subtitle">A little about who I am</p>
            <p class="pf-about-text">${escapeHtml(data.summary)}</p>
        </div>`;
    }

    // ========== SKILLS ==========
    if (techSkills.length || softSkills.length || tools.length) {
        html += `
        <div class="pf-section" id="pf-skills">
            <h2 class="pf-section-title">Skills & Technologies</h2>
            <p class="pf-section-subtitle">What I work with</p>
            <div class="pf-skills-grid">
                ${techSkills.length ? `
                <div class="pf-skill-category">
                    <h3>⚡ Technical Skills</h3>
                    <div class="pf-skill-tags">
                        ${techSkills.map(s => `<span class="pf-skill-tag">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </div>` : ''}
                ${softSkills.length ? `
                <div class="pf-skill-category">
                    <h3>🤝 Soft Skills</h3>
                    <div class="pf-skill-tags">
                        ${softSkills.map(s => `<span class="pf-skill-tag">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </div>` : ''}
                ${tools.length ? `
                <div class="pf-skill-category">
                    <h3>🛠️ Tools & Technologies</h3>
                    <div class="pf-skill-tags">
                        ${tools.map(s => `<span class="pf-skill-tag">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </div>` : ''}
                ${data.languages ? `
                <div class="pf-skill-category">
                    <h3>🌍 Languages</h3>
                    <div class="pf-skill-tags">
                        ${data.languages.split(',').map(l => `<span class="pf-skill-tag">${escapeHtml(l.trim())}</span>`).join('')}
                    </div>
                </div>` : ''}
            </div>
        </div>`;
    }

    // ========== PROJECTS ==========
    if (data.projects && data.projects.length) {
        html += `
        <div class="pf-section" id="pf-projects">
            <h2 class="pf-section-title">Projects</h2>
            <p class="pf-section-subtitle">Things I've built</p>
            <div class="pf-projects-grid">
                ${data.projects.map(proj => `
                <div class="pf-project-card">
                    <div class="pf-project-header">
                        <div class="pf-project-name">${escapeHtml(proj['proj-name'])}</div>
                        ${proj['proj-tech'] ? `<div class="pf-project-tech">${escapeHtml(proj['proj-tech'])}</div>` : ''}
                    </div>
                    <div class="pf-project-body">
                        <p class="pf-project-desc">${escapeHtml(proj['proj-description'] || 'No description provided.')}</p>
                        <div class="pf-project-links">
                            ${proj['proj-url'] ? `<a href="${escapeHtml(proj['proj-url'])}" class="pf-project-link" target="_blank">🔗 Source Code</a>` : ''}
                            ${proj['proj-demo'] ? `<a href="${escapeHtml(proj['proj-demo'])}" class="pf-project-link" target="_blank">🚀 Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>`;
    }

    // ========== EXPERIENCE ==========
    if (data.experience && data.experience.length) {
        html += `
        <div class="pf-section" id="pf-experience">
            <h2 class="pf-section-title">Experience</h2>
            <p class="pf-section-subtitle">Where I've worked</p>
            <div class="pf-timeline">
                ${data.experience.map(exp => `
                <div class="pf-timeline-item">
                    <div class="pf-timeline-title">${escapeHtml(exp['exp-title'])}</div>
                    <div class="pf-timeline-company">${escapeHtml(exp['exp-company'])}${exp['exp-location'] ? ` · ${escapeHtml(exp['exp-location'])}` : ''}</div>
                    <div class="pf-timeline-date">${escapeHtml(exp['exp-start'])} — ${escapeHtml(exp['exp-end'])}</div>
                    ${exp['exp-description'] ? `<div class="pf-timeline-desc">${escapeHtml(exp['exp-description'])}</div>` : ''}
                </div>`).join('')}
            </div>
        </div>`;
    }

    // ========== EDUCATION ==========
    if (data.education && data.education.length) {
        html += `
        <div class="pf-section" id="pf-education">
            <h2 class="pf-section-title">Education</h2>
            <p class="pf-section-subtitle">Where I studied</p>
            <div class="pf-timeline">
                ${data.education.map(edu => `
                <div class="pf-timeline-item">
                    <div class="pf-timeline-title">${escapeHtml(edu['edu-degree'])}</div>
                    <div class="pf-timeline-company">${escapeHtml(edu['edu-institution'])}${edu['edu-gpa'] ? ` · GPA: ${escapeHtml(edu['edu-gpa'])}` : ''}</div>
                    <div class="pf-timeline-date">${escapeHtml(edu['edu-start'])} — ${escapeHtml(edu['edu-end'])}</div>
                    ${edu['edu-description'] ? `<div class="pf-timeline-desc">${escapeHtml(edu['edu-description'])}</div>` : ''}
                </div>`).join('')}
            </div>
        </div>`;
    }

    // ========== CERTIFICATIONS ==========
    if (data.certifications && data.certifications.length) {
        html += `
        <div class="pf-section" id="pf-certifications">
            <h2 class="pf-section-title">Certifications</h2>
            <p class="pf-section-subtitle">Professional credentials</p>
            <div class="pf-certs-grid">
                ${data.certifications.map(c => `
                <div class="pf-cert-card">
                    <div class="pf-cert-name">🏆 ${escapeHtml(c['cert-name'])}</div>
                    ${c['cert-org'] ? `<div class="pf-cert-org">${escapeHtml(c['cert-org'])}</div>` : ''}
                    ${c['cert-date'] ? `<div class="pf-cert-date">${escapeHtml(c['cert-date'])}</div>` : ''}
                </div>`).join('')}
            </div>
        </div>`;
    }

    // ========== ACHIEVEMENTS ==========
    if (data.achievements && data.achievements.length) {
        html += `
        <div class="pf-section" id="pf-achievements">
            <h2 class="pf-section-title">Achievements</h2>
            <p class="pf-section-subtitle">Things I'm proud of</p>
            ${data.achievements.map(ach => `
            <div class="pf-achievement-item">
                <div class="pf-achievement-icon">🏅</div>
                <div class="pf-achievement-text">
                    <h4>${escapeHtml(ach['ach-title'])}</h4>
                    ${ach['ach-description'] ? `<p>${escapeHtml(ach['ach-description'])}</p>` : ''}
                </div>
            </div>`).join('')}
        </div>`;
    }

    // ========== CONTACT ==========
    html += `
    <div class="pf-section" id="pf-contact">
        <h2 class="pf-section-title">Get In Touch</h2>
        <p class="pf-section-subtitle">Feel free to reach out</p>
        <div class="pf-contact-grid">
            ${data.email ? `
            <div class="pf-contact-card">
                <div class="pf-contact-icon">📧</div>
                <div class="pf-contact-label">Email</div>
                <div class="pf-contact-value">${escapeHtml(data.email)}</div>
            </div>` : ''}
            ${data.phone ? `
            <div class="pf-contact-card">
                <div class="pf-contact-icon">📱</div>
                <div class="pf-contact-label">Phone</div>
                <div class="pf-contact-value">${escapeHtml(data.phone)}</div>
            </div>` : ''}
            ${data.location ? `
            <div class="pf-contact-card">
                <div class="pf-contact-icon">📍</div>
                <div class="pf-contact-label">Location</div>
                <div class="pf-contact-value">${escapeHtml(data.location)}</div>
            </div>` : ''}
            ${data.linkedin ? `
            <div class="pf-contact-card">
                <div class="pf-contact-icon">🔗</div>
                <div class="pf-contact-label">LinkedIn</div>
                <div class="pf-contact-value">${escapeHtml(data.linkedin)}</div>
            </div>` : ''}
        </div>
    </div>`;

    // ========== FOOTER ==========
    html += `
    <div class="pf-footer">
        <p>&copy; ${new Date().getFullYear()} ${escapeHtml(data.fullName)}. Built with <span class="rednos-brand"><span class="red-letter">R</span>ed<span class="red-letter">N</span>os</span> Forge</p>
    </div>`;

    container.innerHTML = html;
}

// ========== OPEN PORTFOLIO IN NEW TAB ==========
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openPortfolioBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            const data = getFormData();
            if (!data || !data.fullName) {
                showToast('Please fill out the builder form first', 'error');
                return;
            }

            // Generate standalone portfolio HTML
            const portfolioHTML = generateStandalonePortfolio(data);
            const blob = new Blob([portfolioHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        });
    }
});

function generateStandalonePortfolio(data) {
    const techSkills = parseSkills(data.technicalSkills);
    const softSkills = parseSkills(data.softSkills);
    const tools = parseSkills(data.tools);
    const initials = getInitials(data.fullName);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(data.fullName)} - Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6C63FF;
            --primary-light: #8B84FF;
            --secondary: #FF6584;
            --bg-dark: #0a0a1a;
            --bg-card: rgba(255,255,255,0.04);
            --border-color: rgba(255,255,255,0.08);
            --text-primary: #fff;
            --text-secondary: rgba(255,255,255,0.7);
            --text-tertiary: rgba(255,255,255,0.45);
            --accent-red: #FF3B3B;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Inter',sans-serif; background:var(--bg-dark); color:var(--text-primary); line-height:1.6; }
        .red-letter { color: var(--accent-red); font-weight: 800; }
        .rednos-brand { font-weight: 700; }
        .hero { padding:120px 24px 80px; text-align:center; background:linear-gradient(180deg,rgba(108,99,255,0.1),transparent); }
        .avatar { width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:800;color:white;margin:0 auto 24px;box-shadow:0 0 30px rgba(108,99,255,0.3); }
        .name { font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:8px; }
        .role { font-size:1.2rem;color:var(--primary-light);margin-bottom:16px; }
        .loc { font-size:0.9rem;color:var(--text-tertiary);margin-bottom:24px; }
        .links { display:flex;justify-content:center;gap:12px;flex-wrap:wrap; }
        .links a { padding:10px 20px;background:rgba(255,255,255,0.06);border:1px solid var(--border-color);border-radius:999px;color:var(--text-secondary);font-size:0.85rem;text-decoration:none;transition:all 0.25s; }
        .links a:hover { background:rgba(255,255,255,0.1);color:white;transform:translateY(-2px); }
        .section { padding:80px 24px;max-width:1000px;margin:0 auto; }
        .section-title { font-size:1.5rem;font-weight:700;margin-bottom:8px; }
        .section-title::before { content:'';display:inline-block;width:24px;height:3px;background:linear-gradient(90deg,var(--primary),var(--secondary));border-radius:2px;margin-right:12px;vertical-align:middle; }
        .section-sub { color:var(--text-tertiary);font-size:0.9rem;margin-bottom:32px; }
        .about { font-size:1.05rem;line-height:1.8;color:var(--text-secondary);max-width:700px; }
        .skills-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px; }
        .skill-cat { padding:24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px; }
        .skill-cat h3 { font-size:0.85rem;color:var(--primary-light);margin-bottom:12px; }
        .tags { display:flex;flex-wrap:wrap;gap:6px; }
        .tag { padding:5px 12px;background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.15);border-radius:999px;font-size:0.8rem;color:var(--text-secondary); }
        .projects-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px; }
        .project-card { background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;overflow:hidden;transition:all 0.25s; }
        .project-card:hover { transform:translateY(-4px);border-color:rgba(255,255,255,0.15); }
        .project-head { padding:24px;background:linear-gradient(135deg,rgba(108,99,255,0.08),rgba(255,101,132,0.05));border-bottom:1px solid var(--border-color); }
        .project-name { font-size:1.1rem;font-weight:700;margin-bottom:4px; }
        .project-tech { font-size:0.8rem;color:var(--primary-light); }
        .project-body { padding:20px 24px; }
        .project-desc { font-size:0.88rem;line-height:1.6;color:var(--text-secondary);margin-bottom:16px; }
        .project-links { display:flex;gap:8px; }
        .project-links a { padding:6px 14px;background:rgba(255,255,255,0.06);border:1px solid var(--border-color);border-radius:999px;font-size:0.78rem;color:var(--text-secondary);text-decoration:none;transition:all 0.25s; }
        .project-links a:hover { color:white; }
        .timeline { position:relative;padding-left:32px; }
        .timeline::before { content:'';position:absolute;left:8px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--primary),var(--secondary),transparent); }
        .timeline-item { position:relative;margin-bottom:32px;padding:20px 24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px; }
        .timeline-item::before { content:'';position:absolute;left:-28px;top:24px;width:12px;height:12px;border-radius:50%;background:var(--primary);border:3px solid var(--bg-dark); }
        .tl-title { font-size:1rem;font-weight:700; }
        .tl-company { font-size:0.9rem;color:var(--primary-light); }
        .tl-date { font-size:0.8rem;color:var(--text-tertiary);margin-bottom:8px; }
        .tl-desc { font-size:0.88rem;color:var(--text-secondary); }
        .contact-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px; }
        .contact-card { padding:24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;text-align:center; }
        .contact-icon { font-size:1.5rem;margin-bottom:8px; }
        .contact-label { font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px; }
        .contact-value { font-size:0.9rem;color:var(--text-secondary);word-break:break-all; }
        .footer { padding:40px 24px;text-align:center;border-top:1px solid var(--border-color);margin-top:60px; }
        .footer p { color:var(--text-tertiary);font-size:0.85rem; }
    </style>
</head>
<body>
    <div class="hero">
        <div class="avatar">${initials}</div>
        <h1 class="name">${escapeHtml(data.fullName)}</h1>
        <p class="role">${escapeHtml(data.jobTitle)}</p>
        ${data.location ? `<p class="loc">📍 ${escapeHtml(data.location)}</p>` : ''}
        <div class="links">
            ${data.email ? `<a href="mailto:${escapeHtml(data.email)}">📧 Email</a>` : ''}
            ${data.linkedin ? `<a href="${escapeHtml(data.linkedin)}" target="_blank">🔗 LinkedIn</a>` : ''}
            ${data.github ? `<a href="${escapeHtml(data.github)}" target="_blank">💻 GitHub</a>` : ''}
            ${data.website ? `<a href="${escapeHtml(data.website)}" target="_blank">🌐 Website</a>` : ''}
        </div>
    </div>

    ${data.summary ? `
    <div class="section">
        <h2 class="section-title">About Me</h2>
        <p class="about">${escapeHtml(data.summary)}</p>
    </div>` : ''}

    ${techSkills.length || softSkills.length || tools.length ? `
    <div class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-grid">
            ${techSkills.length ? `<div class="skill-cat"><h3>⚡ Technical</h3><div class="tags">${techSkills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div></div>` : ''}
            ${softSkills.length ? `<div class="skill-cat"><h3>🤝 Soft Skills</h3><div class="tags">${softSkills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div></div>` : ''}
            ${tools.length ? `<div class="skill-cat"><h3>🛠️ Tools</h3><div class="tags">${tools.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div></div>` : ''}
        </div>
    </div>` : ''}

    ${data.projects && data.projects.length ? `
    <div class="section">
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">
            ${data.projects.map(p => `
            <div class="project-card">
                <div class="project-head">
                    <div class="project-name">${escapeHtml(p['proj-name'])}</div>
                    ${p['proj-tech'] ? `<div class="project-tech">${escapeHtml(p['proj-tech'])}</div>` : ''}
                </div>
                <div class="project-body">
                    <p class="project-desc">${escapeHtml(p['proj-description'] || '')}</p>
                    <div class="project-links">
                        ${p['proj-url'] ? `<a href="${escapeHtml(p['proj-url'])}" target="_blank">🔗 Source</a>` : ''}
                        ${p['proj-demo'] ? `<a href="${escapeHtml(p['proj-demo'])}" target="_blank">🚀 Demo</a>` : ''}
                    </div>
                </div>
            </div>`).join('')}
        </div>
    </div>` : ''}

    ${data.experience && data.experience.length ? `
    <div class="section">
        <h2 class="section-title">Experience</h2>
        <div class="timeline">
            ${data.experience.map(e => `
            <div class="timeline-item">
                <div class="tl-title">${escapeHtml(e['exp-title'])}</div>
                <div class="tl-company">${escapeHtml(e['exp-company'])}</div>
                <div class="tl-date">${escapeHtml(e['exp-start'])} — ${escapeHtml(e['exp-end'])}</div>
                ${e['exp-description'] ? `<div class="tl-desc">${escapeHtml(e['exp-description'])}</div>` : ''}
            </div>`).join('')}
        </div>
    </div>` : ''}

    <div class="section">
        <h2 class="section-title">Contact</h2>
        <div class="contact-grid">
            ${data.email ? `<div class="contact-card"><div class="contact-icon">📧</div><div class="contact-label">Email</div><div class="contact-value">${escapeHtml(data.email)}</div></div>` : ''}
            ${data.phone ? `<div class="contact-card"><div class="contact-icon">📱</div><div class="contact-label">Phone</div><div class="contact-value">${escapeHtml(data.phone)}</div></div>` : ''}
            ${data.location ? `<div class="contact-card"><div class="contact-icon">📍</div><div class="contact-label">Location</div><div class="contact-value">${escapeHtml(data.location)}</div></div>` : ''}
            ${data.linkedin ? `<div class="contact-card"><div class="contact-icon">🔗</div><div class="contact-label">LinkedIn</div><div class="contact-value">${escapeHtml(data.linkedin)}</div></div>` : ''}
        </div>
    </div>

    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ${escapeHtml(data.fullName)}. Built with <span class="rednos-brand"><span class="red-letter">R</span>ed<span class="red-letter">N</span>os</span> Forge</p>
    </div>
</body>
</html>`;
}
