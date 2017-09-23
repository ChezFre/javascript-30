let countdown;

const buttons     = document.querySelectorAll('[data-time]')
const endTimeLeft = document.querySelector('.display__time-left');
const endTime     = document.querySelector('.display__end-time');
const form        = document.querySelector('#custom');

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    
    clearInterval(countdown);
    displayEndTime(then);

    function runTimer() {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if( secondsLeft < 0) {
            return clearInterval(countdown);
        }
        
        displayTimeLeft(secondsLeft);
    }

    countdown = setInterval(runTimer, 1000);
    runTimer();
}

function padLeft(v) {
    if( v.toString().length < 2 )
        return `0${v}`;
    return v;
}

function displayTimeLeft(seconds) {
    const m = Math.floor( seconds / 60 );
    const s = Math.floor( seconds % 60 );

    endTimeLeft.textContent = `${padLeft(m)}:${padLeft(s)}`;
}

function displayEndTime(time) {
    const end = new Date(time);

    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `${padLeft(hour%12)}:${padLeft(minutes)}`;
}

function addCustomTimer(e) {
    e.preventDefault();

    if( isNaN(this.minutes.value) )
        return this.minutes.value = '';

    timer(this.minutes.value * 60);
    return this.minutes.value = '';
}

buttons.forEach( button => button.addEventListener('click', (e) => timer(e.currentTarget.dataset.time)) );
form.addEventListener('submit', addCustomTimer);