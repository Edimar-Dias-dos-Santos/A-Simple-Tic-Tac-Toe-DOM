class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.isPlayerTurn = true;
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        this.gameAudio = new Audio('songs/game.mp3');


        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });

        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', () => {
                this.makeMove(i);
            });
        }
    }

    playAudio(fileName) {
        const audio = new Audio(`songs/${fileName}.mp3`);
        audio.play();
    }

    playGameAudio() {
        this.gameAudio.play();
    }

    stopGameAudio() {
        this.gameAudio.pause();
        this.gameAudio.currentTime = 0;
    }

    startGame() {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        this.playGameAudio();
    }

    makeMove(cellIndex) {

        if (this.gameState[cellIndex] === '' && this.gameActive) {
            if (this.isPlayerTurn && this.currentPlayer === 'X') {
                this.gameState[cellIndex] = this.currentPlayer;
                document.getElementsByClassName('cell')[cellIndex].textContent = this.currentPlayer;
                document.getElementsByClassName('cell')[cellIndex].style.cursor = 'default';
                this.checkResult();

                if (this.gameActive) {
                    this.isPlayerTurn = false;
                    this.makeAIMove();
                }
            }
        }
    }

    makeAIMove() {
        if (this.gameActive && !this.isPlayerTurn) {
            const emptyCells = this.gameState.reduce((acc, value, index) => {
                if (value === '') {
                    acc.push(index);
                }
                return acc;
            }, []);

            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const aiMove = emptyCells[randomIndex];
            this.gameState[aiMove] = 'O';
            document.getElementsByClassName('cell')[aiMove].textContent = 'O';
            document.getElementsByClassName('cell')[aiMove].style.cursor = 'default';
            this.checkResult();

            if (this.gameActive) {
                this.isPlayerTurn = true;
            }
        }
    }

    checkResult() {


        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            if (
                this.gameState[a] !== '' &&
                this.gameState[a] === this.gameState[b] &&
                this.gameState[a] === this.gameState[c]
            ) {
                this.gameActive = false;

                if (this.gameState[a] === 'X') {
                    this.stopGameAudio();
                    document.getElementById('status').innerText = 'Congratulations! Player wins!';
                    this.playAudio('win');
                } else if (this.gameState[a] === 'O') {
                    this.stopGameAudio();
                    document.getElementById('status').innerText = 'CPU wins! Better luck next time.';
                    this.playAudio('fail');
                }


                return;
            }
        }

        if (!this.gameState.includes('')) {
            this.gameActive = false;
            this.stopGameAudio();
            document.getElementById('status').innerText = "Try once more, the game is Tied!";
            this.playAudio('tie');

        }
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    resetGame() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];

        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].style.cursor = 'pointer';
        }

        document.getElementById('status').innerText = '';




        location.reload();
    }
}

const game = new TicTacToe();