const covers = [
    document.getElementById("album-cover"),
    document.getElementById("album-cover1"),
    document.getElementById("album-cover2"),
    document.getElementById("album-cover3")
];

covers.forEach(cover => {
    cover.addEventListener("click", () => {
        // Find the details element (tracklist) in the same box
        const details = cover.closest(".box").querySelector("details");
        // Toggle the open state
        details.open = !details.open;
    });
});