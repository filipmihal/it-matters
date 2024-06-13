module.exports = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres',
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
}
