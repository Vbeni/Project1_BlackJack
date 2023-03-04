//initialize deck of 52 cards
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♥', '♦', '♣', '♠'];

let deck = []; 

for (let i = 0; i < cardValues.length; i++){
  for (let j = 0; j < suits.length; j++){
    deck.push(cardValues[i] + suits[j]);

  }
};
// console.log(deck);
//shuffle deck of cards
function shuffleDeck(){                   //Fisher-Yates shuffle algo
for (let i = deck.length -1; i > 0; i--){        
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
 }
 return deck;
};

// shuffleDeck();
// console.log(deck);

function dealCard(deck, hand){
  const card = deck.pop();
  return [card];
  
};

let playerHand =  []; 
let dealerHand = [];
let undealtCards = shuffleDeck(deck.slice()); //creates shuffled copy of deck to deal cards from 

playerHand.push(...dealCard(undealtCards));
dealerHand.push(...dealCard(undealtCards));// spread syntax to fix nested array issue 
playerHand.push(...dealCard(undealtCards));
dealerHand.push(...dealCard(undealtCards));


// console.log("Player Hand:", playerHand);
// console.log("Dealer Hand:", dealerHand);
// console.log("Undealt Cards:", undealtCards);
//check if either player or dealer have blackjack(21)
function hasBlackJack(hand){
let value = 0;                       //tracks point value
let aces = 0;                        //tracks aces

for (let i = 0; i < hand.length; i++){     //loop through each card in hand
  const card = hand[i];                    //gets current card from hand array
  if (card[0] == 'A'){                    //checks if current card is ace
    aces++;                               //if ace updates ace variable
    value += 11;                          //adds 11 to value since aces == 11 || 1 
  } 
  else if (card[0] == 'K' || card[0] == 'Q' || card[0] == 'J'){
   value += 10;                           //add 10 to value if K,Q,J
  } 
  else {
    value += parseInt(card);              //else add numeric value of card string
  }
}

for (let i = 0; i < aces.length; i++){       //loop through aces in hand
  if (value + 11 > 21){                      //checks if ace causes hand to 'bust'
    value += 1;                              //if bust add 1 to value
  } 
  else {
    value += 11;                             //if not bust add 11
  }
}

return value;                               //return value of hand
};

// console.log('Player hand Value ', hasBlackJack(playerHand));
// console.log('Dealer hand Value: ', hasBlackJack(dealerHand));

let playerTotal = hasBlackJack(playerHand);
let dealerTotal = hasBlackJack(dealerHand);

console.log(playerTotal);
console.log(dealerTotal);

function updateDisplay(){
 let playerHandDisplay =  document.querySelector('#player1-cards');
playerHandDisplay.innerHTML = '';
for(let i = 0; i < playerHand.length; i++){
  let cardDiv = document.createElement('div');
  cardDiv.innerHTML = playerHand[i];
  playerHandDisplay.appendChild(cardDiv);
}
let dealerHandDisplay = document.querySelector('#dealer-cards');
dealerHandDisplay.innerHTML = '';
for(let i = 0; i < dealerHand.length; i++){
  let cardDiv = document.createElement('div');
  cardDiv.innerHTML = dealerHand[i];
  dealerHandDisplay.appendChild(cardDiv);
}

let playerHandTotalDisplay = document.querySelector('#player1-sum');
playerHandTotalDisplay.innerHTML = hasBlackJack(playerHand);

let dealerTotalDisplay = document.querySelector('#dealer-sum');
dealerTotalDisplay.innerHTML = hasBlackJack(dealerHand);
}

function dealDealerCards(){
while(hasBlackJack(dealerHand) < 17){
  dealerHand.push(...dealCard(undealtCards));
  updateDisplay();
}
}
document.querySelector("#hit-button").addEventListener('click', function(){
  playerHand.push(...dealCard(undealtCards));
  updateDisplay();
  if(hasBlackJack(playerHand) > 21){
    console.log('Player 1 Busts/loses');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
  }
  
  });

document.querySelector("#stay-button").addEventListener('click', function(){
  dealDealerCards();
  updateDisplay();
  if (hasBlackJack(dealerHand) > 21){
    console.log('dealer busts/loses');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
  }
  else if (dealerTotal > playerTotal){
    console.log('dealer wins');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
  }
  else {
    console.log('the game is a tie');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
  }
}); 

document.querySelector('#reset-button').addEventListener('click',function(){
  deck = shuffleDeck(deck.slice());
  playerHand = [];
  dealerHand = [];
  undealtCards = shuffleDeck(deck.slice());
  playerHand.push(...dealCard(undealtCards));
  dealerHand.push(...dealCard(undealtCards));
  playerHand.push(...dealCard(undealtCards));
  dealerHand.push(...dealCard(undealtCards));
  updateDisplay();

  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stay-button").disabled = false;
})

updateDisplay();