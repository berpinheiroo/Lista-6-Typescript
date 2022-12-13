class Torre{
    Nome: string = ""
    Ataque: number = 0
    Alcance:number = 0
    Nivel: number = 0
    Valor: number = 0
    

    constructor(nome: string, ataque: number, alcance: number, nivel: number, valor: number){
        this.Nome = nome
        this.Ataque = ataque
        this.Alcance = alcance
        this.Nivel = nivel
        this.Valor = valor

    }
}

class Inimigo{
    Nome: string = ""
    Vida: number = 0

    constructor(nome: string, vida: number){
        this.Nome = nome
        this.Vida = vida

    }

    public ReceberDano(ataque: number){
        return this.Vida = this.Vida - ataque
    }

}

let torres: Torre[] = []
let tabuleiro: (Inimigo | undefined)[] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,]

torres.length = 10
tabuleiro.length = 10

AdicionarTorre(new Torre("Arco", 3, 2, 1, 10), 6)

IniciarPartida(2)

function AdicionarTorre(torre: Torre, posicao: number){
    torres[posicao] = torre
}

function IniciarPartida(inimigosTotais: number){
    let vidas: number = 10
    let numeroInimigos = inimigosTotais
    let inimigosDerrotados = 0
    let fimDeJogo: boolean = false

    do{
        numeroInimigos = numeroInimigos - MovimentarInimigos(numeroInimigos)
        vidas = vidas - VerificarAtaqueInimigo()
        inimigosDerrotados = inimigosDerrotados + VerificarAtaqueInimigo()
        inimigosDerrotados = inimigosDerrotados + AtaqueTorres()
        console.log("Restam mais" + vidas + "vidas")
        if(vidas <= 0){
            fimDeJogo = true
            console.log("Fim de jogo, suas vidas chegaram a zero e você perdeu!")
        }
        else if(inimigosDerrotados == inimigosTotais){
            fimDeJogo = true
            console.log("Fim de jogo, você derrotou todos os inimigos e ganhou!")
        }
    }while(!fimDeJogo)
}

function MovimentarInimigos(numeroInimigos: number): number{
    tabuleiro.shift()
    if(numeroInimigos != 0){
        tabuleiro[9] = new Inimigo("Cerberus", 10)
        return 1
    }
    else{
        tabuleiro[9] = undefined
    }
    return 0
}

function VerificarAtaqueInimigo(): number{
    if(tabuleiro[0] = undefined){
        return 1
    }
    return 0
}

function AtaqueTorres(): any{
    let inimigosDerrotados = 0
    torres.forEach((x, index) => {
        if(x.Alcance == 1){
            if(tabuleiro[index] != undefined){
                return inimigosDerrotados = inimigosDerrotados + VerificarAbate(tabuleiro[index]!.ReceberDano(x.Ataque), index)
            }
        } else{
            for (let i = index - (x.Alcance - 1); i <= index + (x.Alcance - 1); i++) {
                if(tabuleiro[i] != undefined){
                    return inimigosDerrotados = inimigosDerrotados + VerificarAbate(tabuleiro[i]!.ReceberDano(x.Ataque), i)

                }
                
            }
        }
        
    })

}

function VerificarAbate(vida: number, posicao: number): number{
    if(vida <= 0){
        tabuleiro[posicao] = undefined
        return 1
    }
    return 0

}
