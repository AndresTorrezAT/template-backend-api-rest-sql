import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Personal } from "./Personal";

export enum PerfilType {
    ADMINISTRADOR = "administrador",
}

@Entity()
export class Perfil extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') // Genera un UUID como string
    id: string;

    @Column({
        unique: true
    })
    usuario: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: PerfilType
    })
    tipo: PerfilType;

    @Column({
        default: true 
    })
    estado: boolean;

    // Relación inversa, no es necesario poner @JoinColumn en Perfil
    @OneToOne(
        () => Personal, (personal) => personal.perfil,
        { nullable: true } 
    )
    personal: Personal | null;  // Puede ser null si no hay un Personal asociado

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @DeleteDateColumn()
    fecha_eliminacion: Date;

    // Getter personalizado para la respuesta JSON
    toJSON() {
        const { fecha_eliminacion, id, password, ...perfil } = this;
        return {
            ...perfil,
            uid: id,  // Renombramos 'id' a 'uid'
        };
    }
    
}