import { searchTracks } from "./spotify.js"
searchTracks("Imagine Dragons").then(tracks => {
    console.log(tracks)
})

const tracksList = document.querySelector('.tracks-list');

let currentTracks = []
let currentIndex = 0

let isShuffle = false
let repeatMode = "off" // "one"

const renderTracks = (tracks) => {
    tracksList.innerHTML = '';

    tracks.forEach(track => {
        const div = document.createElement('div');
        div.classList.add('track');
        div.innerHTML = `
        <img src="${track.album.images[0].url}" width="50" />
        <div>
            <div>${track.name}</div>
            <div>${track.artists[0].name}</div>
            </div>`

            div.addEventListener('click', () => {
                currentIndex = currentTrack.findIndex(t => t.id === track.id)
                currentTrack = track;

                audio.pause();
                isPlaying = false;
                playBtn.textContent = '▶';

                renderPlayer()
            })

            if (currentTrack && currentTrack.id === track.id) {
                div.classList.add('active')
            }

            if (!track.preview_url) {
                div.classList.add("disabled")
            }

            tracksList.appendChild(div);
    })
    }

const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim()

    if (!query) return

    const tracks = await searchTracks(query)

    currentTracks = tracks
    currentIndex = 0

    renderTracks(tracks)
})

let currentTrack = null

const playerImg = document.querySelector('.player-img');
const playerTitle = document.querySelector('.player-title');
const playerArtist = document.querySelector('.player-artist');
const playBtn = document.querySelector('.play-btn');

const renderPlayer = () => {
    if (!currentTrack) return;

    playerImg.src = currentTrack.album.images[0].url;
    playerTitle.textContent = currentTrack.name;
    playerArtist.textContent = currentTrack.artists[0].name;

    if (currentTrack.preview_url) {
        audio.src = currentTrack.preview_url
    } else {
        audio.src = '';
    }

    audio.play()
    isPlaying = true;
    playBtn.textContent = '⏸';
}

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }

    isPlaying = !isPlaying;

    playBtn.textContent = isPlaying ? '⏸' : '▶';
})

let audio = new Audio();

audio.addEventListener('ended', () => {
    nextTrack
    if (isPlaying = false) {
    playBtn.textContent = '▶'
    }
})

const nextTrack = () => {
    if (currentTracks.length === 0) return

    if (repeatMode === "one") {
        renderPlayer()
        return
    }

    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * currentTracks.length)
    } else {
        currentIndex++
    }
    currentIndex = (currentIndex + 1) % currentTracks.length
    currentTrack = currentTracks[currentIndex] 

    renderPlayer()
}

const prevTrack = () => {
    if (currentTracks.length === 0) return

    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * currentTracks.length)
    } else {
        currentIndex--
    }

    if (currentIndex < 0) {
        currentIndex = repeatMode === "one" ? currentTracks.length - 1 : 0
    }

    currentIndex = (currentIndex - 1 + currentTracks.length) % currentTracks.length
    currentTrack = currentTracks[currentIndex] 

    renderPlayer()
}

const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progressPercent + '%';

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0")

    return `${minutes}:${seconds}`
}

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth
    const clickX = e.offsetX

    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
})

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const shuffleBtn = document.querySelector('.shuffle-btn');
const repeatBtn = document.querySelector('.repeat-btn');

nextBtn.addEventListener('click', nextTrack);

prevBtn.addEventListener('click', prevTrack);

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle
    shuffleBtn.style.opacity = isShuffle ? "1" : "0.5"
});

repeatBtn.addEventListener('click', () => {
    if (repeatMode === "off") repeatMode = "one"
    else repeatMode = "off"

    repeatBtn.textContent = repeatMode === "one" ? "🔂" : "🔁"

    repeatBtn.style.opacity = "off" ? "0.5" : "1"
});