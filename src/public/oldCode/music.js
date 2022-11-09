let songs = [
    {title : "cali", path : "./audio/cali.mp3"},
    {title : "Homework", path : "./audio/Homework.mp3"},
    {title : "Hope", path : "./audio/Hope.mp3"},
    {title : "Ice", path : "./audio/Ice.mp3"},
    {title : "NightLight", path : "./audio/NightLight.mp3"},
    {title : "Pride", path : "./audio/Pride.mp3"},
    {title : "Pursuit", path : "./audio/Pursuit.mp3"},
    {title : "Thing", path : "./audio/Thing.mp3"},
    {title : "Trippin", path : "./audio/Trippin.mp3"},
    {title : "Warrior", path : "./audio/Warrior.mp3"},
]


let currentSongIndex = 0;


function incrementIndex() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
}

function decrementIndex() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
}