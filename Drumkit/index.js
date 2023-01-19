    // Step 1: Create a variable to store the recorded sounds
    let recordedSounds = [];
    let isRecording = false;
    
    // Step 2: Add a "Start Recording" button to the UI
    let startRecordingBtn = document.createElement("button");
    startRecordingBtn.innerHTML = "Start Recording";
    document.body.appendChild(startRecordingBtn);
    
    // Step 3: Add event listener for the "Start Recording" button
    startRecordingBtn.addEventListener("click", function() {
      isRecording = true;
    });
    
    // Step 4: Add a "Stop Recording" button to the UI
    let stopRecordingBtn = document.createElement("button");
    stopRecordingBtn.innerHTML = "Stop Recording";
    document.body.appendChild(stopRecordingBtn);
    
    // Step 5: Add event listener for the "Stop Recording" button
    stopRecordingBtn.addEventListener("click", function() {
      isRecording = false;
    });
    
    // Step 6: Add a "Play Recording" button to the UI
    let playRecordingBtn = document.createElement("button");
    playRecordingBtn.innerHTML = "Play Recording";
    document.body.appendChild(playRecordingBtn);
    
    // Step 7: Add event listener for the "Play Recording" button
    playRecordingBtn.addEventListener("click", function() {
      recordedSounds.forEach(sound => {
        new Audio(sound).play();
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
            new Audio('sounds/kick-bass.mp3').play();
            break
        case 'l':
            new Audio('sounds/crash.mp3').play();
            break

        default:
        console.log(this)

        if (isRecording) {
            recordedSounds.push(`sounds/${clickedButton}.mp3`);
          }

          if (isRecording) {
            recordedSounds.push(`sounds/${keyPressed}.mp3`);
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
    if (isRecording) {
        recordedSounds.push(`sounds/${clickedButton}.mp3`);
      }
      
      if (isRecording) {
        recordedSounds.push(`sounds/${keyPressed}.mp3`);
      }
}

