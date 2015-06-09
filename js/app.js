// *** Definition of playing field, divisions of field, player movement, and sprite images ***
var CANVASTOP = 84;         //Defined by end of "water tiles"
var CANVASBOTTOM = 400;     //Defined by bottom extent of playing field
var CANVASLEFT = 0;         //Defined by left extent of playing field
var CANVASRIGHT = 400;      //Defined by right extent of playing field
var XDIR = 101;             //Defined by player movement to center of adjacent field tile
var YDIR = 84;              //Defined by player movement to center of adjacent field tile
//Assign images to sprite array, avoids hard coded path in following code
var SPRITEIMAGES = [
    'images/enemy-bug.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ];

// *** Enemy class ***
// Define Enemy function
var Enemy = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = SPRITEIMAGES[0];
    //Assign a random speed to enemy sprite
    this.speed = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    "use strict";
    this.x += this.speed * dt;
    if (this.x > CANVASRIGHT) {
        this.x = Math.floor(Math.random() * - 300);
    }
};

// *** Player class ***
// Define initial player character
var charToDisplay = SPRITEIMAGES[1];

// Define Player function
var Player = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = charToDisplay;
};

// Draw the player on the screen
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    "use strict";
};

//Make Player move from user input
Player.prototype.handleInput = function (key) {
    "use strict";
    if (key == 'left') {
        if (this.x > CANVASLEFT)
            this.x -= XDIR;
    }
     if (key == 'right') {
        if (this.x < CANVASRIGHT)
            this.x += XDIR;
    }
    if (key == 'up') {
        if (this.y > CANVASTOP)
            this.y -= YDIR;
        else this.wins();
    }
    if (key == 'down') {
        if (this.y < CANVASBOTTOM)
            this.y += YDIR;
    }
};

//Collision Detection between Character and Enemies
Player.prototype.update = function() {
    "use strict";
    //Cycle through enemy array and check to see if it makes current character location
    for(var count = 0, numberOfEnemies = allEnemies.length; count < numberOfEnemies; count++) {
        if(
            this.x <= (allEnemies[count].x + 60) &&
            allEnemies[count].x <= (this.x + 60) &&
            this.y <= (allEnemies[count].y + 60) &&
            allEnemies[count].y <= (this.y + 60)) {
                this.dies();
            }
    }
};

//Player is reset after death
Player.prototype.dies = function () {
    "use strict";
    this.x = 200;
    this.y = 400;
    //Player is downgraded to base level on loss
    this.sprite = SPRITEIMAGES[0];
};

//Player is reset after reaching water tiles
Player.prototype.wins = function () {
    "use strict";
    this.x = 200;
    this.y = 400;
    //Determine current player level and upgrade to next level as appropriate
    if (
        this.sprite == SPRITEIMAGES[1]) {
            this.sprite = SPRITEIMAGES[2];
    }
    if (
        this.sprite == SPRITEIMAGES[0]) {
            this.sprite = SPRITEIMAGES[1];
    }
};


// *** Instantiate objects ***
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy1 = new Enemy(0, 62);
allEnemies.push(enemy1);
var enemy2 = new Enemy(Math.floor(Math.random() * (-1)*((300- 50 +1) + 50)), 62); //Assign random start spacing to enemy sprite
allEnemies.push(enemy2);
var enemy3 = new Enemy(0, 144);
allEnemies.push(enemy3);
var enemy4 = new Enemy(0, 230);
allEnemies.push(enemy4);

// Place the player object in a variable called player
var player = new Player(200, 400);

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});