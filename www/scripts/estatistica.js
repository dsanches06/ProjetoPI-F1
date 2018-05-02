//VARIAVEIS GLOBAIS
var estatisticaList = []; //array para guardar a lista de estatistica

/*
* Closure auxiliar que é usada como contador por outras funcoes, 
* nomeadamente para a atribuicao de id's aos elementos que sao criados.
*/
var numeroEstatistica = (function () {
    var contador = 0;
    return function () {
        return contador += 1;
    }
})();

/**
 * Representa a classe estatitica
 * @constructor
 * @param {number} id - Identificador para cada estatistica.
 * @param {number} valor - Valor total.
 * @param {string} tipo - O tipo de estatística.
 * @param {string} gameSession - O jogo.
 */
function Estatistica(id, valor, tipo, gameSession) {
    this.id = id;
    this.valor = valor;
    this.tipo = tipo;
    this.gameSession = gameSession;
}

/**
* @function paginaEstatisticas
* @description Função para criar pagina para gerir estatisticas.
*/
function paginaEstatisticas() {
    //obter div central     
    var divCentral = getElementById("divCentral");
    limparConteudo(divCentral);
    //criar titulo
    var h1 = criarTitulo("Estatistica Geral");
    divCentral.appendChild(h1);
    //criar tabela estatistica
    criarTabelaEstatistica(divCentral);
    //esconde os formularios
    ocultarFormulario();
}

/**
* @function criarTabelaEstatistica
* @param{HTMLElement} divCentral - div central
* @description Função para mostrar a lista de game sessions.
*/
function criarTabelaEstatistica(divCentral) {
    //criar secção
    var section = criarElementoHTML("section");
    section.id = "sectionEstatistica";
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
    var thead = cabecalhoTabela("Select", "ID", "Valor", "Tipo", "Game Session");
    //criar corpo da tabela
    var tbody = corpoTabelaEstatistica();

    table.appendChild(thead);
    table.appendChild(tbody);
    divTabela.appendChild(table);
    divContainer.appendChild(divTabela);
    section.appendChild(divContainer);
    divCentral.appendChild(section);

    //criar div para button
    var divButton = criarElementoHTML("div");;
    buttonEstatistica(divButton);
    divCentral.appendChild(divButton);
}

/**
* @function corpoTabela
* @description Função para criar corpo da tabela
*/
function corpoTabelaEstatistica() {
    //criar um tbody
    var tbody = criarElementoHTML("tbody");
    //ordenar pontuação de jogadores
    // var estatistica = estatisticaList.sort(compare("valor"));//ver isso
    //faz o loop na lista de estatistica
    for (var i = 0; i < estatisticaList.length; i++) {
        var tr = criarElementoHTML("tr"); //cria uma LINHA
        for (var j = 0; j < LINHA; j++) {
            //cria uma div
            var divCheckBox = criarElementoHTML("divCheckBox");
            divCheckBox.style.textAlign = "center";
            //cria uma checkbox
            var checkbox = criarCheckBox(estatisticaList[i].id);
            divCheckBox.appendChild(checkbox);

            var td1 = criarElementoHTML("td");
            td1.appendChild(divCheckBox);
            tr.appendChild(td1);

            var td2 = criarElementoHTML("td");
            td2.appendChild(document.createTextNode(estatisticaList[i].id));
            tr.appendChild(td2);

            var td3 = criarElementoHTML("td");
            td3.appendChild(document.createTextNode(estatisticaList[i].valor));
            tr.appendChild(td3);

            var td4 = criarElementoHTML("td");
            td4.appendChild(document.createTextNode(estatisticaList[i].tipo));
            tr.appendChild(td4);

            var td5 = criarElementoHTML("td");
            td5.appendChild(document.createTextNode(estatisticaList[i].gameSession));
            tr.appendChild(td5);

        }
        tbody.appendChild(tr);
    }
    return tbody;
}


/**
* @function buttonEstatistica
* @param{HTMLElement} divCentral - div central
* @param{HTMLElement} divButton - div para button
* @description Função para criar button para gerir Estatisticaes
*/
function buttonEstatistica(divButton) {
    //criar button adicionar
    var btnAdicionar = criarButton("Adicionar");
    btnAdicionar.onclick = function () {
        mostrarFormularioEstatistica();
    }
    //criar button remover
    var btnRemover = criarButton("Remover");
    btnRemover.onclick = function () {
        removerEstatistica();
    }

    //criar button visualizar estatistica do jogador
    var btnVisualizar = criarButton("Visualizar");
    btnVisualizar.onclick = function () {
        alert("Visualizar Estatistica - NÃO IMPLEMENTADO");
    }

    divButton.appendChild(criarElementoHTML("br"));
    divButton.appendChild(btnAdicionar);
    divButton.appendChild(btnRemover);
    divButton.appendChild(btnVisualizar);
}

/**
* @function obterIndexEstatistica
* @param {string} nome -  Nome de Estatistica
* @description Função para obter a posição do Estatistica na lista
*/
function obterIndexEstatisticaPorID(id) {
    var quantos = estatisticaList.length;
    for (var i = 0; i < quantos; i++) {
        if (id == estatisticaList[i].id) {
            return i;
        }
    }
}

/**
* @function removerEstatistica
* @description Função para remover Estatistica da lista
*/
function removerEstatistica() {
    var checkbox = document.getElementsByTagName('input');
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].type == 'checkbox') {
            if (checkbox[i].checked == true) {
                var index = obterIndexEstatisticaPorID(checkbox[i].id);
                estatisticaList.splice(index, 1);
                alert("Estatistica " + checkbox[i].id + " foi removido com sucesso.");
                paginaEstatisticas();
            }
        }
    }
}

/**
* @function verificarIdGameSessionExiste
* @param {number} id -  Id do game session
* @returns {number} id -  Id de game session
* @description Função para obter a game session na lista
*/
function verificarIdGameSessionExiste(id) {
    var quantos = gameSessionList.length;
    for (var i = 0; i < quantos; i++) {
        if (id == gameSessionList[i].id) {
            return gameSessionList[i];
        }
    }
}

/**
* @function criarListaDeTiposDeEstatistica
* @description Função para criar a lista de tipo de estatistica e mostrar no formulario
*/
function criarListaDeTiposDeEstatistica(select) {
    for (var i = 0; i < tipoEstatisticaList.length; i++) {
        var tipoEstatistica = document.createTextNode(tipoEstatisticaList[i].nome);
        var options = criarElementoHTML("option");
        options.value = tipoEstatisticaList[i].nome;
        options.appendChild(tipoEstatistica);
        select.appendChild(options);
    }
}

/**
* @function criarListaDeGameSession
* @description Função para criar a lista de game session e mostrar no formulario
*/
function criarListaDeGameSession(select) {
    for (var i = 0; i < gameSessionList.length; i++) {
        var gameSessionId = document.createTextNode(gameSessionList[i].id);
        var options = criarElementoHTML("option");
        options.value = gameSessionList[i].id;
        options.appendChild(gameSessionId);
        select.appendChild(options);
    }
}

/**
* @function mostrarFormularioEstatistica
* @description Função para mostrar o formulario para preencher ou editar dados
*/
function mostrarFormularioEstatistica(checkboxId) {
    var divCentral = getElementById("divCentral");
    divCentral.style.display = "none";

    var divFormEstatistica = getElementById("divFormEstatistica");
    divFormEstatistica.style.display = "block";

    //limpar dados de select
    var tipoEstatistica = getElementById("tipoEstatistica");
    limparConteudo(tipoEstatistica);
    //criar lista de tipo de estatistica
    criarListaDeTiposDeEstatistica(tipoEstatistica);

    //limpar dados de select
    var gameSession = getElementById("gameSession");
    limparConteudo(gameSession);
    //criar lista de game session
    criarListaDeGameSession(gameSession);
}

/**
* @function formEstatistica
* @description Função para obter os dados do formulario, validar e criar uma nova estatistica
*/
function formEstatistica() {

    var valor = getElementById("valor").value;
    var tipoEstatistica = getElementById("tipoEstatistica").value;
    var gameSession = getElementById("gameSession").value;

    if (valor != "" && tipoEstatistica != "" && gameSession != "") {
        //criar um novo
        var estatistica = new Estatistica(numeroEstatistica(), valor, tipoEstatistica, gameSession);
        //adicionar a lista
        estatisticaList.push(estatistica);
        alert("Estatistica foi inserido com sucesso");
        limparFormulario("formEstatistica");//limpar formulario
        paginaEstatisticas();
    } else {
        alert("Falta preencher os campos em falta");
        return;
    }
}






