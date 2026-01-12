
import store from '../store.js';

const templates = [
    { id: 1, name: 'Professional', icon: 'briefcase', desc: 'Clean and modern design', color: 'blue', previewClass: 'preview-blue' },
    { id: 2, name: 'Executive', icon: 'award', desc: 'Bold and impactful layout', color: 'purple', previewClass: 'preview-purple' },
    { id: 3, name: 'Minimal', icon: 'file-text', desc: 'Simple and elegant format', color: 'gray', previewClass: 'preview-gray' }
];

export default function TemplateSelection() {
    const proposal = store.get().generatedProposal;
    const selectedId = store.get().selectedTemplate;

    return `
    <div class="flow-container">
       <div class="template-header">
         <div class="dashboard-nav-content">
            <button class="back-button" onclick="window.location.hash = '#dashboard'" style="margin-bottom: 0;">
                <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
                Back to Dashboard
            </button>
            <div style="text-align: center; flex-grow: 1;">
                <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827;">Choose Your Template</h1>
                <p style="color: #6b7280;">Select a design for: ${proposal ? proposal.title : 'Your Proposal'}</p>
            </div>
            <div style="width: 100px;"></div> <!-- Spacer -->
         </div>
       </div>

       <div class="dashboard-main">
          <div class="template-grid">
             ${templates.map(t => renderTemplateCard(t, selectedId)).join('')}
          </div>

          ${selectedId ? renderActionBar(selectedId) : `
            <div style="text-align: center; color: #6b7280; padding: 2rem;">
              <i data-lucide="file-text" style="width: 48px; height: 48px; margin: 0 auto 1rem; color: #9ca3af;"></i>
              <p>Select a template above to preview or edit your proposal</p>
            </div>
          `}
       </div>
    </div>
    `;
}

function renderTemplateCard(template, selectedId) {
    const isSelected = selectedId === template.id;
    return `
    <div class="template-card ${isSelected ? 'selected' : ''}" onclick="window.selectTemplate(${template.id})">
       <div class="template-preview ${template.previewClass}">
          ${isSelected ? `<div class="selected-check"><i data-lucide="check" style="width: 20px; height: 20px;"></i></div>` : ''}
          <div class="mock-page">
             <div class="mock-line w-3-4"></div>
             <div class="mock-line w-1-2"></div>
             <div style="margin-top: auto;">
                <div class="mock-line"></div>
                <div class="mock-line"></div>
             </div>
          </div>
       </div>
       <div class="template-info">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
             <i data-lucide="${template.icon}" style="width: 20px; height: 20px; color: #4b5563;"></i>
             <h3 style="font-weight: 600; color: #111827;">${template.name}</h3>
          </div>
          <p style="font-size: 0.875rem; color: #6b7280;">${template.desc}</p>
       </div>
    </div>
    `;
}

function renderActionBar(selectedId) {
    const t = templates.find(temp => temp.id === selectedId);
    return `
    <div class="template-action-bar">
       <div>
          <h3 style="font-weight: 600; color: #111827;">Template Selected</h3>
          <p style="color: #6b7280;">${t.name} template ready for your proposal</p>
       </div>
       <div style="display: flex; gap: 1rem;">
          <button class="nav-btn" style="border: 1px solid #2563eb; color: #2563eb;" onclick="alert('Preview Coming Soon')">Preview</button>
          <button class="btn-primary" onclick="alert('Editor Coming Soon')">Edit Template</button>
       </div>
    </div>
    `;
}

export function setupTemplateSelection() {
    window.selectTemplate = (id) => {
        store.setSelectedTemplate(id);
        // Re-render
        // In a real reactive framework this happens automatically.
        // Here we can manually trigger re-render of this view or reload page.
        // Simplest: just reload route
        const app = document.getElementById('app');
        app.innerHTML = TemplateSelection();
        setupTemplateSelection(); // Re-attach listeners
        if (window.lucide) window.lucide.createIcons();
    };
}
