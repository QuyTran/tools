const allWords = [
"mèo",
"chó",
"voi",
"hươu",
"hổ",
"sư tử",
"gấu",
"khỉ",
"chuột",
"thỏ",
"cáo",
"ngựa",
"bò",
"trâu",
"dê",
"cừu",
"lợn",
"chim sẻ",
"chim én",
"chim bồ câu",
"chim cú",
"chim đại bàng",
"chim cánh cụt",
"gà",
"vịt",
"ngan",
"cá chép",
"cá rô",
"cá trê",
"cá hồi",
"cá mập",
"cá heo",
"rắn",
"rùa",
"cá sấu",
"ong",
"bướm",
"kiến",
"muỗi",
"ruồi",
"mực",
"bạch tuộc",
"cua",
"ốc",
"táo",
"cam",
"quýt",
"bưởi",
"xoài",
"ổi",
"chuối",
"mít",
"nhãn",
"vải",
"gỗ sồi",
"gỗ thông",
"gỗ trắc",
"gỗ lim",
"hoa hồng",
"hoa lan",
"hoa cúc",
"hoa hướng dương",
"cây mai",
"cây đào",
"cây tùng",
"tre",
"trúc",
"cỏ",
"lúa",
"ngô",
"tôm",
"cua",
"mực",
"ốc",
"cá",
"thịt bò",
"thịt lợn",
"thịt gà",
"thịt vịt",
"cà chua",
"cà rốt",
"khoai tây",
"bắp cải",
"xà lách",
"dưa chuột",
"hành tây",
"tỏi",
"đậu phộng",
"hạt điều",
"hạt dẻ",
"bánh mì",
"bánh ngọt",
"mì tôm",
"cơm",
"phở",
"bún",
"bánh xèo",
"nước lọc",
"nước ngọt",
"cà phê",
];

let currentWordIndex = 0;
let score = 0;
let words = [];
let timer;
let timeLeft = 15; // 15 seconds countdown

const card = document.getElementById('card');
const startBtn = document.getElementById('startBtn');
const correctBtn = document.getElementById('correctBtn');
const incorrectBtn = document.getElementById('incorrectBtn');
const scoreDisplay = document.getElementById('score');

// Create timer display and append it to the container
const timerDisplay = document.createElement('div');
timerDisplay.className = 'timer';
document.querySelector('.container').appendChild(timerDisplay); // Ensure it is appended to the container

startBtn.addEventListener('click', startGame);
correctBtn.addEventListener('click', correctGuess);
incorrectBtn.addEventListener('click', incorrectGuess);

function startGame() {
    currentWordIndex = 0;
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    card.classList.remove('shake');

    // Show the correct and incorrect buttons
    correctBtn.style.display = 'inline-block';
    incorrectBtn.style.display = 'inline-block';

    // Disable the start button during the game
    startBtn.disabled = true;

    // Randomly select 10 words from the word list
    words = selectRandomWords(allWords, 10);
    
    displayNextWord();
}

function selectRandomWords(wordList, count) {
    const shuffled = wordList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayNextWord() {
    if (currentWordIndex < words.length) {
        card.textContent = words[currentWordIndex];
        card.classList.remove('shake');
        startTimer();
    } else {
        card.textContent = "Game Over! Final Score: " + score;
        disableButtons();
        clearInterval(timer); // Stop the timer
    }
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    clearInterval(timer);

    // Update countdown every second
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;

        // If time reaches 0, move to the next word
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentWordIndex++;
            displayNextWord();
        }
    }, 1000);
}

function correctGuess() {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    clearInterval(timer); // Stop the timer
    currentWordIndex++;
    displayNextWord();
}

function incorrectGuess() {
    clearInterval(timer); // Stop the timer
    currentWordIndex++;
    displayNextWord();
}

function disableButtons() {
    // Hide the correct and incorrect buttons at the end of the game
    correctBtn.style.display = 'none';
    incorrectBtn.style.display = 'none';
    startBtn.disabled = false; // Allow starting a new game
}