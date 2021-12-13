import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";


// import * as productCRUD from './product-crud';
import apiRouter from "./route/";
import errorMiddleware from "./middleware/error.middleware";

dotenv.config();

if (!process.env.PORT) {
  console.log(`Error to get ports`);
  process.exit(1);
}

const uri: string = process.env.MONGO as string;

mongoose.connect(uri,{ replicaSet: 'rs' }, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connecting to MONGO`);
  }
});

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/** Logging */
app.use(morgan("dev"));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use("/api/v1", apiRouter);

app.use(errorMiddleware); // registration of handler

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");

  next();
});
