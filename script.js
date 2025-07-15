// =================================================================
// ==================== SCRIPT INITIALIZATION ====================
// =================================================================

// This waits for the entire HTML document to be loaded before running any JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    // This is the master function that starts the whole game.
    init();
});


// =================================================================
// ==================== 1. DOM ELEMENT SELECTORS ===================
// =================================================================
// We store all our frequently used HTML elements in a single object
// for easy access and to keep the code clean.

const DOM = {
    // Screens
    titleScreen: document.getElementById('title-screen'),
    rulesScreen: document.getElementById('rules-screen'),
    gameScreen: document.getElementById('game-screen'),
    // Persistent Navigation Buttons
    gotoTitleBtn: document.getElementById('goto-title-btn'),
    gotoGameBtn: document.getElementById('goto-game-btn'),
    gotoRulesBtn: document.getElementById('goto-rules-btn'),
    // Game Board Areas
    watchtower: document.getElementById('watchtower'),
    leftSidebar: document.getElementById('left-sidebar'),
    rightSidebar: document.getElementById('right-sidebar'),
    statusBar: document.getElementById('status-bar'),
    playerActions: document.getElementById('player-actions'),
    // Game State Displays
    twistCardSlot: document.getElementById('twist-card-slot'),
    successCounter: document.getElementById('success-counter'),
    failureCounter: document.getElementById('failure-counter'),
    timebombCounter: document.getElementById('timebomb-counter'),
    powermobileDie: document.getElementById('powermobile-die'),
    medalsDisplay: document.getElementById('medals-display'),
    deckCounter: document.getElementById('deck-counter'),
    // In-Turn Displays
    hpValue: document.getElementById('hp-value'),
    powerValue: document.getElementById('power-value'),
    casualtyValue: document.getElementById('casualty-value'),
    // Player Action Elements
    abilityArea: document.getElementById('ability-area'),
    handArea: document.getElementById('hand-area'),
    sidekickDie: document.getElementById('sidekick-die'),
    // UI Control Buttons
    powerUpBtn: document.getElementById('power-up-btn'),
    allSetBtn: document.getElementById('all-set-btn'),
    undoBtn: document.getElementById('undo-btn'),
    rollBtn: document.getElementById('roll-btn'),
    saveQuitBtn: document.getElementById('save-quit-btn'),
};


// =================================================================
// ======================= 2. GAME STATE =========================
// =================================================================
// This object holds all the data that changes during the game.
// It's the "single source of truth" for our game's state.

let gameState = {
    activeScreen: 'title', // 'title', 'rules', or 'game'
    situations: {
        deck: [],
        discard: [],
        active: [], // The 6 situations on the board
    },
    player: {
        powerDeck: [],
        hand: [],
        discard: [],
        abilities: [
            { id: 'ability1', value: 5, exhausted: false },
            { id: 'ability2', value: 4, exhausted: false },
            { id: 'ability3', value: 3, exhausted: false },
        ],
        heroicPoints: 0,
        casualties: 0,
    },
    trackers: {
        successes: 0,
        failures: 0,
        timeBombs: 20,
    },
    currentTurn: {
        priorityTarget: null,
        collateralTargets: [],
        selectedAbility: null,
        currentPower: 0,
    }
};


// =================================================================
// ======================= 3. DATA & DECKS =========================
// =================================================================
// This section contains the raw data for our cards.

// --- Situation Deck Data ---
// We'll populate this from your detailed list.
const ALL_SITUATIONS = [
    { id: 'sit01', p: [19, 23], u: 1, title: 'Help an Old Lady Cross the Street', successText: 'Such A Strong Young Hero.', successResult: { hp: 2 }, failureText: 'You Got Most of Her There…', failureResult: { casualties: 1 } },
    { id: 'sit02', p: [21, 23], u: 2, title: 'Those kids shouldn\'t be playing under that crane!', successText: 'They\'ll Thank You One Day.', successResult: { hp: 2 }, failureText: 'At Least the Crane is Ok?', failureResult: { casualties: 3 } },
    { id: 'sit03', p: [7, 11], u: 2, title: 'That Traffic Jam is Filling Up With Jam!', successText: 'You. Are. So. Sticky.', successResult: { hp: 3 }, failureText: 'It\'s Not That Bad. Right?', failureResult: { casualties: 15 } },
    { id: 'sit04', p: [7, 11], u: 2, title: 'A Giant Hamster Got Stuck in The Sewer Pipes!', successText: 'Hey! He Likes You!', successResult: { hp: 3 }, failureText: 'The City Is Not Pleased.', failureResult: { hp: -5 } },
    { id: 'sit05', p: [23, 23], u: 3, title: 'Nevermind\'s Mime trapped tourists in an invisible box!', successText: 'Too Quiet… Too Creepy…', successResult: { hp: 5 }, failureText: 'Too Quiet… Too Dead…', failureResult: { casualties: 1 } },
    { id: 'sit06', p: [13, 13], u: 1, title: 'Dr. What has Hypnotized the Parade!', successText: 'But She Floated Away!', successResult: { hp: 7 }, failureText: 'Half The City is Under Her Spell!', failureResult: { hp: -3 } },
    // ... We will add all the other situations you wrote here. This is a great start.
];

// --- Player Power Deck Template ---
const PLAYER_DECK_TEMPLATE = [
    // Strength Cards
    { name: 'Strength 2', value: 2, type: 'strength' },
    { name: 'Strength 3', value: 3, type: 'strength' },
    { name: 'Strength 4', value: 4, type: 'strength' },
    { name: 'Strength 5', value: 5, type: 'strength' },
    { name: 'Strength 6', value: 6, type: 'strength' },
    { name: 'Strength 7', value: 7, type: 'strength' },
    { name: 'Strength 8', value: 8, type: 'strength' },
    { name: 'Strength 9', value: 9, type: 'strength' },
    // Hero Cards
    { name: 'Boom!', value: [1, 11], type: 'hero', effect: 'A' },
    { name: 'Pow!', value: 10, type: 'hero', effect: 'K' },
    { name: 'Ding!', value: 10, type: 'hero', effect: 'Q' },
    { name: 'Boing!', value: 10, type: 'hero', effect: 'J' },
    { name: 'Wham!', value: 10, type: 'hero', effect: 'T' },
];


// =================================================================
// ==================== 4. CORE GAME LOGIC =======================
// =================================================================

/**
 * The main initialization function. Runs once when the page loads.
 */
function init() {
    console.log('Welcome to Glass City!');
    // Attach all our button click listeners
    setupEventListeners();
    // Set the initial screen to be the title screen
    switchScreen('title');
}

/**
 * Handles starting a new game from scratch.
 */
function newGame() {
    console.log('Starting a new game...');
    // TODO: Reset the gameState object to its default values.

    // Setup Decks
    gameState.situations.deck = shuffleDeck([...ALL_SITUATIONS]);
    gameState.player.powerDeck = shuffleDeck([...PLAYER_DECK_TEMPLATE]);
    
    // Deal initial situations
    for (let i = 0; i < 6; i++) {
        gameState.situations.active.push(gameState.situations.deck.pop());
    }

    // Update the UI
    renderGameBoard();
    switchScreen('game');
}

/**
 * Generic deck shuffling function (Fisher-Yates algorithm).
 * @param {Array} deck - The array to be shuffled.
 * @returns {Array} The shuffled array.
 */
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
    return deck;
}


// =================================================================
// ======================= 5. UI & RENDERING =======================
// =================================================================

/**
 * Switches the visible screen.
 * @param {string} screenName - 'title', 'rules', or 'game'.
 */
function switchScreen(screenName) {
    // Hide all screens first
    DOM.titleScreen.classList.remove('active');
    DOM.rulesScreen.classList.remove('active');
    DOM.gameScreen.classList.remove('active');

    // Show the requested screen
    if (screenName === 'title') {
        DOM.titleScreen.classList.add('active');
    } else if (screenName === 'rules') {
        DOM.rulesScreen.classList.add('active');
    } else if (screenName === 'game') {
        DOM.gameScreen.classList.add('active');
    }
    gameState.activeScreen = screenName;
    console.log(`Switched to ${screenName} screen.`);
}

/**
 * Updates the entire game board based on the current gameState.
 */
function renderGameBoard() {
    console.log('Rendering game board...');
    // Clear the current situations
    DOM.watchtower.innerHTML = '';

    // Draw the 6 active situations
    gameState.situations.active.forEach(sit => {
        const situationEl = document.createElement('div');
        situationEl.classList.add('situation-slot');
        
        // Create the card display
        let targetPowerText = sit.p[0] === sit.p[1] ? sit.p[0] : `${sit.p[0]}-${sit.p[1]}`;
        situationEl.innerHTML = `
            <div class="card-display situation-card">
                <h4>${sit.title}</h4>
                <p>Target: ${targetPowerText}</p>
                <p>Urgency: ${sit.u}</p>
            </div>
            <label class="token-toggle">
                <input type="checkbox" data-situation-id="${sit.id}"> Place Token
            </label>
        `;
        DOM.watchtower.appendChild(situationEl);
    });

    // TODO: Update all other counters and displays (HP, casualties, etc.)
    DOM.deckCounter.textContent = gameState.situations.deck.length;
}


// =================================================================
// ===================== 6. EVENT LISTENERS ======================
// =================================================================

/**
 * Sets up all the click handlers for our buttons.
 */
function setupEventListeners() {
    // Persistent Navigation
    DOM.gotoTitleBtn.addEventListener('click', () => switchScreen('title'));
    DOM.gotoGameBtn.addEventListener('click', () => {
        // Only go to game screen if a game is active, otherwise start a new one.
        if (gameState.situations.active.length > 0) {
            switchScreen('game');
        } else {
            newGame();
        }
    });
    DOM.gotoRulesBtn.addEventListener('click', () => switchScreen('rules'));

    // We can add more listeners here as we build the game.
    // e.g., DOM.powerUpBtn.addEventListener('click', handlePowerUp);
}


