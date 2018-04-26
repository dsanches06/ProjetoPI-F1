//VARIAVEIS GLOBAIS
var estatisticaList = []; //array para guardar a lista de estatistica

/*
* Closure auxiliar que é usada como contador por outras funcoes, 
* nomeadamente para a atribuicao de id's aos elementos que sao criados.
*/
var numeroEstatisticaca = (function () {
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
    limparDivConteudoGeral(divCentral);
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
        alert("INSERIR NOVO Estatistica - NÃO IMPLEMENTADO");
        paginaEstatisticas();
    }
    //criar button editar
    var btnEditar = criarButton("Editar");
    btnEditar.onclick = function () {
        alert("EDITAR Estatistica - NÃO IMPLEMENTADO");
        paginaEstatisticas();
    }
    //criar button remover
    var btnRemover = criarButton("Remover");
    btnRemover.onclick = function () {
        removerEstatistica();
        paginaEstatisticas();
    }

    divButton.appendChild(criarElementoHTML("br"));
    divButton.appendChild(btnAdicionar);
    divButton.appendChild(btnEditar);
    divButton.appendChild(btnRemover);
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
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'checkbox') {
            if (inputs[i].checked == true) {
                var index = obterIndexEstatisticaPorID(inputs[i].id);
                estatisticaList.splice(index, 1);
                alert("Estatistica " + inputs[i].id + " foi removido com sucesso.");
            }
        }
    }
}
