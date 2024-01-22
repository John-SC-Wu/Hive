import { Request, Response, Router } from "express"
import db from "../models/sqliteDB";
import { promisify } from "util";
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


export class AgentController {
  public router = Router();

  constructor() {
    this.router.route("/all").get(this.findAll);
    this.router.route("/").post(this.add).put(this.update).delete(this.delete);
    // this.router.route("/:id").put(this.update).delete(this.delete);
  }

  private add = async (req: Request, res: Response) => {
    try {
      await create({
        table: "agents",
        object: {
          "name": req.body.name,
          "email": req.body.email
        }
      });
      res.json({ "message": "success" });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const sql = "SELECT * FROM agents"
      const result = await query(sql);
      res.json({ "message": "success", "data": result });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      await update({
        table: "agents",
        id: req.body.id,
        object: {
          "name": req.body.name,
          "email": req.body.email
        }
      });
      res.json({ "message": "success" });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const sql = `DELETE FROM agents WHERE id=${req.body.id}`;
      await query(sql);
      res.json({ "message": "success" });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

}
