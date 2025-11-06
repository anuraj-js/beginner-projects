const stopwatchDisplay = document.querySelector('.stopwatch-display');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const resetLapsBtn = document.querySelector('.reset-laps-btn');
const lapsDisplay = document.querySelector('.laps-display');
const lapsOverloadDisplay = document.querySelector('.laps-overload-display');

const stopwatch = {
    initialHour: 0,
    initialMinute: 0,
    initialSecond: 0,
    initialMilisecond: 0
}

const laps = [];
const lowercaseRomanNumerals = ['i','ii','iii','iv','v','vi','vii','viii','ix','x'];

let intervalId;

function stringPadding(value) {
    return String(value).padStart(2, '0');
}

function stopwatchDisplayValues() {
    return `${stringPadding(stopwatch.initialHour)} : ${stringPadding(stopwatch.initialMinute)} : ${stringPadding(stopwatch.initialSecond)} : ${String(stopwatch.initialMilisecond).padStart(3, '0')}`;
}

function stopwatchCalculation() {
    stopwatch.initialMilisecond += 10;
    if (stopwatch.initialMilisecond >= 1000) {
        stopwatch.initialMilisecond = 0;
        stopwatch.initialSecond++;
    }

    if (stopwatch.initialSecond >= 60) {
        stopwatch.initialSecond = 0;
        stopwatch.initialMinute++;
    }

    if (stopwatch.initialMinute >= 60) {
        stopwatch.initialMinute = 0;
        stopwatch.initialHour++;
    }
}

function stopwatchRender() {
    stopwatchCalculation();
    stopwatchDisplay.textContent = stopwatchDisplayValues();
}

function refreshStopwatch() {
    stopwatch.initialHour = 0;
    stopwatch.initialMinute= 0;
    stopwatch.initialSecond = 0;
    stopwatch.initialMilisecond = 0;
    stopwatchDisplay.textContent = '00 : 00 : 00 : 000';
}

playBtn.addEventListener('click', () => {
    if (!intervalId) {
        intervalId = setInterval(stopwatchRender, 10);
    }

    lapsOverloadDisplay.textContent = '';
}); 

pauseBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;

    laps.length = 0;
    lapsDisplay.innerHTML = '';
    lapsOverloadDisplay.textContent = '';
    lapBtn.classList.remove('lap-inactive');
    lapBtn.classList.add('btn');

    refreshStopwatch();
});

lapBtn.addEventListener('click', () => {
    if (stopwatch.initialHour === 0 && stopwatch.initialMinute === 0 && stopwatch.initialSecond === 0 && stopwatch.initialMilisecond === 0) {
        lapsOverloadDisplay.textContent = `Start the stopwatch before recording a lap!`;
        return;
    }

    if (laps.length >= 10) {
        lapsOverloadDisplay.innerHTML = `<strong>Maximum 10 laps reached.</strong> Tap 'Reset Laps' to add more.`;
        lapBtn.classList.add('lap-inactive');
        lapBtn.classList.remove('btn');
        return;
    } 

    laps.push(stopwatchDisplayValues());
    let lapsList = '';

    for (let i = 0; i < laps.length; i++) {
        const html = `<div><span>${lowercaseRomanNumerals[i]}.  </span><p>${laps[i]}</p></div>`;
        lapsList += html;
    }

    lapsDisplay.innerHTML = lapsList;
    lapsDisplay.scrollTop = lapsDisplay.scrollHeight;
})

resetLapsBtn.addEventListener('click', () => {
    laps.length = 0;
    lapsDisplay.innerHTML = '';
    lapsOverloadDisplay.textContent = '';
    lapBtn.classList.remove('lap-inactive');
    lapBtn.classList.add('btn');
})




