//VARIAVEIS GLOBAIS
var paisList = []; //lista de 10 paises

/*
* Closure auxiliar que é usada como contador por outras funcoes, 
* nomeadamente para a atribuicao de id's aos elementos que sao criados.
*/
var numeroPais = (function () {
    var contador = 0;
    return function () {
        return contador += 1;
    }
})();

/**
 * Representa um país
 * @constructor 
 * @param {number} id - Identificador para cada pais.
 * @param {string} nome - O nome do país.
 * @param {string} sigla - A sigla do pais.
 */
function Pais(id, nome, sigla) {
    this.nome = nome;
    this.sigla = sigla;
}


/**
* @function obterSiglaPais
* @param {string} nome -  Nome do país
* @description Função para obter a sigla do país
*/
function obterSiglaPais(nome) {
    var quantos = paisList.length;
    for (var i = 0; i < quantos; i++) {
        if (nome == paisList[i].nome) {
            return paisList[i].sigla;
        }
    }
}