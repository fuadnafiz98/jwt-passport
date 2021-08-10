import app from "./app";
import config from "./config";

app.listen(config.application.PORT, () => {
  console.log(`listening on port ${config.application.PORT}`);
});
