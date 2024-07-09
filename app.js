let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = [
      { choice: "rock", label: "Rock" },
      { choice: "paper", label: "Paper" },
      { choice: "scissors", label: "Scissors" }
    ];
    const randIdx = Math.floor(Math.random() * options.length);
    return options[randIdx];
  };
  

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      // User wins
      userScore++;
      userScorePara.innerText = userScore;
      msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
  
      // Trigger confetti celebration
      var confettiSettings = {
        particleCount: 150,
        spread: 180,
        colors: ['#FF0000', '#00FF00', '#0000FF']
      };
      confetti(confettiSettings);
    } else {
      // Computer wins
      compScore++;
      compScorePara.innerText = compScore;
      msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
      msg.style.backgroundColor = "red";
    }
  };
  

  const playGame = (userChoice) => {
    // Generate computer choice
    const { choice: compChoice, label: compLabel } = genCompChoice();
  
    // Highlight user and computer choices in the message
    msg.innerHTML = `You chose <strong>${userChoice}</strong>. Computer chose <strong>${compLabel}</strong>.<br>`;
  
    if (userChoice === compChoice) {
      // Draw game
      msg.innerHTML += "It's a draw. Play again.";
      msg.style.backgroundColor = "#081b31";
    } else {
      let userWin = true;
      if (userChoice === "rock") {
        // User chose rock
        userWin = compChoice === "paper" ? false : true;
      } else if (userChoice === "paper") {
        // User chose paper
        userWin = compChoice === "scissors" ? false : true;
      } else {
        // User chose scissors
        userWin = compChoice === "rock" ? false : true;
      }
      showWinner(userWin, userChoice, compChoice);
    }
  };
  

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});