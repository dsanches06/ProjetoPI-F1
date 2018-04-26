//VARIAVEIS GLOBAIS
var LINHA = 1; //linha para tabela
var COLUNA = 1; //coluna para tabela

/**
* @function getElementById
* @param {number} id - O id da div
* @returns 
* @description Função para obter a div pelo id.
*/
function getElementById(id) {
    var elem = document.getElementById(id);
    return elem;
}

/**
* @function criarElementoHTML
* @param {} tipo - 
* @returns 
* @description Função para criar um elemento html
*/
function criarElementoHTML(tipo) {
    var elem = document.createElement(tipo)
    return elem;
}

/**
* @function limparFormulario
* @param {string} id - Identificador do form
* @description Função para limpar formulario
*/
function limparFormulario(id) {
    var form = getElementById(id);
    alert("FORM: " + form.id)
    form.reset();
}


/**
* @function ocultarFormulario
* @description Função para ocultar os formularios html
*/
function ocultarFormulario() {
    var divCentral = getElementById("divCentral");
    divCentral.style.display = "block";

    var divFormJogador = getElementById("divFormJogador");
    divFormJogador.style.display = "none";

    var divFormGameSession = getElementById("divFormGameSession");
    divFormGameSession.style.display = "none";

    var divFormEstatistica = getElementById("divFormEstatistica");
    divFormEstatistica.style.display = "none";
}

/**
* @function criarTitulo
* @param {string} titulo - Titulo da página
* @returns 
* @description Função para criar titulo na página.
*/
function criarTitulo(text) {
    var h1 = criarElementoHTML("h1");
    h1.id = "h1";
    h1.appendChild(document.createTextNode(text));
    return h1;
}

/**
* @function criarCheckBox
* @param {number} id - Identificador da checkbox
* @returns 
* @description Função para criar checkbox
*/
function criarCheckBox(id) {
    var checkbox = criarElementoHTML("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.name = checkbox.id;
    checkbox.value = "";
    return checkbox;
}

/**
* @function cabecalhoTabela
* @param {string} label1 - Nome da coluna 1
* @param {string} label2 - Nome da coluna 2 
* @param {string} label3 - Nome da coluna 3 
* @param {string} label4 - Nome da coluna 4
* @param {string} label5 - Nome da coluna 5
* @returns 
* @description Função para criar cabeçalho da tabela
*/
function cabecalhoTabela(label1, label2, label3, label4, label5) {
    //array labels
    var labels = [];
    //adicionar nome de cada coluna
    labels.push(label1);
    labels.push(label2);
    labels.push(label3);
    labels.push(label4);
    labels.push(label5);
    //cria o elemento thead
    var thead = criarElementoHTML("thead");
    //faz o loop uma vez
    for (var i = 0; i < LINHA; i++) { //LINHA
        //cria o elemento tr
        var tr = criarElementoHTML("tr");
        //faz o loop uma vez
        for (var j = 0; j < COLUNA; j++) { //coluna
            //faz o loop da lista de labels
            for (var k = 0; k < labels.length; k++) {
                //cria o elemento div
                var div = criarElementoHTML("div");
                div.appendChild(document.createTextNode(labels[k]));
                //cria o elemento th
                var th = criarElementoHTML("th");
                th.appendChild(div);
                tr.appendChild(th);
            }
        }
        thead.appendChild(tr);
    }
    return thead;
}

/**
* @function criarButton
* @param {string} nome - Nome do button
* @returns 
* @description Função para criar button
*/
function criarButton(nome) {
    var button = criarElementoHTML("button");
    button.appendChild(document.createTextNode(nome));
    return button;
}

/**
* @function criarImg
* @param {string} nome - Nome da imagem
* @returns 
* @description Função para criar uma imagem
*/
function criarImg(nome) {
    var img = criarElementoHTML("img");
    img.id = nome;
    return img;
}

/**
 * @function limparDivConteudoGeral
 * @param {HTMLElement} parent - a div com id conteudoGeral
 * @returns 
 * @description Funcao remover filhos de um conteudo
 */
function limparDivConteudoGeral(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
* @function paginaHome
* @description Função para criar a página inicial.
*/
function paginaHome() {
    //obter div central
    var divCentral = getElementById("divCentral");
    limparDivConteudoGeral(divCentral);
    //criar titulo
    var h1 = criarTitulo("Bem-vindo a pagina inicial");
    divCentral.appendChild(h1);
    //criar a imagem ips
    var img = criarImg("ips");
    img.src = "images/ips.jpg"
    img.style.height = "80%";
    divCentral.appendChild(img);
    //esconde os formularios
    ocultarFormulario();
}

/**
 * @memberof window
 * @property {function} onload - função que será executada quando a página estiver toda carregada.
 */
window.onload = function () {
    paginaHome();
};

