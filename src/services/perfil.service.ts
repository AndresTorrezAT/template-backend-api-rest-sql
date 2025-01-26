import { Perfil } from "../entities/Perfil"
import bcryptjs from 'bcryptjs';

export const createPerfil = async(data:any): Promise<Perfil> => {

    const newPerfil = new Perfil();
    newPerfil.usuario = data.usuario;
    newPerfil.tipo = data.tipo;
    newPerfil.personal = data.personal;

    //ENCRIPTAR CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    newPerfil.password = bcryptjs.hashSync( data.password, salt );
    
    await newPerfil.save();

    return newPerfil;

}