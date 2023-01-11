

let ball= document.querySelector("#ball");                    
let container = document.getElementsByClassName("container")[0];
let holes = [];
let gameStart=false;
let score = 0;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;
window.addEventListener('deviceorientation', zmianaPolozenia)
let highScoreList = document.createElement('ul');               
highScoreList.innerText="Highscores:"
highScoreList.className="highScoreList";
container.appendChild(highScoreList);
let highscores = [];
refreshHighScore();

function start(){                                               
    gameStart=true;
    spawnHoles();                     
    MoveBall();                      
    console.log("game Started!")
    document.getElementById("start").hidden=true;
    counter = document.createElement('span');                 
    counter.classList.add("counter");
    counter.innerHTML="Score: "+score;
    container.appendChild(counter);
}
function restart(){                                
    gameStart=true;
    for(i=container.childElementCount;i>0;i--){    
        if(container.childNodes[i].nodeName=="DIV"){
            if(container.childNodes[i].id!=="ball"){
                container.removeChild(container.childNodes[i])
            }
        }
    }
    score = 0;
    counter.innerHTML="Score: "+score;          
    holes=[];
    posX = 20, posY = 20;
    spawnHoles();                   
    moveBall();                  
    console.log("game Started!")
    document.getElementById("restart").hidden=true;
}

function zmianaPolozenia(e){           
    console.log(e);
    speedX=e.gamma/45
    speedY=e.beta/45
}
function MoveBall(){                 
    
    if(posX+speedX<window.innerWidth-50 && posX+speedX>0){  
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if(posY+speedY<window.innerHeight-50 && posY+speedY>0){
        posY+=speedY;
        ball.style.top=posY+'px';        
    }
                                                   
    for(i=0;i<holes.length;i++) {
        if(posY<Math.floor(holes[i].style.top.slice(0,-2))+50&&posY>holes[i].style.top.slice(0,-2)){
            if(posX>holes[i].style.left.slice(0,-2)&&posX<Math.floor(holes[i].style.left.slice(0,-2))+50){
                if(holes[i].classList.contains("goodput")){
                    holes[i].classList.remove("goodput");
                    holes.forEach(e=>{if(e.classList.contains("tempput")){
                        e.classList.remove("tempput");
                        e.classList.add("put");
                    }})
                    holes[i].classList.add("tempput");
                    score++
                    counter.innerHTML="Score: "+score;
                    randomGoodHole(i);
                }
                else if(holes[i].classList.contains("put")){    
                gameStart=false;
                let yourScore = window.prompt("Uzyskałeś "+score+" punktów! Podaj swój nick.");
                highscores.push([score,yourScore]);
                refreshHighScore()
                document.getElementById("restart").hidden=false;
            }
        }
        console.log("omg"+i);
    }
    };
    if(gameStart==true){
        window.requestAnimationFrame(MoveBall)
    }
}
function spawnHoles(){                                 
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("put");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight-95)/2+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("put");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight)/2+window.innerHeight/2-100+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    checkHoles();
    randomGoodHole(1);
}
function checkHoles(){                                      
    for(i=0;i<holes.length-1;i++){                          
        for(j=i+1;j<holes.length;j++){
            if(holes[j].style.left.slice(0,-2)>holes[i].style.left.slice(0,-2)+75
            &&holes[j].style.top.slice(0,-2)>holes[i].style.top.slice(0,-2)+75){
                holes[j].style.top=holes[j].style.top.slice(0,-2)+50+'px';
                holes[j].style.left=holes[j].style.left.slice(0,-2)+50+'px';
            }
        }
    }
}
function randomGoodHole(i){                                
    let goodHole = Math.floor(Math.random()*holes.length);
    if(goodHole ==i&&i<holes.length){i++;}                 
    else{i--;}
    holes[goodHole].classList.remove("put");
    holes[goodHole].classList.add("goodput")

}                                                           
function refreshHighScore(){
    highscores.sort(sortScores);
    highscores.length=9;
    while (highScoreList.childNodes[1]) {
        highScoreList.removeChild(highScoreList.childNodes[1]);
    }
    highscores.forEach(e=>{                                
        let scoreList = document.createElement('li');
        scoreList.innerText=e[0]+" "+e[1];
        highScoreList.appendChild(scoreList);
        
    })
}
function sortScores(a, b) {                                
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}