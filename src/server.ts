import * as http from "http";
import { AddressInfo } from "net";
import Environment from "./environment/environment";
import { setGlobalEnvironment } from "./global";
import App from "./app";
import connect from "./db/connect";

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
