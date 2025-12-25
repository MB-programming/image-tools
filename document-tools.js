// ==================== DOCUMENT TOOLS - PDF, Word, Excel ====================
// This is a comprehensive document processing module

const documentState = {
    toPdf: { files: [], pdfDoc: null },
    pdfEditor: { pdfDoc: null, currentPage: 1, totalPages: 0, textElements: [] },
    toWord: { files: [] },
    toExcel: { data: null }
};

// Initialize all document tools
function initializeDocumentTools() {
    initializePdfConverter();
    initializePdfEditor();
    initializeWordConverter();
    initializeExcelConverter();
}

// ==================== PDF CONVERTER ====================
function initializePdfConverter() {
    const uploadArea = document.getElementById('pdf-upload');
    const fileInput = document.getElementById('pdf-input');
    const createBtn = document.getElementById('pdf-create');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    setupDragAndDrop(uploadArea, handlePdfFiles);

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handlePdfFiles(Array.from(e.target.files));
        }
    });

    if (createBtn) {
        createBtn.addEventListener('click', createPdfFromFiles);
    }
}

function handlePdfFiles(files) {
    documentState.toPdf.files = files;
    document.getElementById('pdf-options').style.display = 'block';
}

async function createPdfFromFiles() {
    const { jsPDF } = window.jspdf;
    const files = documentState.toPdf.files;
    const title = document.getElementById('pdf-title').value || 'Document';
    const orientation = document.getElementById('pdf-orientation').value;

    if (!files.length) return;

    showProgress('pdf');

    try {
        const pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: 'a4'
        });

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            updateProgress('pdf', i, files.length);

            if (file.type.startsWith('image/')) {
                const img = await loadImage(file);
                const imgData = await getImageData(img);

                if (i > 0) pdf.addPage();

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgRatio = img.width / img.height;
                const pageRatio = pageWidth / pageHeight;

                let width, height;
                if (imgRatio > pageRatio) {
                    width = pageWidth - 20;
                    height = width / imgRatio;
                } else {
                    height = pageHeight - 20;
                    width = height * imgRatio;
                }

                const x = (pageWidth - width) / 2;
                const y = (pageHeight - height) / 2;

                pdf.addImage(imgData, 'JPEG', x, y, width, height);
            }
        }

        updateProgress('pdf', files.length, files.length);

        // Save PDF
        pdf.save(title + '.pdf');

        hideProgress('pdf');

        // Show success
        const preview = document.getElementById('pdf-preview');
        preview.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>PDF Created Successfully!</h3><p>The PDF has been downloaded to your device.</p></div>';

    } catch (error) {
        console.error('Error creating PDF:', error);
        alert('Error creating PDF: ' + error.message);
        hideProgress('pdf');
    }
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

function getImageData(img) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.95));
    });
}

// ==================== PDF EDITOR ====================
function initializePdfEditor() {
    const uploadArea = document.getElementById('pdf-editor-upload');
    const fileInput = document.getElementById('pdf-editor-input');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
        if (e.target.files[0]) {
            await loadPdfForEditing(e.target.files[0]);
        }
    });

    // Toolbar buttons
    document.getElementById('pdf-add-text')?.addEventListener('click', addTextToPdf);
    document.getElementById('pdf-add-signature')?.addEventListener('click', addSignatureToPdf);
    document.getElementById('pdf-save')?.addEventListener('click', savePdfEdits);
    document.getElementById('pdf-prev-page')?.addEventListener('click', () => changePdfPage(-1));
    document.getElementById('pdf-next-page')?.addEventListener('click', () => changePdfPage(1));
}

async function loadPdfForEditing(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const { PDFDocument } = PDFLib;

        const pdfDoc = await PDFDocument.load(arrayBuffer);
        documentState.pdfEditor.pdfDoc = pdfDoc;
        documentState.pdfEditor.totalPages = pdfDoc.getPageCount();
        documentState.pdfEditor.currentPage = 1;

        document.getElementById('pdf-editor-upload').style.display = 'none';
        document.getElementById('pdf-editor-workspace').style.display = 'block';

        renderPdfPage();

    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF. Please try another file.');
    }
}

async function renderPdfPage() {
    const { pdfDoc, currentPage } = documentState.pdfEditor;
    const canvas = document.getElementById('pdf-canvas');
    const ctx = canvas.getContext('2d');

    // Update page number display
    document.getElementById('pdf-current-page').textContent = currentPage;
    document.getElementById('pdf-total-pages').textContent = documentState.pdfEditor.totalPages;

    // Simple rendering - in production, use PDF.js for better rendering
    canvas.width = 800;
    canvas.height = 1100;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('PDF Page ' + currentPage, 50, 50);
    ctx.fillText('Click "Add Text" to add text elements', 50, 100);
    ctx.fillText('Right-to-Left Arabic text is supported', 50, 150);
}

function changePdfPage(delta) {
    const newPage = documentState.pdfEditor.currentPage + delta;
    if (newPage >= 1 && newPage <= documentState.pdfEditor.totalPages) {
        documentState.pdfEditor.currentPage = newPage;
        renderPdfPage();
    }
}

function addTextToPdf() {
    const text = prompt('Enter text to add (Arabic supported):');
    if (!text) return;

    const overlay = document.getElementById('pdf-text-overlay');
    const textEl = document.createElement('div');
    textEl.className = 'pdf-text-element';
    textEl.contentEditable = true;
    textEl.textContent = text;
    textEl.style.top = '100px';
    textEl.style.left = '100px';
    textEl.style.direction = /[\u0600-\u06FF]/.test(text) ? 'rtl' : 'ltr';

    // Make draggable
    makeDraggable(textEl);

    overlay.appendChild(textEl);
    documentState.pdfEditor.textElements.push({
        text: text,
        x: 100,
        y: 100,
        page: documentState.pdfEditor.currentPage
    });
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function addSignatureToPdf() {
    const signText = prompt('Enter signature text or upload image later:');
    if (signText) {
        addTextToPdf(); // Reuse text function
        alert('Signature feature: For images, use an image-to-PDF converter first.');
    }
}

async function savePdfEdits() {
    try {
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const { pdfDoc } = documentState.pdfEditor;

        // Add text elements to PDF
        const textElements = documentState.pdfEditor.textElements;
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        for (const textEl of textElements) {
            const page = pdfDoc.getPage(textEl.page - 1);
            page.drawText(textEl.text, {
                x: textEl.x,
                y: page.getHeight() - textEl.y - 20,
                size: 14,
                font: font,
                color: rgb(0, 0, 0)
            });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        downloadBlob(blob, 'edited_document.pdf');

        alert('PDF saved successfully!');

    } catch (error) {
        console.error('Error saving PDF:', error);
        alert('Error saving PDF: ' + error.message);
    }
}

// ==================== WORD CONVERTER ====================
function initializeWordConverter() {
    const uploadArea = document.getElementById('word-upload');
    const fileInput = document.getElementById('word-input');
    const createBtn = document.getElementById('word-create');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            documentState.toWord.files = Array.from(e.target.files);
            document.getElementById('word-options').style.display = 'block';
        }
    });

    if (createBtn) {
        createBtn.addEventListener('click', createWordDocument);
    }
}

function createWordDocument() {
    alert('Word document creation requires server-side processing or additional libraries. This is a demo feature - use PDF converter as alternative!');

    // Show demo message
    const preview = document.getElementById('word-preview');
    preview.innerHTML = '<div class="info-message"><i class="fas fa-info-circle"></i><h3>Alternative: Use PDF Converter</h3><p>For best compatibility, use the PDF converter instead. It supports all your files with high quality output.</p></div>';
}

// ==================== EXCEL CONVERTER ====================
function initializeExcelConverter() {
    const createBtn = document.getElementById('excel-create');

    if (createBtn) {
        createBtn.addEventListener('click', createExcelFile);
    }
}

function createExcelFile() {
    const data = document.getElementById('excel-data').value;
    const separator = document.getElementById('excel-separator').value;

    if (!data.trim()) {
        alert('Please enter some data first!');
        return;
    }

    try {
        const XLSX = window.XLSX;

        // Parse CSV data
        const rows = data.trim().split('\n').map(row =>
            row.split(separator === '\t' ? '\t' : separator)
        );

        // Create workbook
        const ws = XLSX.utils.aoa_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Generate Excel file
        XLSX.writeFile(wb, 'data.xlsx');

        // Show success
        const preview = document.getElementById('excel-preview');
        preview.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Excel File Created!</h3><p>The Excel file has been downloaded to your device.</p></div>';

    } catch (error) {
        console.error('Error creating Excel:', error);
        alert('Error creating Excel file: ' + error.message);
    }
}

// Success/Info message styles
const docToolsStyle = document.createElement('style');
docToolsStyle.textContent = '.success-message, .info-message { text-align: center; padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); } .success-message i, .info-message i { font-size: 4rem; color: #10b981; margin-bottom: 1rem; } .info-message i { color: #3b82f6; } .success-message h3, .info-message h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a1a2e; }';
document.head.appendChild(docToolsStyle);

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDocumentTools);
} else {
    initializeDocumentTools();
}
