import crypto from 'crypto'
import express from 'express'
import Knex from 'knex'
import { processScreenTime } from './utils'
const app = express()
const PORT = 8080

app.use(express.json())
const userRouter = express.Router()

const hash = (key: string, salt: string): string => {
    const hashFunc = crypto.createHmac('sha256', salt)
    hashFunc.update(key)
    return hashFunc.digest('hex')
}

/**
 * Each request in userRouter should include a URL param userId
 */
userRouter.use('/user/:id', async function (req, res, next) {
    const userId = req.params.id
    console.log('user id: ', userId)
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

    if (hash(token, 'J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkX') === userKey) {
        return next()
    } else {
        return res.sendStatus(401)
    }
})

const knex = Knex({
    client: 'pg',
    connection: {
        user: 'postgres',
        password: 'password',
        host: '127.0.0.1',
        port: 5432,
        database: 'postgres',
    },
    acquireConnectionTimeout: 2000,
})

knex.raw('SELECT * FROM users').then(() => {
    console.log('DB is connected :)')
})

userRouter.post('/user/:id/report', async (req, res) => {
    const userId = req.params.id
    const reports = req.body.report_data
    console.log(reports)
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

userRouter.get('/user/:id/report', async (req, res) => {
    const userId = req.params.id
    const reports = await knex('screen_time_raw')
        .where('user_id', userId)
        .where(knex.raw('CAST(recorded_at AS DATE) = CAST(now() AS DATE)'))
        .select('*')
        .orderBy('recorded_at', 'asc')
    const stats = processScreenTime(reports)
    return res.status(200).json(stats)
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})

app.use('/api', userRouter)
