import sqlite3 from "sqlite3"
sqlite3.verbose();
const DBSOURCE = "agents.db"

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

    db.run(sqlCreate, err => {
      console.log(err)
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the 'agents' table");
    });
  }
})


import { promisify } from "util";
import { IAgent } from "../interfaces/agent.interface";

const query = promisify(db.all).bind(db);

interface IAgentTable {
  table: string;
  object: any;
  id?: number
}
const create = async ({ table, object }: IAgentTable) => {
  const keys = Object.keys(object).join(",");
  const values = Object.values(object).map((v) => `"${v}"`).join(",");
  const res = await query(`INSERT INTO ${table} (${keys}) VALUES (${values})`);
  return res;
};

const update = async ({ table, id, object }: IAgentTable) => {
  const pairs = Object.entries(object).map(([k, v]) => `${k}="${v}"`).join(",");
  const res = await query(`UPDATE ${table} SET ${pairs} WHERE id=${id}`);
  return res;
};

class AgentModel {
  constructor() { }

  public async add(agent: IAgent) {
    return await create({
      table: "agents",
      object: {
        "name": agent.name,
        "email": agent.email
      }
    });
  }

  public async findAll() {
    const sql = "SELECT * FROM agents"
    return await query(sql);
  }

  public async update(id: number, agent: IAgent) {
    return await update({
      table: "agents",
      id: id,
      object: {
        "name": agent.name,
        "email": agent.email
      }
    });
  }

  public async delete(id: number) {
    const sql = `DELETE FROM agents WHERE id=${id}`;
    await query(sql);
  }

}

export const Agent = new AgentModel();