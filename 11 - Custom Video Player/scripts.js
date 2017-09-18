//

const player      = document.querySelector('.player');
const video       = player.querySelector('.viewer');
const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle      = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges      = player.querySelectorAll('.player__slider');

let mousedown     = false;

//

function togglePlay(e) {
    if( video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton(e) {
    toggle.textContent = (this.paused) ? "►" : '❚❚'
}

function onRangeChange(e) {
    video[this.name] = this.value;
}

function skipVideo(e) {
    video.currentTime += parseFloat(this.dataset.skip);
}

function onTimeUpdate(e) {
    let progress = video.currentTime / video.duration * 100;
    
    progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e) {
    const maxWidth = parseInt(window.getComputedStyle(progress).width);
    const offset   = e.layerX / maxWidth;

    video.currentTime = video.duration * offset;
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', onTimeUpdate);

toggle.addEventListener('click', togglePlay);

progress.addEventListener('click', scrub);

document.documentElement.addEventListener('mousemove', (e) => {
    return mousedown && scrub(e);
});

progress.addEventListener('mousedown', () => mousedown = true);
document.documentElement.addEventListener('mouseup', () => mousedown = false);

skipButtons.forEach( skipButton => skipButton.addEventListener('click', skipVideo) );

ranges.forEach( range => {
    range.addEventListener('input', onRangeChange);

    range.value = video[range.name];
});


onTimeUpdate();