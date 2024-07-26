import app from "./app-init";
import { configs } from "./utils/config";

const PORT = configs.port;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
