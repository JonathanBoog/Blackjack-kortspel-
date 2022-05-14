

//Variabler
let hasSplit = false; // Om man har splittat
let secondHand; 
let firsthand = false //Om spelaren vid split är på sin första hand eller ej 
let bust = false; // Om bust eller ej
let playerCards; // Spelarens kort
let dealerCards; // Dealerns kort
let dealerPoints; // Dealerns sammanlagda poäng på kort
let dealerCard1; // Dealerns första kort
let dealerCard2; // Dealerns andra kort
let bustFirstHand = false; // Vid split; om första hand har bustat
let bustSecondHand = false; // Vid split; om andra hand har bustat
let menuButtonsOff; // Knapparna i menyn stängs av
let firstTwoCards = true; // Om man får två ess tror programmet att det är eventuellt bust och därmed går det inte att använda split
let continueButtonOff = false; // Off för continue knappen


//Background:
document.body.style.backgroundImage = "url('./images/bakgrunds_bild.png')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

let hitButton = document.getElementById("button-1-container"); // Hit knapp
let splitButton = document.getElementById("button-2-container"); // Split knapp
let doubledownButton = document.getElementById("button-3-container"); // Doubledown knapp
let standButton = document.getElementById("button-4-container"); // Stand knapp

let playerCardImage = document.getElementById("player-card-container"); // Spelarens container för bilder på korten
let dealerCardImage = document.getElementById("dealer-card-container"); // Dealerns container för bilder på korten
let handAContainer = document.getElementById("handA-container"); // Ena containern för kort vid split
let handBContainer = document.getElementById("handB-container");  // Ena containern för kort vid split
handAContainer.style.border = 'transparent'; // Gör border osynlig
handBContainer.style.border = 'transparent'; // Gör border osynlig


let victoryText = document.getElementById("header-text");
let betAmount = document.getElementById("bet-text"); // Visar mängden som spelaren har bettat
let amountChips = document.getElementById("amount-chips"); // visar antalet chips som spelaren har
let startDealing = document.getElementById("start-button-container"); 
let continueButton = document.getElementById("continue-button-container"); 


let betting1 = document.getElementById("button-betting1-container");
let betting2 = document.getElementById("button-betting2-container");
let betting3 = document.getElementById("button-betting3-container");
let betting4 = document.getElementById("button-betting4-container");




// En klass för spelaren
let player = {
  chips: 1000,  // Antal pengar
  bet: 0, // Antal satsade pengar
  points: 0, // Antal poäng
  points2: 0,
  
}
function bet1(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 50){
    player.bet += 50;
    player.chips -=50;
    betAmount.innerHTML = `Ditt bet: ${player.bet}`;
    amountChips.innerHTML = `Antal chips: ${player.chips}`;
  }
}
function bet2(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 100){
    player.bet += 100;
    player.chips -=100;
    betAmount.innerHTML = `Ditt bet: ${player.bet}`;
    amountChips.innerHTML = `Antal chips: ${player.chips}`;
  }
}

function bet3(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 500){
    player.bet += 500;
    player.chips -=500;
    betAmount.innerHTML = `Ditt bet: ${player.bet}`;
    amountChips.innerHTML = `Antal chips: ${player.chips}`;
  }
}

function bet4(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 1000){
    player.bet += 1000;
    player.chips -=1000;
    betAmount.innerHTML = `Ditt bet: ${player.bet}`;
    amountChips.innerHTML = `Antal chips: ${player.chips}`;
  }
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
        if (playerValues() > 21){
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
        if (playerValues() > 21){
          betAmount.innerHTML ='Bust';
          firsthand = false;
          bustFirstHand = true;
        }

    } else {
      currentCard = kortlek.dra_kort();
      handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
      secondHand.push(currentCard);

      if (playerValues2() > 21){
        for (i in secondHand){
          if (secondHand[i].value === 11){
            secondHand[i].value = 1;
            playerValues2();
            if (player.points2 <= 21){
              break;
            }
          }
        }
      }
      if (playerValues2() > 21){
        amountChips.innerHTML ='Bust';
        bustSecondHand = true;
        stand();
      }
      
    }
  } else {
    currentCard = kortlek.dra_kort();
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
    playerCards.push(currentCard);
    playerValues();
  }


  showingButtons();
}

function doubleDown() {
  if(canDoubleDown() ===true){
    player.chips -= player.bet;
    player.bet = player.bet * 2;
    betAmount.innerHTML = `Ditt bet: ${player.bet}`;
    currentCard = kortlek.dra_kort();
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
    player.points += currentCard.value;
    playerCards.push(currentCard);
    if (playerValues() > 21){
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
    
    if (playerValues() > 21){
      victoryText.innerHTML ='Bust';
      bust = true;
      stand();
      bust = false;

      } else {
        stand();
      }
    
    standButton.innerHTML = `<img src=""/>`;
    doubledownButton.innerHTML = `<img src=""/>`;
    splitButton.innerHTML = `<img src=""/>`;
    hitButton.innerHTML = `<img src=""/>`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
  }
}

function stand() {
  if(firsthand === true){
    firsthand = false;
    handAContainer.style.border = 'transparent';
    handBContainer.style.border = '';
    return''
  }
    
  continueButtonOff = false; // Gör så att knappen "Continue" går att användas

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
    
    handBContainer.style.border = 'transparent';

    if (hasSplit === true){
      if (bustFirstHand === true){
        console.log('bust första hand')
        bustFirstHand = false;
      
      } else if (dealerPoints > 21){
        betAmount.innerHTML =`Du vann $${player.bet}`;
        player.chips += 2*player.bet;
        
      
      } else {
          if (playerValues() === dealerPoints){
            betAmount.innerHTML = 'Push';
            player.chips += player.bet;
          } else if (player.points > dealerPoints){
            betAmount.innerHTML =`Du vann $${player.bet}`
            player.chips += 2*player.bet;
          } else if (player.points < dealerPoints ) {
            betAmount.innerHTML ='Dealer vann';
          }
      }
      
      
      if (bustSecondHand === true){
        amountChips.innerHTML =`<img src="./images/continue-button.png"/>`;
        bustSecondHand = false;
        return ''
      }
      else if (dealerPoints > 21){
        amountChips.innerHTML =`Du vann $${player.bet}`;
        player.chips += 2*player.bet;
        
      } else {
          if (playerValues2() === dealerPoints){
            amountChips.innerHTML = 'Push';
            player.chips += player.bet;

          } else if (player.points2 > dealerPoints){
            amountChips.innerHTML =`Du vann $${player.bet}`;
            player.chips += 2*player.bet;

          } else if (player.points2 < dealerPoints ) {
            amountChips.innerHTML ='Dealer vann';

          }
      }
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
      return'';
      
      
    } else {
      if (bust === true){
        continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
        return '';
      }
      else if (dealerValues() > 21){
        victoryText.innerHTML =`Du vann $${player.bet}`;
        player.chips += 2*player.bet;
        continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
        return'';
      
      } else {
          if (player.points === dealerPoints){
            victoryText.innerHTML = 'Push';
            player.chips += player.bet;
            continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
            return '';
          } else if (player.points > dealerPoints){
            victoryText.innerHTML =`Du vann $${player.bet}`;
            player.chips += 2*player.bet;
            continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
            return '';
          } else if (player.points < dealerPoints ) {
            victoryText.innerHTML ='Dealer vann';
            continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
            return '';
          }
        }
    }
}

function dealerValues(){
  dealerPoints = 0;
  for (b in dealerCards){
    dealerPoints += dealerCards[b].value;
  }
  return dealerPoints;
}

function playerValues(){
  player.points = 0;
  for (j in playerCards){
    player.points += playerCards[j].value;
  }
  return player.points;
}

function playerValues2() { // Används för den andra handen när man har splittat
  player.points2 = 0;
  for (j in secondHand){
    player.points2 += secondHand[j].value;
  }
  return player.points2;
}

function split() {
  if(canSplit() === false){
    return '';
  }
  playerCardImage.innerHTML = `<img src=""/>`;
  hasSplit = true;

  secondHand = [];


  // Fördelar om korten till den temporära handen.
  secondHand.push(playerCards[1]);
  playerCards.pop();
  
  currentCard = kortlek.dra_kort();
  secondHand.push(currentCard);
  
  currentCard = kortlek.dra_kort();
  playerCards.push(currentCard);
  
  // Lägger in händerna i separata containers
  handAContainer.innerHTML = `<img src="./PNG-cards-1.3/${playerCards[0].bild}.png"/>`;
  handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${playerCards[1].bild}.png"/>`;

  handBContainer.innerHTML = `<img src="./PNG-cards-1.3/${secondHand[0].bild}.png"/>`;
  handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${secondHand[1].bild}.png"/>`;

  firsthand = true;
  handAContainer.style.border = '';


  showingButtons();

}


function canSplit() {
  if ((playerCards[0].value == playerCards[1].value) && (playerCards.length == 2) && (hasSplit === false) && (player.chips/player.bet) >= 1) {
    return true;
    
  } else {
    return false;
  }
}

function canDoubleDown() {
  if (playerCards.length == 2 && (player.chips/player.bet) >= 1 && hasSplit === false) {
    return true;
  } else {
    return false;
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
  if (continueButtonOff === true){
    return'';
  }
  continueButtonOff = true; // Stänger av continue knappen
  continueButton.innerHTML =""; // Tar bort bilden för continue

  menuButtonsOff = false; // Sätter igång start knappen
  startDealing.innerHTML = `<img src="./images/Start-Button.png"/>`; // Lägger till bilden på start knappen
  hasSplit = false;

  player.bet = 0;
  player.points = 0;

  //Alla bilder på kort försvinner
  playerCardImage.innerHTML = "";
  dealerCardImage.innerHTML = "";
  handAContainer.innerHTML = "";
  handBContainer.innerHTML = "";

  betAmount.innerHTML = `Ditt bet: ${player.bet}`;
  amountChips.innerHTML = `Antal chips: ${player.chips}`;
  victoryText.innerHTML = "";
  
  // De olika knappar försvinner efter runda
  standButton.innerHTML = "";
  hitButton.innerHTML = "";
  doubledownButton.innerHTML = "";
  splitButton.innerHTML = "";
  
  
  // Bilder på de olika chipsen
  betting1.innerHTML = `<img src="./images/chips50.png"/>`;
  betting2.innerHTML = `<img src="./images/chips100.png"/>`;
  betting3.innerHTML = `<img src="./images/chips500.png"/>`;
  betting4.innerHTML = `<img src="./images/chips1000.png"/>`;

}


function startOfGame(){
  
  if (menuButtonsOff === true){ // en ny runda får ej starta medan en annan är igång
    return'';
  }
  if (player.bet <= 0){ // rundan får ej starta om man inte bettat något
    return'';
  }

  menuButtonsOff = true;
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
  playerCards.push(currentCard);

  currentCard = kortlek.dra_kort();
  dealerCard1 = currentCard;
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/kort_baksida.png"/>`;
  dealerCards.push(currentCard);

  currentCard = kortlek.dra_kort();
  playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  playerCards.push(currentCard);

  currentCard = kortlek.dra_kort();
  dealerCard2 = currentCard;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  dealerCards.push(currentCard);

  playerValues();
  dealerValues();
  
  if (player.points === 21 && dealerPoints === 21){
    victoryText.innerHTML ='Push';
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
    continueButtonOff = false;
    player.chips += player.bet;
    return '';
  } else if (player.points === 21){
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML =`Du vann $${1.5*player.bet}`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
    continueButtonOff = false;
    player.chips += 2.5*player.bet;
    return '';
  } else if (dealerPoints === 21) {
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML ='Dealern fick BLACKJACK';
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
    continueButtonOff = false;
    return '';
  }
  
  showingButtons ();
}

function showingButtons (){
  
  if ((playerValues() > 21) && firstTwoCards === false &&  hasSplit === false){
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

  if ((playerValues() > 21) && firstTwoCards === false && hasSplit === false){
    victoryText.innerHTML ='Bust';
    standButton.innerHTML = `<img src=""/>`;
    doubledownButton.innerHTML = `<img src=""/>`;
    splitButton.innerHTML = `<img src=""/>`;
    hitButton.innerHTML = `<img src=""/>`;
    bust = true;
    stand()
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
    bust = false;
    }
  else if (canSplit()) {
    // här läggs knapparna split, hit, stand och double down till

    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
    splitButton.innerHTML = `<img src="./images/splitbutton.png"/>`;

  } else if (canDoubleDown() && hasSplit === false) {
    splitButton.innerHTML = "";
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    } else {
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    splitButton.innerHTML = "";
    doubledownButton.innerHTML = "";
    }
  firstTwoCards = false;
}


let kortlek = new Kortlek();
nyKortlek(); // skapar kortlek
startMenu();



// Alla knappar och dess funktioner
splitButton.addEventListener("click", split) // Split, delar högen i två
hitButton.addEventListener("click", hit) // Hit, tar upp ett nytt kort
standButton.addEventListener("click", stand) // Stand
doubledownButton.addEventListener("click", doubleDown) // Doubledown

betting1.addEventListener("click", bet1)
betting2.addEventListener("click", bet2)
betting3.addEventListener("click", bet3)
betting4.addEventListener("click", bet4)

startDealing.addEventListener("click", startOfGame) // Knapp för att starta rundan
continueButton.addEventListener("click",startMenu) // Knapp för att gå vidare till menyn

