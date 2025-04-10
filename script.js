// Reference the <video> and the <source> elements
const video = document.getElementById('video'); 
const videoSource = document.getElementById('video-src');

// Reference other DOM elements
const videoList = document.getElementById("video-list");
const searchInput = document.getElementById('search-input');

// Create a copy of the original video playlist
const originalList = [...videos];

// Initialize variables to track the current video index and shuffle state
let currentVideoIndex = 0;
let isShuffle = false;
let shuffledVideos = [...originalList].reverse(); // Example of shuffled videos

// Function to update the video playlist displayed in the UI
function updatePlayList(playlist) {
    // Clear the HTML of the videoList element
    videoList.innerHTML = '';
    // Traverse over the playlist
    playlist.forEach((video, index) => {
        // For each video, create an <li> element
        const listItem = document.createElement('li');
        // Display the video title in the <li>
        listItem.textContent = video.title;
        listItem.dataset.index = index; // Store index as data attribute for reference
        // Append the <li> element to the videoList
        videoList.appendChild(listItem);
    });
}

// Function to update the UI with video information
function updateUI(currentIndex, playlist) {
    document.getElementById('video-title').textContent = playlist[currentIndex]["title"];
    document.getElementById('video-artist').textContent = playlist[currentIndex]["artist-name"];
}

// Function to play the current video
function playVideo(playlist, index) {
    currentVideoIndex = index; // Update the current video index
    video.pause();
    // Set the video source
    videoSource.src = playlist[index]["url"];
    // Load and play the video after setting the source
    video.load();
    video.play();
    // Update the UI with video information
    updateUI(index, playlist);
}

// Event delegation for video selection in the playlist
videoList.addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
        // Find the index of the list-item (video-title) clicked
        const index = parseInt(e.target.dataset.index, 10);
        // Call the playVideo() function with the appropriate list
        if (isShuffle) {
            playVideo(shuffledVideos, index);
        } else {
            playVideo(originalList, index);
        }
    }
});

// Initialize the playlist in the UI
updatePlayList(originalList);

// Function to move to the next video
function moveToNextVideo() {
    // Increase the current video index by 1
    currentVideoIndex += 1;

    // If the current video index becomes equal to the length of the playlist, set the index to 0
    if (currentVideoIndex >= (isShuffle ? shuffledVideos.length : originalList.length)) {
        currentVideoIndex = 0;
    }

    // Play the selected video, considering the shuffle state
    if (isShuffle) {
        playVideo(shuffledVideos, currentVideoIndex);
    } else {
        playVideo(originalList, currentVideoIndex);
    }
}

// Function to move to the previous video
function moveToPreviousVideo() {
    // Decrease the current video index by 1
    currentVideoIndex -= 1;

    // If the current video index becomes less than 0, set the index to the last video
    if (currentVideoIndex < 0) {
        currentVideoIndex = (isShuffle ? shuffledVideos.length : originalList.length) - 1;
    }

    // Play the selected video, considering the shuffle state
    if (isShuffle) {
        playVideo(shuffledVideos, currentVideoIndex);
    } else {
        playVideo(originalList, currentVideoIndex);
    }
}

// Event listeners for play, next, and previous buttons
document.getElementById('play-button').addEventListener('click', () => {
    playVideo(isShuffle ? shuffledVideos : originalList, currentVideoIndex);
});

document.getElementById('next-button').addEventListener('click', moveToNextVideo);
document.getElementById('prev-button').addEventListener('click', moveToPreviousVideo);
// Function to shuffle the array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
}

// Event listener for the Shuffle button
document.getElementById('shuffle-button').addEventListener('click', (event) => {
    isShuffle = !isShuffle;

    if (isShuffle) {
        event.target.textContent = "Click to Unshuffle";
        // Shuffle the playlist, update it, and play the first video
        shuffleArray(videos);
        updatePlayList(videos);
        currentvideoIndex = 0;
        playvideo(videos);
    } else {
        event.target.textContent = "Click to Shuffle";
        // Restore the original playlist, update it, and play the first video
        updatePlayList(originalList);
        currentvideoIndex = 0;
        playvideo(originalList);
    }
});

// Event listener to filter the playlist based on search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredvideos = originalList.filter((video) =>
        video.title.toLowerCase().includes(searchTerm)
    );
    // Update the displayed playlist with the filtered videos
    updatePlayList(filteredvideos);
    updateUI(currentvideoIndex, originalList);
});

// Initialize the playlist and UI with the original list
updatePlayList(originalList);
updateUI(currentvideoIndex, originalList);