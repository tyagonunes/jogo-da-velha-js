var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]


const cells = document.querySelectorAll('.cell');
startGame();

// Inicia o game
function startGame() {
    // Some com o painel de vitoria
    document.querySelector('.endGame').style.display = 'none';
    // Cria um  novo tabuleiro
    origBoard = Array.from(Array(9).keys());
    // Atribui a todos os campos do tabuleiro o texto vazio, e a função de click turnClick
    for(var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
    turn(square.target.id, huPlayer)
}


function turn(squareId, player) {
    
    origBoard[squareId] = player

    // Marca a jogada no campo clicado
    document.getElementById(squareId).innerText = player

    let gameWon = checkWin(origBoard, player)
    if(gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a,e,i) => {
        if(e === player) {
            a.concat(i)
        }
    })
}

