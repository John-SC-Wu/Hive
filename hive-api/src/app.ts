import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// sqlite3
import { AgentController } from './routes/agent.controller';
import { AgentService } from './services/agent.service';
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
    const agentController = new AgentController(new AgentService());
    this.app.use("/agents", agentController.router);


    // store in mongoDB
    const pokemonController = new PokemonController(new PokemonService());
    this.app.use("/pokemon", pokemonController.router);
  }

}

export default new App().app;