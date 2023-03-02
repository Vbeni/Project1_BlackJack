//initialize deck of 52 cards
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

let deck = []; 

for (let i = 0; i < cardValues.length; i++){
  for (let j = 0; j < suits.length; j++){
    deck.push(cardValues[i] + ' of ' + suits[j]);

  }
};
// console.log(deck);
//shuffle deck of cards
function shuffleDeck(){
for (let i = 0; i < deck.length; i++){
  let j = Math.floor(Math.random() * deck.length); 
  let temp = deck[i];
  deck[i] = deck[j];
  deck[j] = temp;
 }
};

shuffleDeck(deck);
console.log(deck);
// // deal 2 cards to player and 2 cards to dealer 
// let playerHand =  []; 
// let dealerHand = [];

// function dealCard(){

// }; //.pop to remove cards from deck ? 
// //check if either player or dealer have blackjack(21)
// function hasBlackJack(){

// };
// //28 ways to get blackjack. Hard Code?
//   //if player has blackjack, player wins
// function hasBlackJack(playerHand){

// };
//   //if dealer has blackjack, dealer wins
// function hasBlackJack(dealerHand){

// };
//   //if neither have blackjack then player turn
// function playerTurn(){        //player chooses to hit or stand 
//                               //if player hits then deal another card
//                               //if player hand > 21 , dealer wins 
// };

//   //if player stands, then dealers turn
// function dealerTurn(){
//                               //if dealers hand > 17, hit until <=17 
// };

// function whoWon(){             //if dealer hand > 21, then player wins 
//                                //if player hand is close to 21 than dealer, player wins
//                                //if dealer hand is closer to 21 then dealer wins
//                                //if hands are = then tie is declared

// };

// function reShuffle(){          //PLAY AGAIN
                             
// };    
  
// //MAYBE if time allows, introduce 'HARD' mode 3rd player that hits or stands based on remaining cards in deck 