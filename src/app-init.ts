import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/error-handler";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// authorization
// app.use();

app.use("/api", routes);

app.use(errorHandler);

export default app;
