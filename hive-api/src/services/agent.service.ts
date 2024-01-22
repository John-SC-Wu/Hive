import db from "../models/sqliteDB";
import { promisify } from "util";
const query = promisify(db.all).bind(db);
interface IAgent {
  name: string;
  email: string;
}

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

export class AgentService {
  public getWelcomeMessage() {
    return "Hello, Agent!";
  }

  public async findAll() {
    const sql = "SELECT * FROM agents"
    return await query(sql);
  }

  public async add(agent: IAgent) {
    return await create({
      table: "agents",
      object: {
        "name": agent.name,
        "email": agent.email
      }
    });
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