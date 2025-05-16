let userScore = 0;
let computerScore = 0;

const round3 = document.querySelector("#round3");

const userScoreP =  document.querySelector("#user-score")
const computerScoreP = document.querySelector("#computer-score")

const Choices = document.querySelectorAll(".choice");
const msg  = document.querySelector("#msg");

const roundChoice = () =>{
    round3.addEventListener("click",()=>{
         console.log("clicked");

    });
};

const ComputerChoice=()=>{
      const options = ["rock","paper","scissors"];
     const randIdx = Math.floor(Math.random()*3);  
     return options[randIdx];
}; 

const drawGame = (userChoice,computerChoice) =>{
    console.log("Game Drawed")
    msg.innerText = " GAME DRAW!"
    msg.style.backgroundColor = "blue";
};

 
const showWInner = (userWin,userChoice,computerChoice) =>{
     if(userWin){
        userScore++;
        userScoreP.innerText=userScore;
        console.log("YOU WON");
        msg.innerText = ` YOU WON! ${userChoice} beats ${computerChoice}` ;
        msg.style.backgroundColor = "red";
        
     }
     else{
        computerScore++;
        computerScoreP.innerText = computerScore;
        msg.innerText= `YOU LOST! ${userChoice} beats ${computerChoice}`;
        console.log("LOST");
        msg.style.backgroundColor = "green";
     }
}


Choices.forEach((Choice) => {
Choice.addEventListener("click", ()=>{

const userChoice = Choice.getAttribute("id"); 
playGame(userChoice);
});
});

const playGame = (userChoice)=>{
console.log("user choice",userChoice);
const computerChoice = ComputerChoice();
console.log("computer Choice ",computerChoice);

if(userChoice===computerChoice){
    // draw
    drawGame(userChoice,computerChoice);
}
else  {
    let userWin = true;
    if(userChoice==="rock"){
        userWin=computerChoice==='paper'?false:true;
    }
    else if (userChoice==='paper'){
        userWin=computerChoice==="scissors"?false:true;
    }
    else{
      computerChoice==="rock"?false:true; 
    }
    showWInner(userWin,userChoice,computerChoice);
}
};

 