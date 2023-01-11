
ndrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < ndrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function (e) {
        // this.style.color = "cyan";
        console.log(e)
        var clickedButton = this.textContent;
        console.log(clickedButton)
        selectedButton(clickedButton)
        animateButton(clickedButton)
    });
}

// detecting keys pressed
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