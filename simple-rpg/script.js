let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterImage = document.querySelector("#monsterImage");
const locationImage = document.querySelector("#location");
const weapons = [
  { name: 'STICK', power: 5 },
  { name: 'DAGGER', power: 30 },
  { name: 'CLAW HAMMER', power: 50 },
  { name: 'SWORD', power: 100 }
];
const monsters = [
  {
    name: "GOATOAD",
    level: 1,
    health: 15,
    images: ["./monsters/goatoad-one.png"]
  },
  {
    name: "GOATOAD",
    level: 14,
    health: 60,
    images: ["./monsters/goatoad-two.png"]
  },
  {
    name: "DRAGON",
    level: 20,
    health: 300,
    images: ["./monsters/dragon-normal.png"]
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["SHOP", "EXIT TOWN", "FIGHT GYGADRAGON", "RESET"],
    "button functions": [goStore, goCave, gygaEncounter, restart],
    text: "You are in the town square. You see a sign that says \"STORE\".",
    images: ["./"]
  },
  {
    name: "store",
    "button text": ["10 HEALTH", "FULL HEALTH", "UPGRADE WEAPON", "EXIT"],
    "button functions": [buyHealth, buyFullHealth, buyWeapon, goTown],
    text: "You enter the store.",
    images: ["./locations/item-shop.png","./people/shopkeepers/items-male.png"]
  },
  {
    name: "cave",
    "button text": ["HUNT MINIMON", "HUNT MONSTERS", "EXIT CAVE", "RESET"],
    "button functions": [fightGoatoad, fightGoatoadStrong, goTown, restart],
    text: "You enter the cave. You see some monsters.",
    images: ["./locations/cave.png"],
    border: "url(./borders/cave-border.png) 100 100 stretch"
  },
  {
    name: "fight",
    "button text": ["ATTACK", "DODGE", "RUN", "HEAL"],
    "button functions": [attack, dodge, goCave, buyHealth],
    text: "You are fighting a monster.",
    images: ["./"]
  },
  {
    name: "kill monster",
    "button text": ["ENTER TOWN", "EXPLORE", "ENTER TOWN", "HEAL"],
    "button functions": [goTown, goCave, goTown, buyHealth],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    images: ["./"]
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart],
    text: "You die. &#x2620;",
    images: ["./"]
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;", 
    images: ["./"]
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "ENTER TOWN", "RESET"],
    "button functions": [pickTwo, pickEight, goTown, restart],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    images: ["./"]
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = gygaEncounter;
button4.onclick = restart;

function update(location) {
  text.style.borderImage = "none";
  monsterStats.style.display = "none";
  monsterImage.style.display = "none";
  locationImage.style.display = "none";
  text.style.height = "1px"
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;
  text.style.height = "auto";
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
  locationImages = locations[1].images;
  locationImage.innerHTML = '<img src="' + locationImages[0] + '" />';
  monsterImage.innerHTML = '<img src="' + locationImages[1] + '" />';
  locationImage.style.display = "flex";
  monsterImage.style.display = "block";
}

function goCave() {
  update(locations[2]);
  locationImages = locations[2].images;
  locationImage.innerHTML = '<img src="' + locationImages[0] + '" />';
  locationImage.style.display = "flex";
  text.style.borderImage = locations[2].border;
    //"url(./borders/cave-border.png) 100 stretch"
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to health.";
  }
}

function buyFullHealth() {
  if (gold >= 100 - health) {
    gold -= 100 - health;
    health += 100 - health;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightGoatoad() {
  fighting = 0;
  goFight();
}

function fightGoatoadStrong() {
  fighting = 1;
  goFight();
}

function gygaEncounter() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterImages = monsters[fighting].images;
  monsterStats.style.display = "block";
  monsterImage.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImage.innerHTML = '<img src="' + monsterImages[0] + '" />';
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
