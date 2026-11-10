import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import footballRoutes from './routes/football.routes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { getNews } from './services/news.service.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || true, credentials: true }))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', limiter)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'live-score-backend',
    environment: process.env.NODE_ENV || 'development',
    footballApiConfigured: Boolean(process.env.FOOTBALL_DATA_API_KEY),
    newsApiConfigured: Boolean(process.env.NEWS_API_KEY),
  })
})

app.use('/api/football', footballRoutes)

app.get('/api/news', async (req, res, next) => {
  try {
    const payload = await getNews()
    res.json(payload)
  } catch (error) {
    next(error)
  }
})

app.use(errorHandler)

export default app
