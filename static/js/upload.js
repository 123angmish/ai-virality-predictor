// Drag & Drop Upload Management
document.addEventListener("DOMContentLoaded", function() {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("videoFile");
    const progressCard = document.getElementById("progressCard");
    const progressBar = document.getElementById("progressBar");
    const progressStatus = document.getElementById("progressStatus");
    const progressPercent = document.getElementById("progressPercent");
    const progressBytes = document.getElementById("progressBytes");
    const progressSpeed = document.getElementById("progressSpeed");
    const analysisSteps = document.getElementById("analysisSteps");
    const errorBox = document.getElementById("errorBox");
    const errorText = document.getElementById("errorText");
    
    if (!dropZone || !fileInput) return;
    
    // Drag events
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, e => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, e => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        }, false);
    });
    
    dropZone.addEventListener('drop', e => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            handleFileUpload(files[0]);
        }
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFileUpload(this.files[0]);
        }
    });
    
    function handleFileUpload(file) {
        // Clear old errors
        errorBox.classList.add("d-none");
        
        // 1. File size check (500 MB max)
        const maxSize = 500 * 1024 * 1024;
        if (file.size > maxSize) {
            showError("File Too Large", "The selected video exceeds the 500MB maximum size limit.");
            return;
        }
        
        // 2. Extension check
        const allowedExts = ['mp4', 'avi', 'mov', 'mkv'];
        const ext = file.name.split('.').pop().toLowerCase();
        if (!allowedExts.includes(ext)) {
            showError("Unsupported Format", "Please upload a valid video file (.mp4, .avi, .mov, or .mkv).");
            return;
        }
        
        // Hide dropzone, show progress
        dropZone.classList.add("d-none");
        progressCard.classList.remove("d-none");
        progressBar.style.width = "0%";
        progressPercent.innerText = "0%";
        progressStatus.innerText = "Uploading video file...";
        
        // Build FormData
        const formData = new FormData();
        formData.append("video", file);
        
        // Setup XHR
        const xhr = new XMLHttpRequest();
        let startTime = Date.now();
        
        xhr.upload.addEventListener("progress", e => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                progressBar.style.width = percent + "%";
                progressPercent.innerText = percent + "%";
                
                // Calculate size in MB
                const loadedMB = (e.loaded / (1024 * 1024)).toFixed(1);
                const totalMB = (e.total / (1024 * 1024)).toFixed(1);
                progressBytes.innerText = `${loadedMB} MB of ${totalMB} MB`;
                
                // Calculate Speed
                const elapsedSeconds = (Date.now() - startTime) / 1000;
                if (elapsedSeconds > 0) {
                    const speedKB = Math.round((e.loaded / 1024) / elapsedSeconds);
                    progressSpeed.innerText = speedKB > 1024 
                        ? `${(speedKB / 1024).toFixed(1)} MB/s` 
                        : `${speedKB} KB/s`;
                }
            }
        });
        
        xhr.upload.addEventListener("load", () => {
            // Upload complete, starting backend processing
            progressStatus.innerText = "Upload Complete. Running diagnostics...";
            progressPercent.innerText = "100%";
            progressBytes.innerText = "Analyzing file contents...";
            progressSpeed.innerText = "";
            
            // Show checkmarks step sequence
            analysisSteps.classList.remove("d-none");
            runProcessingSimulations();
        });
        
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // Complete everything, redirect
                        completeAllSteps();
                        setTimeout(() => {
                            window.location.href = response.redirect_url;
                        }, 600);
                    } else {
                        showError("Analysis Failed", response.error || "An error occurred during video feature processing.");
                        resetUploadView();
                    }
                } else {
                    let errText = "A server error occurred during video analysis.";
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.error) errText = response.error;
                    } catch(e) {}
                    showError("Connection Error", errText);
                    resetUploadView();
                }
            }
        });
        
        xhr.open("POST", "/upload", true);
        xhr.send(formData);
    }
    
    // Simulate pipeline transitions sequentially for positive user feedback
    let simTimers = [];
    function runProcessingSimulations() {
        // Clear old timers
        simTimers.forEach(clearTimeout);
        simTimers = [];
        
        const steps = [
            { id: "step-upload", delay: 100 },
            { id: "step-opencv", delay: 1500 },
            { id: "step-motion", delay: 3500 },
            { id: "step-faces", delay: 6000 },
            { id: "step-predict", delay: 8500 }
        ];
        
        steps.forEach((step, idx) => {
            // 1. Transition to loading
            const t1 = setTimeout(() => {
                const el = document.getElementById(step.id);
                if (el) {
                    el.querySelector(".step-icon-todo").classList.add("d-none");
                    el.querySelector(".step-icon-loading").classList.remove("d-none");
                }
            }, step.delay);
            simTimers.push(t1);
            
            // 2. Transition to done (if not the last step, wait for the actual request)
            if (idx < steps.length - 1) {
                const t2 = setTimeout(() => {
                    const el = document.getElementById(step.id);
                    if (el) {
                        el.querySelector(".step-icon-loading").classList.add("d-none");
                        el.querySelector(".step-icon-done").classList.remove("d-none");
                    }
                }, steps[idx + 1].delay - 200);
                simTimers.push(t2);
            }
        });
    }
    
    function completeAllSteps() {
        simTimers.forEach(clearTimeout);
        const steps = ["step-upload", "step-opencv", "step-motion", "step-faces", "step-predict"];
        steps.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.querySelector(".step-icon-todo").classList.add("d-none");
                el.querySelector(".step-icon-loading").classList.add("d-none");
                el.querySelector(".step-icon-done").classList.remove("d-none");
            }
        });
    }
    
    function showError(title, text) {
        errorBox.classList.remove("d-none");
        document.getElementById("errorTitle").innerText = title;
        errorText.innerText = text;
    }
    
    function resetUploadView() {
        simTimers.forEach(clearTimeout);
        progressCard.classList.add("d-none");
        analysisSteps.classList.add("d-none");
        dropZone.classList.remove("d-none");
        
        // Reset checklist classes
        const steps = ["step-opencv", "step-motion", "step-faces", "step-predict"];
        steps.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.querySelector(".step-icon-todo").classList.remove("d-none");
                el.querySelector(".step-icon-loading").classList.add("d-none");
                el.querySelector(".step-icon-done").classList.add("d-none");
            }
        });
    }
});
