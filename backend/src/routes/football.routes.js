import { Router } from 'express'
import { getCompetitionsController, getMatchesController, getStandingsController } from '../controllers/football.controller.js'

const router = Router()

router.get('/matches', getMatchesController)
router.get('/competitions', getCompetitionsController)
router.get('/standings', getStandingsController)

export default router
