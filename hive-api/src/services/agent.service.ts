import { IAgent } from "../interfaces/agent.interface";
import { Agent } from "../models/agent.model";


export class AgentService {
  public getWelcomeMessage() {
    return "Hello, Agent!";
  }

  public async findAll() {
    return await Agent.findAll();
  }

  public async add(agent: IAgent) {
    return await Agent.add(agent);
  }

  public async update(id: number, agent: IAgent) {
    return await Agent.update(id, agent);
  }

  public async delete(id: number) {
    return await Agent.delete(id);
  }

}