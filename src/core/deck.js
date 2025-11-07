import { rng } from "./rng.js";

export class Deck {
  constructor(cards = []) {
    this.draw = rng.shuffle(cards);
    this.discard = [];
  }
  size() { return this.draw.length + this.discard.length; }
  ensure() {
    if (this.draw.length === 0 && this.discard.length) {
      this.draw = rng.shuffle(this.discard);
      this.discard = [];
    }
  }
  drawOne() {
    this.ensure();
    return this.draw.length ? this.draw.shift() : null;
  }
  discardOne(card) { if (card) this.discard.push(card); }
}
