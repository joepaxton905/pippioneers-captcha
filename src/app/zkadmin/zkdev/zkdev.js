"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import styles from "./zkdev.module.css";

const ZKDev = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Form states
  const [bugReport, setBugReport] = useState({
    title: '',
    description: '',
    severity: 'medium',
    category: 'ui',
    steps: ''
  });

  const [suggestion, setSuggestion] = useState({
    title: '',
    description: '',
    category: 'feature',
    priority: 'medium'
  });

  const [issue, setIssue] = useState({
    title: '',
    description: '',
    type: 'bug',
    urgency: 'normal'
  });

  // Mock crypto addresses
  const cryptoAddresses = {
    btc: "1BYRcC1fir3vQ22TMRsZyEBni1mpXyPmP5",
    eth: "null",
    usdt: "null"
  };

  const showToast = (icon, title, text = '') => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({ icon, title, text });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('success', `${type} address copied!`);
    } catch (err) {
      showToast('error', 'Failed to copy address');
    }
  };

  const handleBugSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      showToast('success', 'Bug report submitted successfully!', 'Thank you for helping improve our platform.');
      setBugReport({ title: '', description: '', severity: 'medium', category: 'ui', steps: '' });
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      showToast('success', 'Suggestion submitted successfully!', 'We appreciate your feedback.');
      setSuggestion({ title: '', description: '', category: 'feature', priority: 'medium' });
      setIsLoading(false);
    }, 1500);
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      showToast('success', 'Issue reported successfully!', 'Our team will review it shortly.');
      setIssue({ title: '', description: '', type: 'bug', urgency: 'normal' });
      setIsLoading(false);
    }, 1500);
  };

  const scrollToDonation = () => {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Developer Center</h1>
        <p className={styles.subtitle}>
          Help me improve the platform by reporting bugs, suggesting features, and supporting development
        </p>
        <div className={styles.donationLink} onClick={scrollToDonation}>
          <i className="fas fa-heart"></i>
          <span>abeg package me 1 codeine 🥹</span>
          <i className="fas fa-arrow-down"></i>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Bug Fixes Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <i className="fas fa-bug"></i>
            </div>
            <h2 className={styles.cardTitle}>Bug Fixes</h2>
          </div>
          <p className={styles.cardDescription}>
            Report bugs and track fixes to help us maintain a stable platform.
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>47</div>
              <div className={styles.statLabel}>Fixed This Month</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>12</div>
              <div className={styles.statLabel}>In Progress</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>3</div>
              <div className={styles.statLabel}>Critical</div>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Real-time bug tracking</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Priority classification</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Status notifications</span>
            </li>
          </ul>
          <button
            className={styles.actionButton}
            onClick={() => setActiveTab('bugs')}
          >
            Report Bug
          </button>
        </div>

        {/* Suggestion Box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <i className="fas fa-lightbulb"></i>
            </div>
            <h2 className={styles.cardTitle}>Suggestion Box</h2>
          </div>
          <p className={styles.cardDescription}>
            Share your ideas and suggestions to help us enhance the user experience.
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>156</div>
              <div className={styles.statLabel}>Total Suggestions</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>23</div>
              <div className={styles.statLabel}>Implemented</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>8</div>
              <div className={styles.statLabel}>In Review</div>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Feature requests</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>UI/UX improvements</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Community voting</span>
            </li>
          </ul>
          <button
            className={styles.actionButton}
            onClick={() => setActiveTab('suggestions')}
          >
            Submit Suggestion
          </button>
        </div>

        {/* Report Issues */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className={styles.cardTitle}>Report Issues</h2>
          </div>
          <p className={styles.cardDescription}>
            Report technical issues, security concerns, or platform problems.
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>89</div>
              <div className={styles.statLabel}>Issues Resolved</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Open Issues</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>24h</div>
              <div className={styles.statLabel}>Avg Response</div>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Security issues</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Performance problems</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Data inconsistencies</span>
            </li>
          </ul>
          <button
            className={styles.actionButton}
            onClick={() => setActiveTab('issues')}
          >
            Report Issue
          </button>
        </div>

        {/* Documentation */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <i className="fas fa-book"></i>
            </div>
            <h2 className={styles.cardTitle}>Documentation</h2>
          </div>
          <p className={styles.cardDescription}>
            Access developer resources, API documentation, and integration guides.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>API Reference</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Integration Guides</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Code Examples</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Best Practices</span>
            </li>
          </ul>
          <button className={styles.secondaryButton}>
            View Documentation
          </button>
        </div>

        {/* Community */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <i className="fas fa-users"></i>
            </div>
            <h2 className={styles.cardTitle}>Developer Community</h2>
          </div>
          <p className={styles.cardDescription}>
            Connect with other developers, share knowledge, and collaborate on projects.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Developer Forum</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Code Reviews</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Open Source Projects</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Developer Events</span>
            </li>
          </ul>
          <button className={styles.secondaryButton}>
            Join Community
          </button>
        </div>

        {/* Testing & QA */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <i className="fas fa-vial"></i>
            </div>
            <h2 className={styles.cardTitle}>Testing & QA</h2>
          </div>
          <p className={styles.cardDescription}>
            Access testing environments, beta features, and quality assurance tools.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Sandbox Environment</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Beta Testing</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Automated Testing</span>
            </li>
            <li className={styles.featureItem}>
              <i className={`fas fa-check ${styles.featureIcon}`}></i>
              <span className={styles.featureText}>Performance Monitoring</span>
            </li>
          </ul>
          <button className={styles.secondaryButton}>
            Access Testing
          </button>
        </div>
      </div>

      {/* Donation Section */}
      <div className={styles.donationSection} id="donation-section">
        <div className={styles.donationHeader}>
          <h2 className={styles.donationTitle}>Support Development</h2>
          <p className={styles.donationSubtitle}>
           🥺 i go appreciate any amount but do 1 molly join if possible 🥺
          </p>
        </div>

        <div className={styles.cryptoGrid}>
          <div className={styles.cryptoCard}>
            <div className={styles.cryptoHeader}>
              <i className={`fab fa-bitcoin ${styles.cryptoIcon}`} style={{color: '#f7931a'}}></i>
              <span className={styles.cryptoName}>Bitcoin (BTC)</span>
            </div>
            <div className={styles.cryptoAddress}>{cryptoAddresses.btc}</div>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(cryptoAddresses.btc, 'Bitcoin')}
            >
              <i className="fas fa-copy"></i> Copy Address
            </button>
          </div>

          <div className={styles.cryptoCard}>
            <div className={styles.cryptoHeader}>
              <i className={`fab fa-ethereum ${styles.cryptoIcon}`} style={{color: '#627eea'}}></i>
              <span className={styles.cryptoName}>Ethereum (ETH)</span>
            </div>
            <div className={styles.cryptoAddress}>{cryptoAddresses.eth}</div>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(cryptoAddresses.eth, 'Ethereum')}
            >
              <i className="fas fa-copy"></i> Copy Address
            </button>
          </div>

          <div className={styles.cryptoCard}>
            <div className={styles.cryptoHeader}>
              <i className={`fas fa-dollar-sign ${styles.cryptoIcon}`} style={{color: '#26a17b'}}></i>
              <span className={styles.cryptoName}>Tether (USDT)</span>
            </div>
            <div className={styles.cryptoAddress}>{cryptoAddresses.usdt}</div>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(cryptoAddresses.usdt, 'USDT')}
            >
              <i className="fas fa-copy"></i> Copy Address
            </button>
          </div>
        </div>
      </div>

      {/* Forms Section */}
      {activeTab === 'bugs' && (
        <div className={styles.formSection}>
          <h3 style={{marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.5rem'}}>Report a Bug</h3>
          <form onSubmit={handleBugSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Bug Title *</label>
              <input
                type="text"
                className={styles.formInput}
                value={bugReport.title}
                onChange={(e) => setBugReport({...bugReport, title: e.target.value})}
                placeholder="Brief description of the bug"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Severity</label>
              <select
                className={styles.formSelect}
                value={bugReport.severity}
                onChange={(e) => setBugReport({...bugReport, severity: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={bugReport.category}
                onChange={(e) => setBugReport({...bugReport, category: e.target.value})}
              >
                <option value="ui">User Interface</option>
                <option value="functionality">Functionality</option>
                <option value="performance">Performance</option>
                <option value="security">Security</option>
                <option value="data">Data</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                className={styles.formTextarea}
                value={bugReport.description}
                onChange={(e) => setBugReport({...bugReport, description: e.target.value})}
                placeholder="Detailed description of the bug"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Steps to Reproduce</label>
              <textarea
                className={styles.formTextarea}
                value={bugReport.steps}
                onChange={(e) => setBugReport({...bugReport, steps: e.target.value})}
                placeholder="1. Go to... 2. Click on... 3. See error..."
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Bug Report'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div className={styles.formSection}>
          <h3 style={{marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.5rem'}}>Submit a Suggestion</h3>
          <form onSubmit={handleSuggestionSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Suggestion Title *</label>
              <input
                type="text"
                className={styles.formInput}
                value={suggestion.title}
                onChange={(e) => setSuggestion({...suggestion, title: e.target.value})}
                placeholder="Brief title for your suggestion"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={suggestion.category}
                onChange={(e) => setSuggestion({...suggestion, category: e.target.value})}
              >
                <option value="feature">New Feature</option>
                <option value="improvement">Improvement</option>
                <option value="ui">UI/UX</option>
                <option value="performance">Performance</option>
                <option value="integration">Integration</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Priority</label>
              <select
                className={styles.formSelect}
                value={suggestion.priority}
                onChange={(e) => setSuggestion({...suggestion, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                className={styles.formTextarea}
                value={suggestion.description}
                onChange={(e) => setSuggestion({...suggestion, description: e.target.value})}
                placeholder="Detailed description of your suggestion and how it would benefit users"
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Suggestion'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'issues' && (
        <div className={styles.formSection}>
          <h3 style={{marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.5rem'}}>Report an Issue</h3>
          <form onSubmit={handleIssueSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Issue Title *</label>
              <input
                type="text"
                className={styles.formInput}
                value={issue.title}
                onChange={(e) => setIssue({...issue, title: e.target.value})}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Issue Type</label>
              <select
                className={styles.formSelect}
                value={issue.type}
                onChange={(e) => setIssue({...issue, type: e.target.value})}
              >
                <option value="bug">Bug</option>
                <option value="security">Security Concern</option>
                <option value="performance">Performance Issue</option>
                <option value="data">Data Issue</option>
                <option value="access">Access Problem</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Urgency</label>
              <select
                className={styles.formSelect}
                value={issue.urgency}
                onChange={(e) => setIssue({...issue, urgency: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                className={styles.formTextarea}
                value={issue.description}
                onChange={(e) => setIssue({...issue, description: e.target.value})}
                placeholder="Detailed description of the issue, including any error messages or unexpected behavior"
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Report Issue'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'overview' && (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <p style={{color: '#64748b', fontSize: '1.1rem'}}>
            Select a category above to get started, or scroll down to support development with crypto donations.
          </p>
        </div>
      )}
    </div>
  );
};

export default ZKDev;