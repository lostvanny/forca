function limparTabuleiro() {
    erros = 0;
    acertos = 0;
    tentativas = [];
    pResultado.innerHTML = tentativas.toString();

    document.getElementById("vidas").innerHTML = `VIDAS: <span id="qtd-vidas">******</span>`;
    pEspacos.innerHTML = '';

    document.getElementById("secSaida").innerHTML = '';

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    pintarTabuleiro(erros);
}

function gameOver() {
    pEspacos.innerHTML = "FIM DE JOGO!";

    document.getElementById("secSaida").innerHTML = '';
    document.getElementById("vidas").innerHTML = `PALAVRA: <span id="qtd-vidas">${palavraDaVez}</span>`;
}

function gameWin() {
    vitorias++;
    document.getElementById("qtd-pontos").innerHTML = vitorias;
    pEspacos.innerHTML = "VOCE VENCEU. PARABENS!";
}

function verificarJogo() {
    if (erros >= 6) {
        gameOver();
        return
    }

    let ganhou = true;
    if (acertos < palavraDaVez.length) {
        ganhou = false;
    }

    if (ganhou) {
        gameWin();
    }
}

function contarErro() {
    erros++;

    pintarTabuleiro(erros);

    let texto = '';
    for (let i = 0; i < 6 - erros; i++) {
        texto += "*";
    }

    document.getElementById("vidas").innerHTML = `VIDAS: <span id="qtd-vidas">${texto}</span>`;

    if (erros >= 6) {
        gameOver();
        return;
    }
}

function escreverPalavra(palavra) {
    let secaoTexto = document.getElementById("secSaida");

    let contador = 0;
    [...palavra].forEach(letra => {
        secaoTexto.innerHTML += `
        <input class="input-palavra" id="inpt${contador}" type="text" maxlength="1" onkeyup="chutar(event)">
        `;
        contador++;
    });
}

function novaRodada() {
    limparTabuleiro();
    palavraDaVez = palavras[Math.round(Math.random() * (palavras.length - 1))];
    escreverPalavra(palavraDaVez);
}

function cadastroTentativa(entrada) {
    tentativas.push(entrada);
    pResultado.innerHTML = tentativas.toString();
}

function chutar(e) {
    let alternativa = e.target.value.toUpperCase();
    if (regex.test(alternativa)) {
        for (let j = 0; j < tentativas.length; j++) {
            if (tentativas[j] == alternativa) {
                e.target.value = '';
                alert("Essa letra já foi usada!");
                return
            }
        }
        cadastroTentativa(alternativa);

        let errou = true;
        for (let i = 0; i < palavraDaVez.length; i++) {
            if (e.target.id == ("inpt" + i)) {
                if (palavraDaVez[i] != alternativa) {
                    document.getElementById("inpt" + i).value = '';
                }
            }
            if (palavraDaVez[i] == alternativa) {
                document.getElementById("inpt" + i).value = alternativa;
                document.getElementById("inpt" + i).disabled = true;
                errou = false;
                acertos++;
            }
        }

        if (errou) {
            contarErro();
            e.target.value = '';
        }

        verificarJogo();
    } else {
        e.target.value = '';
        alert("É PROIBIDO O USO DE ACENTO OU CARACTERES ESPECIAIS");
    }
}

function popUp() {
    let secaoPalavra = document.getElementById("sec-nova-palavra");

    if (secaoPalavra.style.display == "flex") {
        secaoPalavra.style.display = "none";
    } else {
        secaoPalavra.style.display = "flex";
    }
}

function adicionarPalavra() {
    let inputNovaPalavra = document.getElementById("newWord");
    if (regex.test(inputNovaPalavra.value)) {
        palavras.push(inputNovaPalavra.value);
        alert("'" + inputNovaPalavra.value + "' adicionado com sucesso!");
        popUp();
    } else {
        alert("É APENAS PERMITIDO O USO DE LETRAS MAIÚSCULAS E SEM ACENTO");
        inputNovaPalavra.focus();
    }
    inputNovaPalavra.value = '';
}

function pintarTabuleiro(qntErros) {
    let context = canvas.getContext("2d");
    let cvsWidth = canvas.width;
    let cvsHeight = canvas.height;

    context.fillStyle = '#000000';

    switch (qntErros) {
        case 0:
            context.fillRect(0, cvsHeight * 0.92, cvsWidth, cvsHeight * 0.08);
            context.fillRect(cvsWidth * 0.2, 0, cvsWidth * 0.08, cvsHeight);
            context.fillRect(cvsWidth * 0.2, 0, cvsWidth * 0.45, cvsHeight * 0.08);
            break;

        case 1: // CABEÇA - OK
            context.fillRect(cvsWidth * 0.5, cvsHeight * 0.11, cvsWidth * 0.2, cvsHeight * 0.2);
            break;
        case 2: // CORPO - OK
            context.fillRect(cvsWidth * 0.525, cvsHeight * 0.34, cvsWidth * 0.15, cvsHeight * 0.25);
            break;
        case 3: // BRACO ESQUERDO - OK
            context.fillRect(cvsWidth * 0.42, cvsHeight * 0.37, cvsWidth * 0.1, cvsHeight * 0.12);
            break;
        case 4: // BRACO DIREITO - OK
            context.fillRect(cvsWidth * 0.679, cvsHeight * 0.37, cvsWidth * 0.1, cvsHeight * 0.12);
            break;
        case 5: // PERNA ESQUERDA
            context.fillRect(cvsWidth * 0.53, cvsHeight * 0.605, cvsWidth * 0.061, cvsHeight * 0.123);
            break;
        case 6: // PERNA DIREITA
            context.fillRect(cvsWidth * 0.612, cvsHeight * 0.605, cvsWidth * 0.061, cvsHeight * 0.123);
            break;
    }

}

const regex = /[A-Z]$/;

var tentativas = [];
var palavras = ['INERENTE', 'CRIACAO', 'INVASIVO', 'EQUIDADE', 'GANHAR', 'PECULIAR', 'ANUENCIA', 'INSERCAO', 'PRESTEZA', 'SUFRAGIO', 'ACERTO'];

var erros = 0;
var acertos = 0;
var vitorias = 0;
var palavraDaVez = "";

var canvas = document.getElementById("myCanvas");
var pEspacos = document.getElementById('palavra');
var btnNovoJogo = document.getElementById("btnNewGame");
var btnNovaPalavra = document.getElementById("btnAdc");
var pResultado = document.getElementById("tentativas");

btnNovoJogo.onclick = novaRodada;
btnNovaPalavra.onclick = adicionarPalavra;

novaRodada();