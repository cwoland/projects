const covers = [
    document.getElementById("album-cover0"),
    document.getElementById("album-cover01"),
    document.getElementById("album-cover02"),
    document.getElementById("album-cover03"),
    document.getElementById("album-cover04"),
    document.getElementById("album-cover"),
    document.getElementById("album-cover1"),
    document.getElementById("album-cover2"),
    document.getElementById("album-cover3")
];

const tracks = Array.from(document.querySelectorAll(".tracklist li"));
const artists = Array.from(document.querySelectorAll(".artist"));

const player = document.getElementById("player");
const customControls = document.getElementById("custom-controls");
const prevBtn = document.getElementById("prev-btn");
const pauseBtn = document.getElementById("pause-btn");
const playIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>`;
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");

const currentCover = document.getElementById("current-cover");

const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const trackTitle = document.getElementById("current-track-title");
const artistName = document.getElementById("current-artist-name");
const overlay = document.getElementById("overlay");
const frame = document.getElementById("modalFrame");

let hasStarted = false;

let currentLi = null;

let repeatMode = "off"; // off, all, one

covers.forEach(cover => {
    cover.addEventListener("click", () => {
        const box = cover.closest(".box");
        const details = box.querySelector("details");
        // Toggle the open state
        details.open = !details.open;
        // Show the player and controls
        player.style.display = "block";
        customControls.style.display = "block";
    });
});

// Play a track when its list item is clicked (requires `data-src` on the <li>)

document.querySelectorAll(".tracklist li").forEach(li => {
    li.addEventListener("click", () => {

        const src = li.dataset.src;
        if (!src) return;

        currentLi = li;

        // 🎵 ТРЕК
        trackTitle.textContent = li.querySelector(".title").textContent;

        // 👤 АРТИСТ (берём из альбома)
        const artist = li.closest(".box")
            .querySelector(".artist")
            .textContent;

        artistName.textContent = artist;

        const cover = li.closest(".box")
            .querySelector("img")
            .src;
            
        currentCover.src = cover;

        player.src = src;
        player.play();

        // active track
        document.querySelectorAll(".tracklist li")
            .forEach(t => t.classList.remove("active"));

        li.classList.add("active");

    });
});

// Next button
nextBtn.addEventListener("click", () => {
    if (!currentLi) return;
    const nextLi = currentLi.nextElementSibling;
    if (nextLi && nextLi.dataset.src) {
        nextLi.click();  // simulate click to play
    }
});

pauseBtn.addEventListener("click", () => {
    if (!currentLi) {
        playRandomTrack();
        return;
    }

    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

player.addEventListener("play", () => {
    pauseBtn.innerHTML = pauseIcon;
});

player.addEventListener("pause", () => {
    pauseBtn.innerHTML = playIcon;
});

function updateBtn () {
    pauseBtn.innerHTML = player.paused ? playIcon : pauseIcon;
}

// Previous button
prevBtn.addEventListener("click", () => {
    if (!currentLi) return;
    const prevLi = currentLi.previousElementSibling;
    if (prevLi && prevLi.dataset.src) {
        prevLi.click();  // simulate click to play
    }
});

function playRandomTrack () {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomTrack = tracks[randomIndex];
    randomTrack.click();
}

shuffleBtn.addEventListener("click", playRandomTrack);
player.addEventListener("ended", () => {
    if (repeatMode === "one") {
        player.currentTime = 0;
        player.play();
        return;
    }

    if (repeatMode === "all") {
        playRandomTrack();
        return;
    }

    if (currentLi) {
        const nextLi = currentLi.nextElementSibling;

        if (nextLi && nextLi.dataset.src) {
            nextLi.click();
        }
    }
});

repeatBtn.addEventListener("click", () => {
    if (repeatMode === "off") {
        repeatMode = "all";
    } else if (repeatMode === "all") {
        repeatMode = "one";
    } else {
        repeatMode = "off";
    }

    updateRepeatUI();
});

function updateRepeatUI() {
    if (repeatMode === "off") {
        repeatBtn.style.opacity = "0.5";
    }

    if (repeatMode === "all") {
        repeatBtn.style.opacity = "1";
    }

    if (repeatMode === "one") {
        repeatBtn.style.opacity = "1";
        repeatBtn.style.transfrom = "scale(1.2)";
        // You can also change the icon here to indicate "one" mode
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

return minutes + ":" + String(seconds).padStart(2, "0");
}

player.addEventListener("loadedmetadata", () => {
    progressBar.max = player.duration;
    durationEl.textContent = formatTime(player.duration);
});

player.addEventListener("timeupdate", () => {
    progressBar.value = player.currentTime;
    currentTimeEl.textContent = formatTime(player.currentTime);
});

progressBar.addEventListener("input", () => {
    player.currentTime = progressBar.value;
});

progressBar.addEventListener("mousedown", () => {
    player.pause();
});

progressBar.addEventListener("mouseup", () => {
    player.play();
});

player.addEventListener("ended", () => {
    pauseBtn.innerHTML = playIcon;
});

function openPage(page) {
    frame.src = page;
    overlay.style.display = "flex";
}

document.getElementById("openArtists").onclick = () => openPage("artists.html");
document.getElementById("openAlbums").onclick = () => openPage("playlist.html");
document.getElementById("openSongs").onclick = () => openPage("songs.html");
document.getElementById("openPlaylists").onclick = () => openPage("playmix.html");
document.getElementById("openGenres").onclick = () => openPage("genres.html");

overlay.addEventListener("click", (e) => {
    if (e.target === overlay){
        overlay.style.display = "none";
        frame.src = "";
    }
});
