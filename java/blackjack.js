const music = document.querySelector('#music');
const musicButton = document.querySelector('#music-button');
const playerHandDisplay = document.querySelector('#player1-cards');
const resultDisplay = document.querySelector('#result');
const dealerHandDisplay = document.querySelector('#dealer-cards');
const playerHandTotalDisplay = document.querySelector('#player1-sum');
const dealerTotalDisplay = document.querySelector('#dealer-sum');
const hitButton = document.querySelector("#hit-button");
const stayButton = document.querySelector("#stay-button");
const resetButton = document.querySelector('#reset-button');

music.volume = 0.03;

function toggleMusic(){
  if(music.paused){                   //checks if paused = true 
    music.play();                     //if paused play()
  }
  else{
  music.pause();                      //if paused = false, pause()
  }
}
musicButton.addEventListener('click', toggleMusic);

//initialize deck of 52 cards
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♥', '♦', '♣', '♠'];
const cardImages = {'2♥': './style/assets/2_hearts.png','3♥':'./style/assets/3_hearts.png', '4♥': './style/assets/4_hearts.png', '5♥': './style/assets/5_hearts.png', '6♥' : './style/assets/6_hearts.png', '7♥' : './style/assets/7_hearts.png', '8♥': './style/assets/8_hearts.png', '9♥': './style/assets/9_hearts.png', '10♥': './style/assets/10_hearts.png', 'J♥':'./style/assets/j_hearts.png', 'Q♥':'./style/assets/Queen_hearts.png','K♥':'./style/assets/k_hearts.png','A♥':'./style/assets/a_hearts.png',
'2♦': './style/assets/2_diamonds.png','3♦':'./style/assets/3_diamonds.png', '4♦': './style/assets/4_diamonds.png', '5♦': './style/assets/5_diamonds.png', '6♦' : './style/assets/6_diamonds.png', '7♦' : './style/assets/7_diamonds.png', '8♦': './style/assets/8_diamonds.png', '9♦': './style/assets/9_diamonds.png', '10♦': './style/assets/10_diamonds.png', 'J♦':'./style/assets/J_diamonds.png', 'Q♦':'./style/assets/queen_diamonds.png','K♦':'./style/assets/k_diamonds.png', 'A♦':'./style/assets/a_diamonds.png',
'2♣': './style/assets/2_clubs.png','3♣':'./style/assets/3_clubs.png', '4♣': './style/assets/4_clubs.png', '5♣': './style/assets/5_clubs.png', '6♣' : './style/assets/6_clubs.png', '7♣' : './style/assets/7_clubs.png', '8♣': './style/assets/8_clubs.png', '9♣': './style/assets/9_clubs.png', '10♣': './style/assets/10_clubs.png', 'J♣':'./style/assets/j_clubs.png', 'Q♣':'./style/assets/queen_clubs.png','K♣':'./style/assets/k_clubs.png', 'A♣':'./style/assets/a_clubs.png',
'2♠': './style/assets/2_spades.png','3♠':'./style/assets/3_spades.png', '4♠': './style/assets/4_spades.png', '5♠': './style/assets/5_spades.png', '6♠' : './style/assets/6_spades.png', '7♠' : './style/assets/7_spades.png', '8♠': './style/assets/8_spades.png', '9♠': './style/assets/9_spades.png', '10♠': './style/assets/10_spades.png', 'J♠':'style/assets/j_spades.png', 'Q♠':'./style/assets/queen_spades.png','K♠':'./style/assets/k_spades.png', 'A♠': './style/assets/a_spades.png'};

let deck = [];                         //initialize deck as empty array

for (let i = 0; i < cardValues.length; i++){   //iterates over length of cardvalues
  for (let j = 0; j < suits.length; j++){     //iterates over lenght of suites
    deck.push(cardValues[i] + suits[j]);      //pushes new card to deck array for each combo of i & j 

  }
};

//shuffle deck of cards
function shuffleDeck(){                   //Fisher-Yates shuffle algo
for (let i = deck.length -1; i > 0; i--){   //loops through deck in reverse order, swaps elements       
  const j = Math.floor(Math.random() * (i + 1)); //random index from 0 to i
  [deck[i], deck[j]] = [deck[j], deck[i]]; //swap current i with random j
 }
 return deck;      //returns shuffled deck
};
//iterating in reverse = every card has equal chance of being shuffled because i-- reduces deck length. i++ would not. 
let playerFinished = false;

function dealCard(deck){          //deal function w/deck parameter
  const card = deck.pop();        //takes last ele from deck & assigns to card
  const hasBlackJackResult = hasBlackJack(playerHand); //calculates playerHand total

  if(playerHand.length === 2 && hasBlackJackResult === 21){
    updateDisplay(null, 'player');     //win condition for player if they have blackjack on first deal
    return card;
  }

  return card;   //otherwise return card 
  
};

let playerHand =  []; 
let dealerHand = [];
let undealtCards = shuffleDeck(deck); //creates shuffled copy of deck to deal cards from 

playerHand.push(dealCard(undealtCards));
dealerHand.push(dealCard(undealtCards));
playerHand.push(dealCard(undealtCards));
dealerHand.push(dealCard(undealtCards));


function hasBlackJack(hand){        //hand array as parameter
let value = 0;                       //tracks point value
let aces = 0;                        //tracks aces

for (let i = 0; i < hand.length; i++){     //loop through each card in hand
  const card = hand[i];                    //gets current card from hand array
  if (card[0] === 'A'){                    //checks if current card is ace
    aces++;                               //if ace updates ace variable
    value += 11;                          //adds 11 to value 
  } 
  else if (card[0] === 'K' || card[0] === 'Q' || card[0] === 'J'){
   value += 10;                           //add 10 to value if K,Q,J
  } 
  else {
    value += parseInt(card);              //adds card value to hand
  }
}

for (let i = 0; i < aces; i++){       //loop through aces in hand
  if (value > 21){                      //checks if ace causes hand to 'bust'
    value -= 10;                              //if bust add 1 to value by subtracting 10. 11-10 = 1. 
  }                            
}

return value;                               //return value of hand
};



function updateDisplay(card, winner){        
let dealerTotal = hasBlackJack(dealerHand); //calculates 
playerHandDisplay.innerHTML = '';   //clears html
dealerHandDisplay.innerHTML = '';   //clears html

for(let i = 0; i < playerHand.length; i++){   //loops thru player hand
  let cardDiv = document.createElement('div'); //creates new div
  const cardImg = document.createElement('img'); //creates new img
  cardImg.src = cardImages[playerHand[i]]; //sets src attribute of cardImg for playerHand
  cardDiv.appendChild(cardImg);  //adds cardImg to cardDiv
  playerHandDisplay.appendChild(cardDiv); //adds cardDiv to playerhanddisplay
  
}
for(let i = 0; i < dealerHand.length; i++){  //loops through dealerhand
  let cardDiv = document.createElement('div');  //new div 
  if(i === 0 && !playerFinished){ //checks if dealers first card & if playerfinished = false
    const cardBackImg = document.createElement('img'); //new img
    cardBackImg.src = 'style/assets/back.png';  //src for cardBack
    cardBackImg.alt = 'back';   //sets alt attribute 
    cardDiv.appendChild(cardBackImg);   //adds img to cardDiv
  
  }
  else { //executes for dealers 2nd card
  const cardImg = document.createElement('img'); //new img
  cardImg.src = cardImages[dealerHand[i]];  //src of img in dealerHand
  cardDiv.appendChild(cardImg);   //add img to cardDiv
  }
  dealerHandDisplay.appendChild(cardDiv); //adds div to dealer display
}


playerHandTotalDisplay.innerHTML = hasBlackJack(playerHand); //player hand value
dealerTotalDisplay.innerHTML = playerFinished ? dealerTotal : ''; //ternary operator(if true : else false) to set dealers hand value to '' if player isnt finished. Or to dealerTotal if player is finished. 

//what to display depending on who wins. 
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

function dealDealerCards(){      //function to deal to the dealer until hand value is > 17
while(hasBlackJack(dealerHand) < 17){  
  dealerHand.push(dealCard(undealtCards)); 
  updateDisplay();         
}
}


//win conditions for player as a result of hitting
hitButton.addEventListener('click', function(){  //function on click 
  playerHand.push(dealCard(undealtCards));      //deals to player 
  updateDisplay();
  if (hasBlackJack(playerHand) > 21){          //conditions for player busts
    
    console.log('player busts/loses');
    updateDisplay(null, 'dealer');         //null because cardimg are already displayed 
    hitButton.disabled = true;             //disable buttons so game doesnt break
    stayButton.disabled = true;
    playerFinished = true;     //end player turn to dealerdisplay is updated
    updateDisplay();
  }
  else if (hasBlackJack(playerHand) === 21){     //win condition for player if hit = 21 
    console.log('player wins!');
    updateDisplay(null, 'player');
    hitButton.disabled = true;
    stayButton.disabled = true;
    playerFinished = true;
    updateDisplay();
  }
  });

 //win conditions as a result of staying  
stayButton.addEventListener('click', function(){
  playerFinished = true;   //ends player turn
  dealDealerCards();  //deals to dealer if value < 17
  updateDisplay();    //updates dealer score
  if (hasBlackJack(dealerHand) > 21){      //dealer busts 
    console.log('dealer busts/loses');
    hitButton.disabled = true;
    stayButton.disabled = true;
    updateDisplay(null, 'player');
  }
  else if (hasBlackJack(dealerHand) < hasBlackJack(playerHand)){ //player is closer to 21 
    console.log('player wins');
    hitButton.disabled = true;
    stayButton.disabled = true;
    updateDisplay(null, 'player');
  }
  else if (hasBlackJack(dealerHand)> hasBlackJack(playerHand)){ //dealer is closer to 21 
    console.log('dealer wins');
    hitButton.disabled = true;
    stayButton.disabled = true;
    updateDisplay(null, 'dealer');
  }
  else {                             
    console.log('the game is a tie');
    hitButton.disabled = true;
    stayButton.disabled = true;
    updateDisplay(null, 'tie');
  }
}); 

resetButton.addEventListener('click',function(){
  deck = shuffleDeck(deck);
  playerHand = []; //resets hands 
  dealerHand = [];
  playerFinished = false; //resets player turn 

  let undealtCards = shuffleDeck(deck.slice()); //slice to create copy of deck to shuffle 
  playerHand.push(dealCard(undealtCards));
  dealerHand.push(dealCard(undealtCards));
  playerHand.push(dealCard(undealtCards));
  dealerHand.push(dealCard(undealtCards));

  if(hasBlackJack(playerHand) === 21){    //added win condition for player hitting blackjack on reset button click 
    updateDisplay(null, 'player');
    resultDisplay.innerHTML = 'Player Wins!';
    hitButton.disabled = true;    
    stayButton.disabled = true;
    playerFinished = true;
  }
  else{
    updateDisplay();
    hitButton.disabled = false;    //enables buttons
    stayButton.disabled = false;
    resultDisplay.innerHTML = ''; //clears results display 
  }
})

updateDisplay(); //on window refresh 