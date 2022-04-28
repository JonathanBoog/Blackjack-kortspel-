 

// En klass för spelaren
let player = {
  chips: 100,  // Antal pengar
  bet: 0, // Antal satsade pengar
  points: 0, // Antal poäng
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
  
function hit(list) {
  currentCard = kortlek.dra_kort();
  //cardImage.innerHTML = `<img src="./images/${currentImage}" />`;
  list.push(currentCard)
}

function doubleDown() {
  player.chips -= player.bet;
  player.bet = player.bet * 2;
}

function stand() {
  return true;
}

function split() {
  let handA = [];
  let handB = [];
  handA.push(playerCards[0]);
  handB.push(playerCards[1]);
  playerCards = []
  hit(handA);
  hit(handB);
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


  bet = Number(prompt('Vad är ditt bet?'))
  player.chips -= bet
  player.bet = bet
  
  kortlek.blanda();
  playerCards = [];
  dealerCards = [];
  let dealerPoints = 0;

  currentCard = kortlek.dra_kort();
  //cardImage.innerHTML = `<img src="./images/${currentImage}" />`;
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
  console.log(player.points,dealerPoints)
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

  while (true){
    if (canSplit()) {
      question1 = prompt('Vad vill du göra? --> split[s] hit[h] double down[d] stand[t]')
    } else if (canDoubleDown()) {
      question2 = prompt('Vad vill du göra? --> hit[h] double down[d] stand[t]')
    }
    if (player.points > 21 ){
      console.log('Bust')
    }
    
    console.log(playerCards, dealerCards)
    console.log(player.points)

  }
}