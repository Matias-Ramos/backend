import knex from "knex";

//-------------------
//MySQL motor engine
// const knexClient = knex({
//     client: "mysql",
//     connection: {
//         host: "127.0.0.1",
//         user: "root",
//         port: 3306, 
//         database: "mynewdb" //this is workbench schema name
//     }}
// )

//-------------------
//SQLite3 motor engine
const knexClient = knex({
    client: 'sqlite3',
    connection: {
        filename: './DBtest/mydb.sqlite' 
    },
    useNullAsDefault: true
})

export default knexClient;
