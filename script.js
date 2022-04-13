const SelectionMenuSetup = (() => {

    const p1Name = document.querySelector('.p1-name');
    const p2Name = document.querySelector('.p2-name');

    const p2Button = document.querySelector('.p2-button');
    p2Button.addEventListener('click', p2VsToggle);

    const aiButton = document.querySelector('.ai-button');
    aiButton.addEventListener('click', aiVsToggle);

    const startGameButton = document.querySelector('.start-game');
    startGameButton.addEventListener('click', startGame);

    function aiVsToggle(e) {

        if (p2Name.classList.contains('disabled')) {
            
            p2Name.classList.remove('disabled');
            p2Button.classList.add('selected-button');
            aiButton.classList.remove('selected-button');
            return;
        }
        
        p2Name.classList.add('disabled');
        p2Button.classList.remove('selected-button');
        aiButton.classList.add('selected-button');
            
    }

    function p2VsToggle(e) {

        if (p2Name.classList.contains('disabled')) {
            p2Name.classList.remove('disabled');
            p2Button.classList.add('selected-button');
            aiButton.classList.remove('selected-button');
            return;
        }
            
    }

    function startGame() {
        const selectionMenu = document.querySelector('.selection-menu');
        selectionMenu.classList.add('disabled');
        selectionMenu.addEventListener('transitionend', () => {
            selectionMenu.style.display = 'none';
            Gameboard.showBoard();});
    }


})();

const Gameboard = (() => {

    //Start webpage with game disabled
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.classList.add('disabled');

    function showBoard() {
        gameGrid.classList.remove('disabled');
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

    let p1 = Player("Morgana", 'M');
    let p2 = Player("Ike", "I");
    
    const TurnManager = ((p1, p2) => {
        let whoseTurn = p2;

        function changeTurn() {
            if(whoseTurn === p1) 
                whoseTurn = p2;
            else
                whoseTurn = p1;

            return whoseTurn;
        }

        return {changeTurn}

    })(p1, p2);

    gridBlocks.forEach(block => block.addEventListener('click', checkBlock));
    function checkBlock(e) {
        let index = e.target.getAttribute('data-index');
        if(gameboard[index] === '') {
            gameboard[index] = TurnManager.changeTurn().sign;
            showGameBoard();
            if(checkForWinner() !== null) {
                alert(checkForWinner());
            }
        }
    }

    function checkForWinner() {
        //Vertical checks
        for(let i = 0; i < 3; i++) {
            if(gameboard[i] === '') continue;
            if(gameboard[i] === gameboard[i+3] && gameboard[i] === gameboard[i+6])
                return gameboard[i];
        }
        //Horizontal checks
        for(let j = 0, i = 0; i < 3; i++, j = j + 3) {
            if(gameboard[j] === '') continue;
            if(gameboard[j] === gameboard[j+1] && gameboard[j] === gameboard[j+2])
                return gameboard[j];
        }
        //Diagnol checks
        if(gameboard[4] === '') return null;
        if(gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) {
            return gameboard[0];
        }
        if(gameboard[2] === gameboard[4] && gameboard[2] == gameboard[6]) {
            return gameboard[0];
        }

        return null;
    }



    return {showBoard}

})();