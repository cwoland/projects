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

const player = document.getElementById("player");
const customControls = document.getElementById("custom-controls");
const prevBtn = document.getElementById("prev-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");

const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const currentTrackTitle = document.getElementById("current-track-title");

const overlay = document.getElementById("overlay");
const frame = document.getElementById("modalFrame");

let currentLi = null;

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

        currentLi = li;  // track the current track
        currentTrackTitle.textContent = li.querySelector('.title', '.box').textContent;
        player.src = src;
        player.play();
    });
});

document.querySelectorAll(".tracklist li").forEach(li => {
    li.addEventListener("click", () => {

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
    if (player.paused) {
        player.play();
        pauseBtn.textContent = "⏸";
    } else {
        player.pause();
        pauseBtn.textContent = "▶️";
    }   
});

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
player.addEventListener("ended", playRandomTrack);

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

player.addEventListener("input", () => {
    player.currentTime = progressBar.value;
});

function openPage(page) {
    frame.src = page;
    overlay.style.display = "block";
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