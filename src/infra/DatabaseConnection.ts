import pgPromise from "pg-promise";

export const database = await pgPromise()('postgres://postgres:postgres@localhost:5432/postgres');
