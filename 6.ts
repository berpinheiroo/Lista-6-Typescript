class Tower {
    private Name: string
    private Power: number
    private Range: number
    private Level: number
    private Price: number

    constructor(name: string, power: number, range: number, level: number, price: number) {
        this.setName(name)
        this.setPower(power)
        this.setRange(range)
        this.setLevel(level)
        this.setPrice(price)
    }
    public setName(name: string): void {
        this.Name = name
    }
    public getName(): string {
        return this.Name
    }

    public  setPower(power: number): void {
        this.Power = power
    }
    public getPower(): number {
        return this.Power
    }

    public setRange(range: number): void {
        this.Range = range
    }
    public getRange(): number {
        return this.Range
    }

    public setLevel(level: number): void {
        this.Level = level
    }
    public getLevel(): number {
        return this.Level
    }

    public setPrice(price: number): void {
        this.Price = price
    }
    public getPrice(): number {
        return this.Price
    }
}

class Enemy {
    private Name: string
    private HealthPoints: number

    constructor(name: string, HP: number) {
        this.setName(name)
        this.setHealthPoints(HP)
    }

    public setName(name: string): void {
        this.Name = name
    }
    public getName(): string {
        return this.Name
    }

    public setHealthPoints(HP: number): void {
        this.HealthPoints = HP
    }
    public getHealthPoints(): number {
        return this.HealthPoints
    }

    public TakeDamage(damage: number): number {
        return this.HealthPoints = this.HealthPoints - damage
    }
}


let arrayTowerPlace: Tower[] = new Array(10)
let arrayEnemyWay: (Enemy | undefined)[] = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,]
let arrayEnemy: Enemy[] = []

let Tower1 = new Tower("A", 3, 2, 1, 5)
let Enemy1 = new Enemy("Goblin", 100)

PutTower(Tower1,10)
PutTower(Tower1,3)

StartGame(10)

function PutTower(tower: Tower, position: number): void {
    if (position < 1 || position > 10) {
        console.log("Número da casa inválida!")
        return
    } else {
        arrayTowerPlace[position - 1] = tower
        return
    }
}

function StartGame(totalMonsters: number): void {
    let playerHP: number = 10
    let defeatedMonsters : number = 0
    let numberMonsters : number = totalMonsters
    let gameOver : boolean = false
    do{
        numberMonsters = numberMonsters - EnemyMoves(numberMonsters)
        playerHP = playerHP - EnemyAttacks()
        defeatedMonsters = defeatedMonsters + EnemyAttacks()
        defeatedMonsters = defeatedMonsters + TowerAttacks()
        console.log("Player HP - " +playerHP)
        if(playerHP <= 0){
            gameOver = true
            console.log("YOU LOSE!")
        }else if(defeatedMonsters == totalMonsters){
            gameOver = true
            console.log("YOU WIN!")
        }
    } while(!gameOver)
}
 
function EnemyMoves(numberMonsters : number): number {
    arrayEnemyWay!.shift()
    if(numberMonsters != 0){
        arrayEnemyWay![9] = Enemy1
        return 1
    }else{
        arrayEnemyWay[9] = undefined
    }
    return 0
}

function EnemyAttacks() : number{
    if(arrayEnemyWay![0] != undefined){
        return 1
    }else{
        return 0
    }
}

function TowerAttacks() : number{
    let defeatedMonsters : number = 0
    arrayTowerPlace.forEach((x,index) => {
            if(x.getRange() == 1 && arrayEnemyWay![index] != undefined){
                return defeatedMonsters = defeatedMonsters + VerifyKill(arrayEnemyWay[index]!.TakeDamage(x.getPower()),index)
            }else {
                for(let i : number = (index - x.getRange() + 1); i <= (index + x.getRange() - 1); i++ ){
                    if(arrayEnemyWay[i] != undefined)
                    return defeatedMonsters = defeatedMonsters + VerifyKill(arrayEnemyWay[i]!.TakeDamage(x.getPower()), i)
                }
            }
    })
    return defeatedMonsters
}

function VerifyKill(HP : number, position : number) : number {
    if(HP <= 0) {
        arrayEnemyWay[position] = undefined
        return 1
    }
    return 0
}