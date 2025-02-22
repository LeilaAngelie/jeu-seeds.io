/**
 * 
 * @author Leïla-Angelie Estimable
 * @description fichier js pour controler les graines
 */


//---------------************VARIABLES************---------------//


// tableau pour les graines
const aSeeds = [];

// Variables des graines
const oSeedImgs = [
    document.querySelector("img[alt='almond']"),
    document.querySelector("img[alt='coffee']"),
    document.querySelector("img[alt='fruit']"),
    document.querySelector("img[alt='sunflower']")
];
//img gameOver
const oGameOverImg = document.querySelector("img[alt='gameOver']");

//---------------************FIN VARIABLES************---------------//




//---------------************FONCTIONS************----------------//

// fonction creeNouvelleGraine()
function creerNouvelleGraine() {
    if (aSeeds.length < 6) { // limite 6 graines en même temps qui tombent
        const seed = {
         x: Math.random() * oCanvasHTML.width, // position x aléatoire
         y: -50, //tombent au dessu de la canvas
        vitesseY: 1 + Math.random() * 1.2, // vitesse
         img: oSeedImgs[Math.floor(Math.random() * oSeedImgs.length)] // graines aléatoires
     };aSeeds.push(seed);}
}

// fontion mettreAJourGraines()
function mettreAJourGraines() {
    for (let i = aSeeds.length - 1; i >= 0; i--) {
        const seed = aSeeds[i];
        seed.y += seed.vitesseY; // fait la graine tomber
        // enleve la graine en dessous de la canvas
        if (seed.y > oCanvasHTML.height) {
        aSeeds.splice(i, 1); }
    }
}

// focntion dessinerGraines()
function dessinerGraines() {
    for (const seed of aSeeds) {
        oContexte.drawImage(seed.img, seed.x, seed.y, 32, 32); }
    }
// Met de nouvelles graines 
setInterval(() => {
    creerNouvelleGraine();
}, 2000); // chaque 2 sec


//fonction detecterUnecollision()
function detecterUneCollision(personnage, objet) {
    // Check if the two objects collide
    return (
        personnage.iPosX < objet.x + 32 &&
        personnage.iPosX + personnage.oFrame.iLargeur * personnage.oFrame.iFacteurMultiplicatif > objet.x &&
        personnage.iPosY < objet.y + 32 &&
        personnage.iPosY + personnage.oFrame.iHauteur * personnage.oFrame.iFacteurMultiplicatif > objet.y
    );}

//fonction gameOver()
function gameOver() {
    // Dessine l'image gameOver sur la canvas
    oContexte.drawImage(oGameOverImg, 0, 0, oCanvasHTML.width, oCanvasHTML.height);

}

/**
 * @description Met à jour la boucle principale du jeu
 */
//fonction boucler()
function boucler() {
    dessinerBgd();
    mettreAJourGraines();
    dessinerGraines();
    checkForCollisions(); 
    dessinerPersonnage();
    animerPersonnage();

 // Met à jour la position horizontale du personnage
    oPersonnage.iPosX += oPersonnage.iVitesseX;
// Empêche le personnage de sortir des limites du canvas
    if (oPersonnage.iPosX < 0) {
        oPersonnage.iPosX = 0;
    } else if (
        oPersonnage.iPosX + oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif >
        oCanvasHTML.width
    ) {
        oPersonnage.iPosX =
            oCanvasHTML.width -
            oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif; }}


//---------------************FIN FONCTIONS************----------------//
