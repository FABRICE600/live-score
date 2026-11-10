import { LayoutGrid, Star } from 'lucide-react'
import { dashboardWidgets, recommendations } from '../data/advanced'

export default function PersonalDashboard() {
  return (
    <div className="panel-card advanced-panel">
      <div className="advanced-header">
        <div>
          <p className="eyebrow">Personalized</p>
          <h2>My dashboard</h2>
        </div>
        <LayoutGrid size={18} />
      </div>

      <div className="widget-list">
        {dashboardWidgets.map((widget) => (
          <label key={widget.id} className="widget-toggle">
            <input type="checkbox" defaultChecked={widget.enabled} />
            <span>{widget.label}</span>
          </label>
        ))}
      </div>

      <div className="recommendations-list">
        <h3>Recommended matches</h3>
        {recommendations.map((item) => (
          <div key={item.id} className="recommendation-item">
            <div>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </div>
            <div className="recommendation-meta">
              <Star size={13} />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
