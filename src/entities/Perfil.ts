import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Personal } from "./Personal";


@Entity()
export class Perfil extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') // Genera un UUID como string
    id: string;

    @Column()
    usuario: string;

    @Column()
    password: string;

    @Column()
    tipo: string;

    @Column({ nullable: true })
    permisos: string;

    @Column({
        default: true 
    })
    active: boolean;

    // Relación inversa, no es necesario poner @JoinColumn en Perfil
    @OneToOne(() => Personal, (personal) => personal.perfil )
    personal: Personal;  // Puede ser null si no hay un Personal asociado

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;
}