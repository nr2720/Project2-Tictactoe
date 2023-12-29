
//1. Setting Declarations
const body = document.querySelector('body');
const container = document.querySelector('.container');
const positions = document.querySelectorAll('.cell');
const endButton = document.querySelector('#end');




//2 Setting gobal functions



//b) When gamestarted is set to true, taketurn is called with player 1, who is prealably set to 'X', and the cell value;
//g) the function continue wainting for a click and will do so until gamestarted is switched to false.
positions.forEach((position) => {
    position.addEventListener('click', () =>{
        if (gameBoard.gameStarted) {
            gameBoard.takeTurn(gameBoard.player1, position.value);
        }
    })
})

function writeWin(player) {
    let playerWinText = document.createElement('h2');
    playerWinText.textContent = player + ' WON ! CONGRATS'
    playerWinText.classList.add('endText');
    body.appendChild(playerWinText);
}


function removeEndWrite() {
    let endText = document.querySelector('.endText');
    if (endText) {
        endText.remove();
    }
    else {
        return;
    }
    
}

function writeTie() {
    let tieText = document.createElement('h2');
    tieText.textContent = 'its a tie'
    tieText.classList.add('endText');
    body.appendChild(tieText);
}


function addWarnDiv() {
    const warnDiv = document.createElement('h2');
    warnDiv.style.color = 'red';
    warnDiv.classList.add('warnDiv')
    warnDiv.textContent = 'Already taken. Choose another one.'
    container.appendChild(warnDiv);
}

 function removeWarnDiv() {
    const warnDiv = document.querySelector('.warnDiv');
    if (warnDiv) {
        warnDiv.remove();
    }
    else {
        return;
    }
}

function endGame() {
    const buttonEnd = document.querySelector('#end');
    buttonEnd.addEventListener('click', () => {
        gameBoard.gameStarted = false;
        gameBoard.removePlayerTurn();
        removeEndWrite();
        removeWarnDiv();
        positions.forEach((position) => {
            position.textContent = '';
        });
        gameBoard.createBoard();
    })
}



















// 3. Setting inner functions
const gameBoard = {
    board: [],
    player1: 'X',
    counter: 0,
    gameStarted : false,
    row: 3,
    col: 3,

    // a) Create the board, initialize the value and set the onclick on start button. 
    // Once the game started variable is set to true,
    // Arrange the setup so then the Cell 'onclick' function can be executed 

    createBoard() {
        const startButton = document.querySelector('#start');
        startButton.addEventListener('click', () => {
            endGame();
            this.gameStarted = true;
            removeEndWrite();
            this.removePlayerTurn();
            this.addpPlayerTurn();
            positions.forEach((position) => {
                position.textContent = '';
            });
            this.board = Array(this.row * this.col).fill('-');
        })
           
        },

        //c) take turn is call and if the cell isnt already taken, change the cell text content using its value to localise it
        // then proceed to call the checkIfWin function

        //e) the value return and depending what it return the game is won, tie or will continue, 
        //f) the player is switch and the function return;

        takeTurn(player, value) {
            removeWarnDiv();
            let choice = value;
                    if (gameBoard.board[choice - 1] != '-') {
                        addWarnDiv();
                        return;
                    }
                    else {
                        gameBoard.board[choice - 1] = player;
                        const element = document.getElementById(choice);
                        element.textContent = player;
                    }
            const ifWin = this.checkIfWin(player);
                    if (ifWin == 'win'){
                        writeWin(player);
                        gameBoard.gameStarted = false;
                        return;
                    }
                    else if (ifWin == 'tie'){
                        writeTie();
                        gameBoard.gameStarted = false;
                        this.removePlayerTurn();
                        return;
                    }
                    else {
                        this.player1 = this.switchPlayer(player);
                        this.addpPlayerTurn();
                        return;
                    }
        },


    //d) Calls the function counter board who, using a counter, check if more than 9 cells have been called,
    // After check if the maching conditions are match by the current 'player1' 
    // Return a value who is resend to taketurn
    checkIfWin(player) {
        this.counterBoard();
        if ((gameBoard.board[0] === player && gameBoard.board[1] === player && gameBoard.board[2] === player) || (gameBoard.board[3] === player && gameBoard.board[4] === player && gameBoard.board[5] === player) || (gameBoard.board[6] === player && gameBoard.board[7] === player && gameBoard.board[8] === player)
        || (gameBoard.board[0] === player && gameBoard.board[3] === player && gameBoard.board[6] === player) || (gameBoard.board[1] === player && gameBoard.board[4] === player && gameBoard.board[7] === player)|| (gameBoard.board[2] === player && gameBoard.board[5] === player && gameBoard.board[8] === player)
        || (gameBoard.board[0] === player && gameBoard.board[4] === player && gameBoard.board[8] === player) || (gameBoard.board[2] === player && gameBoard.board[4] === player && gameBoard.board[6] === player))
        {
            return 'win'
        }
        else if (this.counter === 9){
            return 'tie';
        }
        else {
            return 'play';
        }
    },


    switchPlayer(player) {
        let joueur = player
        if (joueur == 'X'){
            joueur = 'O';
        }
        else {
            joueur = 'X';
        }
        this.removePlayerTurn();
        return joueur;
    },

    addpPlayerTurn() {
        const playerTurn = document.createElement('h2');
        playerTurn.textContent=this.player1 + ' Turn !';
        playerTurn.classList.add('playerTurn');
        body.appendChild(playerTurn);
    },

    removePlayerTurn() {
        const playerTurn = document.querySelector('.playerTurn');
        if (playerTurn) {
            playerTurn.remove();
        }
        else {
            return;
        }
    },
    counterBoard() {
        let counter = 0;
        for(let i = 0; i < this.board.length; i++){
            if (this.board[i] != '-'){
                counter++
            }
        }
        this.counter = counter;
    },
}

gameBoard.createBoard();