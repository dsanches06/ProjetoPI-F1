USE mysql;

-- criar base de dados
DROP DATABASE IF EXISTS jogodb;
CREATE DATABASE jogodb;
USE jogodb;

-- criar tabel pais
CREATE TABLE IF NOT EXISTS pais (
    pais_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pais_nome VARCHAR(50) NOT NULL,
    pais_sigla CHAR(2) NOT NULL
);

-- criar tabela jogador
CREATE TABLE IF NOT EXISTS jogador (
    jog_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    jog_nome VARCHAR(100) NOT NULL,
    jog_dataNascimento DATETIME NOT NULL,
    jog_pais_id INT NOT NULL,
    FOREIGN KEY (jog_pais_id)
        REFERENCES pais (pais_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- criar tabela game session
CREATE TABLE IF NOT EXISTS gamesession (
    game_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_dataSessao DATETIME NOT NULL,
	game_nome VARCHAR(100) NOT NULL,
    game_jog_id INT NOT NULL,
    FOREIGN KEY (game_jog_id)
        REFERENCES jogador(jog_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- criar tabela tipo de estatistica
CREATE TABLE IF NOT EXISTS tipoestatistica (
    tipo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo_nome VARCHAR(100) NOT NULL,
    tipo_descricao VARCHAR(100) NOT NULL
);

-- criar estatistica
CREATE TABLE IF NOT EXISTS estatistica (
    est_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    est_valor INT NOT NULL,
    est_tipo_id INT NOT NULL,
    est_game_id INT NOT NULL,
    FOREIGN KEY (est_tipo_id)
        REFERENCES tipoestatistica (tipo_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (est_game_id)
        REFERENCES gamesession (game_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);
 
-- insert date
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Angola", "ag");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Brazil", "br");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Cabo Verde", "cv");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Dinamarca", "dm");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Espanha", "es");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("França", "fr");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Grecia", "gr");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Holanda", "hl");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Itália", "it");
INSERT INTO pais(pais_nome, pais_sigla) VALUES("Portugal", "pt");
-- para teste
SELECT * FROM pais;


INSERT INTO tipoestatistica(tipo_nome, tipo_descricao) VALUES( "Tempo de Jogo", "Tempo total de jogo");
INSERT INTO tipoestatistica(tipo_nome, tipo_descricao) VALUES( "Mortes", "Mortes durante o jogo");
INSERT INTO tipoestatistica(tipo_nome, tipo_descricao) VALUES( "Moedas", "Moedas recolhidas");
-- testar
SELECT * FROM tipoestatistica;






