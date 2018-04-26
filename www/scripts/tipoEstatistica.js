//VARIAVEIS GLOBAIS
var tipoEstatisticaList = []; //array para guardar a lista tipos de estatisticas

/*
* Closure auxiliar que é usada como contador por outras funcoes, 
* nomeadamente para a atribuicao de id's aos elementos que sao criados.
*/
var numeroTipoEstatistica = (function () {
    var contador = 0;
    return function () {
        return contador += 1;
    }
})();

/**
 * Representa a classe tipos de estatística
 * @constructor
 * @param {number} id - Identificador para cada tipo de estatistica.
 * @param {string} nome - O nome do tipo de estatistica.
 * @param {string} descricao - A descrição.
 */
function TipoEstatistica(id, nome, descricao) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
}

/**
* @function obterTipoEstatisticaPorID
* @param {string} id -  ID do tipo de estatistica
* @description Função para obter o nome do tipo de estatistica
*/
function obterTipoEstatisticaPorID(id) {
    var quantos = tipoEstatisticaList.length;
    for (var i = 0; i < quantos; i++) {
        if (id == tipoEstatisticaList[i].id) {
            return tipoEstatisticaList[i].nome;
        }
    }
}
