export const matchTimeline = [
  {
    minute: '12',
    type: 'goal',
    team: 'Arsenal',
    label: 'Goal',
    description: 'Bukayo Saka finishes a quick counter-attack.',
    player: 'Bukayo Saka',
  },
  {
    minute: '31',
    type: 'card',
    team: 'Liverpool',
    label: 'Yellow card',
    description: 'Curtis Jones booked for a tactical foul.',
    player: 'Curtis Jones',
  },
  {
    minute: '58',
    type: 'substitution',
    team: 'Liverpool',
    label: 'Substitution',
    description: 'Diogo Jota replaces Luis Díaz.',
    player: 'Diogo Jota',
  },
  {
    minute: '67',
    type: 'goal',
    team: 'Liverpool',
    label: 'Goal',
    description: 'Mohamed Salah converts from the penalty spot.',
    player: 'Mohamed Salah',
  },
  {
    minute: '81',
    type: 'var',
    team: 'Arsenal',
    label: 'VAR review',
    description: 'A possible handball check is under review.',
    player: 'No player',
  },
]

export const statComparison = [
  { label: 'Possession', home: 58, away: 42 },
  { label: 'Shots', home: 12, away: 9 },
  { label: 'Shots on target', home: 6, away: 4 },
  { label: 'Pass accuracy', home: 84, away: 79 },
  { label: 'Corners', home: 5, away: 3 },
]

export const trendingSearches = [
  'Arsenal',
  'Premier League',
  'Lyon',
  'Copa del Rey',
  'Barcelona',
]

export const searchFilters = ['All sports', 'Football', 'Women', 'Live now', 'Tomorrow']

export const dashboardWidgets = [
  { id: 'live', label: 'Live matches', enabled: true },
  { id: 'favourites', label: 'Favourites', enabled: true },
  { id: 'standings', label: 'Standings', enabled: true },
  { id: 'news', label: 'Trending news', enabled: false },
  { id: 'watchlist', label: 'Watchlist', enabled: true },
]

export const recommendations = [
  { id: 'rec-1', title: 'Arsenal vs Liverpool', detail: 'High-intensity title clash', time: 'Today, 18:30' },
  { id: 'rec-2', title: 'Barcelona Femeni vs Lyon', detail: 'European action and momentum', time: 'Today, 21:00' },
  { id: 'rec-3', title: 'Real Madrid vs Barcelona', detail: 'El Clásico pressure build-up', time: 'Tomorrow, 20:00' },
]
