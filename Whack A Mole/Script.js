let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let countDown = 30;
let countDownInterval;

let isGameRunning = false;



window.onload= function(){
  setGame();
}

function setGame (){
  // set the grid for game board in html
  for(let i = 0; i<9;i++){
    let tile = document.createElement('div');
    tile.id = i.toString();
tile.addEventListener('click',selectTile);

    document.getElementById('board').appendChild(tile);
  }
  // setInterval(setMole,2000);
  // setInterval(setPlant,4000);
};

function getRandomTile (){
  let num = Math.floor(Math.random()*9);
  return num.toString();
}
 

function setMole (){
  
  if(gameOver){
    return;
  }
  
  if(currentMoleTile){
    currentMoleTile.innerHTML = "";
    currentMoleTile.classList.remove('clicked')
  }

  let mole = document.createElement('img');
  mole.src="./monty-mole.png";

  let num =  getRandomTile ();

  if(currentPlantTile &&currentPlantTile.id==num){
    return;
  }

  currentMoleTile=document.getElementById(num);
  currentMoleTile.appendChild(mole);
};



function setPlant (){
  if(gameOver){
    return;
  }

  if(currentPlantTile){
    currentPlantTile.innerHTML="";
    currentPlantTile.classList.remove('clicked')
  }

  let plant = document.createElement('img');
  plant.src="./piranha-plant.png";

  let num = getRandomTile();

  if(currentMoleTile &&currentMoleTile.id==num){
    return;
  }
  currentPlantTile=document.getElementById(num);
  currentPlantTile.appendChild(plant);
};


function selectTile (){

  
  
  if (gameOver || this.classList.contains("clicked")) {
    return; // Ignore if already clicked
  }


  this.classList.add("clicked");  
  
  
  if(gameOver){
    return;
  }

  if(this==currentMoleTile){
    this.disabled = true;
    score += 10;
    document.getElementById('Score').innerText=score.toString(); // update score 
  }

  else if (this==currentPlantTile) {
    document.getElementById('Score').innerText='Game Over!!'+score.toString();
    gameOver=true;
  }
};

function startGame() {
  if (!isGameRunning) {
    // countDown();
    isGameRunning = true;
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
    countDown = 30;
    document.getElementById('Timer').innerText="Time Left "+ countDown;
    countDownInterval = setInterval(()=>{
      countDown --;
      document.getElementById('Timer').innerText="Time Left "+ countDown;

      if(countDown<=0){
        endGame();
      }
    },1000);

  }
};

function endGame () {
    gameOver = true;

  
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    clearInterval(countDownInterval);

    moleInterval = null;
  plantInterval = null;

  document.getElementById("Score").innerText = 'Time Up! Final Score: ' + score;
}


function resetGame () {
isGameRunning=false;
clearInterval(moleInterval);
clearInterval(plantInterval);
moleInterval = null;
plantInterval = null;

// Reset variables
score = 0;
gameOver = false;
currentMoleTile = null;
currentPlantTile = null;
countDown = 30;

document.getElementById("Score").innerText = "0";
document.getElementById('Timer').innerText="Time - Left : 30";
// Clear all tiles
let tiles = document.querySelectorAll("#board div");
tiles.forEach(tile => {
  tile.innerHTML = "";
  tile.classList.remove("clicked");

});
}



document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);
