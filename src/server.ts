
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { AppDataSource } from './config/db.config';

// Importar las rutas
import authRoutes from './routes/auth.routes';
import perfilRoutes from './routes/perfiles.routes';
import personalRoutes from './routes/personal.routes';


class Server {

    app: any; // Declaramos que 'app' es de tipo 'express.Application'
    port: any; // 'port' es un número
    paths: any; // 'paths' es un objeto con claves de tipo 'string' y valores de tipo 'string'

    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;

        this.paths = {
            auth:       '/api/auth',
            personal:   '/api/personal',
            perfil:     '/api/perfil',

        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await AppDataSource.initialize();
        console.log("Database connected");
    }

    middlewares() {

        // Registro de solicitudes HTTP con Morgan
        this.app.use(morgan('dev')); // Habilitamos Morgan en modo 'dev'

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        // this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        );
    }

    routes() {
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.perfil, perfilRoutes);
        this.app.use(this.paths.personal, personalRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;
