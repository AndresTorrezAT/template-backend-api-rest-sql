# Establece la imagen base
FROM node:22.13.1

# Configura el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente a la carpeta /usr/src/app
COPY . .

# Expone el puerto que tu aplicación usará
EXPOSE 3000
