// *** Definition of playing field, divisions of field, player movement, and sprite images ***

    var Canvastop = 84; //Defined by end of "water tiles"
    var Canvasbottom = 400; //Defined by bottom extent of playing field
    var Canvasleft = 0; //Defined by left extent of playing field
    var Canvasright = 400; //Defined by right extent of playing field
    var Xdir = 101; //Defined by player movement to center of adjacent field tile
    var Ydir = 84; //Defined by player movement to center of adjacent field tile
    //Assign images to sprite array, avoids hard coded path in following code
    var spriteImages = [
        'images/enemy-bug.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
        ];

// *** Enemy class ***

    // Define Enemy function
    var Enemy = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = spriteImages[0];
        //Assign a random speed to enemy sprite
        this.speed = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
    };

    // Draw the enemy on the screen
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
        this.x += this.speed * dt;
        if (this.x > Canvasright) {
            this.x = Math.floor(Math.random() * - 300);
        }
    };

// *** Player class ***

    // Define initial player character
    var charToDisplay = spriteImages[1];

    // Define Player function
    var Player = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = charToDisplay;
    };

    // Draw the player on the screen
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Parameter: dt, a time delta between ticks
    Player.prototype.update = function(dt) {
    };

    //Make Player move from user input
    Player.prototype.handleInput = function (key) {
        if (key == 'left') {
            if (this.x > Canvasleft)
                this.x -= Xdir;
        }
         if (key == 'right') {
            if (this.x < Canvasright)
                this.x += Xdir;
        }
        if (key == 'up') {
            if (this.y > Canvastop)
                this.y -= Ydir;
            else player.wins();
        }
        if (key == 'down') {
            if (this.y < Canvasbottom)
                this.y += Ydir;
        }
    }

    //Collision Detection between Character and Enemies
    Player.prototype.update = function()
        {
        //Cycle through enemy array and check to see if it makes current character location
        for(var count = 0, numberOfEnemies = allEnemies.length; count < numberOfEnemies; count++) {
            if(
                player.x <= (allEnemies[count].x + 60) &&
                allEnemies[count].x <= (player.x + 60) &&
                player.y <= (allEnemies[count].y + 60) &&
                allEnemies[count].y <= (player.y + 60)) {
                    player.dies();
                }
            }
         }

    //Player is reset after death
    Player.prototype.dies = function () {
        this.x = 200;
        this.y = 400;
        //Player is downgraded to base level on loss
        this.sprite = spriteImages[0];
    };

    //Player is reset after reaching water tiles
    Player.prototype.wins = function () {
        this.x = 200;
        this.y = 400;
        //Determine current player level and upgrade to next level as appropriate
        if (
            this.sprite == spriteImages[1]) {
                this.sprite = spriteImages[2];
        }
        if (
            this.sprite == spriteImages[0]) {
                this.sprite = spriteImages[1];
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
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
