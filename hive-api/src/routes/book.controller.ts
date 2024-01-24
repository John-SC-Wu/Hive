import { Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { Book, BookEntity } from "../models/book.model";


export class BookController {
  public router = Router();

  constructor() {
    this.router.route("/")
      .get(this.findAll)
      .post(this.createOne);
    this.router.route("/:id")
      .get(this.readOne)
      .put(this.updateOne)
      .delete(this.deleteOne);
  }

  private findAll = async (_: Request, res: Response) => {
    const Books = getRepository(BookEntity);
    const data = await Books.find();
    return res.send({ data });
  }

  private readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const Books = getRepository(BookEntity);
    const book = await Books.findOne({ where: { id: id } });
    return res.send({ book });
  }

  private createOne = async (req: Request, res: Response) => {
    const Books = getRepository(BookEntity);
    const book = new Book(
      req.body.name,
      req.body.description,
      req.body.format
    );
    const data = await Books.save(book);
    return res.send({ data });
  }

  private updateOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const Books = getRepository(BookEntity);
    await Books.update({ id }, { ...req.body });
    const book = await Books.findOne({ where: { id: id } });
    return res.send({ book });
  }

  private deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const Books = getRepository(BookEntity);
    const bookToRemove = await Books.findOne({ where: { id: id } });
    // await Books.remove(bookToRemove);
    await Books.delete(id);
    return res.send({ book: bookToRemove });
  }

}