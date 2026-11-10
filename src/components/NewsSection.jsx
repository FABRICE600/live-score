export default function NewsSection({ articles }) {
  return (
    <section className="news-section">
      <div className="section-heading">
        <h2>Football News</h2>
        <span>Latest updates</span>
      </div>

      <div className="news-grid">
        {articles.map((article) => (
          <article key={article.id} className="news-card">
            <img src={article.image} alt={article.title} />
            <div className="news-card__content">
              <span className="chip chip--news">{article.source}</span>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <div className="news-card__meta">
                <span>{new Date(article.published).toLocaleDateString()}</span>
                <a href="#">Read more</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
