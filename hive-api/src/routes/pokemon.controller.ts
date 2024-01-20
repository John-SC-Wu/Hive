import { Request, Response, Router } from "express";
import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  public router = Router();

  constructor(private pokemonService: PokemonService) {
    this.router.route("/").get(this.sayHello).post(this.add);
    this.router.route("/all").get(this.findAll);
    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  // --- supporting functions ---
  private add = async (req: Request, res: Response) => {
    try {
      const addPokemonResult = await this.pokemonService.add(req.body);
      res.send(addPokemonResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private sayHello = (_: Request, res: Response) => {
    const welcomeMessasge = this.pokemonService.getWelcomeMessage();
    res.send(welcomeMessasge);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const pokemon = await this.pokemonService.findAll();
      console.log(pokemon);
      res.send(pokemon);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.pokemonService.update(
        req.params.id,
        req.body
      );
      res.send(updatePokemonResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const deletePokemonResult = await this.pokemonService.delete(
        req.params.id
      );
      res.send(deletePokemonResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

}