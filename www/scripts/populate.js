//criar 10 paises e inserir no array
paisList.push(new Pais(numeroPais(), "Angola", "Ag"));
paisList.push(new Pais(numeroPais(), "Brazil", "Br"));
paisList.push(new Pais(numeroPais(), "Cabo Verde", "Cv"));
paisList.push(new Pais(numeroPais(), "Dinamarca", "Dm"));
paisList.push(new Pais(numeroPais(), "Espanha", "Es"));
paisList.push(new Pais(numeroPais(), "França", "Fr"));
paisList.push(new Pais(numeroPais(), "Grécia", "Gr"));
paisList.push(new Pais(numeroPais(), "Holanda", "Hl"));
paisList.push(new Pais(numeroPais(), "Itália", "It"));
paisList.push(new Pais(numeroPais(), "Portugal", "Pt"));

//inserir elementos no array jogadores
jogadorList.push(new Jogador(numeroJogador(), "Izilda Kossy", "1994-12-17", paisList[0].nome));
jogadorList.push(new Jogador(numeroJogador(), "Engracia Jungo", "1993-03-06", paisList[0].nome));
jogadorList.push(new Jogador(numeroJogador(), "Edson Cazanga", "1994-12-17", paisList[0].nome));
jogadorList.push(new Jogador(numeroJogador(), "Cleria Maquiniche", "1993-03-06", paisList[0].nome));
jogadorList.push(new Jogador(numeroJogador(), "Danilson Sanches", "1994-12-17", paisList[2].nome));
jogadorList.push(new Jogador(numeroJogador(), "Daniela Ramos", "1993-03-06", paisList[1].nome));
jogadorList.push(new Jogador(numeroJogador(), "Teresa Varela", "1994-12-17", paisList[5].nome));
jogadorList.push(new Jogador(numeroJogador(), "Carlos Veiga", "1993-03-06", paisList[9].nome));
jogadorList.push(new Jogador(numeroJogador(), "Rosalina Cardoso", "1994-12-17", paisList[6].nome));
jogadorList.push(new Jogador(numeroJogador(), "José Albano", "1993-03-06", paisList[4].nome));

//inserir elementos no array game session
gameSessionList.push(new GameSession(numeroGameSession(), "2018-05-11", "sessão", 1));
gameSessionList.push(new GameSession(numeroGameSession(), "2018-05-13", "sessão", 2));
gameSessionList.push(new GameSession(numeroGameSession(), "2018-05-12", "sessão", 4));
gameSessionList.push(new GameSession(numeroGameSession(), "2018-05-14", "sessão", 6));
gameSessionList.push(new GameSession(numeroGameSession(), "2018-05-14", "sessão", 9));
gameSessionList.push(new GameSession(numeroGameSession(), "2018-05-14", "sessão", 3));

//criar 3 tipos de estatistica e inserir no array
tipoEstatisticaList.push(new TipoEstatistica(numeroTipoEstatistica(), "Tempo de Jogo", "Tempo total de jogo"));
tipoEstatisticaList.push(new TipoEstatistica(numeroTipoEstatistica(), "Mortes", "Mortes durante o jogo"));
tipoEstatisticaList.push(new TipoEstatistica(numeroTipoEstatistica(), "Moedas", "Moedas recolhidas"));

//inserir elementos no array estatistica
estatisticaList.push(new Estatistica(numeroEstatisticaca(), 240, tipoEstatisticaList[0].nome, 1));
estatisticaList.push(new Estatistica(numeroEstatisticaca(), 5, tipoEstatisticaList[1].nome, 3));
estatisticaList.push(new Estatistica(numeroEstatisticaca(), 22, tipoEstatisticaList[2].nome, 3));
estatisticaList.push(new Estatistica(numeroEstatisticaca(), 6, tipoEstatisticaList[1].nome, 2));
estatisticaList.push(new Estatistica(numeroEstatisticaca(), 456, tipoEstatisticaList[0].nome, 2));
estatisticaList.push(new Estatistica(numeroEstatisticaca(), 67, tipoEstatisticaList[2].nome, 2));