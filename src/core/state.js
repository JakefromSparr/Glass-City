import { Deck } from "./deck.js";
import { PLAYER_DECK } from "../../playerDeck/playerCards.js";
import { SITUATIONS, TWISTS } from "../../situationDeck/situationCards.js";

export function createGameState({ players = 3 } = {}) {
  const P = [];
  for (let i = 0; i < players; i++) {
    P.push({
      id: i,
      name: `Hero ${i+1}`,
      abilities: [3,4,5],      // cycle each attempt
      abilityIndex: 0,
      pool: [],                // cards committed to current attempt
      total: 0,                // computed power
      deck: new Deck(PLAYER_DECK()),
      headlines: 0,            // 0..5 occupied slots (penalty)
      successes: [],           // won situations
      recallMods: []           // urgency modifiers earned
    });
  }

  return {
    round: 1,
    spotlight: null,          // player id holding the Boast
    situations: new Deck(SITUATIONS),
    twists: new Deck(TWISTS),
    faceUp: [],               // active situations on table
    players: P,
    // config
    targetPower: 21,
    maxFaceUp: 3
  };
}
