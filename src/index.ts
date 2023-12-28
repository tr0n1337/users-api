import { config } from "dotenv";

import { MongoClient } from "@/database/mongo";

import { server } from "@/server/Server";

const main = async () => {
  config();

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  const app = server.listen(port, () =>
    console.log(`Listening on port ${port}!`),
  );

  process.on("SIGINT", () => {
    app.close();
    console.log(`Stop listening on port ${port}!`);
  });
};

main();
