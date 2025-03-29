document.addEventListener('DOMContentLoaded', function() {
    const certificateForm = document.getElementById('certificateForm');
    const studentInfo = document.getElementById('studentInfo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    const printCertificateBtn = document.getElementById('printCertificateBtn');
    const certificatePreview = document.getElementById('certificatePreview');

    // Configurar fecha actual
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('currentDate').textContent = today.toLocaleDateString('es-ES', options);

    // Manejar el envío del formulario
    certificateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ocultar elementos
        studentInfo.style.display = 'none';
        certificatePreview.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Mostrar carga
        loadingIndicator.style.display = 'flex';
        
        // Simular tiempo de generación
        setTimeout(() => {
            const studentName = document.getElementById('studentNameInput').value.trim();
            const documentType = document.getElementById('documentType').value;
            const documentNumber = document.getElementById('documentNumber').value.trim();
            const program = document.getElementById('program').value;
            
            // Validaciones
            if (!studentName) {
                showError('Por favor ingrese el nombre del estudiante');
                loadingIndicator.style.display = 'none';
                return;
            }
            
            if (!documentType) {
                showError('Por favor seleccione el tipo de documento');
                loadingIndicator.style.display = 'none';
                return;
            }
            
            if (!documentNumber) {
                showError('Por favor ingrese el número de documento');
                loadingIndicator.style.display = 'none';
                return;
            }
            
            if (!program) {
                showError('Por favor seleccione el programa académico');
                loadingIndicator.style.display = 'none';
                return;
            }
            
            // Mostrar información del estudiante
            displayStudentInfo(studentName, documentType, documentNumber, program);
            
            // Generar vista previa del certificado
            generateCertificatePreview(studentName, documentType, documentNumber, program);
            
            loadingIndicator.style.display = 'none';
        }, 1000);
    });

    // Función para mostrar información del estudiante
    function displayStudentInfo(name, docType, docNumber, program) {
        document.getElementById('studentName').textContent = name;
        document.getElementById('studentDocument').textContent = `${docType}: ${formatDocumentNumber(docNumber)}`;
        document.getElementById('studentProgram').textContent = program;
        
        studentInfo.style.display = 'block';
    }

    // Función para generar vista previa del certificado
    function generateCertificatePreview(name, docType, docNumber, program) {
        // Actualizar datos en el certificado
        document.getElementById('certificateStudentName').textContent = name;
        document.getElementById('certificateDocumentNumber').textContent = `${docType}: ${formatDocumentNumber(docNumber)}`;
        document.getElementById('certificateProgram').textContent = program;
        
        // Mostrar certificado
        certificatePreview.style.display = 'block';
    }

    // Función para formatear número de documento
    function formatDocumentNumber(number) {
        // Eliminar cualquier punto existente
        const cleanNumber = number.replace(/\./g, '');
        
        if (/^\d+$/.test(cleanNumber)) {
            if (cleanNumber.length === 10) {
                return `${cleanNumber.substring(0, 1)}.${cleanNumber.substring(1, 4)}.${cleanNumber.substring(4, 7)}.${cleanNumber.substring(7)}`;
            } else if (cleanNumber.length === 8) {
                return `${cleanNumber.substring(0, 2)}.${cleanNumber.substring(2, 5)}.${cleanNumber.substring(5)}`;
            }
        }
        return number;
    }

    // Configurar botón de descarga PDF
    generatePdfBtn.addEventListener('click', function() {
        loadingIndicator.style.display = 'flex';
        
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            alert('Funcionalidad de descarga PDF en desarrollo. Se generaría el certificado para el estudiante mostrado.');
            
            // En implementación real usar jsPDF o similar:
            // const doc = new jsPDF();
            // doc.text(`Certificado para ${studentName}`, 10, 10);
            // doc.save(`certificado-${documentNumber}.pdf`);
        }, 1000);
    });

    // Configurar botón de impresión
    printCertificateBtn.addEventListener('click', function() {
        window.print();
    });

    // Función para mostrar errores
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Validación en tiempo real del número de documento
    document.getElementById('documentNumber').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    });
});
// ... (código anterior se mantiene igual)

// Configurar botón de descarga PDF
generatePdfBtn.addEventListener('click', function() {
    const studentName = document.getElementById('studentNameInput').value.trim();
    const documentType = document.getElementById('documentType').value;
    const documentNumber = document.getElementById('documentNumber').value.trim();
    const program = document.getElementById('program').value;
    
    if (!studentName || !documentType || !documentNumber || !program) {
        showError('Complete todos los campos antes de generar el PDF');
        return;
    }

    loadingIndicator.style.display = 'flex';
    
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
        generateCertificatePDF(studentName, documentType, documentNumber, program);
    }, 1000);
});

// Función para generar PDF con jsPDF
function generateCertificatePDF(name, docType, docNumber, program) {
    // Crear un clon del certificado para PDF
    const certificateClone = document.getElementById('certificatePreview').cloneNode(true);
    certificateClone.style.display = 'block';
    certificateClone.style.width = '210mm';
    certificateClone.style.padding = '20mm';
    certificateClone.style.margin = '0';
    
    // Ocultar elementos no necesarios en PDF
    const buttons = certificateClone.querySelector('.actions');
    if (buttons) buttons.style.display = 'none';
    
    // Configurar HTML2PDF
    const opt = {
        margin: 10,
        filename: `Certificado_${name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generar PDF
    html2pdf().set(opt).from(certificateClone).save();
}

// Configurar botón de impresión
printCertificateBtn.addEventListener('click', function() {
    const studentName = document.getElementById('studentNameInput').value.trim();
    const documentType = document.getElementById('documentType').value;
    const documentNumber = document.getElementById('documentNumber').value.trim();
    const program = document.getElementById('program').value;
    
    if (!studentName || !documentType || !documentNumber || !program) {
        showError('Complete todos los campos antes de imprimir');
        return;
    }

    // Crear ventana de impresión
    const printWindow = window.open('', '_blank');
    const certificateContent = document.getElementById('certificatePreview').innerHTML;
    
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificado ${name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20mm; }
                .certificate-preview { width: 210mm; margin: 0 auto; }
                .certificate-header { text-align: center; margin-bottom: 15px; }
                .certificate-title { font-size: 18pt; font-weight: bold; }
                .certificate-subtitle { font-size: 14pt; margin: 5px 0; }
                .certificate-body { line-height: 1.6; margin: 20px 0; }
                .highlight { font-weight: bold; }
                .certificate-footer { margin-top: 30px; }
                .certificate-signature { text-align: center; }
                .signature-line { border-top: 1px solid #000; width: 200px; margin: 5px auto; }
                @media print { 
                    body { -webkit-print-color-adjust: exact; } 
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${certificateContent}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        window.close();
                    }, 300);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
});

// ... (resto del código se mantiene igual)