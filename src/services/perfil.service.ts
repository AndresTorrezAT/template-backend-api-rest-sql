import { Perfil } from "../entities/Perfil"

export const createPerfil = async(data:any): Promise<Perfil> => {

    const newPerfil:any = Perfil.create(data);
    await newPerfil.save();
    return newPerfil;
}

export const getPerfilById = async (id: string): Promise<Perfil | null> => {
    
    return await Perfil.findOne({ 
        where: { id }, 
        relations: ['personal'] 
    });
};

export const getPerfilByItem = async (item: string, value:any): Promise<Perfil | null> => {
    
    return await Perfil.findOne({ 
        where: { [item]: value }, 
        relations: ['personal'] 
    });
};

export const getAllPerfiles = async (): Promise<Perfil[]> => {
    
    return await Perfil.find({ relations: ['personal'] });
};

export const updatePerfil = async (id: string, data: Partial<Perfil>): Promise<Perfil | null> => {

    const perfil = await getPerfilById(id);
    if (!perfil) return null;

    Object.assign(perfil, data);
      
    return await Perfil.save(perfil);
};
