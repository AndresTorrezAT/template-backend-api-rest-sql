import { Personal } from "../entities/Personal";

export const createPersonal = async (data:any): Promise<Personal> => {
    const newPersonal:any = Personal.create(data);
    await newPersonal.save();
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

    Object.assign(personal, {
        nombres: data.nombres ?? personal.nombres,
        apellidos: data.apellidos ?? personal.apellidos,
        ci: data.ci ?? personal.ci,
        fecha_inicio_contratacion: data.fecha_inicio_contratacion ?? personal.fecha_inicio_contratacion,
        fecha_fin_contratacion: data.fecha_fin_contratacion ?? personal.fecha_fin_contratacion,
    });
      
    return await Personal.save(personal);
};


export const deletePersonal = async (id: string): Promise<boolean> => {
    const result:any = await Personal.delete(id);
    return result.affected > 0;
};

export const softDeletePersonal = async (id: string): Promise<boolean> => {
    const result:any = await Personal.createQueryBuilder().softDelete().where("id = :id", { id }).execute();
    console.log({result});
    return result.affected > 0;
};