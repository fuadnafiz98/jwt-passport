import * as dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV ?? "dev";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export interface Config {
  [env: string]: any;
}

const dev = {
  application: {
    PORT: process.env.PORT ?? 3333,
  },
  database: {},
};

const prod = {
  application: {
    PORT: 4444,
  },
  database: {},
};

const config: Config = {
  dev,
  prod,
};

export default config[env];
