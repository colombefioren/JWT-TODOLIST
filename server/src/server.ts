import app from "./app";
import config from "./config/env";

app.listen(config.port, () => {
  console.log("Server is running on our lovely port : " + config.port);
});
