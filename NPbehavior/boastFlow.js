// NPBehavior/boastFlow.js
// Glass City — simple NP Boast logic + flex resolver

// ---------- RNG ----------
const rnd = (n = 100) => Math.floor(Math.random() * n);

// ---------- Tiny Deck helper for Flex ----------
export class Deck {
  constructor(cards = []) {
    this.draw = [...cards]; // top is end of array
    this.disc = [];
    this.shuffle();
  }
  shuffle() {
    for (let i = this.draw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.draw[i], this.draw[j]] = [this.draw[j], this.draw[i]];
    }
  }
  _recycleIfNeeded() {
    if (this.draw.length === 0 && this.disc.length) {
      this.draw = this.disc;
      this.disc = [];
      this.shuffle();
    }
  }
  flipOne() {
    this._recycleIfNeeded();
    if (this.draw.length === 0) return null;
    const c = this.draw.pop();
    this.disc.push(c);
    return c;
  }
}

// Return numeric rank for comparing in Flex (2..14), treat A high.
// Supports numbers and faces: '2'..'10','J','Q','K','A'
export function rankVal(card) {
  const map = { J: 11, Q: 12, K: 13, A: 14 };
  if (typeof card === 'number') return card;
  if (map[card]) return map[card];
  const n = parseInt(card, 10);
  return isNaN(n) ? 0 : n;
}

// Flex: flip until one is higher; reshuffle as needed.
// Returns { winner: 'A'|'B'|'TIE_EXHAUSTED', aCard, bCard, flips }
export function resolveFlex(deckA, deckB, maxFlips = 200) {
  let flips = 0;
  while (flips++ < maxFlips) {
    const a = deckA.flipOne();
    const b = deckB.flipOne();
    if (a == null || b == null) return { winner: 'TIE_EXHAUSTED', aCard: a, bCard: b, flips: flips - 1 };
    const av = rankVal(a), bv = rankVal(b);
    if (av > bv) return { winner: 'A', aCard: a, bCard: b, flips };
    if (bv > av) return { winner: 'B', aCard: a, bCard: b, flips };
    // tie → continue flipping
  }
  return { winner: 'TIE_EXHAUSTED', aCard: null, bCard: null, flips: maxFlips };
}

// ---------- Heuristics Inputs (keep tiny) ----------
// state = {
//   urgency (0..3),
//   priorityIsNew (bool),
//   tpGap (>=0)   // est. distance to targetLow
//   behindOnPoints (bool),
//   roundNum (1..6),
//   headlinesFilled (0..N), // how many Headline spaces occupied
//   boastHeldByNP (bool),   // does this NP currently hold the Boast?
// }

// ---------- Spotlight: choose Boast 1 (Precision) or 2 (Power) ----------
export function aiSpotlightBoast(state) {
  const {
    urgency = 1,
    priorityIsNew = false,
    tpGap = 3,
    behindOnPoints = false,
    roundNum = 1,
    headlinesFilled = 0
  } = state;

  // Base aggression from urgency, freshness, headlines pressure, late game
  let powerBias = 0;
  if (urgency >= 2) powerBias += 20;
  if (priorityIsNew) powerBias += 10;
  powerBias += Math.min(20, headlinesFilled * 5);
  if (roundNum >= 5) powerBias += 10;
  if (behindOnPoints) powerBias += 10;

  // Gap logic: small gap → Precision; big gap → Power
  // tpGap 0–1 strongly favors Precision; ≥4 favors Power
  let precisionBias = 0;
  if (tpGap <= 1) precisionBias += 35;
  else if (tpGap === 2) precisionBias += 15;
  else if (tpGap >= 4) powerBias += 25;

  // Convert biases to a roll
  const precisionChance = Math.max(5, Math.min(90, 50 + precisionBias - powerBias));
  const choosePrecision = rnd() < precisionChance;

  return choosePrecision ? 1 : 2; // 1 = Precision, 2 = Power
}

// ---------- Response: Bump or Brag ----------
export function aiResponse(state) {
  const {
    urgency = 1,
    priorityIsNew = false,
    tpGap = 3,
    behindOnPoints = false,
    roundNum = 1,
    headlinesFilled = 0,
    boastHeldByNP = false
  } = state;

  // If NP already holds the Boast and someone else (NP) brags → always BUMP
  if (boastHeldByNP) return 1; // 1 = Bump

  // Base desire to Brag (take it)
  let bragPct = 10;
  if (priorityIsNew) bragPct += 10;
  if (urgency === 3) bragPct += 20;
  if (behindOnPoints) bragPct += 15;
  bragPct += Math.min(15, headlinesFilled * 5);
  if (roundNum >= 5) bragPct += 10;

  // Confidence based on tpGap (smaller gap → more likely to Brag)
  if (tpGap <= 1) bragPct += 25;
  else if (tpGap <= 3) bragPct += 10;
  else if (tpGap >= 6) bragPct -= 10;

  bragPct = Math.max(5, Math.min(80, bragPct));
  const brag = rnd() < bragPct;
  return brag ? 2 : 1; // 2 = Brag, 1 = Bump
}

// ---------- Boaster follow-up: Bump or Challenge ----------
export function aiBoasterFollowUp(state) {
  const {
    urgency = 1,
    tpGap = 3,
    behindOnPoints = false,
    roundNum = 1,
    headlinesFilled = 0
  } = state;

  // Baseline: prefer Bump to keep flow unless strong reasons to Challenge
  let challengePct = 10;

  // High urgency & late rounds raise willingness to Challenge
  if (urgency >= 2) challengePct += 15;
  if (roundNum >= 5) challengePct += 10;

  // If behind or headlines pressure high, push to Challenge
  if (behindOnPoints) challengePct += 15;
  challengePct += Math.min(10, headlinesFilled * 3);

  // Confidence: small gap → more likely to Challenge
  if (tpGap <= 1) challengePct += 20;
  else if (tpGap <= 3) challengePct += 10;
  else if (tpGap >= 6) challengePct -= 10;

  challengePct = Math.max(5, Math.min(65, challengePct));
  const challenge = rnd() < challengePct;
  return challenge ? 'CHALLENGE' : 'BUMP';
}

// ---------- Lightweight “AI total” generator for contests ----------
// If you need to simulate NP totals for a boast/brag contest quickly:
export function simulateNpTotal({ abilityBase = 4 } = {}) {
  // Rough: base + 7 + jitter; 10% bust chance; 10% precise snipe
  let total = abilityBase + 7 + (rnd(3) - 1); // -1..+1 jitter
  if (rnd() < 10) total += 5;      // occasional overshoot/bust
  if (rnd() < 10) total += 0;      // snipe stays as-is
  return total;
}

/* ==========================
   Example usage (pseudo):

import {
  aiSpotlightBoast,
  aiResponse,
  aiBoasterFollowUp,
  resolveFlex,
  Deck
} from "./NPBehavior/boastFlow.js";

// Spotlight NP decides type of Boast
const boastType = aiSpotlightBoast({
  urgency: current.urgency,
  priorityIsNew: current.priority === 1,
  tpGap: estGapForThisNP,
  behindOnPoints: npVP < playerVP,
  roundNum,
  headlinesFilled
}); // 1=Precision, 2=Power

// Previous player boasted; NP must respond
const response = aiResponse({
  urgency: current.urgency,
  priorityIsNew: current.priority === 1,
  tpGap: estGapForThisNP,
  behindOnPoints: npVP < playerVP,
  roundNum,
  headlinesFilled,
  boastHeldByNP: npCurrentlyHoldsBoast
}); // 1=Bump, 2=Brag

// Active boaster’s follow-up if a Brag occurred
const follow = aiBoasterFollowUp({
  urgency: current.urgency,
  tpGap: estGapForActiveBoaster,
  behindOnPoints: activeVP < playerVP,
  roundNum,
  headlinesFilled
}); // 'BUMP' or 'CHALLENGE'

// If CHALLENGE → Flex:
const stdDeckA = new Deck(['2','3','4','5','6','7','8','9','10','J','Q','K','A']);
const stdDeckB = new Deck(['2','3','4','5','6','7','8','9','10','J','Q','K','A']);
const result = resolveFlex(stdDeckA, stdDeckB);
// result.winner === 'A'|'B'|'TIE_EXHAUSTED'

========================== */