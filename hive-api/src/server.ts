import app from "./app";
const PORT = 3008

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

import { connection } from "./models/book.model";

const launch = async () => {
  try {
    await connection();
    // await app.listen(3333);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

launch();
