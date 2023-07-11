let attempts = 0; let bulls = 0; let cows = 0;
let secretNumber = generateSecretNumber();
console.log(secretNumber);

let roundStats = {
    round : 1,
    wins: 0,
    loses: 0
}

function checkGuess() {
    let guess = document.getElementById("guessInput").value;
    // join() crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau
    let secretString = secretNumber.join('');
    bulls =0; cows = 0;

    const checkGuessLength = new Set(guess);
    // 1212 -> 1 2
    if (guess.length !== checkGuessLength.size || guess.length !== 4) {
        document.getElementById("logsArea").value += `${guess} est invalide, veuillez entrer un nombre composé de exactement 4 chiffres différents.\n`;
        return null;
    }

    attempts += 1;

    for (let i = 0; i < 4; i+= 1) {
        //if = si le chiffre ets présent dans le guess et dans le secret number à la meme place
        // else if = si le chiffre et présent dans le guess et le secret number mais pas à la bonne place
        if (secretString[i] === guess[i]) {
            bulls += 1;
        } else if (secretString.includes(guess[i])) {
            cows += 1;
        }
    }

    if (bulls === 4) {
        document.getElementById("logsArea").value += `${secretString} | Bravo, vous avez gagné en ${attempts} essais.\n`;
        roundStats.wins += 1;
        return playAgain();
    } else if (attempts === 10) {
        document.getElementById("logsArea").value += `${secretString} | Dommage vous avez perdu.\n`;
        roundStats.loses += 1;
        return playAgain();
    }

    document.getElementById("logsArea").value += `${guess} - ${bulls}B ${cows}C, try : ${attempts}\n`;
}

function playAgain() {
    roundStats.round += 1;
    printGameStat();
    attempts = 0; bulls = 0; cows = 0;
    secretNumber = generateSecretNumber();
}

function printGameStat() {
    const gameStats = document.getElementById("gameStats");
    //innerHTML est une instruction qui permet de modifier le contenu d'une balise ou d'insérer un objet dans la page.
    gameStats.innerHTML = `R: ${roundStats.round} | V: ${roundStats.wins} | D: ${roundStats.loses}`;
}


// [0...8] <-Array
function generateSecretNumber() {
    const numbers = Array.from({length: 9}, (v, k) => k + 1);
    let currentIndex = numbers.length, randomIndex;

    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]]; //Permet de melanger les chiffres
    }
    return numbers.slice(0, 4);
}

function clearLogs() {
    document.getElementById("logsArea").value = ""; //Permet de vider la zone de Logs :) l'id se trouve dans le code html
}

function printRules() {
    alert("Entrez un nombre composé de 4 chiffres différents dans la case à coté de 'Guess'. L'ordinateur le compare avec le code secret et vous donne deux indices : les numéros 'bulls' (B) et des cows (C). Qu'est ce que cela signifie? Un 'bulls' est un chiffre qui est présent dans les deux codes dans la meme position. Un 'cows' est un chiffre qui est présent dans les deux codes mais à une position différente. Par exemple, si le code secret est 7512 et que vous essayer 5392, la réponse sera '1B 1C' (1 bull 1 cow). C'est tout!")
}