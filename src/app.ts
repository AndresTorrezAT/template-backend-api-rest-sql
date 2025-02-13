import "reflect-metadata"; // Siempre al inicio
import dotenv from "dotenv";


// Cargar el archivo correspondiente solo en desarrollo
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env.development" });
}

import Server from './server';
const server = new Server();

server.listen();
