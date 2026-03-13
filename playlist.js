const covers = [
    document.getElementById("album-cover"),
    document.getElementById("album-cover1"),
    document.getElementById("album-cover2"),
    document.getElementById("album-cover3")
];

const player = document.getElementById("player");
const customControls = document.getElementById("custom-controls");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentLi = null;

covers.forEach(cover => {
    cover.addEventListener("click", () => {
        const box = cover.closest(".box");
        const details = box.querySelector("details");
        // Toggle the open state
        details.open = !details.open;
        // Move the player and controls to this box, right after the h4
        const h4 = box.querySelector("h4");
        h4.insertAdjacentElement("afterend", player);
        h4.insertAdjacentElement("afterend", customControls);
        // Show them
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
        player.src = src;
        player.play();
    });
});

document.querySelectorAll(".tracklist li").forEach(li => {
    li.addEventListener("click", () => {

        document.querySelectorAll(".tracklsit li")
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

// Previous button
prevBtn.addEventListener("click", () => {
    if (!currentLi) return;
    const prevLi = currentLi.previousElementSibling;
    if (prevLi && prevLi.dataset.src) {
        prevLi.click();  // simulate click to play
    }
});

document.querySelectorAll("details").forEach(details => {
    details.addEventListener("click", e => {
        if (e.target === details) {
            details.style.display = "none";  // hide the details element
        }
    });
});
