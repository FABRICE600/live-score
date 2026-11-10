import { Activity, Clock3, Goal, ShieldAlert, TrendingUp } from 'lucide-react'
import { matchTimeline, statComparison } from '../data/advanced'

export default function MatchCentre() {
  return (
    <div className="panel-card advanced-panel">
      <div className="advanced-header">
        <div>
          <p className="eyebrow">Live match centre</p>
          <h2>Arsenal vs Liverpool</h2>
        </div>
        <div className="live-pill"><Activity size={12} /> Live</div>
      </div>

      <div className="centre-scoreboard">
        <div className="score-box">
          <span className="team-name">Arsenal</span>
          <strong>2</strong>
        </div>
        <div className="match-phase">
          <Clock3 size={14} /> 67'
        </div>
        <div className="score-box score-box--away">
          <span className="team-name">Liverpool</span>
          <strong>1</strong>
        </div>
      </div>

      <div className="timeline-row">
        {matchTimeline.map((event) => (
          <div key={`${event.minute}-${event.label}`} className="timeline-item">
            <div className="timeline-minute">{event.minute}'</div>
            <div className={`timeline-badge timeline-badge--${event.type}`}>
              {event.type === 'goal' ? <Goal size={12} /> : event.type === 'card' ? <ShieldAlert size={12} /> : <TrendingUp size={12} />}
            </div>
            <div>
              <strong>{event.label}</strong>
              <p>{event.team}: {event.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-panel">
        <h3>Match statistics</h3>
        <div className="stats-rows">
          {statComparison.map((stat) => (
            <div key={stat.label} className="stat-row">
              <span>{stat.label}</span>
              <div className="bars">
                <div className="bar-group">
                  <div className="bar bar-home" style={{ width: `${stat.home}%` }} />
                </div>
                <div className="bar-values">
                  <strong>{stat.home}</strong>
                  <span>vs</span>
                  <strong>{stat.away}</strong>
                </div>
                <div className="bar-group">
                  <div className="bar bar-away" style={{ width: `${stat.away}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
