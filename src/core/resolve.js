// minimal resolver; plug your Boast hooks later
export function computePowerTotal(player) {
  const base = player.abilities[player.abilityIndex];
  const cardSum = player.pool.reduce((t,c)=>t+(c.value||0), 0);
  return base + cardSum;
}

export function resultForAttempt({ total, target }) {
  if (total === target) return "success";
  if (total > target)    return "bust";
  return "miss";
}

export function applyOutcome(gs, player, situation, outcome) {
  if (outcome === "success") {
    player.successes.push(situation);
    if (situation.urgency > 0) player.recallMods.push(situation.urgency);
  } else {
    // headline penalty: “fills one of your five power slots”
    player.headlines = Math.min(5, player.headlines + 1);
  }
}
