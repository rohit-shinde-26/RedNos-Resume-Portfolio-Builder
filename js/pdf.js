/* ========== PDF.JS - PDF Generation using html2pdf ========== */

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadPdfBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResumePDF);
    }
});

function downloadResumePDF() {
    const paper = document.getElementById('resumePaper');
    
    if (!paper || paper.querySelector('.resume-placeholder')) {
        showToast('Please generate a resume first', 'error');
        return;
    }

    showLoading('Preparing your PDF...');

    const opt = {
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Get the user's name for filename
    const data = getFormData();
    if (data && data.fullName) {
        opt.filename = `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    }

    html2pdf().set(opt).from(paper).save()
        .then(() => {
            hideLoading();
            showToast('Resume downloaded successfully!', 'success');
        })
        .catch((err) => {
            hideLoading();
            showToast('Error generating PDF. Please try again.', 'error');
            console.error('PDF Error:', err);
        });
}
