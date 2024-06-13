import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    CREATE TABLE screen_time_raw (
        user_id uuid NOT NULL,
        is_looking_at_screen BOOLEAN NOT NULL,
        period smallint NOT NULL,
        recorded_at timestamp with time zone NOT NULL,
        PRIMARY KEY (user_id, recorded_at)
    )
    `)
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        DROP TABLE screen_time_raw;
    `)
}
