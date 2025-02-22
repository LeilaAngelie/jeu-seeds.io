/**
 * 
 * @author Leïla-Angelie Estimable
 * @description fichier js pour controler les points et les afficher
 */

////---------------************VARIABLES************---------------//
let iScore = 0;//nombres de points au départ
let iLives = 3;//nombre de vies 

// Variables des vies/lose/win
const oViesHTML = document.querySelector("img[alt='vies']");
const oYouWinHTML = document.querySelector("img[alt='youWin']");
const oGameOverHTML = document.querySelector("img[alt='gameOver']");


////---------------************FIN  VARIABLES************---------------//


//---------------************FONCTIONS************----------------//

//fonction afficherScoreEtVies(ctx)
function afficherScoreEtVies(ctx) {
    //dessine le score
    ctx.font = "30px Arial ";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${iScore}`, 10, 30);
    //dessine les vies
    for (let i = 0; i < iLives; i++) {
        ctx.drawImage(oViesHTML, 10 + i * 40, 50, 30, 30); // Adjust spacing and size
    }
}

/**
 * @description ajoute les points au scores
 * @param {number} points - nombre de point ajouter
 */
function ajouterPoints(points) {
    iScore += points;

    // vérifie si le score atteint 2000 points
    if (iScore >= 2000) {
        afficherYouWin();
    }
}

/**
 * @description gererCollisionGraine()
 * @param {object} seed - la graine
 */

//fonction gererCollisionGraine(seed)
function gererCollisionGraine(seed) {
    if (seed.img.src.includes("sunflower")) {
        // Ajoute 125 points
        ajouterPoints(125);
        aSeeds.splice(aSeeds.indexOf(seed), 1); // enleve la graine de la canvas
    } else {
        // Perte d'une vie si ce n'est pas une graine de tournesol
        iLives--;

        // vérifie si les vies sont perdued
        if (iLives <= 0) {
            afficherGameOver();
        } else {
            aSeeds.splice(aSeeds.indexOf(seed), 1); // enlève la graine de la canvas
        }
    }
     // joue le son quand une graine est ramasser
     sonPoint.play();
}

//fonction afficherGameOver() 
function afficherGameOver() {
    // animation sprite de la mort
    oPersonnage.oFrame.iEtat = DEATH;
    oContexte.drawImage(oGameOverHTML, 0, 0, oCanvasHTML.width, oCanvasHTML.height); //Affiche l'image de Game Over
    sonFinJeu.play(); // Joue le son de Game Over
    clearInterval(idInterval); //stop la boucle
     //Arrête la musique de fond
     sonJeu.pause();
     sonJeu.currentTime = 0; 
     
}
//fonction afficherYouWin()
function afficherYouWin() {
    oContexte.drawImage(oYouWinHTML, 0, 0, oCanvasHTML.width, oCanvasHTML.height);
    sonYouWin.play();
    clearInterval(idInterval); //arrete la boucle
     // Arrete la musique de fond
     sonJeu.pause();
     sonJeu.currentTime = 0; 
}

//fonction checkForCollisions()
function checkForCollisions() {
    for (let i = aSeeds.length - 1; i >= 0; i--) {
        const seed = aSeeds[i];
        if (detecterUneCollision(oPersonnage, seed)) {
            gererCollisionGraine(seed);  }
 }
}
function boucler() {
    dessinerBgd(); 
    mettreAJourGraines();
    dessinerGraines(); 
    checkForCollisions(); 
    dessinerPersonnage(); 
    animerPersonnage(); 
    afficherScoreEtVies(oContexte); 

    oPersonnage.iPosX += oPersonnage.iVitesseX;
    if (oPersonnage.iPosX < 0) {
        oPersonnage.iPosX = 0;
    } else if (
        oPersonnage.iPosX +
        oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif >
        oCanvasHTML.width
    ) {
        oPersonnage.iPosX =
            oCanvasHTML.width -
            oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif;
    }
}
//---------------************FIN FONCTIONS************----------------//