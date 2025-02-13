import fs from "fs";
import path from "path";
import dotenv from "dotenv";  // Asegúrate de importar dotenv
dotenv.config({ path: '.env.development' });

import { AppDataSource } from "../config/db.config";  // Asegúrate de que AppDataSource está configurado adecuadamente
import { createPerfil, getPerfilByItem } from "../services/perfil.service";
import { hashPassword } from "../utils/security.util";

const seedFromJson = async () => {

    console.log("📦 Conectando a la base de datos para el Seed...");

    try {
        // Conectar a la base de datos de manera independiente
        await AppDataSource.initialize();
        console.log("📦 Base de datos conectada.");

        // Cargar datos desde el archivo .json (si deseas usar este archivo para cargar datos)
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), "utf-8"));

        const perfilesPromises = data.perfiles.map(async (perfilDefault: any) => {
            // Verificar si el perfil ya existe
            const existingPerfil = await getPerfilByItem("usuario", perfilDefault.usuario);

            if (existingPerfil) {
                console.log(`⚠️ Perfil "${perfilDefault.usuario}" ya existe. Omitiendo...`);
                return null; // Evita crear duplicados
            }

            // Hashear la contraseña antes de guardarla
            const password_hash = hashPassword(perfilDefault.password);

            return createPerfil({ ...perfilDefault, password: password_hash });
        });

        await Promise.all(perfilesPromises);

        console.log("✅ Datos insertados correctamente.");


    } catch (error) {
        console.error("❌ Error al insertar datos:", error);

    } finally {
        // Cerrar la conexión después de finalizar el proceso de seed
        await AppDataSource.destroy();
        console.log("🔌 Conexión a la base de datos cerrada.");
    }
};

seedFromJson().catch((err) => console.error("❌ Error en el script de seed:", err));
