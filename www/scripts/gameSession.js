//VARIAVEIS GLOBAIS
var gameSessionList = []; //array para guardar a lista de game sessions

/*
* Closure auxiliar que é usada como contador por outras funcoes, 
* nomeadamente para a atribuicao de id's aos elementos que sao criados.
*/
var numeroGameSession = (function () {
    var contador = 0;
    return function () {
        return contador += 1;
    }
})();

/**
 * Representa a classe game sessions
 * @constructor
 * @param {number} id - Identificador para cada inicio de sessão.
 * @param {string} dataSessao - A data da realização.
 * @param {string} descricao - A descrição.
 * @param {jogador} jogador - O jogador que jogou ou irá jogar.
 */
function GameSession(id, dataSessao, descricao, jogador) {
    this.id = id;
    this.dataSessao = dataSessao;
    this.descricao = descricao + " " + id;
    this.jogador = jogador;
}

/**
* @function paginaGameSessions
* @description Função para criar pagina para gerir sessão.
*/
function paginaGameSessions() {
    //obter div central     
    var divCentral = getElementById("divCentral");
    limparDivConteudoGeral(divCentral);
    //criar titulo
    var h1 = criarTitulo("Lista de Game Sessions");
    divCentral.appendChild(h1);
    //criar tabela game session
    criarTabelaGameSession(divCentral);
    //esconde os formularios
    ocultarFormulario();
}


/**
* @function criarTabelaGameSession
* @param{HTMLElement} divCentral - div central
* @description Função para mostrar a lista de game sessions.
*/
function criarTabelaGameSession(divCentral) {
    //criar secção
    var section = criarElementoHTML("section");
    section.id = "sectionGameSession";
    //criar div container
    var divContainer = criarElementoHTML("div");
    divContainer.className = "container";
    //criar div tabela
    var divTabela = criarElementoHTML("div");
    divTabela.className = "divTabela";
    //criar tabela
    var table = criarElementoHTML("table");
    table.className = "tabela";
    //criar cabeçalho da tabela
    var thead = cabecalhoTabela("Select", "ID", "Data Inicio", "Descrição", "Jogador");
    //criar corpo da tabela
    var tbody = corpoTabelaGameSession();

    table.appendChild(thead);
    table.appendChild(tbody);
    divTabela.appendChild(table);
    divContainer.appendChild(divTabela);
    section.appendChild(divContainer);
    divCentral.appendChild(section);

    //criar div para button
    var divButton = criarElementoHTML("div");;
    buttonGameSession(divButton);
    divCentral.appendChild(divButton);
}

/**
* @function corpoTabela
* @description Função para criar corpo da tabela
*/
function corpoTabelaGameSession() {
    //criar um tbody
    var tbody = criarElementoHTML("tbody");
    //faz o loop na lista de game session
    for (var i = 0; i < gameSessionList.length; i++) {
        var tr = criarElementoHTML("tr"); //cria uma LINHA
        for (var j = 0; j < LINHA; j++) {
            //cria uma div
            var divCheckBox = criarElementoHTML("div");
            divCheckBox.id ="divCheckBox";
            divCheckBox.style.textAlign = "center";
            //cria uma checkbox
            var checkbox = criarCheckBox(gameSessionList[i].id);
            divCheckBox.appendChild(checkbox);

            var td1 = criarElementoHTML("td");
			td1.appendChild(divCheckBox);
            tr.appendChild(td1);

            var td2 = criarElementoHTML("td");
			td2.appendChild(document.createTextNode(gameSessionList[i].id));
            tr.appendChild(td2);

            var td3 = criarElementoHTML("td");
			td3.appendChild(document.createTextNode(gameSessionList[i].dataSessao));
            tr.appendChild(td3);

            var td4 = criarElementoHTML("td");
			td4.appendChild(document.createTextNode(gameSessionList[i].descricao));
            tr.appendChild(td4);

            var td5 = criarElementoHTML("td");
			td5.appendChild(document.createTextNode(obterNomeJogadorPorID(gameSessionList[i].jogador)));
            tr.appendChild(td5);

        }
        tbody.appendChild(tr);
    }
    return tbody;
}

/**
* @function buttonGameSession
* @param{HTMLElement} divCentral - div central
* @param{HTMLElement} divButton - div para button
* @description Função para criar button para gerir GameSessiones
*/
function buttonGameSession(divButton) {
    //criar button adicionar
    var btnAdicionar = criarButton("Adicionar");
    btnAdicionar.onclick = function () {
        alert("INSERIR NOVO GameSession - NÃO IMPLEMENTADO");
        paginaGameSessions();
    }
    //criar button editar
    var btnEditar = criarButton("Editar");
    btnEditar.onclick = function () {
        alert("EDITAR GameSession - NÃO IMPLEMENTADO");
        paginaGameSessions();
    }
    //criar button remover
    var btnRemover = criarButton("Remover");
    btnRemover.onclick = function () {
        removerGameSession();
        paginaGameSessions();
    }

    divButton.appendChild(criarElementoHTML("br"));
    divButton.appendChild(btnAdicionar);
    divButton.appendChild(btnEditar);
    divButton.appendChild(btnRemover);
}

/**
* @function obterIndexGameSession
* @param {string} nome -  Nome de GameSession
* @description Função para obter a posição do GameSession na lista
*/
function obterIndexGameSessionPorID(id) {
    var quantos = gameSessionList.length;
    for (var i = 0; i < quantos; i++) {
        if (id == gameSessionList[i].id) {
            return i;
        }
    }
}

/**
* @function removerGameSession
* @description Função para remover GameSession da lista
*/
function removerGameSession() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'checkbox') {
            if (inputs[i].checked == true) {
                var index = obterIndexGameSessionPorID(inputs[i].id);
                gameSessionList.splice(index, 1);
                alert("Game Session " + inputs[i].id + " foi removido com sucesso.");
            }
        }
    }
}
