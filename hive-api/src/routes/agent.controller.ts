import { Request, Response, Router } from "express"
import db from "../models/sqliteDB";

export class AgentController {
  public router = Router();

  constructor() {
    this.router.route("/all").get(this.findAll);
    this.router.route("/").post(this.add).put(this.update).delete(this.delete);
    // this.router.route("/:id").put(this.update).delete(this.delete);
  }

  private add = async (req: Request, res: Response) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email
      }
      const sql = "INSERT INTO agents (name, email) VALUES (?,?)";
      const params = [data.name, data.email]
      db.run(sql, params, (err: any, result: any) => {
        if (err) {
          res.status(400).json({ "error": err.message })
          return;
        }
        res.json({
          "message": "success",
        })
      })
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const queryStatement = "SELECT * FROM agents"
      db.all(queryStatement, (err: any, rows: any) => {
        // console.log(rows)
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        res.json({
          "message": "success",
          "data": rows
        })
      });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const data = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email
      }
      const sql = "UPDATE agents SET name=?,email=? WHERE id=? ";
      const params = [data.name, data.email, data.id]
      db.run(sql, params, (err: any, result: any) => {
        if (err) {
          res.status(400).json({ "error": err.message })
          return;
        }
        res.json({
          "message": "success",
        })
      })
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const data = {
        id: req.body.id
      }

      // --- check the user ---
      const queryStatement = "SELECT * FROM agents WHERE id=?"
      const params = [data.id]
      db.get(queryStatement, params, (err: any, row: any) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        if (typeof row === "undefined") {
          res.status(404).send({
            "message": "User NotFound"
          })
          return;
        }
        const sql = "DELETE FROM agents WHERE id=?";
        const params1 = [data.id]
        db.run(sql, params1, (err: any, result: any) => {
          if (err) {
            res.status(400).json({
              "message": err.message
            })
            return;
          }
          res.json({
            "message": "success"
          })
        })
      })

    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

}
