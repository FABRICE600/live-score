import { Star, Clock3, Trophy, MapPin } from 'lucide-react'

export default function MatchCard({ match, isFavourite, onToggleFavourite }) {
  const statusText = match.status === 'LIVE' ? `${match.minute}` : match.status === 'HT' ? 'Half-time' : match.status === 'FT' ? 'Full time' : match.status === 'POSTPONED' ? 'Postponed' : match.status === 'SCHEDULED' ? match.kickoff : match.status

  return (
    <article className="match-card">
      <div className="match-card__top">
        <span className="chip chip--competition">{match.competition}</span>
        <button
          type="button"
          className={`icon-btn ${isFavourite ? 'is-active' : ''}`}
          onClick={() => onToggleFavourite(match)}
          aria-label={isFavourite ? 'Remove favourite' : 'Add favourite'}
        >
          <Star size={16} fill={isFavourite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="match-card__main">
        <div className="team team--home">
          <img src={match.homeLogo} alt={match.homeTeam} />
          <strong>{match.homeTeam}</strong>
        </div>

        <div className="score-block">
          <div className="score-line">
            <span>{match.homeScore ?? 0}</span>
            <span className="seperator">:</span>
            <span>{match.awayScore ?? 0}</span>
          </div>
          <div className="match-meta">
            <Clock3 size={12} /> {statusText}
          </div>
        </div>

        <div className="team team--away">
          <img src={match.awayLogo} alt={match.awayTeam} />
          <strong>{match.awayTeam}</strong>
        </div>
      </div>

      <div className="match-card__bottom">
        <span><Trophy size={12} /> {match.country}</span>
        <span><MapPin size={12} /> {match.venue}</span>
      </div>
    </article>
  )
}
