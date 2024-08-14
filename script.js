function downloadVideo() {
    const url = document.getElementById('youtubeUrl').value;
    const status = document.getElementById('status');

    if (!url) {
        status.textContent = "Please enter a valid YouTube URL.";
        return;
    }

    status.textContent = "Processing...";

    fetch(`/.netlify/functions/youtube-download?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(blob => {
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            status.textContent = "Download ready!";
        })
        .catch(error => {
            status.textContent = `Error: ${error.message}`;
        });
}
