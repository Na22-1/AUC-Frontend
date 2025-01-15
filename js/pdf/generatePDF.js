// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const generatePDFButton = document.getElementById('generatePDF');
    const contentElement = document.getElementById('content-to-print');

    if (!generatePDFButton || !contentElement) {
        console.error('Required elements not found');
        return;
    }

    generatePDFButton.addEventListener('click', async () => {
        try {
            const element = document.getElementById('content-to-print');

            const opt = {
                margin: 0,
                filename: `Retrospective mit AUC - ${getCurrentDate()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    scrollY: 0,
                    scrollX: 0,
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a3',
                    orientation: 'landscape',
                    // Prevent automatic page breaks
                    putOnlyUsedFonts: true,
                    floatPrecision: 16
                },
            };

            // Generate PDF
            await html2pdf().from(element).set(opt).save();

        } catch (error) {
            console.error('PDF generation failed:', error);
        }
    });
});

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
}