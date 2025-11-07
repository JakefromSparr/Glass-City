import { computePowerTotal, resultForAttempt, applyOutcome } from "./resolve.js";

export function dealFaceUp(gs) {
  while (gs.faceUp.length < gs.maxFaceUp) {
    const c = gs.situations.drawOne();
    if (!c) break;
    if (c.type === "Situation") gs.faceUp.push(c);
    else gs.situations.discardOne(c); // Twists live in separate flow
  }
}

export function urgencyDiscard(gs) {
  // End-of-round: discard extra cards from the Situation deck based on
  // each unresolved faceUp card's urgency.
  let burn = 0;
  for (const s of gs.faceUp) burn += s.urgency || 0;
  for (let i = 0; i < burn; i++) {
    const tossed = gs.situations.drawOne();
    if (!tossed) break;
    gs.situations.discardOne(tossed);
  }
}

export function playerAttempt(gs, player, situation, drawCardFn) {
  // reset attempt pool & advance ability
  player.pool = [];
  player.total = 0;
  player.abilityIndex = (player.abilityIndex + 1) % player.abilities.length;

  // minimal draw loop: draw once mandatory, then caller (UI/AI) decides
  const first = drawCardFn(player);
  if (first) player.pool.push(first);

  // compute & resolve
  player.total = computePowerTotal(player);
  const outcome = resultForAttempt({ total: player.total, target: gs.targetPower });
  applyOutcome(gs, player, situation, outcome);

  // discard situation and refill slot
  gs.situations.discardOne(situation);
  gs.faceUp = gs.faceUp.filter(s => s !== situation);
}

export function playRound(gs, chooseTargetsFn, drawCardFn) {
  dealFaceUp(gs);

  // each player picks one faceUp situation (chooseTargetsFn decides)
  for (const p of gs.players) {
    const s = chooseTargetsFn(gs, p, gs.faceUp);
    if (!s) continue;
    playerAttempt(gs, p, s, drawCardFn);
  }

  urgencyDiscard(gs);
  gs.round += 1;
}
