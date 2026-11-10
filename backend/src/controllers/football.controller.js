import { getCompetitions, getMatches, getStandings } from '../services/football.service.js'

export async function getMatchesController(req, res, next) {
  try {
    const payload = await getMatches()
    res.json(payload)
  } catch (error) {
    next(error)
  }
}

export async function getCompetitionsController(req, res, next) {
  try {
    const payload = await getCompetitions()
    res.json(payload)
  } catch (error) {
    next(error)
  }
}

export async function getStandingsController(req, res, next) {
  try {
    const { competitionId } = req.query
    const payload = await getStandings(competitionId)
    res.json(payload)
  } catch (error) {
    next(error)
  }
}
