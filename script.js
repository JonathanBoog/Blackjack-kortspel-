 //Background:

document.body.style.backgroundImage = "url('./images/bakgrunds_bild.png')";
document.body.style.backgroundSize = "cover"
document.body.style.backgroundRepeat = "no-repeat"

// En klass för spelaren
let player = {
  chips: 1000,  // Antal pengar
  bet: 0, // Antal satsade pengar
  points: 0, // Antal poäng

  betcoins() {
    let inputValue = document.getElementById("coinsbetted").value;
    if (inputValue > player.chips) {
      coinsystem.innerHTML = "<p>Invalid amount of coins</p>"
    } else {
      player.chips -= inputValue
      return inputvalue
    }
  }
}

function betting(){
  player.bet = 100
  while (true){
    if(player.bet > player.chips){
      alert('Du betta för mycket')
      continue
      
    } else {
      player.chips -= player.bet
    
      break;
      
    }
  }  
}


let hitButton = document.getElementById("button-1-container");
let splitButton = document.getElementById("button-2-container");
let doubledownButton = document.getElementById("button-3-container");
let standButton = document.getElementById("button-4-container");

let playerCardImage = document.getElementById("player-card-container");
let dealerCardImage = document.getElementById("dealer-card-container")

let coinsystem = document.getElementById("coinmoderater-container");

let victoryText = document.getElementById("header-text");

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
  playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  playerCards.push(currentCard)
  player.points += currentCard.value
  showingButtons()
}

function doubleDown() {
  player.chips -= player.bet;
  player.bet = player.bet * 2;
  showingButtons()
}

function stand() {
  standButton.innerHTML = `<img src=""/>`;
  hitButton.innerHTML = `<img src=""/>`;
  doubledownButton.innerHTML = `<img src=""/>`;
  splitButton.innerHTML = `<img src=""/>`;
  

  
  //Dealer kort
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;


  if(secondHand) {
    while (true){
      if (dealerValues() <17 ){
        currentCard = kortlek.dra_kort();
        dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
        dealerCards.push(currentCard);
      } else if (dealerValues() > 21){
          for (i in dealerCards){
            if (dealerCards[i].value === 11){
              dealerCards[i].value = 1;
              dealerValues();
              if (dealerPoints <= 21){
                break;
              }
            }
          }
        if (dealerValues() > 21){
          victoryText.innerHTML ='Du vann';
          return''
        }
      
      } else {
          if (player.points === dealerPoints){
            victoryText.innerHTML = 'Push'
            
            return ''
          } else if (player.points > dealerPoints){
            victoryText.innerHTML ='Du vann'
            player.chips += 2*bet
            return ''
          } else if (player.points < dealerPoints ) {
            victoryText.innerHTML ='Dealer vann'
            return ''
          }
      }
    }
  }
}

function dealerValues(){
  dealerPoints = 0
  for (j in dealerCards){
    dealerPoints += dealerCards[j].value;
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

}

function canSplit() {
  if ((playerCards[0].value == playerCards[1].value) && (playerCards.length == 2) && (hasSplit === false)) {
    return true;
  } else {
    return false;
  }
}

function canDoubleDown() {
  if (playerCards.length == 2) {
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
  victoryText.innerHTML = 'Välkommen'
  //player.betting();
  player.bet = 100;
  player.chips -= player.bet;
  startOfGame()
}


function startOfGame(){
  
  //victoryText.innerHTML = ""
  kortlek.blanda();
  playerCards = [];
  dealerCards = [];
  player.points = 0;

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
    return ''
  } else if (player.points === 21){
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML ='Du fick BLACKJACK'
    player.chips += 2.5*bet
    return ''
  } else if (dealerPoints === 21) {
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML ='Dealern fick BLACKJACK'
    return ''
  }
  
  showingButtons ()
}

function showingButtons (){
  if (canSplit()) {
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
    hitButton = `<img src="./images/hitbutton.png"/>`;
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    }
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
    victoryText.innerHTML ='Bust a nut'
    standButton.innerHTML = `<img src=""/>`;
    hitButton.innerHTML = `<img src=""/>`;
    doubledownButton.innerHTML = `<img src=""/>`;
    splitButton.innerHTML = `<img src=""/>`;
  
    //startMenu()
    }
}
let kortlek = new Kortlek();
nyKortlek();
let playerCards;
let dealerCards;
let dealerPoints;
let dealerCard1;
let dealerCard2;

// Om man har splittat
let hasSplit = false;
let secondHand = true;

startMenu()
// Alla knappar och dess funktioner
splitButton.addEventListener("click", split)
hitButton.addEventListener("click", hit)
standButton.addEventListener("click", stand)
doubledownButton.addEventListener("click", doubleDown)
