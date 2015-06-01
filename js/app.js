// Definition of playing field and divisions of field for each player movement
var Xdir = 101; // number defined by player movement to center of adjacent field tile
var Ydir = 84; // number defined by player movement to center of adjacent field tile
var Canvasleft = 0; // number defined by left extent of playing field
var Canvasright = 400; // number defined by right extent of playing field
var Canvastop = 84; // number defined by end of "water tiles"
var Canvasbottom = 400; // number defined by bottom extent of playing field

// *** Enemy class ***

    // Define Enemy function
    var Enemy = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
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

    // Define Player function
    var Player = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
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
        }
        if (key == 'down') {
            if (this.y < Canvasbottom)
                this.y += Ydir;
        }
    }

// *** Instantiate objects ***

    // Place all enemy objects in an array called allEnemies
    var allEnemies = [];
    var enemy1 = new Enemy(0, 62);
    allEnemies.push(enemy1);
    var enemy2 = new Enemy(Math.floor(Math.random() * (-1)*((300- 50 +1) + 50)), 62);
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
