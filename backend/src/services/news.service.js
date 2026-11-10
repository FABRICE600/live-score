import dotenv from 'dotenv'

dotenv.config()

const NEWS_API_URL = process.env.NEWS_API_URL || 'https://newsapi.org/v2/top-headlines'
const NEWS_API_KEY = process.env.NEWS_API_KEY || ''

export async function getNews() {
  if (!NEWS_API_KEY) {
    return {
      source: 'demo-data',
      articles: [
        {
          title: 'Premier League title race tightens after dramatic weekend',
          description: 'Leaders Arsenal and Liverpool both recorded wins as the table continues to fluctuate at the summit.',
          source: { name: 'BBC Sport' },
          publishedAt: '2026-11-10T09:15:00Z',
          url: '#',
          urlToImage: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    }
  }

  const response = await fetch(`${NEWS_API_URL}?category=sports&language=en&apiKey=${NEWS_API_KEY}`)

  if (!response.ok) {
    throw new Error('News API request failed')
  }

  const data = await response.json()
  return { source: 'newsapi.org', articles: data.articles || [] }
}
