
import store from '../store.js';

export default function Preview() {
    const proposal = store.get().generatedProposal;
    const templateId = store.get().selectedTemplate;

    if (!proposal) {
        return `
        <div class="flow-container flow-centered">
            <div style="text-align: center;">
                <h2 style="color: #111827;">No Proposal Generated</h2>
                <button class="btn-primary" onclick="window.location.hash = '#dashboard'">Go to Dashboard</button>
            </div>
        </div>`;
    }

    return `
    <div class="flow-container">
       <div class="template-header">
         <div class="dashboard-nav-content">
            <button class="back-button" onclick="window.location.hash = '#templates'" style="margin-bottom: 0;">
                <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
                Back to Templates
            </button>
            <div style="text-align: center; flex-grow: 1;">
                <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827;">Preview Proposal</h1>
            </div>
            <button class="btn-primary" onclick="alert('Download coming soon')">Download PDF</button>
         </div>
       </div>

       <div class="dashboard-main">
          <div class="details-card">
             <div style="margin-bottom: 2rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem;">
                <h1 style="color: #2563eb; font-size: 2rem; margin-bottom: 0.5rem;">${proposal.title}</h1>
                <p style="color: #6b7280;">Prepared for: ${proposal.clientName}</p>
                <p style="color: #6b7280;">Date: ${proposal.date}</p>
             </div>
             
             <div style="margin-bottom: 1.5rem;">
               <h3 style="color: #111827; margin-bottom: 0.5rem;">Executive Summary</h3>
               <p style="color: #4b5563; line-height: 1.6;">${proposal.executiveSummary || proposal.content}</p>
             </div>

             <!-- In a full app, we would render all sections here -->
             <div style="background: #f9fafb; padding: 1rem; border-radius: 0.5rem; margin-top: 2rem;">
                <p style="color: #6b7280; font-size: 0.875rem;">
                   Template ID: ${templateId} (Styling application pending)
                </p>
             </div>
          </div>
       </div>
    </div>
    `;
}

export function setupPreview() {
    // any setup
}
