let mistakesTxt = document.getElementById('mistakes');
let selectedDigit; let mistakes = 0;

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

const fetchBoard = async () => {
    const res = await fetch('https://sugoku.onrender.com/board?difficulty=easy');
    const data = await res.json();
    const board = data.board;

    const fetchSolution = await fetch('https://sugoku.onrender.com/solve', {
        method: 'POST',
        body: encodeParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const solution = await fetchSolution.json();

    return [board, solution.solution];
}

const startGame = async () => {
    const boardGenAndSolution = await fetchBoard();
    const board = boardGenAndSolution[0];
    const solution = boardGenAndSolution[1];

    for (let i = 0; i <= 9; i+= 1) {
        let digits = document.createElement('div');
        digits.id = i;
        digits.innerHTML = i;
        digits.addEventListener('click', setDigit);
        digits.classList.add('digit');
        document.getElementById('selection').appendChild(digits);
    }

    for (let row = 0; row < 9; row += 1) {
        for (let column = 0; column < 9; column += 1) {
            let cell = document.createElement('div');
            cell.id = row + '-' + column;

            if (board[row][column] != 0) cell.innerHTML = board[row][column];
            if (row == 2 || row == 5) cell.classList.add('cell-bottom-border');
            if (column == 2 || column == 5) cell.classList.add('cell-right-border');

            cell.addEventListener('click', writeDigit);
            cell.classList.add('cell');
            document.getElementById('grid').append(cell);
        }
    }

    function setDigit() {
        if(selectedDigit != undefined) selectedDigit.classList.remove('selected-digit');
        selectedDigit = this;
        selectedDigit.classList.add('selected-digit');
    }

    function writeDigit() {
        if ( selectedDigit != undefined) {
            const classValue = this.classList.value;
            if (selectedDigit.id == 0 && classValue.includes('wrong-digit')) {
               this.classList.remove('wrong-digit');
               this.innerHTML = "";
               return;
            } else {
                if (this.innerHTML != "") return;
                this.innerHTML = selectedDigit.innerHTML;
            }
           

        if (solution[this.id.charAt(0)][this.id.charAt(2)] == selectedDigit.id) {
            this.classList.add('correct-digit');
            } else {
                this.classList.add('wrong-digit');
                mistakes += 1;
                mistakesTxt.innerHTML = `Erreur ! Nombre d'erreurs: ${mistakes}`;
            }
        }
    }
}

startGame();