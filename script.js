// Select elements
const title = document.querySelector('.title');
const timer = document.querySelector('.timer');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
const switchTheme = document.querySelector('.theme-toggle');

// Sound effects
const workSound = new Audio('./assets/work.mp3');
const shortBreakSound = new Audio('./assets/short-break.mp3');
const longBreakSound = new Audio('./assets/long-break.mp3');

let interval;
let timeRemaining;
let isPaused = false;
let cycleCount = 0;
const workTime = 25 * 60;
const shortBreakTime = 5 * 60;
const longBreakTime = 20 * 60;
const cyclesBeforeLongBreak = 4;

switchTheme.addEventListener('click', function() {
    document.body.classList.toggle('dark');
});

start.addEventListener('click', function() {
    if (!interval) {
        startWork();
        start.disabled = true; // Disable the start button
        pause.disabled = false; // Enable the pause button
    }
});

pause.addEventListener('click', function() {
    isPaused = !isPaused;
    pause.textContent = isPaused ? "Resume" : "Pause"; // Toggle the button text
});

reset.addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
    cycleCount = 0;
    timeRemaining = workTime;
    timer.textContent = formatTime(workTime);
    title.textContent = "Pomodoro Timer";
    isPaused = false;
    start.disabled = false; // Enable the start button
    pause.disabled = true; // Disable the pause button
    pause.textContent = "Pause"; // Reset the pause button text
});

function startWork() {
    timeRemaining = workTime;
    title.textContent = "Work";
    workSound.play();
    interval = setInterval(updateTimer, 1000);
}

function startBreak() {
    if (cycleCount < cyclesBeforeLongBreak) {
        timeRemaining = shortBreakTime;
        title.textContent = "Short Break";
        shortBreakSound.play();
    } else {
        timeRemaining = longBreakTime;
        title.textContent = "Long Break";
        longBreakSound.play();
    }
    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!isPaused) {
        if (timeRemaining <= 0) {
            clearInterval(interval);
            cycleCount++;
            if (title.textContent === "Work") {
                if (cycleCount < cyclesBeforeLongBreak) {
                    startBreak();
                } else {
                    startBreak();
                    cycleCount = 0;
                }
            } else {
                startWork();
            }
            return;
        }
        timeRemaining--;
        timer.textContent = formatTime(timeRemaining);
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = `0${remainingSeconds}`;
    }

    return `${minutes}:${remainingSeconds}`;
}

// Initialize the timer display
reset.click();