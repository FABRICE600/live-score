import dotenv from 'dotenv'

dotenv.config()

const FOOTBALL_BASE_URL = (process.env.FOOTBALL_API_BASE_URL || 'https://api.football-data.org/v4').replace(/\/$/, '')
const FOOTBALL_API_KEY = process.env.FOOTBALL_DATA_API_KEY || ''

function toStatus(match) {
  if (!match) return 'SCHEDULED'
  const status = match.status || 'SCHEDULED'
  if (status === 'IN_PLAY') return 'LIVE'
  if (status === 'PAUSED') return 'HT'
  if (status === 'FINISHED') return 'FT'
  if (status === 'SCHEDULED' || status === 'TIMED') return 'SCHEDULED'
  if (status === 'POSTPONED') return 'POSTPONED'
  if (status === 'CANCELLED') return 'CANCELLED'
  return status
}

function toMinute(match) {
  const minute = match?.score?.minute || match?.minute || ''
  if (minute && minute !== 'null') return minute
  return match?.status === 'IN_PLAY' ? 'Live' : match?.status === 'PAUSED' ? 'HT' : 'Scheduled'
}

function normalizeMatch(match) {
  const homeTeam = match.homeTeam || {}
  const awayTeam = match.awayTeam || {}
  const competition = match.competition || {}
  const venue = match.venue || 'TBD'
  const score = match.score || {}

  return {
    id: match.id || `${homeTeam.name || 'home'}-${awayTeam.name || 'away'}-${match.utcDate || Date.now()}`,
    competition: competition.name || 'Football',
    country: match.area?.name || competition.area?.name || 'World',
    status: toStatus(match),
    minute: toMinute(match),
    homeTeam: homeTeam.name || 'Home',
    awayTeam: awayTeam.name || 'Away',
    homeScore: score.fullTime?.home ?? score.halfTime?.home ?? null,
    awayScore: score.fullTime?.away ?? score.halfTime?.away ?? null,
    homeLogo: homeTeam.crest || '',
    awayLogo: awayTeam.crest || '',
    kickoff: match.utcDate ? new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'TBD',
    venue,
    source: 'football-data.org',
  }
}

async function fetchFootballData(path, params = {}) {
  const url = new URL(`${FOOTBALL_BASE_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url, {
    headers: {
      'X-Auth-Token': FOOTBALL_API_KEY,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Football API error (${response.status}): ${text}`)
  }

  return response.json()
}

export async function getMatches() {
  if (!FOOTBALL_API_KEY) {
    return {
      source: 'demo-data',
      matches: [
        {
          id: 'demo-arsenal-liverpool',
          competition: 'Premier League',
          country: 'England',
          status: 'LIVE',
          minute: '67\'',
          homeTeam: 'Arsenal',
          awayTeam: 'Liverpool',
          homeScore: 2,
          awayScore: 1,
          homeLogo: 'https://crests.football-data.org/57.png',
          awayLogo: 'https://crests.football-data.org/64.png',
          kickoff: '18:30',
          venue: 'Emirates Stadium',
          source: 'demo-data',
        },
      ],
    }
  }

  const from = new Date()
  const to = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)

  const data = await fetchFootballData('/matches', {
    dateFrom: from.toISOString().slice(0, 10),
    dateTo: to.toISOString().slice(0, 10),
  })

  return {
    source: 'football-data.org',
    matches: (data.matches || []).map(normalizeMatch),
  }
}

export async function getCompetitions() {
  if (!FOOTBALL_API_KEY) {
    return { source: 'demo-data', competitions: [{ id: 2021, name: 'Premier League', area: { name: 'England' } }] }
  }

  const data = await fetchFootballData('/competitions')
  return { source: 'football-data.org', competitions: data.competitions || [] }
}

export async function getStandings(competitionId) {
  if (!competitionId) {
    return { source: 'demo-data', standings: [] }
  }

  if (!FOOTBALL_API_KEY) {
    return { source: 'demo-data', standings: [] }
  }

  const data = await fetchFootballData(`/competitions/${competitionId}/standings`)
  return { source: 'football-data.org', standings: data.standings || [] }
}
