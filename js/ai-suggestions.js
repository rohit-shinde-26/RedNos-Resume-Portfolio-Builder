/* ========== AI-SUGGESTIONS.JS - AI Enhancement Features ========== */

document.addEventListener('DOMContentLoaded', () => {
    initAIPanel();
    initAISuggestButtons();
    initRegenerateBtn();
});

// ========== AI PANEL TOGGLE ==========
function initAIPanel() {
    const aiBtn = document.getElementById('aiSuggestBtn');
    const closeBtn = document.getElementById('aiPanelClose');
    const panel = document.getElementById('aiPanel');

    if (aiBtn) {
        aiBtn.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('open');
        });
    }
}

// ========== INLINE AI SUGGEST BUTTONS ==========
function initAISuggestButtons() {
    document.querySelectorAll('.ai-suggest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const field = btn.getAttribute('data-field');
            handleAISuggestion(btn, field);
        });
    });
}

function handleAISuggestion(btn, field) {
    // Find the nearest textarea
    const formGroup = btn.closest('.form-group');
    const textarea = formGroup ? formGroup.querySelector('textarea') : null;
    if (!textarea) return;

    // Show loading state
    const originalText = btn.innerHTML;
    btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" class="spin-icon"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="25" stroke-dashoffset="10"><animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.8s" repeatCount="indefinite"/></circle></svg>
        Generating...
    `;
    btn.disabled = true;

    // Simulate AI suggestion generation
    setTimeout(() => {
        const currentValue = textarea.value.trim();
        const suggestion = generateAISuggestion(field, currentValue);
        
        if (suggestion) {
            textarea.value = suggestion;
            textarea.style.borderColor = 'rgba(108, 99, 255, 0.5)';
            setTimeout(() => {
                textarea.style.borderColor = '';
            }, 2000);
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
        showToast('AI suggestion applied!', 'success');
    }, 1200);
}

// ========== AI SUGGESTION GENERATOR ==========
function generateAISuggestion(field, currentValue) {
    const data = getFormData();
    
    const summaryTemplates = [
        `Results-driven ${data.jobTitle || 'professional'} with a proven track record of delivering high-impact solutions. Passionate about leveraging cutting-edge technologies to solve complex problems and drive innovation. Known for strong collaboration skills and a commitment to excellence in every project.`,
        `Dynamic and detail-oriented ${data.jobTitle || 'professional'} with extensive experience in developing scalable solutions. Adept at bridging the gap between technical implementation and business objectives. Committed to continuous learning and staying at the forefront of industry trends.`,
        `Innovative ${data.jobTitle || 'professional'} with a passion for building exceptional digital experiences. Combines deep technical expertise with strong problem-solving abilities to deliver solutions that exceed expectations. Thrives in fast-paced environments and enjoys mentoring team members.`
    ];

    const expTemplates = [
        `• Spearheaded the development of key features that improved system performance by 40%, resulting in enhanced user satisfaction\n• Collaborated with cross-functional teams to deliver projects 20% ahead of schedule\n• Implemented best practices and coding standards that reduced bug reports by 35%\n• Mentored junior developers and conducted code reviews to maintain code quality`,
        `• Led the architecture and implementation of microservices that handled 10M+ daily requests\n• Optimized database queries resulting in 50% reduction in response times\n• Designed and implemented CI/CD pipelines that reduced deployment time by 60%\n• Contributed to system design decisions that scaled the platform to support 2x user growth`
    ];

    const projTemplates = [
        `Built a full-stack application using modern technologies to solve real-world challenges. Implemented responsive UI with intuitive user experience design. Integrated RESTful APIs and implemented authentication/authorization. Deployed on cloud infrastructure with automated CI/CD pipeline.`,
        `Developed a comprehensive platform that streamlines workflows and increases productivity. Features include real-time data processing, interactive dashboards, and role-based access control. Achieved 99.9% uptime with robust error handling and monitoring.`
    ];

    if (field === 'summary') {
        if (currentValue.length > 20) {
            // Enhance existing summary
            return `${currentValue} With a strong focus on delivering measurable results and driving continuous improvement, I bring a unique combination of technical expertise and leadership skills to every role.`;
        }
        return summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
    }

    if (field === 'exp-description') {
        if (currentValue.length > 20) {
            return currentValue.split('.').filter(s => s.trim()).map(s => `• ${s.trim()}`).join('\n');
        }
        return expTemplates[Math.floor(Math.random() * expTemplates.length)];
    }

    if (field === 'proj-description') {
        if (currentValue.length > 20) {
            return currentValue + ' The solution was designed with scalability and maintainability in mind, following industry best practices and design patterns.';
        }
        return projTemplates[Math.floor(Math.random() * projTemplates.length)];
    }

    return currentValue;
}

// ========== APPLY SUGGESTION FROM AI PANEL ==========
function applySuggestion(type) {
    const data = getFormData();
    
    switch (type) {
        case 'summary':
            if (data.summary) {
                const enhanced = `${data.summary} Demonstrated ability to deliver measurable results, with a track record of improving efficiency by up to 40% through innovative solutions and strategic thinking.`;
                const summaryField = document.getElementById('summary');
                if (summaryField) {
                    summaryField.value = enhanced;
                    saveFormData(getFormData());
                    // Regenerate resume
                    const updatedData = getFormData();
                    generateResume(updatedData);
                    showToast('Summary enhanced with metrics!', 'success');
                }
            } else {
                showToast('Please write a summary first', 'error');
            }
            break;
            
        case 'verbs':
            // Apply action verbs to experience descriptions
            const expEntries = document.querySelectorAll('#experienceEntries textarea[name="exp-description"]');
            expEntries.forEach(textarea => {
                if (textarea.value.trim()) {
                    const enhanced = textarea.value
                        .replace(/^(I |We |The team )?developed/gmi, 'Architected and developed')
                        .replace(/^(I |We )?managed/gmi, 'Spearheaded')
                        .replace(/^(I |We )?worked on/gmi, 'Delivered')
                        .replace(/^(I |We )?improved/gmi, 'Optimized')
                        .replace(/^(I |We )?created/gmi, 'Engineered')
                        .replace(/^(I |We )?helped/gmi, 'Facilitated')
                        .replace(/^(I |We )?led/gmi, 'Orchestrated')
                        .replace(/^(I |We )?built/gmi, 'Constructed and deployed');
                    textarea.value = enhanced;
                }
            });
            saveFormData(getFormData());
            generateResume(getFormData());
            showToast('Action verbs applied!', 'success');
            break;
            
        case 'metrics':
            showToast('Tip: Add specific numbers like "improved performance by 40%" or "managed a team of 8"', 'info');
            break;
            
        case 'keywords':
            showToast('Tip: Include keywords from job descriptions you\'re targeting for better ATS compatibility', 'info');
            break;
    }
}

// ========== REGENERATE BUTTON ==========
function initRegenerateBtn() {
    const btn = document.getElementById('regenerateBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const data = getFormData();
        if (!data || !data.fullName) {
            showToast('No resume data found. Please fill the builder form.', 'error');
            return;
        }

        showLoading('Regenerating with AI enhancements...');

        setTimeout(() => {
            // Apply some AI enhancements
            if (data.summary && !data.summary.includes('measurable results')) {
                data.summary += ' Proven ability to deliver measurable results and drive team success through innovative thinking and strategic execution.';
            }

            saveFormData(data);
            generateResume(data);
            hideLoading();
            showToast('Resume regenerated with AI improvements!', 'success');
            
            // Close AI panel
            const panel = document.getElementById('aiPanel');
            if (panel) panel.classList.remove('open');
        }, 1500);
    });
}

// ========== EDIT RESUME BUTTON ==========
document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editResumeBtn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            navigateTo('builder');
        });
    }
});
