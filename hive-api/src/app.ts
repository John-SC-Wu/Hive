import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import agentRoutes from './routes/agents'

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setController();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setController() {
    this.app.use("/api/agents", agentRoutes)
  }

}

export default new App().app;