import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Perfil } from "./Perfil";


@Entity()
export class Personal extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') // Genera un UUID como string
    id: string;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column({
        unique: true
    })
    ci: string;

    @Column({
        nullable: true, // Puede ser nula
        default: null // Explicita el valor por defecto 
    })
    fecha_inicio_contratacion: Date;

    @Column({
        nullable: true, // Puede ser nula
        default: null // Explicita el valor por defecto 
    })
    fecha_fin_contratacion: Date;

    // Relación de uno a uno con Perfil, siendo opcional (nullable: true)
    // Un Personal puede tener 0 o 1 Perfil
    @OneToOne(
        () => Perfil, (perfil) => perfil.personal,
        { nullable: true }
    )  
    @JoinColumn({ name: 'perfil' })  // Clave foránea que apunta a Perfil
    perfil: Perfil | null;  // Puede ser null si no tiene un Perfil asociado

    @Column({ 
        nullable: true 
    })
    cargo: string;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @DeleteDateColumn()
    fecha_eliminacion: Date;

    // Getter personalizado para la respuesta JSON
    toJSON() {
        const { fecha_eliminacion, id, ...personal } = this;  // Excluimos 'id' y otras propiedades si es necesario
        return {
            ...personal,
            uid: id,  // Renombramos 'id' a 'uid'
        };
    }
}
// deletedAt: Date;
