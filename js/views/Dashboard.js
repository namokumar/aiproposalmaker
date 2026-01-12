
import store from '../store.js';
import supabase from '../supabase.js';

export default function Dashboard() {
    const files = store.get().uploadedFiles || [];
    const hasFiles = files.length > 0;

    return `
    <div class="dashboard-container">
      <!-- Navigation -->
      <nav class="dashboard-nav">
        <div class="dashboard-nav-content">
          <div class="nav-logo">
            <i data-lucide="sparkles" class="icon icon-blue" style="width: 32px; height: 32px;"></i>
            <span>AI Proposal Generator</span>
          </div>
          <div class="nav-actions">
            <button class="nav-btn" disabled title="Coming Soon">
              <i data-lucide="bar-chart-3" style="width: 20px; height: 20px;"></i>
              Analytics
            </button>
            <button id="logoutBtn" class="nav-btn">
              <i data-lucide="log-out" style="width: 20px; height: 20px;"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="dashboard-main">
        <div class="dashboard-header">
          <h1 class="dashboard-title">Create Your Proposal</h1>
          <p class="dashboard-subtitle">
            Upload meeting transcripts, PRD, SRS, or BRD documents to get started
          </p>
        </div>

        <!-- Upload Area -->
        <div class="details-card">
          <div id="uploadZone" class="upload-zone">
            <i data-lucide="upload" class="upload-icon"></i>
            <h3 class="upload-title">Upload Your Documents</h3>
            <p class="upload-text">Drag and drop your files here, or click to browse</p>
            <p class="upload-hint">Supported formats: PDF, TXT</p>
            <button id="chooseFilesBtn" class="btn-primary">Choose Files</button>
            <input type="file" id="fileInput" multiple accept=".pdf,.txt" style="display: none;">
          </div>

          <!-- File List -->
          <div id="fileListContainer" class="file-list" style="display: ${hasFiles ? 'block' : 'none'};">
            <h4 class="file-list-title">Uploaded Files (<span id="fileCount">${files.length}</span>)</h4>
            <div id="fileListItems">
                ${files.map((file, index) => renderFileItem(file, index)).join('')}
            </div>
          </div>
        </div>

        <!-- Generate Button -->
        <div class="action-area">
          <button id="generateBtn" class="btn-generate" ${!hasFiles ? 'disabled' : ''}>
            <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i>
            Generate Proposal
          </button>
        </div>

        <!-- Info Cards -->
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon-wrapper blue">
              <i data-lucide="file-text" style="width: 20px; height: 20px;"></i>
            </div>
            <h4 class="info-title">Multiple Formats</h4>
            <p class="info-desc">Upload PDF and TXT documents including meeting notes, PRD, SRS, or BRD</p>
          </div>
          <div class="info-card">
             <div class="info-icon-wrapper purple">
              <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i>
            </div>
            <h4 class="info-title">AI-Powered</h4>
            <p class="info-desc">Advanced AI analyzes your documents and generates professional proposals</p>
          </div>
          <div class="info-card">
             <div class="info-icon-wrapper green">
              <i data-lucide="bar-chart-3" style="width: 20px; height: 20px;"></i>
            </div>
            <h4 class="info-title">Track Progress</h4>
            <p class="info-desc">Monitor your proposal generation and success metrics in analytics</p>
          </div>
        </div>
      </div>
    </div>
    `;
}

function renderFileItem(file, index) {
    // Determine size string
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return `
    <div class="file-item" data-index="${index}">
        <div class="file-info">
            <i data-lucide="file-text" style="width: 20px; height: 20px; color: #2563eb;"></i>
            <div>
                <p class="file-name">${file.name}</p>
                <p class="file-size">${formatFileSize(file.size)}</p>
            </div>
        </div>
        <button class="btn-remove" onclick="window.removeFile(${index})">
            <i data-lucide="x" style="width: 20px; height: 20px;"></i>
        </button>
    </div>
    `;
}

export function setupDashboard() {
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        await supabase.auth.signOut();
        store.setUser(null);
        window.location.hash = '#landing';
    });

    // File Upload Logic
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const chooseFilesBtn = document.getElementById('chooseFilesBtn');

    if (chooseFilesBtn) {
        chooseFilesBtn.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }

    if (uploadZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => uploadZone.classList.add('drag-active'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => uploadZone.classList.remove('drag-active'), false);
        });

        uploadZone.addEventListener('drop', (e) => {
            handleFiles(e.dataTransfer.files);
        });
    }

    function handleFiles(fileList) {
        const validFiles = Array.from(fileList).filter(
            file => file.type === 'application/pdf' || file.type === 'text/plain'
        );

        if (validFiles.length > 0) {
            store.addFiles(validFiles);
            refreshFileList();
        } else if (fileList.length > 0) {
            alert('Please upload only PDF or TXT files');
        }
    }

    // Global handler for remove (since inline onclick expects global function)
    window.removeFile = (index) => {
        store.removeFile(index);
        refreshFileList();
    };

    function refreshFileList() {
        const files = store.get().uploadedFiles;
        const fileListContainer = document.getElementById('fileListContainer');
        const fileListItems = document.getElementById('fileListItems');
        const fileCount = document.getElementById('fileCount');
        const generateBtn = document.getElementById('generateBtn');

        if (files.length === 0) {
            fileListContainer.style.display = 'none';
            generateBtn.disabled = true;
        } else {
            fileListContainer.style.display = 'block';
            fileCount.textContent = files.length;
            fileListItems.innerHTML = files.map((file, i) => renderFileItem(file, i)).join('');
            generateBtn.disabled = false;
        }

        if (window.lucide) window.lucide.createIcons();
    }

    // Generate Proposal
    document.getElementById('generateBtn')?.addEventListener('click', () => {
        // Navigate to Loading
        window.location.hash = '#loading';
    });
}
