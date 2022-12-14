var Torre = /** @class */ (function () {
    function Torre(nome, ataque, alcance, nivel, valor) {
        this.Nome = "";
        this.Ataque = 0;
        this.Alcance = 0;
        this.Nivel = 0;
        this.Valor = 0;
        this.Nome = nome;
        this.Ataque = ataque;
        this.Alcance = alcance;
        this.Nivel = nivel;
        this.Valor = valor;
    }
    return Torre;
}());
var Inimigo = /** @class */ (function () {
    function Inimigo(nome, vida) {
        this.Nome = "";
        this.Vida = 0;
        this.Nome = nome;
        this.Vida = vida;
    }
    Inimigo.prototype.ReceberDano = function (ataque) {
        return this.Vida = this.Vida - ataque;
    };
    return Inimigo;
}());
var torres = [];
var tabuleiro = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,];
torres.length = 10;
tabuleiro.length = 10;
AdicionarTorre(new Torre("Arco", 3, 2, 1, 10), 6);
IniciarPartida(2);
function AdicionarTorre(torre, posicao) {
    torres[posicao] = torre;
}
function IniciarPartida(inimigosTotais) {
    var vidas = 10;
    var numeroInimigos = inimigosTotais;
    var inimigosDerrotados = 0;
    var fimDeJogo = false;
    do {
        numeroInimigos = numeroInimigos - MovimentarInimigos(numeroInimigos);
        vidas = vidas - VerificarAtaqueInimigo();
        inimigosDerrotados = inimigosDerrotados + VerificarAtaqueInimigo();
        inimigosDerrotados = inimigosDerrotados + AtaqueTorres();
        console.log("Restam mais" + vidas + "vidas");
        if (vidas <= 0) {
            fimDeJogo = true;
            console.log("Fim de jogo, suas vidas chegaram a zero e você perdeu!");
        }
        else if (inimigosDerrotados == inimigosTotais) {
            fimDeJogo = true;
            console.log("Fim de jogo, você derrotou todos os inimigos e ganhou!");
        }
    } while (!fimDeJogo);
}
function MovimentarInimigos(numeroInimigos) {
    tabuleiro.shift();
    if (numeroInimigos != 0) {
        tabuleiro[9] = new Inimigo("orc", 10);
        return 1;
    }
    else {
        tabuleiro[9] = undefined;
    }
    return 0;
}
function VerificarAtaqueInimigo() {
    if (tabuleiro[0] = undefined) {
        return 1;
    }
    return 0;
}
function AtaqueTorres() {
    var inimigosDerrotados = 0;
    torres.forEach(function (x, index) {
        if (x.Alcance == 1) {
            if (tabuleiro[index] != undefined) {
                return inimigosDerrotados = inimigosDerrotados + VerificarAbate(tabuleiro[index].ReceberDano(x.Ataque), index);
            }
        }
        else {
            for (var i = index - (x.Alcance - 1); i <= index + (x.Alcance - 1); i++) {
                if (tabuleiro[i] != undefined) {
                    return inimigosDerrotados = inimigosDerrotados + VerificarAbate(tabuleiro[i].ReceberDano(x.Ataque), i);
                }
            }
        }
    });
}
function VerificarAbate(vida, posicao) {
    if (vida <= 0) {
        tabuleiro[posicao] = undefined;
        return 1;
    }
    return 0;
}