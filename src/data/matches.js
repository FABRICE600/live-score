const leagueTemplates = [
  { competition: 'Premier League', country: 'England', teams: ['Arsenal', 'Liverpool', 'Chelsea', 'Man City', 'Tottenham', 'Manchester United', 'Newcastle', 'Everton', 'Leicester', 'West Ham'] },
  { competition: 'La Liga', country: 'Spain', teams: ['Real Madrid', 'Barcelona', 'Atletico Madrid', 'Valencia', 'Sevilla', 'Real Sociedad', 'Girona', 'Villarreal', 'Athletic Club', 'Betis'] },
  { competition: 'Serie A', country: 'Italy', teams: ['Juventus', 'Napoli', 'Inter Milan', 'AC Milan', 'Roma', 'Lazio', 'Fiorentina', 'Atalanta', 'Sassuolo', 'Sampdoria'] },
  { competition: 'Bundesliga', country: 'Germany', teams: ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Borussia Monchengladbach', 'Freiburg', 'Mainz', 'Wolfsburg', 'Eintracht Frankfurt', 'Stuttgart'] },
  { competition: 'Ligue 1', country: 'France', teams: ['Paris Saint-Germain', 'Marseille', 'Monaco', 'Lyon', 'Nice', 'Lille', 'Rennes', 'Strasbourg', 'Nantes', 'Lens'] },
  { competition: 'UEFA Champions League', country: 'Europe', teams: ['Bayern Munich', 'Real Madrid', 'Barcelona', 'Inter Milan', 'Paris Saint-Germain', 'Manchester City', 'Liverpool', 'Arsenal', 'Porto', 'Juventus'] },
  { competition: 'Copa del Rey', country: 'Spain', teams: ['Sevilla', 'Atlético Madrid', 'Real Betis', 'Valencia', 'Getafe', 'Espanyol', 'Osasuna', 'Mallorca', 'Girona', 'Leganés'] },
  { competition: 'Women\'s Champions League', country: 'Europe', teams: ['Barcelona Femeni', 'Lyon', 'Chelsea', 'Arsenal Women', 'Bayern Munich Women', 'Manchester City Women', 'Roma Women', 'PSV Women', 'Benfica Women', 'Ajax Women'] },
]

function buildSampleMatches(count = 100) {
  const generated = []
  const statuses = ['LIVE', 'HT', 'FT', 'SCHEDULED', 'POSTPONED']
  const minuteValues = ['12\'', '31\'', '45+2\'', '67\'', 'Full Time', '19:45', '20:30', '21:00', 'Postponed']

  for (let index = 0; index < count; index += 1) {
    const league = leagueTemplates[index % leagueTemplates.length]
    const homeTeam = league.teams[index % league.teams.length]
    const awayTeam = league.teams[(index + 3) % league.teams.length]
    const status = statuses[index % statuses.length]
    const minute = minuteValues[index % minuteValues.length]
    const homeScore = status === 'LIVE' || status === 'HT' || status === 'FT' ? (index % 5) : null
    const awayScore = status === 'LIVE' || status === 'HT' || status === 'FT' ? ((index + 2) % 4) : null

    generated.push({
      id: `match-${index + 1}`,
      competition: league.competition,
      country: league.country,
      status,
      minute,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      homeLogo: `https://crests.football-data.org/${(index * 17) % 400 + 1}.png`,
      awayLogo: `https://crests.football-data.org/${(index * 19) % 500 + 2}.png`,
      kickoff: `${String((18 + (index % 6)) % 24).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}`,
      venue: `${homeTeam} Stadium`,
      source: 'demo-data',
    })
  }

  return generated
}

export const sampleMatches = buildSampleMatches(100)

export const sampleStandings = [
  { position: 1, club: 'Arsenal', played: 12, points: 31, goalDifference: 17 },
  { position: 2, club: 'Liverpool', played: 12, points: 29, goalDifference: 14 },
  { position: 3, club: 'Man City', played: 12, points: 27, goalDifference: 12 },
  { position: 4, club: 'Chelsea', played: 12, points: 23, goalDifference: 5 }
]

export const sampleNews = [
  {
    id: 'news-1',
    title: 'Premier League title race tightens after dramatic weekend',
    summary: 'Leaders Arsenal and Liverpool both recorded wins as the table continues to fluctuate at the summit.',
    source: 'BBC Sport',
    published: '2026-11-10T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'news-2',
    title: 'Real Madrid prepare for El Clásico with key injury updates',
    summary: 'Manager Carlo Ancelotti says the squad is improving ahead of a huge fixture with Barcelona.',
    source: 'Marca',
    published: '2026-11-10T08:00:00Z',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'news-3',
    title: "Women's Champions League preview: title favourites remain unbeaten",
    summary: "Barcelona, Lyon and Chelsea are expected to set the tone in this week's European fixtures.",
    source: 'ESPN',
    published: '2026-11-09T17:30:00Z',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80'
  }
]

export const sampleCompetitions = [
  { id: 'comp-1', name: 'Premier League', country: 'England', teams: 20 },
  { id: 'comp-2', name: 'La Liga', country: 'Spain', teams: 20 },
  { id: 'comp-3', name: 'UEFA Champions League', country: 'Europe', teams: 36 },
  { id: 'comp-4', name: 'Copa del Rey', country: 'Spain', teams: 16 },
  { id: 'comp-5', name: "Women's Champions League", country: 'Europe', teams: 16 }
]
