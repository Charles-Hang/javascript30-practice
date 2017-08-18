//没什么技巧，多写多练
const video = document.getElementsByClassName('player__video')[0];
const buttons = document.querySelectorAll('.player__button');
const toggle = document.querySelector('.toggle');
const sliders = document.querySelectorAll('.player__slider');
const progress = document.getElementsByClassName('progress')[0];

function toggleIcon() {
	this.paused ? toggle.innerHTML = '►' : toggle.innerHTML = '❚ ❚';
}

function handleProgress(e) {
	video.currentTime = e.layerX / progress.offsetWidth * video.duration;
}

let mousedown = false;

buttons.forEach(button => {
	button.addEventListener('click', function(e) {
		if (this.classList.contains('toggle')) {
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}
		} else {
			video.currentTime += parseFloat(this.dataset.skip);
		}
	});
});

sliders.forEach(slider => {
	slider.addEventListener('input', function(e) {
		console.dir(e);
		video[this.name] = this.value;
	});
});

progress.addEventListener('click', handleProgress);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && handleProgress(e));

video.addEventListener('timeupdate', function(e) {
	progress.firstElementChild.style.flexBasis = video.currentTime / video.duration * 100 + '%';
});
video.addEventListener('pause', toggleIcon);
video.addEventListener('play', toggleIcon);
video.addEventListener('click', function() {
	this.paused ? this.play() : this.pause();
});