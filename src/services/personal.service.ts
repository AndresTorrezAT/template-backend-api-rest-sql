import { Personal } from "../entities/Personal";

export const createPersonal = async (data: Partial<Personal>): Promise<Personal> => {
    const newPersonal:any = Personal.create(data);  // Crea una nueva instancia de Personal
    await newPersonal.save();  // Guarda la nueva instancia en la base de datos
    return newPersonal;
};

export const getPersonalById = async (id: string): Promise<Personal | null> => {
    return await Personal.findOne({ where: { id }, relations: ['perfil'] });
};

export const getAllPersonales = async (): Promise<Personal[]> => {
    return await Personal.find({ relations: ['perfil'] });
};

export const updatePersonal = async (id: string, data: Partial<Personal>): Promise<Personal | null> => {
    const personal = await Personal.findOneBy({ id });
    if (!personal) return null;
    Object.assign(personal, data);
    return await Personal.save(personal);
};

export const deletePersonal = async (id: string): Promise<boolean> => {
    const result:any = await Personal.delete(id);
    return result.affected > 0;
};
