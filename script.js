//Variablar
let hasSplit = false;
let secondHand = false;
let bust = false;
let firsthand = false

//Background:
document.body.style.backgroundImage = "url('./images/bakgrunds_bild.png')";
document.body.style.backgroundSize = "cover"
document.body.style.backgroundRepeat = "no-repeat"

let hitButton = document.getElementById("button-1-container");
let splitButton = document.getElementById("button-2-container");
let doubledownButton = document.getElementById("button-3-container");
let standButton = document.getElementById("button-4-container");

let playerCardImage = document.getElementById("player-card-container");
let dealerCardImage = document.getElementById("dealer-card-container")


let victoryText = document.getElementById("header-text");
let betAmount = document.getElementById("bet-text");
let amountChips = document.getElementById("amount-chips");
let startDealing = document.getElementById("start-button-container");
let continueButton = document.getElementById("continue-button-container");


let betting1 = document.getElementById("button-betting1-container");
let betting2 = document.getElementById("button-betting2-container");
let betting3 = document.getElementById("button-betting3-container");
let betting4 = document.getElementById("button-betting4-container");

let handAContainer = document.getElementById("handA-container");
let handBContainer = document.getElementById("handB-container");


// En klass för spelaren
let player = {
  chips: 1000,  // Antal pengar
  bet: 0, // Antal satsade pengar
  points: 0, // Antal poäng

  betcoins() {
    inputValue = document.getElementById("coinsbetted").value;
    console.log(inputValue)
    if (inputValue > this.chips) {
      coinsystem.innerHTML = "<p>Invalid amount of coins</p>"
    } else {
      this.chips -= inputValue
      this.bet = inputValue
      return inputValue
    }
  }
}
function bet1(){
  if(player.chips >= 50){
    player.bet += 50
    player.chips -=50
    betAmount.innerHTML = `Ditt bet: ${player.bet}`
    amountChips.innerHTML = `Antal chips: ${player.chips}`
  }
}
function bet2(){
  if(player.chips >= 100){
    player.bet += 100
    player.chips -=100
    betAmount.innerHTML = `Ditt bet: ${player.bet}`
    amountChips.innerHTML = `Antal chips: ${player.chips}`
  }
}

function bet3(){
  if(player.chips >= 500){
    player.bet += 500
    player.chips -=500
    betAmount.innerHTML = `Ditt bet: ${player.bet}`
    amountChips.innerHTML = `Antal chips: ${player.chips}`
  }
}

function bet4(){
  if(player.chips >= 1000){
    player.bet += 1000
    player.chips -=1000
    betAmount.innerHTML = `Ditt bet: ${player.bet}`
    amountChips.innerHTML = `Antal chips: ${player.chips}`
  }
}

function betting(){
  betting1.innerHTML = `<img src="./images/chips50.png"/>`;
  betting2.innerHTML = `<img src="./images/chips100.png"/>`;
  betting3.innerHTML = `<img src="./images/chips500.png"/>`;
  betting4.innerHTML = `<img src="./images/chips1000.png"/>`;

}

// Klass för att skapa spelkort
class Kort {
    constructor(bild, value) {
      this.bild = bild;
      this.value = value;
    }
  }
  
  // Klass för stack
  class Kortlek {
    constructor() {
      this.stack = [];
    }
  
    // Lägg ett kort överst i leken
    lägg_till_kort(item) {
      this.stack.push(item);
    }
    // Ta ett kort överst från leken
    dra_kort() {
      let draget_kort = this.stack.pop();
      `Du drar ${draget_kort.bild} ${draget_kort.value}`
      return draget_kort;
    }
  
    // Visa korten som finns i leken (I ordning)
  
    // Visa hur många kort som finns
    visa_längd() {
      console.log(`Kortleken har ${this.stack.length} kort`);
    }
  
    // Blanda leken
    blanda() {
      for (let i = this.stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = this.stack[i];
        this.stack[i] = this.stack[j];
        this.stack[j] = temp;
      }
    }
  }

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function hit() {
  if (hasSplit === true) {
    if (firsthand === true) {
      currentCard = kortlek.dra_kort();
      handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
      playerCards.push(currentCard);
      player.points += currentCard.value;
    } else {
      currentCard = kortlek.dra_kort();
      handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
      playerCards.push(currentCard);
      player.points += currentCard.value;
    }
  } else {
    currentCard = kortlek.dra_kort();
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
    playerCards.push(currentCard);
    player.points += currentCard.value;
  }
  showingButtons()
}

function doubleDown() {
  if(player.chips/player.bet >= 1){
    player.chips -= player.bet;
    player.bet = player.bet * 2;
    betAmount.innerHTML = `Ditt bet: ${player.bet}`;
    currentCard = kortlek.dra_kort();
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
    playerCards.push(currentCard);
    showingButtons();
    stand();
  }
}

function stand() {
  if(firsthand === true){
    firsthand = false;
    console.log('första hand avklarad')
    return''
  }
  standButton.innerHTML = `<img src=""/>`;
  hitButton.innerHTML = `<img src=""/>`;
  doubledownButton.innerHTML = `<img src=""/>`;
  splitButton.innerHTML = `<img src=""/>`;
  
  //Dealer kort
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;


    while (dealerValues() <17){
        currentCard = kortlek.dra_kort();
        dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
        dealerCards.push(currentCard);
     
       
      
      if (dealerValues() > 21){
        for (i in dealerCards){
          if (dealerCards[i].value === 11){
            dealerCards[i].value = 1;
            dealerValues();
            if (dealerPoints <= 21){
              break;
              
            }
          }
        }
      } 
    }
    if (bust === true){
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
      return ''
    }
    if (dealerValues() > 21){
      victoryText.innerHTML =`Du vann $${player.bet}`;
      player.chips += 2*player.bet
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
      return''
    
    } else {
        if (player.points === dealerPoints){
          victoryText.innerHTML = 'Push'
          player.chips += player.bet
          continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
          return ''
        } else if (player.points > dealerPoints){
          victoryText.innerHTML =`Du vann $${player.bet}`
          player.chips += 2*player.bet
          continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
          return ''
        } else if (player.points < dealerPoints ) {
          victoryText.innerHTML ='Dealer vann'
          continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
          return ''
        }
      }

}

function dealerValues(){
  dealerPoints = 0
  for (b in dealerCards){
    dealerPoints += dealerCards[b].value;
  }
  return dealerPoints
}

function playerValues(){
  player.points = 0
  for (j in playerCards){
    player.points += playerCards[j].value;
  }
  return player.points
}

function split() {
  if(canSplit() === false){
    return ''
  }
  playerCardImage.innerHTML = `<img src=""/>`;
  console.log('funktion split')
  hasSplit = true;

  let tempHand = [];
  let handAValue = 0;
  let handBValue = 0;

  // Fördelar om korten till den temporära handen.
  tempHand.push(playerCards[1]);
  playerCards.pop()
  currentCard = kortlek.dra_kort();
  tempHand.push(currentCard)
  currentCard = kortlek.dra_kort();
  playerCards.push(currentCard)
  
  // Lägger in händerna i separata containers
  handAContainer.innerHTML = `<img src="./PNG-cards-1.3/${playerCards[0].bild}.png"/>`;
  handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${playerCards[1].bild}.png"/>`;

  handBContainer.innerHTML = `<img src="./PNG-cards-1.3/${tempHand[0].bild}.png"/>`;
  handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${tempHand[1].bild}.png"/>`;

  firsthand = true;
  /*
  secondHand = false;
  // Kör igenom första handen
  showingButtons();
  

  // Summera handen
  handAValue = playerValues();

  // Byt plats på tempHand och playerCards
  playerCards = tempHand;

  secondHand = true;
  // Loop för andra
  showingButtons();

  // Summera handen
  handBValue = playerValues();


  secondHand = false;
*/
}

function split1(){
  //hej
}

function canSplit() {
  if ((playerCards[0].value == playerCards[1].value) && (playerCards.length == 2) && (hasSplit === false)) {
    console.log('hej')
    return true;
    
  } else {
    return false;
  }
}

function canDoubleDown() {
  if (playerCards.length == 2 && (player.chips/player.bet) >= 1) {
    return true;
  }
}


function nyKortlek(){
  
  for (let j = 0; j < 6; j++) {
    for (let i = 2; i <= 14; i++){
        if (i == 14) {
            cardvalue = 11;
        } else if ( i > 10) {
            cardvalue = 10;
        } else {
            cardvalue = i;
        }
        let kort = new Kort(`${i}_of_clubs`, cardvalue);
        kortlek.lägg_till_kort(kort);
        kort = new Kort(`${i}_of_diamonds`, cardvalue);
        kortlek.lägg_till_kort(kort);
        kort = new Kort(`${i}_of_diamonds`,cardvalue);
        kortlek.lägg_till_kort(kort);
        kort = new Kort(`${i}_of_spades`, cardvalue);
        kortlek.lägg_till_kort(kort);
        
    }
  }
}

function startMenu(){
  hasSplit = false;
  continueButton.innerHTML =""


  player.bet = 0;
  player.points = 0;
  startDealing.innerHTML = `<img src="./images/Start-Button.png"/>`;
  
  playerCardImage.innerHTML = "";
  dealerCardImage.innerHTML = "";
  handAContainer.innerHTML = "";
  handBContainer.innerHTML = "";

  betAmount.innerHTML = `Ditt bet: ${player.bet}`;
  amountChips.innerHTML = `Antal chips: ${player.chips}`;
  victoryText.innerHTML = "";
  standButton.innerHTML = "";
  hitButton.innerHTML = "";
  doubledownButton.innerHTML = "";
  splitButton.innerHTML = "";
  
  betting()
}


function startOfGame(){
  if (player.bet <= 0){
    return''
  }

  startDealing.innerHTML = "";
  amountChips.innerHTML = "";
  betting1.innerHTML = "";
  betting2.innerHTML = "";
  betting3.innerHTML = "";
  betting4.innerHTML = "";


  kortlek.blanda();
  playerCards = [];
  dealerCards = [];

  currentCard = kortlek.dra_kort();
  playerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  playerCards.push(currentCard)

  currentCard = kortlek.dra_kort();
  dealerCard1 = currentCard;
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/kort_baksida.png"/>`;
  dealerCards.push(currentCard)

  currentCard = kortlek.dra_kort();
  playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  playerCards.push(currentCard)

  currentCard = kortlek.dra_kort();
  dealerCard2 = currentCard;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  dealerCards.push(currentCard)

  for (i in playerCards){
    player.points += playerCards[i].value;
  }
  dealerValues();
  
  if (player.points === 21 && dealerPoints === 21){
    victoryText.innerHTML ='Push'
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
    player.chips += player.bet
    return ''
  } else if (player.points === 21){
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML =`Du vann $${1.5*player.bet}`
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
    player.chips += 2.5*player.bet
    return ''
  } else if (dealerPoints === 21) {
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML ='Dealern fick BLACKJACK'
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
    return ''
  }
  
  showingButtons ()
}

function showingButtons (){
  betAmount.innerHTML = `Ditt bet: ${player.bet}`
  if (player.points > 21 ){
    for (i in playerCards){
      if (playerCards[i].value === 11){
        playerCards[i].value = 1;
        playerValues();
        if (player.points <= 21){
          break;
        }
      }
    }
  }

  if (player.points > 21 ){
    victoryText.innerHTML ='Bust';
    standButton.innerHTML = `<img src=""/>`;
    doubledownButton.innerHTML = `<img src=""/>`;
    splitButton.innerHTML = `<img src=""/>`;
    hitButton.innerHTML = `<img src=""/>`;
    bust = true
    stand()
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`
    bust = false
    }
  else if (canSplit()) {
    // här läggs knapparna split, hit, stand och double down till

    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
    splitButton.innerHTML = `<img src="./images/splitbutton.png"/>`;

  } else if (canDoubleDown()) {
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    } else {
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    }
  
}
let kortlek = new Kortlek();
nyKortlek();
let playerCards;
let dealerCards;
let dealerPoints;
let dealerCard1;
let dealerCard2;


startMenu()



// Alla knappar och dess funktioner
splitButton.addEventListener("click", split)
hitButton.addEventListener("click", hit)
standButton.addEventListener("click", stand)
doubledownButton.addEventListener("click", doubleDown)

betting1.addEventListener("click", bet1)
betting2.addEventListener("click", bet2)
betting3.addEventListener("click", bet3)
betting4.addEventListener("click", bet4)

startDealing.addEventListener("click", startOfGame)
continueButton.addEventListener("click",startMenu)

