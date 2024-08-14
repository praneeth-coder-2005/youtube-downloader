function downloadVideo() {
    const url = document.getElementById('youtubeUrl').value;
    const status = document.getElementById('status');

    if (!url) {
        status.textContent = "Please enter a valid YouTube URL.";
        return;
    }

    status.textContent = "Processing...";

    // Mocking the API request for demonstration purposes
    // Replace this with actual API call or backend logic
    setTimeout(() => {
        status.innerHTML = `Download ready: <a href="https://fakeurl.com/download?video=${encodeURIComponent(url)}" target="_blank">Click here to download</a>`;
    }, 2000);
}
