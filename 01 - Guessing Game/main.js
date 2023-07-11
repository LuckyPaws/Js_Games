function guessNumber () {
    let playerGuess;
    const numberToGuess = Math.ceil(Math.random() * 10); //Va permettre de generez un chiffre entre 1 et 10 inclus
    //La fonction Math. random() renvoie un nombre flottant pseudo-aléatoire compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu) selon une distribution approximativement uniforme sur cet intervalle.
    //La fonction Math. ceil() retourne le plus petit entier supérieur ou égal au nombre donné.
    prompt('Devinez le nombre entre 1 et 10 inclus.'); //La boîte de dialogue prompt() est très utile lorsque vous souhaitez afficher une zone de texte pour permettre la saisie de l'utilisateur.

    while(playerGuess != numberToGuess) {
        playerGuess = prompt('Echec! Essayez à nouveau de deviner le nombre (entre 1 et 10 inclus).');
    }

    alert(`Félicitions! Le nombre était ${numberToGuess}!`);
}

guessNumber();