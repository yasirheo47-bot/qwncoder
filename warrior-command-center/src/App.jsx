import { useState, useEffect } from 'react'

// Mock data for demonstration
const mockAttacks = [
  { id: 1, type: 'Phishing', location: 'Eastern Europe', target: 'Email Users', severity: 'High', x: 30, y: 25 },
  { id: 2, type: 'Ransomware', location: 'Southeast Asia', target: 'Healthcare', severity: 'Critical', x: 70, y: 40 },
  { id: 3, type: 'DDoS', location: 'North America', target: 'Financial Services', severity: 'Medium', x: 20, y: 35 },
  { id: 4, type: 'Malware', location: 'Africa', target: 'Mobile Users', severity: 'High', x: 50, y: 60 },
  { id: 5, type: 'Social Engineering', location: 'South America', target: 'Corporate', severity: 'Medium', x: 25, y: 70 },
]

const mockScammers = [
  { id: 1, name: 'PhishKing_2024', type: 'Email Phishing', reports: 1247, status: 'Active', lastSeen: '2 hours ago' },
  { id: 2, name: 'CryptoScammer99', type: 'Investment Fraud', reports: 892, status: 'Banned', lastSeen: '1 day ago' },
  { id: 3, name: 'FakeSupport_X', type: 'Tech Support Scam', reports: 2156, status: 'Active', lastSeen: '30 mins ago' },
  { id: 4, name: 'RomanceBot_AI', type: 'Romance Scam', reports: 634, status: 'Under Investigation', lastSeen: '5 hours ago' },
  { id: 5, name: 'LotteryWinner_Scam', type: 'Prize Fraud', reports: 1089, status: 'Active', lastSeen: '1 hour ago' },
]

const mockAlerts = [
  { id: 1, message: 'New phishing campaign detected targeting your region', time: '2 mins ago', severity: 'High' },
  { id: 2, message: 'Suspicious login attempt blocked from unknown IP', time: '15 mins ago', severity: 'Medium' },
  { id: 3, message: 'Known scammer database updated with 50 new entries', time: '1 hour ago', severity: 'Low' },
  { id: 4, message: 'Ransomware variant identified in the wild', time: '3 hours ago', severity: 'Critical' },
]

const mockCampaigns = [
  { id: 1, name: 'Operation DarkPhish', targets: 'Banking Customers', activeSince: '3 days', attacks: 15420, status: 'Active' },
  { id: 2, name: 'CryptoDrain', targets: 'Crypto Investors', activeSince: '1 week', attacks: 8930, status: 'Active' },
  { id: 3, name: 'HealthcareBreach', targets: 'Medical Records', activeSince: '2 weeks', attacks: 5670, status: 'Contained' },
  { id: 4, name: 'SocialMediaHijack', targets: 'Social Media Users', activeSince: '5 days', attacks: 23450, status: 'Active' },
]

function App() {
  const [attacks, setAttacks] = useState(mockAttacks)
  const [scammers, setScammers] = useState(mockScammers)
  const [alerts, setAlerts] = useState(mockAlerts)
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [notification, setNotification] = useState(null)
  const [stats, setStats] = useState({
    totalAttacks: 0,
    blockedToday: 0,
    activeScammers: 0,
    sharedIntel: 0
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add random new attack
      const newAttack = {
        id: Date.now(),
        type: ['Phishing', 'Ransomware', 'DDoS', 'Malware', 'Social Engineering'][Math.floor(Math.random() * 5)],
        location: ['Eastern Europe', 'Southeast Asia', 'North America', 'Africa', 'South America'][Math.floor(Math.random() * 5)],
        target: ['Email Users', 'Healthcare', 'Financial Services', 'Mobile Users', 'Corporate'][Math.floor(Math.random() * 5)],
        severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15
      }
      
      setAttacks(prev => [newAttack, ...prev.slice(0, 19)])
      
      // Show notification for high severity attacks
      if (newAttack.severity === 'Critical' || newAttack.severity === 'High') {
        setNotification(`🚨 ${newAttack.severity} Alert: ${newAttack.type} detected in ${newAttack.location}!`)
        setTimeout(() => setNotification(null), 5000)
      }

      // Update stats
      setStats({
        totalAttacks: prev => prev.totalAttacks + 1,
        blockedToday: Math.floor(Math.random() * 100) + 50,
        activeScammers: scammers.filter(s => s.status === 'Active').length,
        sharedIntel: Math.floor(Math.random() * 500) + 1000
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [scammers])

  const shareIntel = () => {
    alert('✅ Intelligence shared with warrior network! Other defenders have been notified.')
    setStats(prev => ({ ...prev, sharedIntel: prev.sharedIntel + 1 }))
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return '#ff0000'
      case 'High': return '#ff6600'
      case 'Medium': return '#ffcc00'
      case 'Low': return '#00ff88'
      default: return '#ffffff'
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🎮 WARRIOR COMMAND CENTER 🎮</h1>
        <p className="subtitle">Real-time threat intelligence & counter-operations dashboard</p>
      </header>

      {/* Notification */}
      {notification && (
        <div className="alert-notification">
          {notification}
        </div>
      )}

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-box">
          <div className="number">{stats.totalAttacks}</div>
          <div className="label">Total Attacks Tracked</div>
        </div>
        <div className="stat-box">
          <div className="number">{stats.blockedToday}</div>
          <div className="label">Blocked Today</div>
        </div>
        <div className="stat-box">
          <div className="number">{stats.activeScammers}</div>
          <div className="label">Active Scammers</div>
        </div>
        <div className="stat-box">
          <div className="number">{stats.sharedIntel}</div>
          <div className="label">Intel Shared</div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard">
        {/* Live Attack Map */}
        <div className="card live-map">
          <h2>🗺️ Live Attack Map</h2>
          <div className="map-container">
            {/* Simple world map representation */}
            <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%', opacity: 0.3 }}>
              <ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke="#00ff88" strokeWidth="0.5" />
              <circle cx="50" cy="30" r="1" fill="#00ff88" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#00ff88" strokeWidth="0.2" strokeDasharray="2,2" />
              <line x1="50" y1="0" x2="50" y2="60" stroke="#00ff88" strokeWidth="0.2" strokeDasharray="2,2" />
            </svg>
            
            {/* Attack points */}
            {attacks.map(attack => (
              <div
                key={attack.id}
                className="attack-point"
                style={{
                  left: `${attack.x}%`,
                  top: `${attack.y}%`,
                  backgroundColor: getSeverityColor(attack.severity)
                }}
                data-info={`${attack.type} - ${attack.location}\nTarget: ${attack.target}\nSeverity: ${attack.severity}`}
                title={`${attack.type} in ${attack.location}`}
              />
            ))}
          </div>
        </div>

        {/* Scammer Database */}
        <div className="card">
          <h2>👤 Scammer Database</h2>
          <div className="scammer-list">
            {scammers.map(scammer => (
              <div key={scammer.id} className={`scammer-item ${scammer.status === 'Banned' ? 'safe' : ''}`}>
                <div className="name">{scammer.name}</div>
                <div className="details">
                  Type: {scammer.type} | Reports: {scammer.reports}<br />
                  Status: {scammer.status} | Last Seen: {scammer.lastSeen}
                </div>
              </div>
            ))}
          </div>
          <button className="share-intel-btn" onClick={shareIntel}>
            📡 Share Intel
          </button>
        </div>

        {/* Automated Alerts */}
        <div className="card">
          <h2>🚨 Automated Alerts</h2>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.severity === 'Low' ? 'safe' : ''}`}>
                <div className="name" style={{ color: getSeverityColor(alert.severity) }}>
                  [{alert.severity}] {alert.message}
                </div>
                <div className="details">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Tracker */}
        <div className="card">
          <h2>📊 Active Campaigns</h2>
          <div className="campaigns-list">
            {campaigns.map(campaign => (
              <div key={campaign.id} className={`campaign-item ${campaign.status === 'Contained' ? 'safe' : ''}`}>
                <div className="name">{campaign.name}</div>
                <div className="details">
                  Targets: {campaign.targets}<br />
                  Active: {campaign.activeSince} | Attacks: {campaign.attacks.toLocaleString()}<br />
                  Status: {campaign.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #00ff88', marginTop: '30px' }}>
        <p>🛡️ Warrior Network v1.0 | Stay Vigilant | Share Intelligence | Protect Together</p>
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
          Real-time threat monitoring system for digital warriors
        </p>
      </footer>
    </div>
  )
}

export default App
