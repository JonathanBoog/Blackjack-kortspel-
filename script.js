 //Background:

document.body.style.backgroundImage = "url('./images/Background.png')";


// En klass för spelaren
let player = {
  chips: 1000,  // Antal pengar
  bet: 0, // Antal satsade pengar
  points: 0, // Antal poäng
}
let hitButton = document.getElementById("button-1-container");
let splitButton = document.getElementById("button-2-container");
let doubledownButton = document.getElementById("button-3-container");
let standButton = document.getElementById("button-4-container");

let playerCardImage = document.getElementById("player-card-container");


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
  
function hit() {
  currentCard = kortlek.dra_kort();
  //cardImage.innerHTML = `<img src="./images/${currentImage}" />`;
  playerCards.push(currentCard)
}

function doubleDown() {
  player.chips -= player.bet;
  player.bet = player.bet * 2;
}

function stand() {
  return true;
}

function split() {
  let tempHand = [];
  tempHand.push(playerCards[1]);
  playerCards.pop()
  currentCard = kortlek.dra_kort();
  tempHand.push(currentCard)
  currentCard = kortlek.dra_kort();
  playerCards.push(currentCard)
  
  while (true) {
    if (canDoubleDown()) {
      doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
      hitButton = `<img src="./images/hitbutton.png"/>`;
      standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    } else {
      hitButton = `<img src="./images/hitbutton.png"/>`;
      standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    }
  }
  
  // Summera handen för playerCards
}

function canSplit() {
  if (playerCards[0].value == playerCards[1].value && playerCards.length == 2) {
    return true;
  }
}

function canDoubleDown() {
  if (playerCards.length == 2) {
    return true;
  }
}

let kortlek = new Kortlek();
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

while (true){
  if (kortlek.length===26){
    console.log('Spelet avslutas')
    break
  }
  player.points = 0;


  //bet = Number(prompt('Vad är ditt bet?'))
  bet = 100;
  player.chips -= bet
  player.bet = bet
  
  kortlek.blanda();
  playerCards = [];
  dealerCards = [];
  let dealerPoints = 0;

  currentCard = kortlek.dra_kort();
  //playerCardImage.innerHTML = `<img src="./images/${currentCard.bild}" />`;
  playerCards.push(currentCard)

  currentCard = kortlek.dra_kort();
  //cardImage.innerHTML = `<img src="./images/${currentImage}" />`;
  dealerCards.push(currentCard)

  currentCard = kortlek.dra_kort();
  //cardImage.innerHTML = `<img src="./images/${currentImage}" />`;
  playerCards.push(currentCard)

  currentCard = kortlek.dra_kort();
  //cardImage.innerHTML = `<img src="./images/${currentImage}" />`;
  dealerCards.push(currentCard)

  for (i in playerCards){
    player.points += playerCards[i].value;
  }
  for (char in dealerCards){
    dealerPoints += dealerCards[i].value;
  }
  
  if (player.points === 21 && dealerPoints === 21){
    console.log('Push')
    //Alla kort visas
    break
  } else if (player.points === 21){
    //Alla kort visas
    console.log('Du fick BLACKJACK')
    player.chips += 2.5*bet
    console.log(player.chips)
    break
  } else if (dealerPoints === 21) {
    //Alla kort visas
    console.log('Dealern fick BLACKJACK')
    break
  }
  console.log(playerCards, dealerCards)
  console.log(player.points,dealerPoints)

  while (true){
    if (true) {
      // här läggs knapparna split, hit, stand och double down till
      standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
      hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
      doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
      splitButton.innerHTML = `<img src="./images/splitbutton.png"/>`;
      break
    } else if (canDoubleDown()) {
      doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
      hitButton = `<img src="./images/hitbutton.png"/>`;
      standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    } else {
      hitButton = `<img src="./images/hitbutton.png"/>`;
      standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    }
    if (player.points > 21 ){
      alert('Bust')
      break
    }
    

  }
  break
}

// Alla knappar och dess funktioner
splitButton.addEventListener("click", split)
hitButton.addEventListener("click", hit)
standButton.addEventListener("click", stand)
doubledownButton.addEventListener("click", doubleDown)