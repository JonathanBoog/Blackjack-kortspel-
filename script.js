

//Variabler
let hasSplit = false; // Om man har splittat
let secondHand = []; // Andra handens kortlista vid split
let firsthand = false //Om spelaren vid split är på sin första hand eller ej 
let bust = false; // Om bust eller ej
let playerCards; // Spelarens kort, denna lista används både som den vanliga kortlistan och även som första handens lista
let dealerCards; // Dealerns kort
let dealerPoints; // Dealerns sammanlagda poäng på kort
let dealerCard1; // Dealerns första kort
let dealerCard2; // Dealerns andra kort
let bustFirstHand = false; // Används vid split; om första hand har bustat
let bustSecondHand = false; // Används id split; om andra hand har bustat
let menuButtonsOff; // Används för att stänga av menyknapparna när rundan startar, som t.ex start knappen, bet knappen m.m
let continueButtonOff = false; // Off för continue knappen
let hitStandOff = true; // Används för att stänga av hit samt stand när de inte ska kunna användas

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
let handAContainer = document.getElementById("handA-container"); // Den vänstra/första handens container vid split
let handBContainer = document.getElementById("handB-container");  // Den högra/andra handens container vid split
handAContainer.style.border = 'transparent'; // Gör border osynlig
handBContainer.style.border = 'transparent'; // Gör border osynlig


let victoryText = document.getElementById("header-text"); // Text som visas om man har vunnit eller ej
let betAmount = document.getElementById("bet-text"); // Visar mängden som spelaren har bettat ; Den kan även visa status för första/vänstra handen
let amountChips = document.getElementById("amount-chips"); // visar antalet chips som spelaren har ; Den kan även visa status för andra/högra handen
let startDealing = document.getElementById("start-button-container"); //Start knapp
let continueButton = document.getElementById("continue-button-container"); //Återvända till meny knapp


let betting1 = document.getElementById("button-betting1-container"); // bet 50
let betting2 = document.getElementById("button-betting2-container"); // bet 100
let betting3 = document.getElementById("button-betting3-container"); // bet 500
let betting4 = document.getElementById("button-betting4-container"); // bet 100
let betting5 = document.getElementById("button-betting5-container"); // All in



// Ett objekt för spelaren
let player = {
  chips: 250,  // Antal pengar
  bet: 0, // Antal satsade pengar
  bet2: 0, // Antal satsade pengar för andra handen
  points: 0, // Antal poäng
  points2: 0, //Används för andra handen i split
  
}

// Klass för att skapa spelkort
class Kort {
    constructor(bild, value) {
      this.bild = bild; // Bildnamnet
      this.value = value; // Värdet för ett kort
    }
  }
  
  // Klass för stack
  class Kortlek {
    constructor() {
      this.stack = []; // Själva listan för kortleken
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

function nyKortlek(){
  /*Denna funktion lägger in nya kort i objektet Kort, i form av bild och kortvärde */

  // Notera att sex stycken kortlekar används här i programmet
  for (let j = 0; j < 6; j++) {
    for (let i = 2; i <= 14; i++){
        if (i == 14) { // Om det är ett ess får kortet 10
            cardvalue = 11;
        } else if ( i > 10) { // Om det är knäckt, drottning eller kung får dessa värdet 10
            cardvalue = 10;
        } else {
            cardvalue = i; // resten får samma värde som deras siffra, t.ex har siffran 7 värdet 7
        }
        let kort = new Kort(`${i}_of_clubs`, cardvalue); //Bildnamn samt kort värde läggs in
        kortlek.lägg_till_kort(kort); // Kortet läggs till i kortleken
        kort = new Kort(`${i}_of_diamonds`, cardvalue);
        kortlek.lägg_till_kort(kort);
        kort = new Kort(`${i}_of_diamonds`,cardvalue);
        kortlek.lägg_till_kort(kort);
        kort = new Kort(`${i}_of_spades`, cardvalue);
        kortlek.lägg_till_kort(kort);
        
    }
  }
}



//Totala värden på dealerns kort
function dealerValues(){
  /* Denna funktion beräknar totala värdet på dealerns kort, och sedan returnerar det värdet */
  dealerPoints = 0;
  for (b in dealerCards){ //Går igenom de olika kort i dealerns kortlista
    dealerPoints += dealerCards[b].value;
  }
  return dealerPoints;
}

//Spelarens värden på kort
function playerValues(){
  /* Denna funktion beräknar totala värdet på korten som spelaren har, och sedan returnerar det värdet */
  player.points = 0;
  for (j in playerCards){ //Går igenom de olika kort i spelarens kortlista
    player.points += playerCards[j].value;
  }
  return player.points;
}

//Andra handens värden på kort
function playerValues2() {
  /* Denna funktion beräknar totala värdet på korten som spelaren har i den andra handen, och sedan returnerar det värdet */
  player.points2 = 0;
  for (j in secondHand){  //Går igenom de olika kort i spelarens andra hands kortlista
    player.points2 += secondHand[j].value;
  }
  return player.points2;
}

function showingButtons (){
  /* Bestämmer vilka knappar som ska synas under spelomgången. 
  De knappar som kontrolleras av funktionen: hit, stand, split, eller double down */
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



function startMenu(){
  if (continueButtonOff === true){
    return'';
  }
  continueButtonOff = true; // Stänger av continue knappen
  continueButton.innerHTML =""; // Tar bort bilden för continue

  if (player.chips === 0){ // Vid 0 chips/marker avslutas spelet
    gameOver();
    return''
  }
  menuButtonsOff = false; // Sätter igång start knappen
  startDealing.innerHTML = `<img src="./images/Start-Button.png"/>`; // Lägger till bilden på start knappen
  hasSplit = false;

  amountChips.style.color = '#ffffff'; // Återställer färgerna som de var innan split funktionen kallades
  betAmount.style.color = '#ffffff';

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

function bet1(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 50){ //Om spelaren har tillräckligt med chips för att kunna betta 50
    player.bet += 50;
    player.chips -=50;
    betAmount.innerHTML = `Bet: ${player.bet}`; //Uppdaterar spelarens bet
    amountChips.innerHTML = `Chips: ${player.chips}`; //Uppdaterar antalet chips som spelaren har
  }
}
function bet2(){
  if (menuButtonsOff === true){  //Om betting knappen är avstängd eller ej
    return'';
  }
  if(player.chips >= 100){ //Om spelaren har tillräckligt med chips för att kunna betta 100
    player.bet += 100;
    player.chips -=100;
    betAmount.innerHTML = `Bet: ${player.bet}`; //Uppdaterar spelarens bet
    amountChips.innerHTML = `Chips: ${player.chips}`; //Uppdaterar antalet chips som spelaren har
  }
}

function bet3(){
  if (menuButtonsOff === true){ //Om betting knappen är avstängd eller ej
    return'';
  }
  if(player.chips >= 500){ //Om spelaren har tillräckligt med chips för att kunna betta 500
    player.bet += 500;
    player.chips -=500;
    betAmount.innerHTML = `Bet: ${player.bet}`; //Uppdaterar spelarens bet
    amountChips.innerHTML = `Chips: ${player.chips}`; //Uppdaterar antalet chips som spelaren har
  }
}

function bet4(){
  if (menuButtonsOff === true){ // stänger av betting knappen när rundan startar
    return'';
  }
  if(player.chips >= 1000){ //Om spelaren har tillräckligt med chips för att kunna betta 1000
    player.bet += 1000;
    player.chips -=1000;
    betAmount.innerHTML = `Bet: ${player.bet}`; //Uppdaterar spelarens bet
    amountChips.innerHTML = `Chips: ${player.chips}`; //Uppdaterar antalet chips som spelaren har
  }
}

function allIn(){
  if (menuButtonsOff === true){  //Om betting knappen är avstängd eller ej
    return'';
  }
    player.bet += player.chips;
    player.chips = 0;
    betAmount.innerHTML = `Bet: ${player.bet}`; //Uppdaterar spelarens bet
    amountChips.innerHTML = `Chips: ${player.chips}`; //Uppdaterar antalet chips som spelaren har
}


function startOfGame(){
  if (menuButtonsOff === true){ // en ny runda får ej starta medan en annan är igång
    return'';
  }
  if (player.bet <= 0){ // rundan får ej starta om man inte har bettat något
    return'';
  }
  if (kortlek.stack.length <= 26){ //Om det är mindre eller lika med 26 kort kvar läggs det till nya kort i leken
    kortlek.stack = [] // listan blir resettad
    nyKortlek(); // Ny hög av kort skapas
  }

  hitStandOff = false; // Möjligheten att använda knapparna stand och hit är nu möjlig
  menuButtonsOff = true; // Meny knapparna stängs av
  
  //Meny knapparnas bilder tas bort
  startDealing.innerHTML = "";
  betting1.innerHTML = "";
  betting2.innerHTML = "";
  betting3.innerHTML = "";
  betting4.innerHTML = "";
  betting5.innerHTML = "";

  kortlek.blanda(); // Kortleken blandas
  playerCards = []; // listan blir resettad 
  dealerCards = []; // listan blir resettad

  currentCard = kortlek.dra_kort(); //Drar kortet för spelaren
  playerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; //Bilden på kortet visas
  playerCards.push(currentCard); //Lägger till kort till spelarens hand

  currentCard = kortlek.dra_kort(); //Drar kortet för dealern
  dealerCard1 = currentCard; //Används för att senare kunna visa framsidan av kortet
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/kort_baksida.png"/>`; // Baksidan på första kortet visas
  dealerCards.push(currentCard); //Lägger till kort till dealerns hand

  currentCard = kortlek.dra_kort(); //Drar kortet för spelaren
  playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; //Bilden på kortet visas
  playerCards.push(currentCard); //Lägger till kort till spelarens hand

  currentCard = kortlek.dra_kort(); //Drar kortet för dealern
  dealerCard2 = currentCard; //Används för att senare kunna få det vända kortet i rätt ordning.
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; //Bilden på kortet visas
  dealerCards.push(currentCard); //Lägger till kort till dealerns hand

  playerValues(); //Uppdaterar totala värdena för spelarens kort
  dealerValues(); //Uppdaterar totala värdena för dealerns kort
  
  if (player.points === 21 && dealerPoints === 21){ 
    // Om både dealer och spelare har fått blackjack
    victoryText.innerHTML ='Push';
    dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`; //Visar båda kort som tillhör dealern
    dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; //Continue knapp visas
    continueButtonOff = false; // Gör så att continue knappen kan användas
    player.chips += player.bet; // Ger tillbaka det spelaren har bettat
    return '';
  
  } else if (player.points === 21){
    // Om spelaren har fått blackjack
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
  
  showingButtons (); //Uppdatering av bilderna till knapparna hit, stand, split & double down
}


function canSplit() {
  /* Denna funktion tar reda på spelaren får splitta eller ej*/
  if ((playerCards[0].value == playerCards[1].value) && (playerCards.length == 2) && (hasSplit === false) && (player.chips/player.bet) >= 1) {
    // Om spelarens har två likadana kort   ; om spelaren endast har två kort i handen  ;  om spelaren har splittat ; om spelaren har tillräcklig med chips för att splitta
    return true;
    
  } else {
    return false;  //Kan ej använda split funktionen
  }
}

function canDoubleDown() {
  /* Denna funktion kollar om spelaren får göra double down eller ej*/
  if (secondHand.length == 2 && (player.chips/player.bet2) >= 1 && firsthand === false && hasSplit === true){
    //Har endast två kort i handen; tillräcklig med chips för att splitta; spelaren är på första handen eller ej; om spelaren har splittat
    return true;
  } else if (playerCards.length == 2 && (player.chips/player.bet) >= 1) { // Vid split & första handen används denna if-sats också för att använda double down
    return true;
  } else {
    return false; //Kan ej använda double down funktionen
    
  }
}


// Hit
function hit() {
  /* Lägger till ett kort i spelarens hand*/
  if (hitStandOff === true){ // Om hit knappen är av eller ej
    return''
  }
  if (hasSplit === true) { // Om spelaren har splittat
    if (firsthand === true) { // Om spelaren är på första hand
      // Första hand
      currentCard = kortlek.dra_kort(); // Drar kort
      handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Lägger till bild i den vänstra handen
      playerCards.push(currentCard); // Lägger till kortet i kortlistan

    } else { // Om spelaren är på andra handen
      
      //Andra hand
      currentCard = kortlek.dra_kort(); // Drar kort
      handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Lägger till bild i den högra handen
      secondHand.push(currentCard); // Lägger till kortet i andra handens kortlista

      //
      //Gör om eventuella värden på ess till 1 beroende på om spelaren har det totala poängen/värdet över 21 eller ej
      if (playerValues2() > 21){
        for (i in secondHand){
          if (secondHand[i].value === 11){ // Om spelaren har ett ess med värdet 11
            secondHand[i].value = 1; // Byter värde på ess kortet till 1
            playerValues2(); //Uppdaterar andra handens totala värden på korten
            if (player.points2 <= 21){ // Om spelaren har mindre eller lika med 21
              break;
            }
          }
        }
      }
      if (playerValues2() > 21){ // Om spelaren fortfarande har över 21
        amountChips.innerHTML ='Bust'; // Bust skrivs ut
        bustSecondHand = true; 
        stand(); 
        return''
      }
    }
  } else {
    // Den vanliga handen
    currentCard = kortlek.dra_kort(); // Drar kort
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Lägger till bild i den vanliga handens container
    playerCards.push(currentCard); // Lägger till kortet i spelarens kortlista
  }  
    
  if (hasSplit === false || firsthand === true){ //Om spelaren är på den vanliga handen eller den första handen
     
    //Gör om eventuella värden på ess till 1 beroende på om spelaren har det totala poängen/värdet över 21 eller ej
    if (playerValues() > 21){ 
      for (i in playerCards){
        if (playerCards[i].value === 11){ // Om spelaren har ett ess med värdet 11
          playerCards[i].value = 1; //Byter värde på ess kortet till 1
          if (playerValues() <= 21){ // Om spelaren har mindre eller lika med 21
            break;
          }
        }
      }
    }
    if ((playerValues() > 21) && hasSplit === false){  // Om spelaren fortfarande har över 21 och inte har splittat
      victoryText.innerHTML ='Bust'; // Spelaren får bust med vanliga handen
      bust = true;
      stand();
      return''
    
    } else if (playerValues() > 21 && hasSplit === true){ // Om spelaren fortfarande har över 21 och har splittat
      betAmount.innerHTML ='Bust'; // Spelaren får bust med vänstra/första handen
      bustFirstHand = true;
      stand(); 
      return''
    }
      
  }
  showingButtons();  //Uppdatering av bilderna till knapparna hit, stand, split & double down
}

function doubleDown() {
  if(canDoubleDown() === false){ //Om spelaren får använda double down eller ej
    return'';
  }
  if (hasSplit === true){ //Om spelaren har använt split
      
    if(firsthand === true){
      //Första hand
      player.chips -= player.bet
      player.bet = player.bet*2
      betAmount.innerHTML = `Bet: ${player.bet}`; // Bet uppdateras
        
      currentCard = kortlek.dra_kort(); // Drar kort
      handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Bilden på kortet läggs in i den första/vänstra handens container 
      playerCards.push(currentCard); //Kortet läggs till i kortlistan
    } else {

      // Andra hand
      player.chips -= player.bet2
      player.bet2 = player.bet2*2 
      amountChips.innerHTML = `Bet: ${player.bet2}`;  // Bet uppdateras
        
      currentCard = kortlek.dra_kort(); // Drar kort
      handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Bilden på kortet läggs in i den andra/högra handens container 
      secondHand.push(currentCard); // Kort läggs i andra handens kortlisa
      
      //Gör om eventuella värden på ess till 1 beroende på om spelaren har det totala poängen/värdet över 21 eller ej
      if (playerValues2() > 21){
        for (i in secondHand){
          if (secondHand[i].value === 11){ // Om spelaren har ett ess med värdet 11
            secondHand[i].value = 1; // Byter värde på ess kortet till 1
            playerValues2(); //Uppdaterar andra handens totala värden på korten
            if (player.points2 <= 21){ // Om spelaren har mindre eller lika med 21
              break;
            }
          }
        }
      }
      if (playerValues2() > 21){ // Om spelaren fortfarande har över 21
        amountChips.innerHTML ='Bust'; // Bust för den andra/högra handen
        bustSecondHand = true;
        stand();
        return''
      } else { // om spelaren är under 21
        stand();
        return''
      }
    }
    
  } else {

    //Vanliga handen
    player.chips -= player.bet;
    player.bet = player.bet*2;
    betAmount.innerHTML = `Bet: ${player.bet}`; // Bet uppdateras
    amountChips.innerHTML = `Chips: ${player.chips}`; // Chips uppdateras
    currentCard = kortlek.dra_kort(); // Drar kort
    playerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Bilden på kortet läggs in i den vanliga handens container 
    playerCards.push(currentCard);  //Lägger till kort i spelarens kortlista
  }
  
  //Gör om eventuella värden på ess till 1 beroende på om spelaren har det totala poängen/värdet över 21 eller ej
  if (playerValues() > 21){ 
    for (i in playerCards){
      if (playerCards[i].value === 11){ // Om spelaren har ett ess med värdet 11
        playerCards[i].value = 1; //Byter värde på ess kortet till 1
        if (playerValues() <= 21){ // Om spelaren har mindre eller lika med 21
          break;
        }
      }
    }
  }
  if ((playerValues() > 21) && hasSplit === false){  // Om spelaren fortfarande har över 21 och inte har splittat
    victoryText.innerHTML ='Bust'; // Spelaren får bust med vanliga handen
    bust = true;
    stand();

  } else if (playerValues() > 21 && hasSplit === true) {
    betAmount.innerHTML ='Bust'; // Spelaren får bust med första/vänstra handen
    bustFirstHand = true;
    stand();
  } else {
    stand();
  }
}



function split() {
  if(canSplit() === false){ // Om spelaren får använda split eller ej
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
  secondHand.push(playerCards[1]); // Lägger till ett av korten från den vanliga handens kortlista till den andra handens kortlista
  playerCards.pop(); // Ett av korten tas bort
  
  currentCard = kortlek.dra_kort(); // Drar nytt kort för den andra handen
  secondHand.push(currentCard); //Lägger till kortet i andra handens lista
  
  currentCard = kortlek.dra_kort(); // Drar nytt kort för den första handen
  playerCards.push(currentCard); //Lägger till till kortet i första handens lista
  
  // Visar de kort som lagts till i båda händerna
  handAContainer.innerHTML = `<img src="./PNG-cards-1.3/${playerCards[0].bild}.png"/>`; //Bild läggs in i den vänstra/första handens container
  handAContainer.innerHTML += `<img src="./PNG-cards-1.3/${playerCards[1].bild}.png"/>`; //Bild läggs in i den vänstra/första handens container

  handBContainer.innerHTML = `<img src="./PNG-cards-1.3/${secondHand[0].bild}.png"/>`; //Bild läggs in i den högra/andra handens container
  handBContainer.innerHTML += `<img src="./PNG-cards-1.3/${secondHand[1].bild}.png"/>`; //Bild läggs in i den högra/andra handens container
 
  firsthand = true; // Spelaren är på första handen
  handAContainer.style.border = ''; // Gör så att ramen runt den vänstra containern syns


  showingButtons(); //Uppdatering av bilderna till knapparna hit, stand, split & double down

}

function stand() {
  if (hitStandOff === true){ // Om spelaren får använda stand eller ej
    return''
  }
  if(firsthand === true){ // Om spelaren är på vänstra/första handen,
    //Byter hand från höger till vänster (första till andra handen)
    firsthand = false; 
    handAContainer.style.border = 'transparent'; // Ramen på den vänstra/första handen försvinner
    handBContainer.style.border = ''; // Ramen på den högra/andra handen dyker upp
    return''
  }

  handBContainer.style.border = 'transparent'; // Gör vänstra/andra handens container ram transparent
    
  continueButtonOff = false; // Gör så att knappen "Continue" går att användas
  hitStandOff = true; // Knapparna stand och hit stängs av
  
  //Visar dealerns kort och det är här som dealerCard1 och dealerCard2 kommer till användning
  dealerCardImage.innerHTML = `<img src="./PNG-cards-1.3/${dealerCard1.bild}.png"/>`;
  dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${dealerCard2.bild}.png"/>`;

  //Tar bort bilderna på knapparna
  doubledownButton.innerHTML = `<img src=""/>`;
  splitButton.innerHTML = `<img src=""/>`;
  standButton.innerHTML = `<img src=""/>`;
  hitButton.innerHTML = `<img src=""/>`;

  
  if (bust === true || (bustFirstHand && bustSecondHand) === true){ // Om spelaren har bustat, visas endast de två kort som dealern har blivit tilldelad
    null;
  } else { // Dealern får nya kort
    while (dealerValues() <17 || (dealerCards[0].value && dealerCards[1].value) === 11){ //Loopar så länge totala värdet på dealerns kort är under 17, eller om spelaren har två kort som är två ess
      currentCard = kortlek.dra_kort(); // Drar kort
      dealerCardImage.innerHTML += `<img src="./PNG-cards-1.3/${currentCard.bild}.png"/>`; // Bilden läggs in i bild containern för dealern
      dealerCards.push(currentCard); // Kortet läggs in i dealerns kortlista
      
      //Gör om eventuella värden på ess till 1 beroende på om spelaren har det totala poängen/värdet över 21 eller ej
      if (dealerValues() > 21){
        for (i in dealerCards){
          if (dealerCards[i].value === 11){ // Om dealern har ett ess med värdet 11
            dealerCards[i].value = 1; //Byter värde på ess kortet till 1
            dealerValues(); // Uppdaterar totala värdet på korten
            if (dealerPoints <= 21){ // Om dealern har mindre eller lika med 21
              break;
                
            }
          }
        }
      } 
    }
  }

  // If statement för om spelaren har splittat eller ej
  if (hasSplit === true){ // Om spelaren har splittat
    // Efter att ha gått igenom första handen går programmet genom andra handen
    
    // Första hand
    if (bustFirstHand === true){ // Om spelarens första hand bustar
      bustFirstHand = false; 
      
    } else if (dealerPoints > 21){ // Dealer bustar
      betAmount.innerHTML =`Du vann $${player.bet}`;
      player.chips += 2*player.bet;
        
    } else {
        if (playerValues() === dealerPoints){ // Om första handens totala poäng är samma som dealerns
          betAmount.innerHTML = 'Push';
          player.chips += player.bet;
        } else if (player.points > dealerPoints){ // Om första handens totala poäng är mer än dealerns
          betAmount.innerHTML =`Du vann $${player.bet}`
          player.chips += 2*player.bet;
        } else if (player.points < dealerPoints ) {  // Om första handens totala poäng är mindre än dealerns
          betAmount.innerHTML ='Dealer vann';
        }
    }
     // Andra hand 
    if (bustSecondHand === true){ // Om spelarens andra hand bustar
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`;
      bustSecondHand = false;
      return ''
    } else if (dealerPoints > 21){ // Dealer bustar
      amountChips.innerHTML =`Du vann $${player.bet2}`;
      player.chips += (2*player.bet2);
    } else {
      if (playerValues2() === dealerPoints){ // Om spelarens andra handa totala poäng är samma som dealerns
        amountChips.innerHTML = 'Push';
        player.chips += player.bet2;

      } else if (player.points2 > dealerPoints){
        amountChips.innerHTML =`Du vann $${player.bet2}`;
        player.chips += 2*player.bet;

      } else if (player.points2 < dealerPoints ) {
        amountChips.innerHTML ='Dealer vann';

      }
    }
      
    continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; // Visar continue knappen
    return'';
      
  } else {

    //Den vanliga handen
    if (bust === true){ // Vid bust
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; // Visar continue knappen
      bust = false;
      return '';
    
    } else if (dealerValues() > 21){ // Dealern bustar
      victoryText.innerHTML =`Du vann $${player.bet}`;
      player.chips +=  2*player.bet;
      continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; // Visar continue knappen
      return'';
      
    } else {
      if (player.points === dealerPoints){ // Spelaren har samma poäng som dealern
        victoryText.innerHTML = 'Push';
        player.chips += player.bet;
        continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; // Visar continue knappen
        return '';
      } else if (player.points > dealerPoints){ // Spelaren har mer poäng än dealern
        victoryText.innerHTML =`Du vann $${player.bet}`;
        player.chips += 2*player.bet;
        continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; // Visar continue knappen
        return '';
      } else if (player.points < dealerPoints ) { // Spelaren har mindre poäng än dealern
        victoryText.innerHTML ='Dealer vann';
        continueButton.innerHTML =`<img src="./images/continue-button.png"/>`; // Visar continue knappen
        return '';
      }
    }
  }
}


function gameOver(){
  victoryText.innerHTML = 'Inga chips kvar' // Skriver ut allra sista meddelandet innan förlust
  
  //Under denna kommentar tas alla bilder bort som kan synas
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






/*    Huvudprogram  */
let kortlek = new Kortlek(); //Skapar en kortlek
startMenu(); // Startar menyn



// Alla knappar och dess funktioner
splitButton.addEventListener("click", split) // Split, delar högen i två
hitButton.addEventListener("click", hit) // Hit, tar upp ett nytt kort
standButton.addEventListener("click", stand) // Stand
doubledownButton.addEventListener("click", doubleDown) // Double down

betting1.addEventListener("click", bet1) // bet 50 knappen
betting2.addEventListener("click", bet2) // bet 100 knappen
betting3.addEventListener("click", bet3) // bet 500 knappen
betting4.addEventListener("click", bet4) // bet 100 knappen
betting5.addEventListener("click", allIn) // bet all in knappen

startDealing.addEventListener("click", startOfGame) // Knapp för att starta rundan
continueButton.addEventListener("click",startMenu) // Knapp för att gå vidare till menyn

