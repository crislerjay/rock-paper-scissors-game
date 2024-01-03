

const overlay = document.querySelector('.overlay');
const choicesBlk = document.querySelector('.choices');

// open rules
const rulesBtn = document.querySelector('.rulesBtn');
rulesBtn.addEventListener('click', function(){
  overlay.style.display = 'block';
});

// close rules
const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', function(){
  overlay.style.display = 'none';
});

// get data from localstorage
const localStorageScore = JSON.parse(localStorage.getItem('score'));
let score = localStorage.getItem('score') !== null ? localStorageScore : 0;

// Computer random pick
function getRandomPick(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length); // get random index value
  const item = arr[randomIndex]; // get random item
  return item;
}
const arr = ['rock', 'paper', 'scissors'];

// update localstorage score
const scoreCount = document.querySelector('.scoreCount');
function updateScore(result) {
  if (result == 'lose' ) {
    if (score != 0) {
      score--
      localStorage.setItem('score', JSON.stringify(score));
    } 
  } else {
    score++
    localStorage.setItem('score', JSON.stringify(score));
  }
};

// update score text
function updateScoreText(){
  scoreCount.innerText = score;
}
updateScoreText();

const computerPick = document.querySelector('.computerPick');
const playerPickBlk = document.querySelector('.playerPickBlk');
const playerPick = document.querySelector('.playerPick');
const playerPickImg = document.querySelector('.playerPick img');
const resultCont = document.querySelector('.result');
const resultTxt = document.querySelector('.resultTxt');
const resultsBlk = document.querySelector('.resultsBlk');

function displayPlayerPick(pick, source) {
  choicesBlk.style.display = 'none';
  resultsBlk.style.display = 'flex';
  playerPickImg.setAttribute('src', source)
  if (pick == 'rock') {
    playerPick.className = 'playerPick circle rock';
  } else if (pick == 'paper') {
    playerPick.className = 'playerPick circle paper';
  } else if (pick == 'scissors') {
    playerPick.className = 'playerPick circle scissors';
  }
}

// create RPS element
const rock = document.createElement('div');
rock.innerHTML = `<p class="circle rock"><a href="javascript:void(0)" class="choice"><img src="./images/icon-rock.svg" alt="rock"></a></p>`
const paper = document.createElement('div');
paper.innerHTML = `<p class="circle paper"><a href="javascript:void(0)" class="choice"><img src="./images/icon-paper.svg" alt="paper"></a></p>`
const scissors = document.createElement('div');
scissors.innerHTML = `<p class="circle scissors"><a href="javascript:void(0)" class="choice"><img src="./images/icon-scissors.svg" alt="scissors"></a></p>`

function displayResult(pick, result) {
  setTimeout(function() { 
    computerPick.innerHTML = ''
    resultCont.style.display = 'block';
    updateScoreText();
    if (pick == 'rock') {
      computerPick.appendChild(rock)
    } else if (pick == 'paper') {
      computerPick.appendChild(paper)
    } else if (pick == 'scissors') {
      computerPick.appendChild(scissors)
    }

    if (result == 'win') {
      resultTxt.innerText = 'YOU WIN!'
      playerPickBlk.classList.add('shadow');
    } else if (result == 'lose') {
      resultTxt.innerText = 'YOU LOSE!'
      computerPick.classList.add('shadow');
    } else if (result == 'tie') {
      resultTxt.innerText = 'TIE!'
    }
  }, 1500);
}

function checkResult(option) {
  const randomAIchoice = getRandomPick(arr);
  
  switch (option) {
    case 'rock':
      if (randomAIchoice == 'scissors') {
        updateScore('win')
        displayResult(randomAIchoice, 'win')
      } else if (randomAIchoice == 'paper') {
        updateScore('lose')
        displayResult(randomAIchoice, 'lose')
      } else if (randomAIchoice == 'rock') {
        displayResult(randomAIchoice, 'tie')
      }
      break;
    case 'paper':
      if (randomAIchoice == 'rock') {
        updateScore('win')
        displayResult(randomAIchoice, 'win')
      } else if (randomAIchoice == 'scissors') {
        updateScore('lose')
        displayResult(randomAIchoice, 'lose')
      } else if (randomAIchoice == 'paper') {
        displayResult(randomAIchoice, 'tie')
      }
      break;
    case 'scissors':
      if (randomAIchoice == 'paper') {
        updateScore('win')
        displayResult(randomAIchoice, 'win')
      } else if (randomAIchoice == 'rock') {
        updateScore('lose')
        displayResult(randomAIchoice, 'lose')
      } else if (randomAIchoice == 'scissors') {
        displayResult(randomAIchoice, 'tie')
      }
      break;
    default:
      break;
  }
}

//add click events
const choices = document.querySelectorAll('.choice');
choices.forEach(choice => {
  choice.addEventListener('click', function() {
    checkResult(this.getAttribute('data-choice'));
    displayPlayerPick(this.getAttribute('data-choice'), this.children[0].getAttribute('src'))
  });
});

// reset page
const playAgain = document.querySelector('.playAgain');
playAgain.addEventListener('click', function() {
  choicesBlk.style.display = 'block';
  resultsBlk.style.display = 'none';
  resultCont.style.display = 'none';
  playerPickBlk.classList.remove('shadow');
  computerPick.classList.remove('shadow');
  computerPick.innerHTML = `<div class="blankCircle"></div>`;
})