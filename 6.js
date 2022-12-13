var Tower = /** @class */ (function () {
    function Tower(name, power, range, level, price) {
        this.setName(name);
        this.setPower(power);
        this.setRange(range);
        this.setLevel(level);
        this.setPrice(price);
    }
    Tower.prototype.setName = function (name) {
        this.Name = name;
    };
    Tower.prototype.getName = function () {
        return this.Name;
    };
    Tower.prototype.setPower = function (power) {
        this.Power = power;
    };
    Tower.prototype.getPower = function () {
        return this.Power;
    };
    Tower.prototype.setRange = function (range) {
        this.Range = range;
    };
    Tower.prototype.getRange = function () {
        return this.Range;
    };
    Tower.prototype.setLevel = function (level) {
        this.Level = level;
    };
    Tower.prototype.getLevel = function () {
        return this.Level;
    };
    Tower.prototype.setPrice = function (price) {
        this.Price = price;
    };
    Tower.prototype.getPrice = function () {
        return this.Price;
    };
    return Tower;
}());
var Enemy = /** @class */ (function () {
    function Enemy(name, HP) {
        this.setName(name);
        this.setHealthPoints(HP);
    }
    Enemy.prototype.setName = function (name) {
        this.Name = name;
    };
    Enemy.prototype.getName = function () {
        return this.Name;
    };
    Enemy.prototype.setHealthPoints = function (HP) {
        this.HealthPoints = HP;
    };
    Enemy.prototype.getHealthPoints = function () {
        return this.HealthPoints;
    };
    Enemy.prototype.TakeDamage = function (damage) {
        return this.HealthPoints = this.HealthPoints - damage;
    };
    return Enemy;
}());
var arrayTowerPlace = new Array(10);
var arrayEnemyWay = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,];
var arrayEnemy = [];
var Tower1 = new Tower("A", 3, 2, 1, 5);
var Enemy1 = new Enemy("Goblin", 100);
PutTower(Tower1, 10);
PutTower(Tower1, 3);
StartGame(10);
function PutTower(tower, position) {
    if (position < 1 || position > 10) {
        console.log("Número da casa inválida!");
        return;
    }
    else {
        arrayTowerPlace[position - 1] = tower;
        return;
    }
}
function StartGame(totalMonsters) {
    var playerHP = 10;
    var defeatedMonsters = 0;
    var numberMonsters = totalMonsters;
    var gameOver = false;
    do {
        numberMonsters = numberMonsters - EnemyMoves(numberMonsters);
        playerHP = playerHP - EnemyAttacks();
        defeatedMonsters = defeatedMonsters + EnemyAttacks();
        defeatedMonsters = defeatedMonsters + TowerAttacks();
        console.log("Player HP - " + playerHP);
        if (playerHP <= 0) {
            gameOver = true;
            console.log("YOU LOSE!");
        }
        else if (defeatedMonsters == totalMonsters) {
            gameOver = true;
            console.log("YOU WIN!");
        }
    } while (!gameOver);
}
function EnemyMoves(numberMonsters) {
    arrayEnemyWay.shift();
    if (numberMonsters != 0) {
        arrayEnemyWay[9] = Enemy1;
        return 1;
    }
    else {
        arrayEnemyWay[9] = undefined;
    }
    return 0;
}
function EnemyAttacks() {
    if (arrayEnemyWay[0] != undefined) {
        return 1;
    }
    else {
        return 0;
    }
}
function TowerAttacks() {
    var defeatedMonsters = 0;
    arrayTowerPlace.forEach(function (x, index) {
        if (x.getRange() == 1 && arrayEnemyWay[index] != undefined) {
            return defeatedMonsters = defeatedMonsters + VerifyKill(arrayEnemyWay[index].TakeDamage(x.getPower()), index);
        }
        else {
            for (var i = (index - x.getRange() + 1); i <= (index + x.getRange() - 1); i++) {
                if (arrayEnemyWay[i] != undefined)
                    return defeatedMonsters = defeatedMonsters + VerifyKill(arrayEnemyWay[i].TakeDamage(x.getPower()), i);
            }
        }
    });
    return defeatedMonsters;
}
function VerifyKill(HP, position) {
    if (HP <= 0) {
        arrayEnemyWay[position] = undefined;
        return 1;
    }
    return 0;
}
