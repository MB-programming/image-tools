// Global state
const state = {
    converter: {
        files: [],
        processed: []
    },
    background: {
        files: [],
        processed: []
    },
    compress: {
        files: [],
        processed: []
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeConverter();
    initializeBackgroundRemoval();
    initializeCompression();
});

// Tab Management
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tool-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// ==================== IMAGE FORMAT CONVERTER ====================

function initializeConverter() {
    const uploadArea = document.getElementById('converter-upload');
    const fileInput = document.getElementById('converter-input');
    const formatSelect = document.getElementById('converter-format');
    const qualitySlider = document.getElementById('converter-quality');
    const qualityValue = document.getElementById('quality-value');
    const convertBtn = document.getElementById('converter-convert');
    const qualityGroup = document.getElementById('quality-group');

    // Upload area click
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    setupDragAndDrop(uploadArea, fileInput, (files) => {
        handleConverterFiles(files);
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleConverterFiles(e.target.files);
    });

    // Format change - show/hide quality
    formatSelect.addEventListener('change', () => {
        const format = formatSelect.value;
        if (format === 'png' || format === 'bmp' || format === 'ico') {
            qualityGroup.style.display = 'none';
        } else {
            qualityGroup.style.display = 'block';
        }
    });

    // Quality slider
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value;
    });

    // Convert button
    convertBtn.addEventListener('click', () => {
        convertAllImages();
    });
}

function handleConverterFiles(files) {
    state.converter.files = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (state.converter.files.length === 0) {
        alert('الرجاء اختيار ملفات صور صحيحة');
        return;
    }

    document.getElementById('converter-options').style.display = 'block';
    displayConverterPreviews();
}

function displayConverterPreviews() {
    const preview = document.getElementById('converter-preview');
    preview.innerHTML = '';

    state.converter.files.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <div class="preview-image-container">
                <img src="${URL.createObjectURL(file)}" alt="${file.name}">
            </div>
            <div class="preview-info">
                <div class="preview-filename">${file.name}</div>
                <div class="preview-details">
                    ${(file.size / 1024).toFixed(2)} KB
                </div>
                <div class="preview-status processing">جاهز للتحويل</div>
            </div>
        `;
        preview.appendChild(card);
    });
}

async function convertAllImages() {
    const format = document.getElementById('converter-format').value;
    const quality = parseInt(document.getElementById('converter-quality').value) / 100;
    const maxResolution = document.getElementById('max-resolution').value;
    const preview = document.getElementById('converter-preview');

    for (let i = 0; i < state.converter.files.length; i++) {
        const file = state.converter.files[i];
        const card = preview.children[i];
        const statusDiv = card.querySelector('.preview-status');
        const infoDiv = card.querySelector('.preview-info');

        try {
            statusDiv.textContent = 'جاري التحويل...';
            statusDiv.className = 'preview-status processing';

            const convertedBlob = await convertImage(file, format, quality, maxResolution);
            const convertedSize = (convertedBlob.size / 1024).toFixed(2);

            statusDiv.textContent = 'تم التحويل ✓';
            statusDiv.className = 'preview-status ready';

            // Update preview with converted image
            const img = card.querySelector('img');
            img.src = URL.createObjectURL(convertedBlob);

            // Update details
            const detailsDiv = card.querySelector('.preview-details');
            detailsDiv.innerHTML = `
                الحجم الأصلي: ${(file.size / 1024).toFixed(2)} KB<br>
                الحجم الجديد: ${convertedSize} KB<br>
                التوفير: ${(((file.size - convertedBlob.size) / file.size) * 100).toFixed(1)}%
            `;

            // Add download button
            if (!card.querySelector('.preview-actions')) {
                const actions = document.createElement('div');
                actions.className = 'preview-actions';
                actions.innerHTML = `
                    <button class="btn btn-success download-btn">تحميل</button>
                `;
                infoDiv.appendChild(actions);

                actions.querySelector('.download-btn').addEventListener('click', () => {
                    const fileName = file.name.replace(/\.[^/.]+$/, '') + '.' + format.replace('jpeg', 'jpg');
                    downloadBlob(convertedBlob, fileName);
                });
            }

            state.converter.processed[i] = {
                blob: convertedBlob,
                name: file.name.replace(/\.[^/.]+$/, '') + '.' + format.replace('jpeg', 'jpg')
            };

        } catch (error) {
            statusDiv.textContent = 'خطأ في التحويل';
            statusDiv.className = 'preview-status error';
            console.error(error);
        }
    }

    // Add "Download All" button
    if (!document.querySelector('.download-all-container')) {
        const downloadAllContainer = document.createElement('div');
        downloadAllContainer.className = 'download-all-container';
        downloadAllContainer.innerHTML = `
            <button class="btn btn-success">تحميل الكل كملف مضغوط</button>
        `;
        preview.parentNode.insertBefore(downloadAllContainer, preview.nextSibling);

        downloadAllContainer.querySelector('button').addEventListener('click', () => {
            downloadAllAsZip(state.converter.processed);
        });
    }
}

async function convertImage(file, format, quality, maxResolution) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            try {
                let width = img.width;
                let height = img.height;

                // Apply max resolution
                if (maxResolution !== 'original') {
                    const max = parseInt(maxResolution);
                    if (width > height && width > max) {
                        height = (height / width) * max;
                        width = max;
                    } else if (height > max) {
                        width = (width / height) * max;
                        height = max;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                // For better quality scaling
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.drawImage(img, 0, 0, width, height);

                const mimeType = format === 'jpeg' ? 'image/jpeg' :
                                format === 'webp' ? 'image/webp' :
                                format === 'bmp' ? 'image/bmp' :
                                'image/png';

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to convert image'));
                    }
                }, mimeType, quality);

            } catch (error) {
                reject(error);
            }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
}

// ==================== BACKGROUND REMOVAL ====================

function initializeBackgroundRemoval() {
    const uploadArea = document.getElementById('background-upload');
    const fileInput = document.getElementById('background-input');
    const processBtn = document.getElementById('background-process');

    uploadArea.addEventListener('click', () => fileInput.click());

    setupDragAndDrop(uploadArea, fileInput, (files) => {
        handleBackgroundFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        handleBackgroundFiles(e.target.files);
    });

    processBtn.addEventListener('click', () => {
        processBackgroundRemoval();
    });
}

function handleBackgroundFiles(files) {
    state.background.files = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (state.background.files.length === 0) {
        alert('الرجاء اختيار ملفات صور صحيحة');
        return;
    }

    document.getElementById('background-options').style.display = 'block';
    displayBackgroundPreviews();
}

function displayBackgroundPreviews() {
    const preview = document.getElementById('background-preview');
    preview.innerHTML = '';

    state.background.files.forEach((file) => {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <div class="preview-image-container">
                <img src="${URL.createObjectURL(file)}" alt="${file.name}">
            </div>
            <div class="preview-info">
                <div class="preview-filename">${file.name}</div>
                <div class="preview-details">
                    ${(file.size / 1024).toFixed(2)} KB
                </div>
                <div class="preview-status processing">جاهز للمعالجة</div>
            </div>
        `;
        preview.appendChild(card);
    });
}

async function processBackgroundRemoval() {
    const format = document.getElementById('background-format').value;
    const preview = document.getElementById('background-preview');

    for (let i = 0; i < state.background.files.length; i++) {
        const file = state.background.files[i];
        const card = preview.children[i];
        const statusDiv = card.querySelector('.preview-status');
        const infoDiv = card.querySelector('.preview-info');

        try {
            statusDiv.textContent = 'جاري إزالة الخلفية...';
            statusDiv.className = 'preview-status processing';

            const processedBlob = await removeBackground(file, format);

            statusDiv.textContent = 'تمت الإزالة ✓';
            statusDiv.className = 'preview-status ready';

            // Create comparison view
            const imgContainer = card.querySelector('.preview-image-container');
            imgContainer.innerHTML = `
                <div class="comparison-container">
                    <div class="comparison-before">
                        <img src="${URL.createObjectURL(file)}" alt="Before">
                    </div>
                    <div class="comparison-after">
                        <img src="${URL.createObjectURL(processedBlob)}" alt="After">
                    </div>
                    <div class="comparison-slider"></div>
                </div>
            `;

            setupComparisonSlider(imgContainer.querySelector('.comparison-container'));

            // Add download button
            if (!card.querySelector('.preview-actions')) {
                const actions = document.createElement('div');
                actions.className = 'preview-actions';
                actions.innerHTML = `
                    <button class="btn btn-success download-btn">تحميل</button>
                `;
                infoDiv.appendChild(actions);

                actions.querySelector('.download-btn').addEventListener('click', () => {
                    const fileName = file.name.replace(/\.[^/.]+$/, '') + '_no_bg.' + format.replace('jpeg', 'jpg');
                    downloadBlob(processedBlob, fileName);
                });
            }

            state.background.processed[i] = {
                blob: processedBlob,
                name: file.name.replace(/\.[^/.]+$/, '') + '_no_bg.' + format.replace('jpeg', 'jpg')
            };

        } catch (error) {
            statusDiv.textContent = 'خطأ في المعالجة';
            statusDiv.className = 'preview-status error';
            console.error(error);
        }
    }

    // Add "Download All" button
    if (!document.querySelector('#background .download-all-container')) {
        const downloadAllContainer = document.createElement('div');
        downloadAllContainer.className = 'download-all-container';
        downloadAllContainer.innerHTML = `
            <button class="btn btn-success">تحميل الكل كملف مضغوط</button>
        `;
        preview.parentNode.insertBefore(downloadAllContainer, preview.nextSibling);

        downloadAllContainer.querySelector('button').addEventListener('click', () => {
            downloadAllAsZip(state.background.processed);
        });
    }
}

async function removeBackground(file, outputFormat) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });

                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Advanced background removal algorithm
                // This uses edge detection and color similarity
                const processedData = advancedBackgroundRemoval(data, canvas.width, canvas.height);

                ctx.putImageData(processedData, 0, 0);

                const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' :
                                outputFormat === 'webp' ? 'image/webp' :
                                'image/png';

                const quality = outputFormat === 'jpeg' ? 0.95 : 1.0;

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to process image'));
                    }
                }, mimeType, quality);

            } catch (error) {
                reject(error);
            }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
}

function advancedBackgroundRemoval(data, width, height) {
    const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
    const pixels = imageData.data;

    // Sample edge pixels to determine background color
    const edgeSamples = [];
    const sampleSize = 5;

    // Top and bottom edges
    for (let x = 0; x < width; x += Math.floor(width / 20)) {
        for (let y = 0; y < sampleSize; y++) {
            edgeSamples.push(getPixel(pixels, x, y, width));
            edgeSamples.push(getPixel(pixels, x, height - 1 - y, width));
        }
    }

    // Left and right edges
    for (let y = 0; y < height; y += Math.floor(height / 20)) {
        for (let x = 0; x < sampleSize; x++) {
            edgeSamples.push(getPixel(pixels, x, y, width));
            edgeSamples.push(getPixel(pixels, width - 1 - x, y, width));
        }
    }

    // Calculate average background color
    const bgColor = averageColor(edgeSamples);

    // Remove background based on color similarity
    const threshold = 40; // Adjust for sensitivity

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const colorDist = colorDistance(r, g, b, bgColor.r, bgColor.g, bgColor.b);

        if (colorDist < threshold) {
            pixels[i + 3] = 0; // Make transparent
        } else if (colorDist < threshold * 2) {
            // Gradual transparency for edge smoothing
            pixels[i + 3] = Math.floor(((colorDist - threshold) / threshold) * 255);
        }
    }

    return imageData;
}

function getPixel(pixels, x, y, width) {
    const i = (y * width + x) * 4;
    return {
        r: pixels[i],
        g: pixels[i + 1],
        b: pixels[i + 2],
        a: pixels[i + 3]
    };
}

function averageColor(samples) {
    let r = 0, g = 0, b = 0;
    samples.forEach(s => {
        r += s.r;
        g += s.g;
        b += s.b;
    });
    const count = samples.length;
    return {
        r: Math.floor(r / count),
        g: Math.floor(g / count),
        b: Math.floor(b / count)
    };
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(
        Math.pow(r1 - r2, 2) +
        Math.pow(g1 - g2, 2) +
        Math.pow(b1 - b2, 2)
    );
}

function setupComparisonSlider(container) {
    const slider = container.querySelector('.comparison-slider');
    const afterDiv = container.querySelector('.comparison-after');
    let isDragging = false;

    const updateSlider = (x) => {
        const rect = container.getBoundingClientRect();
        const pos = ((x - rect.left) / rect.width) * 100;
        const clampedPos = Math.max(0, Math.min(100, pos));

        slider.style.left = clampedPos + '%';
        afterDiv.style.clipPath = `polygon(${clampedPos}% 0, 100% 0, 100% 100%, ${clampedPos}% 100%)`;
    };

    slider.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mousemove', (e) => {
        if (isDragging) updateSlider(e.clientX);
    });

    // Touch support
    slider.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    container.addEventListener('touchmove', (e) => {
        if (isDragging) updateSlider(e.touches[0].clientX);
    });
}

// ==================== IMAGE COMPRESSION ====================

function initializeCompression() {
    const uploadArea = document.getElementById('compress-upload');
    const fileInput = document.getElementById('compress-input');
    const processBtn = document.getElementById('compress-process');
    const qualitySlider = document.getElementById('compress-quality');
    const qualityValue = document.getElementById('compress-quality-value');

    uploadArea.addEventListener('click', () => fileInput.click());

    setupDragAndDrop(uploadArea, fileInput, (files) => {
        handleCompressFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        handleCompressFiles(e.target.files);
    });

    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value;
    });

    processBtn.addEventListener('click', () => {
        processCompression();
    });
}

function handleCompressFiles(files) {
    state.compress.files = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (state.compress.files.length === 0) {
        alert('الرجاء اختيار ملفات صور صحيحة');
        return;
    }

    document.getElementById('compress-options').style.display = 'block';
    displayCompressPreviews();
}

function displayCompressPreviews() {
    const preview = document.getElementById('compress-preview');
    preview.innerHTML = '';

    state.compress.files.forEach((file) => {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <div class="preview-image-container">
                <img src="${URL.createObjectURL(file)}" alt="${file.name}">
            </div>
            <div class="preview-info">
                <div class="preview-filename">${file.name}</div>
                <div class="preview-details">
                    ${(file.size / 1024).toFixed(2)} KB
                </div>
                <div class="preview-status processing">جاهز للضغط</div>
            </div>
        `;
        preview.appendChild(card);
    });
}

async function processCompression() {
    const convertToWebP = document.getElementById('convert-to-webp').checked;
    const quality = parseInt(document.getElementById('compress-quality').value) / 100;
    const maxResolution = document.getElementById('compress-resolution').value;
    const preview = document.getElementById('compress-preview');

    for (let i = 0; i < state.compress.files.length; i++) {
        const file = state.compress.files[i];
        const card = preview.children[i];
        const statusDiv = card.querySelector('.preview-status');
        const infoDiv = card.querySelector('.preview-info');

        try {
            statusDiv.textContent = 'جاري الضغط...';
            statusDiv.className = 'preview-status processing';

            const format = convertToWebP ? 'webp' : (file.type.includes('png') ? 'png' : 'jpeg');
            const compressedBlob = await convertImage(file, format, quality, maxResolution);
            const compressedSize = (compressedBlob.size / 1024).toFixed(2);
            const savings = (((file.size - compressedBlob.size) / file.size) * 100).toFixed(1);

            statusDiv.textContent = `تم الضغط ✓ (وفّر ${savings}%)`;
            statusDiv.className = 'preview-status ready';

            // Update details
            const detailsDiv = card.querySelector('.preview-details');
            detailsDiv.innerHTML = `
                الحجم الأصلي: ${(file.size / 1024).toFixed(2)} KB<br>
                الحجم المضغوط: ${compressedSize} KB<br>
                التوفير: ${savings}%
            `;

            // Add download button
            if (!card.querySelector('.preview-actions')) {
                const actions = document.createElement('div');
                actions.className = 'preview-actions';
                actions.innerHTML = `
                    <button class="btn btn-success download-btn">تحميل</button>
                `;
                infoDiv.appendChild(actions);

                const extension = convertToWebP ? 'webp' : (format === 'png' ? 'png' : 'jpg');
                const fileName = file.name.replace(/\.[^/.]+$/, '') + '_compressed.' + extension;

                actions.querySelector('.download-btn').addEventListener('click', () => {
                    downloadBlob(compressedBlob, fileName);
                });

                state.compress.processed[i] = {
                    blob: compressedBlob,
                    name: fileName
                };
            }

        } catch (error) {
            statusDiv.textContent = 'خطأ في الضغط';
            statusDiv.className = 'preview-status error';
            console.error(error);
        }
    }

    // Add "Download All" button
    if (!document.querySelector('#compress .download-all-container')) {
        const downloadAllContainer = document.createElement('div');
        downloadAllContainer.className = 'download-all-container';
        downloadAllContainer.innerHTML = `
            <button class="btn btn-success">تحميل الكل كملف مضغوط</button>
        `;
        preview.parentNode.insertBefore(downloadAllContainer, preview.nextSibling);

        downloadAllContainer.querySelector('button').addEventListener('click', () => {
            downloadAllAsZip(state.compress.processed);
        });
    }
}

// ==================== UTILITY FUNCTIONS ====================

function setupDragAndDrop(uploadArea, fileInput, callback) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragging');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragging');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragging');
        const files = e.dataTransfer.files;
        callback(files);
    });
}

function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function downloadAllAsZip(processedFiles) {
    // Since we can't use external libraries, we'll download files individually
    // in a loop with delay
    if (processedFiles.length === 0) return;

    alert('سيتم تحميل جميع الملفات بشكل منفصل');

    for (let i = 0; i < processedFiles.length; i++) {
        if (processedFiles[i]) {
            setTimeout(() => {
                downloadBlob(processedFiles[i].blob, processedFiles[i].name);
            }, i * 500); // Delay between downloads
        }
    }
}
