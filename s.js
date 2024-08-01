document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress');
    const volumeControl = document.getElementById('volume');
    const playlistElement = document.getElementById('playlist');
    const audioElement = document.getElementById('audio');
  
    let currentSongIndex = 0;
    const songs = [
      { title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', url: 'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3' },
      { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3' },
      { title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3' },
      { title: 'Bad Guy', artist: 'Billie Eilish', album: 'When We All Fall Asleep, Where Do We Go?', url: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3' },
      { title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', url: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3' }
    ];
  
    function loadPlaylist() {
      playlistElement.innerHTML = '';
      songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'song';
        songElement.innerHTML = `<span>${song.title} - ${song.album}</span><span>${song.artist}</span>`;
        songElement.addEventListener('click', () => playSong(index));
        playlistElement.appendChild(songElement);
      });
    }
  
    function playSong(index) {
      currentSongIndex = index;
      const song = songs[currentSongIndex];
      audioElement.src = song.url;
      audioElement.play();
      playButton.textContent = 'Pause';
    }
  
    playButton.addEventListener('click', () => {
      if (audioElement.paused) {
        audioElement.play();
        playButton.textContent = 'Pause';
      } else {
        audioElement.pause();
        playButton.textContent = 'Play';
      }
    });
  
    prevButton.addEventListener('click', () => {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      playSong(currentSongIndex);
    });
  
    nextButton.addEventListener('click', () => {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      playSong(currentSongIndex);
    });
  
    audioElement.addEventListener('timeupdate', () => {
      progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    });
  
    progressBar.addEventListener('input', () => {
      audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
    });
  
    volumeControl.addEventListener('input', () => {
      audioElement.volume = volumeControl.value;
    });
  
    loadPlaylist();
  });
  