const hrsInput = document.getElementById('hrs-input');
const minsInput = document.getElementById('mins-input');
const secsInput = document.getElementById('secs-input');

const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');

const countdownTime = {
    hrs: 0,
    mins: 0,
    secs: 0
}

let intervalId = null;

const beep = new Audio('beep.mp3');

hrsInput.addEventListener('click', () => hrsInput.value = '');
minsInput.addEventListener('click', () => minsInput.value = '');
secsInput.addEventListener('click', () => secsInput.value = '');

hrsInput.addEventListener('input', () => countdownTime.hrs = Number(hrsInput.value) || 0);
minsInput.addEventListener('input', () => countdownTime.mins = Number(minsInput.value) || 0);
secsInput.addEventListener('input', () => countdownTime.secs = Number(secsInput.value) || 0);


function setInputsDisabled(state) {
    hrsInput.disabled = state;
    minsInput.disabled = state;
    secsInput.disabled = state;
}

function stringPadStart(value) {
    return String(value).padStart(2, '0');
}

function resetCountdown() {
    hrsInput.value = '';
    minsInput.value = '';
    secsInput.value = '';

    countdownTime.hrs = 0;
    countdownTime.mins = 0;
    countdownTime.secs = 0;

    clearInterval(intervalId);
    setInputsDisabled(false);
    intervalId = null;
}

function countdownLogic() {
    if (countdownTime.hrs > 23 || countdownTime.mins > 59 || countdownTime.secs > 59) {
        alert(
            'Invalid Time Input!\n\n' +

            'Please enter a valid time within these ranges:' +
            '\n• Hours: 0-23' +
            '\n• Minutes: 0-59' +
            '\n• Seconds: 0-59' 
        );

        resetCountdown();
        return;
    }

    if (countdownTime.hrs === 0 && countdownTime.mins === 0 && countdownTime.secs === 0) {
        clearInterval(intervalId);
        intervalId = null;
        setInputsDisabled(false);
        beep.play();
        return;
    } 

    if (countdownTime.secs > 0) {
        countdownTime.secs--;
    } else if (countdownTime.mins > 0 && countdownTime.secs === 0) {
        countdownTime.mins--;
        countdownTime.secs = 59;
    } else if (countdownTime.hrs > 0 && countdownTime.mins === 0 && countdownTime.secs === 0) {
        countdownTime.hrs--;
        countdownTime.mins = 59;
        countdownTime.secs = 59;
    }   
}

function displayCountdown() {
    countdownLogic();

    hrsInput.value = stringPadStart(countdownTime.hrs);
    minsInput.value = stringPadStart(countdownTime.mins);
    secsInput.value = stringPadStart(countdownTime.secs);
}

playBtn.addEventListener('click', () => {
    if (countdownTime.hrs === 0 && countdownTime.mins === 0 && countdownTime.secs === 0) return;
    setInputsDisabled(true);
    if (!intervalId) intervalId = setInterval(displayCountdown, 1000);
})

pauseBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
})

resetBtn.addEventListener('click', () => {
    resetCountdown();
})

setInputsDisabled(false);

