
    let recordedSounds = [];
    let isRecording = false;
    

    let startRecordingBtn = document.createElement("button");
    startRecordingBtn.innerHTML = "Start Recording";
    document.body.appendChild(startRecordingBtn);
    

    startRecordingBtn.addEventListener("click", function() {
      recordedSounds = [];
        isRecording = true;
    });
    
    
    let stopRecordingBtn = document.createElement("button");
    stopRecordingBtn.innerHTML = "Stop Recording";
    document.body.appendChild(stopRecordingBtn);
    

    stopRecordingBtn.addEventListener("click", function() {
        console.log(recordedSounds);
      isRecording = false;
    });
    

    let playRecordingBtn = document.createElement("button");
    playRecordingBtn.innerHTML = "Play Recording";
    document.body.appendChild(playRecordingBtn);
    

    playRecordingBtn.addEventListener("click", function() {
        recordedSounds.forEach(function (sound, index) {
          setTimeout(function () {
              new Audio(sound).play();
              console.log(sound)
          }, index * 500);
        });
      });
ndrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < ndrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function (e) {
     
        console.log(e)
        var clickedButton = this.textContent;
        console.log(clickedButton)
        selectedButton(clickedButton)
        animateButton(clickedButton)
    });
}


document.addEventListener("keydown", function(event) {
    var keyPressed = event.key.toLowerCase();
    console.log(keyPressed);
    selectedButton(keyPressed);
    animateButton(keyPressed)
})

function selectedButton(buttonX)
{
    sound = null;
    switch (buttonX) {
        case 'w':
            sound = 'sounds/tom-1.mp3';
            break;
        case 'a':
            sound = 'sounds/tom-2.mp3';
            break
        case 's':
            sound = 'sounds/tom-3.mp3';
            break
        case 'd':
            sound = 'sounds/tom-4.mp3';
            break
        case 'j':
            sound = 'sounds/snare.mp3';
            break
        case 'k':
            sound = 'sounds/kick-bass.mp3';
            break
        case 'l':
            sound = 'sounds/crash.mp3';
            break

        default:
             console.log(this)
    }
    console.log(sound)
    if (sound != null){
        new Audio(sound).play();

        if (isRecording) {
            recordedSounds.push(sound);
            console.log(recordedSounds);
        }
    }
}

function animateButton(key)
{
    var activeKey = document.querySelector("." + key);
    activeKey.classList.add("pressed");
    activeKey.classList.add("color");
    setTimeout(function (){
        activeKey.classList.remove("pressed")
        activeKey.classList.remove("color")

    }, 500);
}

