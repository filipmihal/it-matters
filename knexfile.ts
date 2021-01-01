module.exports = {
    client: 'postgresql',
    connection: {
        database: 'postgres',
        user: 'postgres',
        password: 'password',
        port: 5432,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
}
