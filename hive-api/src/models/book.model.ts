import { EntitySchema } from "typeorm";

export class Book {
  name: string;
  description: string;
  format: string;

  constructor(name: string, description: string, format: string) {
    this.name = name;
    this.description = description;
    this.format = format;
  }
}

export const BookEntity = new EntitySchema({
  name: "Books",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    format: {
      type: String,
    },
  },
});

import { createConnection } from "typeorm";

export const connection = async () => {
  return await createConnection({
    name: "default",
    type: "sqlite",
    database: "books.db",
    entities: [BookEntity],
    logging: true,
    synchronize: true,
  });
};