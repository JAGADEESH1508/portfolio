let display = document.querySelector('.display');
let startbtn = document.getElementById('startbtn');
let stopbtn = document.getElementById('stopbtn');
let resetbtn = document.getElementById('resetbtn');

let mseconds = 0;
let seconds = 0;
let minutes = 0;

let timer;

startbtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'green';
    if (timer != null) {
        clearInterval(timer);
    }
    timer = setInterval(startTimer, 10);
});

stopbtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'red';
    clearInterval(timer);
});

resetbtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'blue';
    clearInterval(timer);
    display.innerHTML = '00 : 00 : 00';
    mseconds = seconds = minutes = 0;
});

function startTimer() {
    mseconds++;
    if (mseconds == 100) {
        mseconds = 0;
        seconds++;
        if (seconds == 60) {  // Corrected seconds limit to 60
            seconds = 0;
            minutes++;
        }
    }

    let minutesString = minutes < 10 ? `0${minutes}` : minutes;
    let secondsString = seconds < 10 ? `0${seconds}` : seconds;
    let msecondsString = mseconds < 10 ? `0${mseconds}` : mseconds;

    display.innerHTML = `${minutesString} : ${secondsString} : ${msecondsString}`;
}
