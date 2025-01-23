import { Perfil } from "../../entities/Perfil";

declare global {
    namespace Express {
        interface Request {
            perfil?: Perfil;
        }
    }
}