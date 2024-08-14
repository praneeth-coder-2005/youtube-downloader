const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.handler = async (event) => {
    const videoUrl = event.queryStringParameters.url;

    if (!videoUrl) {
        return {
            statusCode: 400,
            body: 'No URL provided',
        };
    }

    const downloadPath = path.join('/tmp', 'video.mp4');  // Netlify functions can use /tmp for temporary files

    return new Promise((resolve, reject) => {
        exec(`yt-dlp -o ${downloadPath} ${videoUrl}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return resolve({
                    statusCode: 500,
                    body: `Error processing the video: ${stderr}`,
                });
            }

            const fileStream = fs.createReadStream(downloadPath);
            resolve({
                statusCode: 200,
                headers: {
                    'Content-Type': 'video/mp4',
                    'Content-Disposition': 'attachment; filename="video.mp4"',
                },
                body: fileStream,
            });
        });
    });
};
