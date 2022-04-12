const Gameboard = (() => {
        
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

})();