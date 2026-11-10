import { Search, Sparkles, TrendingUp } from 'lucide-react'
import { searchFilters, trendingSearches } from '../data/advanced'

export default function DiscoveryPanel() {
  return (
    <div className="panel-card advanced-panel">
      <div className="advanced-header">
        <div>
          <p className="eyebrow">Discovery</p>
          <h2>Search and trends</h2>
        </div>
        <Sparkles size={18} />
      </div>

      <div className="search-toolbar">
        <label className="mini-search">
          <Search size={14} />
          <input type="text" value="Arsenal" readOnly />
        </label>
      </div>

      <div className="filter-pills">
        {searchFilters.map((filter) => (
          <button type="button" key={filter} className="filter-pill-btn">
            {filter}
          </button>
        ))}
      </div>

      <div className="trending-list">
        <h3>Trending</h3>
        {trendingSearches.map((term) => (
          <div key={term} className="trending-item">
            <TrendingUp size={14} />
            <span>{term}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
