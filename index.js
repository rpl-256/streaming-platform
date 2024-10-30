const musicList = document.getElementById('musicList');
const artistList = document.getElementById('artistList');
const genreList = document.getElementById('genreList');
const playlistList = document.getElementById('playlistList');
const songLyrics = document.getElementById('songLyrics');
const newReleases = document.getElementById('newReleases');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const contactBtn = document.getElementById('contactBtn');
const contactForm = document.getElementById('contactForm');
const signupForm = document.getElementById('signupForm');
const showLoginLink = document.getElementById('showLogin');
const loginContainer = document.getElementById('loginContainer');
const submitLogin = document.getElementById('submitLogin');

let musicFiles = [];

// Real music data with covers and new releases
const artistsWithSongs = {
    "The Weeknd": {
        songs: [
            { title: "Blinding Lights", lyrics: "I've been tryna call..." },
            { title: "Save Your Tears", lyrics: "I don't know why I run away..." }
        ],
        cover: "https://upload.wikimedia.org/wikipedia/en/1/14/The_Weeknd_-_After_Hours.png"
    },
    "Dua Lipa": {
        songs: [
            { title: "Levitating", lyrics: "You want me, I want you, baby..." },
            { title: "Don't Start Now", lyrics: "If you don’t wanna see me..." }
        ],
        cover: "https://upload.wikimedia.org/wikipedia/en/1/1a/Dua_Lipa_-_Future_Nostalgia.png"
    },
    "Ed Sheeran": {
        songs: [
            { title: "Shape of You", lyrics: "The club isn't the best place..." },
            { title: "Perfect", lyrics: "I found a love for me..." }
        ],
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9e/Ed_Sheeran_-_Divide.png"
    }
};

// New releases data
const newReleasesData = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: "https://upload.wikimedia.org/wikipedia/en/1/14/The_Weeknd_-_After_Hours.png"
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        cover: "https://upload.wikimedia.org/wikipedia/en/1/1a/Dua_Lipa_-_Future_Nostalgia.png"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9e/Ed_Sheeran_-_Divide.png"
    }
];

// Function to render new releases on homepage
function renderNewReleases() {
    newReleases.innerHTML = newReleasesData.map(release => `
        <div class="release-item">
            <img src="${release.cover}" alt="${release.title} Cover">
            <h4>${release.title}</h4>
            <p>${release.artist}</p>
        </div>
    `).join('');
}

// Populate artists and songs
for (const artist in artistsWithSongs) {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${artistsWithSongs[artist].cover}" alt="${artist} Cover" class="artist-cover">
        ${artist}
    `;
    li.onclick = () => showSongsAndLyrics(artist);
    artistList.appendChild(li);
}

// Show songs and lyrics for a specific artist
function showSongsAndLyrics(artist) {
    const songs = artistsWithSongs[artist].songs;
    songLyrics.innerHTML = `
        <h5>Songs by ${artist}</h5>
        <ul>${songs.map(song => `<li><strong>${song.title}</strong>: ${song.lyrics}</li>`).join('')}</ul>
    `;
}

function init() {
    renderNewReleases();
}

// Initialize the page
init();

// Populate playlists (example)
const playlists = {
    "Top Hits": [
        { title: "Blinding Lights", artist: "The Weeknd" },
        { title: "Levitating", artist: "Dua Lipa" },
        { title: "Shape of You", artist: "Ed Sheeran" }
    ],
    "Chill Vibes": [
        { title: "Save Your Tears", artist: "The Weeknd" },
        { title: "Don't Start Now", artist: "Dua Lipa" }
    ],
    "Workout Mix": [
        { title: "Perfect", artist: "Ed Sheeran" }
    ]
};

// Populate playlists
for (const playlist in playlists) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${playlist}</strong>: ${playlists[playlist].map(song => `${song.title} by ${song.artist}`).join(', ')}`;
    playlistList.appendChild(li);
}

exampleGenres.forEach(genre => {
    const li = document.createElement('li');
    li.textContent = genre;
    genreList.appendChild(li);
});

uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        musicFiles.push({ name: file.name, url: url });
        updateMusicList();
        fileInput.value = '';
    }
});

contactBtn.addEventListener('click', () => {
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    document.getElementById('contact').style.display = 'block';
});

showLoginLink.addEventListener('click', () => {
    loginContainer.style.display = loginContainer.style.display === 'none' ? 'block' : 'none';
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert(`Message Sent! \nName: ${document.getElementById('contactName').value} \nEmail: ${document.getElementById('contactEmail').value} \nMessage: ${document.getElementById('contactMessage').value}`);
    contactForm.reset();
});

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert(`Welcome, ${document.getElementById('signupUsername').value}! You have signed up successfully.`);
    signupForm.reset();
});

// Update music list
function updateMusicList() {
    musicList.innerHTML = musicFiles.map(file => `
        <div class="music-item">
            <img src="https://via.placeholder.com/50" alt="Cover" class="cover-placeholder">
            ${file.name}
            <audio controls>
                <source src="${file.url}" type="audio/mpeg">
                Your browser does not support the audio tag.
            </audio>
        </div>
    `).join('');
}
