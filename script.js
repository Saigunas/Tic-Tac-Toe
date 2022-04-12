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
        }
    }
})();