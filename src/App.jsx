import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import {
  CalendarRange,
  CircleDot,
  Flag,
  Heart,
  Newspaper,
  Shield,
  Trophy,
  Zap,
} from 'lucide-react'
import './App.css'
import Header from './components/Header'
import LeagueSection from './components/LeagueSection'
import MatchCentre from './components/MatchCentre'
import DiscoveryPanel from './components/DiscoveryPanel'
import PersonalDashboard from './components/PersonalDashboard'
import NewsSection from './components/NewsSection'
import AccountDialog from './components/AccountDialog'
import { useLocalStorage } from './hooks/useLocalStorage'
import { sampleCompetitions, sampleMatches, sampleNews, sampleStandings } from './data/matches'
import { api } from './services/api'
import { supabase } from './lib/supabase'

const FALLBACK_MATCHES = sampleMatches

function DashboardPage() {
  const [theme, setTheme] = useLocalStorage('live-score-theme', 'light')
  const [searchQuery, setSearchQuery] = useLocalStorage('live-score-search', '')
  const [favourites, setFavourites] = useLocalStorage('live-score-favourites', [])
  const [matches, setMatches] = useState(FALLBACK_MATCHES)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [account, setAccount] = useState(null)
  const [accountOpen, setAccountOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [authPending, setAuthPending] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authMessage, setAuthMessage] = useState('')

  useEffect(() => {
    if (!supabase) return undefined

    let active = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setAccount(session?.user || null)
    })

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return
      setAccount(data.session?.user || null)
      if (sessionError) setAuthError(sessionError.message)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !account) return undefined

    let active = true
    async function loadAccountFavourites() {
      const { data, error: loadError } = await supabase
        .from('favourites')
        .select('match_id, home_team, away_team, competition')
        .eq('user_id', account.id)

      if (!active) return
      if (loadError) {
        setError(`Could not load saved favourites: ${loadError.message}`)
        return
      }

      setFavourites((data || []).map((item) => ({
        id: item.match_id,
        homeTeam: item.home_team || 'Home',
        awayTeam: item.away_team || 'Away',
        competition: item.competition || 'Football',
      })))
    }

    loadAccountFavourites()
    return () => {
      active = false
    }
  }, [account, setFavourites])

  useEffect(() => {
    let ignore = false

    async function loadMatches() {
      try {
        setIsLoading(true)
        setError('')
        const response = await api.getMatches()
        const liveMatches = response?.matches?.length ? response.matches : FALLBACK_MATCHES
        if (!ignore) {
          setMatches(liveMatches)
        }
      } catch (loadError) {
        if (!ignore) {
          setMatches(FALLBACK_MATCHES)
          setError(loadError.message || 'Failed to load live matches')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadMatches()
    return () => {
      ignore = true
    }
  }, [])

  const filteredMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return matches

    return matches.filter((match) => {
      const haystack = [
        match.homeTeam,
        match.awayTeam,
        match.competition,
        match.country,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [matches, searchQuery])

  const competitionGroups = useMemo(() => {
    const groups = {}
    filteredMatches.forEach((match) => {
      groups[match.competition] = groups[match.competition] || []
      groups[match.competition].push(match)
    })
    return Object.entries(groups)
  }, [filteredMatches])

  const toggleFavourite = async (match) => {
    const exists = favourites.some((item) => String(item.id) === String(match.id))
    setFavourites((current) => exists
      ? current.filter((item) => String(item.id) !== String(match.id))
      : [...current, match])

    if (!supabase || !account) return

    const result = exists
      ? await supabase.from('favourites').delete().eq('user_id', account.id).eq('match_id', String(match.id))
      : await supabase.from('favourites').insert({
        user_id: account.id,
        match_id: String(match.id),
        home_team: match.homeTeam,
        away_team: match.awayTeam,
        competition: match.competition,
      })

    if (result.error) {
      setError(`Could not save favourite: ${result.error.message}`)
      setFavourites((current) => exists
        ? [...current, match]
        : current.filter((item) => String(item.id) !== String(match.id)))
    }
  }

  const handleAuthenticate = async ({ email, password, mode }) => {
    if (!supabase) return
    setAuthPending(true)
    setAuthError('')
    setAuthMessage('')

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        if (!data.session) {
          setAuthMessage('Check your email to confirm your account, then sign in.')
        } else {
          setAccountOpen(false)
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        setAccountOpen(false)
      }
    } catch (authFailure) {
      setAuthError(authFailure.message || 'Authentication failed.')
    } finally {
      setAuthPending(false)
    }
  }

  const handleSignOut = async () => {
    if (!supabase) return
    setAuthPending(true)
    const { error: signOutError } = await supabase.auth.signOut()
    setAuthPending(false)
    if (signOutError) {
      setAuthError(signOutError.message)
      return
    }
    setFavourites([])
    setAccountOpen(false)
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Header
        query={searchQuery}
        onQueryChange={setSearchQuery}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        onSearchClear={() => setSearchQuery('')}
        account={account}
        onAccountClick={() => {
          setAuthError('')
          setAuthMessage('')
          setAccountOpen(true)
        }}
      />
      <AccountDialog
        account={account}
        configured={Boolean(supabase)}
        error={authError}
        message={authMessage}
        mode={authMode}
        onAuthenticate={handleAuthenticate}
        onClose={() => setAccountOpen(false)}
        onModeChange={(mode) => {
          setAuthMode(mode)
          setAuthError('')
          setAuthMessage('')
        }}
        onSignOut={handleSignOut}
        open={accountOpen}
        pending={authPending}
      />

      <main className="layout">
        <aside className="sidebar">
          <nav className="side-nav" aria-label="Main navigation">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`} end>
              <Zap size={16} /> Scores
            </NavLink>
            <NavLink to="/match-centre" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <Zap size={16} /> Match centre
            </NavLink>
            <NavLink to="/news" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <Newspaper size={16} /> News
            </NavLink>
            <NavLink to="/favourites" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <Heart size={16} /> Favourites
            </NavLink>
            <NavLink to="/competitions" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <Trophy size={16} /> Competitions
            </NavLink>
            <NavLink to="/standings" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <Shield size={16} /> Standings
            </NavLink>
            <NavLink to="/discovery" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <Flag size={16} /> Discovery
            </NavLink>
            <NavLink to="/personalized" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <CalendarRange size={16} /> Personalized
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <CalendarRange size={16} /> Settings
            </NavLink>
          </nav>

          <div className="sidebar-card">
            <p className="eyebrow">Live filters</p>
            <ul>
              <li><CircleDot size={12} /> Today</li>
              <li><Flag size={12} /> Upcoming</li>
              <li><Heart size={12} /> Favourites</li>
            </ul>
          </div>
        </aside>

        <section className="content-panel">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="hero-banner">
                    <div>
                      <p className="eyebrow">Matchday spotlight</p>
                      <h2>Live football for every big clash</h2>
                    </div>
                    <button type="button" className="primary-btn">View all fixtures</button>
                  </div>

                  {isLoading ? (
                    <div className="empty-state">Loading live matches...</div>
                  ) : searchQuery && filteredMatches.length === 0 ? (
                    <div className="empty-state">No matches found for “{searchQuery}”.</div>
                  ) : (
                    competitionGroups.map(([competition, competitionMatches]) => (
                      <LeagueSection
                        key={competition}
                        title={competition}
                        matches={competitionMatches}
                        favourites={favourites}
                        onToggleFavourite={toggleFavourite}
                      />
                    ))
                  )}

                  {error && !isLoading && (
                    <div className="empty-state">{error}</div>
                  )}
                </>
              }
            />
            <Route path="/match-centre" element={<MatchCentre />} />
            <Route path="/news" element={<NewsSection articles={sampleNews} />} />
            <Route path="/discovery" element={<DiscoveryPanel />} />
            <Route path="/personalized" element={<PersonalDashboard />} />
            <Route
              path="/favourites"
              element={
                <div className="panel-card">
                  <h2>Favourites</h2>
                  {favourites.length ? (
                    <div className="favourite-list">
                      {favourites.map((match) => (
                        <div key={match.id} className="favourite-row">
                          <span>{match.homeTeam} vs {match.awayTeam}</span>
                          <button type="button" onClick={() => toggleFavourite(match)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">No favourite matches yet.</div>
                  )}
                </div>
              }
            />
            <Route
              path="/competitions"
              element={
                <div className="panel-card">
                  <h2>Competitions</h2>
                  <div className="competitions-grid">
                    {sampleCompetitions.map((competition) => (
                      <div key={competition.id} className="competition-card">
                        <strong>{competition.name}</strong>
                        <span>{competition.country}</span>
                        <small>{competition.teams} teams</small>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/standings"
              element={
                <div className="panel-card">
                  <h2>Standings</h2>
                  <table className="standings-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Club</th>
                        <th>P</th>
                        <th>Pts</th>
                        <th>GD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleStandings.map((club) => (
                        <tr key={club.club}>
                          <td>{club.position}</td>
                          <td>{club.club}</td>
                          <td>{club.played}</td>
                          <td>{club.points}</td>
                          <td>{club.goalDifference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="panel-card">
                  <h2>Settings</h2>
                  <div className="settings-list">
                    <div><span>Theme</span><strong>{theme}</strong></div>
                    <div><span>Language</span><strong>English</strong></div>
                    <div><span>Timezone</span><strong>UTC</strong></div>
                    <div><span>Notifications</span><strong>Enabled</strong></div>
                  </div>
                </div>
              }
            />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  )
}
