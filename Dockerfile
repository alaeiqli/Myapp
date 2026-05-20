# --- ÉTAPE 1 : Build de l'application React ---
FROM node:18-alpine AS build

WORKDIR /app

# Copie des fichiers de configuration des dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie de tout le reste du code source
COPY . .

# Compilation du projet (crée un dossier /app/build)
RUN npm run build

# --- ÉTAPE 2 : Serveur de production avec Nginx ---
FROM nginx:alpine

# Copie des fichiers compilés de l'étape précédente vers le dossier public de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copie d'une configuration personnalisée Nginx pour gérer React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80 (port par défaut d'Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]