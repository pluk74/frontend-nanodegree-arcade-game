// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';

    this.x = -100;
    this.y = y; //this.positions[Math.floor(Math.random() * 3)];
    this.speed = Math.floor(Math.random() * 300) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 500) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 300) + 100;
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    var that = this;
    allEnemies.forEach(function(element) {
        var dx = element.x - that.x;
        var dy = element.y - that.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 65) {

            that.x = 201;
            that.y = 405;
            alert("LOSE");
        }
    });
    if (this.y < 5) {
        this.x = 201;
        this.y = 405;
        alert("WIN");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
    switch (move) {
        case "left":
            if (this.x <= 0) {
                break;
            } else {
                this.x = this.x - 101;
            }
            break;
        case "up":
            if (this.y <= -10) {
                break;
            } else {
                this.y = this.y - 83;
            }
            break;
        case "right":
            if (this.x >= 400) {
                break;
            } else {
                this.x = this.x + 101;
            }
            break;
        case "down":
            if (this.y >= 405) {
                break;
            } else {
                this.y = this.y + 83;
            }
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(64), new Enemy(147), new Enemy(230)];

var player = new Player(201, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});