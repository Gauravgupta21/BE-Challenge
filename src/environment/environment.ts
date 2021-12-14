import * as fs from "fs";
import { config as configDotenv } from "dotenv";
import * as path from "path";
import { EnvironmentFile, Environments } from "./environment.constant";
import IEnvironment from "./environment.interface";
import * as dotenv from "dotenv";

dotenv.config();
class Environment implements IEnvironment {
  public port: number;
  public dbUrl: string;

  constructor(NODE_ENV?: string) {
    const env: string = NODE_ENV || process.env.NODE_ENV || Environments.LOCAL;
    const port: string | undefined | number = process.env.PORT || 3146;
    const uri: string = process.env.MONGO as string;
    this.setEnvironment(env);
    this.port = Number(port);
    this.dbUrl = uri;
  }

  public getCurrentEnvironment(): string {
    let environment: string = process.env.NODE_ENV || Environments.LOCAL;

    if (!environment) {
      environment = Environments.LOCAL;
    }
    switch (environment) {
      case Environments.PRODUCTION:
        return Environments.PRODUCTION;
      case Environments.DEV:
      case Environments.TEST:
      case Environments.QA:
        return Environments.TEST;
      case Environments.STAGING:
        return Environments.STAGING;
      case Environments.LOCAL:
      default:
        return Environments.LOCAL;
    }
  }

  public setEnvironment(env: string): void {
    let envPath: string;
    const rootdir: string = path.resolve(__dirname, "../../");
    switch (env) {
      case Environments.PRODUCTION:
        envPath = path.resolve(rootdir, EnvironmentFile.PRODUCTION);
        break;
      case Environments.TEST:
        envPath = path.resolve(rootdir, EnvironmentFile.TEST);
        break;
      case Environments.STAGING:
        envPath = path.resolve(rootdir, EnvironmentFile.STAGING);
        break;
      case Environments.LOCAL:
        envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
        break;
      default:
        envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
    }
    if (!fs.existsSync(envPath)) {
      throw new Error(".env file is missing in root directory");
    }
    configDotenv({ path: envPath });
  }

  public isProductionEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.PRODUCTION;
  }

  public isDevEnvironment(): boolean {
    return (
      this.getCurrentEnvironment() === Environments.DEV ||
      this.getCurrentEnvironment() === Environments.LOCAL
    );
  }

  public isTestEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.TEST;
  }

  public isStagingEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.STAGING;
  }
}

export default Environment;
