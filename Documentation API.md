# Documentation API - Backend des Jeux Olympiques

Cette documentation décrit les principales fonctionnalités de l'API développée pour la gestion des billets électroniques des Jeux Olympiques. Elle fournit des exemples de requêtes HTTP pour tester les différents points de terminaison (endpoints) de l'API.

## Table des matières

1. Authentification
2. Gestion des billets
   - Afficher les billets disponibles
   - Acheter un billet
3. Espace Administrateur
   - Ajouter une offre
   - Modifier ou supprimer une offre
4. Sécurité

---

## URL de base de l'API sur Render

Toutes les requêtes doivent être envoyées à l'URL suivante :

**URL de base** : https://olympics-backend.onrender.com

---

## 1. Authentification

### Route : /api/users/login
- Méthode : POST
- Description : Permet à l'utilisateur de se connecter et de recevoir un token d'authentification JWT.
- URL complète : https://olympics-backend.onrender.com/api/users/login
- Corps de la requête (format JSON) :
  - email: "user@example.com"
  - password: "password123"
- Réponse attendue :
  - token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."

Le token reçu doit être utilisé dans les requêtes protégées en tant que Bearer token dans l'en-tête de la requête HTTP.

---

## 2. Gestion des billets

### 2.1 Afficher les billets disponibles

### Route : /api/tickets
- Méthode : GET
- Description : Récupère la liste des offres de billets disponibles pour les utilisateurs authentifiés.
- URL complète : https://olympics-backend.onrender.com/api/tickets
- Headers : 
  - Authorization : Bearer <token JWT>

- Réponse attendue :
  - id: 1, name: "Offre Solo", price: 100
  - id: 2, name: "Offre Duo", price: 180

### 2.2 Acheter un billet


### Route : /api/tickets/buy
- Méthode : POST
- Description : Cette route permet à l'utilisateur d'acheter un billet et de recevoir un QR code qui sert de e-billet.
- URL complète : https://olympics-backend.onrender.com/api/tickets/buy
- Corps de la requête (format JSON) :
  - offerId: { "offerId": 1, "userKey": "clé-unique-utilisateur" }
- Réponse attendue :
  { "message": "Billet acheté pour Offre Solo", "ticket": { "id": 1, "name": "Offre Solo", "price": 100 }, "qrCodeUrl": "data
  /png;base64,..." // URL de l'image du QR Code }

Le champ qrCodeUrl contient l'image encodée en base64 du QR code, que l'utilisateur peut scanner pour accéder à son e-billet sécurisé.
---

## 3. Espace Administrateur

L'accès à l'espace administrateur nécessite d'être authentifié en tant qu'administrateur via un token JWT spécifique.

### 3.1 Ajouter une nouvelle offre

### Route : /api/admin/offers
- Méthode : POST
- Description : Permet d'ajouter une nouvelle offre.
- URL complète : https://olympics-backend.onrender.com/api/admin/offers
- Headers :
  - Authorization : Bearer <token JWT>
- Corps de la requête (format JSON) :
  - name: "Offre VIP"
  - price: 500
- Réponse attendue :
  - message: "Nouvelle offre ajoutée avec succès"
  - offer: id: 4, name: "Offre VIP", price: 500

---

## 4. Sécurité

Toutes les routes sensibles (comme celles liées à la gestion des billets et à l'administration) nécessitent un token JWT. Ce token doit être envoyé dans l'en-tête Authorization sous la forme Bearer <token JWT> pour accéder aux ressources protégées.
