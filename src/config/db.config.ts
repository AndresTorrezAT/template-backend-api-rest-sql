import {DataSource} from 'typeorm';
import { Personal } from '../entities/Personal';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "atorrez",
    database: "posdb",
    entities: [Personal],
    logging: true,
    synchronize: true
})