const fromEnv = <T>(key: string, defaultValue: string): T => {
  const value = Reflect.has(process.env, key) ? process.env[key] : defaultValue;
  return value as T;
};

interface Config {
  mode: "development" | "production";
  server: {
    port: string;
  },
  logs: {
    path: string;
  },
  database: {
    name: string;
    user: string;
    pass: string;
  };
}

const config: Config = {
  mode: fromEnv("NODE_ENV", "development"),
  server: {
    port: fromEnv("PORT", "5000")
  },
  logs: {
    path: fromEnv("LOGS_PATH", `${process.cwd()}/logs`)
  },
  database: {
    name: fromEnv("DATABASE_NAME", "postgres"),
    user: fromEnv("DATABASE_USER", "postgres"),
    pass: fromEnv("DATABASE_PASS", "0103")
  }
};

export default config;