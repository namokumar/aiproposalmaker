
export default function LandingPage() {
    return `
  <!-- Navbar -->
  <header class="navbar">
    <nav class="navbarContainer">
      <div class="container navbarInner">
        <div class="navLeft">
          <span>
            <i data-lucide="sparkles" class="icon icon-blue icon-blue-medium"></i>
          </span>
          <span>
            AI Proposal Maker
          </span>
        </div>
        <div class="navRight">
          <ul>
            <li>
              <button class="loginBtn" onclick="window.location.hash = '#login'">
                Login
              </button>
            </li>
            <li>
              <button class="btn GetStartedBtn" onclick="window.location.hash = '#login'">
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- Ai Proposal Maker Body contents -->
  <main class="aiProposalBody">

    <!-- Hero Section -->
    <section class="heroContainer container">
      <div class="aiProposalTextContainer">
        <p>
          <i data-lucide="sparkles" class="icon icon-blue "></i> AI-Powered Proposal Generation
        </p>
      </div>
      <div class="hero-content">
        <h1>
          Transform Meeting Notes into Professional <br />
          Proposals in Seconds
        </h1>
        <p>
          Upload your meeting transcripts, PRD, SRS, or BRD documents and let AI <br />
          generate compelling business proposals with beautiful templates.
        </p>
        <div class="hero-cta">
          <button class="btn ctaBtn" onclick="window.location.hash = '#login'">
            <i data-lucide="sparkles" class="icon icon-white"></i>Start Creating Proposals
          </button>
        </div>
      </div>
    </section>

    <!-- Working of Ai Proposal Maker Section -->
    <section class="howItWorksSection">
      <div class="header">
        <h2>
          How it Works
        </h2>
        <p>
          Simple, fast, and powerful proposal generation
        </p>
      </div>
      <div class="cardContainer" id="cardContainer">
        <!-- Cards will be injected by data.js logic, but we need to handle that re-injection -->
      </div>
    </section>
  </main>
    `;
}
