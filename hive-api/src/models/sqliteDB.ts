import sqlite3 from "sqlite3"
sqlite3.verbose();
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err: any) => {
  if (err) {
    console.log(err)
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    const sqlCreate =
      `CREATE TABLE IF NOT EXISTS agents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE,
            CONSTRAINT email_unique UNIQUE (email)
            );`;
    // db.run(sqlCreate, err => {
    //   console.log('i am failing')
    //   console.log(err)
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log("Successful creation of the 'agents' table");
    // });
  }
})

export default db