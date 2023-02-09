import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT ? process.env.PORT : 5009;

app.listen(port, () => {
  console.log(`SERVER RUNNING IN THE PORT ${port}`);
});
