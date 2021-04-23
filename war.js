// For the final project you will be creating an automated version of the classic card game WAR.
// Think about how you would build this project and write your plan down. Consider classes such as Card, Deck, and Player and what fields and methods they might each have. You can implement the game however you’d like (i.e. printing to the console, using alert, or some other way). The completed project should, when ran, do the following:
// -	Deal 26 Cards to two Players from a Deck. 
// -	Iterate through the turns where each Player plays a Card
// -	The Player who played the higher card is awarded a point
// o	Ties result in zero points for either Player
// -	After all cards have been played, display the score.
// Write Unit Tests using Mocha and Chai for each of the functions you write.

/*
    Discussed this with other members of the class. There seem to be a number of ways to play
    the game of War. I wanted to do something that was a little more challenging:
    
    In this game cards get recycled into the players hand that wins the round. Play continues until
    a player runs out of cards.
    When values match - War - each play lays down an additional 2 cards and another round is played.
    The winner takes all the cards.
*/

// Define class for deck
class Deck {
    static suits = ["Hearts","Diamonds","Spades","Clubs"];
    static cards = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];
    static values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    constructor() {
        this.unshuffledDeck = [];
        this.suffledDeck = [];
        let suitCount = 0;
        let cardCount = 0;
        // loop thru suits and cards and build deck
        for (suitCount in Deck.suits) {
            for (cardCount in Deck.cards) {
                let card = {value: 0, face: ""};
                //console.log(card);
                card.value = Deck.values[cardCount];
                card.face = Deck.cards[cardCount] + ' of ' + Deck.suits[suitCount];
                this.unshuffledDeck.push(card);
            }
        }
    }
    shuffleDeck() {
        this.shuffledDeck = [];
        let dealDeck = this.unshuffledDeck;
        for (let i = 1; i <= 52; i++){
            // randomly select a card
            let cardToDeal = Math.floor(Math.random() * dealDeck.length);
            // push it onto the shuffled deck
            this.shuffledDeck.push(dealDeck.splice(cardToDeal,1)[0]);
        }

    }
    dealDeck() {
        // just split the deck in half - don't need to deal individually to give each play random cards
        return this.shuffledDeck.splice(0, 26);
    }
}
class Player {
    constructor(hand, name) {
        this.hand = hand;
        this.name = name;
        if ( !( Array.isArray(this.hand)) ) {
            throw new Error("hand is not an array");
        }
    }
}
class Game {
    constructor (player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.roundCount = 0;
        this.cardsOnTable = [];
        if ( !(this.player1 instanceof Player)) {
            throw new Error("Player 1 not is not a player");
        }
        if ( !(this.player2 instanceof Player)) {
            throw new Error("Player 2 not is not a player");
        }
    }
    playRound(){
        let card = 0;
        // pull a card off the top of the hand
        // console.log(this.player1.hand.length);
        // console.log(this.player2.hand.length);
        let player1Card = this.player1.hand.shift();
        let player2Card = this.player2.hand.shift();
        // need to flip reorder cards or we often get stuck in a deadlock game
        this.cardsOnTable.push(player2Card);
        this.cardsOnTable.push(player1Card);
        this.roundCount++;
        let roundMessage = '';
        roundMessage += `Round ${this.roundCount} Player ${this.player1.name} : ${player1Card.face} Player ${this.player2.name} : ${player2Card.face}
        `;
        //console.log(this.cardsOnTable);
        if (player1Card.value > player2Card.value) {
            roundMessage += `${this.player1.name} - Player 1 wins round`;
            for (card in this.cardsOnTable){
                this.player1.hand.push(this.cardsOnTable[card]);
            }
            this.cardsOnTable = [];
        } else if (player1Card.value < player2Card.value){
            roundMessage += `${this.player2.name} - Player 2 wins round`;
            for (card in this.cardsOnTable){
                this.player2.hand.push(this.cardsOnTable[card]);
            }
            this.cardsOnTable = [];
        } else {
            // WAR
            // both player place 3 cards on the table - then we play another round
            // need to flip reorder cards or we often get stuck in a deadlock game
            // I tried different combinations for war (2 cards per player, 3 cards, the order they were added)
            // 3 cards with the 1 and 3rd flipped when we put in the winners hand seemed to help draw situations
            roundMessage += `WAR!`;
            // one card added by each player
            player1Card = this.player1.hand.shift();
            player2Card = this.player2.hand.shift();
            this.cardsOnTable.push(player2Card);
            this.cardsOnTable.push(player1Card);
            // one card added by each player
            player1Card = this.player1.hand.shift();
            player2Card = this.player2.hand.shift();
            this.cardsOnTable.push(player1Card);
            this.cardsOnTable.push(player2Card);
            // one card added by each player
            player1Card = this.player1.hand.shift();
            player2Card = this.player2.hand.shift();
            this.cardsOnTable.push(player2Card);
            this.cardsOnTable.push(player1Card);
        }
        return roundMessage;
    }
}

function playWar() {
    /* lets play a game */

    /* set the number of round that define a draw */
    let draw = 1000;

    /* create a new instance of a deck */
    let deck = new Deck();
    //console.log(deck.unshuffledDeck);

    /* shuffle the deck */
    deck.shuffleDeck();
    // console.log(deck.shuffledDeck);

    /* create 2 new players */
    let player1 = new Player(deck.dealDeck(), 'Fred');
    let player2 = new Player(deck.dealDeck(), 'Barney');
    // console.log("-------------");
    // console.log (player1.hand);
    // console.log("-------------");
    // console.log (player2.hand);

    /* create a new game with the 2 players */
    let game = new Game(player1, player2);
    // console.log(game.player1.hand);
    // console.log(game.player2.hand);

    // play game until one player has no cards or we hit a draw number of rounds
    do {
        console.log(game.playRound());
    } while (game.player1.hand.length > 0 && game.player2.hand.length > 0 && game.roundCount < draw);
    console.log
    if (game.roundCount == draw) {
        console.log('Game is a Draw');
    } else {
        if (player1.hand.length > 0) {
            console.log(`Game over - ${player1.name} won!`);
        }
        if (player2.hand.length > 0) {
            console.log(`Game over - ${player2.name} won!`);
        }
    }
}

playWar();
