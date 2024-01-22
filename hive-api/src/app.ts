import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// sqlite
// import agentRoutes from './routes/agents'
import { AgentController } from './routes/agent.controller';
// mongoDB
export const MONGO_URL = "mongodb://localhost:27017/Pokemon";
import { PokemonController } from "./routes/pokemon.controller";
import { PokemonService } from "./services/pokemon.service";
import mongoose, { ConnectOptions } from "mongoose";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setController();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  }

  private setController() {
    // store in sqlite
    // this.app.use("/api/agents", agentRoutes)
    const agentController = new AgentController();
    this.app.use("/api/agents", agentController.router);


    // store in mongoDB
    const pokemonController = new PokemonController(new PokemonService());
    this.app.use("/pokemon", pokemonController.router);
  }

}

export default new App().app;