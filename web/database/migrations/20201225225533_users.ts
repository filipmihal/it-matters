import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE users (
        id uuid DEFAULT uuid_generate_v4 (),
        name VARCHAR NOT NULL,
        api_key TEXT NOT NULL,
        PRIMARY KEY (id)
    )
    `)
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        DROP TABLE users;
    `)
}
