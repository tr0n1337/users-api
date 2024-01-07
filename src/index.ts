import { config } from "dotenv";

import { server } from "@/server";

const main = async () => {
  config();

  const port = process.env.PORT || 3001;

  server.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
