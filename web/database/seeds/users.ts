import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: "9ce50074-7c9f-43d8-b4de-3298ee5c8b86", name: "Default user", api_key: "2d9648bd064a5fbd9007242278f4b5490c28a79c1e8adb50785452774cfb107b" }
    ]);
};
