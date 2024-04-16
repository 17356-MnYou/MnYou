import express from "express";
import cors from "cors";
import apiRouter from "./api";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is alive on http://localhost:${process.env.SERVER_PORT}`),
);
