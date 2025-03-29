document.addEventListener('DOMContentLoaded', function() {
    const verificationForm = document.getElementById('verificationForm');
    const verificationMethod = document.getElementById('verificationMethod');
    const codeInputGroup = document.getElementById('codeInputGroup');
    const qrScanner = document.getElementById('qrScanner');
    const documentInputGroup = document.getElementById('documentInputGroup');
    const certificateResult = document.getElementById('certificateResult');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const startScanner = document.getElementById('startScanner');

    // Base de datos de certificados (simulada)
    const certificatesDatabase = [
        {
            code: 'CESDE-CERT-2025-001',
            studentName: 'DUVAN FELIPE JARAMILLO RAIGOZA',
            documentType: 'CC',
            documentNumber: '1.032.098.057',
            program: 'Técnico Laboral por Competencias en Auxiliar en Desarrollo de Aplicaciones Informáticas',
            date: '17 de febrero de 2025',
            status: 'Válido',
            valid: true
        },
        {
            code: 'CESDE-CERT-2024-123',
            studentName: 'MARÍA RODRÍGUEZ LÓPEZ',
            documentType: 'TI',
            documentNumber: '987.654.321',
            program: 'Técnico en Diseño Gráfico',
            date: '15 de diciembre de 2024',
            status: 'Válido',
            valid: true
        }
    ];

    // Mostrar/ocultar campos según método de verificación
    verificationMethod.addEventListener('change', function() {
        codeInputGroup.style.display = 'none';
        qrScanner.style.display = 'none';
        documentInputGroup.style.display = 'none';
        
        switch(this.value) {
            case 'code':
                codeInputGroup.style.display = 'block';
                break;
            case 'qr':
                qrScanner.style.display = 'block';
                break;
            case 'document':
                documentInputGroup.style.display = 'block';
                break;
        }
    });

    // Simular escáner QR
    startScanner.addEventListener('click', function() {
        alert('En una implementación real, esto activaría la cámara para escanear un código QR');
        // Simular escaneo exitoso después de 2 segundos
        setTimeout(() => {
            document.getElementById('certificateCode').value = 'CESDE-CERT-2025-001';
        }, 2000);
    });

    // Manejar envío del formulario
    verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ocultar resultados anteriores
        certificateResult.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Mostrar carga
        loadingIndicator.style.display = 'flex';
        
        // Simular tiempo de verificación
        setTimeout(() => {
            verifyCertificate();
            loadingIndicator.style.display = 'none';
        }, 1500);
    });

    // Función para verificar certificado
    function verifyCertificate() {
        const method = verificationMethod.value;
        let certificate;
        
        if (!method) {
            showError('Por favor seleccione un método de verificación');
            return;
        }
        
        if (method === 'code') {
            const code = document.getElementById('certificateCode').value.trim();
            if (!code) {
                showError('Por favor ingrese el código del certificado');
                return;
            }
            certificate = certificatesDatabase.find(c => c.code === code);
        } 
        else if (method === 'document') {
            const docType = document.getElementById('verificationDocumentType').value;
            const docNumber = document.getElementById('verificationDocumentNumber').value.trim();
            
            if (!docType || !docNumber) {
                showError('Por favor complete todos los campos de documento');
                return;
            }
            
            certificate = certificatesDatabase.find(c => 
                c.documentType === docType && 
                c.documentNumber.includes(docNumber.replace(/\./g, ''))
            );
        }
        else if (method === 'qr') {
            // En implementación real, aquí se procesaría el QR escaneado
            const code = document.getElementById('certificateCode').value.trim();
            certificate = certificatesDatabase.find(c => c.code === code);
        }
        
        if (certificate) {
            displayCertificateResult(certificate);
        } else {
            showError('No se encontró ningún certificado con los datos proporcionados');
        }
    }

    // Función para mostrar resultados
    function displayCertificateResult(certificate) {
        document.getElementById('verifiedCode').textContent = certificate.code;
        document.getElementById('verifiedStudent').textContent = certificate.studentName;
        document.getElementById('verifiedDocument').textContent = `${certificate.documentType}: ${certificate.documentNumber}`;
        document.getElementById('verifiedProgram').textContent = certificate.program;
        document.getElementById('verifiedDate').textContent = certificate.date;
        document.getElementById('verifiedStatus').textContent = certificate.status;
        
        const statusText = document.getElementById('statusText');
        const statusIcon = document.querySelector('.verification-status i');
        
        if (certificate.valid) {
            statusText.textContent = 'Certificado válido';
            statusIcon.className = 'fas fa-check-circle status-valid';
        } else {
            statusText.textContent = 'Certificado inválido';
            statusIcon.className = 'fas fa-times-circle status-invalid';
        }
        
        certificateResult.style.display = 'block';
    }

    // Función para mostrar errores
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Configurar botones de acciones
    document.getElementById('viewCertificateBtn').addEventListener('click', function() {
        alert('Mostrando certificado completo...');
        // Aquí iría la lógica para mostrar el certificado completo
    });

    document.getElementById('downloadCertificateBtn').addEventListener('click', function() {
        alert('Descargando certificado...');
        // Aquí iría la lógica para descargar el certificado
    });
});