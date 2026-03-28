import React, { useState, useEffect } from 'react';
import './HunterEngine.css';

const HunterEngine = () => {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('username');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);

  // Mock Data Generators for Simulation
  const generateMockData = (type, value) => {
    const timestamp = new Date().toLocaleTimeString();
    
    if (type === 'phone') {
      return {
        target: value,
        type: 'Phone Number',
        confidence: '94%',
        identity: {
          name: 'Alex "Shadow" Mercer',
          location: 'Eastern Europe (Proxy Detected)',
          isp: 'Bulletproof Hosting Ltd',
          riskScore: 88
        },
        connectedAccounts: [
          { platform: 'Telegram', handle: '@shadow_ops', status: 'Active', lastSeen: '2 mins ago' },
          { platform: 'WhatsApp', handle: '+Hidden', status: 'Verified', lastSeen: '1 hour ago' },
          { platform: 'Signal', handle: 'Unknown', status: 'Inactive', lastSeen: '3 days ago' },
          { platform: 'Discord', handle: 'Shadow#9921', status: 'Active', lastSeen: 'Just now' }
        ],
        breaches: ['Collection #1', 'Exploit.in', 'LinkedIn 2021'],
        dossier: 'Subject operates primarily in crypto-currency scams. Known to rotate IPs every 4 hours.'
      };
    } else if (type === 'email') {
      return {
        target: value,
        type: 'Email Address',
        confidence: '98%',
        identity: {
          name: 'Jordan V.',
          location: 'Southeast Asia',
          isp: 'Residential ISP',
          riskScore: 75
        },
        connectedAccounts: [
          { platform: 'Twitter', handle: '@jordan_fake', status: 'Active', lastSeen: '5 mins ago' },
          { platform: 'Instagram', handle: '@j.v_official', status: 'Private', lastSeen: '1 day ago' },
          { platform: 'GitHub', handle: 'jv-dev', status: 'Active', lastSeen: '2 weeks ago' },
          { platform: 'PasteBin', handle: 'User123', status: 'Leak Found', lastSeen: 'Yesterday' }
        ],
        breaches: ['Adobe 2013', 'Canva 2019', 'Dropbox 2012'],
        dossier: 'Identity linked to multiple phishing kits hosted on compromised WordPress sites.'
      };
    } else if (type === 'username') {
      return {
        target: value,
        type: 'Username',
        confidence: '89%',
        identity: {
          name: 'Unknown Alias',
          location: 'Distributed (VPN)',
          isp: 'Mullvad VPN',
          riskScore: 60
        },
        connectedAccounts: [
          { platform: 'Reddit', handle: value, status: 'Active', lastSeen: '10 mins ago' },
          { platform: 'Steam', handle: value, status: 'Active', lastSeen: '2 hours ago' },
          { platform: 'Twitch', handle: value + '_live', status: 'Offline', lastSeen: '3 days ago' },
          { platform: 'Roblox', handle: value + '123', status: 'Banned', lastSeen: '1 month ago' },
          { platform: 'Pinterest', handle: value + '_pins', status: 'Active', lastSeen: '1 week ago' },
          { platform: 'Spotify', handle: value, status: 'Active', lastSeen: 'Today' }
        ],
        breaches: ['MySpace', 'Tumblr'],
        dossier: 'Username pattern suggests a younger operator. High activity in gaming communities.'
      };
    } else {
      return {
        target: value,
        type: 'Domain',
        confidence: '99%',
        identity: {
          name: 'Privacy Protected',
          location: 'Iceland (Server Location)',
          isp: 'Cloudflare Inc.',
          riskScore: 92
        },
        connectedAccounts: [
          { platform: 'Nameserver 1', handle: 'ns1.darkweb.host', status: 'Active', lastSeen: 'Now' },
          { platform: 'Nameserver 2', handle: 'ns2.darkweb.host', status: 'Active', lastSeen: 'Now' },
          { platform: 'SSL Cert', handle: 'Let\'s Encrypt', status: 'Valid', lastSeen: 'Issued 2 days ago' }
        ],
        dnsHistory: [
          { date: '2023-10-01', ip: '192.168.1.1', owner: 'DigitalOcean' },
          { date: '2023-09-15', ip: '10.0.0.5', owner: 'AWS' }
        ],
        breaches: [],
        dossier: 'Domain registered via privacy proxy. Hosts known C2 infrastructure.'
      };
    }
  };

  const startScan = () => {
    if (!query) return;
    setIsScanning(true);
    setResults(null);
    setLogs([]);
    setProgress(0);

    const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'GitHub', 'TikTok', 'Reddit', 'Pinterest', 'Snapchat', 'VK', 'Weibo', 'Telegram', 'Discord', 'Steam', 'Twitch', 'Medium', 'Quora', 'Tumblr', 'Vimeo', 'SoundCloud'];
    let currentProgress = 0;
    const logInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15);
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const status = Math.random() > 0.7 ? 'FOUND' : 'Not Found';
      if (status === 'FOUND') {
        setLogs(prev => [`[+] ${randomPlatform}: Match found!`, ...prev.slice(0, 8)]);
      } else {
        setLogs(prev => [`[-] ${randomPlatform}: No match`, ...prev.slice(0, 8)]);
      }

      if (currentProgress === 100) {
        clearInterval(logInterval);
        setTimeout(() => {
          setResults(generateMockData(queryType, query));
          setIsScanning(false);
        }, 800);
      }
    }, 300);
  };

  return (
    <div className="hunter-engine-container">
      <header className="hunter-header">
        <h2>🕸️ THE HUNTER ENGINE</h2>
        <div className="status-badge">SYSTEM ONLINE</div>
      </header>

      <div className="search-interface">
        <div className="input-group">
          <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="phone">Phone Number</option>
            <option value="domain">Domain</option>
          </select>
          <input 
            type="text" 
            placeholder={`Enter ${queryType} to hunt...`} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startScan()}
          />
          <button onClick={startScan} disabled={isScanning || !query}>
            {isScanning ? 'HUNTING...' : 'INITIATE HUNT'}
          </button>
        </div>
      </div>

      {isScanning && (
        <div className="scanning-overlay">
          <div className="radar-scan"></div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="console-logs">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('Found') ? 'log-success' : 'log-info'}>{log}</div>
            ))}
          </div>
          <p className="scan-text">Scanning 50+ platforms • Cross-referencing breached DBs • Analyzing DNS...</p>
        </div>
      )}

      {results && !isScanning && (
        <div className="dossier-results">
          <div className="dossier-header">
            <h3>🎯 TARGET DOSSIER</h3>
            <span className="confidence">Confidence: {results.confidence}</span>
          </div>
          
          <div className="identity-card">
            <div className="id-main">
              <div className="avatar-placeholder">👤</div>
              <div>
                <h4>{results.identity.name}</h4>
                <p className="target-value">{results.target}</p>
                <div className="meta-tags">
                  <span>📍 {results.identity.location}</span>
                  <span>🌐 {results.identity.isp}</span>
                  <span className={`risk-tag risk-${results.identity.riskScore > 80 ? 'high' : 'med'}`}>Risk: {results.identity.riskScore}</span>
                </div>
              </div>
            </div>
            <div className="dossier-summary">
              <strong>INTEL SUMMARY:</strong> {results.dossier}
            </div>
          </div>

          <div className="data-grid">
            <div className="panel accounts-panel">
              <h4>🔗 Connected Accounts</h4>
              <table>
                <thead>
                  <tr><th>Platform</th><th>Handle</th><th>Status</th><th>Last Seen</th></tr>
                </thead>
                <tbody>
                  {results.connectedAccounts.map((acc, i) => (
                    <tr key={i}>
                      <td>{acc.platform}</td>
                      <td>{acc.handle}</td>
                      <td><span className={`status-dot ${acc.status === 'Active' || acc.status === 'Match found!' ? 'active' : 'inactive'}`}></span> {acc.status}</td>
                      <td>{acc.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel breaches-panel">
              <h4>💥 Breach Database Hits</h4>
              {results.breaches.length > 0 ? (
                <ul>
                  {results.breaches.map((b, i) => <li key={i} className="breach-item">⚠️ {b}</li>)}
                </ul>
              ) : (
                <p>No major breaches found in public databases.</p>
              )}
              
              {results.dnsHistory && (
                <>
                  <h4>📜 DNS History</h4>
                  <ul>
                    {results.dnsHistory.map((dns, i) => (
                      <li key={i} className="dns-item">{dns.date} → {dns.ip} ({dns.owner})</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          
          <div className="action-bar">
            <button className="btn-export">Export PDF Report</button>
            <button className="btn-alert">Add to Watchlist</button>
            <button className="btn-share">Share Intel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HunterEngine;
