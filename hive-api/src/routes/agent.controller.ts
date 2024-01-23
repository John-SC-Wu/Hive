import { Request, Response, Router } from "express"
import type { AgentService } from "../services/agent.service";

export class AgentController {
  public router = Router();

  constructor(private agentService: AgentService) {
    this.router.route("/all").get(this.findAll);
    this.router.route("/").post(this.add).put(this.update).delete(this.delete);
    // this.router.route("/:id").put(this.update).delete(this.delete);
  }

  private add = async (req: Request, res: Response) => {
    try {
      const newAgent = {
        "name": req.body.name,
        "email": req.body.email
      };
      await this.agentService.add(newAgent);
      res.json({ "message": "success" });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const result = await this.agentService.findAll();
      res.json({ "message": "success", "data": result });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const agent = {
        "name": req.body.name,
        "email": req.body.email,
      }
      await this.agentService.update(req.body.id, agent);
      res.json({ "message": "success" });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      this.agentService.delete(req.body.id);
      res.json({ "message": "success" });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

}
