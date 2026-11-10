import { Bell, Search, SunMedium, MoonStar, Globe, User, ChevronDown } from 'lucide-react'

export default function Header({ query, onQueryChange, theme, onToggleTheme, onSearchClear, account, onAccountClick }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark">LS</div>
        <div>
          <p className="eyebrow">Football hub</p>
          <h1>LiveScore</h1>
        </div>
      </div>

      <label className="search-box" aria-label="Search matches, teams and competitions">
        <Search size={16} />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search matches, teams, players..."
        />
        {query && (
          <button type="button" className="clear-search" onClick={onSearchClear}>Clear</button>
        )}
      </label>

      <nav className="header-actions" aria-label="User controls">
        <button type="button" className="control-pill" aria-label="Select language">
          <Globe size={16} />
          EN
          <ChevronDown size={14} />
        </button>

        <button type="button" className="control-pill control-pill--icon" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
        </button>

        <button type="button" className="control-pill control-pill--icon" aria-label="Notifications">
          <Bell size={16} />
        </button>

        <button type="button" className="profile-pill" aria-label="Account" onClick={onAccountClick}>
          <User size={16} />
          <span>{account?.email || 'Guest'}</span>
        </button>
      </nav>
    </header>
  )
}
