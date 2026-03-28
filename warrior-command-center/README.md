# 🎮 Warrior Command Center

A real-time threat intelligence dashboard for digital warriors fighting against scammers and cyber threats.

## Features

- **🗺️ Live Attack Map**: Real-time visualization of attacks targeting your region
- **👤 Scammer Database**: Comprehensive database of known bad actors with status tracking
- **🚨 Automated Alerts**: Instant notifications when you or your network gets targeted
- **📡 Share Intel**: One-click intelligence sharing with other warriors in the network
- **📊 Campaign Tracker**: Monitor active scam campaigns in real-time

## Tech Stack

- React 18
- Vite (Fast build tool)
- Modern CSS with animations
- Real-time data simulation

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd warrior-command-center

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
warrior-command-center/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main application component
│   └── index.css       # Global styles
└── README.md           # This file
```

## Features Detail

### Live Attack Map
- Displays attack locations on an interactive map
- Color-coded severity indicators (Critical, High, Medium, Low)
- Hover for detailed attack information
- Auto-updates every 8 seconds with new simulated threats

### Scammer Database
- Tracks known scammers with unique identifiers
- Shows scam type, report count, and status
- Last seen timestamps for active monitoring
- Status filtering (Active, Banned, Under Investigation)

### Automated Alerts
- Real-time alert generation
- Severity-based color coding
- Timestamp tracking
- Automatic dismissal after viewing

### Intelligence Sharing
- One-click sharing button
- Community notification system
- Contribution tracking statistics

### Statistics Dashboard
- Total attacks tracked
- Attacks blocked today
- Active scammers count
- Intelligence shared metrics

## Customization

### Adding Real Data Sources
To connect real threat intelligence feeds:

1. Replace mock data arrays with API calls
2. Implement WebSocket connections for real-time updates
3. Add authentication for secure data access

### Styling
Modify `src/index.css` to customize:
- Color scheme
- Animation speeds
- Layout grids
- Responsive breakpoints

## Security Considerations

⚠️ **Important**: This is a demonstration project with simulated data. For production use:

- Implement proper authentication
- Use HTTPS for all communications
- Sanitize all user inputs
- Rate limit API endpoints
- Encrypt sensitive data at rest and in transit

## Contributing

Contributions welcome! Areas for improvement:
- Real API integrations
- User authentication system
- Database backend
- Mobile responsive design enhancements
- Additional visualization types

## License

MIT License - Feel free to use and modify for your security operations.

---

**Stay Vigilant | Share Intelligence | Protect Together** 🛡️
