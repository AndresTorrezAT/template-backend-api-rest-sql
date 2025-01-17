import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Personal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column()
    ci: string;

    @Column()
    fecha_inicio_contratacion: Date;

    @Column({
        default: null 
    })
    fecha_fin_contratacion: Date;

    @Column({ nullable: true })
    perfil: string;

    @Column({ nullable: true })
    cargo: string;

    @Column({
        default: true 
    })
    active: boolean;

    @Column({
        default: true 
    })
    estado: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;
}