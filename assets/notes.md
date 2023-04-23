temps estimé : "1 jour 2heures 33 minutes" et un champ "Marge de sécurité" qui doit afficher automatiquement 40% du temps saisie pour la tâche en question

Dans votre application, convertissez la durée saisie par l'utilisateur en minutes :
````js
const jours = 1;
const heures = 2;
const minutes = 33;

const duree_minutes = jours * 24 * 60 + heures * 60 + minutes;
````
Insérez la durée convertie en minutes dans la base de données :
````php
INSERT INTO taches (nom, duree_minutes) VALUES ('Aller chercher les enfants', 1593);
````
Pour calculer la marge de sécurité, récupérez la durée en minutes de la base de données et effectuez le calcul :
````js
const duree_minutes = 1593; // Récupéré de la base de données
const marge_securite = duree_minutes * 0.4;

// Convertir la marge de sécurité en jours, heures et minutes
const marge_jours = Math.floor(marge_securite / (24 * 60));
const marge_heures = Math.floor((marge_securite % (24 * 60)) / 60);
const marge_minutes = Math.floor(marge_securite % 60);

console.log(`Marge de sécurité : ${marge_jours} jours, ${marge_heures} heures, ${marge_minutes} minutes`);
````
