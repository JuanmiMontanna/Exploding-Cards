import { Card } from "./card.js";
import * as constants from "./constants.js"

let deck = new Array();


deckGenerator();
deckShuffler(deck);
let h1Element = document.createElement("h1");
let divElement = document.createElement("div");
divElement.classList.add("card");
let buttonElement = document.createElement("button");
buttonElement.innerText = "Draw card";
let buttonRestartElement = document.createElement("button");

document.body.appendChild(buttonElement);
document.body.appendChild(divElement);

buttonElement.addEventListener("click", drawCard);
buttonRestartElement.addEventListener("click", restartGame);

function restartGame() {
  h1Element.remove();
  buttonRestartElement.remove();
  document.body.appendChild(buttonElement);
  document.body.appendChild(divElement);
}

function deckGenerator() {
  for (let i = 0; i < constants.BOMBS_NUMBER; i++) {
    let card = new Card(constants.CARD_TYPES.BOMB);
    deck.push(card);
  }
  for (let i = 0; i < constants.DEFUSES_NUMBER; i++) {
    let card = new Card(constants.CARD_TYPES.DEFUSE);
    deck.push(card);
  }
  for (let i = 0; i < constants.SKIPSTURNS_NUMBER; i++) {
    let card = new Card(constants.CARD_TYPES.SKIPTURN);
    deck.push(card);
  }
  for (let i = 0; i < constants.NOPES_NUMBER; i++) {
    let card = new Card(constants.CARD_TYPES.NOPE);
    deck.push(card);
  }
  for (let i = 0; i < constants.POINTS_NUMBER; i++) {
    let card = new Card(constants.CARD_TYPES.POINTS, getRandomNumber(constants.MIN_POINTS, constants.MAX_POINTS));
    deck.push(card);
  }
}

// Fisher-Yates Shuffle algorithm
function deckShuffler(deck) {
  for (let i = constants.TOTAL_CARDS - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

function drawCard() {
  if (deck.length === 0) {
    divElement.remove();
    buttonElement.remove();
    buttonRestartElement.innerText = "Restart";
    document.body.appendChild(buttonRestartElement);
    h1Element.innerText = "Fin del juego";
    document.body.appendChild(h1Element);
    deckGenerator();
    deckShuffler(deck);
    return;
  }

  console.log(deck);

  let card = deck.pop(); // Get and delete the last card of the deck
  divElement.innerHTML = '';

  if (card.value != null) {
    let h1ElementValue = document.createElement("h1");
    h1ElementValue.innerText = card.value;
    h1ElementValue.classList.add("numberTop")
    divElement.appendChild(h1ElementValue);
    let imgR6LogoElement = document.createElement("img");
    imgR6LogoElement.classList.add("imgR6LogoTop")
    imgR6LogoElement.setAttribute("src", "images/Points/Logos/R6-Logo.png");
    divElement.appendChild(imgR6LogoElement);
  }

  if (card.name == constants.CARD_TYPES.POINTS) {
    let href = imgPoint(card.value);
    let imgPointsElement = document.createElement("img");
    imgPointsElement.classList.add("imgPoints")
    imgPointsElement.setAttribute("src", href)
    divElement.appendChild(imgPointsElement);
  } else {
    let h1ElementName = document.createElement("h1");
    h1ElementName.innerText = card.name;
    divElement.appendChild(h1ElementName);
  }

  if (card.value != null) {
    let h1ElementValue = document.createElement("h1");
    h1ElementValue.innerText = card.value;
    h1ElementValue.classList.add("numberBottom")
    divElement.appendChild(h1ElementValue);
    let imgR6LogoElement = document.createElement("img");
    imgR6LogoElement.classList.add("imgR6LogoBottom")
    imgR6LogoElement.setAttribute("src", "images/Points/Logos/R6-Logo.png");
    divElement.appendChild(imgR6LogoElement);
  }
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function imgPoint(value) {
  switch (true) {
    case (value == 1 || value == 2):
      return "images/Points/Value/1-2points.png";
    case (value == 3 || value == 4):
      return "images/Points/Value/3-4points.png";
    case (value == 5 || value == 6):
      return "images/Points/Value/5-6points.png";
    case (value == 7 || value == 8):
      return "images/Points/Value/7-8points.png";
    case (value == 9 || value == 10):
      return "images/Points/Value/9-10points.png";
  }
}
