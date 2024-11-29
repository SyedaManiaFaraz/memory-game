// script.js

const emojis = ['🍕', '🍔', '🍟', '🌭', '🍣', '🍤', '🍩', '🍪'];
const board = document.querySelector('.board');
const movesCounter = document.querySelector('.moves');
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start-button');
const winMessage = document.querySelector('.win-message');
const winMoves = document.querySelector('.win-moves');
const winTime = document.querySelector('.win-time');

let moves = 0;
let totalTime = 0;
let timer;
let flippedCards = [];
let matchedCards = [];

function shuffleArray(array) {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[i]];
    }
    return clonedArray;
}

function startGame() {
    moves = 0;
    totalTime = 0;
    matchedCards = [];
    movesCounter.textContent = `Moves: ${moves}`;
    timerDisplay.textContent = `Time: ${totalTime} sec`;
    startButton.classList.add('disabled');
    winMessage.classList.add('hidden');
    clearInterval(timer);

    const items = shuffleArray([...emojis, ...emojis]);
    board.innerHTML = items
        .map(emoji => `
            <div class="card">
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">${emoji}</div>
                </div>
            </div>
        `).join('');

    timer = setInterval(() => {
        totalTime++;
        timerDisplay.textContent = `Time: ${totalTime} sec`;
    }, 1000);

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => flipCard(card));
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flip')) {
        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesCounter.textContent = `Moves: ${moves}`;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.card-back').textContent;
    const emoji2 = card2.querySelector('.card-back').textContent;

    if (emoji1 === emoji2) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === emojis.length * 2) {
            clearInterval(timer);
            winMoves.textContent = moves;
            winTime.textContent = totalTime;
            winMessage.classList.remove('hidden');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

startButton.addEventListener('click', startGame);
