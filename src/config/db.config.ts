import {DataSource} from 'typeorm';
import { Personal } from '../entities/Personal';
import { Perfil } from '../entities/Perfil';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DATABASE,
    entities: [Personal, Perfil],
    // logging: true,
    synchronize: true
})