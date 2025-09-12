import { configDotenv } from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { ReportEntity } from "./report/report.entity";

configDotenv()


const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [ReportEntity],
  synchronize: true
}

export default config;
