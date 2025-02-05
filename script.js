// Add interactivity to the scroll wheel buttons
document.getElementById('about').addEventListener('click', () => {
  document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('projects').addEventListener('click', () => {
  document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' });
});

// Play/Pause button for fun
const playPauseButton = document.getElementById('play-pause');
let isPlaying = false;

playPauseButton.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
});