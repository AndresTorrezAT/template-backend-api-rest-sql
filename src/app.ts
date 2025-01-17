import "reflect-metadata"; // Siempre al inicio

import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno desde el archivo .env

import Server from './server';
const server = new Server();

server.listen();
