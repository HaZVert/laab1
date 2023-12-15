// script.js

// Додаємо стилі CSS прямо в JavaScript
const styles = `
body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

#slotMachine {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    width: 80%;
}

#playerName {
    margin-bottom: 10px;
    font-size: 24px;
}

.slot-row {
    display: flex;
    overflow: hidden;
    margin-bottom: 20px;
}

.slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    animation: scrollAnimation 2s linear infinite;
}

img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 2px solid #333;
    border-radius: 5px;
    margin-bottom: 5px;
}

#attempts {
    font-size: 18px;
    margin-top: 10px;
}

#result {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
}

button {
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
}

@media only screen and (max-width: 600px) {
    img {
        width: 50px;
        height: 50px;
    }
}

@keyframes scrollAnimation {
    to {
        transform: translateY(-200%);
    }
}
`;

// Створюємо стиль і додаємо його в документ
const styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);

let playerName = prompt("Введіть своє ім'я:");

if (!playerName) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = "Повторіть спробу та введіть своє ім'я.";
    document.body.appendChild(errorMessage);
} else {
    const playerNameElement = document.createElement('h1');
    playerNameElement.id = 'playerName';
    playerNameElement.textContent = playerName;
    document.getElementById('slotMachine').appendChild(playerNameElement);

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate';
    generateButton.onclick = startGame;
    document.getElementById('slotMachine').appendChild(generateButton);

    const attemptsElement = document.createElement('p');
    attemptsElement.id = 'attempts';
    attemptsElement.textContent = 'Спроби: 0/3';
    document.getElementById('slotMachine').appendChild(attemptsElement);

    for (let i = 0; i < 3; i++) {
        const slotRow = document.createElement('div');
        slotRow.className = 'slot-row';
        slotRow.id = `slot${i + 1}`;
        document.getElementById('slotMachine').appendChild(slotRow);
    }

    const resultElement = document.createElement('p');
    resultElement.id = 'result';
    document.getElementById('slotMachine').appendChild(resultElement);

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Спробувати ще раз';
    retryButton.style.display = 'none';
    retryButton.onclick = retryGame;
    document.getElementById('slotMachine').appendChild(retryButton);
}

let attemptsLeft = 3;
let gameEnded = false;

function startGame() {
    if (!gameEnded) {
        const slot1 = document.getElementById('slot1');
        const slot2 = document.getElementById('slot2');
        const slot3 = document.getElementById('slot3');
        const result = document.getElementById('result');

        slot1.innerHTML = '';
        slot2.innerHTML = '';
        slot3.innerHTML = '';
        result.textContent = '';

        attemptsLeft--;
        document.getElementById('attempts').textContent = `Спроби: ${3 - attemptsLeft}/3`;

        if (attemptsLeft === 0) {
            result.textContent = 'Ви програли!';
            document.querySelector('button').style.display = 'none';
            document.querySelector('button:last-of-type').style.display = 'block';
            gameEnded = true;
        } else {
            generateRandomImages('slot1');
            generateRandomImages('slot2');
            generateRandomImages('slot3');

            if (checkForWin()) {
                result.textContent = 'Ви перемогли!';
                document.querySelector('button').style.display = 'none';
                document.querySelector('button:last-of-type').style.display = 'block';
                gameEnded = true;
            }
        }
    }
}

function retryGame() {
    attemptsLeft = 3;
    document.getElementById('attempts').textContent = 'Спроби: 0/3';
    document.querySelector('button').style.display = 'block';
    document.querySelector('button:last-of-type').style.display = 'none';
    gameEnded = false;
}

function generateRandomImages(slotId) {
    const slot = document.getElementById(slotId);

    for (let i = 0; i < 3; i++) {
        const image = document.createElement('img');
        const randomImageIndex = Math.floor(Math.random() * 4) + 1;
        image.src = `/im${randomImageIndex}.png`;
        image.style.width = '80px';
        image.style.height = '80px';
        image.style.objectFit = 'cover';
        image.style.border = '2px solid #333';
        image.style.borderRadius = '5px';
        image.style.marginBottom = '5px';
        slot.appendChild(image);
    }
}

function checkForWin() {
    const rows = document.querySelectorAll('.slot-row');

    for (const row of rows) {
        const images = row.getElementsByTagName('img');
        if (images[0].src === images[1].src && images[1].src === images[2].src) {
            return true;
        }
    }

    return false;
}
