import * as express from "express";
import { Request, Response } from "express";
import HelloWorld from "@/HelloWorld";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send(new HelloWorld().message("Hello World!"));
});

app.listen(3000, () => console.log("listening on port 3000!"));
0;
