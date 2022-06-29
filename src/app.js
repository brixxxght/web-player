import { songs } from './songs.js';


console.log(songs)

let currentSongIndex = 0;
const music = document.querySelector('#audio');
const seekBar = document.querySelector('.song-slider__seek-bar');
const songTitle = document.querySelector('.song-title');
const songArtistName = document.querySelector('.song-artist');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');
const songCover = document.querySelector('.song-cover');

const skipBackBtn = document.querySelector('.btn-skip-backward');
const skipForwardBtn = document.querySelector('.btn-skip-forward');
const playBtn = document.querySelector('.play-btn');
let currentMusic = 0;


playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause')
})

// setup music
// let currentSong = setMusic()
const setMusic = (index) => {
    let song = songs[index];
    songArtistName.innerHTML = song.name;
    songTitle.innerHTML = song.title;
    songCover.style.backgroundImage = `url('/${song.cover}')`;

    music.src = song.path;


    setTimeout(() => {
        seekBar.max = music.duration;
        songDuration.innerHTML = formatTime(music.duration);
        // console.log(music.duration);
    }, 300);

}
setMusic(currentMusic)

// format music duration
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10  && min === NaN) {
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if (sec < 10 && sec === NaN) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}


//seekbar
setInterval(()=>{
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500)


//jump timeline
seekBar.addEventListener('change', ()=> {
    music.currentTime = seekBar.value;
})


//skip forward button
skipForwardBtn.addEventListener('click', ()=>{
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    }else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();

})

// skip backward button 

skipBackBtn.addEventListener('click', ()=> {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    }else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})


//play music on skip

const playMusic = ()=>{
    music.play();
    playBtn.classList.remove('pause');
}

// loop function

/**
 * if(Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
 * skipForwardBtn.click();
 * }
 */