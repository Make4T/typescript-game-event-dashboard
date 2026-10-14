import { useMemo, useState } from 'react'
import './App.css'

type EventType = 'combat' | 'objective' | 'system' | 'social'

type TelemetryEvent = {
  id: string
  timestamp: string
  player: string
  type: EventType
  label: string
  map: string
  value: number
}

type PlayerSummary = {
  player: string
  sessions: number
  playtime: string
  objectiveScore: number
  status: 'online' | 'idle' | 'offline'
}

const events: TelemetryEvent[] = [
  { id: 'evt-0148', timestamp: '14:42:18', player: 'Aino', type: 'objective', label: 'Relay activated', map: 'Northstar', value: 125 },
  { id: 'evt-0147', timestamp: '14:41:53', player: 'Leo', type: 'combat', label: 'Enemy eliminated', map: 'Northstar', value: 45 },
  { id: 'evt-0146', timestamp: '14:41:20', player: 'Aino', type: 'social', label: 'Squad ping placed', map: 'Northstar', value: 1 },
  { id: 'evt-0145', timestamp: '14:40:57', player: 'Mika', type: 'system', label: 'Reconnected to session', map: 'Northstar', value: 1 },
  { id: 'evt-0144', timestamp: '14:40:11', player: 'Sara', type: 'combat', label: 'Critical damage dealt', map: 'Northstar', value: 88 },
  { id: 'evt-0143', timestamp: '14:39:45', player: 'Leo', type: 'objective', label: 'Supply cache secured', map: 'Northstar', value: 80 },
  { id: 'evt-0142', timestamp: '14:38:31', player: 'Mika', type: 'combat', label: 'Enemy eliminated', map: 'Northstar', value: 40 },
  { id: 'evt-0141', timestamp: '14:37:42', player: 'Sara', type: 'social', label: 'Revive completed', map: 'Northstar', value: 35 },
]

const players: PlayerSummary[] = [
  { player: 'Aino', sessions: 18, playtime: '21h 14m', objectiveScore: 682, status: 'online' },
  { player: 'Leo', sessions: 14, playtime: '17h 09m', objectiveScore: 514, status: 'online' },
  { player: 'Mika', sessions: 11, playtime: '12h 42m', objectiveScore: 413, status: 'idle' },
  { player: 'Sara', sessions: 9, playtime: '10h 56m', objectiveScore: 366, status: 'offline' },
]

const eventTypes: EventType[] = ['combat', 'objective', 'system', 'social']
const formatEventType = (type: EventType) => type[0].toUpperCase() + type.slice(1)

function App() {
  const [activeType, setActiveType] = useState<EventType | 'all'>('all')
  const [playerFilter, setPlayerFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filteredEvents = useMemo(() => events.filter((event) => {
    const matchesType = activeType === 'all' || event.type === activeType
    const matchesPlayer = playerFilter === 'all' || event.player === playerFilter
    const searchText = `${event.player} ${event.label} ${event.map}`.toLowerCase()
    return matchesType && matchesPlayer && searchText.includes(query.toLowerCase())
  }), [activeType, playerFilter, query])

  const eventCounts = useMemo(() => eventTypes.map((type) => ({
    type,
    count: events.filter((event) => event.type === type).length,
  })), [])

  return (
    <main className="dashboard-shell">
      <section className="dashboard" aria-label="Game event dashboard">
        <header className="topbar">
          <div className="brand"><span className="brand-mark" aria-hidden="true">/</span><div><p className="eyebrow">Operations console</p><h1>Event<span>Scope</span></h1></div></div>
          <div className="topbar-actions"><span className="environment"><i /> LIVE TELEMETRY</span><button type="button" className="export-button">Export report <span aria-hidden="true">&#8599;</span></button></div>
        </header>

        <section className="hero-row">
          <div><p className="eyebrow">Game analytics / Northstar build</p><h2>Session telemetry,<br /><em>made actionable.</em></h2><p className="hero-copy">Typed event data for a four-player co-op session. Track activity, objectives and player behavior from a single responsive interface.</p></div>
          <aside className="session-card" aria-label="Current session status"><div className="session-card-head"><span>ACTIVE SESSION</span><strong>04 / 04</strong></div><div className="session-map"><span className="map-grid" aria-hidden="true" /><div><b>Northstar Relay</b><small>EU-West / session #4872</small></div></div><div className="session-footer"><span><i className="pulse" /> Session stable</span><span>00:42:18</span></div></aside>
        </section>

        <section className="metrics-grid" aria-label="Key metrics">
          <article><span>Events captured</span><strong>1,248</strong><small className="positive">+18.4% <i>vs. previous session</i></small></article>
          <article><span>Objective rate</span><strong>72.8%</strong><small className="positive">+6.2% <i>completion trend</i></small></article>
          <article><span>Median latency</span><strong>34ms</strong><small className="neutral">Stable <i>EU-West relay</i></small></article>
          <article><span>Session health</span><strong>98.6</strong><small className="positive">Excellent <i>out of 100</i></small></article>
        </section>

        <section className="analysis-grid">
          <article className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Last 60 minutes</p><h3>Activity pulse</h3></div><span className="legend"><i /> Events / min</span></div><div className="chart" aria-label="Event activity chart">{[31, 45, 39, 66, 52, 88, 64, 72, 56, 91, 77, 96, 71, 84, 63, 79, 94, 68].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div><div className="chart-axis"><span>13:45</span><span>14:00</span><span>14:15</span><span>14:30</span><span>14:45</span></div></article>
          <article className="panel distribution-panel"><div className="panel-heading"><div><p className="eyebrow">Event mix</p><h3>Activity categories</h3></div><span className="total-label">1,248 total</span></div><div className="distribution-content"><div className="donut" aria-label="Event distribution"><span>100<small>%</small></span></div><ul>{eventCounts.map(({ type, count }) => <li key={type}><i className={`dot ${type}`} /><span>{formatEventType(type)}</span><b>{count * 31}%</b></li>)}</ul></div></article>
        </section>

        <section className="workspace-grid">
          <article className="panel events-panel"><div className="panel-heading table-heading"><div><p className="eyebrow">Stream</p><h3>Recent game events</h3></div><span>{filteredEvents.length} shown</span></div><div className="filters" aria-label="Event filters"><div className="filter-group">{(['all', ...eventTypes] as const).map((type) => <button key={type} type="button" className={activeType === type ? 'active' : ''} onClick={() => setActiveType(type)}>{type === 'all' ? 'All events' : formatEventType(type)}</button>)}</div><label className="search"><span aria-hidden="true">&#8981;</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search event stream" /></label></div><div className="event-table" role="table" aria-label="Recent game events"><div className="event-row table-header" role="row"><span>Time</span><span>Player</span><span>Event</span><span>Map</span><span>Value</span></div>{filteredEvents.map((event) => <div className="event-row" role="row" key={event.id}><time>{event.timestamp}</time><b>{event.player}</b><span className="event-label"><i className={`event-icon ${event.type}`} />{event.label}</span><span className="map-name">{event.map}</span><strong>+{event.value}</strong></div>)}{filteredEvents.length === 0 && <p className="empty-state">No events match these filters.</p>}</div></article>
          <aside className="panel players-panel"><div className="panel-heading"><div><p className="eyebrow">Cohort</p><h3>Player overview</h3></div></div><label className="select-label">Focus player<select value={playerFilter} onChange={(event) => setPlayerFilter(event.target.value)}><option value="all">All players</option>{players.map(({ player }) => <option key={player} value={player}>{player}</option>)}</select></label><div className="player-list">{players.map((player) => <article className="player-row" key={player.player}><span className={`avatar avatar-${player.player.toLowerCase()}`}>{player.player[0]}</span><div><b>{player.player}</b><small>{player.sessions} sessions / {player.playtime}</small></div><div className="player-score"><strong>{player.objectiveScore}</strong><small>objective</small></div><i className={`status ${player.status}`} title={player.status} /></article>)}</div><button type="button" className="outline-button">View player report <span aria-hidden="true">&#8594;</span></button></aside>
        </section>
      </section>
    </main>
  )
}

export default App
