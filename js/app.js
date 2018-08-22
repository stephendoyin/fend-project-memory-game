/*
 * Create a list that holds all of your cards
 */
let listOfCards = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
]

let openCards = [];
let matchedCards = [];
let moveCount = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
listOfCards = shuffle(listOfCards);
fragment = document.createDocumentFragment();

for (var x = 0; x < listOfCards.length; x++) {
    console.log(listOfCards[x]);
    let li = document.createElement("LI");
    attr1 = document.createAttribute("class");
    attr1.value = "card";
    li.setAttributeNode(attr1);
    let i = document.createElement("I");
    attr3 = document.createAttribute("class");
    attr3.value = "fa";
    i.setAttributeNode(attr3);
    i.classList.add(listOfCards[x]);
    li.appendChild(i);
    fragment.appendChild(li);
}

document.querySelector(".deck").appendChild(fragment);

//restart game when restart icon is clicked
const restart = document.querySelector(".restart");
restart.addEventListener("click", function(){
    window.location.reload();
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//display card symbol when called
function displayCardSymbol(e) {
    if (e.target && e.target.matches("li") && (!(e.target.classList.contains("match")) && (!(e.target.classList.contains("show")))))  {
        e.target.classList.add("show");
        openCard(e);
    }
}


let ul = document.querySelector(".deck");
ul.addEventListener("click", displayCardSymbol, false);

//fuctionality for opening cards
function openCard(e) {
    moveCounter();
    let target = e.target
    const cardName = target.children[0].classList[1];
    target.classList.add("open");
    openCards.push(cardName);

    if (openCards.length > 1) {
        if (openCards[0] === cardName) {
            lockedPositionOnMatch(cardName);
        } else {
            removeFromOpen();
        }
    }
    
}


//to locked matched card 
function lockedPositionOnMatch(_cardName) {
    const cardClass = getClass(_cardName);
    let chosenCards = document.querySelectorAll(cardClass);
    for(chosenCard of chosenCards){
        chosenCard.parentNode.setAttribute("class", "card")
        chosenCard.parentNode.classList.add("match");
        matchedCards.push(_cardName);
        console.log(chosenCard.parentNode);
    }
    openCards = [];
    checkedMactched();
    console.log(matchedCards);

}


//return class selector format 
function getClass(_cardName) {
    return "." + _cardName;
}


//hide card symbol on chosen cards
function removeFromOpen() {
    const openedCards = document.querySelectorAll(".open");
    for(let j = 0; j < 2; j++){
        
        setTimeout(function(){
            openedCards[j].classList.add("miss-match");
        }, 200)
        setTimeout(function(){
            openedCards[j].setAttribute("class", "card");
        }, 700)
    }
    openCards = []
}

//increment move and add to diplay
function moveCounter (){ 
    document.querySelector(".moves").innerHTML = ++moveCount;
}

//show winner board when cards have matched
function checkedMactched(){
    if (matchedCards.length === listOfCards.length){
        console.log("you have won at " + moveCount + " moves")
    }
}

