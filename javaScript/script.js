import { Card } from "./card.js";
import * as constants from "./constants.js"

let deck = new Array();

let h1Element = document.createElement("h1");

let divElement = document.createElement("div");
divElement.classList.add("card");

let buttonElement = document.createElement("button");
buttonElement.innerText = "Draw card";

let h2ElementName = document.createElement("h2");

let h2ElementValue = document.createElement("h2");

let buttonRestartElement = document.createElement("button");
buttonRestartElement.innerText = "Restart";

let header = document.createElement("div");
header.classList.add("header");

let footer = document.createElement("div");

let divDescriptionElement = document.createElement("div");
divDescriptionElement.classList.add("description");

let imgLogoElement = document.createElement("img");
imgLogoElement.classList.add("imgLogo");

let imgMainElement = document.createElement("img");
imgMainElement.classList.add("imgMain");

let descriptionElement = document.createElement("p");

h1Element.innerText = "Exploding Cards";
deckGenerator();
deckShuffler(deck);

divDescriptionElement.append(h2ElementName, descriptionElement);
header.append(imgLogoElement, divDescriptionElement, h2ElementValue);

document.body.append(h1Element, buttonElement, divElement);

buttonElement.addEventListener("click", drawCard);
buttonRestartElement.addEventListener("click", restartGame);

function restartGame() {
  h1Element.remove();
  buttonRestartElement.remove();
  document.body.append(h1Element, buttonElement, divElement);
  h1Element.innerText = "Exploding Cards";
  document.body.style.backgroundImage = "url('images/body/body1.jpg')";
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
    h1Element.innerText = "Game Over";
    document.body.appendChild(h1Element);
    document.body.appendChild(buttonRestartElement);
    deckGenerator();
    deckShuffler(deck);
    return;
  }

  console.log(deck);

  if (deck.length <= 60 && deck.length >= 46) {
    document.body.style.backgroundImage = "url('images/body/body1.jpg')";
  } else if (deck.length <= 45 && deck.length >= 31) {
    document.body.style.backgroundImage = "url('images/body/body3.jpg')";
  } else if (deck.length <= 30 && deck.length >= 16) {
    document.body.style.backgroundImage = "url('images/body/body4.jpg')";
  } else if (deck.length <= 15) {
    document.body.style.backgroundImage = "url('images/body/body2.webp')";
  }

  let card = deck.pop(); // Get and delete the last card of the deck
  divElement.innerHTML = '';
  divElement.className = 'card'; // Restart the classes, keeping only the "card" class
  divElement.classList.add(card.name.toLowerCase());
  h2ElementName.innerText = card.name;
  descriptionElement.innerText = card.description;
  imgLogoElement.setAttribute("src", card.logo);
  if (card.value != null) {
    imgMainElement.setAttribute("src", imgPoint(card.value));
  } else {
    let main;
    switch (card.name) {
      case (constants.CARD_TYPES.BOMB):
        main = "images/bomb.webp";
        break;
      case (constants.CARD_TYPES.DEFUSE):
        main = "images/defuser.png";
        break;
      case (constants.CARD_TYPES.NOPE):
        main = "images/barricade.webp";
        break;
      case (constants.CARD_TYPES.SKIPTURN):
        main = "images/dron.png";
        break;
    }
    imgMainElement.setAttribute("src", main);
  }
  h2ElementValue.innerText = "";
  if (card.value != null) {
    h2ElementValue.innerText = card.value;
  }
  footer = header.cloneNode(true);
  footer.className = "footer";
  divElement.append(header, imgMainElement, footer);
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
