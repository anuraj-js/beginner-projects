const clock = document.querySelector('.clock');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const formatToggleBtn = document.querySelector('.format-toggle-btn');
let is12hrsFormat = true;

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function stringPadding(value) {
    return value.toString().padStart(2, '0');
}

function getPresentTime(now) {
    let rawHours = now.getHours();
    const presentTimeObj = {
        greetingMsg: rawHours < 12 ? 'Good Morning!' : (rawHours < 17 ? 'Good Afternoon!' : 'Good Evening!'),
        hours: stringPadding(is12hrsFormat ? (rawHours % 12 || 12) : rawHours),
        minutes: stringPadding(now.getMinutes()),
        seconds: stringPadding(now.getSeconds()),
        ampm: is12hrsFormat ? (rawHours < 12 ? 'AM' : 'PM') : ''
    }

    return presentTimeObj;
}

function getPresentDate(now) {
    const presentDateObj = {
        today: days[now.getDay()],
        dateNum: stringPadding(now.getDate()),
        month: months[now.getMonth()],
        year: now.getFullYear().toString()
    }

    return presentDateObj;
}

function renderClock(timeObj, dateObj) {
    const timeString = `${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds} ${timeObj.ampm}`;
    const dateString = `${dateObj.today}, ${dateObj.month} ${dateObj.dateNum},  ${dateObj.year}`;
    greeting.textContent = timeObj.greetingMsg;
    clock.textContent = timeString;
    date.textContent = dateString;
}

function updateClock() {
    const present = new Date();
    const presentTimeObj = getPresentTime(present);
    const presentDateObj = getPresentDate(present);
    renderClock(presentTimeObj, presentDateObj);
}


formatToggleBtn.addEventListener('click', () => {
    is12hrsFormat = !is12hrsFormat;
    formatToggleBtn.textContent = is12hrsFormat ? 'Switch to 24-Hour Format' : 'Switch to 12-Hour Format';

    updateClock();
})

updateClock();
setInterval(updateClock, 1000);



