// Define colors
const colors = [
    {r: 255, g: 0, b: 0},
    {r: 0, g: 255, b: 0},
    {r: 0, g: 0, b: 255},
    {r: 255, g: 255, b: 0},
    {r: 255, g: 0, b: 255},
    {r: 0, g: 255, b: 255}
];

let score = 0;
let lives = 3;

// Function to generate a random color
function generateColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Function to generate RGB string from color object
function getColorString(color) {
    return rgb(${color.r}, ${color.g}, ${color.b});
}

// Function to shuffle options array
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
}

// Function to start the game
function startGame() {
    const rgbDisplay = document.getElementById('rgb');
    const optionsDiv = document.getElementById('options');
    const messageDiv = document.getElementById('message');
    const scoreDiv = document.getElementById('score');
    const restartBtn = document.getElementById('restart');

    restartBtn.style.display = 'none';
    messageDiv.textContent = '';
    score = 0;
    lives = 3;
    scoreDiv.textContent = Score: ${score};

    function generateOptions() {
        const correctColor = generateColor();
        const options = [correctColor];

        // Generate incorrect options
        while (options.length < 3) {
            const randomColor = generateColor();
            if (!options.some(option => getColorString(option) === getColorString(randomColor))) {
                options.push(randomColor);
            }
        }

        shuffleOptions(options);

        // Display options
        optionsDiv.innerHTML = '';
        options.forEach(color => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.style.backgroundColor = getColorString(color);
            optionDiv.addEventListener('click', () => {
                if (getColorString(color) === getColorString(correctColor)) {
                    score++;
                    scoreDiv.textContent = Score: ${score};
                    messageDiv.textContent = 'Correct!';
                } else {
                    lives--;
                    if (lives === 0) {
                        endGame();
                    } else {
                        messageDiv.textContent = Wrong! Lives left: ${lives};
                    }
                }
                generateOptions();
            });
            optionsDiv.appendChild(optionDiv);
        });

        // Display RGB value to guess
        rgbDisplay.textContent = getColorString(correctColor);
    }

    generateOptions();
}

// Function to end the game
function endGame() {
    const restartBtn = document.getElementById('restart');
    const messageDiv = document.getElementById('message');
    const optionsDiv = document.getElementById('options');

    messageDiv.textContent = Game Over  Final Score: ${score};
    restartBtn.style.display = 'block';
    optionsDiv.innerHTML = '';
}

// Event listener for restart button
document.getElementById('restart').addEventListener('click', startGame);

// Start the game initially
startGame();