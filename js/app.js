//list that holds all of your cards
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
let time = 0;
let timeIndex = 0;
let star = 3;
let timing;


//create and add card html
function createCardHtml() {

    listOfCards = shuffle(listOfCards);
    let fragment = document.createDocumentFragment();

    for (var x = 0; x < listOfCards.length; x++) {
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

}

//call function to create card html
createCardHtml();


//restart game when restart icon is clicked
const restart = document.querySelector(".restart");
restart.addEventListener("click", reset)


//reset game
function reset() {
    //reset card
    let cards = document.querySelectorAll(".card");
    for (card of cards) {
        card.remove();
    }
    openCards = [];
    matchedCards = [];
    moveCount = 0;
    createCardHtml();
    //reset time
    time = 0;
    timeIndex = 0;
    document.querySelector(".timer").innerHTML = " 00:00";
    clearInterval(timing);
    document.querySelector(".moves").innerHTML = moveCount;
    star = 3;
    let allStars = document.querySelectorAll(".fa-star");
    for (oneStar of allStars) {
        oneStar.classList.remove("star-hide");
    }
}

//reload the browser when play again is clicked
function reload() {

    window.location.reload();

}

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


//display card symbol when called
function displayCardSymbol(e) {
    if (timeIndex === 0) {
        ++timeIndex;
        startTime();
    }
    if (e.target && e.target.matches("li") && (!(e.target.classList.contains("match")) && (!(e.target.classList.contains("show"))))) {
        e.target.classList.add("show");
        openCard(e);
    }

}

//events
let modal = document.querySelector(".modal");
let ul = document.querySelector(".deck");
ul.addEventListener("click", displayCardSymbol, false);
let closeButton = document.querySelector(".close-button")
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
let btn = document.querySelector(".btn");
btn.addEventListener("click", reload);

//fuctionality for opening cards
function openCard(e) {

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
    for (chosenCard of chosenCards) {
        chosenCard.parentNode.setAttribute("class", "card")
        chosenCard.parentNode.classList.add("match", "match-anim");
        matchedCards.push(_cardName);
    }

    openCards = [];
    moveCounter();
    checkedMactched();

}

//return class selector format 
function getClass(_cardName) {

    return "." + _cardName;

}

//hide card symbol on chosen cards
function removeFromOpen() {

    const openedCards = document.querySelectorAll(".open");
    for (let j = 0; j < 2; j++) {

        setTimeout(function () {
            openedCards[j].classList.add("miss-match");
            openedCards[j].classList.add("miss-anim");
        }, 200);
        setTimeout(function () {
            openedCards[j].setAttribute("class", "card");
        }, 700);
    }
    openCards = [];
    moveCounter();

}

//increment move and add to diplay
function moveCounter() {

    document.querySelector(".moves").innerHTML = ++moveCount;

}

//show winner board when cards have matched
function checkedMactched() {

    if (matchedCards.length === listOfCards.length) {
        let modalText = document.querySelector(".modal-text");
        modalText.innerHTML = `
            <strong>Congratulations! You Won!</strong>
            <span class="lighter-text">
                <br/>
                <br/>With ${moveCount} moves and ${star} Stars
                <br/>
                <strong>Time</strong>: ${getMinAndSecs(time)}
                <br/> Wooooow!
            </span>
            `;

        setTimeout(toggleModal, 1000);
        clearInterval(timing);
    }

}

//toggle modal
function toggleModal(event) {

    modal.classList.toggle("show-modal");

}

//close modal by click window area if modal is showing
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

//calls timer every 1 second
function startTime() {
    timing = setInterval(timer, 1000);
}

//incrementing every one second
function timer() {
    time++;
    starRating();
    let li = document.querySelector(".timer");
    li.innerHTML = getMinAndSecs(time);
}

//format time
function getMinAndSecs(time) {

    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 1) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes
    }

    return ` ${minutes}:${seconds}`;

}

//star rating 
function starRating() {

    if ((time > 40) && (star === 3) && (moveCount < 13)) {
        star--;
        let firstStar = document.querySelectorAll(".fa-star")[0];
        firstStar.classList.add("star-hide");
    } else if ((time > 80) && (star === 2) && (moveCount < 20)) {
        star--;
        let secondStar = document.querySelectorAll(".fa-star")[1]
        secondStar.classList.toggle("star-hide");
    } else if ((time > 130) && (star === 1) && (moveCount < 30)) {
        star--;
        let thirdStar = document.querySelectorAll(".fa-star")[2]
        thirdStar.classList.toggle("star-hide");
    }

}
