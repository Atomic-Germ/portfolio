let level = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let id = null;

const body = document.querySelector("body");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector(".text");
const levelText = document.querySelector("#levelText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterImage = document.querySelector("#monsterImage");
const locationImage = document.querySelector("#location");
const animationElement = document.querySelector("#animation");
const audio = new Audio();
const sfx = new Audio();

audio.loop = true;
sfx.loop = false;

const monsters = [
  {
   "name": "GOATOAD",
   "level": 2,
   "health": 20,
   "images": ["./monsters/goatoad-one.png"],
   "music": ["./audio/fight_1.mp3"]
  },
  {
   "name": "GOATOADPOLE",
   "level": 1,
   "health": 15,
   "images": ["./monsters/goatoad-two.png"],
   "music": ["./audio/fight_1.mp3"]
  },
  {
   "name": "AMANITA",
   "level": 5,
   "health": 30,
   "images": ["./monsters/dragon-normal.png"],
   "music": ["./audio/fight_1.mp3"]
  },
  {
   "name": "PANTHERINA",
   "level": 15,
   "health": 100,
   "images": ["./monsters/dragon-strong.png"],
   "music": ["./audio/fight_0.mp3"]
  },
  {
   "name": "INVADER",
   "level": 6,
   "health": 50,
   "images": ["./monsters/invader-one.png"],
   "music": ["./audio/fight_1.mp3"]
  }
];

const items = { 
  health: 3 
};
const weapons = [
  { name: 'STICK', power: 5 },
  { name: 'DAGGER', power: 30 },
  { name: 'CLAW HAMMER', power: 50 },
  { name: 'SWORD', power: 100 },
  { name: 'GREAT SWORD', power: 150 },
  { name: 'SHINING SWORD', power: 200 }
];
const locations = [
  {
    name: "town square",
    "button text": ["SHOP", "EXIT TOWN", "GYGA", "RESET"],
    "button functions": [goShop, goFeild, gygaEncounter, restart],
    text: "You are in the town square. You see a sign that says \"SHOP\". You also see a sign pointing toward \"Gyga\"",
    images: ["url(./locations/town-square.png)"],
    music: ["./audio/town_0.mp3"]
  },
  {
    name: "shop",
    "button text": ["10 HEALTH", "FULL HEALTH", "UPGRADE WEAPON", "EXIT"],
    "button functions": [buyHealth, buyFullHealth, buyWeapon, goTown],
    text: "\'Hi! What can I do ya for?\'",
    images: ["url(./locations/item-shop.png)","./people/shopkeepers/items-male.png"],
    music: ["./audio/shop_0.mp3"]
  },
  {
    name: "cave",
    "button text": ["HUNT MINIONS", "HUNT MONSTERS", "EXIT CAVE", "RESET"],
    "button functions": [fightMinion, fightMonsters, goFeild, restart],
    text: "You enter the cave. You see some monsters.",
    images: ["url(./locations/cave.png)"],
    music: ["./audio/cave_0.mp3","./audio/cave_1.mp3"],
    border: ["url(./borders/cave-border.png) 100 100 stretch"]
  },
  {
    name: "fight",
    "button text": ["ATTACK", "DODGE", "RUN", "HEAL"],
    "button functions": [attack, dodge, goCave, itemHealth],
    text: "A monster has appeared.",
    images: ["./"],
  },
  {
    name: "kill monster",
    "button text": ["ENTER TOWN", "EXLORE", "EXIT CAVE", "HEAL"],
    "button functions": [goTown, goCave, goFeild, itemHealth],
    text: 'The monster screams "Arg!" as it dies. You gain elevelerience points and find gold.',
    images: ["./"]
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, easterEgg, restart, restart],
    text: "You die. &#x2620;",
    images: ["./"],
    music: ["./audio/lose.mp3"]
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
  },
  {
    name: "feild",
    "button text": ["CAVE", "TOWN", "REST", "ITEM"],
    "button functions": [goCave, goTown, buyFullHealth, buyHealth],
    text: "You are in the feilds exploring, there is a cave and a town nearby.",
    images: ["url(./locations/map.png)"],
    music: ["./audio/feild_0.mp3"]
  }
];

// initialize buttons
button1.onclick = goShop;
button2.onclick = goCave;
button3.onclick = gygaEncounter;
button4.onclick = restart;

function update(location) {
  text.style.borderImage = "none";
  monsterStats.style.display = "none";
  monsterImage.style.display = "none";
  body.style.backgroundImage = location["images"][0];
  text.style.height = "1px"
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button1.disabled = false;
  button2.disabled = false;
  button3.disabled = false;
  button4.disabled = false;
  button1.style.backgroundColor = "var(--button-color)";
  button2.style.backgroundColor = "var(--button-color)";
  button3.style.backgroundColor = "var(--button-color)";
  button4.style.backgroundColor = "var(--button-color)";
  text.innerHTML = location.text;
  goldText.innerText = gold;
  levelText.innerText = level;
  healthText.innerText = health;
  text.style.height = "auto";
  audio.pause();
}

function goTown() {
  update(locations[0]); 
  audio.src = locations[0].music[0];
  audio.play();
}

function goShop() {
  update(locations[1]);
  audio.src = locations[1].music[0];
  audio.play();
  locationImages = locations[1].images;
  body.style.backgroundImage = locationImages[0];
  monsterImage.innerHTML = '<img src="' + locationImages[1] + '" />';
  monsterImage.style.display = "block";
}

function goCave() {
  update(locations[2]);
  audio.src = locations[2].music[0];
  audio.play();
  locationImages = locations[2].images;
  body.style.backgroundImage = locationImages[0];
  text.style.borderImage = locations[2].border;
  text.style.backgroundColor = "transparent";
}

function goFeild() {
  update(locations[8]);
  audio.src = locations[8].music[0];
  audio.play();
  locationImages = locations[8].images;
  body.style.backgroundImage = locationImages[0];
}

function buyHealth() {
  if (gold >= 10 && health < 100) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else if (gold < 10 ) {
    text.innerText = "You don't have enough to cover the bill!";
  } else if (health >= 100 ) {
    text.innerText = "You do not need to heal.";
  }
}

function itemHealth() {
  if (items["health"] > 0 && health < 100) {
    items["health"]--;
    button4.disabled = true;
    button4.style.backgroundColor = "var(--button-color-active)";
    text.innerText = `+${100 - health} health, ${items["health"] + 1} healing potions left.`;
    health += 100 - health;
    healthText.innerText = health;
  } else if (health >= 100) {
    text.innerText = "Can't restore above 100 health with this item.";
  } else {
    text.innerText = "No healing potions remaining.";
  }
}

function buyFullHealth() {
  let needsHealth = 100 - health;
  if (gold >= needsHealth) {
    gold -= 100 - health;
    health += 100 - health;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else if (gold < needsHealth) {
    text.innerText = `You do not have enough gold for ${needsHealth} health.`;
  } else if (needsHealth === 0) {
    text.innerText = `We can't restore ${needsHealth} health!`;
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      sfx.src = "./audio/buy_sell.mp3";
      sfx.play();
      text.innerText = `Bought a ${newWeapon}!`;
      inventory.push(newWeapon);
      text.innerText += ` In your inventory you have: ${inventory}`;
    } else {
      text.innerText = "You can't afford it!";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell Weapon";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += Math.floor(currentWeapon * 1.2);
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightMinion() {
  goFight(Math.floor(Math.random() * 3));
}

function fightMonsters() {
  goFight(4);
}

function gygaEncounter() {
  goFight(3);
}

function goFight(monster) {
  fighting = monster;
  update(locations[3]);
  audio.src = monsters[fighting].music[0];
  audio.play();
  monsterHealth = monsters[fighting].health;
  monsterImages = monsters[fighting].images;
  monsterStats.style.display = "block";
  monsterImage.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImage.innerHTML = `<img src="${monsterImages[0]}" />`;
  text.innerText = `${monsters[fighting].name} appears!`;
}

function animateHit (hit) {
  const initialTop = animationElement.style.top;
  const initialRight = animationElement.style.right;
  const movingBottom = 50;
  let hitLanded = hit ? true : false;
  let movingSize = 30;
  let movingTop = initialTop;
  let movingRight = initialRight;
  clearInterval(id);
  id = setInterval(frame, 5);
  animationElement.style.display = "block";
  animationElement.style.backgroundColor = "orange";
  animationElement.style.width = `${movingSize}vh`;
  animationElement.style.height = `${movingSize}vh`;
  function frame() {
    if (movingSize <= 0) {
      animationElement.style.top = initialTop;
      animationElement.style.right = initialRight;
      clearInterval(id);
      animationElement.style.display = "none";
    } else {
      movingTop++;
      movingRight++;
      movingSize -= 0.5;
      animationElement.style.width = `${movingSize}px`;
      animationElement.style.height = `${movingSize}vh`;
      animationElement.style.top = `${movingTop}vh`;
      animationElement.style.right = `${movingRight}vw`;
      animationElement.style.backgroundColor = hitLanded ? "orangered" : "transparent";
    };
  }
}

function attack() {
  text.innerText = `${monsters[fighting].name} attacks.`;
  text.innerText += ` You attack ${monsters[fighting].name} with your ${weapons[currentWeapon].name}.`;
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    animateHit(true);
    sfx.src = "./audio/impact.mp3";
    sfx.play();
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * level) + 2;    
  } else {
    animateHit();
    text.innerText += " You miss.";
    sfx.src = "./audio/miss.mp3";
    sfx.play();
  }
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (items["health"] > 1) {
    button4.disabled = false;
    button4.style.backgroundColor = "var(--button-color)";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * level));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

const isMonsterHit = _ => Math.random() > .2 || health < 20;

function dodge() {
  text.innerText = `You dodge the attack from the ${monsters[fighting].name}.`;
}

function defeatMonster() {
  level += monsters[fighting].level;
  goldText.innerText = gold;
  levelText.innerText = level;
  update(locations[4]);
  gold += Math.floor(monsters[fighting].level * 6.7);
  audio.src = "./audio/win_1.mp3";
  audio.play();
}

function lose() {
  health = 0;
  items["health"] = 3;
  healthText.innerText = health;
  audio.src = locations[5].music[0];
  update(locations[5]);
  audio.play();
}

function winGame() {
  update(locations[6]);
}

function restart() {
  level = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  items["health"] = 3;
  goldText.innerText = gold;
  healthText.innerText = health;
  levelText.innerText = level;
  goFeild();
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

goFeild();
