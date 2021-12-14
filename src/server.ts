// import cors from "cors";
// import express from "express";
// import * as dotenv from "dotenv";
// import mongoose from "mongoose";
// import helmet from "helmet";
// import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";

// // import * as productCRUD from './product-crud';
//   import apiRouter from "./route/";
//   import errorMiddleware from "./middleware/error.middleware";

// dotenv.config();

// if (!process.env.PORT) {
//   console.log(`Error to get ports`);
//   process.exit(1);
// }

// const uri: string = process.env.MONGO as string;

// mongoose.connect(uri,{ replicaSet: 'rs' }, (err: any) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(`Connecting to MONGO`);
//   }
// });

// const PORT: number = parseInt(process.env.PORT as string, 10);

// const app = express();
// /** Logging */
// app.use(morgan("dev"));

// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   })
// );
// const server = app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

// app.use("/api/v1", apiRouter);

// app.use(errorMiddleware); // registration of handler

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");

//   next();
// });
// export default app;

import * as http from "http";
import { AddressInfo } from "net";
import Environment from "./environment/environment";
import { setGlobalEnvironment } from './global';
import App from './app';
import connect from './db/connect';

const env: Environment = new Environment();
setGlobalEnvironment(env);
const app: App = new App();
let server: http.Server;

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  // handle specific error codes here.
  throw error;
}

function serverListening(): void {
  const addressInfo: AddressInfo = <AddressInfo>server.address();
  console.log(`Listening on ${addressInfo.address}:${env.port}`);
}

app
  .init()
  .then(() => {
    app.express.set("port", env.port);
    connect();

    server = app.httpServer; // http.createServer(App);
    server.on("error", serverError);
    server.on("listening", serverListening);
    server.listen(env.port);
  })
  .catch((err: Error) => {
    console.info("app.init error");
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
  });

// process.on("unhandledRejection", (reason: Error) => {
//   console.error("Unhandled Promise Rejection: reason:", reason.message);
//   console.error(reason.stack);
//   // application specific logging, throwing an error, or other logic here
// });
