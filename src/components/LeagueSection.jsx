import MatchCard from './MatchCard'

export default function LeagueSection({ title, matches, favourites, onToggleFavourite }) {
  return (
    <section className="league-section">
      <div className="league-section__header">
        <h2>{title}</h2>
        <span>{matches.length} matches</span>
      </div>

      <div className="league-section__grid">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isFavourite={favourites.some((item) => item.id === match.id)}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </div>
    </section>
  )
}
