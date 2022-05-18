

//Variabler
let hasSplit = false; // Om man har splittat
let secondHand = []; 
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
let continueButtonOff = false; // Off för continue knappen
let hitStandOff = true;

//Background:
document.body.style.backgroundImage = "url('./images/bakgrunds_bild.png')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

//Indraget från HTML
let hitButton = document.getElementById("button-1-container"); // Hit knapp
let splitButton = document.getElementById("button-2-container"); // Split knapp
let doubledownButton = document.getElementById("button-3-container"); // Double down knapp
let standButton = document.getElementById("button-4-container"); // Stand knapp

let playerCardImage = document.getElementById("player-card-container"); // Spelarens container för bilder på korten
let dealerCardImage = document.getElementById("dealer-card-container"); // Dealerns container för bilder på korten
let handAContainer = document.getElementById("handA-container"); // Ena containern för kort vid split
let handBContainer = document.getElementById("handB-container");  // Ena containern för kort vid split
handAContainer.style.border = 'transparent'; // Gör border osynlig
handBContainer.style.border = 'transparent'; // Gör border osynlig


let victoryText = document.getElementById("header-text");
let betAmount = document.getElementById("bet-text"); // Visar mängden som spelaren har bettat ; den visar även status för en av split händerna
let amountChips = document.getElementById("amount-chips"); // visar antalet chips som spelaren har ; den visar även status för en av split händerna
let startDealing = document.getElementById("start-button-container"); 
let continueButton = document.getElementById("continue-button-container"); 


let betting1 = document.getElementById("button-betting1-container");
let betting2 = document.getElementById("button-betting2-container");
let betting3 = document.getElementById("button-betting3-container");
let betting4 = document.getElementById("button-betting4-container");
let betting5 = document.getElementById("button-betting5-container"); // All in



// Ett objekt för spelaren
let player = {
  chips: 400,  // Antal pengar
  bet: 0, // Antal satsade pengar
  bet2: 0, // Antal satsade pengar för andra handen
  points: 0, // Antal poäng
  points2: 0, //Används för andra handen i split
  
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
  
    // Blandar leken
    blanda() {
      for (let i = this.stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = this.stack[i];
        this.stack[i] = this.stack[j];
        this.stack[j] = temp;
      }
    }
  }

function bet1(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 50){
    player.bet += 50;
    player.chips -=50;
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Chips: ${player.chips}`;
  }
}
function bet2(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 100){
    player.bet += 100;
    player.chips -=100;
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Chips: ${player.chips}`;
  }
}

function bet3(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 500){
    player.bet += 500;
    player.chips -=500;
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Chips: ${player.chips}`;
  }
}

function bet4(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 1000){
    player.bet += 1000;
    player.chips -=1000;
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Chips: ${player.chips}`;
  }
}

function allIn(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
    player.bet += player.chips;
    player.chips = 0;
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Chips: ${player.chips}`;
}


function hit() {
  if (hitStandOff === true){
    return''
  }
  if (hasSplit === true) {
    if (firsthand === true) {
      currentCard = kortlek.dra_kort();
      handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
      playerCards.push(currentCard);

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
  }  
    
  if (hasSplit === false || firsthand === true){
    if (playerValues() > 21){ 
      //Gör om eventuella värden på ess till 1 beroende på om spelaren har det totala poängen/värdet över 21 eller ej
      for (i in playerCards){
        if (playerCards[i].value === 11){
          playerCards[i].value = 1;
          
          if (playerValues() <= 21){
            break;
          }
        }
      }
    }
    if ((playerValues() > 21) && hasSplit === false){ 
      //Om spelaren fortfarande har totala poängen/värdet över 21, förlorar spelaren, även kallat bust
      victoryText.innerHTML ='Bust';
      bust = true;
      stand();
    
    } else if (playerValues() > 21 && hasSplit === true){
      betAmount.innerHTML ='Bust';
      handAContainer.style.border = 'transparent';
      handBContainer.style.border = '';
      bustFirstHand = true;
      stand(); 
    }
      
  }
  showingButtons();
}

function doubleDown() {
  if(canDoubleDown() === false){
    return'';
  }
  if (hasSplit === true){
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Bet: ${player.bet2}`;
      
    if(firsthand === true){
      player.chips -= player.bet
      player.bet = player.bet*2
      betAmount.innerHTML = `Bet: ${player.bet}`;
      amountChips.innerHTML = `Bet: ${player.bet2}`;
        
      currentCard = kortlek.dra_kort();
      handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
    } else {
      player.chips -= player.bet2
      player.bet2 = player.bet2*2
      betAmount.innerHTML = `Bet: ${player.bet}`;
      amountChips.innerHTML = `Bet: ${player.bet2}`;
        
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
        return''
      } else {
        stand();
        return''
      }
    }
    
  } else {
    betAmount.innerHTML = `Bet: ${player.bet}`;
    amountChips.innerHTML = `Chips: ${player.chips}`;
    player.chips -= player.bet;
    player.bet = player.bet*2;
    currentCard = kortlek.dra_kort();
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`;
  }
  playerCards.push(currentCard);
  if (playerValues() > 21){
    for (i in playerCards){
      if (playerCards[i].value === 11){
        playerCards[i].value = 1;
        if (playerValues() <= 21){
          break;
        }
      }
    }
  }
  if (playerValues() > 21 && hasSplit === false){
    victoryText.innerHTML ='Bust';
    bust = true;
    stand();

  } else if (playerValues() > 21 && hasSplit === true) {
    betAmount.innerHTML ='Bust';
    bustFirstHand = true;
    stand();
  } else {
    stand();
  }
}

function stand() {
  if (hitStandOff === true){
    return''
  }
  if(firsthand === true){ //Byter hand från höger till vänster (first till second)
    firsthand = false;
    handAContainer.style.border = 'transparent';
    handBContainer.style.border = '';
    return''
  }
    
  continueButtonOff = false; // Gör så att knappen "Continue" går att användas
  hitStandOff = true;
  
  //Visar dealerns kort
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;

  //Tar bort bilderna på knapparna
  doubledownButton.innerHTML = `<img src=""/>`;
  splitButton.innerHTML = `<img src=""/>`;
  standButton.innerHTML = `<img src=""/>`;
  hitButton.innerHTML = `<img src=""/>`;

  
  if (bust === true || (bustFirstHand && bustSecondHand) === true){
    null;
  } else {
    while (dealerValues() <17 || (dealerCards[0].value && dealerCards[1].value) === 11){
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
  }
    
  handBContainer.style.border = 'transparent';

  if (hasSplit === true){
    // Första hand
    if (bustFirstHand === true){
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
     // Andra hand 
    if (bustSecondHand === true){
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
      bustSecondHand = false;
      return ''
    } else if (dealerPoints > 21){
      amountChips.innerHTML =`Du vann $${player.bet2}`;
      player.chips += (2*player.bet2);
    } else {
      if (playerValues2() === dealerPoints){
        amountChips.innerHTML = 'Push';
        player.chips += player.bet2;

      } else if (player.points2 > dealerPoints){
        amountChips.innerHTML =`Du vann $${player.bet2}`;
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
      bust = false;
      return '';
    
    } else if (dealerValues() > 21){
      victoryText.innerHTML =`Du vann $${player.bet}`;
      player.chips +=  2*player.bet;
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

//Totala värden på dealerns kort
function dealerValues(){
  /* Denna funktion beräknar totala värdet på dealerns kort, och sedan returnerar det värdet */
  dealerPoints = 0;
  for (b in dealerCards){
    dealerPoints += dealerCards[b].value;
  }
  return dealerPoints;
}

//Spelarens värden på kort
function playerValues(){
  /* Denna funktion beräknar totala värdet på korten som spelaren har, och sedan returnerar det värdet */
  player.points = 0;
  for (j in playerCards){
    player.points += playerCards[j].value;
  }
  return player.points;
}

//Andra handens värden på kort
function playerValues2() {
  /* Denna funktion beräknar totala värdet på korten som spelaren har i den andra handen, och sedan returnerar det värdet */
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
  
  player.chips -= player.bet
  player.bet2 = player.bet
  playerCardImage.innerHTML = `<img src=""/>`; // Tar bort bilderna på spelarens kort i mitten
  hasSplit = true; // Spelaren har nu splittat

  secondHand = []; //Lista för den andra handen

  betAmount.innerHTML = `Bet: ${player.bet}`; // Uppdaterar bet för den första handen
  amountChips.innerHTML = `Bet: ${player.bet2}`; // Uppdaterar bet för den andra handen
  betAmount.style.color = '#ffe600';  //Färg byts för att matcha kort ramen
  amountChips.style.color = '#ff00d9';


  // Fördelar om korten till den andra handen
  secondHand.push(playerCards[1]);
  playerCards.pop();
  
  currentCard = kortlek.dra_kort(); // Drar nytt kort för den andra handen
  secondHand.push(currentCard); //Lägger till kortet i andra handens lista
  
  currentCard = kortlek.dra_kort(); // Drar nytt kort för den första handen
  playerCards.push(currentCard); //Lägger till till kortet i första handens lista
  
  // Visar de kort som lagts till i båda händerna
  handAContainer.innerHTML = `<img src="./PNG-cards-1.3/${playerCards[0].bild}.png"/>`;
  handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${playerCards[1].bild}.png"/>`;

  handBContainer.innerHTML = `<img src="./PNG-cards-1.3/${secondHand[0].bild}.png"/>`;
  handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${secondHand[1].bild}.png"/>`;

  firsthand = true; // Spelaren är på första handen
  handAContainer.style.border = ''; // Gör så att ramen runt den vänstra containern syns


  showingButtons();

}


function canSplit() {
  /* Denna funktion tar reda på spelaren får splitta eller ej*/
  if ((playerCards[0].value == playerCards[1].value) && (playerCards.length == 2) && (hasSplit === false) && (player.chips/player.bet) >= 1) {
    return true;
    
  } else {
    return false;
  }
}

function canDoubleDown() {
  /* Denna funktion kollar om spelaren får göra double down eller ej*/
  if (secondHand.length == 2 && (player.chips/player.bet2) >= 1 && firsthand === false && hasSplit === true){
    return true;
  } else if (playerCards.length == 2 && (player.chips/player.bet) >= 1) {
    return true;
  } else {
    return false;
    
  }
}


function nyKortlek(){
  /*Denna funktion lägger in nya kort i objektet Kort, i form av bild och kortvärde */
  for (let j = 0; j < 6; j++) {
    for (let i = 2; i <= 14; i++){
        if (i == 14) { // Om det är ett ess får kortet 10
            cardvalue = 11;
        } else if ( i > 10) { // Om det är 10, knäckt, drottning eller kung får dessa värdet 10
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

function gameOver(){
  victoryText.innerHTML = 'Inga chips kvar'
  playerCardImage.innerHTML = "";
  dealerCardImage.innerHTML = "";
  handAContainer.innerHTML = "";
  handBContainer.innerHTML = "";
  standButton.innerHTML = "";
  hitButton.innerHTML = "";
  doubledownButton.innerHTML = "";
  splitButton.innerHTML = "";
  betAmount.innerHTML = "";
  amountChips.innerHTML = "";
}

function startMenu(){
  if (continueButtonOff === true){
    return'';
  }
  continueButtonOff = true; // Stänger av continue knappen
  continueButton.innerHTML =""; // Tar bort bilden för continue

  if (player.chips === 0){
    gameOver();
    return''
  }
  menuButtonsOff = false; // Sätter igång start knappen
  startDealing.innerHTML = `<img src="./images/Start-Button.png"/>`; // Lägger till bilden på start knappen
  hasSplit = false;

  amountChips.style.color = '#79e217'; // Återställer färgerna som de var innan split funktionen kallades
  betAmount.style.color = '#79e217';

  player.bet = 0; //resettar bet samt poäng från kort
  player.points = 0;

  //Alla bilder på kort försvinner
  playerCardImage.innerHTML = "";
  dealerCardImage.innerHTML = "";
  handAContainer.innerHTML = "";
  handBContainer.innerHTML = "";

  betAmount.innerHTML = `Bet: ${player.bet}`;
  amountChips.innerHTML = `Chips: ${player.chips}`;
  victoryText.innerHTML = ""; 
  
  
  // Bilder på de olika chipsen
  betting1.innerHTML = `<img src="./images/chips50.png"/>`;
  betting2.innerHTML = `<img src="./images/chips100.png"/>`;
  betting3.innerHTML = `<img src="./images/chips500.png"/>`;
  betting4.innerHTML = `<img src="./images/chips1000.png"/>`;
  betting5.innerHTML = `<img src="./images/allIn.png"/>`;

}


function startOfGame(){
  if (menuButtonsOff === true){ // en ny runda får ej starta medan en annan är igång
    return'';
  }
  if (player.bet <= 0){ // rundan får ej starta om man inte bettat något
    return'';
  }
  if (kortlek.stack.length <= 26){ //Om det är mindre eller lika med 26 kort kvar läggs det till nya kort i leken
    kortlek.stack = []
    nyKortlek();
  }

  hitStandOff = false;
  menuButtonsOff = true;
  startDealing.innerHTML = "";
  betting1.innerHTML = "";
  betting2.innerHTML = "";
  betting3.innerHTML = "";
  betting4.innerHTML = "";
  betting5.innerHTML = "";

  kortlek.blanda();
  playerCards = [];
  dealerCards = [];

  currentCard = kortlek.dra_kort(); //Drar kortet för spelaren
  playerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; //Bilden på kortet visas
  playerCards.push(currentCard); //Lägger till kort till spelarens hand

  currentCard = kortlek.dra_kort();
  dealerCard1 = currentCard; //Används för att senare kunna visa framsidan av kortet
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/kort_baksida.png"/>`; // Baksidan på första kortet visas
  dealerCards.push(currentCard); //Lägger till kort till dealerns hand

  currentCard = kortlek.dra_kort();
  playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; //Bilden på kortet visas
  playerCards.push(currentCard); //Lägger till kort till spelarens hand

  currentCard = kortlek.dra_kort();
  dealerCard2 = currentCard;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; //Bilden på kortet visas
  dealerCards.push(currentCard); //Lägger till kort till dealerns hand

  playerValues();
  dealerValues();
  
  if (player.points === 21 && dealerPoints === 21){ // Om både dealer och spelare har fått blackjack
    victoryText.innerHTML ='Push';
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`; //Visar båda kort som tillhör dealern
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; //Continue knapp visas
    continueButtonOff = false; // Gör så att continue knappen kan användas
    player.chips += player.bet; // Ger tillbaka det spelaren har bettat
    return '';
  
  } else if (player.points === 21){ // Om spelaren har fått blackjack
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`; //Visar båda kort som tillhör dealern
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML =`Du vann $${1.5*player.bet}`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; //Continue knapp visas
    continueButtonOff = false; // Gör så att continue knappen kan användas
    player.chips += 2.5*player.bet; // Spelaren får tillbaka chips beroende på vad spelaren har bettat
    return '';
  
  } else if (dealerPoints === 21) { //Om dealern får blackjack
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`; //Visar båda kort som tillhör dealern
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    victoryText.innerHTML ='Dealern fick BLACKJACK';
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; //Continue knapp visas
    continueButtonOff = false; // Gör så att continue knappen kan användas
    return '';
  }
  
  showingButtons ();
}

function showingButtons (){
  
  if (canSplit()) {
    // Visar knapparna split, hit, stand och double down till

    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
    splitButton.innerHTML = `<img src="./images/splitbutton.png"/>`;

  } else if (canDoubleDown()) {
    splitButton.innerHTML = ""; //Tar bort bilden för Split

    //Visar knapparna hit, double down & stand
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`;
    doubledownButton.innerHTML = `<img src="./images/doubledownbutton.png"/>`;
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`;
    } else {
    hitButton.innerHTML = `<img src="./images/hitbutton.png"/>`; // Visar hit knappen
    standButton.innerHTML = `<img src="./images/standbutton.png"/>`; // Visar stand knappen
    splitButton.innerHTML = ""; //Tar bort bilden för Split
    doubledownButton.innerHTML = ""; //Tar bort bilden för double down
    }
}

//Huvudprogram
let kortlek = new Kortlek(); //Skapar en kortlek
startMenu();



// Alla knappar och dess funktioner
splitButton.addEventListener("click", split) // Split, delar högen i två
hitButton.addEventListener("click", hit) // Hit, tar upp ett nytt kort
standButton.addEventListener("click", stand) // Stand
doubledownButton.addEventListener("click", doubleDown) // Double down

betting1.addEventListener("click", bet1)
betting2.addEventListener("click", bet2)
betting3.addEventListener("click", bet3)
betting4.addEventListener("click", bet4)
betting5.addEventListener("click", allIn)

startDealing.addEventListener("click", startOfGame) // Knapp för att starta rundan
continueButton.addEventListener("click",startMenu) // Knapp för att gå vidare till menyn

