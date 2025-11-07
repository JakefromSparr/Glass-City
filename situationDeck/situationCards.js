// situationDeck.js

export const SITUATIONS = [
  { type:"Situation", id:1,  name:"Cat 1",  targetPower:[21], urgency:1, title:"A cat is stuck in a tree!", successText:"This Cat Does NOT Like You.", failureText:"That Cat Did NOT Like You..." },
  { type:"Situation", id:2,  name:"Cat 2",  targetPower:[21], urgency:1, title:"A Cat is stuck inside a vault!", successText:"Just… How?", failureText:"We May Never Know…" },
  { type:"Situation", id:3,  name:"Cat 3",  targetPower:[21], urgency:1, title:"A Cat is stuck on top of townhall!", successText:"This Cat Remembers You.", failureText:"It Is Up To No Good…" },
  { type:"Situation", id:4,  name:"Cat 4",  targetPower:[21], urgency:1, title:"A Cat is stuck under the mayor's bed!", successText:"It Looks at You Angrily.", failureText:"It's Plotting Something…" },
  { type:"Situation", id:5,  name:"Cat 5",  targetPower:[21], urgency:1, title:"A cat is stuck in a bush!", successText:"This Cat Does NOT Like You.", failureText:"That Cat Did NOT Like You." },
  { type:"Situation", id:6,  name:"Cat 6",  targetPower:[21], urgency:1, title:"A cat is stuck in a jewelry case!", successText:"Wait a second...", failureText:"Do you know this cat?" },
  { type:"Situation", id:7,  name:"Cat 7",  targetPower:[21], urgency:1, title:"A cat is stuck on top of an old lady!", successText:"She thought it was her hat.", failureText:"There's something wrong with this cat." },

  { type:"Situation", id:8,  name:"City 1", targetPower:[21], urgency:3, title:"The City is overrun with cats!", successText:"Do you hear that?", failureText:"Wait, they have a monarchy?" },
  { type:"Situation", id:9,  name:"City 2", targetPower:[21], urgency:3, title:"The City is falling apart!", successText:"", failureText:"" },
  { type:"Situation", id:10, name:"City 3", targetPower:[21], urgency:3, title:"The City is floating!", successText:"It was Nevermind's Balloon Salesman!", failureText:"If you squint it still resembles a city." },

  { type:"Situation", id:11, name:"Heroics 1", targetPower:[21], urgency:1, title:"A Science-Fair Project Summoned a Demon!", successText:"That Was Some Weird Science!", failureText:"It Won! But So Did The Demon…" },
  { type:"Situation", id:12, name:"Heroics 2", targetPower:[21], urgency:1, title:"There's been a gas leak at a school for gifted youngsters!", successText:"", failureText:"At least they won't have homework." },
  { type:"Situation", id:13, name:"Heroics 3", targetPower:[21], urgency:1, title:"The Fire-Truck is on Fire!", successText:"Was That A Cat With Matches?", failureText:"It… Is No Longer On Fire." },
  { type:"Situation", id:14, name:"Heroics 4", targetPower:[21], urgency:1, title:"That Traffic Jam is Filling Up With Jam!", successText:"You. Are. So. Sticky.", failureText:"" },
  { type:"Situation", id:15, name:"Heroics 5", targetPower:[21], urgency:1, title:"The Balloon Salesman is Refusing to Land!", successText:"Yay! Balloons!", failureText:"Um. Balloons?" },

  { type:"Situation", id:16, name:"Lady 1", targetPower:[21], urgency:3, title:"Help an Old Lady Cross the Street", successText:"Such A Strong Young Hero.", failureText:"You Got Most of Her There…" },
  { type:"Situation", id:17, name:"Lady 2", targetPower:[21], urgency:3, title:"Help an Old Lady out of the Fountain!", successText:"Why did she need those pennies?", failureText:"No One Liked That Fountain. Right?" },
  { type:"Situation", id:18, name:"Lady 3", targetPower:[21], urgency:3, title:"Help an old lady carry her groceries!", successText:"", failureText:"" },
  { type:"Situation", id:19, name:"Lady 4", targetPower:[21], urgency:3, title:"Help an old lady find her glasses!", successText:"How did they get in the vault?", failureText:"" },
  { type:"Situation", id:20, name:"Lady 5", targetPower:[21], urgency:3, title:"Help an Old Lady collect her pennies!", successText:"", failureText:"" },
  { type:"Situation", id:21, name:"Lady 6", targetPower:[21], urgency:3, title:"Help an Old Lady with the vending machine!", successText:"It doesn't take pennies.", failureText:"" },

  { type:"Situation", id:22, name:"Lava 1", targetPower:[21], urgency:2, title:"Lady Lava Is holding The Paparazzi Hostage!", successText:"Stoke a Pose! You Freed Them!", failureText:"Now You're Trending… For The Wrong Reasons." },
  { type:"Situation", id:23, name:"Lava 2", targetPower:[21], urgency:2, title:"Lady-Lava is holding these Cheerleaders Hostage!", successText:"Rah! Rah! Ah! Ah! Ah!", failureText:"It was Bad, but it could have been worse." },
  { type:"Situation", id:24, name:"Lava 3", targetPower:[21], urgency:2, title:"Lady-Lava is holding the Casino Hostage!", successText:"Poker Faces Are So Hard To Read…", failureText:"You freed the hostages but she took the Jackpot!" },
  { type:"Situation", id:25, name:"Lava 4", targetPower:[21], urgency:2, title:"Lady-Lava is holding that Old Lady Hostage!", successText:"", failureText:"" },

  { type:"Situation", id:26, name:"Menial 1", targetPower:[21], urgency:1, title:"Someone has to deliver all these Newspapers!", successText:"Someone. Sure.", failureText:"Those Houses Were Like That When You Found Them." },
  { type:"Situation", id:27, name:"Menial 2", targetPower:[21], urgency:1, title:"Someone has to mow these lawns!", successText:"Someone. Sure.", failureText:"They grow back, right? Neighborhoods?" },
  { type:"Situation", id:28, name:"Menial 3", targetPower:[21], urgency:1, title:"Someone has to walk all these dogs!", successText:"Sure. Someone.", failureText:"" },
  { type:"Situation", id:29, name:"Menial 4", targetPower:[21], urgency:1, title:"Someone has to paint these crosswalks!", successText:"Sure. Someone.", failureText:"" },
  { type:"Situation", id:30, name:"Menial 5", targetPower:[21], urgency:1, title:"Someone has to deliver all these Newspapers!", successText:"Someone. Sure.", failureText:"Those Houses Were Like That When You Found Them." },
  { type:"Situation", id:31, name:"Menial 6", targetPower:[21], urgency:1, title:"Someone has to mow these lawns!", successText:"Someone. Sure.", failureText:"They grow back, right? Neighborhoods?" },
  { type:"Situation", id:32, name:"Menial 7", targetPower:[21], urgency:1, title:"Someone has to walk all these dogs!", successText:"Sure. Someone.", failureText:"" },
  { type:"Situation", id:33, name:"Menial 8", targetPower:[21], urgency:1, title:"Someone has to paint these crosswalks!", successText:"Sure. Someone.", failureText:"" },

  { type:"Situation", id:34, name:"NeverMind 1", targetPower:[21], urgency:0, title:"Nevermind's Mime trapped tourists in an invisible box!", successText:"They were just having lunch...", failureText:"Too Quiet… Too Dead…" },
  { type:"Situation", id:35, name:"NeverMind 2", targetPower:[21], urgency:0, title:"Nevermind's Henchman is stopping those Kids!", successText:"It was just a crossguard...", failureText:"What Were You Supposed To Do?" },
  { type:"Situation", id:36, name:"NeverMind 3", targetPower:[21], urgency:0, title:"Nevermind's Seagulls are trying to steal a sandwich!", successText:"Those were just birds...", failureText:"Should've Just Let Them Have It." },
  { type:"Situation", id:37, name:"NeverMind 4", targetPower:[21], urgency:0, title:"Nevermind's Lawyer Is stealing candy from that baby!", successText:"That Was Just His Mom…", failureText:"You Got a Sucker!" },

  { type:"Situation", id:38, name:"Sew 1", targetPower:[21], urgency:2, title:"That's Not the Mayor! That's I-Am-Sew!", successText:"They Did Have A Strong Platform.", failureText:"They Might've Made a Better Mayor…" },
  { type:"Situation", id:39, name:"Sew 2", targetPower:[21], urgency:2, title:"That's not the Police Chief! That's I-Am-Sew!", successText:"They'll Look Great In Orange.", failureText:"Their Chief Costume Was Too Convincing" },
  { type:"Situation", id:40, name:"Sew 3", targetPower:[21], urgency:2, title:"That's not you! That's I-Am-Sew!", successText:"Honestly, They wore it better.", failureText:"" },
  { type:"Situation", id:41, name:"Sew 4", targetPower:[21], urgency:2, title:"That's not an Old Lady! That's I-Am-Sew!", successText:"They really made that wig work!", failureText:"" },

  { type:"Situation", id:42, name:"What 1", targetPower:[21], urgency:2, title:"Dr. What has Hypnotized the Parade!", successText:"But She Floated Away!", failureText:"Half The City is Under Her Spell!" },
  { type:"Situation", id:43, name:"What 2", targetPower:[21], urgency:2, title:"Dr. What Has hypnotized The Baseball Team!", successText:"No, They Were Always This Bad.", failureText:"Dr. What is Suing You For Slander!" },
  { type:"Situation", id:44, name:"What 3", targetPower:[21], urgency:2, title:"Dr. What has hypnotized that Old Lady!", successText:"She Could Really Swing That Purse!", failureText:"Such a Strong Young Hero…" },
  { type:"Situation", id:45, name:"What 4", targetPower:[21], urgency:2, title:"Dr. What has hypnotized the Ice-CreamTruck Drivers!", successText:"But! The Icecream Sandwiches?", failureText:"Um. Sometimes things melt. Like Roads." },
];

export const TWISTS = [
  { type:"Twist", id:46, name:"Nevermind Twist 1", targetPower:[41], urgency:4, title:"Nevermind's Very Big Twisty Twist!", successText:"All the rules have changed! And that's not all! They've changed again so they're exactly the same!", failureText:"", effectText:"" },
  { type:"Twist", id:47, name:"What Twist 1",       targetPower:[41], urgency:4, title:"Dr. What's Citywide blackout", successText:"Players cannot peak at their power cards until round resolution.", failureText:"", effectText:"Players cannot peek at power cards until resolution." },
  { type:"Twist", id:48, name:"What Twist 2",       targetPower:[41], urgency:4, title:"Dr. What's Orders", successText:"Players cannot recall the good ol' times.", failureText:"", effectText:"Recall the Victory may not be used this round." },
  { type:"Twist", id:49, name:"What Twist 3",       targetPower:[41], urgency:4, title:"Dr. What's the matter", successText:"A situation is Missed when it is 19 or less.", failureText:"", effectText:"Totals ≤ 19 count as Miss this round." },
  { type:"Twist", id:50, name:"Lava Twist 1",       targetPower:[41], urgency:4, title:"Lady Lava's electrified the church grounds", successText:"Players cannot attempt any other twist.", failureText:"", effectText:"All players must attempt this Twist; no other Twists may be attempted." },
  { type:"Twist", id:51, name:"Lava Twist 2",       targetPower:[41], urgency:4, title:"Lady Lava's dArk dAnce", successText:"Players cannot boast or be spotlighted", failureText:"", effectText:"Boasts and Spotlights are disabled this round." },
  { type:"Twist", id:52, name:"King Cat Twist 1",   targetPower:[41], urgency:4, title:"King Cat the Cat King activates his cat-agents", successText:"All cat situations now have a target value of 27.", failureText:"", effectText:"All Cat Situations have targetPower 27 this round." },
  { type:"Twist", id:53, name:"Sew Twist 1",        targetPower:[41], urgency:4, title:"Sew who is who again?", successText:"The player with the lowest total swaps values with the highest total.", failureText:"", effectText:"Swap totals: lowest ↔ highest before resolution." },
  { type:"Twist", id:54, name:"Sew Twist 2",        targetPower:[41], urgency:4, title:"That's Sew Not Fair!", successText:"At the end of the round, discard 1 situation for every failure.", failureText:"", effectText:"End of round: discard 1 Situation per Failure." },
];

export const DECK = [...SITUATIONS, ...TWISTS];

// Optional quick helpers
export const byId = id => DECK.find(c => c.id === id);
export const situationsOnly = () => SITUATIONS.slice();
export const twistsOnly = () => TWISTS.slice();
