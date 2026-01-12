
// Simple Vanilla JS Store
// We use a singleton pattern with simple subscription if needed, 
// but for this MVP direct access is likely fine given the linear flow.

const state = {
    user: null,
    uploadedFiles: [],
    generatedProposal: null,
    selectedTemplate: null
};

export default {
    get() {
        return state;
    },

    // User
    setUser(user) {
        state.user = user;
    },

    // Files
    setUploadedFiles(files) {
        state.uploadedFiles = files;
    },
    addFiles(files) {
        state.uploadedFiles = [...state.uploadedFiles, ...files];
    },
    removeFile(index) {
        state.uploadedFiles = state.uploadedFiles.filter((_, i) => i !== index);
    },

    // Proposal
    setGeneratedProposal(proposal) {
        state.generatedProposal = proposal;
    },

    // Template
    setSelectedTemplate(id) {
        state.selectedTemplate = id;
    },

    // Reset flow
    resetProposalFlow() {
        state.uploadedFiles = [];
        state.generatedProposal = null;
        state.selectedTemplate = null;
    }
};
