const SelectionMenuSetup = (() => {

    const p1Name = document.querySelector('.p1-name');
    const p2Name = document.querySelector('.p2-name');

    const p2Button = document.querySelector('.p2-button');
    p2Button.addEventListener('click', p2VsToggle);

    const aiButton = document.querySelector('.ai-button');
    aiButton.addEventListener('click', aiVsToggle);

    const startGameButton = document.querySelector('.start-game');
    startGameButton.addEventListener('click', startGame);

    let selectedVs = "p2";

    function aiVsToggle(e) {

        if (p2Name.classList.contains('disabled')) {
            
            p2Name.classList.remove('disabled');
            p2Button.classList.add('selected-button');
            aiButton.classList.remove('selected-button');
            selectedVs = "p2";

            return;
        }
        
        p2Name.classList.add('disabled');
        p2Button.classList.remove('selected-button');
        aiButton.classList.add('selected-button');
        selectedVs = "ai";
        
    }

    function p2VsToggle(e) {

        if (p2Name.classList.contains('disabled')) {
            p2Name.classList.remove('disabled');
            p2Button.classList.add('selected-button');
            aiButton.classList.remove('selected-button');
            selectedVs = "ai";
            return;
        }
        selectedVs = "p2";
    }

    function startGame() {
        if(p1Name.value === '') {
            p1Name.value = "Player 1"
        }
        if(p2Name.value === '') {
            p2Name.value = "Player 2"
        }

        const selectionMenu = document.querySelector('.selection-menu');
        selectionMenu.classList.add('disabled');   

        let didTransition = false;
        selectionMenu.addEventListener('transitionend', () => {
            if(!didTransition) {
                didTransition = true;

                selectionMenu.style.display = 'none';
                if(selectedVs === "ai") {
                    Gameboard.showBoardAi(p1Name.value);
                    return;
                }
                Gameboard.showBoardP2(p1Name.value, p2Name.value);
            }
        });
    }
    
    
})();

const Gameboard = (() => {

    let aiGame = false;
    const gameGrid = document.querySelector('.game-grid');

    //selects game mode based on who it is playing against
    function showBoardP2(p1Name, p2Name) {
        TurnManager.initializeGame(aiGame);
        p1.name = p1Name;
        p2.name = p2Name;
        gameGrid.classList.remove('disabled');
        restartButton.classList.remove('disabled');
        restartButton.classList.add('grid-enable');
        gameGrid.classList.add('grid-enable');
    }

    function showBoardAi(p1Name) {
        aiGame = true;
        TurnManager.initializeGame(aiGame);
        p1.name = p1Name;
        p2.name = "AI";
        gameGrid.classList.remove('disabled');
        restartButton.classList.remove('disabled');
        restartButton.classList.add('grid-enable');
        gameGrid.classList.add('grid-enable');
    }


    const gridBlocks = document.querySelectorAll('.grid-block');
    
    let gameboard = ['', '', '',
                     '', '', '',
                     '', '', ''];
                     
    function showGameBoard() {
        for(let index = 0; index < gameboard.length; index++) {
            gridBlocks[index].textContent = gameboard[index];
        }
    }
    showGameBoard();

    const Player = (name, sign) => {
        return {name, sign};
    };

    let p1 = Player("Player 1", 'X');
    let p2 = Player("Player 2", "O");


    const restartButton = document.querySelector('.restart-game');
    restartButton.addEventListener('click', () => {
        gameboard = ['', '', '',
                    '', '', '',
                    '', '', ''];
        showGameBoard();

        const winnerAnnounce = document.querySelector('.winner-announce');
        winnerAnnounce.textContent = '';
        TurnManager.initializeGame(aiGame);        
    });


    
    const TurnManager = ((p1, p2, showGameBoard) => {
        
        let aiGame;
        let whoseTurn;

        function initializeGame(vsAi) {
            whoseTurn = p1;
            gridBlocks.forEach(block => block.addEventListener('click', checkBlock));
            aiGame = vsAi;
        }

        function changeTurn() {
            if(aiGame === true) {
                playAi();
                return;
            }
            if(whoseTurn === p1) 
                whoseTurn = p2;
            else
                whoseTurn = p1;
        }

        function checkBlock(e) {
            let index = e.target.getAttribute('data-index');
            if(gameboard[index] === '') {
                
                gameboard[index] = whoseTurn.sign;
                showGameBoard();
                if(winnerCheck()) {
                    return;
                }
                changeTurn();
            }
        }
    

        function playAi() {
            let emptySpaceFound = false;
            while(!emptySpaceFound) {
                let blockOnGrid = Math.floor(Math.random() * gameboard.length);
                if(gameboard[blockOnGrid] === '') {
                    gameboard[blockOnGrid] = p2.sign;
                    showGameBoard();
                    winnerCheck();
                    emptySpaceFound = true;
                }
            }
        }


        function winnerCheck() {

            const winnerAnnounce = document.querySelector('.winner-announce');
            let winner = checkForWinner();
    
            if(winner === "draw") {
                winnerAnnounce.textContent = "IT'S A DRAW!";
                gridBlocks.forEach(block => block.removeEventListener('click', checkBlock));
                return true;
            }
            
            if(winner !== null) {
                winnerAnnounce.textContent = `${winner.name} WON!`;
                gridBlocks.forEach(block => block.removeEventListener('click', checkBlock));
                return true;
            }
    
    
            function checkForWinner() {
    
                //Vertical checks
                for(let i = 0; i < 3; i++) {
                    if(gameboard[i] === '') continue;
                    if(gameboard[i] === gameboard[i+3] && gameboard[i] === gameboard[i+6])
                        return checkWhoseWinner(gameboard[i]);
                }
                //Horizontal checks
                for(let j = 0, i = 0; i < 3; i++, j = j + 3) {
                    if(gameboard[j] === '') continue;
                    if(gameboard[j] === gameboard[j+1] && gameboard[j] === gameboard[j+2])
                        return checkWhoseWinner(gameboard[j]);
                }
                //Diagnol checks
                if(gameboard[4] === '') return null;
                if(gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) {
                    return checkWhoseWinner(gameboard[0]);
                }
                if(gameboard[2] === gameboard[4] && gameboard[2] == gameboard[6]) {
                    return checkWhoseWinner(gameboard[0]);
                }
    
                function checkWhoseWinner(sign) {
                    if(p1.sign === sign) {
                        return p1;
                    }
                    return p2;
                }
    
                if(!gameboard.includes('')) {
                    return "draw";
                }
                
                return null;
            }
        }

        return {initializeGame, aiGame};

    })(p1, p2, showGameBoard);





    return {showBoardP2, showBoardAi}

})();