/***
 * 
 * @author : Leila-Angelie Estimable
 * @description: Script js pour le jeu , Fonction de base , canvas , commencer et arreter le jeu , dessiner le bgd
 */

//---------------************VARIABLES************---------------//

//Variable gloables
let oContexte; //Contexte du canvas pour le dessiner
let idInterval;
let oImgSpriteHTML = []; //tableau qui contient les images du sprite du SteamMan
let oImgBgdHTML; //bgd fond du jeu

// Variable du Jeu
const oJeu = {
    iLargeur: 800,//largeur du canvas
    iHauteur: 500, //hauteur du canvas
    iNbMs: 1000, //temps par mls
    iNbFps: 60,//nombre de frames par s
};

//Variables audios
const sonJeu = document.getElementById("sonJeu");//son de fond du jeu 
const sonPoint = document.getElementById("sonPoint");//son à chaques graines touchées
const sonFinJeu = document.getElementById("sonFinJeu");//son quand le joueur perd
const sonYouWin = document.getElementById("sonYouWin");//son quand le joueur gagne

// Variables pour le Canvas
const oCanvasHTML = document.querySelector("#monCanvas");//canvas du jeu 
const oDemarrerHTML = document.querySelector("#btnStart");//btn démarrer
const oArreterHTML = document.querySelector("#btnStop");//btn arreter

//---------------************FIN VARIABLES************---------------//



// DOM content
document.addEventListener("DOMContentLoaded", () => {
    oImgSpriteHTML = document.querySelectorAll("img[alt^='SteamMan']");//récupère l'imgae du SteamMan
    oImgBgdHTML = document.getElementById("bgd");//recupère l'image du bgd
    initialiser();//apelle la fonction initialiser
});



//---------------************FONCTIONS************----------------//


//Fonction initialiser()
function initialiser() {
    oContexte = oCanvasHTML.getContext("2d");
    oCanvasHTML.width = oJeu.iLargeur;//largeur du canvas
    oCanvasHTML.height = oJeu.iHauteur;//hauteur du canvas
    oDemarrerHTML.addEventListener("click", demarrerSurUnClick);
    oArreterHTML.addEventListener("click", arreterSurUnClick);
}


//Fnction demarrerSurUnClick()
function demarrerSurUnClick() {
  clearInterval(idInterval);
 oImgSpriteHTML.forEach(img => img.classList.remove("invisible")); // affiche le sprite du personnage
    creerPersonnage();//crée le personnage
 document.addEventListener("keydown", deplacerPersonnageSurUnClick);
  idInterval = setInterval(boucler, 1000 / oJeu.iNbFps);//démarre la boucle du  jeu
     // Musique du jeu 
     sonJeu.loop = true; // joue la musique du jeu en boucle
     sonJeu.play(); //joue la musique du jeu
     restartGame();
}

//Fonction dessinerBgd()
function dessinerBgd() {
    oContexte.clearRect(0, 0, oCanvasHTML.width, oCanvasHTML.height);//enleve le canvas
    oContexte.drawImage(oImgBgdHTML, 0, 0, oCanvasHTML.width, oCanvasHTML.height);//dessinne le bgd
}

//Fonction arreterSunUnClick()
function arreterSurUnClick() {
    clearInterval(idInterval);
    oImgSpriteHTML.forEach(img => img.classList.add("invisible"));
    document.removeEventListener("keydown", deplacerPersonnageSurUnClick);//arrete le jeu
    sonJeu.pause();//arrete la musique du jeu
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.key === " ") {//bar espace qui recommence le jeu
 restartGame();//Jeu recommence
  }});
//appel des fonctions
function boucler() {
    dessinerBgd();
    dessinerPersonnage();
    animerPersonnage();
    restartGame();
}

//---------------************FIN FONCTIONS************----------------//