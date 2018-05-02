//VARIAVEIS GLOBAIS
var jogadorList = []; //array para guardar a lista de jogadores

/**
* @function calcularIdade
* @param {string} dataNascimento - a data de nascimento.
* @returns {number} O resultado obtido sera igual a idade.
* @description Função para calcular a idade da pessoa pela data de nascimento.
*/
function calcularIdade(dataNascimento) {
    var dataIntroduzida = dataNascimento.split("-");
    var dataObtida = new Date(parseInt(dataIntroduzida[0], 10),
        parseInt(dataIntroduzida[1], 10) - 1,
        parseInt(dataIntroduzida[2], 10));

    var diferenca = Date.now() - dataObtida.getTime();
    var idade = new Date(diferenca);
    return Math.abs(idade.getUTCFullYear() - 1970);
}

/*
* Closure auxiliar que é usada como contador por outras funcoes, 
* nomeadamente para a atribuicao de id's aos elementos que sao criados.
*/
var numeroJogador = (function () {
    var contador = 0;
    return function () {
        return contador += 1;
    }
})();

/**
 * Representa uma pessoa
 * @constructor 
 * @param {string} nome - O nome da pessoa.
 * @param {string} dataNascimento - A data de nascimento da pessoa.
 * @param {string} pais - O país da pessoa.
 */
function Pessoa(nome, dataNascimento, pais) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.pais = pais;
}

/**
 * Representa um jogador que herda os dados da pessoa
 * @constructor 
 * @param {number} id - Identificador para cada jogador.
 * @param {string} nome - O nome do jogador.
 * @param {string} dataNascimento - A data de nascimento do jogador.
 * @param {string} pais - O pais do jogador.
 * @param {number} idade - A idade do jogador e não será menor que 12.
 */
function Jogador(id, nome, dataNascimento, pais) {
    Pessoa.call(this, nome, dataNascimento, pais);
    this.id = id;
    this.idade = calcularIdade(dataNascimento);
}

/**
* Representa o construtor do jogador 
* 
*/
Jogador.prototype = Object.create(Pessoa.prototype);
Jogador.prototype.constructor = Jogador;

/**
* @function paginaJogadores
* @description Função para criar pagina para gerir jogadores.
*/
function paginaJogadores() {
    //obter div central     
    var divCentral = getElementById("divCentral");
    limparConteudo(divCentral);
    //criar titulo
    var h1 = criarTitulo("Lista de Jogadores");
    divCentral.appendChild(h1);
    //criar tabela jogador
    criarTabelaJogadores(divCentral);
    //esconde os formularios
    ocultarFormulario();
}

/**
* @function criarTabelaJogadores
* @param{HTMLElement} divCentral - div central
* @description Função para mostrar a lista de jogadores.
*/
function criarTabelaJogadores(divCentral) {
    //criar secção
    var section = criarElementoHTML("section");
    section.id = "sectionJogador";
    //criar div container
    var container = criarElementoHTML("div");
    container.className = "container";
    //criar div tabela
    var divTabela = criarElementoHTML("div");
    divTabela.className = "divTabela";
    //criar tabela
    var table = criarElementoHTML("table");
    table.className = "tabela";
    //criar cabeçalho da tabela
    var thead = cabecalhoTabela("Select", "ID", "Nome", "Idade", "País");
    //criar corpo da tabela
    var tbody = corpoTabelaJogador();

    table.appendChild(thead);
    table.appendChild(tbody);
    divTabela.appendChild(table);
    container.appendChild(divTabela);
    section.appendChild(container);
    divCentral.appendChild(section);

    //criar div para button
    var divButton = criarElementoHTML("div");
    buttonJogador(divButton);
    divCentral.appendChild(divButton);
}

/**
* @function corpoTabela
* @description Função para criar corpo da tabela
*/
function corpoTabelaJogador() {
    //criar um tbody
    var tbody = criarElementoHTML("tbody");
    //faz o loop na lista de jogadores
    for (var i = 0; i < jogadorList.length; i++) {
        var tr = criarElementoHTML("tr"); //cria uma LINHA
        for (var j = 0; j < LINHA; j++) {
            //cria uma div
            var divCheckBox = criarElementoHTML("div");
            divCheckBox.style.textAlign = "center";
            //cria uma checkbox
            var checkbox = criarCheckBox(jogadorList[i].id);
            divCheckBox.appendChild(checkbox);

            var td1 = criarElementoHTML("td");
            td1.appendChild(divCheckBox);
            tr.appendChild(td1);

            var td2 = criarElementoHTML("td");
            td2.appendChild(document.createTextNode(jogadorList[i].id));
            tr.appendChild(td2);

            var td3 = criarElementoHTML("td");
            td3.appendChild(document.createTextNode(jogadorList[i].nome));
            tr.appendChild(td3);

            var td4 = criarElementoHTML("td");
            td4.appendChild(document.createTextNode(jogadorList[i].idade));
            tr.appendChild(td4);

            var td5 = criarElementoHTML("td");
            td5.appendChild(document.createTextNode(obterSiglaPais(jogadorList[i].pais)));
            tr.appendChild(td5);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

/**
* @function buttonJogador
* @param{HTMLElement} divCentral - div central
* @param{HTMLElement} divButton - div para button
* @description Função para criar button para gerir jogadores
*/
function buttonJogador(divButton) {
    //criar button adicionar
    var btnAdicionar = criarButton("Adicionar");
    btnAdicionar.onclick = function () {
        mostrarFormularioJogador();
    }
    //criar button editar
    var btnEditar = criarButton("Editar");
    btnEditar.onclick = function () {
        var checkbox = document.getElementsByTagName('input');
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].type == 'checkbox') {
                if (checkbox[i].checked == true) {
                    mostrarFormularioJogador(checkbox[i].id);
                }
            }
        }
    }
    //criar button remover
    var btnRemover = criarButton("Remover");
    btnRemover.onclick = function () {
        removerJogador();
    }

    divButton.appendChild(criarElementoHTML("br"));
    divButton.appendChild(btnAdicionar);
    divButton.appendChild(btnEditar);
    divButton.appendChild(btnRemover);
}

/**
* @function obterIndexJogadorPorID
* @param {number} id -  Id do jogador
* @returns{number} i -  posição do jogador na lista
* @description Função para obter a posição do Jogador na lista
*/
function obterIndexJogadorPorID(id) {
    var quantos = jogadorList.length;
    for (var i = 0; i < quantos; i++) {
        if (id == jogadorList[i].id) {
            return i;
        }
    }
}

/**
* @function obterJogador
* @param {number} id -  Id do jogador
* @returns {object} jogador - Jogador
* @description Função para obter o Jogador na lista
*/
function obterJogador(id) {
    var i = obterIndexJogadorPorID(id);
    return jogadorList[i];
}

/**
* @function removerJogador
* @description Função para remover jogador da lista
*/
function removerJogador() {
    var checkbox = document.getElementsByTagName('input');
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].type == 'checkbox') {
            if (checkbox[i].checked == true) {
                var index = obterIndexJogadorPorID(checkbox[i].id);
                jogadorList.splice(index, 1);
                alert("Jogador " + checkbox[i].id + " foi removido com sucesso.");
                paginaJogadores();
            }
        }
    }
}

/**
* @function mostrarFormularioJogador
* @description Função para mostrar o formulario para preencher ou editar dados
*/
function mostrarFormularioJogador(checkboxId) {
    var divCentral = getElementById("divCentral");
    divCentral.style.display = "none";

    var divFormJogador = getElementById("divFormJogador");
    divFormJogador.style.display = "block";

    //se houver checkbox selecionada
    if (checkboxId != null) {
        //obter o index do jogador na lista
        var i = obterIndexJogadorPorID(checkboxId);
        //atribuir dados do jogador a editar
        var jogadorId = getElementById("jogadorId").value = jogadorList[i].id;
        var nomeJogador = getElementById("nomeJogador").value = jogadorList[i].nome;
        var dataNascimento = getElementById("dataNascimento").value = jogadorList[i].dataNascimento;
        var paisJogador = getElementById("paisJogador").value = jogadorList[i].pais;
        var idade = jogadorList[i].idade;
    }
}

/**
* @function formJogador
* @description Função para obter os dados do formulario, validar e criar um novo jogador
*/
function formJogador() {

    var jogadorId = getElementById("jogadorId").value;
    var nomeJogador = getElementById("nomeJogador").value;
    var dataNascimento = getElementById("dataNascimento").value;
    var paisJogador = getElementById("paisJogador").value;
    var idade = calcularIdade(dataNascimento);

    if (nomeJogador != "" && dataNascimento != "" && paisJogador != "") {
        //idade tem que ser maior ou igual a 12
        if (idade >= 12) {
            //se não existir jogador pelo id
            if (obterJogador(jogadorId).id != jogadorId) {//ver isto
                //criar um novo
                var jogador = new Jogador(numeroJogador(), nomeJogador, dataNascimento, paisJogador);
                //adicionar a lista
                jogadorList.push(jogador);
                alert("O jogador foi inserido com sucesso");
            }//e se existir 
            else {
                //procura o nome do jogador na lista pelo id
                var nome = obterJogador(jogadorId).nome;
                //para obter o index do jogador pelo id
                var i = obterIndexJogadorPorID(nome);
                //atualiza os dados
                jogadorList[i].nome = nomeJogador;
                jogadorList[i].dataNascimento = dataNascimento;
                jogadorList[i].idade = calcularIdade(dataNascimento);
                jogadorList[i].pais = paisJogador;
                alert("O dados do jogador foi atualizado com sucesso");
            }
            limparFormulario("formJogador");//limpar formulario
            paginaJogadores();
        } else {
            alert("ERRO: O jogador tem menos de 12 anos");
            return;
        }
    } else {
        alert("Falta preencher os campos em falta");
        return;
    }
}

