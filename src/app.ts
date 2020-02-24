import { json } from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import customerRoutes from "./routes/customers";

export const app = express();
const port = 8080 || process.env.PORT;

app.use(json());
app.use(cors());
app.use("/", customerRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port);
