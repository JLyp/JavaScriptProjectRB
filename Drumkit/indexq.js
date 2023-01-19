let chunks = [];
let recorder;

document.getElementById("start-recording").addEventListener("click", startRecording);
document.getElementById("stop-recording").addEventListener("click", stopRecording);
document.getElementById("play-audio").addEventListener("click", playAudio);

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
            chunks.push(e.data);
        }
        recorder.start();
    });
}

function stopRecording() {
    recorder.stop();
    const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    chunks = [];
    download(audioBlob, 'audio.ogg');
    const audioUrl = URL.createObjectURL(audioBlob);
    document.getElementById("audio-player").src = audioUrl;
}

function download(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function playAudio() {
    document.getElementById("audio-player").play();
}

ndrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < ndrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function (e) {
        var clickedButton = this.textContent;
        selectedButton(clickedButton);
        animateButton(clickedButton);
    });
}

// detecting keys pressed
document.addEventListener("keydown", function(event) {
    var keyPressed = event.key.toLowerCase();
    selectedButton(keyPressed);
    animateButton(keyPressed);
})

function selectedButton(buttonX)
{
    switch (buttonX) {
        case 'w':
            new Audio('sounds/tom-1.mp3').play();
            break;
        case 'a':
            new Audio('sounds/tom-2.mp3').play();
            break
        case 's':
            new Audio('sounds/tom-3.mp3').play();
            break
        case 'd':
            new Audio('sounds/tom-4.mp3').play();
            break
        case 'j':
            new Audio('sounds/snare.mp3').play();
            break
        case 'k':
            new Audio('sounds/Kick-bass.mp3').play();
            break
        case 'l':
            new Audio('sounds/crash.mp3').play();
            break

        default:
        console.log(this)
    }
}

function animateButton(key)
{
    var activeKey = document.querySelector("." + key);
    activeKey.classList.add("pressed");