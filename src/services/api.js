const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json()
}

export const api = {
  getMatches: () => request('/football/matches'),
  getCompetitions: () => request('/football/competitions'),
  getStandings: (competitionId) => request(`/football/standings${competitionId ? `?competitionId=${competitionId}` : ''}`),
  getNews: () => request('/news'),
}
