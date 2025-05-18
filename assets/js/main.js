/*
Tic Tac Toe game plan:
1. Create a func to manage game board
    1.1 DONE: Create a 2d arr represent the game board
        1.1.1 DONE: Each ele in the arr is an cell obj that can manage each cell
    1.2 DONE: Can retrieve the current board
    1.3 DONE: Can print out the current board
    1.4 DONE: Can fill in the the value to cell by index
    1.5 DONE: Set up + retrieve win moves

2. Crate a func to manage cell state
    2.1 DONE: Add player value to a cell
    2.2 DONE: retrieve value from a cell
    2.3 DONE: Update cell index value
        2.3.1 DOME: base one inp row and col
        2.3.2 DONE: base on DOM index;
    2.3 DONE: get cell index

3. Create func to manage player
    3.1 DONE: setup 2 players + retrieve all their info
    3.2 DONE: retrieve player name
    3.3 DONE: retrieve player taken value
    3.4 DONE: update + retrieve player moves arr list

4. Func to manage game play
    4.1 DONE: Setup player value + name
    4.2 DONE: print out new game board play
    4.3 DONE: Switch + retrieve active player + active player index
    4.4 DONE: Check Win for player
        4.4.1 DONE: Create 2d loop to get all win moves arr list from game board
        4.4.2 DONE: Compare if player moves include in the win move arr list 
                4.4.2.1 DONE: If yes set winMovesCount ++
                4.4.2.2 DONE: If winMovesCount === 3 break the loop 
        4.4.3 DONE: If player moves did not pass in a row, reset winMovesCount = 0
    4.5 handling game play after each move
        4.5.1 DONE: Announce active player turn
        4.5.2 DONE: Validate player move
            - DONE: If ok, update current available move list, remove the player move from the list
        4.5.3 DONE: Announce active player move choice.
        4.5.3 DONE: fill card with player token val in position in DOM index
        4.5.3 DONE: update player move arr list
        4.5.6 DONE: Check win state if player move arr list length is greater than 2
            4.5.6.1 DONE: If active player wins => 
                - DONE: reset player move list + win count up
                - DONE: print new game board

*/

// set up gameBoard states and configs
// each elements in the gameBoard is a cell - gameCard (will be defined later)
// this gameCard is responsible for handling each card value
const gameBoard = () => {
    let rows = 3;
    let columns = 3;
    const winCardList = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let board = [];

    const getWinCardList = () => winCardList;

    // Create 2d arr represent game board
    const createGameBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(gameCard());
            }
        }
    };
    // createGameBoard();

    const getGameBoard = () => board;

    const getGameBoardSize = () => {
        return { rows, columns };
    };

    const fillBoardCardWithPlayerValue = (cardIndexInDOM, playerTokenValue) => {
        // let cardRow, cardCol;
        // let isCardAvailable;
        // if (cardArrIndex) {
        //     cardRow = cardArrIndex.row;
        //     cardCol = cardArrIndex.col;
        // } else if (cardIndexInDOM) {
        //     cardRow = Math.floor(cardIndexInDOM / rows);
        //     cardCol = cardIndexInDOM % columns;
        // }

        const cardRow = Math.floor(cardIndexInDOM / rows);
        const cardCol = cardIndexInDOM % columns;
        // console.log({ cardRow, cardCol });

        let card = board[cardRow][cardCol];

        const isCardAvailable = card.getCardValue() === '' ? true : false;

        if (!isCardAvailable) {
            return;
        } else {
            // board[cardRow][cardCol] = playerTokenValue;
            card.addPlayerValueToCard(playerTokenValue);
        }
    };

    const printGameBoard = () => {
        const gameBoardWithCardValue = board.map((row) => {
            return row.map((card) => {
                return card.getCardValue();
            });
        });
        console.log(gameBoardWithCardValue);
    };

    return {
        createGameBoard,
        getGameBoard,
        getGameBoardSize,
        fillBoardCardWithPlayerValue,
        printGameBoard,
        getWinCardList,
    };
};

// A gameCard represents for one square on the board.
// It can have one of these below value
// '': empty square
// 'X': player Left token value
// 'O': player Right token value
const gameCard = () => {
    let cardValue = '';
    let cardArrIndex;
    let cardIndexInDOM = 0;

    // add player value to card value
    const addPlayerValueToCard = (playerTokenValue) => {
        cardValue = playerTokenValue;
    };

    // retrieve card value
    const getCardValue = () => cardValue;

    // retrieve card index in arr
    const updateCardArrIndex = (row, col) => {
        cardArrIndex = {
            row,
            col,
        };
    };

    const getCardArrIndex = () => cardArrIndex;

    // retrieve card index in DOM
    const updateCardIndexInDOM = (indexInDOM) => {
        cardIndexInDOM = indexInDOM;
    };

    const getCardIndexInDOM = () => cardIndexInDOM;

    return {
        addPlayerValueToCard,
        getCardValue,
        updateCardArrIndex,
        getCardArrIndex,
        updateCardIndexInDOM,
        getCardIndexInDOM,
    };
};

// storing updating and retrieving player's name, toke value, moves,
const controlPlayers = (playerLeftName = 'Player 1', playerRightName = 'Player 2') => {
    // setup player value
    const initialPlayers = [
        {
            id: 0,
            name: playerLeftName,
            playerTokenValue: 'X',
            movesList: [],
            winRoundCount: 0,
        },
        {
            id: 1,
            name: playerRightName,
            playerTokenValue: 'O',
            movesList: [],
            winRoundCount: 0,
        },
    ];
    let players = [...initialPlayers];

    const getAllPlayers = () => players;
    const getPlayerName = (activePlayerIndex) => {
        return getAllPlayers()[activePlayerIndex].name;
    };
    const getPlayerTokenValue = (activePlayerIndex) => {
        return getAllPlayers()[activePlayerIndex].playerTokenValue;
    };

    const updatePlayerMoves = (activePlayerIndex, playerMoves) => {
        getAllPlayers()[activePlayerIndex].movesList.push(playerMoves);
        // console.log(getAllPlayers()[activePlayerIndex].movesList);
    };

    const getPlayerMoves = (activePlayerIndex) => {
        // console.log(getAllPlayers()[activePlayerIndex].movesList);
        return getAllPlayers()[activePlayerIndex].movesList;
    };

    const increasePlayerWinRoundCount = (activePlayerIndex) => {
        getAllPlayers()[activePlayerIndex].winRoundCount++;
    };

    const getPlayerWinRoundCount = (activePlayerIndex) => {
        return getAllPlayers()[activePlayerIndex].winRoundCount;
    };

    const resetAllPlayersMoves = () => {
        getAllPlayers()[0].movesList = [];
        getAllPlayers()[1].movesList = [];
        // console.log(getAllPlayers());
    };

    const resetAllPlayersValue = () => {
        players = [...initialPlayers];
    };

    return {
        getAllPlayers,
        getPlayerName,
        getPlayerTokenValue,
        updatePlayerMoves,
        getPlayerMoves,
        increasePlayerWinRoundCount,
        getPlayerWinRoundCount,
        resetAllPlayersMoves,
        resetAllPlayersValue,
    };
};

const controlGamePlay = () => {
    // init game board
    const board = gameBoard();

    // setup available moves
    const initialAvailableMoves = () => {
        let gameBoardSize = board.getGameBoardSize();
        let availableMoves = [];

        for (let i = 0; i < gameBoardSize.columns * gameBoardSize.rows; i++) {
            availableMoves.push(i);
        }
        return availableMoves;
    };
    let currentAvailableMoves = [...initialAvailableMoves()];
    const getAvailableMoves = () => currentAvailableMoves;

    // setup round count
    let round = 1;
    const getRoundCount = () => {
        return round;
    };
    const increaseRoundCount = () => {
        round++;
    };
    const resetRoundCount = () => {
        round = 1;
    };

    // setup player value
    const players = controlPlayers();

    // setup active player + switch + retrieve func
    let activePlayer = players.getAllPlayers()[0];
    let activePlayerIndex = 0;

    const switchActivePlayer = () => {
        activePlayer =
            activePlayer === players.getAllPlayers()[0] ? players.getAllPlayers()[1] : players.getAllPlayers()[0];
        activePlayerIndex = activePlayerIndex === players.getAllPlayers()[0].id ? 1 : 0;
    };

    const getActivePlayer = () => activePlayer;
    const getActivePlayerIndex = () => activePlayerIndex;

    // print new game board
    const newGameRound = () => {
        board.createGameBoard();
        board.printGameBoard();
    };

    // verify if active player wins
    const checkIfActivePlayerWins = (activePlayerIndex) => {
        let activePlayerWinState = false;
        let activePlayerWinMovesCount = 0;

        for (let row = 0; row < board.getWinCardList().length; row++) {
            for (let card = 0; card < board.getWinCardList()[row].length; card++) {
                let cardValue = board.getWinCardList()[row][card];

                if (players.getPlayerMoves(activePlayerIndex).includes(cardValue)) {
                    activePlayerWinMovesCount++;
                }
                if (activePlayerWinMovesCount === 3) {
                    break;
                }
            }
            if (activePlayerWinMovesCount === 3) {
                break;
            } else {
                activePlayerWinMovesCount = 0;
            }
        }

        activePlayerWinState = activePlayerWinMovesCount === 3 ? true : false;
        // console.log(activePlayerWinMovesCount);
        // console.log(activePlayerWinState);
        // return activePlayerWinState === true ? console.log('Win') : console.log('Lose');
        return activePlayerWinState;
    };

    const checkDraw = () => {
        let availableMoves = getAvailableMoves();
        if (availableMoves.length === 0) {
            return true;
        } else {
            return false;
        }
    };

    // check if active player moves available
    // if yes remove it from available move list
    const validateAndUpdateCurrentAvailableMoves = (availableMoves, playerMove) => {
        // console.log('before: ', availableMoves);
        if (availableMoves.includes(playerMove)) {
            let playerMoveIndexInList = availableMoves.indexOf(playerMove);
            availableMoves.splice(playerMoveIndexInList, 1);
            // console.log('after: ', availableMoves);
            return true;
        } else {
            return false;
        }
    };

    const resetAvailableMoves = () => {
        currentAvailableMoves = [...initialAvailableMoves()];
    };

    // handle after each move a player made
    const gamePlayHandler = (cardIndexInDOM) => {
        let availableMoves = getAvailableMoves();

        if (validateAndUpdateCurrentAvailableMoves(availableMoves, cardIndexInDOM)) {
            let activePlayerWinState = false;
            let isDraw = false;
            let activePlayerName = players.getPlayerName(getActivePlayerIndex());
            let activePlayerTokenValue = players.getPlayerTokenValue(getActivePlayerIndex());
            let activePlayerMoves = players.getPlayerMoves(getActivePlayerIndex());

            // console.log(`${getActivePlayer().name}'s turn`);
            console.log(`${activePlayerName} plays ${activePlayerTokenValue} at ${cardIndexInDOM}`);

            board.fillBoardCardWithPlayerValue(cardIndexInDOM, getActivePlayer().playerTokenValue);
            players.updatePlayerMoves(getActivePlayerIndex(), cardIndexInDOM);
            board.printGameBoard();

            console.log(`${activePlayerName}'s move list: ${activePlayerMoves}`);

            // console.log(activePlayerMoves);

            if (activePlayerMoves.length > 2) {
                // console.log(`Checking ${activePlayerName} win state...`);
                activePlayerWinState = checkIfActivePlayerWins(getActivePlayerIndex());
            }

            isDraw = checkDraw();

            if (isDraw && !activePlayerWinState) {
                console.log('Draw!');
                console.log(players.getAllPlayers());
                console.log('Start new game');
                increaseRoundCount();
                players.resetAllPlayersMoves();
                resetAvailableMoves();
                newGameRound();
            } else if (!isDraw && !activePlayerWinState) {
                switchActivePlayer();
            } else if (activePlayer) {
                console.log(`${activePlayerName} wins`);
                players.increasePlayerWinRoundCount(getActivePlayerIndex());
                console.log(players.getAllPlayers());
                console.log('Start new game');
                increaseRoundCount();
                players.resetAllPlayersMoves();
                resetAvailableMoves();
                newGameRound();
                // return;
            }
        } else {
            return;
        }
    };

    const restartGame = () => {
        players.resetAllPlayersValue();
        resetRoundCount();
        newGameRound();
    };

    return {
        getActivePlayer,
        newGameRound,
        gamePlayHandler,
        restartGame,
        getRoundCount,
        // getGameBoardSize: board.getGameBoardSize,
        getGameBoard: board.getGameBoard,
        createGameBoard: board.createGameBoard,
    };
};

// let tgame = controlGamePlay();
// tgame.newGameRound();
// // player 1 wins
// tgame.gamePlayHandler(5);
// tgame.gamePlayHandler(1);
// tgame.gamePlayHandler(4);
// tgame.gamePlayHandler(2);
// tgame.gamePlayHandler(3);
// // draw
// tgame.gamePlayHandler(6);
// tgame.gamePlayHandler(2);
// tgame.gamePlayHandler(0);
// tgame.gamePlayHandler(4);
// tgame.gamePlayHandler(7);
// tgame.gamePlayHandler(8);
// tgame.gamePlayHandler(1);
// tgame.gamePlayHandler(3);
// tgame.gamePlayHandler(5);
// //player 2 wins
// tgame.gamePlayHandler(5);
// tgame.gamePlayHandler(0);
// tgame.gamePlayHandler(1);
// tgame.gamePlayHandler(4);
// tgame.gamePlayHandler(2);
// tgame.gamePlayHandler(8);
// =================================

// let tplayer = controlPlayers();
// tplayer.updatePlayerMoves(0, 1);
// tplayer.updatePlayerMoves(0, 4);
// // console.log(tplayer.getPlayerTokenValue(0));
// console.log(tplayer.getPlayerMoves(0));

const screenHandler = () => {
    // DOM elements
    const gameSelectionController = document.querySelector('.gameSelectionController');
    const startBtn = document.querySelector('.startBtn');

    const gamePlayController = document.querySelector('.gamePlayController');
    const roundNumberDisplay = document.querySelector('.round');
    const restartBtn = document.querySelector('.restartBtn');
    const exitBtn = document.querySelector('.exitBtn');

    const gameSelection = document.querySelector('.gameSelection');
    // const playerCardImgLeft = document.querySelector('.playerCardImgLeft');
    const playerControllerSelectionLeft = document.querySelector('#playerControllerSelectionLeft');
    // const playerCardImgRight = document.querySelector('.playerCardImgRight');
    const playerControllerSelectionRight = document.querySelector('#playerControllerSelectionRight');

    const gamePlay = document.querySelector('.gamePlay');
    const playerRight = document.querySelector('.playerRight');
    const playerRightScore = document.querySelector('.playerRight .score');
    const playerLeft = document.querySelector('.playerLeft');
    const playerLeftScore = document.querySelector('.playerLeft .score');
    const gameDisplay = document.querySelector('.gameDisplay');

    const filterWrapper = document.querySelector('.filter');
    const filterSideLeft = document.querySelector('.filterSideLeft');
    const filterSideRight = document.querySelector('.filterSideRight');

    // game play control elements
    const game = controlGamePlay();

    let playerTypesList = [
        {
            playerType: 'human',
            cssType: 'human',
        },
        {
            playerType: 'compEasy',
            cssType: 'computer easy',
        },
        {
            playerType: 'compMedium',
            cssType: 'computer medium',
        },
        {
            playerType: 'compHard',
            cssType: 'computer hard',
        },
    ];
    const getPlayerTypes = () => {
        return playerTypesList;
    };

    const playersInfo = [
        {
            name: 'Player 1',
            side: 'Left',
            type: 'human',
            level: '',
        },
        {
            name: 'Player 2',
            side: 'Right',
            type: 'human',
            level: '',
        },
    ];
    const getAllPlayersInfo = () => {
        return playersInfo;
    };
    const getPlayerInfo = (playerIndex) => {
        return getAllPlayersInfo()[playerIndex];
    };
    const updatePlayersInfo = (playerIndex, infoType, valueToUpdate) => {
        switch (infoType) {
            case 'type':
                playersInfo[playerIndex].type = valueToUpdate;
                break;
            case 'level':
                if (playersInfo[playerIndex].type === 'human') {
                    playersInfo[playerIndex].level = '';
                } else {
                    playersInfo[playerIndex].level = valueToUpdate;
                }
                break;
            default:
                throw new Error('Cannot do the action');
        }
    };
    const resetPlayersInfo = () => {
        for (let i = 0; i < playersInfo.length; i++) {
            playersInfo[i].type = 'human';
            playersInfo[i].level = '';
        }
    };

    const setUpPlayerInfoWithSelectionValue = (side) => {
        const playerSelection = document.querySelector(`#playerControllerSelection${side}`);
        const playerSelectionValue = playerSelection.value;

        // let playerType = getPlayerType(playerSelectionValue);
        let playerType = getPlayerTypes().filter((playerType) => {
            return playerType.playerType === playerSelectionValue;
        });

        // console.log(playerType[0]);
        if (side === 'Left') {
            updatePlayersInfo(0, 'type', playerType[0].cssType.split(' ')[0]);
            updatePlayersInfo(0, 'level', playerType[0].cssType.split(' ')[1]);
        } else if (side === 'Right') {
            updatePlayersInfo(1, 'type', playerType[0].cssType.split(' ')[0]);
            updatePlayersInfo(1, 'level', playerType[0].cssType.split(' ')[1]);
        }
        // console.log(getAllPlayersInfo());
    };

    // Handle Styles + logic funcs
    // change player img accordingly
    const changePlayerImg = (side) => {
        setUpPlayerInfoWithSelectionValue(side);
        let playerIndex = side === 'Left' ? 0 : 1;
        let playerType = getPlayerInfo(playerIndex);

        const playerCardImg = document.querySelector(`.playerCardImg${side}`);
        let playerImgClassList = Array.from(playerCardImg.classList);

        if (playerImgClassList.includes('human') && playerType.type !== 'human') {
            playerCardImg.classList.remove('human');
            playerCardImg.classList.add(`${playerType.type}`);
        } else if (
            playerImgClassList.includes('computer') &&
            (playerType.type !== 'compEasy' || playerType.type !== 'compMedium' || playerType.type !== 'compHard')
        ) {
            playerCardImg.classList.remove('computer');
            playerCardImg.classList.add(`${playerType.type}`);
        }
    };
    playerControllerSelectionLeft.addEventListener('change', () => {
        changePlayerImg('Left');
    });
    playerControllerSelectionRight.addEventListener('change', () => {
        changePlayerImg('Right');
    });

    const startBtnHandler = () => {
        setUpPlayerInfoWithSelectionValue('Left');
        setUpPlayerInfoWithSelectionValue('Right');
        let playerLeft = getPlayerInfo(0);
        let playerRight = getPlayerInfo(1);

        console.log({ playerLeft, playerRight });

        if (
            Array.from(gameSelection.classList).includes('active') &&
            Array.from(gameSelectionController.classList).includes('active')
        ) {
            gameSelectionController.classList.remove('active');
            gameSelection.classList.remove('active');

            gamePlayController.classList.add('active');
            gamePlay.classList.add('active');
            filterWrapper.classList.add('active');
        }
    };
    startBtn.addEventListener('click', () => {
        startBtnHandler();
    });

    const gameCardClickHandler = (cardIndex) => {
        console.log(`card number ${cardIndex} click`);
    };

    const updateGamePlayScreen = () => {
        // clear game board display
        gameDisplay.textContent = '';

        game.createGameBoard();
        const gameBoardOnScreen = game.getGameBoard();
        const activePlayer = game.getActivePlayer();

        let tmpIndex = 0;
        gameBoardOnScreen.forEach((row) => {
            row.forEach((gameCardOnRow) => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('gameCard');
                gameCard.dataset.index = tmpIndex;
                gameCard.dataset.value = '';
                gameCard.textContent = gameCardOnRow.getCardValue();
                gameCard.addEventListener('click', () => {
                    gameCardClickHandler(gameCard.dataset.index);
                });
                gameDisplay.appendChild(gameCard);

                tmpIndex++;
                // console.log(tmpIndex);
            });
        });
    };

    // initial render
    updateGamePlayScreen();
};

screenHandler();
