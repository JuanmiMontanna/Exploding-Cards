import * as constants from "./constants.js"
export class Card {
  name;
  value;
  description;

  constructor(name, value = null) {
    this.name = name;
    this.value = value;

    switch (name) {
      case (constants.CARD_TYPES.BOMB):
        this.description = "If you draw one and don’t have a Defuse card, you lose";
        this.logo = "images/Points/Logos/R6-Logo.png";
        break;
      case (constants.CARD_TYPES.DEFUSE):
        this.description = "Allows you to defuse a Bomb. Stays in your hand";
        this.logo = "images/Points/Logos/R6-Logo.png";
        break;
      case (constants.CARD_TYPES.NOPE):
        this.description = "Lets you avoid drawing a card on your turn";
        this.logo = "images/Points/Logos/R6-Logo.png";
        break;
      case (constants.CARD_TYPES.SKIPTURN):
        this.description = "Cancels an opponent’s Skip Turn";
        this.logo = "images/Points/Logos/R6-Logo.png";
        break;
      case (constants.CARD_TYPES.POINTS):
        this.description = "Value from 1 to 10. Highest total wins if multiple players remain";
        this.logo = "images/Points/Logos/R6-Logo.png";
        break;
    }
  }

};
