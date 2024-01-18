import express, { Request, Response } from "express"
import db from "../models/sqliteDB";
const router = express.Router();

// READ agents
router.get("/", (_, res: Response) => {
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
})

// READ agent
router.get("/agent", (req: Request, res: Response) => {
  const id = req.body.userId
  // console.log("id", id)
  const queryStatement = "SELECT * FROM agents WHERE id=?"
  const params = [id]
  db.get(queryStatement, params, (err: any, row: any) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (typeof row === "undefined") {
      res.status(404).send({
        "message": "User NotFound"
      })
      return
    }
    res.json({
      "message": "success",
      "data": row
    })
  });
})

// CREATE agent
router.post("/", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email
  }
  console.log(data)
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
})

// UPDATE agent
router.put("/", (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
  }
  console.log(data)
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
})

// DELETE agent
router.delete("/", (req, res) => {
  const data = {
    id: req.body.id
  }

  //check the user
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
      return
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
        "message": "success",
      })
    })
  })
})

export default router;