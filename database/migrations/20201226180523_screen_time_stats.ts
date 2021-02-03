import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    CREATE TABLE screen_time_stats (
        user_id uuid NOT NULL,
        overall_screen_time_ms int NOT NULL,
        correct_cycles smallint NOT NULL,
        worst_cycle_ms int NOT NULL,
        day DATE NOT NULL,
        PRIMARY KEY (user_id, day)
    )
    `)
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        DROP TABLE screen_time_stats
    `)
}
