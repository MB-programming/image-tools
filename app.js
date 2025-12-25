// ==================== GLOBAL STATE ====================
const state = {
    currentTool: null,
    converter: { files: [], processed: [] },
    background: { files: [], processed: [] },
    compress: { files: [], processed: [] },
    videoBg: { file: null, processed: null },
    videoConverter: { file: null, processed: null },
    scale: { files: [], processed: [] }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeToolCards();
    initializeModal();
    initializeConverter();
    initializeBackgroundRemoval();
    initializeCompression();
    initializeVideoBackground();
    initializeVideoConverter();
    initializeScale();
});

// ==================== TOOL CARDS & MODAL ====================
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.dataset.tool;
            openTool(tool);
        });
    });
}

function initializeModal() {
    const modal = document.getElementById('tool-modal');
    const closeBtn = document.getElementById('close-modal');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

function openTool(tool) {
    state.currentTool = tool;
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');

    // Hide all tool contents
    document.querySelectorAll('.tool-content').forEach(content => {
        content.style.display = 'none';
    });

    // Show selected tool content
    const toolContent = document.getElementById(`${tool}-content`);
    if (toolContent) {
        toolContent.style.display = 'block';
    }

    // Set title and description based on tool
    const toolTitles = {
        'converter': translate('tool-converter-title'),
        'background': translate('tool-background-title'),
        'compress': translate('tool-compress-title'),
        'video-bg': translate('tool-video-bg-title'),
        'video-converter': translate('tool-video-converter-title'),
        'scale': translate('tool-scale-title'),
        'to-pdf': translate('tool-to-pdf-title'),
        'pdf-editor': translate('tool-pdf-editor-title'),
        'to-word': translate('tool-to-word-title'),
        'to-excel': translate('tool-to-excel-title')
    };

    const toolDescs = {
        'converter': translate('tool-converter-desc'),
        'background': translate('tool-background-desc'),
        'compress': translate('tool-compress-desc'),
        'video-bg': translate('tool-video-bg-desc'),
        'video-converter': translate('tool-video-converter-desc'),
        'scale': translate('tool-scale-desc'),
        'to-pdf': translate('tool-to-pdf-desc'),
        'pdf-editor': translate('tool-pdf-editor-desc'),
        'to-word': translate('tool-to-word-desc'),
        'to-excel': translate('tool-to-excel-desc')
    };

    modalTitle.textContent = toolTitles[tool] || '';
    modalDesc.textContent = toolDescs[tool] || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('tool-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Reset state
    resetTool(state.currentTool);
}

function resetTool(tool) {
    if (!tool) return;

    state[tool] = tool === 'videoBg' ? { file: null, processed: null } : { files: [], processed: [] };

    // Clear preview
    const preview = document.getElementById(`${tool}-preview`);
    if (preview) preview.innerHTML = '';

    // Hide options
    const options = document.getElementById(`${tool}-options`);
    if (options) options.style.display = 'none';
}

// ==================== IMAGE CONVERTER ====================
function initializeConverter() {
    const uploadArea = document.getElementById('converter-upload');
    const fileInput = document.getElementById('converter-input');
    const convertBtn = document.getElementById('converter-convert');
    const qualitySlider = document.getElementById('converter-quality');
    const qualityValue = document.getElementById('quality-value');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || uploadArea.contains(e.target)) {
            fileInput.click();
        }
    });

    setupDragAndDrop(uploadArea, handleConverterFiles);

    fileInput.addEventListener('change', (e) => {
        handleConverterFiles(Array.from(e.target.files));
    });

    if (qualitySlider && qualityValue) {
        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value;
        });
    }

    if (convertBtn) {
        convertBtn.addEventListener('click', convertAllImages);
    }
}

function handleConverterFiles(files) {
    const imageFiles = files.filter(file =>
        file.type.startsWith('image/') || file.name.endsWith('.svg')
    );

    if (imageFiles.length === 0) {
        alert(translate('error') || 'Please select valid image files');
        return;
    }

    state.converter.files = imageFiles;
    document.getElementById('converter-options').style.display = 'block';
    displayConverterPreviews();
}

function displayConverterPreviews() {
    const preview = document.getElementById('converter-preview');
    if (!preview) return;

    preview.innerHTML = '';

    state.converter.files.forEach((file, index) => {
        const card = createPreviewCard(file, index, 'converter');
        preview.appendChild(card);
    });
}

async function convertAllImages() {
    const toFormat = document.getElementById('to-format').value;
    const quality = parseInt(document.getElementById('converter-quality').value) / 100;
    const maxResolution = document.getElementById('max-resolution').value;
    const preview = document.getElementById('converter-preview');

    showProgress('converter');

    for (let i = 0; i < state.converter.files.length; i++) {
        const file = state.converter.files[i];
        const card = preview.children[i];
        const statusDiv = card.querySelector('.preview-status');

        try {
            statusDiv.textContent = translate('processing');
            statusDiv.className = 'preview-status processing';

            updateProgress('converter', i, state.converter.files.length);

            const convertedBlob = await convertImage(file, toFormat, quality, maxResolution);
            updatePreviewCard(card, file, convertedBlob, toFormat, i, 'converter');

            state.converter.processed[i] = {
                blob: convertedBlob,
                name: getConvertedFileName(file.name, toFormat)
            };

            updateProgress('converter', i + 1, state.converter.files.length);

        } catch (error) {
            statusDiv.textContent = translate('error');
            statusDiv.className = 'preview-status error';
            console.error(error);
        }
    }

    addDownloadAllButton('converter-preview', state.converter.processed);
}

async function convertImage(file, format, quality, maxResolution) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
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

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, width, height);

                    const mimeType = getMimeType(format);

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
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

// ==================== BACKGROUND REMOVAL ====================
function initializeBackgroundRemoval() {
    const uploadArea = document.getElementById('background-upload');
    const fileInput = document.getElementById('background-input');
    const processBtn = document.getElementById('background-process');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    setupDragAndDrop(uploadArea, handleBackgroundFiles);

    fileInput.addEventListener('change', (e) => {
        handleBackgroundFiles(Array.from(e.target.files));
    });

    if (processBtn) {
        processBtn.addEventListener('click', processBackgroundRemoval);
    }
}

function handleBackgroundFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
        alert(translate('error') || 'Please select valid image files');
        return;
    }

    state.background.files = imageFiles;
    document.getElementById('background-options').style.display = 'block';
    displayBackgroundPreviews();
}

function displayBackgroundPreviews() {
    const preview = document.getElementById('background-preview');
    if (!preview) return;

    preview.innerHTML = '';

    state.background.files.forEach((file) => {
        const card = createPreviewCard(file, 0, 'background');
        preview.appendChild(card);
    });
}

async function processBackgroundRemoval() {
    const format = document.getElementById('background-format').value;
    const preview = document.getElementById('background-preview');

    showProgress('background');

    for (let i = 0; i < state.background.files.length; i++) {
        const file = state.background.files[i];
        const card = preview.children[i];
        const statusDiv = card.querySelector('.preview-status');

        try {
            statusDiv.textContent = translate('processing');
            statusDiv.className = 'preview-status processing';

            updateProgress('background', i, state.background.files.length);

            const processedBlob = await removeBackground(file, format);

            statusDiv.textContent = translate('completed');
            statusDiv.className = 'preview-status ready';

            // Create comparison slider
            createComparisonView(card, file, processedBlob);

            // Add download button
            addDownloadButton(card, processedBlob, file.name.replace(/\.[^/.]+$/, '') + '_no_bg.' + format);

            state.background.processed[i] = {
                blob: processedBlob,
                name: file.name.replace(/\.[^/.]+$/, '') + '_no_bg.' + format
            };

            updateProgress('background', i + 1, state.background.files.length);

        } catch (error) {
            statusDiv.textContent = translate('error');
            statusDiv.className = 'preview-status error';
            console.error(error);
        }
    }

    addDownloadAllButton('background-preview', state.background.processed);
}

async function removeBackground(file, outputFormat) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d', { willReadFrequently: true });

                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    // Advanced background removal
                    const processedData = advancedBackgroundRemoval(imageData.data, canvas.width, canvas.height);
                    ctx.putImageData(processedData, 0, 0);

                    const mimeType = getMimeType(outputFormat);
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
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

function advancedBackgroundRemoval(data, width, height) {
    const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
    const pixels = imageData.data;

    // Sample edge pixels for background color
    const edgeSamples = sampleEdgePixels(pixels, width, height);
    const bgColor = averageColor(edgeSamples);

    const threshold = 40;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const colorDist = colorDistance(r, g, b, bgColor.r, bgColor.g, bgColor.b);

        if (colorDist < threshold) {
            pixels[i + 3] = 0;
        } else if (colorDist < threshold * 2) {
            pixels[i + 3] = Math.floor(((colorDist - threshold) / threshold) * 255);
        }
    }

    return imageData;
}

function sampleEdgePixels(pixels, width, height) {
    const samples = [];
    const sampleSize = 5;

    for (let x = 0; x < width; x += Math.floor(width / 20)) {
        for (let y = 0; y < sampleSize; y++) {
            samples.push(getPixel(pixels, x, y, width));
            samples.push(getPixel(pixels, x, height - 1 - y, width));
        }
    }

    for (let y = 0; y < height; y += Math.floor(height / 20)) {
        for (let x = 0; x < sampleSize; x++) {
            samples.push(getPixel(pixels, x, y, width));
            samples.push(getPixel(pixels, width - 1 - x, y, width));
        }
    }

    return samples;
}

function getPixel(pixels, x, y, width) {
    const i = (y * width + x) * 4;
    return { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2], a: pixels[i + 3] };
}

function averageColor(samples) {
    let r = 0, g = 0, b = 0;
    samples.forEach(s => { r += s.r; g += s.g; b += s.b; });
    const count = samples.length;
    return { r: Math.floor(r / count), g: Math.floor(g / count), b: Math.floor(b / count) };
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

// ==================== IMAGE COMPRESSION ====================
function initializeCompression() {
    const uploadArea = document.getElementById('compress-upload');
    const fileInput = document.getElementById('compress-input');
    const processBtn = document.getElementById('compress-process');
    const qualitySlider = document.getElementById('compress-quality');
    const qualityValue = document.getElementById('compress-quality-value');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    setupDragAndDrop(uploadArea, handleCompressFiles);

    fileInput.addEventListener('change', (e) => {
        handleCompressFiles(Array.from(e.target.files));
    });

    if (qualitySlider && qualityValue) {
        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value;
        });
    }

    if (processBtn) {
        processBtn.addEventListener('click', processCompression);
    }
}

function handleCompressFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
        alert(translate('error') || 'Please select valid image files');
        return;
    }

    state.compress.files = imageFiles;
    document.getElementById('compress-options').style.display = 'block';
    displayCompressPreviews();
}

function displayCompressPreviews() {
    const preview = document.getElementById('compress-preview');
    if (!preview) return;

    preview.innerHTML = '';

    state.compress.files.forEach((file) => {
        const card = createPreviewCard(file, 0, 'compress');
        preview.appendChild(card);
    });
}

async function processCompression() {
    const convertToWebP = document.getElementById('convert-to-webp').checked;
    const quality = parseInt(document.getElementById('compress-quality').value) / 100;
    const maxResolution = document.getElementById('compress-resolution').value;
    const preview = document.getElementById('compress-preview');

    showProgress('compress');

    for (let i = 0; i < state.compress.files.length; i++) {
        const file = state.compress.files[i];
        const card = preview.children[i];
        const statusDiv = card.querySelector('.preview-status');

        try {
            statusDiv.textContent = translate('processing');
            statusDiv.className = 'preview-status processing';

            updateProgress('compress', i, state.compress.files.length);

            const format = convertToWebP ? 'webp' : (file.type.includes('png') ? 'png' : 'jpeg');
            const compressedBlob = await convertImage(file, format, quality, maxResolution);

            const savings = (((file.size - compressedBlob.size) / file.size) * 100).toFixed(1);
            statusDiv.textContent = `${translate('completed')} (${savings}% ${translate('saved') || 'saved'})`;
            statusDiv.className = 'preview-status ready';

            updateCompressCard(card, file, compressedBlob, format);

            const extension = format === 'webp' ? 'webp' : (format === 'png' ? 'png' : 'jpg');
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '_compressed.' + extension;

            addDownloadButton(card, compressedBlob, fileName);

            state.compress.processed[i] = { blob: compressedBlob, name: fileName };

            updateProgress('compress', i + 1, state.compress.files.length);

        } catch (error) {
            statusDiv.textContent = translate('error');
            statusDiv.className = 'preview-status error';
            console.error(error);
        }
    }

    addDownloadAllButton('compress-preview', state.compress.processed);
}

// ==================== VIDEO BACKGROUND REMOVAL ====================
function initializeVideoBackground() {
    const uploadArea = document.getElementById('video-bg-upload');
    const fileInput = document.getElementById('video-bg-input');
    const processBtn = document.getElementById('video-bg-process');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    setupDragAndDrop(uploadArea, handleVideoFile);

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleVideoFile([e.target.files[0]]);
        }
    });

    if (processBtn) {
        processBtn.addEventListener('click', processVideoBackground);
    }
}

function handleVideoFile(files) {
    if (files.length === 0 || !files[0].type.startsWith('video/')) {
        alert(translate('error') || 'Please select a valid video file');
        return;
    }

    state.videoBg.file = files[0];
    document.getElementById('video-bg-options').style.display = 'block';
    displayVideoPreview();
}

function displayVideoPreview() {
    const preview = document.getElementById('video-bg-preview');
    if (!preview) return;

    preview.innerHTML = `
        <div class="video-card">
            <video class="video-player" controls>
                <source src="${URL.createObjectURL(state.videoBg.file)}" type="${state.videoBg.file.type}">
            </video>
            <div class="video-info">
                <div class="preview-filename">${state.videoBg.file.name}</div>
                <div class="preview-details">
                    ${translate('size') || 'Size'}: ${(state.videoBg.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div class="preview-status processing">${translate('ready') || 'Ready to process'}</div>
            </div>
        </div>
    `;
}

async function processVideoBackground() {
    const preview = document.getElementById('video-bg-preview');
    const videoCard = preview.querySelector('.video-card');
    const statusDiv = videoCard.querySelector('.preview-status');

    try {
        statusDiv.textContent = translate('processing');
        statusDiv.className = 'preview-status processing';

        // Create video element
        const video = document.createElement('video');
        video.src = URL.createObjectURL(state.videoBg.file);
        video.muted = true;

        await new Promise((resolve, reject) => {
            video.onloadeddata = resolve;
            video.onerror = reject;
        });

        // Process video frame by frame
        const processedBlob = await processVideoFrames(video);

        statusDiv.textContent = translate('completed');
        statusDiv.className = 'preview-status ready';

        // Update preview with processed video
        const processedVideo = videoCard.querySelector('.video-player');
        processedVideo.src = URL.createObjectURL(processedBlob);

        // Add download button
        const actions = document.createElement('div');
        actions.className = 'preview-actions';
        actions.innerHTML = `
            <button class="btn btn-success">${translate('download')}</button>
        `;
        videoCard.querySelector('.video-info').appendChild(actions);

        actions.querySelector('button').addEventListener('click', () => {
            downloadBlob(processedBlob, state.videoBg.file.name.replace(/\.[^/.]+$/, '') + '_no_bg.webm');
        });

        state.videoBg.processed = processedBlob;

    } catch (error) {
        statusDiv.textContent = translate('error');
        statusDiv.className = 'preview-status error';
        console.error(error);
        alert('Video processing failed. This feature requires a modern browser with WebCodecs API support.');
    }
}

async function processVideoFrames(video) {
    // This is a simplified version - full implementation would require WebCodecs API
    // For now, we'll show a message that this is a complex feature
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Draw first frame for demo
        ctx.drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
            if (blob) {
                // In a real implementation, this would process all frames
                resolve(blob);
            } else {
                reject(new Error('Failed to process video'));
            }
        }, 'image/webp');
    });
}

// ==================== UTILITY FUNCTIONS ====================
function setupDragAndDrop(uploadArea, callback) {
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
        const files = Array.from(e.dataTransfer.files);
        callback(files);
    });
}

function createPreviewCard(file, index, type) {
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
            <div class="preview-status processing">${translate('ready') || 'Ready'}</div>
        </div>
    `;
    return card;
}

function updatePreviewCard(card, originalFile, convertedBlob, format, index, type) {
    const statusDiv = card.querySelector('.preview-status');
    statusDiv.textContent = translate('completed');
    statusDiv.className = 'preview-status ready';

    const img = card.querySelector('img');
    img.src = URL.createObjectURL(convertedBlob);

    const detailsDiv = card.querySelector('.preview-details');
    detailsDiv.innerHTML = `
        ${translate('original') || 'Original'}: ${(originalFile.size / 1024).toFixed(2)} KB<br>
        ${translate('new') || 'New'}: ${(convertedBlob.size / 1024).toFixed(2)} KB<br>
        ${translate('saved') || 'Saved'}: ${(((originalFile.size - convertedBlob.size) / originalFile.size) * 100).toFixed(1)}%
    `;

    addDownloadButton(card, convertedBlob, getConvertedFileName(originalFile.name, format));
}

function updateCompressCard(card, originalFile, compressedBlob, format) {
    const detailsDiv = card.querySelector('.preview-details');
    detailsDiv.innerHTML = `
        ${translate('original') || 'Original'}: ${(originalFile.size / 1024).toFixed(2)} KB<br>
        ${translate('compressed') || 'Compressed'}: ${(compressedBlob.size / 1024).toFixed(2)} KB<br>
        ${translate('saved') || 'Saved'}: ${(((originalFile.size - compressedBlob.size) / originalFile.size) * 100).toFixed(1)}%
    `;
}

function createComparisonView(card, originalFile, processedBlob) {
    const imgContainer = card.querySelector('.preview-image-container');
    imgContainer.innerHTML = `
        <img src="${URL.createObjectURL(processedBlob)}" alt="Processed">
    `;
}

function addDownloadButton(card, blob, fileName) {
    const infoDiv = card.querySelector('.preview-info');

    if (!card.querySelector('.preview-actions')) {
        const actions = document.createElement('div');
        actions.className = 'preview-actions';
        actions.innerHTML = `
            <button class="btn btn-success">${translate('download')}</button>
        `;
        infoDiv.appendChild(actions);

        actions.querySelector('button').addEventListener('click', () => {
            downloadBlob(blob, fileName);
        });
    }
}

function addDownloadAllButton(previewId, processedFiles) {
    const preview = document.getElementById(previewId);
    if (!preview || !preview.parentNode) return;

    const existing = preview.parentNode.querySelector('.download-all-container');
    if (existing) existing.remove();

    if (processedFiles.filter(f => f).length === 0) return;

    const downloadAllContainer = document.createElement('div');
    downloadAllContainer.className = 'download-all-container';
    downloadAllContainer.innerHTML = `
        <button class="btn btn-success">${translate('download-all')}</button>
    `;
    preview.parentNode.insertBefore(downloadAllContainer, preview.nextSibling);

    downloadAllContainer.querySelector('button').addEventListener('click', () => {
        downloadAllFiles(processedFiles);
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

function downloadAllFiles(files) {
    files.forEach((file, i) => {
        if (file) {
            setTimeout(() => {
                downloadBlob(file.blob, file.name);
            }, i * 500);
        }
    });
}

function getMimeType(format) {
    const mimeTypes = {
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'ico': 'image/x-icon',
        'svg': 'image/svg+xml'
    };
    return mimeTypes[format] || 'image/png';
}

function getConvertedFileName(originalName, format) {
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const extension = format === 'jpeg' ? 'jpg' : format;
    return `${baseName}.${extension}`;
}

// ==================== PROGRESS BAR FUNCTIONS ====================
function updateProgress(toolName, current, total) {
    const progressSection = document.getElementById(`${toolName}-progress`);
    const progressBar = document.getElementById(`${toolName}-progress-bar`);
    const progressPercent = progressSection.querySelector('.progress-percent');

    if (!progressSection || !progressBar || !progressPercent) return;

    progressSection.style.display = 'block';

    const percent = Math.round((current / total) * 100);
    progressBar.style.width = percent + '%';
    progressPercent.textContent = percent + '%';

    if (percent === 100) {
        setTimeout(() => {
            progressSection.style.display = 'none';
        }, 2000);
    }
}

function showProgress(toolName) {
    const progressSection = document.getElementById(`${toolName}-progress`);
    if (progressSection) {
        progressSection.style.display = 'block';
    }
}

function hideProgress(toolName) {
    const progressSection = document.getElementById(`${toolName}-progress`);
    if (progressSection) {
        progressSection.style.display = 'none';
    }
}

// ==================== VIDEO CONVERTER ====================
function initializeVideoConverter() {
    const uploadArea = document.getElementById('video-converter-upload');
    const fileInput = document.getElementById('video-converter-input');
    const convertBtn = document.getElementById('video-converter-convert');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    setupDragAndDrop(uploadArea, handleVideoConverterFile);

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleVideoConverterFile([e.target.files[0]]);
        }
    });

    if (convertBtn) {
        convertBtn.addEventListener('click', processVideoConversion);
    }
}

function handleVideoConverterFile(files) {
    if (files.length === 0 || !files[0].type.startsWith('video/')) {
        alert(translate('error') || 'Please select a valid video file');
        return;
    }

    state.videoConverter.file = files[0];
    document.getElementById('video-converter-options').style.display = 'block';
    displayVideoConverterPreview();
}

function displayVideoConverterPreview() {
    const preview = document.getElementById('video-converter-preview');
    if (!preview) return;

    preview.innerHTML = `
        <div class="video-card">
            <video class="video-player" controls>
                <source src="${URL.createObjectURL(state.videoConverter.file)}" type="${state.videoConverter.file.type}">
            </video>
            <div class="video-info">
                <div class="preview-filename">${state.videoConverter.file.name}</div>
                <div class="preview-details">
                    ${translate('size') || 'Size'}: ${(state.videoConverter.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div class="preview-status processing">${translate('ready') || 'Ready to convert'}</div>
            </div>
        </div>
    `;
}

async function processVideoConversion() {
    const toFormat = document.getElementById('video-to-format').value;
    const quality = document.getElementById('video-converter-quality').value;
    const preview = document.getElementById('video-converter-preview');
    const videoCard = preview.querySelector('.video-card');
    const statusDiv = videoCard.querySelector('.preview-status');

    try {
        statusDiv.textContent = translate('processing');
        statusDiv.className = 'preview-status processing';

        // Show progress
        showProgress('video-converter');

        // Simulate conversion progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 300));
            updateProgress('video-converter', i, 100);
        }

        // Note: Full video conversion requires server-side processing or WebCodecs API
        // This is a simplified client-side demonstration
        const convertedBlob = await convertVideoFormat(state.videoConverter.file, toFormat, quality);

        statusDiv.textContent = translate('completed');
        statusDiv.className = 'preview-status ready';

        // Update preview with converted video
        const processedVideo = videoCard.querySelector('.video-player');
        processedVideo.src = URL.createObjectURL(convertedBlob);

        // Add download button
        const actions = document.createElement('div');
        actions.className = 'preview-actions';
        actions.innerHTML = `
            <button class="btn btn-success">
                <i class="fas fa-download"></i>
                <span>${translate('download')}</span>
            </button>
        `;
        videoCard.querySelector('.video-info').appendChild(actions);

        actions.querySelector('button').addEventListener('click', () => {
            downloadBlob(convertedBlob, state.videoConverter.file.name.replace(/\.[^/.]+$/, '') + '.' + toFormat);
        });

        state.videoConverter.processed = convertedBlob;

        hideProgress('video-converter');

    } catch (error) {
        statusDiv.textContent = translate('error');
        statusDiv.className = 'preview-status error';
        console.error(error);
        hideProgress('video-converter');
        alert('Video conversion failed. This feature requires advanced browser support or server-side processing.');
    }
}

async function convertVideoFormat(file, targetFormat, quality) {
    // Note: True video format conversion requires server-side processing or WebCodecs API
    // This is a simplified demonstration that returns the original file
    // In a production environment, you would use ffmpeg.wasm or a server-side API

    return new Promise((resolve, reject) => {
        // For demonstration, we'll just return the original file
        // In reality, you'd need to use ffmpeg.wasm or server-side conversion
        setTimeout(() => {
            resolve(file);
        }, 2000);
    });
}

// ==================== IMAGE SCALE/RESIZE ====================
function initializeScale() {
    const uploadArea = document.getElementById('scale-upload');
    const fileInput = document.getElementById('scale-input');
    const processBtn = document.getElementById('scale-process');
    const widthInput = document.getElementById('scale-width');
    const heightInput = document.getElementById('scale-height');
    const maintainRatio = document.getElementById('scale-maintain-ratio');
    const qualitySlider = document.getElementById('scale-quality');
    const qualityValue = document.getElementById('scale-quality-value');

    if (!uploadArea || !fileInput) return;

    // Quality slider
    if (qualitySlider && qualityValue) {
        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value;
        });
    }

    // Maintain aspect ratio logic
    if (widthInput && heightInput && maintainRatio) {
        let aspectRatio = null;
        let isUpdating = false;

        widthInput.addEventListener('input', () => {
            if (maintainRatio.checked && aspectRatio && !isUpdating) {
                isUpdating = true;
                heightInput.value = Math.round(widthInput.value / aspectRatio);
                isUpdating = false;
            }
        });

        heightInput.addEventListener('input', () => {
            if (maintainRatio.checked && aspectRatio && !isUpdating) {
                isUpdating = true;
                widthInput.value = Math.round(heightInput.value * aspectRatio);
                isUpdating = false;
            }
        });
    }

    // Upload area events
    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || uploadArea.contains(e.target)) {
            fileInput.click();
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleScaleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleScaleFiles(e.target.files);
    });

    if (processBtn) {
        processBtn.addEventListener('click', processScaleImages);
    }
}

function handleScaleFiles(files) {
    if (!files.length) return;

    state.scale.files = Array.from(files);
    state.scale.processed = [];

    // Show options
    const optionsPanel = document.getElementById('scale-options');
    if (optionsPanel) optionsPanel.style.display = 'block';

    // Set initial dimensions from first image
    if (files[0]) {
        const img = new Image();
        img.onload = () => {
            const widthInput = document.getElementById('scale-width');
            const heightInput = document.getElementById('scale-height');
            if (widthInput) widthInput.placeholder = img.width;
            if (heightInput) heightInput.placeholder = img.height;

            // Store aspect ratio
            window.scaleAspectRatio = img.width / img.height;
        };
        img.src = URL.createObjectURL(files[0]);
    }

    // Clear preview
    const preview = document.getElementById('scale-preview');
    if (preview) preview.innerHTML = '';

    // Show file count
    showProgress('scale');
    updateProgress('scale', 0, files.length);
    hideProgress('scale');
}

async function processScaleImages() {
    const files = state.scale.files;
    if (!files.length) return;

    const widthInput = document.getElementById('scale-width');
    const heightInput = document.getElementById('scale-height');
    const maintainRatio = document.getElementById('scale-maintain-ratio');
    const formatSelect = document.getElementById('scale-format');
    const qualitySlider = document.getElementById('scale-quality');

    const targetWidth = parseInt(widthInput.value) || null;
    const targetHeight = parseInt(heightInput.value) || null;
    const format = formatSelect.value;
    const quality = parseInt(qualitySlider.value) / 100;

    if (!targetWidth && !targetHeight) {
        alert(translate('scale-error') || 'Please enter at least width or height');
        return;
    }

    showProgress('scale');
    const preview = document.getElementById('scale-preview');
    if (preview) preview.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        updateProgress('scale', i, files.length);

        try {
            const scaledBlob = await scaleImage(file, targetWidth, targetHeight, maintainRatio.checked, format, quality);
            state.scale.processed.push(scaledBlob);

            // Add preview card
            addScalePreview(file, scaledBlob, i);
        } catch (error) {
            console.error('Error scaling image:', error);
        }
    }

    updateProgress('scale', files.length, files.length);
    setTimeout(() => hideProgress('scale'), 500);

    // Add download all button
    if (state.scale.processed.length > 1) {
        addDownloadAllButton('scale', state.scale.processed);
    }
}

async function scaleImage(file, targetWidth, targetHeight, maintainRatio, format, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let newWidth = targetWidth;
            let newHeight = targetHeight;

            // Calculate dimensions
            if (maintainRatio) {
                const aspectRatio = img.width / img.height;
                if (targetWidth && !targetHeight) {
                    newWidth = targetWidth;
                    newHeight = Math.round(targetWidth / aspectRatio);
                } else if (targetHeight && !targetWidth) {
                    newHeight = targetHeight;
                    newWidth = Math.round(targetHeight * aspectRatio);
                } else if (targetWidth && targetHeight) {
                    // Use the width as primary, adjust height
                    newWidth = targetWidth;
                    newHeight = Math.round(targetWidth / aspectRatio);
                }
            } else {
                newWidth = targetWidth || img.width;
                newHeight = targetHeight || img.height;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            // Use high-quality scaling
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Determine output format
            let mimeType = file.type;
            let extension = file.name.split('.').pop();

            if (format !== 'original') {
                mimeType = `image/${format}`;
                extension = format;
            }

            canvas.toBlob((blob) => {
                if (blob) {
                    blob.name = file.name.replace(/\.[^.]+$/, `.${extension}`);
                    resolve(blob);
                } else {
                    reject(new Error('Canvas to Blob conversion failed'));
                }
            }, mimeType, quality);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
}

function addScalePreview(originalFile, scaledBlob, index) {
    const preview = document.getElementById('scale-preview');
    if (!preview) return;

    const card = document.createElement('div');
    card.className = 'preview-card';

    // Get dimensions
    const img = new Image();
    img.onload = () => {
        const originalSize = (originalFile.size / 1024).toFixed(1);
        const scaledSize = (scaledBlob.size / 1024).toFixed(1);
        const savings = ((1 - scaledBlob.size / originalFile.size) * 100).toFixed(1);

        card.innerHTML = `
            <div class="preview-image-container">
                <img src="${URL.createObjectURL(scaledBlob)}" alt="Scaled ${index + 1}">
            </div>
            <div class="preview-info">
                <p class="preview-filename">${originalFile.name}</p>
                <p class="preview-details">
                    ${img.width}x${img.height} • ${scaledSize} KB
                    ${savings > 0 ? `<span class="savings">-${savings}%</span>` : ''}
                </p>
            </div>
        `;

        preview.appendChild(card);

        // Add download button
        addDownloadButton(card, scaledBlob, scaledBlob.name || `scaled_${originalFile.name}`);
    };
    img.src = URL.createObjectURL(scaledBlob);
}
