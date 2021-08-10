import * as dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV ?? "dev";

const envFound = dotenv.config();
if (!envFound) {
<<<<<<< HEAD
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export interface Config {
  [env:string]: any;
=======
  throw new Error("⚠ Couldn't find .env file  ⚠️");
}

export interface Config {
  [env: string]: any;
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
}

const dev = {
  application: {
<<<<<<< HEAD
    PORT: process.env.PORT ?? 3333
  },  
  database: {}
=======
    PORT: process.env.PORT ?? 3333,
  },
  database: {},
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
};

const prod = {
  application: {
<<<<<<< HEAD
    PORT: 4444
  },  
  database: {}
};

const config: Config = {
  dev, prod
}
=======
    PORT: 4444,
  },
  database: {},
};

const config: Config = {
  dev,
  prod,
};
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f

export default config[env];
