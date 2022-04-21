var card = {
}
for (let i = 2; i <= 14; i++){
    if (10 < i < 14) {
        cardvalue = 10;
    } else if ( i == 14) {
        cardvalue = 11;
    } else {
        cardvalue = i;
    }
    card[`${i}_of_clubs`] = cardvalue;
    card[`${i}_of_diamonds`] = cardvalue;
    card[`${i}_of_diamonds`] = cardvalue;
    card[`${i}_of_spades`] = cardvalue;
    
}
console.log(card.klöver10)