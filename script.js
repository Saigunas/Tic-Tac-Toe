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

    gridBlocks.forEach(block => block.addEventListener('click', checkBlock));
    function checkBlock(e) {
        let index = e.target.getAttribute('data-index');
        if(gameboard[index] === '') {
            gameboard[index] = 'X';
            showGameBoard();
        }
    }
})();