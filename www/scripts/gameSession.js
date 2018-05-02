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
 * @param {GameSession} jogador - O jogador que jogou ou irá jogar.
 */
function GameSession(id, dataSessao, descricao, jogador) {
    this.id = id;
    this.dataSessao = dataSessao;
    this.descricao = descricao || "sessão " + id;
    this.jogador = jogador;
}

/**
* @function paginaGameSessions
* @description Função para criar pagina para gerir sessão.
*/
function paginaGameSessions() {
    //obter div central     
    var divCentral = getElementById("divCentral");
    limparConteudo(divCentral);
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
            divCheckBox.id = "divCheckBox";
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
            td5.appendChild(document.createTextNode(gameSessionList[i].jogador));
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
        mostrarFormularioGameSession();
    }
    //criar button editar
    var btnEditar = criarButton("Editar");
    btnEditar.onclick = function () {
        var checkbox = document.getElementsByTagName('input');
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].type == 'checkbox') {
                if (checkbox[i].checked == true) {
                    mostrarFormularioGameSession(checkbox[i].id);
                }
            }
        }
    }
    //criar button remover
    var btnRemover = criarButton("Remover");
    btnRemover.onclick = function () {
        removerGameSession();
    }

    divButton.appendChild(criarElementoHTML("br"));
    divButton.appendChild(btnAdicionar);
    divButton.appendChild(btnEditar);
    divButton.appendChild(btnRemover);
}

/**
* @function obterIndexGameSession
* @param {number} id -  Id de GameSession
* @returns {number} i -  Index da game session na lista
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
* @function obterGameSession
* @param {number} id -  Id do game session

* @description Função para obter a game session na lista
*/
function obterGameSession(id) {
    var i = obterIndexGameSessionPorID(id);
    return gameSessionList[i];
}


/**
* @function removerGameSession
* @description Função para remover GameSession da lista
*/
function removerGameSession() {
    var checkbox = document.getElementsByTagName('input');
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].type == 'checkbox') {
            if (checkbox[i].checked == true) {
                var index = obterIndexGameSessionPorID(checkbox[i].id);
                gameSessionList.splice(index, 1);
                alert("Game Session " + checkbox[i].id + " foi removido com sucesso.");
                paginaGameSessions();
            }
        }
    }
}

/**
* @function criarListaDeJogadores
* @description Função para criar a lista de jogadores e mostrar no formulario
*/
function criarListaDeJogadores(select) {
    for (var i = 0; i < jogadorList.length; i++) {
        var nomeJogador = document.createTextNode(jogadorList[i].nome);
        var options = criarElementoHTML("option");
        options.value = jogadorList[i].nome;
        options.appendChild(nomeJogador);
        select.appendChild(options);
    }
}

/**
* @function mostrarFormularioGameSession
* @description Função para mostrar o formulario para preencher ou editar dados
*/
function mostrarFormularioGameSession(checkboxId) {
    var divCentral = getElementById("divCentral");
    divCentral.style.display = "none";

    var divFormGameSession = getElementById("divFormGameSession");
    divFormGameSession.style.display = "block";

    //limpar dados de select
    var select = getElementById("jogador");
    limparConteudo(select);
    //criar lista de jogadores
    criarListaDeJogadores(select);

    //se houver checkbox selecionada
    if (checkboxId != null) {
        //obter o index do GameSession na lista
        var i = obterIndexGameSession(checkboxId);
        //atribuir dados do GameSession a editar
        var gameSessionId = getElementById("gameSessionId").value = gameSessionList[i].id;
        var dataSessao = getElementById("dataSessao").value = gameSessionList[i].dataSessao;
        var jogador = getElementById("jogador").value = gameSessionList[i].jogador;
        var descricao = getElementById("descricao").value = gameSessionList[i].descricao;
    }
}

/**
* @function formGameSession
* @description Função para obter os dados do formulario, validar e criar um novo game session
*/
function formGameSession() {

    var gameSessionId = getElementById("gameSessionId").value;
    var dataSessao = getElementById("dataSessao").value;
    var jogador = getElementById("jogador").value;
    var descricao = getElementById("descricao").value;

    if (dataSessao != "" && jogador != "") {
        //se não existir GameSession pelo id
        if (obterGameSession(gameSessionId).id != gameSessionId) {
            //criar um novo
            var gameSession = new GameSession(numeroGameSession(), dataSessao, descricao, jogador);
            //adicionar a lista
            gameSessionList.push(gameSession);
            alert("GameSession foi inserido com sucesso.");
        }//e se existir 
        else {
            //para obter o index do GameSession pelo id
            var i = obterIndexGameSession(gameSessionId);
            //atualiza os dados
            gameSessionList[i].dataSessao = dataSessao;
            gameSessionList[i].descricao = descricao;
            gameSessionList[i].jogador = jogador;
            alert("O dados do GameSession foi atualizado com sucesso.");
        }
        limparFormulario("formGameSession");//limpar formulario
        paginaGameSessions();
    } else {
        alert("Falta preencher os campos em falta");
        return;
    }
}


