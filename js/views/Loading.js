
import store from '../store.js';

const loadingSteps = [
    { icon: 'file-text', label: 'Analyzing documents...', delay: 0 },
    { icon: 'sparkles', label: 'Extracting key information...', delay: 5000 },
    { icon: 'zap', label: 'Generating proposal structure...', delay: 12000 },
    { icon: 'check-circle', label: 'Finalizing your proposal...', delay: 22000 },
];

export default function Loading() {
    return `
    <div class="flow-container flow-centered">
      <div class="loading-card">
        <div class="loading-header">
           <div class="loading-icon-pulse">
             <i data-lucide="sparkles" style="width: 40px; height: 40px;"></i>
           </div>
           <h2 class="auth-title">Generating Your Proposal</h2>
           <p class="auth-subtitle">Our AI is analyzing your documents and creating a professional proposal</p>
        </div>

        <div style="margin-bottom: 2rem;">
           <div class="progress-header">
              <span style="color: #4b5563;">Progress</span>
              <span id="progressText" style="color: #111827; font-weight: 500;">0%</span>
           </div>
           <div class="progress-bar-bg">
              <div id="progressBar" class="progress-bar-fill" style="width: 0%;"></div>
           </div>
        </div>

        <div class="loading-steps" id="loadingStepsContainer">
            ${loadingSteps.map((step, index) => renderStep(step, index, 0)).join('')}
        </div>

        <div style="margin-top: 2rem; text-align: center; color: #6b7280; font-size: 0.875rem;">
           Estimated time: <span id="timeRemaining">30</span> seconds remaining
        </div>
      </div>
    </div>
    `;
}

function renderStep(step, index, currentStep) {
    let statusClass = 'pending';
    if (index === currentStep) statusClass = 'active';
    if (index < currentStep) statusClass = 'completed';

    return `
    <div class="loading-step ${statusClass}" id="step-${index}">
       <div class="step-icon-box">
         <i data-lucide="${step.icon}" style="width: 20px; height: 20px;"></i>
       </div>
       <span style="color: ${statusClass === 'active' ? '#111827' : (statusClass === 'completed' ? '#14532d' : '#6b7280')}">
         ${step.label}
       </span>
       ${statusClass === 'completed' ? `<i data-lucide="check-circle" style="width: 20px; height: 20px; color: #16a34a; margin-left: auto;"></i>` : ''}
    </div>
    `;
}

export function setupLoading() {
    let progress = 0;
    let currentStep = 0;
    const TOTAL_TIME = 30000; // 30s
    const INTERVAL = 150;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const timeRemaining = document.getElementById('timeRemaining');
    const stepsContainer = document.getElementById('loadingStepsContainer');

    // Interval for progress bar
    const intervalId = setInterval(() => {
        progress += (INTERVAL / TOTAL_TIME) * 100;
        if (progress > 100) progress = 100;

        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.innerText = `${Math.round(progress)}%`;

        const remaining = Math.max(0, 30 - Math.round((progress / 100) * 30));
        if (timeRemaining) timeRemaining.innerText = remaining;

        if (progress >= 100) {
            clearInterval(intervalId);
            finishGeneration();
        }
    }, INTERVAL);

    // Timeouts for steps
    loadingSteps.forEach((step, index) => {
        setTimeout(() => {
            currentStep = index;
            updateStepsUI(currentStep);
        }, step.delay);
    });

    function updateStepsUI(stepIndex) {
        if (!stepsContainer) return;
        stepsContainer.innerHTML = loadingSteps.map((s, i) => renderStep(s, i, stepIndex)).join('');
        if (window.lucide) window.lucide.createIcons();
    }

    function finishGeneration() {
        // Mock Data Generation
        const files = store.get().uploadedFiles || [];
        const proposal = {
            title: 'AI-Powered Customer Analytics Platform',
            clientName: 'TechCorp Solutions',
            date: new Date().toLocaleDateString(),
            content: `Generated proposal based on ${files.length} files...`
            // ... Expand with full mock data same as reference if needed
        };
        store.setGeneratedProposal(proposal);

        // Navigate
        window.location.hash = '#templates';
    }
}
