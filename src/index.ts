import { app } from "@/server";

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
