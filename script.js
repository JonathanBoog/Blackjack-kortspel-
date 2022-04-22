/**
 * Knäckt = 11
 * Drottning = 12
 * Kung = 13
 * Ess = 14
 */


// En klass f
erales r
let player = {
    chips: 100,  // Antal pengar
    bet: 0, // Player current bet


points: 0, // Antal poäng den rundan
}
för// Ett Objekdetolika kortel

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
      `Du drar ${draget_kort.färg} ${draget_kort.valör}`
      return draget_kort;
    }
  
    // Visa korten som finns i leken (I ordning)
    visa_lek() {
      this.stack.forEach((kort) => {
        console.log(kort.färg, kort.valör);
      });
    }
  
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
  
  for (let i = 0; i< färger.length;i++){
    for (let j = 0; j < valörer.length;j++){
      let kort = new Kort(valörer[j], färger[i])
      kortlek.lägg_till_kort(kort);

var card = {
}

  for (let j = 0; j < 6; j++) {
    for (let i = 2; i <= 14; i++){
        if (i == 14) {
            cardvalue = 11;
        } else if ( i > 10) {
            cardvalue = 10;
        } else {
            cardvalue = i;
        }
        card[`${i}_of_clubs`] = cardvalue;
        card[`${i}_of_diamonds`] = cardvalue;
        card[`${i}_of_diamonds`] = cardvalue;
        card[`${i}_of_spades`] = cardvalue;
    
    }

}
console.log(card.klöver10)

playerCards = []
dealerCards = []