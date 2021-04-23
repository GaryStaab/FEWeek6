var expect = chai.expect;

describe('All functions', function () {
    describe('Test unshuffledDeck', function () {
        let testDeck1 = new Deck();
        it('should return an array of 52 cards', function () {
            expect(testDeck1.unshuffledDeck.length).to.equal(52);
        });
        it('should return a type of object', function () {
            expect(typeof testDeck1.unshuffledDeck).to.equal('object');
        });
    });
    describe('Test shuffledDeck', function () {
        let testDeck2 = new Deck();
        testDeck2.shuffleDeck();
        it('should return an array of 52 cards', function () {
            expect(testDeck2.shuffledDeck.length).to.equal(52);
        });
        it('should return a type of object', function () {
            expect(typeof testDeck2.shuffledDeck).to.equal('object');
        });
    });
    describe('Test dealDeck', function () {
        let testDeck3 = new Deck();
        testDeck3.shuffleDeck();
        it('should return an array of 26 cards', function () {
            let hand3 = testDeck3.dealDeck();
            expect(hand3.length).to.equal(26);
        });
    });
    describe('Test Player', function() {
        let testDeck4 = new Deck();
        testDeck4.shuffleDeck();
        it('Player should have a name of Test4', function () {
            let hand4 = testDeck4.dealDeck();
            let testPlayer4 = new Player(hand4, 'Test4');
            expect(testPlayer4.name).to.equal('Test4');
        });
        it('Player should have a hand of 26 cards', function () {
            let hand4 = testDeck4.dealDeck();
            let testPlayer4 = new Player(hand4, 'Test4');
            expect(testPlayer4.hand.length).to.equal(26);
        });

    });
    describe('Test Game', function() {
        let testDeck5 = new Deck();
        testDeck5.shuffleDeck();
        let hand5_1 = testDeck5.dealDeck();
        let hand5_2 = testDeck5.dealDeck();
        let testPlayer5_1 = new Player(hand5_1, 'Test5_1');
        let testPlayer5_2 = new Player(hand5_2, 'Test5_2');
        let game5 = new Game(testPlayer5_1, testPlayer5_2);
        let roundMessage = game5.playRound()
        it('roundCount should be 1 after playing 1 round', function () {
            expect(game5.roundCount).to.equal(1);
        });
        it('roundMessage should not be blank', function(){
            expect(roundMessage).to.not.equal("");
        });
    });
});