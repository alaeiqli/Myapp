# 💻 Management Carpooling Services - Frontend

Ce dépôt contient l'interface utilisateur (UI) de l'application de gestion de covoiturage. Il s'agit d'une Single Page Application (SPA) développée avec **React.js**, optimisée et servie par un serveur **Nginx** pour sa version conteneurisée.

---

## 🛠️ Architecture & Technologies
* **Framework :** React.js (Bootstrappé avec Create React App)
* **Serveur Web :** Nginx (Utilisé pour exposer l'application de production dans le conteneur)
* **Conteneurisation :** Docker

---

## 🚀 Guide d'Exécution de l'Application

Vous pouvez lancer l'interface utilisateur de deux manières différentes selon vos besoins (production conteneurisée ou développement local).

### Option A : Déploiement avec Docker (Recommandé)

Cette option utilise le `Dockerfile` et la configuration `nginx.conf` présents à la racine pour compiler l'application et la servir proprement.

1. **Prérequis** : Assurez-vous que Docker Desktop est actif et que le conteneur du backend (`backend-app`) tourne déjà sur le port `8081`.
2. **Cloner le projet** :
   ```bash
   git clone [https://github.com/alaeiqli/Myapp.git](https://github.com/alaeiqli/Myapp.git)
   cd Myapp
   
3. **Construire l'image Docker du Frontend** :

      ```bash
      docker build -t react-voiture-frontend .

**Lancer le conteneur** :
        ```bash
       docker run -d -p 3000:80 --name frontend-app react-voiture-frontend

2. **Accéder à l'application** : Ouvrez votre navigateur et rendez-vous sur http://localhost:3000

### Option B :Environnement de Développement Local (Scripts npm)
Si vous souhaitez modifier le code source ou lancer l'application sans Docker, utilisez l'environnement Node.js local.

**Installer les dépendances (à ne faire que la première fois)** :
        
        npm install
           
**Démarrer le serveur de développement** :

    ```bash
    npm start

**L'application s'ouvre automatiquement en mode développement sur http://localhost:3000. La page se recharge instantanément à chaque modification du code.**
