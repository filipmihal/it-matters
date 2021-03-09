import crypto from 'crypto'
import express from 'express'
import Knex from 'knex'
import path from 'path'
import { processScreenTime } from './utils'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, '../../client', 'build')))
app.use(express.json())
const userRouter = express.Router()

const hash = (key: string, salt: string): string => {
    const hashFunc = crypto.createHmac('sha256', salt)
    hashFunc.update(key)
    return hashFunc.digest('hex')
}

const knex = Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres',
    acquireConnectionTimeout: 2000,
})

/**
 * Each request in userRouter should include a URL param userId
 */
userRouter.use('/user/:id', async function (req, res, next) {
    const userId = req.params.id
    if (!userId) {
        return res.status(400).send('Missing user id')
    }

    try {
        if (!(await knex('users').where('id', userId).select('id'))) {
            return res.status(404).send('User id not found')
        }
    } catch {
        return res.status(400).send('Invalid user id')
    }
    let token
    const authHeader = req.headers.authorization ?? ''
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length)
    } else {
        return res.sendStatus(401)
    }

    const userKey = (await knex('users').where('id', userId).select('api_key').first()).api_key

    if (hash(token, process.env.HASH || 'J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkX') === userKey) {
        return next()
    } else {
        return res.sendStatus(401)
    }
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

/**
 * server receives report data from a client
 */
userRouter.post('/user/:id/report', async (req, res) => {
    const userId = req.params.id
    const reports = req.body.report_data
    if (!reports) {
        return res.sendStatus(400)
    }

    for (const report of reports) {
        await knex('screen_time_raw').insert({
            user_id: userId,
            is_looking_at_screen: report.is_looking_at_screen,
            period: report.period,
            recorded_at: report.recorded_at,
        })
    }

    return res.status(200).json(reports)
})

// TODO: move to tasks
userRouter.get('/user/:id/report', async (req, res) => {
    const userId = req.params.id
    const reports = await knex('screen_time_raw')
        .where('user_id', userId)
        .where(knex.raw('CAST(recorded_at AS DATE) = CAST(? AS DATE)', new Date()))
        .select('*')
        .orderBy('recorded_at', 'asc')
    const stats = processScreenTime(reports)

    await knex('screen_time_stats').insert({
        user_id: userId,
        overall_screen_time_ms: stats.screenTime,
        worst_cycle_ms: stats.worstCycle,
        correct_cycles: stats.cycles.length,
        day: new Date(),
    })
    return res.status(200).json(stats)
})

/**
 * API endpoint to query all stats
 */
userRouter.get('/user/:id/stats', async (req, res) => {
    const userId = req.params.id

    const stats = await knex('screen_time_stats')
        .where('user_id', userId)
        .select(
            'overall_screen_time_ms',
            'correct_cycles',
            'worst_cycle_ms',
            knex.raw("to_char(day, 'YYYY-MM-DD') as day"),
        )
    return res.status(200).json(stats)
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running :)`)
})

app.use('/api', userRouter)
