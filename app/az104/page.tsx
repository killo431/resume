import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AZ-104 Study Dashboard | Randy DeRego",
  description:
    "Interactive AZ-104 Microsoft Azure Administrator exam preparation dashboard with practice questions, domain reference, and progress tracking.",
};

export default function AZ104Page() {
  return (
    <>
      {/* Data and question bank loaded first */}
      <Script src="/task2_data.js" strategy="beforeInteractive" />
      <Script src="/task3_questions.js" strategy="beforeInteractive" />
      {/* Engine loaded after DOM is ready */}
      <Script src="/task4_engine.js" strategy="afterInteractive" />

      <div id="az104-app" className="az104-app">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="az104-header">
          <div className="az104-header-inner">
            <div className="az104-logo">
              <span className="az104-logo-icon">☁️</span>
              <div>
                <h1>AZ-104 Study Dashboard</h1>
                <p>Microsoft Azure Administrator Exam Prep</p>
              </div>
            </div>
            <a href="/" className="az104-back-link">
              ← Back to Portfolio
            </a>
          </div>
        </header>

        {/* ── Message Banner ─────────────────────────────────────────────────── */}
        <div id="az104-message" className="az104-message hidden" role="alert" aria-live="polite" />

        {/* ── Tab Navigation ──────────────────────────────────────────────────── */}
        <nav className="az104-tabs" role="tablist" aria-label="Study sections">
          <button
            className="az104-tab-btn active"
            data-tab="overview"
            role="tab"
            aria-selected="true"
            aria-controls="tab-overview"
          >
            📊 Overview
          </button>
          <button
            className="az104-tab-btn"
            data-tab="domains"
            role="tab"
            aria-selected="false"
            aria-controls="tab-domains"
          >
            📚 Domains
          </button>
          <button
            className="az104-tab-btn"
            data-tab="quiz"
            role="tab"
            aria-selected="false"
            aria-controls="tab-quiz"
          >
            🧠 Practice Quiz
          </button>
          <button
            className="az104-tab-btn"
            data-tab="services"
            role="tab"
            aria-selected="false"
            aria-controls="tab-services"
          >
            🔧 Azure Services
          </button>
        </nav>

        {/* ── Main Content ────────────────────────────────────────────────────── */}
        <main className="az104-main">

          {/* ── Overview Tab ──────────────────────────────────────────────────── */}
          <section id="tab-overview" className="az104-tab-panel" role="tabpanel" aria-labelledby="tab-overview">
            <div className="az104-section-header">
              <h2>Exam Overview</h2>
              <p>Track your preparation progress and jump into practice.</p>
            </div>

            {/* Progress Summary */}
            <div id="progress-summary" className="az104-stats-grid" aria-label="Progress summary" />

            {/* Exam Info */}
            <div className="az104-info-grid">
              <div className="az104-info-card">
                <h3>📋 Exam Details</h3>
                <ul>
                  <li><strong>Exam:</strong> AZ-104</li>
                  <li><strong>Role:</strong> Azure Administrator</li>
                  <li><strong>Duration:</strong> 120 minutes</li>
                  <li><strong>Questions:</strong> 40–60</li>
                  <li><strong>Passing score:</strong> 700 / 1000</li>
                  <li><strong>Format:</strong> Multiple choice, case studies, drag-and-drop</li>
                </ul>
              </div>

              <div className="az104-info-card">
                <h3>🎯 Exam Domains</h3>
                <ul>
                  <li>Manage Azure identities &amp; governance — 20–25%</li>
                  <li>Implement and manage storage — 15–20%</li>
                  <li>Deploy and manage compute — 20–25%</li>
                  <li>Configure virtual networking — 25–30%</li>
                  <li>Monitor and maintain resources — 10–15%</li>
                </ul>
              </div>

              <div className="az104-info-card">
                <h3>💡 Quick Start</h3>
                <ul>
                  <li>Review domain weights to prioritize study</li>
                  <li>Practice all 12 included questions</li>
                  <li>Use Azure Services tab for quick reference</li>
                  <li>Aim for 70%+ accuracy before scheduling</li>
                </ul>
                <div className="az104-quick-actions">
                  <button
                    className="az104-btn primary"
                    data-start-domain="all"
                    aria-label="Start full practice quiz with all questions"
                  >
                    Start Full Quiz
                  </button>
                  <button
                    id="btn-reset-all"
                    className="az104-btn secondary"
                    aria-label="Reset all quiz progress"
                  >
                    Reset Progress
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Domains Tab ───────────────────────────────────────────────────── */}
          <section
            id="tab-domains"
            className="az104-tab-panel hidden"
            role="tabpanel"
            aria-labelledby="tab-domains"
            aria-hidden="true"
          >
            <div className="az104-section-header">
              <h2>Study Domains</h2>
              <p>Drill into individual exam domains with targeted practice questions.</p>
            </div>
            <div id="domain-list" className="az104-domain-grid" aria-label="Domain list" />
          </section>

          {/* ── Quiz Tab ──────────────────────────────────────────────────────── */}
          <section
            id="tab-quiz"
            className="az104-tab-panel hidden"
            role="tabpanel"
            aria-labelledby="tab-quiz"
            aria-hidden="true"
          >
            <div className="az104-section-header">
              <h2>Practice Quiz</h2>
              <p>Test your knowledge. Select a domain from the Domains tab, or start the full quiz from Overview.</p>
            </div>
            <div id="quiz-container" className="az104-quiz-container">
              <p className="az104-placeholder">Select a domain above to begin a quiz.</p>
            </div>
          </section>

          {/* ── Services Tab ──────────────────────────────────────────────────── */}
          <section
            id="tab-services"
            className="az104-tab-panel hidden"
            role="tabpanel"
            aria-labelledby="tab-services"
            aria-hidden="true"
          >
            <div className="az104-section-header">
              <h2>Azure Services Reference</h2>
              <p>Quick reference for key Azure services covered in AZ-104.</p>
            </div>
            <div className="az104-services-grid">
              <div className="az104-service-category">
                <h3>🔐 Identity</h3>
                <ul>
                  <li>Azure Active Directory (Azure AD)</li>
                  <li>Azure AD B2C</li>
                  <li>Azure AD Domain Services</li>
                  <li>Managed Identities</li>
                  <li>Service Principals &amp; App Registrations</li>
                  <li>Azure AD Privileged Identity Management</li>
                </ul>
              </div>
              <div className="az104-service-category">
                <h3>💾 Storage</h3>
                <ul>
                  <li>Azure Blob Storage</li>
                  <li>Azure Files</li>
                  <li>Queue Storage</li>
                  <li>Table Storage</li>
                  <li>Azure Disk Storage</li>
                  <li>Azure Data Lake Storage Gen2</li>
                </ul>
              </div>
              <div className="az104-service-category">
                <h3>🖥️ Compute</h3>
                <ul>
                  <li>Azure Virtual Machines</li>
                  <li>VM Scale Sets</li>
                  <li>Azure Kubernetes Service (AKS)</li>
                  <li>Azure App Service</li>
                  <li>Azure Functions</li>
                  <li>Azure Container Instances</li>
                </ul>
              </div>
              <div className="az104-service-category">
                <h3>🌐 Networking</h3>
                <ul>
                  <li>Virtual Networks (VNet)</li>
                  <li>VPN Gateway</li>
                  <li>Azure ExpressRoute</li>
                  <li>Azure Load Balancer</li>
                  <li>Application Gateway</li>
                  <li>Azure Firewall &amp; NSGs</li>
                </ul>
              </div>
              <div className="az104-service-category">
                <h3>📈 Monitoring</h3>
                <ul>
                  <li>Azure Monitor</li>
                  <li>Log Analytics Workspace</li>
                  <li>Application Insights</li>
                  <li>Azure Alerts &amp; Action Groups</li>
                  <li>Azure Backup</li>
                  <li>Azure Site Recovery</li>
                </ul>
              </div>
              <div className="az104-service-category">
                <h3>⚙️ Governance</h3>
                <ul>
                  <li>Azure Policy</li>
                  <li>Azure Blueprints</li>
                  <li>Management Groups</li>
                  <li>Resource Tags &amp; Locks</li>
                  <li>Azure Cost Management</li>
                  <li>Azure Advisor</li>
                </ul>
              </div>
            </div>
          </section>

        </main>

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <footer className="az104-footer">
          <p>
            AZ-104 Study Dashboard &bull; Built by{" "}
            <a href="/" className="az104-footer-link">
              Randy DeRego
            </a>{" "}
            &bull; Progress saved locally in your browser
          </p>
        </footer>
      </div>

      {/* ── Scoped Styles ───────────────────────────────────────────────────────── */}
      <style>{`
        /* Reset & base */
        .az104-app {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: #f0f4f8;
          min-height: 100vh;
          color: #1a202c;
        }

        /* Header */
        .az104-header {
          background: linear-gradient(135deg, #0078d4 0%, #004578 100%);
          color: #fff;
          padding: 0;
          box-shadow: 0 2px 8px rgba(0,120,212,0.3);
        }
        .az104-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .az104-logo {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .az104-logo-icon { font-size: 2rem; }
        .az104-logo h1 { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .az104-logo p { font-size: 0.85rem; margin: 2px 0 0; opacity: 0.85; }
        .az104-back-link {
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 6px;
          transition: background 0.2s;
        }
        .az104-back-link:hover { background: rgba(255,255,255,0.15); }

        /* Message */
        .az104-message {
          max-width: 1200px;
          margin: 12px auto 0;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 0.9rem;
        }
        .az104-message.hidden { display: none; }
        .az104-message.info { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
        .az104-message.warning { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
        .az104-message.error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }

        /* Tab nav */
        .az104-tabs {
          background: #fff;
          border-bottom: 2px solid #e2e8f0;
          display: flex;
          overflow-x: auto;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .az104-tab-btn {
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          padding: 16px 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          margin-bottom: -2px;
        }
        .az104-tab-btn:hover { color: #0078d4; }
        .az104-tab-btn.active { color: #0078d4; border-bottom-color: #0078d4; }

        /* Main */
        .az104-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px;
        }
        .az104-tab-panel.hidden { display: none; }

        /* Section header */
        .az104-section-header { margin-bottom: 28px; }
        .az104-section-header h2 { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0 0 6px; }
        .az104-section-header p { color: #64748b; margin: 0; }

        /* Stats grid */
        .az104-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }
        .az104-stat {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .az104-stat-num { display: block; font-size: 2rem; font-weight: 800; color: #0078d4; }
        .az104-stat-label { display: block; font-size: 0.8rem; color: #64748b; margin-top: 4px; }

        /* Info grid */
        .az104-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .az104-info-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .az104-info-card h3 { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 14px; }
        .az104-info-card ul { list-style: none; padding: 0; margin: 0; }
        .az104-info-card li { padding: 5px 0; font-size: 0.875rem; color: #374151; border-bottom: 1px solid #f1f5f9; }
        .az104-info-card li:last-child { border-bottom: none; }
        .az104-quick-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }

        /* Domain grid */
        .az104-domain-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }
        .az104-domain-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .az104-domain-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        .az104-domain-header h4 { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0; flex: 1; }
        .az104-weight-badge {
          font-size: 0.75rem;
          font-weight: 600;
          background: #dbeafe;
          color: #1e40af;
          padding: 3px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .az104-topic-list { list-style: none; padding: 0; margin: 0 0 16px; }
        .az104-topic-list li {
          padding: 5px 0 5px 14px;
          font-size: 0.83rem;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
          position: relative;
        }
        .az104-topic-list li::before {
          content: '›';
          position: absolute;
          left: 0;
          color: #0078d4;
          font-weight: 700;
        }
        .az104-topic-list li:last-child { border-bottom: none; }
        .az104-domain-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.8rem;
          color: #64748b;
        }

        /* Quiz */
        .az104-quiz-container { max-width: 760px; margin: 0 auto; }
        .az104-question-card {
          background: #fff;
          border-radius: 12px;
          padding: 28px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .az104-progress-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .az104-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0078d4, #00bcf2);
          border-radius: 999px;
          transition: width 0.4s ease;
        }
        .az104-progress-text { font-size: 0.8rem; color: #64748b; margin-bottom: 14px; }
        .az104-domain-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          background: #f0f9ff;
          color: #0369a1;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 16px;
          border: 1px solid #bae6fd;
        }
        .az104-question-text {
          font-size: 1.05rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.5;
          margin: 0 0 20px;
        }
        .az104-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .az104-option {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 16px;
          text-align: left;
          cursor: pointer;
          font-size: 0.9rem;
          color: #334155;
          transition: border-color 0.15s, background 0.15s;
          line-height: 1.45;
        }
        .az104-option:hover:not([disabled]) { border-color: #0078d4; background: #eff6ff; }
        .az104-option.correct { border-color: #16a34a; background: #f0fdf4; color: #15803d; font-weight: 600; }
        .az104-option.incorrect { border-color: #dc2626; background: #fef2f2; color: #b91c1c; }
        .az104-option.disabled { opacity: 0.55; cursor: not-allowed; }
        .az104-explanation {
          padding: 14px 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .az104-explanation.correct { background: #f0fdf4; border: 1px solid #86efac; color: #166534; }
        .az104-explanation.incorrect { background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; }

        /* Result card */
        .az104-result-card {
          background: #fff;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .az104-result-icon { font-size: 3rem; margin-bottom: 12px; }
        .az104-result-card h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 12px; }
        .az104-result-card.pass h3 { color: #15803d; }
        .az104-result-card.fail h3 { color: #b45309; }
        .az104-score { font-size: 3.5rem; font-weight: 900; margin: 8px 0; }
        .az104-result-card.pass .az104-score { color: #16a34a; }
        .az104-result-card.fail .az104-score { color: #d97706; }
        .az104-pass-note { font-size: 0.9rem; color: #64748b; margin-top: 8px; }

        /* Placeholder */
        .az104-placeholder { color: #94a3b8; text-align: center; padding: 40px 0; font-size: 0.95rem; }

        /* Services grid */
        .az104-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .az104-service-category {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .az104-service-category h3 { font-size: 0.95rem; font-weight: 700; margin: 0 0 12px; color: #0f172a; }
        .az104-service-category ul { list-style: none; padding: 0; margin: 0; }
        .az104-service-category li {
          padding: 5px 0;
          font-size: 0.84rem;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
        }
        .az104-service-category li:last-child { border-bottom: none; }

        /* Nav buttons */
        .az104-nav-btns { display: flex; gap: 10px; flex-wrap: wrap; }

        /* Buttons */
        .az104-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: opacity 0.15s, transform 0.1s;
          text-decoration: none;
        }
        .az104-btn:active { transform: scale(0.97); }
        .az104-btn.primary { background: #0078d4; color: #fff; }
        .az104-btn.primary:hover { background: #006cbf; }
        .az104-btn.secondary { background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; }
        .az104-btn.secondary:hover { background: #e2e8f0; }
        .az104-btn.success { background: #16a34a; color: #fff; }
        .az104-btn.success:hover { background: #15803d; }
        .az104-btn.small { padding: 6px 14px; font-size: 0.8rem; }

        /* Footer */
        .az104-footer {
          text-align: center;
          padding: 24px;
          font-size: 0.8rem;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          margin-top: 40px;
        }
        .az104-footer-link { color: #0078d4; text-decoration: none; }
        .az104-footer-link:hover { text-decoration: underline; }

        /* Responsive */
        @media (max-width: 640px) {
          .az104-header-inner { flex-direction: column; align-items: flex-start; }
          .az104-main { padding: 20px 16px; }
          .az104-question-card { padding: 20px; }
        }
      `}</style>
    </>
  );
}
