var tabuleiroOriginal;
const jogadorHumano = 'O';
const jogadorMaquina = 'X';
const combinacoesDeVitoria = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const celulas = document.querySelectorAll('.celula');
comecarJogo();

function comecarJogo() {
	document.querySelector(".fimDeJogo").style.display = "none";
	tabuleiroOriginal = Array.from(Array(9).keys());
	for (var i = 0; i < celulas.length; i++) {
		celulas[i].innerText = '';
		celulas[i].style.removeProperty('background-color');
		celulas[i].addEventListener('click', confirmaTurno, false);
	}
}

function confirmaTurno(quadrado) {
	if (typeof tabuleiroOriginal[quadrado.target.id] == 'number') {
		turno(quadrado.target.id, jogadorHumano)
		if (!verificaVitoria(tabuleiroOriginal, jogadorHumano) && !verificaEmpate()) turno(melhorPosicao(), jogadorMaquina);
	}
}

function turno(IdQuadrado, jogador) {
	tabuleiroOriginal[IdQuadrado] = jogador;
	document.getElementById(IdQuadrado).innerText = jogador;
	let jogoVencido = verificaVitoria(tabuleiroOriginal, jogador)
	if (jogoVencido) fimDeJogo(jogoVencido)
}

function verificaVitoria(tabuleiro, jogador) {
	let jogadas = tabuleiro.reduce((a, e, i) =>
		(e === jogador) ? a.concat(i) : a, []);
	let jogoVencido = null;
	for (let [index, vitoria] of combinacoesDeVitoria.entries()) {
		if (vitoria.every(elem => jogadas.indexOf(elem) > -1)) {
			jogoVencido = {index: index, jogador: jogador};
			break;
		}
	}
	return jogoVencido;
}

function fimDeJogo(jogoVencido) {
	for (let index of combinacoesDeVitoria[jogoVencido.index]) {
		document.getElementById(index).style.backgroundColor =
			jogoVencido.jogador == jogadorHumano ? "blue" : "red";
	}
	for (var i = 0; i < celulas.length; i++) {
		celulas[i].removeEventListener('click', confirmaTurno, false);
	}
	escolheVencedor(jogoVencido.jogador == jogadorHumano ? "Você venceu!" : "Você perdeu.");
}

function escolheVencedor(vencedor) {
	document.querySelector(".fimDeJogo").style.display = "block";
	document.querySelector(".fimDeJogo .text").innerText = vencedor;
}

function quadradosVazios() {
	return tabuleiroOriginal.filter(s => typeof s == 'number');
}

function melhorPosicao() {
	return minimax(tabuleiroOriginal, jogadorMaquina).index;
}

function verificaEmpate() {
	if (quadradosVazios().length == 0) {
		for (var i = 0; i < celulas.length; i++) {
			celulas[i].style.backgroundColor = "green";
			celulas[i].removeEventListener('click', confirmaTurno, false);
		}
		escolheVencedor("Empate!")
		return true;
	}
	return false;
}

function minimax(novoTabuleiro, jogador) {
	var lugaresLivres = quadradosVazios();

	if (verificaVitoria(novoTabuleiro, jogadorHumano)) {
		return {pontos: -10};
	} else if (verificaVitoria(novoTabuleiro, jogadorMaquina)) {
		return {pontos: 10};
	} else if (lugaresLivres.length === 0) {
		return {pontos: 0};
	}
	var jogadas = [];
	for (var i = 0; i < lugaresLivres.length; i++) {
		var jogada = {};
		jogada.index = novoTabuleiro[lugaresLivres[i]];
		novoTabuleiro[lugaresLivres[i]] = jogador;

		if (jogador == jogadorMaquina) {
			var resultado = minimax(novoTabuleiro, jogadorHumano);
			jogada.pontos = resultado.pontos;
		} else {
			var resultado = minimax(novoTabuleiro, jogadorMaquina);
			jogada.pontos = resultado.pontos;
		}

		novoTabuleiro[lugaresLivres[i]] = jogada.index;

		jogadas.push(jogada);
	}

	var melhorJogada;
	if(jogador === jogadorMaquina) {
		var maiorPontuacao = -10000;
		for(var i = 0; i < jogadas.length; i++) {
			if (jogadas[i].pontos > maiorPontuacao) {
				maiorPontuacao = jogadas[i].pontos;
				melhorJogada = i;
			}
		}
	} else {
		var maiorPontuacao = 10000;
		for(var i = 0; i < jogadas.length; i++) {
			if (jogadas[i].pontos < maiorPontuacao) {
				maiorPontuacao = jogadas[i].pontos;
				melhorJogada = i;
			}
		}
	}

	return jogadas[melhorJogada];
}