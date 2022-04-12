// Javscript Functions

// Clean up screen
function cleanUpScreen() {
    document.getElementById("id_deck").innerHTML = "";
    document.getElementById("id_deck_sorted").innerHTML = "";
    document.getElementById("id_computer_cards").innerHTML = "";
    document.getElementById("id_player_cards").innerHTML = "";
    var myButton = document.getElementById("id_hitMe");
    myButton.style.display = "none";
}

// generic screen refresh utility
// slice off "#"charcter of ID
function genericScreenRefresh(whichDeck, idLocation) {
    //clear screen location 
    console.log(idLocation);
    document.getElementById(idLocation.slice(1)).innerHTML = "";
    // repopulate screen location
    whichDeck.forEach(function(element) {
        let myColor = myDeck.color(element.suit)
        myString = `<div class= " ${myColor} card"> ${element.value}${element.suit} </div>`
        let target = document.querySelector(idLocation);
        target.innerHTML += myString;
    });
}


// Clean up and show deck on screen
function putDeckOnScreen() {
    cleanUpScreen();
    genericScreenRefresh(myDeck.deck, "#id_deck");
};

// Shuffle and show shuffled cards  on screen
function putShuffledDeckOnScreen() {
    shuffledDeck = myDeck.shuffleDeck();
    // clean up screen
    let target = document.querySelector("#id_deck_sorted");
    target.innerHTML = "";

    // show shuffled cards
    genericScreenRefresh(shuffledDeck, "#id_deck_sorted");
}


// deal Cards to computer and palyer
function dealCards() {
    const deckMidpoint = Math.ceil(numberOfCards / 2);
    playerDeck = shuffledDeck.slice(0, deckMidpoint);
    computerDeck = shuffledDeck.slice(deckMidpoint, numberOfCards);

    genericScreenRefresh(playerDeck, "#id_player_cards");
    genericScreenRefresh(computerDeck, "#id_computer_cards");

    var myButton = document.getElementById("id_hitMe");
    myButton.style.display = "block";
};

// Play a round
function hitMe() {

    const list = document.getElementById("idText");
    list.innerHTML = `${computerDeck[0].value} vs ${playerDeck[0].value} :`;

    switch (true) {
        case (computerDeck[0].value > playerDeck[0].value):
            list.innerHTML += " You lose!";
            // push - add my card to item to end of computerdeck
            myDeck.push(computerDeck, playerDeck);
            // shift - remove item from begining of player deck                
            myDeck.shift(playerDeck);
            // moveToEnd
            myDeck.moveToEnd(computerDeck);

            genericScreenRefresh(playerDeck, "#id_player_cards");
            genericScreenRefresh(computerDeck, "#id_computer_cards");
            break;
        case (computerDeck[0].value < playerDeck[0].value):
            list.innerHTML += " You Win!";
            // shift - remove item from begiing of computer deck
            myDeck.push(playerDeck, computerDeck);
            // shift - add item to end of playerdeck
            myDeck.shift(computerDeck);
            // moveToEnd
            myDeck.moveToEnd(playerDeck);

            genericScreenRefresh(playerDeck, "#id_player_cards");
            genericScreenRefresh(computerDeck, "#id_computer_cards");
            break;
        case (computerDeck[0].value == playerDeck[0].value):
            list.innerHTML += " Tied Round";
            // moveToEnd
            myDeck.moveToEnd(playerDeck);
            // moveToEnd
            myDeck.moveToEnd(computerDeck);

            genericScreenRefresh(playerDeck, "#id_player_cards");
            genericScreenRefresh(computerDeck, "#id_computer_cards");
            break;
    }

    console.log(computerDeck);
    console.log(playerDeck);
}


cleanUpScreen();
let myDeck = new Deck;


// button listeners
document.getElementById("id_putDeckOnScreen").addEventListener("click", putDeckOnScreen);
document.getElementById("id_shuffledDeckOnScreen").addEventListener("click", putShuffledDeckOnScreen);
document.getElementById("id_dealCards").addEventListener("click", dealCards);
document.getElementById("id_hitMe").addEventListener("click", hitMe);

