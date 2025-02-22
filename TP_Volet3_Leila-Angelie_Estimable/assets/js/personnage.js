/**
 * 
 * @author Leïla-Angelie Estimable
 * @description fichier js pour controler le Steamman et cest animations/sprites
 */


//---------------************VARIABLES************---------------//

//Variable des aniamtions sprites
const IDLE = 0;
const WALK = 1;
const RUN = 2;
const DEATH = 3;

// modèle de frames pour les animations
const oFrameModele = {
    iPosX: 0, 
    iPosY: 0,
    iLargeur: 48,//taile largeur d'une frame 
    iHauteur: 48, //taille hauteur d'une frame
    iEtat: IDLE, //état inactif
    aNbFramesParEtat: [4, 6, 6, 6], // nombre de frames pour chaque état
    iFrameActuel: 0,  
    iFacteurMultiplicatif: 2, // Scale factor for the sprite
    iTempsFrame: 150,//temps entre chaque frame de l'animation (en ms)
    iDerniereMiseAJour: Date.now(), // mise à jour de la derniere frame
};

//Modèle du SteamMan
const oPersonnageModele = {
    iPosX: 100, // Position initiale en X sur le canvas
    iPosY: 300, // Position initiale en Y sur le canvas
    iVitesseX: 0, //vitesse horizontale (0 = immobile)
    oFrame: Object.create(oFrameModele), //modèle des frames pour gérer les animations
};

let oPersonnage;

//---------------************FIN VARIABLES************---------------//



//---------------************FONCTIONS************----------------//
// fonction creerPersonnage()
function creerPersonnage() {
    oPersonnage = Object.create(oPersonnageModele);
}

//fonction dessinerPersonnage() sur la canvas
function dessinerPersonnage() {
    oContexte.drawImage(
        oImgSpriteHTML[oPersonnage.oFrame.iEtat], 
        oPersonnage.oFrame.iPosX, 
        oPersonnage.oFrame.iPosY,
        oPersonnage.oFrame.iLargeur,
        oPersonnage.oFrame.iHauteur,
        oPersonnage.iPosX, 
        oPersonnage.iPosY,
        oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif,
        oPersonnage.oFrame.iHauteur * oPersonnage.oFrame.iFacteurMultiplicatif
    );
}


// fonction deplacerPersonnageSurUnClick()
function deplacerPersonnageSurUnClick(event) {
    switch (event.key) {
        case "a": // IDLE
            oPersonnage.oFrame.iEtat = IDLE;
            oPersonnage.iVitesseX = 0;
            break;
        case "s": // MARCHE À DROITE
            oPersonnage.oFrame.iEtat = WALK;
            oPersonnage.iVitesseX = 2; // VITESSE POUR LA DROITE
            break;
        case "d": // COURRIR À DROITE
            oPersonnage.oFrame.iEtat = RUN;
            oPersonnage.iVitesseX = 5; // VITESSE POUR LA DROITE
            break;
        case "w": // MARCHE À GAUCHE
            oPersonnage.oFrame.iEtat = WALK;
            oPersonnage.iVitesseX = -2; // VITESSE POUR LA GAUCHE
            break;
        case "q": // COURRIR À GAUCHE
            oPersonnage.oFrame.iEtat = RUN;
            oPersonnage.iVitesseX = -5; // VITESSE POUR LA GAUCHE
            break;
    }
}

//fonction arreterPersonnage()
function arreterPersonnage(event) {
    oPersonnage.iVitesseX = 0;//arrete le mouvement
    oPersonnage.oFrame.iEtat = IDLE; 
}

//fonction animerPersonnage()
function animerPersonnage() {
    const maintenant = Date.now();// temp actuel
    const tempsEcoule = maintenant - oPersonnage.oFrame.iDerniereMiseAJour;// temp passé depuis la derniere mise à jour

    if (tempsEcoule > oPersonnage.oFrame.iTempsFrame) {
        if (oPersonnage.oFrame.iEtat === DEATH) {
            // joue l'animation de mort 1 fois
     if (oPersonnage.oFrame.iFrameActuel + 1 < oPersonnage.oFrame.aNbFramesParEtat[DEATH]) {
         oPersonnage.oFrame.iFrameActuel++;
      } else {
       return; }
        } else {
            // joue ces animations en boucle (idle ,walk ,run)
            oPersonnage.oFrame.iFrameActuel =
            (oPersonnage.oFrame.iFrameActuel + 1) %
            oPersonnage.oFrame.aNbFramesParEtat[oPersonnage.oFrame.iEtat];}

        oPersonnage.oFrame.iPosX =
            oPersonnage.oFrame.iFrameActuel * oPersonnage.oFrame.iLargeur;
        oPersonnage.oFrame.iDerniereMiseAJour = maintenant;
    }
}

// fonction boucler()
function boucler() {
    dessinerBgd(); 
    animerPersonnage(); 
    dessinerPersonnage(); 

    // met à jour la position du steamman
    oPersonnage.iPosX += oPersonnage.iVitesseX;

    // Empeche le steamman de sortir de la canvas
    if (oPersonnage.iPosX < 0) {
        oPersonnage.iPosX = 0; 
    } else if (
     oPersonnage.iPosX + oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif >
     oCanvasHTML.width ) {
        oPersonnage.iPosX =
     oCanvasHTML.width -
      oPersonnage.oFrame.iLargeur * oPersonnage.oFrame.iFacteurMultiplicatif; }}
//---------------************FIN FONCTIONS************----------------//
document.addEventListener("keydown", deplacerPersonnageSurUnClick);
document.addEventListener("keyup", arreterPersonnage); // Stop movement on key release


//---------------************FIN FONCTIONS************----------------//