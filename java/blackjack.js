const music = document.querySelector('#music');
music.volume = 0.03;
function toggleMusic(){
  if(music.paused){
    music.play();
  }
  else{
  music.pause();
  }
}
document.querySelector('#music-button').addEventListener('click', toggleMusic);
//initialize deck of 52 cards
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♥', '♦', '♣', '♠'];
const cardImages = {'2♥': './style/assets/2_hearts.png','3♥':'./style/assets/3_hearts.png', '4♥': './style/assets/4_hearts.png', '5♥': './style/assets/5_hearts.png', '6♥' : './style/assets/6_hearts.png', '7♥' : './style/assets/7_hearts.png', '8♥': './style/assets/8_hearts.png', '9♥': './style/assets/9_hearts.png', '10♥': './style/assets/10_hearts.png', 'J♥':'./style/assets/j_hearts.png', 'Q♥':'./style/assets/Queen_hearts.png','K♥':'./style/assets/k_hearts.png','A♥':'./style/assets/a_hearts.png',
'2♦': './style/assets/2_diamonds.png','3♦':'./style/assets/3_diamonds.png', '4♦': './style/assets/4_diamonds.png', '5♦': './style/assets/5_diamonds.png', '6♦' : './style/assets/6_diamonds.png', '7♦' : './style/assets/7_diamonds.png', '8♦': './style/assets/8_diamonds.png', '9♦': './style/assets/9_diamonds.png', '10♦': './style/assets/10_diamonds.png', 'J♦':'./style/assets/J_diamonds.png', 'Q♦':'./style/assets/queen_diamonds.png','K♦':'./style/assets/k_diamonds.png', 'A♦':'./style/assets/a_diamonds.png',
'2♣': './style/assets/2_clubs.png','3♣':'./style/assets/3_clubs.png', '4♣': './style/assets/4_clubs.png', '5♣': './style/assets/5_clubs.png', '6♣' : './style/assets/6_clubs.png', '7♣' : './style/assets/7_clubs.png', '8♣': './style/assets/8_clubs.png', '9♣': './style/assets/9_clubs.png', '10♣': './style/assets/10_clubs.png', 'J♣':'./style/assets/j_clubs.png', 'Q♣':'./style/assets/queen_clubs.png','K♣':'./style/assets/k_clubs.png', 'A♣':'./style/assets/a_clubs.png',
'2♠': './style/assets/2_spades.png','3♠':'./style/assets/3_spades.png', '4♠': './style/assets/4_spades.png', '5♠': './style/assets/5_spades.png', '6♠' : './style/assets/6_spades.png', '7♠' : './style/assets/7_spades.png', '8♠': './style/assets/8_spades.png', '9♠': './style/assets/9_spades.png', '10♠': './style/assets/10_spades.png', 'J♠':'style/assets/j_spades.png', 'Q♠':'./style/assets/queen_spades.png','K♠':'./style/assets/k_spades.png', 'A♠': './style/assets/a_spades.png'};

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

function dealCard(deck){
  const card = deck.pop();

  return card;
  
};

let playerHand =  []; 
let dealerHand = [];
let undealtCards = shuffleDeck(deck); //creates shuffled copy of deck to deal cards from 

playerHand.push(dealCard(undealtCards));
dealerHand.push(dealCard(undealtCards));// spread syntax to fix nested array issue 
playerHand.push(dealCard(undealtCards));
dealerHand.push(dealCard(undealtCards));


function hasBlackJack(hand){
let value = 0;                       //tracks point value
let aces = 0;                        //tracks aces

for (let i = 0; i < hand.length; i++){     //loop through each card in hand
  const card = hand[i];                    //gets current card from hand array
  if (card[0] === 'A'){                    //checks if current card is ace
    aces++;                               //if ace updates ace variable
    value += 11;                          //adds 11 to value since aces == 11 || 1 
  } 
  else if (card[0] === 'K' || card[0] === 'Q' || card[0] === 'J'){
   value += 10;                           //add 10 to value if K,Q,J
  } 
  else {
    value += parseInt(card);              //else add numeric value of card string
  }
}

for (let i = 0; i < aces; i++){       //loop through aces in hand
  if (value > 21){                      //checks if ace causes hand to 'bust'
    value -= 10;                              //if bust add 1 to value
  }                            
}

return value;                               //return value of hand
};

let playerFinished = false;

function updateDisplay(card, winner){

let playerTotal = hasBlackJack(playerHand);
let dealerTotal = hasBlackJack(dealerHand);
let playerHandDisplay =  document.querySelector('#player1-cards');
let resultDisplay = document.querySelector('#result');
let dealerHandDisplay = document.querySelector('#dealer-cards');
let playerHandTotalDisplay = document.querySelector('#player1-sum');
let dealerTotalDisplay = document.querySelector('#dealer-sum');
playerHandDisplay.innerHTML = '';
dealerHandDisplay.innerHTML = '';

for(let i = 0; i < playerHand.length; i++){
  let cardDiv = document.createElement('div');
  const cardImg = document.createElement('img');
  cardImg.src = cardImages[playerHand[i]];
  cardDiv.appendChild(cardImg);
  playerHandDisplay.appendChild(cardDiv);
  
}
for(let i = 0; i < dealerHand.length; i++){
  let cardDiv = document.createElement('div');
  if(i === 0 && !playerFinished){
    const cardBackImg = document.createElement('img');
    cardBackImg.src = 'style/assets/back.png';
    cardBackImg.alt = 'back';
    cardDiv.appendChild(cardBackImg);
  
  }
  else {
  const cardImg = document.createElement('img');
  cardImg.src = cardImages[dealerHand[i]];
  cardDiv.appendChild(cardImg);
  }
  dealerHandDisplay.appendChild(cardDiv);
}


playerHandTotalDisplay.innerHTML = hasBlackJack(playerHand);
dealerTotalDisplay.innerHTML = playerFinished ? dealerTotal : '';


if (winner =='player'){
  resultDisplay.innerHTML = 'Player Wins!';
}
else if(winner ==='dealer'){
  resultDisplay.innerHTML = 'Dealer Wins!';
}
else if(winner ==='tie'){
  resultDisplay.innerHTML = 'Tie Game!';
}
}

function dealDealerCards(){
while(hasBlackJack(dealerHand) < 17){
  dealerHand.push(dealCard(undealtCards));
  updateDisplay();
}
}

document.querySelector("#hit-button").addEventListener('click', function(){
  playerHand.push(dealCard(undealtCards));
  updateDisplay();
  if (hasBlackJack(playerHand) > 21){
    
    console.log('player busts/loses');
    updateDisplay(null, 'dealer');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    playerFinished = true;
    updateDisplay();
  }
  else if (hasBlackJack(playerHand) === 21){
    console.log('player wins!');
    updateDisplay(null, 'player');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    playerFinished = true;
    updateDisplay();
  }
  });

document.querySelector("#stay-button").addEventListener('click', function(){
  playerFinished = true;
  dealDealerCards();
  updateDisplay();
  if (hasBlackJack(dealerHand) > 21){
    console.log('dealer busts/loses');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    updateDisplay(null, 'player');
  }
  else if (hasBlackJack(dealerHand) < hasBlackJack(playerHand)){
    console.log('player wins');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    updateDisplay(null, 'player');
  }
  else if (hasBlackJack(dealerHand)> hasBlackJack(playerHand)){
    console.log('dealer wins');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    updateDisplay(null, 'dealer');
  }
  else {
    console.log('the game is a tie');
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    updateDisplay(null, 'tie');
  }
}); 

document.querySelector('#reset-button').addEventListener('click',function(){
  deck = shuffleDeck(deck);
  playerHand = [];
  dealerHand = [];
  undealtCards = shuffleDeck(deck.slice());
  playerHand.push(dealCard(undealtCards));
  dealerHand.push(dealCard(undealtCards));
  playerHand.push(dealCard(undealtCards));
  dealerHand.push(dealCard(undealtCards));
  playerFinished = false;
  updateDisplay();


  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stay-button").disabled = false;

  
  document.querySelector('#result').innerHTML = '';
  
})

updateDisplay();