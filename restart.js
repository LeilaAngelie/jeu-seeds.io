/**
 * 
 * @author Leïla-Angelie Estimable
 * @description fichier js pour restart le jeu
 * 
 */

//---------------************FONCTIONS************---------------------//

//fonction restartGame()
function restartGame() {
    // Réinitialiser les variables du jeu
    iScore = 0; //Remet les points à zéro
    iLives = 3; //restaure les 3 vies
    aSeeds = []; //Vider le tableau des graines

    //Réinitialiser le personnage
    creerPersonnage();

    //Efface le canvas
    oContexte.clearRect(0, 0, oCanvasHTML.width, oCanvasHTML.height);

    // Remet les sons
    sonJeu.currentTime = 0; // Repartir la musique de fond au début
    sonJeu.play(); // Rejouer la musique de fond

    //Supprimer l'écran de la fin du jeu
    oContexte.drawImage(oImgBgdHTML, 0, 0, oCanvasHTML.width, oCanvasHTML.height);

    clearInterval(idInterval);

    //Redémarre une nouvelle boucle
    idInterval = setInterval(boucler, 1000 / oJeu.iNbFps); // Recommencer la boucle
}

//---------------************FIN FONCTIONS************---------------------//