

const gameBoard = {
    board: [],
    player1: 'X',
    counter: 0,
    gameStarted : false,
    printBoard(){
        console.log('commands');
        console.log('1', '2', '3');
        console.log('4', '5', '6');
        console.log('7', '8', '9');


        console.log(this.board[0], this.board[1], this.board[2]);
        console.log(this.board[3], this.board[4], this.board[5]);
        console.log(this.board[6], this.board[7], this.board[8]);
    },
    row: 3,
    col: 3,
    counterBoard() {
        let counter = 0;
        for(let i = 0; i < this.board.length; i++){
            if (this.board[i] != '-'){
                counter++
            }
        }
        this.counter = counter;
    },
    createBoard() {
        for(let a = 0; a< gameBoard.row; a++){
            for(let b =0; b< gameBoard.col; b++){
                gameBoard.board.push('-');
            }
        }
        this.printBoard();
    },
    takeTurn(player) {
    if (gameBoard.gameStarted){
        let position = prompt('Choisis tu veux mettre ou ton osti de X ou O')
        if (position === 'stop') {
            gameBoard.gameStarted = false;
        }
        else if(position < 1 || position > 9) {
            console.log('entre 1 et 9.')
            this.takeTurn(player);
        }
        else if (gameBoard.board[position - 1] != '-') {
            console.log('Deja pris. prend une autre position.');
            this.takeTurn(player);
        }
        else {
            gameBoard.board[position - 1] = player;
        }
        this.printBoard();
        }
    },
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
        return joueur;
    },

    playGame(joueur) {
    
    if (gameBoard.gameStarted){
        let player = joueur;
        this.takeTurn(player)
        const ifWin = this.checkIfWin(player);
        if (ifWin == 'win'){
            console.log(player + ' win. Congrats sale con.');
            gameBoard.gameStarted = false;
            return;
        }
        else if (ifWin == 'tie'){
            console.log('its tie.')
            gameBoard.gameStarted = false;
            return;
        }
        else {
            player = this.switchPlayer(player);
            this.playGame(player);
        }
    }
    else {
        return;
    }
    }
}


gameBoard.createBoard();
gameBoard.gameStarted = 'true'
gameBoard.playGame(gameBoard.player1);
