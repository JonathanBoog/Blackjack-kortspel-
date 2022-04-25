/**
 * Knäckt = 11
 * Drottning = 12
 * Kung = 13
 * Ess = 14
 */


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
  
  
const kortlek = new Kortlek();


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
  console.log('push')
} else if (player.points === 21){
  console.log('Du fick BLACKJACK')
}
console.log(playerCards, dealerCards)