import knex from "knex";

//-------------------
//MySQL motor engine
export const knexProducts = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        port: 3306, 
        database: "mysqlproductsdb" //this is workbench schema name
    }}
)

//-------------------
//SQLite3 motor engine
export const knexChats = knex({
    client: 'sqlite3',
    connection: {
        filename: 'DB/sqliteChatDB.sqlite'
    },
    useNullAsDefault: true
})


